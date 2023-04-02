<template>
    <n-layout class="h-screen ">
        <n-layout-header class="p-4  h-14 flex " bordered>
            <n-avatar size="medium" src="/img/favicon.png"></n-avatar>
            <RouterLink :to="{ name: 'index' }">
                <n-breadcrumb class="cursor-pointer">
                    <n-breadcrumb-item><n-icon :component="HomeIcon" /> フロントへ</n-breadcrumb-item>
                </n-breadcrumb>
            </RouterLink>
        </n-layout-header>
        <n-layout position="absolute" style="top: 56px; bottom: 32px" has-sider>
            <n-layout-sider bordered collapse-mode="width" :native-scrollbar="false" :collapsed-width="64" :width="240"
                :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
                <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
                    :options="menuOptions" />
            </n-layout-sider>
            <n-layout content-style="padding: 24px; height:100%;" :native-scrollbar="false">
                <!-- {{ activeKey }} -->
                <RouterView :activeKey="activeKey"></RouterView>
            </n-layout>
        </n-layout>
        <n-layout-footer position="absolute" class="p-0 h-8" bordered>
            <span class="text-xl">
                Footer
            </span>
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">


import { Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
    Home as HomeIcon,
    User as UserIcon,
    Archive as ArticleIcon,
    Comment as CommentIcon,
    Bars as CategoryIcon,
    Tag as TagIcon,
    Bullhorn as BullIcon,
    Link as LinkIcon,
} from '@vicons/fa'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const collapsed = ref(true)
const activeKey = ref<string>('Home')
const menuOptions: MenuOption[] = [
    {
        label: 'Home',
        key: 'Home',
        icon: renderIcon(HomeIcon)
    },
    {
        label: 'User',
        key: 'User',
        icon: renderIcon(UserIcon)
    },
    {
        label: 'Article',
        key: 'Article',
        icon: renderIcon(ArticleIcon)
    },
    {
        label: 'Comment',
        key: 'Comment',
        icon: renderIcon(CommentIcon)
    },
    {
        label: 'Category',
        key: 'Category',
        icon: renderIcon(CategoryIcon)
    },
    {
        label: 'Tag',
        key: 'Tag',
        icon: renderIcon(TagIcon)
    },
    {
        label: 'Bulletin',
        key: 'Bulletin',
        icon: renderIcon(BullIcon)
    },
    {
        label: 'Link',
        key: 'Link',
        icon: renderIcon(LinkIcon)
    },
]
</script>

<style scoped lang="scss">
:deep(.lay03) {

    .n-scrollbar>.n-scrollbar-container>.n-scrollbar-content {
        height: 100%;
        background-color: pink;
    }
}
</style>