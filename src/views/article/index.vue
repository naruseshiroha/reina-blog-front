<template>
  <div class="border border-black">
    <div class="relative flex flex-col flex-wrap items-center rounded shadow mb-4 px-2" v-for="v in 10 " :key="v">
      <n-icon v-if="'a.top'" color="#F00" class="absolute text-top text-2xl -top-2 right-2" :component="TopIcon"></n-icon>
      <h2 class="text-2xl font-bold my-2">
        <router-link :to="`/article/a.id`">{{ 'a.title' }}</router-link>
      </h2>
      <div class="flex flex-row flex-wrap justify-center mb-2">
        <n-tag class="mr-2">
          <template class="flex">
            <n-icon :component="TimeIcon" />
            &nbsp;2022-12-12&nbsp;
          </template>
        </n-tag>
        <n-tag class="mr-2">
          <template class="flex">
            <n-icon :component="TagsIcon" />
            &nbsp;
            aaa、bbb、ccc
          </template>
          <!-- <i v-for="t in 'a.tags'" :key="t.tag?.id">
            <router-link :to="`/article/tag/${t.tag?.id}`">{{ t.tag?.tagName }}</router-link>
            &nbsp;
          </i> -->
        </n-tag>
        <n-tag class="mr-2">
          <template class="flex">
            <n-icon :component="EyeIcon" />
            &nbsp;{{ 'a.viewCount' }}&nbsp;
          </template>
        </n-tag>
        <n-tag class="mr-2">
          <template class="flex">
            <n-icon :component="LikeIcon" />
            &nbsp;{{ 'a.likeCount' }}&nbsp;
          </template>
        </n-tag>
        <n-tag>
          <template class="flex">
            <n-icon :component="CommentsIcon" />
            &nbsp;{{ 'a.commentCount' }}&nbsp;
          </template>
        </n-tag>
      </div>
      <!-- <div> -->
      <router-link :to="`/post/'a.id'`">
        <div class="relative flex overflow-hidden group">
          <img class="duration-300 group-hover:transform group-hover:scale-125" :src="`/src/assets/img/article/'a.coverImage'`" alt="" />
          <!-- <img :src="`../../assets/img/article/${p?.coverImage}`" alt="" /> -->
          <div style="color: #bbb; background-color: rgba(0, 0, 0, 0.6)" class="absolute inset-x-0 top-0 opacity-0 h-full text-xl p-8 group-hover:opacity-100">
            <!-- {{ a.description }} -->
            xxx
          </div>
        </div>
      </router-link>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Bookmark as TopIcon,
  CalendarAlt as TimeIcon,
  Tags as TagsIcon,
  Eye as EyeIcon,
  ThumbsUp as LikeIcon,
  Comments as CommentsIcon,
  // AngleDown as DownIcon,
  // Comments as CommentsIcon,
} from '@vicons/fa';


</script>

<style lang="scss" scoped></style>
