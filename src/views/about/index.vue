<template>
    <div class="about">

        <div v-if="!userId" class="w-full h-screen ">
            <object class="w-full h-full" data="/pdf/resume.pdf" type="application/pdf"></object>
        </div>
        <n-form v-else :disabled="!clickUpdateBtn" class="mx-8" ref="formRef" :label-width="80" label-placement="left"
            :model="formValue" size="large">
            <h2 class="text-center text-2xl mb-4">个人信息</h2>
            <n-form-item label="邮箱" path="user.email">
                <n-input disabled v-model:value="formValue.email" />
            </n-form-item>
            <n-form-item label="手机号码" path="user.telephone">
                <n-input disabled v-model:value="formValue.telephone" />
            </n-form-item>
            <n-form-item label="昵称" path="user.nickName">
                <n-input v-model:value="formValue.nickName" />
            </n-form-item>
            <n-form-item label="姓" path="user.firstName">
                <n-input v-model:value="formValue.firstName" />
            </n-form-item>
            <n-form-item label="名" path="user.lastName">
                <n-input v-model:value="formValue.lastName" />
            </n-form-item>
            <n-form-item label="头像" path="user.avatar">
                <n-upload action="/api/upload/avatar" :max="1" :default-file-list="previewFileList" list-type="image-card"
                    @finish="handleUploadFinish" response-type="json" />
            </n-form-item>
            <n-form-item class="gender" label="性别" path="user.gender">
                <n-radio-group v-model:value="formValue.gender" name="radiogroup">
                    <n-space>
                        <n-radio v-for="gender in genders" :key="gender.key" :value="gender.value">
                            {{ gender.value }}
                        </n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <!-- <n-form-item label="密码" path="user.password"> -->
            <!-- <n-input v-model:value="formValue.password" /> -->
            <!-- </n-form-item> -->
            <n-form-item label="签名" path="user.signature">
                <n-input v-model:value="formValue.signature" />
            </n-form-item>
            <n-form-item class="form-foot-btns">

                <n-button :disabled="clickUpdateBtn" strong secondary type="primary"
                    @click="handleClickUpdateBtn">修改</n-button>
                <n-button :disabled="!clickUpdateBtn" strong secondary type="tertiary"
                    @click="handleClickCancelBtn">取消</n-button>
                <n-button :disabled="!clickUpdateBtn" strong secondary type="info" @click="handleClickSaveBtn">保存</n-button>
            </n-form-item>
        </n-form>

        <div class="btns">
            <div class="pwd">
                <span>忘记密码？点这里</span>
                <n-button @click="handleResetPassword">重置密码</n-button>
            </div>
            <div class="article">
                <span>想发布文章？点这里</span>
                <RouterLink to="/edit">
                    <n-button>发布文章</n-button>
                </RouterLink>
            </div>
            <div class="link">
                <span>想发布友链？点这里</span>
                <n-button @click="handleClickLinkBtn">发布友链</n-button>
            </div>
        </div>

        <n-modal v-model:show="showResetPasswordModal" :mask-closable="false" preset="dialog" title="Dialog"
            @close="handleCloseDialog" :onEsc="handleCloseDialog">
            <template #header>
                <div>重置密码</div>
            </template>

            <n-form ref="resetFormRef" :model="resetForm" label-placement="left" label-width="auto" :rules="rules">
                <n-form-item label="验证码" path="code">
                    <n-input v-model:value="resetForm.code" :disabled="!loadingCode" placeholder="请输入验证码" :maxlength="6"
                        clearable />
                    <n-button :disabled="loadingCode" type="tertiary" @click="handleFetchCode">获取</n-button>
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input @input="handlePasswordInput" @keydown.enter.prevent v-model:value="resetForm.password"
                        type="password" show-password-on="mousedown" placeholder="请输入密码" :minlength="6" :maxlength="16"
                        clearable />
                </n-form-item>
                <n-form-item ref="rePasswordRef" first label="确认密码" path="rePassword">
                    <n-input :disabled="!resetForm.password" @keydown.enter.prevent v-model:value="resetForm.rePassword"
                        type="password" show-password-on="mousedown" placeholder="请再次输入密码" :minlength="6" :maxlength="16"
                        clearable />
                </n-form-item>
                <n-form-item>
                    <n-button type="tertiary" @click="handleCloseDialog">取消</n-button>
                    <n-button type="primary" @click="handleSaveDialog">保存</n-button>
                </n-form-item>
            </n-form>
        </n-modal>

        <n-modal v-model:show="showLinkModal" :mask-closable="false" preset="dialog" @close="handleCloseLinkDialog"
            :onEsc="handleCloseLinkDialog">
            <template #header>
                <!-- Header -->
            </template>
            <template #icon>
                <!-- Icon -->
            </template>
            <Link />
        </n-modal>
    </div>
</template>

<script setup  lang="ts">
import { FormInst, UploadFileInfo, useMessage, FormRules, FormItemRule } from 'naive-ui'
import { CLOSE_LINK_DIALOG } from '/@/api/types/keys';
import { ResetPasswordBO, UserVO } from '/@/api/types';
import { useUserStore } from '/@/store';

const genders = [
    { key: "female", value: "FEMALE" },
    { key: "male", value: "MALE" },
    { key: "secret", value: "SECRET" },
]

const formRef = ref<FormInst | null>(null)
const userStore = useUserStore()
const message = useMessage()

const { userId, userInfo } = storeToRefs(userStore)
const clickUpdateBtn = ref(false)
const handleClickUpdateBtn = () => {
    clickUpdateBtn.value = true
}
const handleClickCancelBtn = () => {
    clickUpdateBtn.value = false
    Object.assign(formValue.value, unref(userInfo))
    message.info("已取消！")
}
const handleClickSaveBtn = async () => {
    clickUpdateBtn.value = false
    const userInfo = reactive<UserVO>({
        id: unref(userId),
        ...unref(formValue)
    })
    const data = await userStore.fetchUpdateUserInfo(userInfo)
    if (data) {
        message.success("修改成功！")
    } else {
        message.error("修改失败，请联系管理员！")
    }
}
const handleUploadFinish = ({ file, event }: {
    file: UploadFileInfo
    event?: ProgressEvent,
}) => {
    const img = (event?.target as XMLHttpRequest)?.response.data
    if (img) {
        message.success("上传成功！")
        formValue.value.avatar = img
        file.url = "/img/avatar/" + img
        console.log(previewFileList);
    } else {
        message.error("上传出错！")
        file.url = "/img/avatar/default.jpg"
    }

}

const previewFileList = reactive<UploadFileInfo[]>([
    {
        id: 'react',
        name: '我是react.png',
        status: 'finished',
        url: '/img/avatar/' + (userInfo.value?.avatar ?? 'default.jpg')
    },
])

const formValue = computed(() => {
    const form = reactive({
        email: '',
        telephone: '',
        nickName: '',
        firstName: '',
        lastName: '',
        avatar: '',
        gender: '',
        signature: '',
    })
    if (unref(userInfo)) {
        Object.assign(form, unref(userInfo))
    }
    return form;
})

// reset password
const showResetPasswordModal = ref(false)
const handleResetPassword = () => {
    showResetPasswordModal.value = true;
}
const rePasswordRef = ref()
const resetFormRef = ref()
const resetForm = reactive<ResetPasswordBO>({
    code: "",
    email: userInfo.value?.email as string,
    password: "",
    rePassword: ''
})
const validateRePassword = (_rule: FormItemRule, value: string): boolean => {
    return value === resetForm.password;
};
const rules: FormRules = {
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur",
        },
        {
            min: 6,
            max: 16,
            message: "长度为6-16位",
            trigger: "blur",
        },
    ],
    rePassword: [
        {
            required: true,
            message: "请再次输入密码",
            trigger: ["blur", "input"],
        },
        {
            message: "两次输入的密码不一致",
            trigger: ["blur", "password-input"],
            validator: validateRePassword,
        },
    ],
    code: {
        required: true,
        message: "验证码不能为空",
        trigger: "blur",
    },
};
const loadingCode = ref(false)
const handlePasswordInput = () => {
    if (resetForm.rePassword) {
        rePasswordRef.value?.validate({ trigger: "password-input" });
    }
};
const handleFetchCode = async () => {
    loadingCode.value = true;
    const email = userInfo.value?.email
    const data: string = await userStore.fetchResetCode(email as string)
    console.log('data', data);
    if (data) {
        message.info("请前往邮箱查看验证码！")
    }
}

const handleCloseDialog = () => {
    showResetPasswordModal.value = false;
    resetFormRef.value.restoreValidation()
    Object.assign(resetForm, {
        code: "",
        password: "",
        rePassword: ""
    })
    loadingCode.value = false;
}

const handleSaveDialog = async () => {
    const pass = await resetFormRef.value
        ?.validate()
        .then(() => 1)
        .catch(() => 0);
    if (!pass) return;
    // confirm
    const data = await userStore.fetchResetPassword(resetForm);
    if (data.code === 200) {
        message.success(data.msg)
        handleCloseDialog();
    } else if (data.error) {
        message.error(data.message)
    }
    loadingCode.value = false;
}

// apply friend link
const showLinkModal = ref(false)

const handleClickLinkBtn = () => {
    showLinkModal.value = true
}

const handleCloseLinkDialog = () => {
    showLinkModal.value = false
}


provide(CLOSE_LINK_DIALOG, handleCloseLinkDialog as Function)
</script>

<style lang="scss" scoped>
.about {
    // margin: 20px 100px 0 100px;
    // margin: 0 auto;

    :deep(.gender) {
        .n-form-item-blank {
            justify-content: flex-start;
        }
    }

    :deep(.form-foot-btns) {
        .n-form-item-blank {
            justify-content: center;
        }
    }

    .btns {
        display: flex;

        .pwd,
        .article,
        .link {
            margin: auto;

            span {
                margin-right: 10px;
            }
        }
    }

}
</style>
