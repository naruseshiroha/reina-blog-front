<template>
  <!-- <pre>{{ tags }}</pre> -->
  <n-grid :x-gap="12" :y-gap="8" :cols="4">
    <n-grid-item v-for="(v, i) in tags" :key="i">
      <n-card :title="v.tagName">
        <n-ellipsis line-clamp="2" expand-trigger="click" :tooltip="false">
          {{ v.tagDesc }}
        </n-ellipsis>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { useTagStore } from '/@/store';

const tagStore = useTagStore();

tagStore.fetchAllTags();
const { getTags: tags } = toRefs(tagStore);
</script>

<style scoped>
.n-card {
  max-width: 300px;
  min-height: 100px;
  background-color: darkseagreen;
}
</style>
