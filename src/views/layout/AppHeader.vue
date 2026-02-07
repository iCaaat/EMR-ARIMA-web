<script setup>
import logo from '@/assets/logo.png'
</script>

<template>
<div class="app-header">
  <div class="header-left">
    <!-- TODO: Logo -->
    <img :src="logo" alt="Logo" style="height: 40px;">
  </div>
</div>
</template>

<style scoped>
.app-header {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
}


</style>
