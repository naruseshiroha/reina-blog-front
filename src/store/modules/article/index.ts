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
}

const useArticleStore = defineStore('articleStore', {
  state: (): IArticleState => ({
    articles: [],
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
      const { data } = await fetchArticles(page);
      console.log('data', data)
      const { code, data: { list: articles, total } } = data.value
      console.log({code, articles, total});
      if (this.articles.length === 0) {
        this.setArticles(articles)
      } else {
        this.articles.push(...articles)
      }
    }
  },
});

export default useArticleStore;