<template>
  <!-- <div class=" mx-auto xl:w-2/3 lg:w-3/4"> -->
  <div>
    <h2 class="text-center my-3 font-bold text-lg xl:text-xl">总收藏数: {{ userId ? total : 0 }}</h2>
    <n-popconfirm @positive-click="handlePositiveClick('')" @negative-click="handleBatchNegativeClick">
      <template #trigger>
        <n-button :disabled="delCollections.length === 0" secondary type="error">批量删除</n-button>
      </template>
      确认删除 "{{ delCollections.map(c => c.title).join("、") }}" ？
    </n-popconfirm>

    <main>
      <n-list v-if="userId" hoverable clickable class="collect">
        <n-list-item v-for="v in collections" :key="v.id">
          <n-checkbox v-model:checked="v.checked"></n-checkbox>
          <n-thing class="flex-grow mx-4" :title="v.title" content-style="margin-top: 10px;">
            <template #header-extra>
              {{ v.createdAt?.replace("T", " ") }}
            </template>
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
          <n-popconfirm @positive-click="handlePositiveClick(v.id as string)" @negative-click="handleNegativeClick">
            <template #trigger>
              <n-button type="error" :disabled="!v.checked" round secondary strong>
                清除
              </n-button>
            </template>
            <span>确认清除“ {{ v.title }} ”?</span>
          </n-popconfirm>
        </n-list-item>
        <n-pagination v-show="pages > 1" class="justify-center mt-4" v-model:page="page.pageNum" :page-count="pages" />
      </n-list>
      <div v-else>请先登录</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArticleVO } from "/@/api/types";
import { useArticleStore, useCollectionStore, useUserStore } from "/@/store";

const message = useMessage();
const userStore = useUserStore();
const collectionStore = useCollectionStore();
const articleStore = useArticleStore();

const { userId } = storeToRefs(userStore);

const { collections, total, page } = storeToRefs(collectionStore);
// check userId
const init = () => {
  if (unref(userId)) {
    collectionStore.fetchListUserCollect(unref(userId));
  }
}

init()

const pages = computed(() => Math.ceil(total.value / page.value.pageSize))

const delCollections = computed(() => {
  return collections.value.filter(c => c.checked).map(c => ({ id: c.id, title: c.title }))
})

// removeCollection
const handlePositiveClick = async (id: string) => {
  const ids: string[] = (id ? [id] : 0) || delCollections.value.map(c => c.id as string)
  const data = await collectionStore.fetchRemoveUserCollect(ids)
  if (data === true) {
    message.success("删除成功!")
    init()
  } else {
    message.error("删除失败!")
  }
}
const handleBatchNegativeClick = () => {
  collections.value.filter(c => c.checked).forEach(c => c.checked = false)
}

const handleNegativeClick = () => {
  message.info("已取消");
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

</script>

<style scoped lang="scss">
:deep(.collect) {
  .n-list-item__main {
    display: flex;
    align-items: center;
  }
}
</style>
