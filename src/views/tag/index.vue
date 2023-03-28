<template>
  <!-- <pre>{{ tags }}</pre> -->
  <!-- <n-grid :x-gap="12" :y-gap="8" :cols="4">
    <n-grid-item v-for="(v, i) in tags" :key="i">
      <n-card :title="v.tagName">
        <n-ellipsis line-clamp="2" expand-trigger="click" :tooltip="false">
          {{ v.tagDesc }}
        </n-ellipsis>
      </n-card>
    </n-grid-item>
  </n-grid> -->
  <div class="tag">
    <h1 class="text-center text-3xl font-bold">标签页</h1>
    <n-grid class="mt-4" :x-gap="12" :y-gap="8" :cols="5">
      <n-grid-item class="flex" v-for="(t, i) in tags" :key="i">
        <n-card hoverable embedded>
          <template #header>
            <RouterLink :to="{ name: 'index', params: { tagId: t.id } }">
              {{ t.tagName }}
            </RouterLink>
          </template>
          <template #header-extra>
            <n-button text @click="shrinkArr[i] = !shrinkArr[i]">
              <n-icon v-show="!shrinkArr[i]" :size="24" :component="DownIcon"></n-icon>
              <n-icon v-show="shrinkArr[i]" :size="24" :component="UpIcon"></n-icon>
            </n-button>
          </template>
          <span v-show="!shrinkArr[i]">{{ t.tagDesc }}</span>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { useTagStore } from '/@/store';
import {
  ChevronCircleUp48Regular as UpIcon,
  ChevronCircleDown48Regular as DownIcon
} from "@vicons/fluent";

const tagStore = useTagStore();

tagStore.fetchAllTags();
const { getTags: tags } = toRefs(tagStore);
const shrinkArr = reactive(new Array(tags.value.length ?? 0).fill(true))

</script>
