import { createPinia } from 'pinia';
import useTagStore from './modules/tag';
import useLinkStore from './modules/friend-link'
import useArticleStore from './modules/article';

const pinia = createPinia();

export {
    useTagStore,
    useLinkStore,
    useArticleStore,
}
export default pinia;
