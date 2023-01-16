import { useFetch } from "@vueuse/core";

export async function fetchArticles(pageNum: number, pageSize: number) {    
    return await useFetch(`/api/article/${pageNum}/${pageSize}`).get().json()
}

export async function fetchArchives(pageNum: number = 1, pageSize: number = 10) {
    return await useFetch(`/api/archive/${pageNum}/${pageSize}`).get().json()
}