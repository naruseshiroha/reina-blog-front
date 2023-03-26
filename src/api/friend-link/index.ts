import { LinkBO } from "../types";
import useMyFetch from "/@/util/fetch";

export async function fetchLinks() {
    return await useMyFetch('/friendLink').json()
}

export async function fetchApplyLink(link: LinkBO) {
    return await useMyFetch(`/friendLink`, {
        body: JSON.stringify(link),
         headers: {
            'Content-Type': 'application/json'
        }
    }).post().json()
}