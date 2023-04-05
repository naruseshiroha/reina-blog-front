import { IPageQuery } from './../../../api/types/index';
import { defineStore } from 'pinia';
import { fetchUserCollect, fetchListUserCollect, fetchRemoveUserCollect } from '/@/api/collection';
import { UserCollect } from '/@/api/types';

interface IUserCollectionState {
    collections: UserCollect[];
    total: number;
    page: IPageQuery
}

const useCollectionStore = defineStore('collectionStore', {
    state: (): IUserCollectionState => ({
        collections: [],
        total: 0,
        page: {
            pageNum: 1,
            pageSize: 7
        }
    }),
    persist: true,
    getters: {
        getCollections(): UserCollect[] {
            return this.collections;
        },
    },
    actions: {
        patch(partial: Partial<IUserCollectionState>) {
            this.$patch(partial);
        },
        reset() {
            this.$reset();
        },
        setCollections(collections: UserCollect[]) {
            this.collections = collections;
        },
        // api
        async fetchUserCollect(bo: UserCollect) {
            const { data } = await fetchUserCollect(bo)
            return unref(data)
        },
        async fetchListUserCollect(userId: string) {
            const { data } = await fetchListUserCollect(userId, this.page)
            const { data: { list: collections, total } } = unref(data)
            this.setCollections(collections)
            this.total = total
        },
        async fetchRemoveUserCollect(ids: string[], userId: string) {
           const { data } = await fetchRemoveUserCollect(ids, userId)
           return unref(data).data;
        }
    },
});

export default useCollectionStore;
