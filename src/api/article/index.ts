import { ArticleVO } from '/@/api/types/index';
import useMyFetch from '/@/util/fetch';

export async function fetchArticles(pageNum: number, pageSize: number) {
    return await useMyFetch(`/article/${pageNum}/${pageSize}`).get().json()
}

export async function fetchArchives(pageNum: number = 1, pageSize: number = 10) {
    return await useMyFetch(`/archive/${pageNum}/${pageSize}`).get().json()
}

export async function fetchArticleById(id: string) {
    return await useMyFetch<ArticleVO>(`/article/${id}`).get().json();
}

export async function fetchLikeArticle(
    aid: string, uid: string, liked: boolean = false
) {
   return await useMyFetch<Boolean>(`/article/like/${aid}/${uid}?liked=${liked}`).get().json();
}

export async function fetchLikeArticleUser(id: string) {
   return await useMyFetch<Boolean>(`/article/like/${id}`).get().json();
}