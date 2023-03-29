<template>
  <div>
    <n-card v-show="showBull" hoverable class="mb-3 rounded-md">
      <template #header>
        <span class="text-2xl text-red-500 font-bold">公告请看留言板块</span>
      </template>
      <template #header-extra>
        <n-button text @click="showBull = false">
          <n-icon :size="24" :component="CloseIcon"></n-icon>
        </n-button>
      </template>
    </n-card>
    <n-card data-aos="flip-up" class="article my-2 relative" v-for="v in articles" :key="v.id">
      <n-icon class="absolute -top-2 right-2 text-2xl text-red-700" v-if="v.top" :component="TopIcon" />
      <h2 class=" text-center ">
        <router-link class="text-2xl text-white bg-sky-blue p-0.5 m-0.5 opacity-80" :to="`/article/${v.id}`">{{
          v.title
        }}</router-link>
      </h2>
      <n-space class="tags m-5">
        <n-tag>
          <n-icon :component="CalendarIcon" />
          &nbsp;{{ v.createdAt.substring(0, 10) }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="TagsIcon" />
          <i v-for="t in v.tags" :key="t.id">
            &nbsp;
            <router-link :to="`/tag/${t.tagId}`">{{ t.tagName }}</router-link>
            &nbsp;
          </i>
        </n-tag>
        <n-tag>
          <n-icon :component="EyeIcon" />
          &nbsp;{{ v.viewCount ?? 0 }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="LikeIcon" />
          &nbsp;{{ v.likeCount ?? 0 }}&nbsp;
        </n-tag>
        <n-tag>
          <n-icon :component="CommentsIcon" />
          &nbsp;{{ v.commentCount ?? 0 }}&nbsp;
        </n-tag>
      </n-space>
      <div class="content">
        <router-link :to="`/article/${v.id}`">
          <div class="relative overflow-hidden">
            <img class="mx-auto" :src="`/img/article/${v.coverImage}`" alt="" />
            <div
              class="absolute top-0 h-full w-full p-5 bg-gray-900 bg-opacity-50 text-2xl text-center text-gray-200 italic opacity-0 hover:opacity-100">
              {{ v.description }}
            </div>
          </div>
        </router-link>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import {
  // Fire as FireIcon,
  WindowCloseRegular as CloseIcon,
  Bookmark as TopIcon,
  CalendarAltRegular as CalendarIcon,
  Tags as TagsIcon,
  EyeRegular as EyeIcon,
  ThumbsUpRegular as LikeIcon,
  CommentsRegular as CommentsIcon,
} from "@vicons/fa";
import { useArticleStore } from "/@/store";
import { Ref } from "vue";
import { IPageQuery } from "/@/api/types";

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
});

const showBull = ref(true)
const route = useRoute()
const router = useRouter()

console.log('route', route.query, 'params', route.params);
console.log('router', router);

const params = reactive({
  keyword: '',
  tagIds: [],
  categoryIds: []
})

const articleStore = useArticleStore();
const { getArticles: articles, getArticlePageNum: pageNum } = toRefs(articleStore);

const page: Ref<IPageQuery> = computed(() => reactive({
  pageNum: pageNum.value,
  pageSize: 10
}))
articleStore.fetchPageArticles(page, params);


watch(
  () => props.bottom,
  (newVal) => {
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

:deep(.n-space) {
  justify-content: center !important;
}
</style>
