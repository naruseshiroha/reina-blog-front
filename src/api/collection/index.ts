import useMyFetch from '/@/util';

export function fetchCollectArticle() {
    return useMyFetch(`/collect`).post().json();
}