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
    <n-list class="rank" v-show="!isShrink" hoverable boarder>
      <n-list-item v-for="(v, i) in ranks" :key="i">
        <RouterLink :to="`/article/${v.id}`">
          <span class="text-base">{{ v.title }}</span>
        </RouterLink>
        <div class="right ml-auto flex flex-row flex-nowrap ">
          <n-icon color=" red" :size="20">
            <FireIcon />
          </n-icon>
          {{ v.viewCount }}
        </div>
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
import { Fire as FireIcon } from '@vicons/fa';
import { useArticleStore } from "/@/store";

const articleStore = useArticleStore()
articleStore.fetchRankArticle()

const { ranks } = storeToRefs(articleStore);

const isClose = ref(false);
const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

</script>

<style lang="scss" scopes>
.rank {
  .n-list-item {
    .n-list-item__main {
      display: flex;
      align-items: center;

      .right {
        min-width: 55px;
        justify-content: space-around;
      }
    }
  }
}
</style>