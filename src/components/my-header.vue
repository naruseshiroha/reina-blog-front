<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script setup lang="ts">
// Header
import { h, ref, Component } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  HomeOutline as HomeIcon,
  ArchiveOutline as ArchiveIcon,
  PricetagsOutline as TagIcon,
  HeartOutline as HeartIcon,
  InformationOutline as InfoIcon,
} from "@vicons/ionicons5";
import { CommentsRegular as CommentIcon } from "@vicons/fa";
import { RouterLink } from "vue-router";

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const activeKey = ref<string | null>(null);

const menuOptions: MenuOption[] = [
  // {
  //   label: () =>
  //     h(
  //       'a',
  //       {
  //         href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
  //         target: '_blank',
  //         rel: 'noopenner noreferrer',
  //       },
  //       '且听风吟'
  //     ),
  //   key: 'hear-the-wind-sing',
  //   icon: renderIcon(BookIcon),
  // },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "index",
            // params: {
            //   lang: 'zh-CN'
            // }
          },
        },
        { default: () => "首页" }
      ),
    key: "index",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "archive",
            // params: {
            //   lang: 'zh-CN'
            // }
          },
        },
        { default: () => "归档" }
      ),
    key: "archive",
    icon: renderIcon(ArchiveIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "tag",
            // params: {
            //   lang: 'zh-CN'
            // }
          },
        },
        { default: () => "标签" }
      ),
    key: "tags",
    icon: renderIcon(TagIcon),
  },
  {
    label: "留言",
    key: "comments",
    icon: renderIcon(CommentIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "collection",
            // params: {
            //   lang: 'zh-CN'
            // }
          },
        },
        { default: () => "收藏" }
      ),
    key: "collections",
    icon: renderIcon(HeartIcon),
  },
  {
    label: "关于我",
    key: "info",
    icon: renderIcon(InfoIcon),
  },
];
</script>
