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
    const data = await messageStore.fetchLeaveMessages(bo)
    if (data) {
        message.success("发布成功，请等待审核！")
        content.value = ''
    }
}
</script>

<style lang="scss" scoped></style>