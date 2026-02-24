<script setup>
import {House} from "@element-plus/icons-vue";

const textColor = '#00B2D6'
</script>

<template>
<div class="app-aside">
  <el-menu
      default-active="1"
      class="el-menu-aside"
      background-color="transparent"
      text-color="#2C3E50"
      active-text-color="#00B2D6"
      router>
    <el-menu-item index="home">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="appointment">
      <el-icon><House /></el-icon>
      <span>预约挂号</span>
    </el-menu-item>
    <el-menu-item index="appointment">
      <el-icon><House /></el-icon>
      <span>预约挂号</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><House /></el-icon>
      <span>我的挂号</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><House /></el-icon>
      <span>健康管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><House /></el-icon>
      <span>个人中心</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<style scoped>
.el-menu-aside {
  border: none;
}

.el-menu-item {
  border-radius: 8px;
  --el-menu-hover-bg-color: #f2f2f2;
  margin: 10px;
  padding: 0;
}
</style>
