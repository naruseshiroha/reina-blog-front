<template>
  <div class="archive">
    <h1>归档页</h1>
    <!-- <pre>{{ archives }}</pre> -->
    <n-timeline size="large">
      <n-timeline-item :title="`最高! 全 ${1 ?? 0} ポスト もっと書こう！`" />
      <n-timeline-item v-for="v in archives" :key="v.id" type="default" content="">
        <template #header>
          <!-- <router-link :to="`/post/${v?.id}`">{{ v?.title }}</router-link> -->
          <router-link :to="`/article/${v.id}`">{{ v.title }}</router-link>
        </template>
        <template #footer>
          <!-- {{ formatTime('YYYY-MM-DD HH:mm:ss', v?.createdAt) }} -->
          {{ "YYYY-MM-DD" }}
        </template>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from "@/store";

const props = defineProps({
  top: Boolean,
  bottom: Boolean,
});

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
