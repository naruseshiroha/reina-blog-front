<template>
    <div>
        <n-form ref="formRef" :model="article" :rules="rules" size="medium" label-placement="top">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="标题" path="title">
                    <n-input v-model:value="article.title" clearable placeholder="请输入标题" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="类别" path="category">
                    <n-select v-model:value="article.categoryId" :options="categoryOptions" clearable placeholder="请选择类别" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="标签">
                    <n-select v-model:value="article.tagIds" filterable multiple tag :options="tagOptions" clearable
                        placeholder="请选择标签" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="置顶">
                    <n-select v-model:value="article.top" filterable :options="topOptions" clearable placeholder="请选择" />
                </n-form-item-gi>
                <n-form-item-gi :span="6" label="状态">
                    <n-select v-model:value="article.status" filterable :options="statusOptions" clearable
                        placeholder="请选择" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="描述" path="description">
                    <n-input v-model:value="article.description" type="textarea" placeholder="请输入描述"
                        :autosize="{ minRows: 4 }" />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="封面图片">
                    <n-upload action="/api/upload/article" list-type="image-card" :default-file-list="previewFileList"
                        :custom-request="customRequest" @before-upload="beforeUpload">
                        点击上传
                    </n-upload>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="内容">
                    <!-- border border-solid  -->
                    <div class="z-10 border border-solid border-gray-400 w-full">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                            :mode="mode" />
                        <Editor style="min-height: 400px; overflow-y: auto;" v-model="article.content"
                            :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
                    </div>
                </n-form-item-gi>
                <n-form-item-gi :span="24">
                    <n-button v-if="!articleId" @click="handlePublishBtn" type="primary" secondary strong>发布</n-button>
                    <n-button v-else @click="handleSaveBtn" type="primary" secondary strong>保存</n-button>
                </n-form-item-gi>
            </n-grid>

        </n-form>
    </div>
</template>
  
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { isImage } from '/@/util';
import { fetchCategoryOptions, fetchTagOptions } from '/@/api/admin';
import { fetchArticleById, fetchInsertArticle, fetchUpdateArticle } from '/@/api/article'
import { useUserStore } from '/@/store';
import { CLOSE_ARTICLE_DIALOG } from '/@/api/types/keys';
import { TagVO } from '/@/api/types';

type Options = {
    label: string;
    value: string | boolean;
}

const message = useMessage();

const initTagOptions = async (): Promise<Options[]> => {
    const { data } = await fetchTagOptions()
    return unref(data).data.map(v => ({ label: v.tagName, value: v.id }))
}
const initCategoryOptions = async (): Promise<Options[]> => {
    const { data } = await fetchCategoryOptions()
    return unref(data).data.map(v => ({ label: v.categoryName, value: v.id }))
}

// init tag, category options
const topOptions = ref<Options[]>([
    { label: "否", value: false },
    { label: "是", value: true },
])
const statusOptions = ref<Options[]>([
    { label: "待审核", value: "0" },
    { label: "已审核", value: "1" },
    { label: "不通过", value: "2" },
])
const tagOptions = ref<Options[]>([])
const categoryOptions = ref<Options[]>([])
const init = async () => {
    const tags = await initTagOptions()
    tagOptions.value = tags

    const categories = await initCategoryOptions()
    categoryOptions.value = categories
}

init();

// const fileList = ref<UploadFileInfo[]>([
//   {
//     id: 'react',
//     name: '我是react.png',
//     status: 'finished',
//     url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
//   }])

const mode = 'default'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// const articleId = 

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

// const tags: ComputedRef<TagVO[]> = computed()
const article = reactive<{
    authorId: string,
    title: string,
    description: string,
    top: boolean,
    status: string,
    coverImage: string,
    categoryId: string,
    tagIds: string[],
    tags: TagVO[]
    content: string
}>({
    authorId: userId.value,
    title: '',
    description: '',
    top: false,
    status: '0',
    coverImage: 'default.jpg',
    categoryId: '',
    tagIds: [],
    tags: [],
    content: ''
})

const rules = {
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
const beforeUpload = async (data: {
    file: UploadFileInfo,
    fileList: UploadFileInfo[]
}) => {
    const mime = data.file.file?.type
    if (!isImage(mime as string)) {
        message.error('图片格式不正确！');
        return false;
    }
    return true;
}

const customRequest = async ({ file, onFinish }: UploadCustomRequestOptions) => {
    const data = new FormData();
    data.append('file', file.file as File);
    const { data: filename } = await (await fetch('/api/upload/article', { method: 'post', body: data })).json()
    file.url = `/img/article/${filename}`
    article.coverImage = filename ?? 'default.jpg'
    onFinish()
}

// inject
const props = defineProps({
    fetchPage: {
        type: Function,
        required: true
    },
    articleId: {
        type: String
    }
})
const closeDialog: Function = inject(CLOSE_ARTICLE_DIALOG) as Function

const handlePublishBtn = async () => {
    article.tags = tagOptions.value.filter((t: any) => article.tagIds.includes(t.value)).map((t: any) => ({ tagId: t.value, tagName: t.label }))
    const { data } = await fetchInsertArticle(article)
    const { data: result, msg } = unref(data)
    if (result) {
        message.success(msg)
        // close dialog
        closeDialog()
        // fetch page
        await props.fetchPage()
    } else {
        message.error(msg)
    }

}

const handleSaveBtn = async () => {
    const { data } = await fetchUpdateArticle(article)
    const { data: result, msg } = unref(data)
    if (result) {
        message.success(msg)
        closeDialog()
        await props.fetchPage()
    } else {
        message.error(msg)
    }
}

const previewFileList = reactive<UploadFileInfo[]>([
    {
        id: 'articleId',
        name: 'default article img',
        status: 'finished',
        url: '/img/article/' + (article.coverImage ?? 'default.jpg')
    },
])

watch(
    () => article.tagIds,
    () => {
        article.tags = tagOptions.value.filter((t) => article.tagIds.includes(t.value as string)).map(o => ({ tagId: o.value as string, tagName: o.label }))
    }
)

watch(
    () => props.articleId,
    async (newVal) => {
        if (newVal) {
            // fetch article info
            const { data } = await fetchArticleById(newVal)
            const { data: articleInfo } = unref(data)
            if (articleInfo) {
                const tagIds = articleInfo.tags.map(t => t.tagId)
                const categoryId = articleInfo.category.id
                const coverImage = articleInfo.coverImage
                previewFileList[0].url = '/img/article/' + (coverImage ?? 'default.jpg')
                Object.assign(article, articleInfo, { tagIds, categoryId, coverImage })
            }

        }
    },
    { immediate: true }
)

</script>
  
<style scoped lang="scss"></style>
  