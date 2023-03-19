<template>
    <div class="container">


        <!--<pre>{{ userId }}</pre> -->

        <div v-if="!userId" class="w-full h-screen ">
            <object class="w-full h-full" data="/src/assets/resume.pdf" type="application/pdf"></object>
        </div>
        <n-form v-else :disabled="!clickUpdateBtn" class="mx-8" ref="formRef" :label-width="80" label-placement="left"
            :model="formValue" size="large">
            <pre>userInfo: {{ userInfo }}</pre>
            <br />
            <pre>formValue: {{ formValue }}</pre>
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
                <!-- <n-image width="200" :src="'/img/avatar/' + (userInfo?.avatar ?? 'default.jpg')"></n-image> -->
                <n-upload action="/api/upload/avatar" :max="1" :default-file-list="previewFileList" list-type="image-card"
                    @finish="handleUploadFinish" response-type="json" />
                <!-- <n-input v-model:value="formValue.avatar" /> -->
            </n-form-item>
            <n-form-item label="性别" path="user.gender">
                <n-radio-group v-model:value="formValue.gender" name="radiogroup">
                    <n-space>
                        <n-radio v-for="gender in genders" :key="gender.key" :value="gender.value">
                            {{ gender.value }}
                        </n-radio>
                    </n-space>
                </n-radio-group>
                <!-- <n-input v-model:value="formValue.gender" /> -->
            </n-form-item>
            <!-- <n-form-item label="密码" path="user.password"> -->
            <!-- <n-input v-model:value="formValue.password" /> -->
            <!-- </n-form-item> -->
            <n-form-item label="签名" path="user.signature">
                <n-input v-model:value="formValue.signature" />
            </n-form-item>
            <n-form-item class="form-foot-btns">

                <n-button :disabled="clickUpdateBtn" @click="handleClickUpdateBtn">修改</n-button>
                <n-button :disabled="!clickUpdateBtn" @click="handleClickSaveBtn">保存</n-button>
            </n-form-item>
        </n-form>
        <!-- <n-image width="200" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" /> -->
    </div>
</template>

<script setup  lang="ts">
import { FormInst, UploadFileInfo } from 'naive-ui';
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
    // record the old form
    console.log('userInfo: ', unref(userInfo));
}
const handleClickSaveBtn = () => {
    clickUpdateBtn.value = false
}
const handleUploadFinish = ({ event }: {
    file: UploadFileInfo
    event?: ProgressEvent,
}) => {
    const img = (event?.target as XMLHttpRequest)?.response.data
    console.log('img', img);

    console.log(previewFileList);

    if (img) {
        message.success("上传成功")
        formValue.value.avatar = img
    } else {

    }
    // debugger
    alert("finish")

}

const previewFileList = reactive<UploadFileInfo[]>([
    {
        id: 'react',
        name: '我是react.png',
        status: 'finished',
        url: '/img/avatar/' + (userInfo.value?.avatar ?? 'default.jpg')
    },
])

console.log("userId", isRef(userId), unref(userId));

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
        password: '',
    })
    if (unref(userInfo)) {
        Object.assign(form, unref(userInfo))
    }
    return form;
})

// const formValue = ref({
//     user: {
//         email: '',
//         telephone: '',
//         nickName: '',
//         firstName: '',
//         lastName: '',
//         avatar: '',
//         gender: '',
//         signature: '',
//         password: '',
//     },
// })


</script>

<style lang="scss" scoped>
.container {
    // margin: 20px 100px 0 100px;

    margin: 0 auto;

    .avatar {}

    :deep(.n-form-item .n-form-item-blank) {
        justify-content: flex-start;
    }

    :deep(.form-foot-btns) {
        .n-form-item-blank {
            justify-content: center;
        }
    }
}
</style>
