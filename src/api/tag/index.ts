import useMyFetch from "/@/util/fetch";

export async function fetchTags(pageNum: number, pageSize: number) {
    return await useMyFetch(`/tag/${pageNum}/${pageSize}`).json()
}