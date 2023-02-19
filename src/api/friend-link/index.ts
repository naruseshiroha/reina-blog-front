import useMyFetch from "/@/util/fetch";

export async function fetchLinks() {
    return await useMyFetch('/friendLink').json()
}