<template>
    <n-layout class="h-screen ">
        <n-layout-header class="p-4  h-14 flex " bordered>
            <n-avatar></n-avatar>
            <n-breadcrumb>
                <n-breadcrumb-item>
                    <n-icon :component="HomeIcon" /> 北京总行</n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-icon :component="UserIcon" /> 天津分行</n-breadcrumb-item>
                <n-breadcrumb-item>
                    <n-icon :component="TagIcon" /> 平山道支行</n-breadcrumb-item>
            </n-breadcrumb>
        </n-layout-header>
        <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
            <n-layout-sider bordered collapse-mode="width" :native-scrollbar="false" :collapsed-width="64" :width="240"
                :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
                <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
                    :options="menuOptions" />
            </n-layout-sider>
            <n-layout content-style="padding: 24px; height:100%;" :native-scrollbar="false">
                {{ activeKey }}
                <RouterView />
            </n-layout>
        </n-layout>
        <n-layout-footer position="absolute" class="p-2 " bordered>
            Footer
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
const activeKey = ref<string | null>('Home')
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
        label: 'Bull',
        key: 'Bull',
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