import { defineStore } from 'pinia';
import { fetchTags } from '@/api/tag';
import { Tag, R, TagVO, IPageQuery } from '@/api/types';

interface ITagState {
  tags: TagVO[];
  selected: String[];
  tagIsFinished: boolean;
  tagTotal: number;
}

const useTagStore = defineStore('TagStore', {
  state: (): ITagState => ({
    tags: [],
    selected: [],
    tagIsFinished: false,
    tagTotal: 0,
  }),
  getters: {
    getTags(): TagVO[] {
      return this.tags;
    },
    getSelected(): String[] {
      return this.selected;
    },
  },
  actions: {
    patch(partial: Partial<ITagState>) {
      this.$patch(partial);
    },
    reset() {
      this.$reset();
    },
    setTags(tags: TagVO[]) {
      this.tags = tags;
    },
    setSelected(selected: String[]) {
      this.selected = selected;
    },
    // api
    async fetchAllTags(pageNum: number = 1, pageSize: number = 9999) {
      const { data } = await fetchTags(pageNum, pageSize);
      console.log('data', data);
      
      this.setTags(
        (data.value as R<Tag[]>).data.map(e => ({
          id: e.id,
          tagName: e.tagName,
          tagDesc: e.tagDesc,
          count: e.count,
          checked: false,
        }))
      );
    },
    async fetchPageTag(page: IPageQuery) {
      if (this.tagIsFinished) return
      const { pageNum, pageSize } = page
      const { data } = await fetchTags(pageNum, pageSize);
      const { code, data: { list: tags, total } } = data.value

      if (!this.tagTotal) this.tagTotal = total
      if (pageNum * pageSize >= this.tagTotal) this.tagIsFinished = true

      if (this.tags.length === 0) {
        this.setTags(tags)
      } else {
        this.tags.push(...tags)
      }
    }
  },
});

export default useTagStore;
