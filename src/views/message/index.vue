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
                    <div v-for="_v in 2" class="h-full notice-01">
                        这里是我一手建设维护的资源站，低调于三次元，致力给新人打造一个轻松愉快的galgame下载平台，让更多人喜欢并且容易玩上galgame也是本站的初衷。
                        随着时间的推移，历经多次调整，相信有不少人见证了网站的发展，至于我制作的汉硬也得到了不少人的认同支持和搬运。我不喜欢到处打广告，向能找到这里或被推荐到这里的人衷心说句：Enjoy the
                        game.
                    </div>
                    <div v-for="_v in 2" class="h-full notice-02">
                        晚上趁着老婆玩手机不看电影会断断续续更新一下，不要期待太多。
                        网站会关闭么？目前还不会的，毕竟有一些网友还是发现了本人的网站底部的捐助链接。
                        最后祝大家新年快乐
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
import { CommentBO } from '/@/api/types'

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