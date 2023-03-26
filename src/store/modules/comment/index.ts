import { fetchArticleComments, fetchRecentComments, fetchPageMessages } from '/@/api/comment';
import { CommentVO, CommentBO, IPageQuery } from '/@/api/types';
import { defineStore } from 'pinia';


interface ICommentState {
    total: number;
    page: IPageQuery;
    comments: CommentVO[];
    recentComments: CommentVO[];
    messages: CommentVO[];
}

const useCommentStore = defineStore('commentStore', {
    state: (): ICommentState => ({
        comments: [],
        recentComments: [],
        messages: [],
        total: 0,
        page: {
            pageNum: 1,
            pageSize: 7
        }
    }),
    persist: true,
    getters: {
        getComments(): CommentVO[] {
            return this.comments;
        },
        getMessages(): CommentVO[] {
            return this.messages;
        },
        getPage(): IPageQuery {
            return this.page;
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
        setMessages(comments: CommentVO[]) {
            this.messages = comments;
        },
        // api
        async fetchArticleComments(articleId: string) {
            const { data } = await fetchArticleComments(articleId)
            const { data: comments } = unref(data)
            this.setComments(comments)
        },
        async fetchRecentComments(page: IPageQuery) {
            const { data } = await fetchRecentComments(page);
            const { error, message, data: result } = unref(data)
            if (error) {
                return Error(message)
            } else {
                const { list: comments } = result;
                this.setRecentComments(comments)
            }
        },
        async fetchPageMessages(commentBo: CommentBO, page: IPageQuery) {
            const { data } = await fetchPageMessages(commentBo, page)
            const { error, message, data: result } = unref(data)
            if (error) {
                return Error(message)
            } else {
                const { list: comments, total } = result;
                this.total = total
                this.setMessages(comments)
            }
        }
    }
})

export default useCommentStore;
