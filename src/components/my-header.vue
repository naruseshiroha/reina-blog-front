<template>
  <nav class="text-center">
    <!-- Header -->
    <n-menu :options="menuOptions" mode="horizontal" />
  </nav>
</template>

<script setup lang="ts">
import { Component } from 'vue';
import { NIcon } from 'naive-ui';
import { HomeOutline as HomeIcon, ArchiveOutline as ArchiveIcon, PricetagsOutline as TagIcon, HeartOutline as HeartIcon, InformationOutline as InfoIcon } from '@vicons/ionicons5';
import { CommentsRegular as CommentIcon } from '@vicons/fa';

// children
const archiveChildren = ref();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = computed(() => {
  return [
    {
      label: '首页',
      key: 'index',
      icon: renderIcon(HomeIcon),
    },
    {
      label: '归档',
      key: 'archive',
      icon: renderIcon(ArchiveIcon),
      children: archiveChildren.value,
    },
    {
      label: '标签',
      key: 'tags',
      icon: renderIcon(TagIcon),
    },
    {
      label: '留言',
      key: 'comments',
      icon: renderIcon(CommentIcon),
    },
    {
      label: '收藏',
      key: 'collections',
      icon: renderIcon(HeartIcon),
    },
    {
      label: '关于我',
      key: 'info',
      icon: renderIcon(InfoIcon),
    },
  ];
});
</script>

<style lang="scss" scoped></style>
