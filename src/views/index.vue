<template>
  <div>
    <span v-if="top"> 已经到顶了哦！ </span> <br />
    <n-card class="article my-2 relative" v-for="v in articles" :key="v.id">
      <n-icon class="absolute -top-2 right-2 text-2xl text-rose-700" v-if="v.top" :component="TopIcon" />
      <h2 class=" text-center ">
        <router-link class="text-2xl text-white bg-sky-blue p-0.5 m-0.5 opacity-80" :to="`/article/${v.id}`">{{ v.title }}</router-link>
      </h2>
      <n-space class="tags m-5 !justify-center">
        <n-tag>
          <n-icon :component="CalendarIcon" />
          &nbsp;{{ v.createdAt.substring(0, 10) }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="TagsIcon" />
          花譜、神椿
          <!-- <i v-for="t in v.tags" :key="t.tag?.id">
                                            &nbsp;<router-link :to="`/post/tag/${t.tag?.id}`">{{
                                                    t.tag?.tagName
                                            }}</router-link>&nbsp;
                                        </i> -->
        </n-tag>
        <n-tag>
          <n-icon :component="EyeIcon" />
          &nbsp;{{ v.viewCount }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="LikeIcon" />
          &nbsp;{{ v.likeCount }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="CommentsIcon" />
          &nbsp;{{ v.commentCount }}&nbsp;
        </n-tag>
      </n-space>
      <div class="content">
        <router-link :to="`/post/${v.id}`">
          <div class="img">
            <img :src="`/src/assets/img/article/${v.coverImage}`" alt="" />
            <div class="description">
              {{ v.description }}
            </div>
          </div>
        </router-link>
      </div>
    </n-card>
    bottom: {{ bottom }} <br />

    <span v-if="bottom"> 已经到底了哦！ </span> <br />
  </div>
</template>

<script setup lang="ts">
import {
  Fire as FireIcon,
  Bookmark as TopIcon,
  CalendarAltRegular as CalendarIcon,
  Tags as TagsIcon,
  EyeRegular as EyeIcon,
  ThumbsUpRegular as LikeIcon,
  CommentsRegular as CommentsIcon,
} from "@vicons/fa";
import { useArticleStore } from "@/store";
import { useFetch } from "@vueuse/core";
import { IPageQuery } from "@/api/types";
import { Ref } from "vue";

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
});

const email = ref("lixunsam");
const { data } = useFetch(`/api/user/code?email=${email.value}`).get().text();
console.log("res", data);


const articleStore = useArticleStore();
const { getArticles: articles, getArticlePageNum: pageNum } = toRefs(articleStore);

const page:Ref<IPageQuery> = computed(() => reactive({
  pageNum: pageNum.value,
  pageSize: 10
}))
articleStore.fetchPageArticles(page);


watch(
  () => props.bottom,
  (newVal, oldVal) => {
    if (newVal == true) {
      page.value.pageNum += 1;
      articleStore.fetchPageArticles(page)
    }
  },
);

</script>

<style lang="scss" scoped>
:deep(.n-tag__content) {
  display: flex;
}
</style>
