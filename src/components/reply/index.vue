<template>
    <div>
        <div :style="{ border: '1px solid #ccc', zIndex: 9999 }">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 300px; overflow-y: hidden" v-model="content" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="handleCreated" />
            <div class="text-center border p-2 bg-white">
                <n-button type="text" class="text-base" @click="handlePublished">
                    发表留言
                </n-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useUserStore, useCommentStore } from "/@/store";

const userStore = useUserStore()
const messageStore = useCommentStore()
const message = useMessage()

const mode = "simple";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const content = ref("");

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容...", MENU_CONF: {} };

// @TODO: img
// type InsertFnType = (url: string, alt: string, href: string) => void

// editorConfig.MENU_CONF['uploadImage'] = {
//     server: "/api/upload/message",
//     timeout: 5 * 1000, // 5s

//     fieldName: 'file',
//     meta: { token: 'xxx', a: 100 },
//     metaWithUrl: true, // join params to url
//     headers: {},

//     maxFileSize: 10 * 1024 * 1024, // 10M

//     base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb

//     customInsert(res: any, _insertFn: InsertFnType) {  // TS 语法
//         // res 即服务端的返回结果
//         console.log('res', res);
//     },
//     onBeforeUpload(file) {
//         console.log('onBeforeUpload', file)

//         return file // will upload this file
//         // return false // prevent upload
//     },
//     onProgress(progress) {
//         console.log('onProgress', progress)
//     },
//     onSuccess(file, res) {
//         console.log('onSuccess', file, res)
//         const { data } = res
//         const url = `/img/message/${data}`
//         content.value = `<img src='${url}' />`
//     },
//     onFailed(file, res) {
//         alert(res.message)
//         console.log('onFailed', file, res)
//     },
//     onError(file, err, res) {
//         alert(err.message)
//         console.error('onError', file, err, res)
//     },
// }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    removeEditor();
});

const removeEditor = () => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
};

const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};

const { userId, userInfo } = storeToRefs(userStore)
const bo = reactive({
    status: '0',
    userId: userId,
    nickName: userInfo.value?.nickName as string,
    content: content,
    articleId: "-1",
})

// 留言
const handlePublished = async () => {
    console.log("Published");
    const data = await messageStore.fetchLeaveMessages(bo)
    console.log('data is', data);
    if (data) {
        message.success("发布成功，请等待审核！")
    }
}
</script>

<style lang="scss" scoped></style>