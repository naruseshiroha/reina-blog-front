<template>
    <div>
        <!-- {{ articleData }} -->
        <n-form ref="formRef" inline label-width="auto" label-placement="left" :model="queryForm" size="large">
            <n-form-item label="标题">
                <n-input v-model:value="queryForm.key" placeholder="输入标题" clearable />
            </n-form-item>
            <n-form-item label="类别">
                <n-select v-model:value="queryForm.categoryId" :style="{ width: '150px' }" placeholder="选择类别"
                    :options="topOptions" clearable />
            </n-form-item>
            <n-form-item label="标签">
                <n-select v-model:value="queryForm.tagIds" :style="{ width: '170px' }" placeholder="选择标签"
                    :options="topOptions" clearable />
            </n-form-item>
            <n-form-item label="置顶">
                <n-select v-model:value="queryForm.top" :style="{ width: '120px' }" placeholder="选择状态" :options="topOptions"
                    clearable />
            </n-form-item>
            <n-form-item>
                <n-button strong secondary type="default" @click="handleResetBtn">
                    重置
                </n-button>
            </n-form-item>
        </n-form>

        <n-space>
            <n-button :disabled="!checkedRowKeys.length" strong secondary type="error"
                @click="handleRemoveUser()">批量删除</n-button>
            <RouterLink :to="{ name: 'edit' }">
                <n-button type="primary" strong secondary>
                    发布文章
                </n-button>
            </RouterLink>
        </n-space>
        <n-data-table size="large" :columns="columns" :row-key="(row: ArticleVO) => row.id" :data="articleData"
            @update:checked-row-keys="handleCheck" />
        <n-pagination class="my-3 justify-end" v-model:page="page.pageNum" :page-count="pages" simple />

        <!-- reset password dialog -->
        <n-modal v-model:show="clickedResetBtn" preset="dialog" title="重置用户密码">
            <template #default>
                <div class="flex items-center">
                    Content
                </div>
            </template>
            <template #action>
                <n-button @click="handleClickSaveBtn" secondary strong type="success">保存</n-button>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NButton, FormInst, NImage, NText, NTag, DataTableRowKey, NSpace } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import { fetchNewPageArticle } from '/@/api/article';
import { ArticleVO } from '/@/api/types';

const message = useMessage()

const createColumns = ({ handleClickBtn }: { handleClickBtn: (btnName: string, row: ArticleVO) => void }): DataTableColumns<ArticleVO> => {
    return [
        {
            type: 'selection',
        },
        {
            title: '标题',
            key: 'title',
            width: '17%',
        },
        {
            title: '作者',
            key: 'author',
            render(row) {
                return h(NText, {}, { default: row.user.firstName + ' ' + row.user.lastName })
            }
        },
        {
            title: '类别',
            key: 'category',
            render(row) {
                return h(NText, {}, { default: row.category.categoryName })
            }
        },
        {
            title: '标签',
            key: 'tags',
            width: '11%',
            render(row) {
                return h(
                    NSpace,
                    {},
                    [
                        row.tags.map((t, i) => h(NTag, { type: i % 2 === 0 ? 'success' : 'info', secondary: true }, t.tagName))
                    ]
                )
            }
        },
        {
            title: '描述',
            key: 'description',
            width: '23%',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '封面图片',
            key: 'coverImage',
            render(row) {
                return h(
                    NImage,
                    {
                        // width: '100',
                        height: 80,
                        src: `/img/article/${row.coverImage ?? 'default.jpg'}`
                    }
                )
            }
        },
        {
            title: '置顶',
            key: 'top',
            width: 60,
            render(row) {
                return h(NTag, { type: row.top ? 'success' : 'info' }, { default: () => row.top ? '是' : '否' })
            }
        },
        {
            title: '状态',
            key: 'status',
            // width: 1,
            render(row) {
                return h(NTag, { type: row.status === '1' ? 'success' : (row.status === '0' ? 'warning' : 'error') }, { default: () => row.status === '1' ? '已审核' : (row.status === '0' ? '待审核' : '不通过') })
            }
        },
        {
            title: '操作',
            key: 'actions',
            width: '10%',
            render(row) {
                return h(
                    NSpace,
                    {},
                    [
                        ["編集", "削除"].map((t, i) => h(NButton, { type: i === 0 ? 'warning' : (i === 1 ? 'error' : 'default'), secondary: true, onClick: () => handleClickBtn(t, row) }, t))
                    ]
                )
            }
        }
    ]
}

const articleData = ref([]);
const columns = createColumns({
    async handleClickBtn(_btnName, _row) {
        message.info(_btnName)
    }
});
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const checkedRowKeys = checkedRowKeysRef
const handleCheck = (rowKeys: DataTableRowKey[]) => {
    checkedRowKeysRef.value = rowKeys
}

const pages = computed(() => Math.ceil(page.total / page.pageSize))
const page = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 20
})
const formRef = ref<FormInst | null>(null)

// select options
const topOptions = [
    { label: "是", value: '1' },
    { label: "否", value: '0' },
]

// select
const fetchPage = async () => {
    const { data } = await fetchNewPageArticle(page, queryForm)
    const { list: tableData, total } = unref(data).data
    articleData.value = tableData
    page.total = total
}

// delete
const handleRemoveUser = async () => {

}

// form reset btn
const handleResetBtn = () => {
    queryForm.key = null
    queryForm.top = null
    queryForm.tagIds = null
    queryForm.categoryId = null
}

const queryForm = reactive({
    key: null,
    tagIds: null,
    categoryId: null,
    top: null
})
const clickedResetBtn = ref(false)
const handleClickSaveBtn = async () => {

}

watch(
    queryForm,
    async () => {
        await fetchPage()
    },
    { immediate: true }
)
watch(
    () => page.pageNum,
    () => fetchPage()
)
</script>

<style scoped lang="scss"></style>