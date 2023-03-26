<template>
    <div class="container">
        <h2 class="text-center text-2xl">{{ props.title }}</h2>
        <n-form ref="linkRef" :model="link" :rules="rules">
            <n-form-item label="友链名称" path="linkName">
                <n-input v-model:value="link.linkName" clearable placeholder="请输入友链名称" />
            </n-form-item>
            <n-form-item label="友链描述" path="linkDesc">
                <n-input type="textarea" v-model:value="link.linkDesc" clearable placeholder="请输入友链描述" />
            </n-form-item>
            <n-form-item label="友链地址" path="linkUrl">
                <n-input v-model:value="link.linkUrl" clearable placeholder="请输入友链地址" />
            </n-form-item>
            <n-form-item>
                <n-button type="primary" secondary @click="handleConfirmBtn">确认</n-button>
                <n-button type="tertiary" secondary @click="handleResetBtn">重置</n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { FormRules } from 'naive-ui';
import { useLinkStore } from '/@/store';
import { CLOSE_LINK_DIALOG } from '/@/api/types/keys'

const message = useMessage()
const linkStore = useLinkStore()

const linkRef = ref()
const props = defineProps({
    title: { type: String, default: "申请友链" }
})
const link = reactive({
    linkName: "",
    linkDesc: "",
    linkUrl: ""
})
const rules: FormRules = {
    linkName: { required: true, message: "请输入友链名称", trigger: 'blur' },
    linkDesc: { required: true, message: "请输入友链描述", trigger: 'blur' },
    linkUrl: { required: true, message: "请输入友链URL", trigger: 'blur' },
}

const closeDialog: Function = inject(CLOSE_LINK_DIALOG) as Function

const handleConfirmBtn = async () => {
    const pass = await linkRef.value.validate().then(() => 1).catch(() => 0)
    if (!pass) return
    const { data, msg } = await linkStore.fetchApplyLink(link)
    if (data) {
        message.success(msg)
        handleResetBtn()
        closeDialog()
    } else {
        message.error(msg)
    }

}
const handleResetBtn = () => {
    linkRef.value.restoreValidation()
    Object.assign(link, {
        linkName: "",
        linkDesc: "",
        linkUrl: ""
    })
}
</script>
