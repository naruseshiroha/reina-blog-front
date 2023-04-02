<template>
  <div class="archive">
    <h1 class="text-center text-3xl font-bold">归档页</h1>
    <n-timeline size="large">
      <h2 class="text-2xl font-bold py-4">{{ `最高! 全 ${archiveTotal} ポスト もっと書こう！` }}</h2>
      <n-timeline-item v-for="v in archives" :key="v.id" type="default" content="">
        <template #header>
          <router-link class="text-xl font-semibold" :to="`/article/${v.id}`">{{ v.title }}</router-link>
        </template>
        <template #default>
          <span class="mx-4">——</span>
          <router-link class="text-lg  font-semibold" :to="{ name: 'index', query: { categoryId: v.category.id } }">
            {{ v.category?.categoryName }}
          </router-link>
        </template>
        <template #footer>
          <!-- {{ formatTime('YYYY-MM-DD HH:mm:ss', v?.createdAt) }} -->
          <span class="text-base font-normal">
            {{ v.createdAt?.substring(0, 10) }}
          </span>
        </template>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from "/@/store";
// import { useMessage } from 'naive-ui'

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
  hasScrollBar: {
    default: false,
    type: Boolean,
  }
});

// const message = useMessage()

const archiveStore = useArticleStore();
const { getArchives: archives, archiveTotal, getArchivePageNum: pageNum } = toRefs(archiveStore);
const page = computed(() => reactive({
  pageNum: pageNum.value,
  pageSize: 20,
}))

archiveStore.fetchPageArchives(page);

watch(
  () => props.bottom,
  async (newVal, _oldVal) => {
    if (newVal === true || !props.hasScrollBar) {
      page.value.pageNum += 1;
      archiveStore.fetchPageArchives(page);
    }
  },
  // { immediate: true } 
);
</script>

<style lang="scss" scoped>
:deep(.n-timeline-item-content) {
  .n-timeline-item-content__title {
    float: left
  }

  .n-timeline-item-content__meta {
    float: right
  }
}
</style>
