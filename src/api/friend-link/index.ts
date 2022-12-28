
import { useFetch } from "@vueuse/core";

export async function fetchLinks() {
    return await useFetch('/api/friendLink').json()
}