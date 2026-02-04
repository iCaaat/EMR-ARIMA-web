<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";

import SelectRole from "@/views/auth/register/SelectRole.vue";
import RegisterBaseInfo from "@/views/auth/register/RegisterBaseInfo.vue";
import RegisterPatient from "@/views/auth/register/RegisterPatient.vue";

const step = ref(1)
const role = ref(null)
const router = useRouter()

function handleSelectRole(r) {
  role.value = r
  // 前往第二步
  step.value = 2
}

function handleBackToLogin() {
  router.push('/login')
}

function handleBaseInfo() {
  // 前往第三步
  step.value = 3
}
// TODO: 发送注册请求
function handleSubmitRegister() {
  // 提交注册信息，完成注册
  alert('注册成功！请前往登录。')
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <SelectRole
        v-if="step === 1"
        @next="handleSelectRole"
        @back="handleBackToLogin"
    />
    <RegisterBaseInfo
        v-else-if="step === 2"
        @back="step = 1"
        @next="handleBaseInfo"
    />
    <RegisterPatient
      v-else-if="step === 3 && role === 'patient'"
      @back="step = 2"
      @next="handleSubmitRegister"
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