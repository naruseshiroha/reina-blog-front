<template>
  <div>
    <n-space vertical>
      {{ id }}
      <n-switch v-model:value="loading" />
      <n-card>
        <template #header>
          <n-skeleton v-if="loading" text width="60%" />
          <template v-else>
            I'm OK
          </template>
        </template>
        <n-skeleton v-if="loading" text :repeat="6" />
        <template v-else>
          不要忘了留姓名<br>
          电话和其他事情<br>
          不要说的太快免得我没写下你大名<br>
          或许你不再打来<br>
          我却等到头发白<br>
          希望有一天你会打来
        </template>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '@/store';

const articleStore = useArticleStore();
const route = useRoute();

const loading = ref(true)
const id = computed(() => route.params?.id)

console.log('route', route);
console.log('params', route.params);

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