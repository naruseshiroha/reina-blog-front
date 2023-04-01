<template>
    <div>
        <n-form ref="formRef" inline label-width="auto" label-placement="left" :model="userForm" size="large">
            <n-form-item label="邮箱">
                <n-input v-model:value="userForm.email" placeholder="输入邮箱" clearable />
            </n-form-item>
            <n-form-item label="电话号码">
                <n-input v-model:value="userForm.telephone" placeholder="输入电话号码" clearable />
            </n-form-item>
            <n-form-item label="昵称">
                <n-input v-model:value="userForm.nickName" placeholder="输入昵称" clearable />
            </n-form-item>
            <n-form-item label="性别">
                <n-select v-model:value="userForm.gender" :style="{ width: '140px' }" placeholder="选择性别"
                    :options="genderOptions" clearable />
            </n-form-item>
            <n-form-item label="角色">
                <n-select v-model:value="userForm.role" :style="{ width: '150px' }" placeholder="选择角色"
                    :options="roleOptions" clearable />
            </n-form-item>
            <n-form-item label="状态">
                <n-select v-model:value="userForm.froze" :style="{ width: '120px' }" placeholder="选择状态"
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
                @click="handleRemoveUser()">批量删除</n-button>
        </n-space>
        <n-data-table size="large" :columns="columns" :row-key="(row: RowData) => row.id" :data="userData"
            @update:checked-row-keys="handleCheck" />
        <n-pagination class="my-3 justify-end" v-model:page="page.pageNum" :page-count="pages" simple />

        <!-- reset password dialog -->
        <n-modal v-model:show="clickedResetBtn" preset="dialog" title="重置用户密码">
            <template #default>
                <div class="flex items-center">
                    <label for="reset-pwd" :style="{ minWidth: '60px' }">新密码: </label>
                    <n-input v-model:value="resetForm.password" id="reset-pwd" type="password" show-password-on="mousedown"
                        placeholder="请输入新密码"></n-input>
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
import { useUserStore } from '/@/store';
import { Gender, Role, UserStatus } from '/@/api/types/enums';

import { fetchAdminFroze, fetchAdminDelete, fetchAdminReset } from '/@/api/admin'

type RowData = {
    id: string
    email: string
    telephone: string
    nickName: string
    firstName: string
    lastName: string
    avatar: string
    gender: Gender
    role: Role
    froze: string
}

const message = useMessage()
const userStore = useUserStore();

const createColumns = ({ handleClickBtn }: { handleClickBtn: (btnName: string, row: RowData) => void }): DataTableColumns<RowData> => {
    return [
        {
            type: 'selection',
        },
        {
            title: '邮箱',
            key: 'email'
        },
        {
            title: '电话号码',
            key: 'telephone'
        },
        {
            title: '昵称',
            key: 'nickName'
        },
        {
            title: '姓名',
            // key: 'name',
            key: '',
            render(row) {
                return h(
                    NText,
                    {

                    },
                    { default: () => ((row.firstName ?? '') + " " + (row.lastName ?? '')) }
                )
            }
        },
        {
            title: '头像',
            key: 'avatar',
            render(row) {
                return h(
                    NImage,
                    {
                        width: '80',
                        src: `/img/avatar/${row.avatar ?? 'default.jpg'}`
                    }
                )
            }
        },
        {
            title: '性别',
            key: 'gender',
            render(row) {
                return h(NTag, { type: checkTagType(row.gender) }, { default: renderGender(row.gender) })
            }
        },
        {
            title: '角色',
            key: 'role',
            render(row) {
                return h(NTag, { type: checkTagType(row.role) }, { default: renderRole(row.role) })
            }
        },
        {
            title: '状态',
            key: 'froze',
            render(row) {
                return h(NTag, { type: checkTagType(row.froze) }, { default: renderStatus(row.froze) })
            }
        },
        {
            title: '操作',
            key: 'actions',
            render(row) {
                return h(
                    NSpace,
                    {},
                    [
                        ["解凍", "凍結", "削除", "重置"].filter((_v, i) => i !== +row.froze).map((t, i) => h(NButton, { type: i === 0 ? 'warning' : (i === 1 ? 'error' : 'default'), secondary: true, onClick: () => handleClickBtn(t, row) }, t))
                    ]
                )
            }
        }
    ]
}

const userData = ref([]);
const columns = createColumns({
    async handleClickBtn(btnName, row) {
        if (btnName === '凍結') {
            const { data } = await fetchAdminFroze(row.id, "1")
            const { data: result, msg } = unref(data)
            if (result) {
                message.success(msg)
            } else {
                message.error(msg)
            }
        } else if (btnName === '解凍') {
            const { data } = await fetchAdminFroze(row.id, "0")
            const { data: result, msg } = unref(data)
            if (result) {
                message.success(msg)
            } else {
                message.error(msg)
            }
        } else if (btnName === '削除') {
            const { data } = await fetchAdminDelete([row.id])
            const { data: result, msg } = unref(data)
            if (result) {
                message.success(msg)
            } else {
                message.error(msg)
            }
        } else if (btnName === '重置') {
            clickedResetBtn.value = true
            resetForm.id = row.id
        }
        // refresh
        await fetchPage()
    },
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
const userForm = reactive({
    email: "",
    telephone: "",
    nickName: "",
    gender: null,
    role: null,
    froze: null
})

// select options
const genderOptions = [
    { label: "男の子", value: Gender.MALE },
    { label: "女の子", value: Gender.FEMALE },
    { label: "秘密", value: Gender.SECRET },
]
const roleOptions = [
    { label: "管理員", value: Role.ADMIN },
    { label: "ユーザー", value: Role.USER },
]
const statusOptions = [
    { label: "凍結", value: UserStatus.FROZE },
    { label: "正常", value: UserStatus.NORML },
]

// NTag type
const checkTagType = (val: string) => {
    if (val === UserStatus.FROZE) {
        return "error"
    } else if (val === Gender.MALE || val === Role.USER) {
        return "info"
    } else if (val === Gender.FEMALE || val === Role.ADMIN || val === UserStatus.NORML) {
        return "success"
    } else if (val === Gender.SECRET) {
        return "warning"
    }
}

// render gender, role, status
const renderGender = (gender: Gender): string => {
    switch (gender) {
        case Gender.MALE:
            return "男の子"
        case Gender.FEMALE:
            return "女の子"
        case Gender.SECRET:
        default:
            return "秘密"
    }
}
const renderRole = (role: Role): string => {
    switch (role) {
        case Role.ADMIN:
            return "管理員"
        case Role.USER:
        default:
            return "ユーザー"
    }
}
const renderStatus = (froze: string): string => {
    switch (froze) {
        case '1':
            return "凍結"
        case '0':
        default:
            return "正常"
    }
}

// select
const fetchPage = async () => {
    const data = await userStore.fetchAdminPageUser(page, userForm)
    const { list: users, total } = data
    page.total = total
    userData.value = users
}

// delete
const handleRemoveUser = async () => {
    const { data } = await fetchAdminDelete(checkedRowKeys.value as string[])
    if (unref(data).data) {
        message.success("删除成功")
    }
    await fetchPage()
}

// form reset btn
const handleResetBtn = () => {
    userForm.email = ''
    userForm.telephone = ''
    userForm.nickName = ''
    userForm.gender = null
    userForm.role = null
    userForm.froze = null
}

const resetForm = reactive({
    id: "",
    password: ""
})
const clickedResetBtn = ref(false)
const handleClickSaveBtn = async () => {
    // check password length
    if (resetForm.password.length < 6 || resetForm.password.length > 16) {
        message.warning("密码长度为 6-16 位！")
        return
    }
    const { data } = await fetchAdminReset(resetForm)
    const { data: result, msg } = unref(data)
    if (result) {
        resetForm.password = ''
        message.success(msg)
        clickedResetBtn.value = false
    } else {
        message.error(msg)
    }

}

watch(
    userForm,
    async () => {
        await fetchPage()
    },
    { immediate: true }
)
</script>

<style scoped></style>