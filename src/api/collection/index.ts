import useMyFetch from '/@/util/fetch';

export function fetchCollectArticle() {
    return useMyFetch(`/collect`).post().json();
}