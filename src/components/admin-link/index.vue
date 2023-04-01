<template>
    <div>
        <!-- {{ linkData }} -->
        <n-form ref="formRef" inline label-width="auto" label-placement="left" :model="queryForm" size="large">
            <n-form-item label="友链名称">
                <n-input v-model:value="queryForm.linkName" placeholder="输入名称" clearable />
            </n-form-item>
            <n-form-item label="友链URL">
                <n-input v-model:value="queryForm.linkUrl" placeholder="输入URL" clearable />
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
                @click="handleRemoveLink()">批量删除</n-button>
            <n-button strong secondary type="primary" @click="handleClickAddBtn">新增</n-button>
        </n-space>
        <n-data-table size="large" :columns="columns" :row-key="(row: LinkVO) => row.id" :data="linkData"
            @update:checked-row-keys="handleCheck" />

        <!-- reset password dialog -->
        <n-modal v-model:show="clickedAddBtn" preset="dialog" :title="operate + '友链'">
            <template #default>
                <n-form ref="addFormRef" label-width="80" label-placement="left" :model="addForm" :rules="rules"
                    size="medium">
                    <n-form-item label="友链名称" path="linkName">
                        <n-input v-model:value="addForm.linkName" placeholder="请输入友链名称" clearable />
                    </n-form-item>
                    <n-form-item label="友链描述" path="linkDesc">
                        <n-input v-model:value="addForm.linkDesc" type="textarea" placeholder="请输入友链描述" clearable />
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
import { NButton, FormInst, NTag, DataTableRowKey, NSpace, FormRules, NA } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

import { LinkVO } from '/@/api/types';
import { fetchAdminLink, fetchAdminDeleteLink, fetchAdminInsertLink, fetchAdminUpdateLink } from '/@/api/admin';


const message = useMessage()

const createColumns = ({ handleClickBtn }: { handleClickBtn: (btnName: string, row: LinkVO) => void }): DataTableColumns<LinkVO> => {
    return [
        {
            type: 'selection',
        },
        {
            title: '友链名称',
            key: 'linkName',
            width: '11%',
        },
        {
            title: '友链地址',
            key: 'linkUrl',
            width: '13%',
            render(row) {
                return h(
                    // NText,
                    NA,
                    {
                        href: row.linkUrl,
                        target: '_blank',
                    },
                    { default: () => row.linkUrl }
                )
            }
        },
        {
            title: '友链描述',
            key: 'linkDesc',
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

const linkData = ref([]);
const columns = createColumns({
    async handleClickBtn(btnName, row) {
        if (btnName === '削除') {
            // delete
            const { data } = await fetchAdminDeleteLink(row.id)
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
    linkName: null,
    linkUrl: null,
    status: null
})

// select
const fetchPage = async () => {
    const { data } = await fetchAdminLink(queryForm.linkName, queryForm.linkUrl, queryForm.status)
    const { data: result } = unref(data)
    linkData.value = result;
    checkedRowKeys.value = []
}

// delete
const handleRemoveLink = async () => {
    const { data } = await fetchAdminDeleteLink(checkedRowKeys.value as string[])
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
    linkName: { required: true, message: "请输入类别名称", trigger: ["input", "blur"] },
    linkDesc: { required: true, message: "请输入类别描述", trigger: ["input", "blur"] },
    status: { required: true, message: "请选择状态", trigger: ["change", "blur"] },
}
const addForm = reactive({
    id: null,
    linkName: "",
    linkUrl: "",
    linkDesc: "",
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
    queryForm.linkName = null
    queryForm.linkUrl = null
    queryForm.status = null
}

const handleResetAddForm = () => {
    addFormRef.value?.restoreValidation()
    Object.assign(addForm, {
        id: null,
        linkName: "",
        linkUrl: "",
        linkDesc: "",
        status: null
    })
    // addForm.id = null
    // addForm.linkName = ''
    // addForm.linkDesc = ''
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
        data = (await fetchAdminInsertLink(addForm)).data
    } else {
        data = (await fetchAdminUpdateLink(addForm)).data
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