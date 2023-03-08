import { createPinia } from 'pinia';
import useTagStore from './modules/tag';
import useLinkStore from './modules/friend-link'
import useArticleStore from './modules/article';
import useCommentStore from './modules/comment';
import useUserStore from './modules/user';
import useCollectionStore from './modules/collection';

const pinia = createPinia();

export {
    useUserStore,
    useCollectionStore,
    useTagStore,
    useLinkStore,
    useArticleStore,
    useCommentStore,
}
export default pinia;
