<template>
  <div>
    <n-space vertical>
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
              <n-tag class="mx-1" v-for="v in article?.tags" :key="v.id">
                {{ v.tagName }}
              </n-tag>
            </div>
            <!-- </div> -->
            <!-- <n-grid :x-gap="12" :cols="4">
              <n-grid-item class="text-center" :offset="1"> -->
            <n-button class="mr-2" @click="handleLikeButton">
              <template #icon>
                <n-icon>
                  <LikeIcon />
                </n-icon>
              </template>
              <span :style="{ width: '28px' }">{{ isLike ? "已赞" : "赞" }}</span>
              <!-- {{ like ? "已喜欢" : "喜欢" }} -->
            </n-button>
            <!-- </n-grid-item>
              <n-grid-item class="text-center"> -->
            <n-button @click="handleCollectButton">
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
            <div class="amount border p-2 mb-2 flex items-center justify-center">
              <n-icon class="mr-1" :size="22">
                <CommentsIcon />
              </n-icon>
              <span class="text-xl">{{ 1234 }}条评论</span>
            </div>

            {{ replyUserId }}

            <div id="reply-wrapper">
              <div class="reply relative" id="reply">
                <div :style="{ border: '1px solid #ccc', zIndex: 9999 }">
                  <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                  />
                  <Editor
                    style="height: 250px; overflow-y: hidden"
                    v-model="content"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                  />
                  <n-button
                    @click="handleCancelReplyBtn"
                    v-show="showCloseIcon"
                    type="text"
                    class="absolute bottom-0 right-0 m-2"
                  >
                    取消回复
                    <n-icon :size="18">
                      <CloseIcon />
                    </n-icon>
                  </n-button>
                  <div class="text-center border p-2 bg-white">
                    <n-button type="text" class="text-base" @click="handlePublished">
                      发表评论
                    </n-button>
                  </div>
                </div>
              </div>
            </div>

            <div v-for="comment in comments" :key="comment.id" class="mt-5">
              <n-card
                :id="`${comment.id}`"
                :title="`${comment.nickName} 说道：`"
                hoverable
              >
                <template #header-extra>
                  <span class="text-base flex items-center">
                    {{ comment.createdAt.replace(/T/, " ") }}
                    <n-button
                      v-show="comment.children"
                      class="ml-2"
                      text
                      @click="comment.collapsed = !comment.collapsed"
                    >
                      <n-icon
                        :size="18"
                        :component="
                          comment.collapsed ? ChevronCircleUpIcon : ChevronCircleDownIcon
                        "
                      />
                    </n-button>
                  </span>
                </template>
                <div class="relative pb-4">
                  <p :style="{ textIndent: '2rem' }" v-html="comment.content"></p>
                  <n-avatar
                    class="absolute -top-8 -left-12"
                    round
                    :size="48"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  />
                </div>
                <template #footer>
                  <div>
                    <n-button
                      class="float-right"
                      type="text"
                      @click="handleReplyBtn(comment, $event)"
                    >
                      <template #icon>
                        <ReplyIcon />
                      </template>
                      <span>回复</span>
                    </n-button>
                    <div class="clear-right"></div>
                  </div>
                </template>

                <n-card
                  :id="`${child.id}`"
                  v-show="!comment.collapsed"
                  v-for="child in comment.children"
                  :title="`${child.nickName} 回复 ${child.replyNickName} ：`"
                  hoverable
                >
                  <template #header-extra>
                    <span>
                      {{ child.createdAt.replace(/T/, " ") }}
                    </span>
                  </template>
                  <div class="relative pb-4">
                    <p :style="{ textIndent: '2rem' }" v-html="child.content"></p>
                    <n-avatar
                      class="absolute -top-8 -left-12"
                      round
                      :size="48"
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    />
                  </div>
                  <template #footer>
                    <div>
                      <n-button
                        class="float-right"
                        type="text"
                        @click="handleReplyBtn(child, $event)"
                      >
                        <template #icon>
                          <ReplyIcon />
                        </template>
                        <span>回复</span>
                      </n-button>
                      <div class="clear-right"></div>
                    </div>
                  </template>
                </n-card>
              </n-card>
            </div>
          </div>
        </template>
        <!-- artalk -->
        <!-- <div id="artalk"></div> -->
      </n-card>
    </n-space>

    <!-- {{ comments }} -->

    <!-- 发表评论 -->
  </div>
</template>

<script setup lang="ts">
// import KaFu from '/md/kafu.md';

import "@wangeditor/editor/dist/css/style.css";
// import "artalk/dist/Artalk.css";
// import Artalk from "artalk";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Close as CloseIcon } from "@vicons/ionicons5";
import {
  Home as HomeIcon,
  FolderOpen as FolderIcon,
  File as FileIcon,
  // CalendarAltRegular as CalendarIcon,
  Tags as TagsIcon,
  // EyeRegular as EyeIcon,
  ThumbsUpRegular as LikeIcon,
  HeartRegular as CollectIcon,
  CommentsRegular as CommentsIcon,
  ChevronCircleUp as ChevronCircleUpIcon,
  ChevronCircleDown as ChevronCircleDownIcon,
  Reply as ReplyIcon,
} from "@vicons/fa";
import { useArticleStore, useCommentStore, useUserStore } from "/@/store";
import { storeToRefs } from "pinia";
import { useFetch } from "@vueuse/core";
import { CommentVO, UserCollectBO } from "/@/api/types";
// import { fetchArticleMD } from '@/api/md';

const message = useMessage();
const articleStore = useArticleStore();
const commentStore = useCommentStore();
const userStore = useUserStore();
const route = useRoute();


const id = computed(() => route.params?.id as string);
const { articleInfo: article } = storeToRefs(articleStore);
const { comments } = storeToRefs(commentStore);
const loading = computed(() => !Boolean(unref(article)));

const uid = ref("123");
const isLike = computed(() => articleStore.checkIsLiked(unref(uid)));
const category = computed(() => unref(article)?.category);

const handleLikeButton = async () => {
  const res = await articleStore.fetchLikeArticle(unref(id), unref(uid), unref(isLike));
  message.success(res);
};

const { userId } = storeToRefs(userStore)
// const { userId } = storeToRefs(userStore)


const userCollectBO = reactive<UserCollectBO>({
  userId: unref(userId),
  articleId: article.value?.id || "",
  title: article.value?.title || ""
})
const handleCollectButton = async () => {
  console.log('bo', userCollectBO);
  if (!userCollectBO.userId) {
    message.warning("请登录后在进行此操作！")
    return
  }
  const data = await userStore.fetchUserCollect(userCollectBO)
  console.log('data..', data);
  if (data instanceof Error) {
    message.error(data.message)
  } else {
    message.success("收藏成功！")
  }
  
};

const showCloseIcon = ref(false);
const mode = "default";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const content = ref("");

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  removeEditor();
});

const removeEditor = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
};

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 发表评论
const replyUserId = ref("");
const replyObj = reactive<{
  content: string | undefined;
  parentId: string | undefined;
  replyUserId: string | undefined;
  replyNickName: string | undefined;
}>({
  content: undefined,
  parentId: undefined,
  replyUserId: undefined,
  replyNickName: undefined,
});
// 移除 replyNode
const removeReplyNode = (): HTMLElement => {
  const rNode = document.getElementById("reply");
  rNode?.remove();
  return rNode as HTMLElement;
};
// 点击取消回复
const handleCancelReplyBtn = () => {
  showCloseIcon.value = false;
  // 还原
  const rNode = removeReplyNode();
  const wrapper = document.getElementById("reply-wrapper");
  wrapper?.appendChild(rNode);
};
// 点击回复按钮
const handleReplyBtn = async (comment: CommentVO, event: Event) => {
  const {
    id: parentId,
    userId: replyUserId,
    nickName: replyNickName,
    articleId,
  } = comment;
  Object.assign(replyObj, {
    parentId,
    replyUserId,
    replyNickName,
    articleId,
  });

  showCloseIcon.value = true;
  const buttonNode = event.currentTarget;

  // remove node
  const rNode = removeReplyNode();
  const replyNode = (buttonNode as HTMLElement).parentNode?.parentNode;
  (replyNode as Node)?.appendChild(rNode as HTMLElement);
};
const handlePublished = async () => {
  // const bo = {
  //   userId: "1",
  //   nickName: "test",
  //   articleId: "1614829115282874369",
  //   content: "test comment",
  //   parentId: null,
  //   replyUserId: null,
  //   replyNickName: null,
  // };
  // @TODO: userId, nickName, parentId, replyUserId, replyNickName
  Object.assign(replyObj, {
    userId: "1",
    nickName: "test",
    content: content,
    articleId: id,
  });
  // check content not empty
  const regexp = /^(<p>(<br>)*(\s(&nbsp;)*)*<\/p>)+$/;
  if (regexp.test(unref(content))) {
    message.warning("评论不能为空！");
    return;
  }
  const { data } = await useFetch("/api/comment", {
    body: JSON.stringify(replyObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .post()
    .json();
  const { code, msg } = unref(data);
  if (code === 200) {
    message.success("发表成功，请等待管理员审核！");
    content.value = "";
  } else {
    message.error(msg);
  }
};

watch(
  id,
  async (newVal, _oldVal) => {
    if (newVal) {
      articleStore.fetchOneArticle(newVal as string);
      commentStore.fetchArticleComments(newVal as string);
      articleStore.fetchLikeArticleUser(newVal as string);
    }
  },
  { immediate: true }
);

// 锚点定位
const anchor = computed(() => route.hash);
onMounted(() => {
  watch(
    anchor,
    (newVal, _oldVal) => {
      setTimeout(() => {
        document.getElementById(newVal.substring(1))?.scrollIntoView(false);
      }, 500);
    },
    { immediate: true }
  );
});
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
