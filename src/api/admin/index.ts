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

export async function fetchAdminFroze(userId: string, froze: string) {
    return await useMyFetch(`/admin/user/froze/${userId}/${froze}`).put().json();
}

export async function fetchAdminDelete(userIds:  string[]) {
    return await useMyFetch(`/admin/user/${userIds.join()}`).delete().json();
}

interface IResetPasswordBO {
    id: string;
    password: string;
}

export async function fetchAdminReset(user:  IResetPasswordBO) {
    return await useMyFetch(`/admin/user/reset`, {
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json();
}
