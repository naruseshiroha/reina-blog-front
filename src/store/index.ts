import { createPinia } from 'pinia';
import useTagStore from './modules/tag';
import useLinkStore from './modules/friend-link'
import useArticleStore from './modules/article';
import useCommentStore from './modules/comment';
import useUserStore from './modules/user';

const pinia = createPinia();

export {
    useUserStore,
    useTagStore,
    useLinkStore,
    useArticleStore,
    useCommentStore,
}
export default pinia;
