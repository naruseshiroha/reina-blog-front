<template>
  <div class="archive p-5">
    <h1 class="text-center text-2xl">归档页</h1>
    <n-timeline size="large">
      <n-timeline-item :title="`最高! 全 ${1 ?? 0} ポスト もっと書こう！`" />
      <n-timeline-item v-for="v in archives" :key="v.id" type="default" content="">
        <template #header>
          <router-link :to="`/article/${v.id}`">{{ v.title }}</router-link>
        </template>
        <template #default>
          <span>{{ v.category?.categoryName }}</span>
        </template>
        <template #footer>
          <!-- {{ formatTime('YYYY-MM-DD HH:mm:ss', v?.createdAt) }} -->
          {{ v.createdAt?.substring(0, 10) }}
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
console.log('message', message);
message.loading('loading。。。', {
  keepAliveOnHover: true
})


const page = reactive({
  pageNum: 1,
  pageSize: 10,
});

const archiveStore = useArticleStore();
archiveStore.fetchPageArchives(page);
const { getArchives: archives } = toRefs(archiveStore);

watch(
  () => props.bottom,
  async (newVal, oldVal) => {
    if (newVal === true) {
      page.pageNum += 1;
      archiveStore.fetchPageArchives(page);
    }
  }
);
</script>

<style lang="sass" scoped></style>
