<template>
    <n-thing content-indented class="border p-4">
        <template #avatar>
            <n-avatar round :size="50" :src="`/img/avatar/${message.avatar ?? 'default.jpg'}`" />
        </template>
        <template #header>
            {{ message.nickName }}
        </template>
        <template #header-extra>
            {{ message.createdAt.replace(/t/i, " ") }}
        </template>
        <RouterLink v-if="message.articleId === '-1'" :to="`/message`">
            <p v-html="message.content"></p>
        </RouterLink>
        <RouterLink v-else :to="`/article/${message.articleId}`">
            <p v-html="message.content"></p>
        </RouterLink>
    </n-thing>
</template>

<script setup lang="ts">
// import CommentVO from "/@/api/types/index"
defineProps({
    message: { type: Object, required: true }
});
</script>

<style lang="scss" scoped></style>