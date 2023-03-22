<template>
  <div class="text-center mx-auto xl:w-2/3 lg:w-3/4">
    <pre>
                userId:{{ userId }} <br>
                <!-- {{ collections }} -->
                <!-- {{ articles }} -->
                </pre>
    <h2 class="my-3 font-bold text-lg xl:text-xl">总收藏数: {{ userId ? total : 0 }}</h2>
    <main>
      <n-list v-if="userId" hoverable clickable class="collect">
        <n-list-item v-for="v in collections" :key="v.id">
          <n-checkbox v-model:checked="v.checked"></n-checkbox>
          <n-thing class="flex-grow mx-4" :title="v.title" content-style="margin-top: 10px;">
            <template #header-extra>
              {{ v.createdAt?.replace("T", " ") }}
            </template>
            <!-- <template #description>
              <n-space size="small" style="margin-top: 4px">
                <n-tag :bordered="false" type="info" size="small">
                  暑夜
                </n-tag>
                <n-tag :bordered="false" type="info" size="small">
                  晚春
                </n-tag>
              </n-space>
              {{ 'loading....' }}
            </template> -->
            <n-skeleton v-if="loadingDetail" round height="100px"></n-skeleton>
            <div v-else>
              <router-link :to="`/article/${v.articleId}`">
                <div class="relative overflow-hidden">
                  <img class="mx-auto" :src="`/img/article/${articles.get(v.articleId)?.coverImage}`" alt="" />
                  <div
                    class="absolute top-0 h-full w-full p-5 bg-gray-900 bg-opacity-50 text-2xl text-center text-gray-200 italic opacity-0 hover:opacity-100">
                    {{ articles.get(v.articleId)?.description }}
                  </div>
                </div>
              </router-link>
            </div>
          </n-thing>
          <n-popconfirm @positive-click="handlePositiveClick" @negative-click="handleNegativeClick">
            <template #trigger>
              <!-- <n-button>引用</n-button> -->
              <n-button type="error" :disabled="!v.checked" @click="handleRemoveCollection('')" round secondary
                strong>清除</n-button>
            </template>
            <template #action>
              <n-button strong secondary>取消</n-button>
              <n-button strong secondary type="info">确认</n-button>
            </template>
            <span>确认清除“ {{ v.title }} ”?</span>
          </n-popconfirm>
        </n-list-item>
        <n-pagination class="justify-center mt-4" v-model:page="page.pageNum"
          :page-count="Math.ceil(total / page.pageSize)" />
        <pre>{{ page }}</pre>
      </n-list>
      <div v-else>请先登录</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArticleVO } from "/@/api/types";
import { useArticleStore, useCollectionStore, useUserStore } from "/@/store";

// const props = defineProps({
//   top: Boolean,
//   bottom: Boolean,
// });
const message = useMessage();
const userStore = useUserStore();
const collectionStore = useCollectionStore();
const articleStore = useArticleStore();

const { userId } = storeToRefs(userStore);
// const userId = "1629490452966141953";

const { collections, total, page } = storeToRefs(collectionStore);
// check userId
const init = () => {
  if (unref(userId)) {
    collectionStore.fetchListUserCollect(unref(userId));
  }
}

init()

// removeCollection
const handleRemoveCollection = async (id: string | undefined) => {
  console.log("id is ", id as string);
  console.log(message);

};
const handlePositiveClick = () => {
  console.log("clicked");

  message.info("并不");
};
const handleNegativeClick = () => {
  console.log("clicked");

  message.info("并不");
};

const loadingDetail = ref(true);
const articles = reactive(new Map<string, ArticleVO>());

watch(
  () => page.value.pageNum,
  (_newVal, _oldVal) => {
    collectionStore.fetchListUserCollect(unref(userId));
  }
);

watch(collections, async (newVal, _oldVal) => {
  if (newVal) {
    const articleIds = newVal.map((e) => e.articleId);
    const data = await articleStore.fetchArticleInfo(articleIds);
    if (data) {
      loadingDetail.value = false;
    }
    data.forEach((e) => articles.set(e.id, e));
  }
});

// watch(props, async (newVal, _oldVal) => {
//   console.log("props", newVal);
//   if (newVal.bottom) {
//     console.log(page);
//     page.value.pageNum += 1;
//     const data = await collectionStore.fetchListUserCollect(unref(userId), unref(page));
//     if (data) {
//       console.log("data is ", data);
//     } else {
//       // page.pageNum -= 1;
//     }
//   }
// });
</script>

<style scoped lang="scss">
:deep(.collect) {
  .n-list-item__main {
    display: flex;
    align-items: center;
  }
}
</style>
