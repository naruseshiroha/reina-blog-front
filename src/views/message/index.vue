<!-- @TODO: Notice  -->
<template>
    <!-- <div class=" mx-auto xl:w-2/3 lg:w-3/4 container"> -->
    <div class="message">
        <h2 class="text-center text-2xl font-bold mb-3">レイナ　の　ブログ　へ　ようこそ</h2>
        <main>
            <n-thing class="border-2 border-red-600 rounded-md px-4 py-2 relative">
                <template #header>
                    <n-icon :size="24">
                        <BullhornIcon />
                    </n-icon>
                    <span class="text-xl">
                        公告板
                    </span>
                </template>
                <template #header-extra>
                    <n-button text @click="shrink = !shrink">
                        <n-icon v-show="!shrink" :size="24" :component="DownIcon"></n-icon>
                        <n-icon v-show="shrink" :size="24" :component="UpIcon"></n-icon>
                    </n-button>
                </template>
                <div v-show="!shrink">
                    <div v-for="b, i in bulletins" :key="i" :class="'h-full ' + (i % 2 === 0 ? 'notice-01' : 'notice-02')">
                        {{ b.bulContent }}
                    </div>
                </div>
            </n-thing>

            <n-divider />

            <n-thing class="" conent-style="margin-top: 10px;">
                <template #header>
                    <n-icon :size="24">
                        <CommentsIcon />
                    </n-icon>
                    <span class="text-xl">
                        留言板
                    </span>
                </template>
                <CommentItem v-for="m in messages" :key="m.id" :message="m" />
            </n-thing>
            <n-pagination v-show="pageCount > 1" class="justify-center mt-4" v-model:page="page.pageNum"
                :page-count="pageCount" />

            <h2 class="my-3 font-bold text-lg xl:text-xl">总留言数: {{ total }}</h2>
            <Reply />
        </main>
    </div>
</template>

<script setup lang="ts">
import {
    CommentMultiple32Regular as CommentsIcon,
    ChevronCircleUp48Regular as UpIcon,
    ChevronCircleDown48Regular as DownIcon
} from "@vicons/fluent";
import { Bullhorn as BullhornIcon } from '@vicons/fa'
import { useCommentStore } from '/@/store';
import { CommentBO, IBulletinVO } from '/@/api/types'
import { fetchAdminBulletin } from "/@/api/admin";

// const messages = [
//     {
//         id: 1, title: "This is a title",
//         avatar: "edb87d284c514a4485fa09bcfefffcec.webp",
//         nickName: "Zhang San",
//         createdAt: "2023-01-30T11:31:26",
//         content: `<p>赵六，我是test 赵六，我是test赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test 赵六，我是test  </p>`,
//         articleId: "1614829115282874369"
//         // content: `<h1 style="text-align: right;">Hi 李四！！</h1>`,
//     },
//     {
//         id: 2, title: "This is a title",
//         avatar: "edb87d284c514a4485fa09bcfefffcec.webp",
//         nickName: "Zhang San",
//         createdAt: "2023-01-30T11:31:26",
//         content: `<p style="text-align: right;">222222222222 </p>`,
//         articleId: "1614829115282874369"
//         // content: `<h1 style="text-align: right;">Hi 李四！！</h1>`,
//     },
//     {
//         id: 3, title: "This is a title",
//         avatar: "edb87d284c514a4485fa09bcfefffcec.webp",
//         nickName: "Zhang San",
//         createdAt: "2023-01-30T11:31:26",
//         content: `3333333333333333333333333333333`,
//         articleId: "1614829115282874369"
//         // content: `<h1 style="text-align: right;">Hi 李四！！</h1>`,
//     },
//     {
//         id: 4, title: "This is a title",
//         avatar: "edb87d284c514a4485fa09bcfefffcec.webp",
//         nickName: "Zhang San",
//         createdAt: "2023-01-30T11:31:26",
//         content: `4444444444444444444444444444`,
//         articleId: "1614829115282874369"
//         // content: `<h1 style="text-align: right;">Hi 李四！！</h1>`,
//     },
// ]
const pageCount = computed(() => Math.ceil(unref(total) / page.value.pageSize))
const messageStore = useCommentStore();
const { total, page, messages } = storeToRefs(messageStore);

const shrink = ref(false)

const bo = reactive<CommentBO>({
    status: '1',
    userId: "",
    nickName: "",
    articleId: "",
    content: "",
})
messageStore.fetchPageMessages(bo, unref(page))

const bulletins = ref<IBulletinVO[]>([])
const initBulletin = async () => {
    const { data } = await fetchAdminBulletin(null, '1')
    bulletins.value = unref(data).data
}

initBulletin()

watch(
    () => page.value.pageNum,
    (_newVal, _oldVal) => {
        messageStore.fetchPageMessages(bo, unref(page))
    }
);

</script>

<style lang="scss" scoped>
.message {
    .notice-01 {
        color: #b94a48;
        background-color: #f2dede;
    }

    .notice-02 {
        color: #468847;
        background-color: #dff0d8;
    }

    .notice-01,
    .notice-02 {
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
        font-size: medium;
    }

    :deep(.n-thing) {
        .n-thing-header__title {
            display: flex;

            span {
                margin-left: 0.5rem;
            }
        }
    }
}
</style>