import { useFetch } from "@vueuse/core";

export async function fetchArticles() {
    return await useFetch('/api/article').json()
}