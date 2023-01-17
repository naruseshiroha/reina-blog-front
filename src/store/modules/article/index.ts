import { fetchArchives, fetchArticles } from '@/api/article';
import { Category, IPageQuery, Tag, User } from '@/api/types';
import { defineStore } from 'pinia';
import { Ref } from 'vue';

interface IArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  coverImage: string;
  top: boolean;
  author: User;
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
}

interface IArticleState {
  articles: IArticle[];
  archives: IArchive[];
  archivePages: number[];
  articlePages: number[];
  articleTotal: number;
  articleIsFinished: boolean;
  archiveTotal: number;
  archiveIsFinished: boolean;
}

const useArticleStore = defineStore('articleStore', {
  state: (): IArticleState => ({
    articles: [],
    archives: [],
    archivePages: [],
    articlePages: [],
    articleTotal: 0,
    articleIsFinished: false,
    archiveTotal: 0,
    archiveIsFinished: false,
  }),
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
      const { code, data: { list: articles, total } } = data.value

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
      console.log('archive', pageNum, pageSize);
      
      // check fetch is necessary
      if (this.fetchArchivePreCheck(pageNum)) return
      const { data } = await fetchArchives(pageNum, pageSize);
      const { code, data: { list: archives, total } } = data.value

      if (archives.length) this.archivePages.unshift(pageNum)
      if (!this.archiveTotal) this.archiveTotal = total
      if (pageNum * pageSize >= this.archiveTotal) this.archiveIsFinished = true

      if (this.archives.length === 0) {
        this.setArchives(archives)
      } else {
        this.archives.push(...archives)
      }

    },
  },
});

export default useArticleStore;