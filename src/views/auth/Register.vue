<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";

import RegisterBaseInfo from "@/views/auth/register/RegisterBaseInfo.vue";
import RegisterPatient from "@/views/auth/register/RegisterPatient.vue";
import {ElMessage} from "element-plus";
import {existUsername, register} from "@/api/user.js";
import RegisterOtherInfo from "@/views/auth/register/RegisterOtherInfo.vue";

const step = ref(1)
const router = useRouter()
const registerInfo = reactive({
  username: '',
  password: ''
})

const handleBaseInfo = async (registerForm) => {
  const res = await existUsername(registerForm.username)
  if (res.data === true) {
    ElMessage.error('用户名已存在，请重新输入')
    return
  }

  if (registerForm.password !== registerForm.confirmPasswd) {
    return ElMessage.error('两次输入的密码不一致，请重新输入')
  }

  registerInfo.username = registerForm.username
  registerInfo.password = registerForm.password
  // 前往第三步
  step.value = 2
}

const handleSubmitRegister = async (expInfo) => {
  Object.assign(registerInfo, expInfo)
  const res = await register(registerInfo)
  // 提交注册信息，完成注册
  ElMessage.success('注册成功,将自动跳转到登录页')
  await router.push('/login')
}

const handleBackToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <RegisterBaseInfo
        v-if="step === 1"
        @back="handleBackToLogin"
        @submit-base-info="handleBaseInfo"
    />
    <RegisterOtherInfo
        v-else-if="step === 2"
        @back="step = 1"
        @submit-exp-form="handleSubmitRegister" />
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
</style>