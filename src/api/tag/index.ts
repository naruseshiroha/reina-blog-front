
import { useFetch } from "@vueuse/core";

export async function fetchTags() {
    return await useFetch('/api/tag').json()
}