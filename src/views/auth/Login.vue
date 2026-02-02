<script>
import LoginCard from "@/views/auth/login/LoginCard.vue";
export default {
  components: {LoginCard}
}
</script>

<template>
  <div class="login-page">
    <LoginCard></LoginCard>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}
</style>
