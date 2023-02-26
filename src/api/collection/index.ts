import { UserCollectBO } from '/@/api/types';
import useMyFetch from '/@/util/fetch';

export function fetchUserCollect(bo: UserCollectBO) {
    return useMyFetch(`/collect`,{
        body: JSON.stringify(bo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json();
}