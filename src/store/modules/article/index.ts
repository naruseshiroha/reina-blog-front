import { fetchArchives, fetchArticles } from '@/api/article';
import { Category, IPageQuery, Tag, User } from '@/api/types';
import { defineStore } from 'pinia';

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
  articleTotal: number;
  articleIsFinished: boolean;
  archiveTotal: number;
  archiveIsFinished: boolean;
}

const useArticleStore = defineStore('articleStore', {
  state: (): IArticleState => ({
    articles: [],
    archives: [],
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
    // api
    async fetchPageArticles(page?: any) {
      if (this.articleIsFinished) return

      const { pageNum, pageSize } = page
      const { data } = await fetchArticles(pageNum, pageSize);
      const { code, data: { list: articles, total } } = data.value

      if (!this.articleTotal) this.articleTotal = total
      if (pageNum * pageSize >= this.articleTotal) this.articleIsFinished = true

      if (this.articles.length === 0) {
        this.setArticles(articles)
      } else {
        this.articles.push(...articles)
      }
    },
    async fetchPageArchives(page: IPageQuery) {
      if (this.archiveIsFinished) return
      const { pageNum, pageSize } = page
      const { data } = await fetchArchives(pageNum, pageSize);
      const { code, data: { list: archives, total } } = data.value

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