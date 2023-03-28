<template>
  <n-card v-if="!isClose" hoverable title="">
    <template #header>
      <div class="flex items-center">
        <n-icon :component="RandomIcon"></n-icon>
        <span class="ml-1"> 随机文章 </span>
        <n-button text @click="handleRandomArticle">
          <n-icon :size="20" :component="RefreshIcon" />
        </n-button>
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
      <n-list-item v-for="(v, i) in randoms" :key="i">
        <RouterLink :to="`/article/${v.id}`">
          {{ v.title }}
        </RouterLink>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import {
  ArrowSync24Regular as RefreshIcon,
  DocumentSync24Regular as RandomIcon,
  ChevronCircleUp48Regular as UpIcon,
  ChevronCircleDown48Regular as DownIcon,
  DismissCircle48Regular as CloseIcon,
} from "@vicons/fluent";
import { useArticleStore } from "/@/store";

const articleStore = useArticleStore()
articleStore.fetchRandomArticle()

const { randoms } = storeToRefs(articleStore)
const isClose = ref(false);
const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

const handleRandomArticle = () => {
  articleStore.fetchRandomArticle()
}

</script>
