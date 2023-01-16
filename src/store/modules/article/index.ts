import { fetchArticles } from '@/api/article';
import { Category, Tag, User } from '@/api/types';
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

interface IArticleState {
  articles: IArticle[];
  total: number;
  isFinished: boolean;
}

const useArticleStore = defineStore('articleStore', {
  state: (): IArticleState => ({
    articles: [],
    total: 0,
    isFinished: false,
  }),
  getters: {
    getArticles(): IArticle[] {
      return this.articles;
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
    // api
    async fetchPageArticles(page?: any) {
      if (this.isFinished) return

      const { data } = await fetchArticles(page);
      const { code, data: { list: articles, total } } = data.value

      if (!this.total) this.total = total
      const { pageNum, pageSize } = page
      if (pageNum * pageSize >= this.total) this.isFinished = true

      if (this.articles.length === 0) {
        this.setArticles(articles)
      } else {
        this.articles.push(...articles)
      }
    }
  },
});

export default useArticleStore;