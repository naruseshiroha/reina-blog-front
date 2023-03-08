import { IPageQuery } from './../../../api/types/index';
import { defineStore } from 'pinia';
import { fetchUserCollect, fetchListUserCollect } from '/@/api/collection';
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
            console.log('data', data);
            const { data: result, error, message } = unref(data)
            if (error) {
                return Error(message);
            } else {
                return result;
            }
        },
        async fetchListUserCollect(userId: string) {
            const { data } = await fetchListUserCollect(userId, this.page)
            console.log('data', data);
            const { data: { list: collections, total } } = unref(data)
            this.setCollections(collections)
            this.total = total
        },
    },
});

export default useCollectionStore;
