import { IPageQuery } from './../types/index';
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

export async function fetchRecentComments(page:IPageQuery) {
    const { pageNum, pageSize } = page;
    return await useMyFetch(`/comment/${pageNum}/${pageSize}`).get().json()
}

export async function fetchPageMessages(commentBo: CommentBO, page: IPageQuery) {
    const { pageNum, pageSize } = page;
    return await useMyFetch(`/comment/message/${pageNum}/${pageSize}`, {
        body: JSON.stringify(commentBo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json()
}

export async function fetchLeaveMessage(commentBo: CommentBO) {
    return await useMyFetch("/comment", {
        body: JSON.stringify(commentBo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json()
}