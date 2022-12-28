import { createPinia } from 'pinia';
import useTagStore from './modules/tag';
import useLinkStore from './modules/friend-link'

const pinia = createPinia();

export {
    useTagStore,
    useLinkStore
}
export default pinia;
