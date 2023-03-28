import { fetchArchives, fetchArticleById, fetchArticleInfo, fetchArticles, fetchLikeArticle, fetchLikeArticleUser, fetchRandomArticle, fetchRankArticle } from '/@/api/article';
import { ArticleVO, Category, IPageQuery, Page, R, Tag, UserVO } from '/@/api/types';
import { defineStore } from 'pinia';
import { Ref } from 'vue';

interface IArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  coverImage: string;
  top: boolean;
  author: UserVO;
  category: Category;
  createdAt: string;
  tags: Tag[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

interface IArchive {
  id: string;
  title: string;
  createdAt: string;
  category: Category;
  viewCount: number;
}

interface IArticleState {
  md: string;
  articleInfo: ArticleVO | undefined;
  articles: IArticle[];
  archives: IArchive[];
  archivePages: number[];
  articlePages: number[];
  articleTotal: number;
  articleIsFinished: boolean;
  archiveTotal: number;
  archiveIsFinished: boolean;
  likeUsers: string[];
  randoms: IArchive[],
  ranks: IArchive[],
}

const useArticleStore = defineStore('articleStore', {
  state: (): IArticleState => ({
    md: '',
    articleInfo: undefined,
    articles: [],
    archives: [],
    archivePages: [],
    articlePages: [],
    articleTotal: 0,
    articleIsFinished: false,
    archiveTotal: 0,
    archiveIsFinished: false,
    likeUsers: [],
    randoms: [],
    ranks: [],
  }),
  persist: true,
  getters: {
    getArticles(): IArticle[] {
      return this.articles;
    },
    getArchives(): IArchive[] {
      return this.archives;
    },
    getArticlePageNum(): number {
      return this.articlePages[0] || 1
    },
    getArchivePageNum(): number {
      return this.archivePages[0] || 1
    },
  },
  actions: {
    patch(partial: Partial<IArticleState>) {
      this.$patch(partial);
    },
    reset() {
      this.$reset();
    },
    setArticles(articles: IArticle[]) {
      this.articles = articles;
    },
    setArchives(archives: IArchive[]) {
      this.archives = archives;
    },
    setArticleInfo(articleInfo: ArticleVO) {
      this.articleInfo = articleInfo;
    },
    setLikeUsers(likeUsers: string[]) {
      this.likeUsers = likeUsers;
    },
    removeLikedUser(userId: string) {

      this.likeUsers.splice(this.likeUsers.indexOf(userId), 1);
    },
    checkIsLiked(userId: string): boolean {
      return this.likeUsers.includes(userId);
    },
    fetchArticlePreCheck(pageNum: number): boolean {
      if (this.articleIsFinished || this.articlePages.find(e => e === pageNum)) return true
      return false
    },
    fetchArchivePreCheck(pageNum: number): boolean {
      if (this.archiveIsFinished || this.archivePages.find(e => e === pageNum)) return true
      return false
    },
    // api
    async fetchPageArticles(page?: any) {
      const { pageNum, pageSize } = unref(page)
      if (this.fetchArticlePreCheck(pageNum)) return
      const { data } = await fetchArticles(pageNum, pageSize);
      const { data: { list: articles, total } } = data.value

      if (articles.length) this.articlePages.unshift(pageNum)
      if (!this.articleTotal) this.articleTotal = total
      if (pageNum * pageSize >= this.articleTotal) this.articleIsFinished = true

      if (this.articles.length === 0) {
        this.setArticles(articles)
      } else {
        this.articles.push(...articles)
      }
    },
    async fetchPageArchives(page: Ref<IPageQuery>) {
      const { pageNum, pageSize } = unref(page)
      // check fetch is necessary
      if (this.fetchArchivePreCheck(pageNum)) return
      const { data } = await fetchArchives(pageNum, pageSize);
      const { data: { list: archives, total } } = data.value

      if (archives.length) this.archivePages.unshift(pageNum)
      if (!this.archiveTotal) this.archiveTotal = total
      if (pageNum * pageSize >= this.archiveTotal) this.archiveIsFinished = true

      if (this.archives.length === 0) {
        this.setArchives(archives)
      } else {
        this.archives.push(...archives)
      }
    },
    async fetchOneArticle(id: string) {
      const result = await fetchArticleById(id);
      const { error, data } = toRefs(result)
      if (error.value) return
      const { data: article } = unref(data)
      this.setArticleInfo(article)
    },
    async fetchLikeArticleUser(aid: string) {
      const result = await fetchLikeArticleUser(aid);
      const { error, data } = toRefs(result)
      if (error.value) return
      const { data: likeUsers } = unref(data)
      this.setLikeUsers(likeUsers);
    },
    async fetchLikeArticle(aid: string, uid: string, liked: boolean = false): Promise<string> {
      const result = await fetchLikeArticle(aid, uid, liked)
      const { error, data } = toRefs(result)
      if (error.value) return "error"
      const { data: res, msg } = unref(data)
      if (res) {
        if (!liked) {
          this.likeUsers.push(uid);
        } else {
          this.removeLikedUser(uid);
        }
      }
      return msg;
    },
    async fetchArticleInfo(ids: string[], page?:IPageQuery) {
      const { data } = await fetchArticleInfo(ids, page)
      return (unref(data) as R<Page<ArticleVO>>).data.list;
    },
    async fetchRandomArticle() {
      const { data } = await fetchRandomArticle()
      this.randoms = unref(data).data.map(e => ({id: e.id, title: e.title}))
    },
    async fetchRankArticle() {
      const { data } = await fetchRankArticle()
      this.ranks = unref(data).data
    },
  },
});

export default useArticleStore;