import { useFetch } from "@vueuse/core";

export async function fetchArticles(page?: any) {
    let params = ``
    for (const key in page) {
        if (Object.prototype.hasOwnProperty.call(page, key)) {
            const value = page[key];
            params += `&${key}=${value}`;
        }
    }
    return await useFetch('/api/article/all' + (page ? `?${params.substring(1)}` : '')).get().json()
}