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
        <el-menu-item index="1">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><House /></el-icon>
          <span>菜单2</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><House /></el-icon>
          <span>菜单3</span>
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
