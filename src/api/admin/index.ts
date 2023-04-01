import { IBulletinVO, IPageQuery, IUserQueryBO } from "../types";
import useMyFetch from "/@/util/fetch";

export async function fetchAdminPageUser(page: IPageQuery, user: IUserQueryBO) {
    const { pageNum, pageSize } = page
    return await useMyFetch(`/admin/user/${pageNum}/${pageSize}`, {
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export async function fetchAdminFrozeUser(userId: string, froze: string) {
    return await useMyFetch(`/admin/user/froze/${userId}/${froze}`).put().json();
}

export async function fetchAdminDeleteUser(userIds:  string[]) {
    return await useMyFetch(`/admin/user/${userIds.join()}`).delete().json();
}

 interface IResetPasswordBO {
    id: string;
    password: string;
}

export async function fetchAdminResetUser(user:  IResetPasswordBO) {
    return await useMyFetch(`/admin/user/reset`, {
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json();
}

// article
export async function fetchAdminDeleteArticle(articleIds: string | string[]) {
    const ids = typeof articleIds === 'string' ? articleIds : articleIds.join()
    return await useMyFetch(`/article/${ids}`).delete().json();
}

// category
export async function fetchAdminCategory(keyword: string | null, status: string | null ) {
    return await useMyFetch(`/category/admin?keyword=${keyword ?? ''}&status=${status ?? ''}`).get().json()
}

export async function fetchAdminDeleteCategory(categoryIds: string | string[]) {
    const ids = typeof categoryIds === 'string' ? categoryIds : categoryIds.join()
    return await useMyFetch(`/category/${ids}`).delete().json();
}

interface ICategoryBO {
    id?: string | null;
    categoryName: string;
    categoryDesc: string;
    status?: string | null;
}
export async function fetchAdminInsertCategory(category: ICategoryBO) {
    return await useMyFetch(`/category`, {
        body: JSON.stringify(category),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export async function fetchAdminUpdateCategory(category: ICategoryBO) {
    return await useMyFetch(`/category`, {
        body: JSON.stringify(category),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json();
}

// tag
export async function fetchAdminTag(keyword: string | null, status: string | null ) {
    return await useMyFetch(`/tag/admin?keyword=${keyword ?? ''}&status=${status ?? ''}`).get().json()
}

export async function fetchAdminDeleteTag(tagIds: string | string[]) {
    const ids = typeof tagIds === 'string' ? tagIds : tagIds.join()
    return await useMyFetch(`/tag/${ids}`).delete().json();
}

interface ITagBO {
    id?: string | null;
    tagName: string;
    tagDesc: string;
    status?: string | null;
}
export async function fetchAdminInsertTag(tag: ITagBO) {
    return await useMyFetch(`/tag`, {
        body: JSON.stringify(tag),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export async function fetchAdminUpdateTag(tag: ITagBO) {
    return await useMyFetch(`/tag`, {
        body: JSON.stringify(tag),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json();
}

// bulletin
export async function fetchAdminBulletin(bulTitle: string | null, status: string | null) {
    return await useMyFetch(`/bulletin?bulTitle=${bulTitle ?? '' }&status=${status ?? ''}`).get().json()
}

export async function fetchAdminDeleteBulletin(bulletinIds: string | string[]) {
    const ids = typeof bulletinIds === 'string' ? bulletinIds : bulletinIds.join()
    return await useMyFetch(`/bulletin/${ids}`).delete().json();
}

export async function fetchAdminInsertBulletin(bulletin: IBulletinVO) {
    return await useMyFetch(`/bulletin`, {
        body: JSON.stringify(bulletin),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export async function fetchAdminUpdateBulletin(bulletin: IBulletinVO) {
    return await useMyFetch(`/bulletin`, {
        body: JSON.stringify(bulletin),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json();
}

// link
export async function fetchAdminLink(linkName: string | null, linkUrl: string | null, status: string | null ) {
    return await useMyFetch(`/friendLink/admin?linkName=${linkName ?? ''}&linkUrl=${linkUrl ?? ''}&status=${status ?? ''}`).get().json()
}

export async function fetchAdminDeleteLink(linkIds: string | string[]) {
    const ids = typeof linkIds === 'string' ? linkIds : linkIds.join()
    return await useMyFetch(`/friendLink/${ids}`).delete().json();
}

interface ILinkBO {
    id?: string | null;
    linkName: string;
    linkDesc: string;
    status?: string | null;
}
export async function fetchAdminInsertLink(link: ILinkBO) {
    return await useMyFetch(`/friendLink`, {
        body: JSON.stringify(link),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export async function fetchAdminUpdateLink(link: ILinkBO) {
    return await useMyFetch(`/friendLink`, {
        body: JSON.stringify(link),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json();
}

// comment
interface ICommentBO {
    content: string | null;
    userId: string | null;
    articleId: string | null;
    replyUserId: string | null;
    status: string | null;
}

export async function fetchAdminComment(page: IPageQuery, comment: ICommentBO) {
    const { pageNum, pageSize } = page
    return await useMyFetch(`/comment/admin/${pageNum}/${pageSize}`, {
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export async function fetchAdminDeleteComment(commentIds: string | string[]) {
    const ids = typeof commentIds === 'string' ? commentIds : commentIds.join()
    return await useMyFetch(`/comment/${ids}`).delete().json();
}

export async function fetchAdminAuditComment(id: string, status: string) {
    return await useMyFetch(`/comment/${id}/${status}`).put().json();
}

export async function fetchArticleOptions() {
    return await useMyFetch('/article/options').get().json()
}

export async function fetchUserOptions() {
    return await useMyFetch('/user/options').get().json()
}

export async function fetchCategoryOptions() {
    return await useMyFetch('/category/options').get().json()
}

export async function fetchTagOptions() {
    return await useMyFetch('/tag/options').get().json()
}