<template>
  <n-card v-if="!isClose" hoverable title="">
    <template #header>
      <div class="flex items-center">
        <n-icon :component="CommentsIcon"></n-icon>
        <span class="ml-1"> 最新评论 </span>
      </div>
    </template>
    <template #header-extra>
      <!-- <n-button text>
        <n-icon :size="20" :component="UpIcon" />
      </n-button> -->
      <n-button text @click="isShrink = !isShrink">
        <n-icon :size="20" :component="showIcon" />
      </n-button>
      <n-button text @click="isClose = true">
        <n-icon :size="20" :component="CloseIcon" />
      </n-button>
    </template>
    <n-list v-show="!isShrink" hoverable boarder>
      <!-- <template #header> hhh </template>
      <template #footer> fff </template> -->
      <n-list-item v-for="(v, i) in comments" :key="i">
        <!-- 
        <template #suffix>
          <n-button>Suffix</n-button>
        </template> -->
        <template #prefix>
          <n-avatar
            round
            size="large"
            :src="v.avatar"
            fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </template>
        <n-tooltip :style="{ maxWidth: '400px' }" placement="left-end" trigger="hover">
          <template #trigger>
            <RouterLink :to="`/article/${v.articleId}#${v.id}`">
              <!-- <span>{{ v.content.slice(0, 30).concat("...") }}</span> -->
              <span v-html="v.content" @click="handleToArtile(v.articleId)"></span>
            </RouterLink>
          </template>
          {{ v.content }}
        </n-tooltip>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import {
  CommentMultiple32Regular as CommentsIcon,
  ChevronCircleUp48Regular as UpIcon,
  ChevronCircleDown48Regular as DownIcon,
  DismissCircle48Regular as CloseIcon,
} from "@vicons/fluent";
import { IPageQuery } from "/@/api/types";
import { useCommentStore } from "/@/store";

const isClose = ref(false);
const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

const page = reactive<IPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

const commentStore = useCommentStore();
commentStore.fetchRecentComments(page);
const { recentComments: comments } = storeToRefs(commentStore);

const handleToArtile = async (articleId: string) => {
  console.log("articleId", articleId);
};
</script>

<style lang="scss" scoped></style>
