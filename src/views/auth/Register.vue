<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";

import SelectRole from "@/views/auth/register/SelectRole.vue";
import RegisterBaseInfo from "@/views/auth/register/RegisterBaseInfo.vue";
import RegisterPatient from "@/views/auth/register/RegisterPatient.vue";
import {ElMessage} from "element-plus";
import {existUsername, register} from "@/api/auth.js";

const step = ref(1)
const router = useRouter()
const registerInfo = reactive({
  roleCode: '',
  username: '',
  password: ''
})

const handleSelectRole = (role) => {
  registerInfo.roleCode = role
  // 前往第二步
  step.value = 2
}

const handleBaseInfo = async (registerForm) => {
  try {
    const res = await existUsername(registerForm.username)
    if (res.data === true) {
      ElMessage.error('用户名已存在，请重新输入')
      return
    }
  } catch (error) {
    ElMessage.error(error)
    return
  }

  if (registerForm.password !== registerForm.confirmPasswd) {
    return ElMessage.error('两次输入的密码不一致，请重新输入')
  }

  registerInfo.username = registerForm.username
  registerInfo.password = registerForm.password
  // 前往第三步
  step.value = 3
}

const handleSubmitRegister = async (expInfo) => {
  Object.assign(registerInfo, expInfo)
  try {
    const res = await register(registerInfo)
  } catch (error) {
    ElMessage.error(error)
    return
  }
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
      v-else-if="step === 3 && registerInfo.roleCode === 'patient'"
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