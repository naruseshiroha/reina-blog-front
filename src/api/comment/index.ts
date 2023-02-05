import { useFetch } from "@vueuse/core";

export async function fetchArticleComments(articleId: string) {
    return await useFetch(`/api/comment/${articleId}`).get().json()
}