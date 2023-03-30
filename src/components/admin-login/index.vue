<template>
    <div class="w-2/3">
        <h2 class="text-center text-xl mb-4">レイナのブログ管理</h2>
        <n-form ref="formRef" label-width="auto" label-placement="left" :model="form" :rules="rules" size="medium">
            <n-form-item label="用户名" path="username">
                <n-input v-model:value="form.userName" placeholder="手机号码/邮箱" clearable />
            </n-form-item>
            <n-form-item label="密码" path="password">
                <n-input v-model:value="form.password" type="password" show-password-on="mousedown" placeholder="密码"
                    :maxlength="16" clearable />
            </n-form-item>
            <n-form-item class="login-btns">
                <n-button @click="handleLoginBtn">登录</n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang="ts">
const formRef = ref()
const form = reactive({
    userName: '',
    password: '',
})
const rules = []
const handleLoginBtn = () => {
    // check is admin
    console.log("form", unref(form));

}
</script>

<style scoped></style>