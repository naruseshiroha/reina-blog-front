
import { useFetch } from "@vueuse/core";

export async function fetchTags(pageNum: number, pageSize: number) {
    return await useFetch(`/api/tag/${pageNum}/${pageSize}`).json()
}