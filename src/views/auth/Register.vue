<script setup>
import { ref } from 'vue'
import SelectRole from "@/views/auth/register/SelectRole.vue";
import RegisterPatient from "@/views/auth/register/RegisterPatient.vue";
import {useRouter} from "vue-router";

const step = ref(1)
const role = ref(null)
const router = useRouter()

function handleSelectRole(r) {
  role.value = r
  step.value = 2
}

function handleBackToLogin() {
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
    <RegisterPatient
        v-else-if="step === 2 && role === 'patient'"
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