<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";

import SelectRole from "@/views/auth/register/SelectRole.vue";
import RegisterBaseInfo from "@/views/auth/register/RegisterBaseInfo.vue";
import RegisterPatient from "@/views/auth/register/RegisterPatient.vue";
import {ElMessage} from "element-plus";

const step = ref(1)
const router = useRouter()
const registerInfo = reactive({
  role: '',
  username: '',
  password: ''
})

const handleSelectRole = (role) => {
  registerInfo.role = role
  // 前往第二步
  step.value = 2
}

const handleBaseInfo = (registerForm) => {
  registerInfo.username = registerForm.username
  registerInfo.password = registerForm.password
  // 前往第三步
  step.value = 3
}

// TODO: 发送注册请求
const handleSubmitRegister = (expInfo) => {
  Object.assign(registerInfo, expInfo)
  // 提交注册信息，完成注册
  ElMessage.success('注册成功,将自动跳转到登录页')
  router.push('/login')
}

const handleBackToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <SelectRole
        v-if="step === 1"
        @select-role="handleSelectRole"
        @back="handleBackToLogin"
    />
    <RegisterBaseInfo
        v-else-if="step === 2"
        @back="step = 1"
        @submit-base-info="handleBaseInfo"
    />
    <RegisterPatient
      v-else-if="step === 3 && registerInfo.role === 'patient'"
      @back="step = 2"
      @submit-exp-form="handleSubmitRegister"
    />
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