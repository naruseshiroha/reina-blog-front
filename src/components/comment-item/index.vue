<template>
    <n-thing content-indented class="border p-4">
        <template #avatar>
            <n-avatar round :size="50" :src="'/img/avatar/' + props.message.avatar"
                fallback-src="/img/avatar/default.jpg" />
        </template>
        <template #header>
            {{ props.message.nickName }}
        </template>
        <template #header-extra>
            {{ props.message.createdAt.replace(/t/i, " ") }}
        </template>
        <!-- <n-tooltip :style="{ maxWidth: '70vw' }" placement="top" trigger="hover">
            <template #trigger> -->
        <RouterLink :to="`/article/${props.message.articleId}`">
            <p v-html="props.message.content"></p>
        </RouterLink>
        <!-- </template>
            <p>{{ props.message.content }}</p>
        </n-tooltip> -->
    </n-thing>
</template>

<script setup lang="ts">
// import CommentVO from "/@/api/types/index"
const props = defineProps({
    message: { type: Object, required: true }
});
</script>

<style lang="scss" scoped></style>