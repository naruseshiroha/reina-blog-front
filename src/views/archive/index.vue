<template>
  <div class="archive p-5 w-2/3 mx-auto">
    <h1 class="text-center text-3xl font-bold">归档页</h1>
    <n-timeline size="large">
      <h2 class="text-2xl font-bold py-4">{{ `最高! 全 ${archiveTotal} ポスト もっと書こう！` }}</h2>
      <n-timeline-item v-for="v in archives" :key="v.id" type="default" content="">
        <template #header>
          <router-link class="text-xl font-semibold" :to="`/article/${v.id}`">{{ v.title }}</router-link>
        </template>
        <template #default>
          <span class="mx-4">——</span>
          <router-link class="text-lg  font-semibold" :to="`/category/${v.category?.id}`">
            {{ v.category?.categoryName }}
          </router-link>
        </template>
        <template #footer>
          <!-- {{ formatTime('YYYY-MM-DD HH:mm:ss', v?.createdAt) }} -->
          <span class="text-base font-normal">
            {{ v.createdAt?.substring(0, 10).concat(' by ').concat('li xun') }}
          </span>
        </template>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from "@/store";
import { useMessage } from 'naive-ui'

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
});

const message = useMessage()

const page = reactive({
  pageNum: 1,
  pageSize: 10,
});

const archiveStore = useArticleStore();
archiveStore.fetchPageArchives(page);
const { getArchives: archives, archiveTotal } = toRefs(archiveStore);

watch(
  () => props.bottom,
  async (newVal, oldVal) => {
    console.log('bottom', 'new', newVal, 'old', oldVal)
    if (newVal === true) {
      page.pageNum += 1;
      // debugger
      archiveStore.fetchPageArchives(page);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="sass" scoped>
:deep(.n-timeline-item-content)
  .n-timeline-item-content__title
    float: left
  
  .n-timeline-item-content__meta 
    float: right

</style>
