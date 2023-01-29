<template>
  <n-card hoverable content-style="padding: 0;">
    <template #header></template>
    <n-tabs class="tabs" justify-content="space-evenly" size="large" type="line">
      <template #suffix>
        <n-button text @click="isShrink = !isShrink">
          <n-icon :size="20" :component="showIcon" />
        </n-button>
      </template>
      <n-tab-pane class="!p-2" name="rank">
        <template #tab>
          <n-icon :size="20" :component="TagIcon" />
          标签
        </template>
        <template #default>
          <n-space class="!justify-center" v-show="!isShrink">
            <n-tag v-model:checked="v.checked" type="success" checkable v-for="v in tags" :key="v.id">
              {{ v.tagName }}
            </n-tag>
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
              <n-list-item>
                <!-- {{ v.linkName }} -->

                <n-tooltip :style="{ maxWidth: '400px' }" placement="left-end" trigger="hover">
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

const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

const linkStore = useLinkStore();
linkStore.fetchApiLinks();
const { getLinks: links } = storeToRefs(linkStore);

const tagStore = useTagStore();
tagStore.fetchAllTags();
const { getTags: tags } = storeToRefs(tagStore);

</script>

<style lang="scss" scoped>
:deep(.tabs) {
  .n-tabs-nav__suffix {
    padding: 0 20px
  }
}
</style>
