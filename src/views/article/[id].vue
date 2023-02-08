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
                  <n-icon :component="HomeIcon" />
                  Home
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
          <!-- <KaFu class="markdown-body" /> -->
          <div class="markdown-body" v-html="article?.content"></div>

          <!-- like collect -->
          <div class="my-2 flex items-center">
            <!-- <div> -->
            <div class="mr-auto flex items-center">
              <n-icon class="mx-1" :size="22">
                <TagsIcon />
              </n-icon>
              <n-tag class="mx-1" v-for="v in article?.tags" :key="v.id">{{
                v.tagName
              }}</n-tag>
            </div>
            <!-- </div> -->
            <!-- <n-grid :x-gap="12" :cols="4">
              <n-grid-item class="text-center" :offset="1"> -->
            <n-button class="mr-2">
              <template #icon>
                <n-icon>
                  <LikeIcon />
                </n-icon>
              </template>
              喜欢
            </n-button>
            <!-- </n-grid-item>
              <n-grid-item class="text-center"> -->
            <n-button>
              <template #icon>
                <n-icon>
                  <CollectIcon />
                </n-icon>
              </template>
              收藏
            </n-button>
            <!-- </n-grid-item>
            </n-grid> -->
          </div>

          <!-- Comment -->
          <div class="comment">
            <div class="amount border p-2 flex items-center justify-center">
              <n-icon class="mr-1" :size="22">
                <CommentsIcon />
              </n-icon>
              <span class="text-xl">{{ 1234 }}条评论</span>
            </div>

            <!-- <div v-for="comment in comments" :key="comment.id" class="mt-5">
              <n-card :title="`${comment.nickName} 说道：`" hoverable>
                <template #header-extra>
                  <span class="text-base flex items-center">
                    {{ comment.createdAt.replace(/T/, " ") }}
                    <n-button v-show="comment.children" class="ml-2" text
                      @click="comment.collapsed = !comment.collapsed">
                      <n-icon :size="18" :component="
                        comment.collapsed ? ChevronCircleUpIcon : ChevronCircleDownIcon
                      " />
                    </n-button>
                  </span>
                </template>
                <div class="relative pb-4">
                  <p :style="{ textIndent: '2rem' }">{{ comment.content }}</p>
                  <n-avatar class="absolute -top-8 -left-12" round :size="48"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                </div>
                <template #footer>
                  <div>
                    <n-button class="float-right" type="text">
                      <template #icon>
                        <ReplyIcon />
                      </template>
                      <span>回复</span>
                    </n-button>
                  </div>
                </template>

                <n-card v-show="!comment.collapsed" v-for="child in comment.children"
                  :title="`${child.nickName} 回复 ${child.replyNickName} ：`" hoverable>
                  <template #header-extra>
                    <span>
                      {{ child.createdAt.replace(/T/, " ") }}
                    </span>
                  </template>
                  <div class="relative pb-4">
                    <p :style="{ textIndent: '2rem' }">{{ child.content }}</p>
                    <n-avatar class="absolute -top-8 -left-12" round :size="48"
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                  </div>
                  <template #footer>
                    <div>
                      <n-button class="float-right" type="text">
                        <template #icon>
                          <ReplyIcon />
                        </template>
                        <span>回复</span>
                      </n-button>
                    </div>
                  </template>
                </n-card>
              </n-card>
            </div> -->



          </div>
        </template>
        <div id="artalk">

        </div>
      </n-card>
    </n-space>

    <!-- 发表评论 -->
  </div>
</template>

<script setup lang="ts">
// import KaFu from '/md/kafu.md';
import 'artalk/dist/Artalk.css'
import Artalk from 'artalk'

import {
  Home as HomeIcon,
  FolderOpen as FolderIcon,
  File as FileIcon,
  CalendarAltRegular as CalendarIcon,
  Tags as TagsIcon,
  EyeRegular as EyeIcon,
  ThumbsUpRegular as LikeIcon,
  HeartRegular as CollectIcon,
  CommentsRegular as CommentsIcon,
  ChevronCircleUp as ChevronCircleUpIcon,
  ChevronCircleDown as ChevronCircleDownIcon,
  Reply as ReplyIcon,
} from "@vicons/fa";
import { useArticleStore, useCommentStore } from "/@/store";
import { storeToRefs } from "pinia";
// import { fetchArticleMD } from '@/api/md';

const artalkRef = ref("#artalk")

onMounted(() => {
  const artalk = new Artalk({
    el: artalkRef.value,
    pageKey: ``,
    pageTitle: ``,
    server: 'http://47.94.11.160:6218/',
    site: 'reina',
    // ...
  })
})


const articleStore = useArticleStore();
const commentStore = useCommentStore();
const route = useRoute();

const id = computed(() => route.params?.id);
const { articleInfo: article, md } = storeToRefs(articleStore);
const { comments } = storeToRefs(commentStore);
const loading = computed(() => !Boolean(unref(article)));

const category = computed(() => unref(article)?.category);

// articleStore.fetchArticleContent('kafu.md');

// console.log('ref', article);
// console.log('unref', unref(article));

watch(
  id,
  async (newVal, oldVal) => {
    console.log("newVal", newVal);
    console.log("oldVal", oldVal);
    if (newVal) {
      articleStore.fetchOneArticle(newVal as string);
      commentStore.fetchArticleComments(newVal as string);
    }
  },
  { immediate: true }
);


</script>

<style lang="scss" scoped>
:deep(.comment) {
  .n-card-header__main {
    font-size: 20px;
  }

  .n-card__content {
    padding: 0 24px;
  }

  .n-card__footer {
    padding: 0 0 5px 0;
  }
}
</style>
