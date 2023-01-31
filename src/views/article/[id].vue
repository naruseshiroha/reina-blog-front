<template>
  <div>
    <n-space vertical>
      <n-switch v-model:value="loading" />
      <n-card>
        <template #header>
          <n-skeleton v-if="loading" text />
          <template v-else>
            <n-breadcrumb>
              <n-breadcrumb-item>
                <router-link to="/">
                  <n-icon :component="HomeIcon" /> Home
                </router-link>
              </n-breadcrumb-item>
              <n-breadcrumb-item>
                <router-link :to="`/category/${category?.id}`">
                  <n-icon :component="FolderIcon" />
                  {{ category?.categoryName }}
                </router-link>
              </n-breadcrumb-item>
              <n-breadcrumb-item>
                <n-icon :component="FileIcon" />
                {{ article?.title }}
              </n-breadcrumb-item>
            </n-breadcrumb>
          </template>
        </template>
        <n-skeleton v-if="loading" text :repeat="6" />
        <template v-else>
          <!-- <h2 class="text-center">
            <span class="text-3xl cursor-pointer">{{ article?.title }}</span>
          </h2> 

          <n-space class="tags m-4 !justify-center">
            <n-tag>
              <n-icon :component="CalendarIcon" />
              &nbsp;{{ article?.createdAt.substring(0, 10) }}&nbsp;
            </n-tag>
            <n-tag>
              <n-icon :component="TagsIcon" />
              花譜、神椿
            </n-tag>
            <n-tag>
              <n-icon :component="EyeIcon" />
              &nbsp;{{ article?.viewCount ?? 0 }}&nbsp;
            </n-tag>
            <n-tag>
              <n-icon :component="LikeIcon" />
              &nbsp;{{ article?.likeCount ?? 0 }}&nbsp;
            </n-tag>
            <n-tag>
              <n-icon :component="CommentsIcon" />
              &nbsp;{{ article?.commentCount ?? 0 }}&nbsp;
            </n-tag>
          </n-space>
          <n-image :src="`/src/assets/img/article/${article?.coverImage}`"
            fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" /> -->
          <KaFu class="markdown-body" />

          <!-- like collect -->
          <div class="lc bg-gray-100">
            <n-button>Like</n-button>
            <n-button>Collect</n-button>
          </div>  
        </template>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import KaFu from '/md/kafu.md';
import {
  Home as HomeIcon,
  FolderOpen as FolderIcon,
  File as FileIcon,
  CalendarAltRegular as CalendarIcon,
  Tags as TagsIcon,
  EyeRegular as EyeIcon,
  ThumbsUpRegular as LikeIcon,
  CommentsRegular as CommentsIcon,
} from '@vicons/fa'
import { useArticleStore } from '@/store';
import { storeToRefs } from 'pinia';
import { fetchArticleMD } from '@/api/md';

const articleStore = useArticleStore();
const route = useRoute();

const id = computed(() => route.params?.id)
const { articleInfo: article, md } = storeToRefs(articleStore)
const loading = computed(() => !Boolean(unref(article)))
console.log('article', isReactive(article));
console.log('article', isRef(article));
console.log('unref', unref(article));

const category = computed(() => unref(article)?.category)

articleStore.fetchArticleContent('kafu.md');

// console.log('ref', article);
// console.log('unref', unref(article));


watch(
  id,
  async (newVal, oldVal) => {
    console.log('newVal', newVal);
    console.log('oldVal', oldVal);
    if (newVal) {
      articleStore.fetchOneArticle(newVal as string)
    }
  },
  { immediate: true }
);



</script>

<style lang="scss" scoped>

</style>