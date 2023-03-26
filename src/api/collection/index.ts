import { IPageQuery } from './../types/index';
import { UserCollect } from '/@/api/types';
import useMyFetch from '/@/util/fetch';

export function fetchUserCollect(bo: UserCollect) {
    return useMyFetch(`/collect`, {
        body: JSON.stringify(bo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}

export function fetchListUserCollect(userId: string, page: IPageQuery = { pageNum: 1, pageSize: 7 }) {
    const { pageNum, pageSize } = page
    return useMyFetch(`/collect/${userId}/${pageNum}/${pageSize}`).get().json()
}

export function fetchRemoveUserCollect(ids: string[]) {
    return useMyFetch<boolean>(`/collect/${ids.join()}`).delete().json()
}
