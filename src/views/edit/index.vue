<template>
  <div>
    Edit Article

    <pre>
{{ article }}
    </pre>

    <h2 class="text-center text-2xl">发布文章</h2>
    <n-form ref="formRef" :model="article" :rules="rules" size="medium" label-placement="top">

      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="标题" path="title">
          <n-input v-model:value="article.title" clearable placeholder="请输入标题" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="类别" path="category">
          <n-select v-model:value="article.categoryId" :options="categories" clearable placeholder="请选择类别" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="标签">
          <n-select v-model:value="article.tags" filterable multiple tag :options="tags" clearable
            placeholder="请选择标签" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="描述" path="description">
          <n-input v-model:value="article.description" type="textarea" placeholder="请输入描述" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="封面图片">
          <!-- :default-file-list="fileList"  -->
          <n-upload action="/api/upload/article" list-type="image-card" :custom-request="customRequest"
            @before-upload="beforeUpload" @finish="handleFinish">
            点击上传
          </n-upload>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="内容">
          <!-- border border-solid  -->
          <div class="z-10 border border-solid border-gray-400 w-full">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
              :mode="mode" />
            <Editor style="min-height: 400px; overflow-y: auto;" v-model="article.content" :defaultConfig="editorConfig"
              :mode="mode" @onCreated="handleCreated" />
          </div>
        </n-form-item-gi>
        <n-button>发布</n-button>


      </n-grid>

    </n-form>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { ref } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { isImage } from '/@/util';

const message = useMessage();

const fileList = ref<UploadFileInfo[]>([
  {
    id: 'react',
    name: '我是react.png',
    status: 'finished',
    url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  }])

const mode = 'default'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

const article = reactive({
  title: undefined,
  description: undefined,
  categoryId: undefined,
  tags: undefined,
  content: ''
})
const categories = [
  { value: 1, label: 'name1' },
  { value: 2, label: 'name2' },
  { value: 3, label: 'name3' },
]
const tags = [
  { value: 1, label: 'tag1' },
  { value: 2, label: 'bag2' },
  { value: 3, label: 'pag3' },
  { value: 4, label: 'mag4' },
]
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
  console.log('mime', mime);
  if (!isImage(mime as string)) {
    message.error('图片格式不正确！');
    return false;
  }
  return true;
}
const handleFinish = (data: {
  file: UploadFileInfo, event?: ProgressEvent
}) => {
  console.log('finish');
  console.log('file', data.file);
  alert()
}

const customRequest = async ({ file, onFinish }: UploadCustomRequestOptions) => {
  console.log('file', file);
  const data = new FormData();
  data.append('file', file.file as File);
  const { data: filename } = await (await fetch('/api/upload/article', { method: 'post', body: data })).json()
  console.log('filename', filename);
  file.url = `/img/article/${filename}`
  onFinish()
}

</script>

<style scoped lang="scss">

</style>
