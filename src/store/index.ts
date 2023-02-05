import { createPinia } from 'pinia';
import useTagStore from './modules/tag';
import useLinkStore from './modules/friend-link'
import useArticleStore from './modules/article';
import useCommentStore from './modules/comment';

const pinia = createPinia();

export {
    useTagStore,
    useLinkStore,
    useArticleStore,
    useCommentStore,
}
export default pinia;
