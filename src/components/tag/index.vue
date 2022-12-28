<template>
  <n-card hoverable content-style="padding: 0;">
    <template #header></template>
    <n-tabs
      justify-content="space-evenly"
      size="large"
      type="line"
      :pane-style="{ padding: 0 }"
    >
      <template #suffix>
        <n-button class="mr-1" text @click="isShrink = !isShrink">
          <n-icon :size="20" :component="showIcon" />
        </n-button>
      </template>
      <n-tab-pane name="rank">
        <template #tab>
          <n-icon :size="20" :component="TagIcon" />
          标签
        </template>
        <template #default>
          <n-space v-show="!isShrink">
            <n-tag
              v-model:checked="v.checked"
              type="success"
              checkable
              v-for="v in tags"
              :key="v.id"
              >{{ v.tagName }}</n-tag
            >
          </n-space>
        </template>
      </n-tab-pane>
      <n-tab-pane name="random">
        <template #tab>
          <n-icon :size="20" :component="LinkIcon" />
          友链
        </template>
        <template #default>
          <n-list v-show="!isShrink" hoverable boarder>                  
            <a v-for="(v, i) in links" :key="v.id" :href="v.linkUrl" target="_blank">
              <n-list-item >
              <!-- {{ v.linkName }} -->

              <n-tooltip
                :style="{ maxWidth: '400px' }"
                placement="left-end"
                trigger="hover"
              >
                <template #trigger>
                  <span>{{ v.linkName }}</span>
                </template>
                {{ v.linkDesc }}
              </n-tooltip>
            </n-list-item>
            </a>

            
          </n-list>
        </template>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import {
  Tag32Regular as TagIcon,
  LinkSquare24Regular as LinkIcon,
  ChevronCircleUp48Regular as UpIcon,
  ChevronCircleDown48Regular as DownIcon,
  DismissCircle48Regular as CloseIcon,
} from "@vicons/fluent";

import { useTagStore, useLinkStore } from "@/store";
import { storeToRefs } from "pinia";

// const isClose = ref(false);
const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

// const tags = ref<TagRes[]>([]);

// const init = async () => {
//   const { data: tagsData } = await useFetch("/api/tag").json();
//   console.log("tagsData", tagsData);
//   tags.value = (tagsData.value as R<TagVO[]>).data.map((e) => ({
//     id: e.id,
//     name: e.tagName,
//     count: e.count,
//     checked: false,
//   }));
//   // console.log("tags", tags);
// };

// init();

const linkStore = useLinkStore();
linkStore.fetchApiLinks();
const { getLinks: links } = storeToRefs(linkStore);

const tagStore = useTagStore();
tagStore.fetchApiTags();
const { getTags: tags } = storeToRefs(tagStore);

// watch(
//   tags,
//   async (newVal, oldVal) => {
//     console.log("new val", newVal);
//     console.log("old val", oldVal);
//   },
//   { deep: true }
// );
</script>

<style lang="scss" scoped></style>
