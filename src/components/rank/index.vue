<template>
  <n-card v-if="!isClose" hoverable title="">
    <template #header>
      <div class="flex items-center">
        <n-icon :component="RankIcon"></n-icon>
        <span class="ml-1"> 排行榜 </span>
      </div>
    </template>
    <template #header-extra>
      <n-button text @click="isShrink = !isShrink">
        <n-icon :size="20" :component="showIcon" />
      </n-button>
      <n-button text @click="isClose = true">
        <n-icon :size="20" :component="CloseIcon" />
      </n-button>
    </template>
    <n-list v-show="!isShrink" hoverable boarder>
      <n-list-item v-for="(v, i) in ranks" :key="i">
        {{ v.title }}
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import {
  DataBarVertical24Regular as RankIcon,
  ChevronCircleUp48Regular as UpIcon,
  ChevronCircleDown48Regular as DownIcon,
  DismissCircle48Regular as CloseIcon,
} from "@vicons/fluent";

const isClose = ref(false);
const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

const ranks = computed(() => [
  {
    id: 1,
    title: "Title 01",
    createdAt: "2022-11-11 12:13:14",
  },
  {
    id: 2,
    title: "Title 02",
    createdAt: "2022-11-11 12:13:14",
  },
  {
    id: 3,
    title: "Title 03",
    createdAt: "2022-11-11 12:13:14",
  },
  {
    id: 4,
    title: "Title 04",
    createdAt: "2022-11-11 12:13:14",
  },
  {
    id: 5,
    title: "Title 05",
    createdAt: "2022-11-11 12:13:14",
  },
  {
    id: 6,
    title: "Title 06",
    createdAt: "2022-11-11 12:13:14",
  },
]);
</script>

<style lang="scss" scoped></style>
