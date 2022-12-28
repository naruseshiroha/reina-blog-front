import { defineStore } from 'pinia';
import { fetchTags } from '@/api/tag';
import { Tag, R, TagVO } from '@/api/types';

interface ITagState {
  tags: TagVO[];
  selected: String[];
}

const useTagStore = defineStore('TagStore', {
  state: (): ITagState => ({
    tags: [],
    selected: [],
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
    async fetchApiTags() {
      const { data } = await fetchTags();
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
  },
});

export default useTagStore;
