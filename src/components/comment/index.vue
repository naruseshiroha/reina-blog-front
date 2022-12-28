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
            <span>{{ v.content.slice(0, 30).concat("...") }}</span>
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

const isClose = ref(false);
const isShrink = ref(false);
const showIcon = computed(() => (isShrink.value ? UpIcon : DownIcon));

const comments = computed(() => [
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
  {
    avatar: "/src/assets/imgs/another.jpg",
    articleId: "1",
    content:
      "真不容易，我深入推galgame后才真正知道较冷门作品的好，废萌作品入坑，被rukuru震撼还有这样的剧情作，发现还有紫社这样社保的CG，最近推夏空的英仙座发现还有这么用心的社团给gal做全程动画。想找老作品还是弟弟君靠谱，节省了很多的找资源的精力，第一次很遗憾没早出生几年错过了这样的一个时代，再次感谢弟弟君。",
    createdAt: "2022-10-12",
  },
]);
</script>

<style lang="scss" scoped></style>
