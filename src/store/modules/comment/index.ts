import { IPageQuery } from './../../../api/types/index';
import { fetchArticleComments, fetchRecentComments } from '/@/api/comment';
import { CommentVO } from '/@/api/types';
import { defineStore } from 'pinia';


interface ICommentState {
    comments: CommentVO[];
    recentComments: CommentVO[];
}

const useCommentStore = defineStore('commentStore', {
    state: (): ICommentState => ({
        comments: [],
        recentComments: [],
    }),
    getters: {
        getComments(): CommentVO[] {
            return this.comments;
        }
    },
    actions: {
        patch(partial: Partial<ICommentState>) {
            this.$patch(partial);
        },
        reset() {
            this.$reset();
        },
        setComments(comments: CommentVO[]) {
            this.comments = comments;
        },
        setRecentComments(comments: CommentVO[]) {
            this.recentComments = comments;
        },
        // api
        async fetchArticleComments(articleId: string) {
            const { data } = await fetchArticleComments(articleId)
            console.log('data', data);
            const { data: comments } = unref(data)
            console.log('comments', comments);
            this.setComments(comments)
        },
        async fetchRecentComments(page: IPageQuery) {
            const { data } = await fetchRecentComments(page);
            console.log('data...', data);
            const { error, message, data: result } = unref(data)
            if (error) {
                return Error(message)
            } else {
                const { list: comments } = result;
                this.setRecentComments(comments)
            }
        }
    }
})

export default useCommentStore;
