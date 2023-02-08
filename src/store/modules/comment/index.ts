import { fetchArticleComments } from '/@/api/comment';
import { CommentVO } from '/@/api/types';
import { defineStore } from 'pinia';


interface ICommentState {
    comments: CommentVO[];
}

const useCommentStore = defineStore('commentStore', {
    state: (): ICommentState => ({
        comments: []
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
        // api
        async fetchArticleComments(articleId: string) {
            const { data } = await fetchArticleComments(articleId)
            console.log('data', data);
            const { data: comments } = unref(data)
            console.log('comments', comments);
            this.setComments(comments)
        }
    }
})

export default useCommentStore;
