<template>
    <div>
        <!-- {{ commentData }} -->
        <n-form ref="formRef" inline label-width="auto" label-placement="left" :model="queryForm" size="large">
            <n-form-item label="评论内容">
                <n-input v-model:value="queryForm.content" placeholder="输入内容" clearable />
            </n-form-item>
            <n-form-item label="文章">
                <n-select v-model:value="queryForm.articleId" :style="{ width: '180px' }" placeholder="选择文章"
                    :options="articleOptions" clearable />
            </n-form-item>
            <n-form-item label="评论用户">
                <n-select v-model:value="queryForm.userId" :style="{ width: '120px' }" placeholder="选择状态"
                    :options="userOptions" clearable />
            </n-form-item>
            <n-form-item label="回复对象">
                <n-select v-model:value="queryForm.replyUserId" :style="{ width: '120px' }" placeholder="选择状态"
                    :options="userOptions" clearable />
            </n-form-item>
            <n-form-item label="状态">
                <n-select v-model:value="queryForm.status" :style="{ width: '120px' }" placeholder="选择状态"
                    :options="statusOptions" clearable />
            </n-form-item>
            <n-form-item>
                <n-button strong secondary type="default" @click="handleResetBtn">
                    重置
                </n-button>
            </n-form-item>
        </n-form>

        <n-space>
            <n-button :disabled="!checkedRowKeys.length" strong secondary type="error"
                @click="handleRemoveComment()">批量删除</n-button>
        </n-space>
        <n-data-table size="large" :columns="columns" :row-key="(row: CommentVO) => row.id" :data="commentData"
            @update:checked-row-keys="handleCheck" />
        <n-pagination class="my-3 justify-end" v-model:page="page.pageNum" :page-count="pages" simple />


    </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NButton, FormInst, NTag, DataTableRowKey, NSpace, NInput, NText } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import { CommentVO } from '/@/api/types';
import { fetchAdminComment, fetchArticleOptions, fetchUserOptions, fetchAdminDeleteComment, fetchAdminAuditComment } from '/@/api/admin';
// import { fetchAdminComment, fetchAdminDeleteComment, fetchAdminInsertComment, fetchAdminUpdateComment } from '/@/api/admin';

const message = useMessage()

const initArticleOptions = async () => {
    const { data } = await fetchArticleOptions()
    return unref(data).data.map(v => ({ label: v.title, value: v.id }))
}
const initUserOptions = async () => {
    const { data } = await fetchUserOptions()
    return unref(data).data.map(v => ({ label: v.nickName, value: v.id }))
}

const articleOptions = ref([])
const userOptions = ref([])
const init = async () => {
    const articles = await initArticleOptions()
    console.log('articles', articles);
    articleOptions.value = articles

    const users = await initUserOptions()
    userOptions.value = users
}

init();

const createColumns = ({ handleClickBtn }: { handleClickBtn: (btnName: string, row: CommentVO) => void }): DataTableColumns<CommentVO> => {
    return [
        {
            type: 'selection',
        },
        {
            title: '评论用户',
            key: 'nickName',
        },
        {
            title: '评论内容',
            key: 'content',
            width: '29%',
            ellipsis: {
                tooltip: true
            },
            // render(row) {
            //     return h(
            //         'div',
            //         {
            //             innerHTML: row.content
            //         },
            //     )
            // }
        },
        {
            title: '评论文章',
            key: 'title',
        },
        {
            title: '回复对象',
            key: 'replyNickName',
        },
        {
            title: '评论时间',
            key: 'createdAt',
            // width: '200',
            render: (row) => h(NText, row.createdAt.replace(/[t]/i, ' '))
        },
        {
            title: '修改时间',
            key: 'createdAt',
            // width: '200',
            render: (row) => h(NText, row.updatedAt.replace(/[t]/i, ' '))
        },
        {
            title: '状态',
            key: 'status',
            width: 80,
            render(row) {
                return h(NTag, { type: row.status === '1' ? 'success' : (row.status === '0' ? 'warning' : 'error') }, { default: () => row.status === '1' ? '已审核' : (row.status === '0' ? '待审核' : '不通过') })
            }
        },
        {
            title: '操作',
            key: 'actions',
            width: '15%',
            render(row) {
                return h(
                    NSpace,
                    {
                        justify: 'center'
                    },
                    [
                        ["通過", "不通過"].filter((_v, i) => i !== +(row.status as string) - 1).map((t, i) => h(NButton, { type: i === 0 && t.length === 2 ? 'primary' : 'warning', secondary: true, onClick: () => handleClickBtn(t, row) }, t)),
                        h(NButton, { type: 'error', secondary: true, onClick: () => handleClickBtn('削除', row) }, '削除')
                    ]
                )
            }
        }
    ]
}

const commentData = ref([]);
const columns = createColumns({
    async handleClickBtn(btnName, row) {
        let status: string = '0'
        let data: any
        if (btnName === '削除') {
            // delete
            data = (await fetchAdminDeleteComment(row.id)).data

        } else {
            if (btnName === '不通過') {
                status = '2'
            } else if (btnName === '通過') {
                status = '1'
            }
            data = await fetchAdminAuditComment(row.id, status);
        }
        // edit
        if (unref(data).data) {
            message.success("操作成功!")
            await fetchPage()
        }
    }
});
const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const checkedRowKeys = checkedRowKeysRef
const handleCheck = (rowKeys: DataTableRowKey[]) => {
    checkedRowKeysRef.value = rowKeys
}

const formRef = ref<FormInst | null>(null)

// select options
const statusOptions = [
    { label: "不通过", value: '2' },
    { label: "已审核", value: '1' },
    { label: "待审核", value: '0' },
]

const queryForm = reactive({
    content: null,
    userId: null,
    replyUserId: null,
    articleId: null,
    status: null,
})

const pages = computed(() => Math.ceil(page.total / page.pageSize))
const page = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
})

// select
const fetchPage = async () => {
    const { data } = await fetchAdminComment(page, queryForm)
    const { list: result, total } = unref(data).data
    page.total = total
    console.log('data', result);

    commentData.value = result;
    checkedRowKeys.value = []
}

// delete
const handleRemoveComment = async () => {
    const { data } = await fetchAdminDeleteComment(checkedRowKeys.value as string[])
    const { data: result, msg } = unref(data)
    if (result) {
        message.success(msg)
        checkedRowKeys.value = []
        await fetchPage()
    } else {
        message.error(msg)
    }
}

// form reset btn
const handleResetBtn = () => {
    queryForm.content = null
    queryForm.userId = null
    queryForm.articleId = null
    queryForm.replyUserId = null
    queryForm.status = null
}

watch(
    queryForm,
    async () => {
        await fetchPage()
    },
    { immediate: true }
);
watch(
    () => page.pageNum,
    () => fetchPage()
);
</script>

<style scoped lang="scss"></style>