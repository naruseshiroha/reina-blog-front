import { defineStore } from 'pinia';
import { fetchLinks, fetchApplyLink } from '/@/api/friend-link';
import { Link, LinkBO, LinkVO, R } from '/@/api/types';

interface ILinkState {
  //   nickName: string;
  //   avatar: string;
  //   verifyCode: string;
  //   token: string;
  links: LinkVO[];
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
const useLinkStore = defineStore('linkStore', {
  // other options...
  state: (): ILinkState => ({
    links: [],
  }),
  persist: true,
  getters: {
    getLinks(): LinkVO[] {
      return this.links;
    },
  },
  actions: {
    patch(partial: Partial<ILinkState>) {
      this.$patch(partial);
    },
    reset() {
      this.$reset();
    },
    setLinks(links: LinkVO[]) {
      this.links = links;
    },
    // api
    async fetchApiLinks() {
      const { data } = await fetchLinks();
      this.setLinks((data.value as R<Link[]>).data);
    },
    async fetchApplyLink(link: LinkBO) {
      const { data } = await fetchApplyLink(link)
      return unref(data)
    }
  },
});

export default useLinkStore;
