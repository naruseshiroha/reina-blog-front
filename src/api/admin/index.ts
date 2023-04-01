import { IPageQuery, IUserQueryBO } from "../types";
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