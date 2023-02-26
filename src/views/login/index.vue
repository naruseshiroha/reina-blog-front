<template>
  <n-card hoverable>
    <!-- login -->
    <n-form
      v-show="formType === 'login'"
      ref="loginFormRef"
      label-width="auto"
      label-placement="left"
      :model="loginForm"
      :rules="rules"
      size="medium"
    >
      <h2 class="text-center text-lg mb-4">登录</h2>
      <n-form-item label="用户名" path="username">
        <n-input
          v-model:value="loginForm.username"
          placeholder="手机号码/邮箱"
          clearable
        />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="loginForm.password"
          type="password"
          show-password-on="mousedown"
          placeholder="密码"
          :maxlength="16"
          clearable
        />
      </n-form-item>
      <n-form-item class="login-btns">
        <n-button @click="handleLoginBtn">登录</n-button>
        <n-button @click="switchLoginRegister">注册</n-button>
      </n-form-item>
    </n-form>
    <!-- register -->
    <n-form
      v-show="formType === 'register'"
      ref="registerFormRef"
      label-width="auto"
      label-placement="left"
      :model="registerForm"
      :rules="rules"
      size="medium"
    >
      <h2 class="text-center text-lg mb-4">注册</h2>
      <n-form-item label="昵称" path="nickName">
        <n-input
          @keydown.enter.prevent
          v-model:value="registerForm.nickName"
          placeholder="请输入昵称"
          clearable
        />
      </n-form-item>
      <n-form-item ref="emailRef" label="邮箱" first path="email">
        <n-input
          @keydown.enter.prevent
          v-model:value="registerForm.email"
          placeholder="请输入邮箱"
          clearable
        />
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          @input="handlePasswordInput"
          @keydown.enter.prevent
          v-model:value="registerForm.password"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入密码"
          :minlength="6"
          :maxlength="16"
          clearable
        />
      </n-form-item>
      <n-form-item ref="rePasswordRef" first label="确认密码" path="rePassword">
        <n-input
          :disabled="!registerForm.password"
          @keydown.enter.prevent
          v-model:value="registerForm.rePassword"
          type="password"
          show-password-on="mousedown"
          placeholder="请再次输入密码"
          :minlength="6"
          :maxlength="16"
          clearable
        />
      </n-form-item>
      <n-form-item label="验证码" path="verifyCode">
        <n-input
          v-model:value="registerForm.verifyCode"
          :disabled="!loadingCode"
          placeholder="请输入验证码"
          :maxlength="6"
          clearable
        />
        <n-button
          :disabled="loadingCode"
          type="tertiary"
          @click="getVerifyCode(registerForm.email)"
          >获取验证码{{ timeLimitStr }}</n-button
        >
      </n-form-item>
      <n-form-item class="login-btns">
        <n-button @click="switchLoginRegister">登录</n-button>
        <n-button @click="handleRegisterBtn">注册</n-button>
      </n-form-item>
    </n-form>
    <!-- logined -->
    <div v-show="formType === 'logined'">
      <h2 class="text-xl">ようこそ！</h2>
      <div class="mt-2 flex justify-between items-center">
        <n-avatar round :size="60" src="/img/avatar/another.jpg" />
        <span>{{ "見崎　鳴" }}</span>
        <n-button @click="handleLogoutBtn">退出</n-button>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
  NAvatar,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
} from "naive-ui";
import { ref, reactive } from "vue";
import { UserLoginBO, UserRegisterBO } from "/@/api/types";
import { useUserStore } from "/@/store";

const userStrore = useUserStore();
const message = useMessage();

// login begin
const formType = ref<string>("register");
const loginFormRef = ref<FormInst | null>(null);
const loginForm = reactive<UserLoginBO>({
  username: "",
  password: "",
});

const handleLoginBtn = async () => {
  const pass = await loginFormRef.value?.validate().then(() => 1).catch(() => 0)
  if (!pass) {
    return
  }
  const data = await userStrore.fetchLogin(loginForm);
  if (data instanceof Error) {
    message.error(data.message)
  } else {
    message.success("登录成功")
    formType.value = "logined";
  }
};
// login end

// register begin
const rePasswordRef = ref<FormItemInst | null>(null);
const registerFormRef = ref<FormInst | null>(null);
const registerForm = reactive<UserRegisterBO>({
  telephone: "",
  email: "",
  nickName: "",
  password: "",
  rePassword: "",
  verifyCode: "",
});

const handleRegisterBtn = async () => {
  const pass = await registerFormRef.value
    ?.validate()
    .then(() => 1)
    .catch(() => 0);
  if (!pass) return;
  const data = await userStrore.fetchRegister(registerForm);
  if (data instanceof Error) {
    message.error(data.message)
  } else {
    message.success("注册成功！")
    switchLoginRegister()
  }
};
// register end

// logout
const handleLogoutBtn = () => {
  message.success("已退出！")
  formType.value = "login"
};

// password @input
const handlePasswordInput = () => {
  if (registerForm.rePassword) {
    rePasswordRef.value?.validate({ trigger: "password-input" });
  }
};
// validator
const validateRePassword = (_rule: FormItemRule, value: string): boolean => {
  return value === registerForm.password;
};
const validateEmail = (_rule: FormItemRule, value: string): boolean => {
  const reg = /^\w{3,}(\.\w+)*@[A-Za-z0-9_]+(\.[A-Za-z]{2,5}){1,3}$/;
  return reg.test(value);
};

const rules: FormRules = {
  username: {
    required: true,
    message: "请输入手机号码/邮箱",
    trigger: ["input", "blur"],
  },
  nickName: {
    required: true,
    message: "请输入昵称",
    trigger: "blur",
  },
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    {
      validator: validateEmail,
      message: "邮箱格式不正确，如 example@gmail.com",
      trigger: "blur",
    },
  ],
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
  verifyCode: {
    required: true,
    message: "验证码不能为空",
    trigger: "blur",
  },
};

// verifyCode
const emailRef = ref<FormItemInst | null>(null);
const timeLimitStr = ref<string>("");
const loadingCode = ref<boolean>(false);

const getVerifyCode = async (email: string): Promise<string | void> => {
  // validate email
  if (!email) {
    message.warning("请输入邮箱！");
    return;
  }
  
  const pass = await emailRef.value?.validate({trigger: "blur"}).then(() => 1).catch(() => 0)
  if (!pass) {
    message.warning("邮箱格式不正确！")
    return
  }
  
  // time limit 
  let limit = 60;
  loadingCode.value = true;
  const interval = setInterval(() => {
    timeLimitStr.value = `(${limit})`;
    limit -= 1;
    if (limit < 0) {
      clearInterval(interval);
      loadingCode.value = false;
      timeLimitStr.value = "";
    }
  }, 1000);
  userStrore.fetchVerifyCode(email);
};

// switch Login & Register
const switchLoginRegister = () => {
  if (formType.value === "login") {
    formType.value = "register";
    loginFormRef.value?.restoreValidation();
    Object.assign(loginForm, { username: "", password: "" });
  } else if (formType.value === "register") {
    formType.value = "login";
    registerFormRef.value?.restoreValidation();
    Object.assign(registerForm, {
      nickName: "",
      email: "",
      password: "",
      rePassword: "",
      verifyCode: "",
    });
  }
};

</script>

<style lang="scss" scoped></style>
