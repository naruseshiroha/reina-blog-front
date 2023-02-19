import useMyFetch from '/@/util/fetch';
import { CommentBO } from "../types";

export async function fetchArticleComments(articleId: string) {
    return await useMyFetch(`/comment/${articleId}`).get().json()
}

export async function fetchPublishComment(commentBo: CommentBO) {
    return await useMyFetch('/comment', {
        body: JSON.stringify(commentBo),
        headers: {
            'Content-Type': 'application/json',
        }
    }).post().json();
}