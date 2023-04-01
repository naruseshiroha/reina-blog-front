<template>
    <div>
        <!-- {{ tagData }} -->
        <n-form ref="formRef" inline label-width="auto" label-placement="left" :model="queryForm" size="large">
            <n-form-item label="标签名称">
                <n-input v-model:value="queryForm.keyword" placeholder="输入名称" clearable />
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
                @click="handleRemoveTag()">批量删除</n-button>
            <n-button strong secondary type="primary" @click="handleClickAddBtn">新增</n-button>
        </n-space>
        <n-data-table size="large" :columns="columns" :row-key="(row: TagVO) => row.id" :data="tagData"
            @update:checked-row-keys="handleCheck" />

        <!-- reset password dialog -->
        <n-modal v-model:show="clickedAddBtn" preset="dialog" :title="operate + '文章标签'">
            <template #default>
                <n-form ref="addFormRef" label-width="80" label-placement="left" :model="addForm" :rules="rules"
                    size="medium">
                    <n-form-item label="标签名称" path="tagName">
                        <n-input v-model:value="addForm.tagName" placeholder="请输入标签名称" clearable />
                    </n-form-item>
                    <n-form-item label="标签描述" path="tagDesc">
                        <n-input v-model:value="addForm.tagDesc" type="textarea" placeholder="请输入标签描述" clearable />
                    </n-form-item>
                    <n-form-item label="状态" path="status">
                        <n-select v-model:value="addForm.status" placeholder="请选择状态" :options="statusOptions" clearable />
                    </n-form-item>
                </n-form>
            </template>
            <template #action>
                <n-button @click="handleClickSaveBtn" secondary strong type="success">保存</n-button>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NButton, FormInst, NTag, DataTableRowKey, NSpace, FormRules } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import { TagVO } from '/@/api/types';
import { fetchAdminTag, fetchAdminDeleteTag, fetchAdminInsertTag, fetchAdminUpdateTag } from '/@/api/admin';


const message = useMessage()

const createColumns = ({ handleClickBtn }: { handleClickBtn: (btnName: string, row: TagVO) => void }): DataTableColumns<TagVO> => {
    return [
        {
            type: 'selection',
        },
        {
            title: '标签名称',
            key: 'tagName',
            width: '11%',
        },
        {
            title: '标签描述',
            key: 'tagDesc',
            width: 'auto',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: '状态',
            key: 'status',
            width: 80,
            render(row) {
                return h(NTag, { type: row.status === '1' ? 'success' : (row.status === '0' ? 'warning' : 'error') }, { default: () => row.status === '1' ? '启用' : '停用' })
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
                        ["編集", "削除"].map((t, i) => h(NButton, { type: i === 0 ? 'primary' : (i === 1 ? 'error' : 'default'), secondary: true, onClick: () => handleClickBtn(t, row) }, t))
                    ]
                )
            }
        }
    ]
}

const tagData = ref([]);
const columns = createColumns({
    async handleClickBtn(btnName, row) {
        if (btnName === '削除') {
            // delete
            const { data } = await fetchAdminDeleteTag(row.id)
            if (unref(data).data) {
                message.success("删除成功")
                await fetchPage()
            }
        } else if (btnName === '編集') {
            // edit
            clickedAddBtn.value = true
            operate.value = '修改'
            Object.assign(addForm, row)
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
    { label: "启用", value: '1' },
    { label: "停用", value: '0' },
]

const queryForm = reactive({
    keyword: null,
    status: null
})

// select
const fetchPage = async () => {
    const { data } = await fetchAdminTag(queryForm.keyword, queryForm.status)
    const { data: result } = unref(data)
    tagData.value = result;
    checkedRowKeys.value = []
}

// delete
const handleRemoveTag = async () => {
    const { data } = await fetchAdminDeleteTag(checkedRowKeys.value as string[])
    const { data: result, msg } = unref(data)
    if (result) {
        message.success(msg)
        checkedRowKeys.value = []
        await fetchPage()
    } else {
        message.error(msg)
    }
}

const operate = ref('')
const addFormRef = ref<FormInst | null>(null)
const rules: FormRules = {
    tagName: { required: true, message: "请输入类别名称", trigger: ["input", "blur"] },
    tagDesc: { required: true, message: "请输入类别描述", trigger: ["input", "blur"] },
    status: { required: true, message: "请选择状态", trigger: ["change", "blur"] },
}
const addForm = reactive({
    id: null,
    tagName: "",
    tagDesc: "",
    status: null
})

const clickedAddBtn = ref(false)
const handleClickAddBtn = () => {
    clickedAddBtn.value = true
    operate.value = '新增'
}

// const clickedEditBtn = ref(false)


// form reset btn
const handleResetBtn = () => {
    queryForm.keyword = null
    queryForm.status = null
}

const handleResetAddForm = () => {
    addFormRef.value?.restoreValidation()
    Object.assign(addForm, {
        id: null,
        tagName: "",
        tagDesc: "",
        status: null
    })
    // addForm.id = null
    // addForm.tagName = ''
    // addForm.tagDesc = ''
    // addForm.status = null
}

const handleClickSaveBtn = async () => {
    // check form
    const pass = await addFormRef.value?.validate().then(() => 1).catch(() => 0)
    if (!pass) {
        return
    }

    let data;
    if (operate.value === '新增') {
        data = (await fetchAdminInsertTag(addForm)).data
    } else {
        data = (await fetchAdminUpdateTag(addForm)).data
    }
    const { data: result, msg } = unref(data)
    if (result) {
        message.success(msg)
        // restore
        clickedAddBtn.value = false
        handleResetAddForm()
        // select
        await fetchPage()
    } else {
        message.error(msg)
    }
}

watch(
    queryForm,
    async () => {
        await fetchPage()
    },
    { immediate: true }
)
</script>

<style scoped lang="scss"></style>