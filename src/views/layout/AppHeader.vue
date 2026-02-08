<script setup>
import logo from '@/assets/logo.png'
</script>

<template>
<div class="app-header">
  <div class="header-left">
    <el-image :src="logo" alt="Logo" style="height: 40px;" />
    <span class="header-title">控制台</span>

    <el-menu
        class="header-menu"
        mode="horizontal"
        :default-active="activeMenu"
        text-color="#c4c9ce"
        active-text-color="#00B2D6"
        router>
      <el-menu-item index="/home">挂号</el-menu-item>
      <el-menu-item index="/dashboard">病历</el-menu-item>
    </el-menu>
  </div>

  <div class="header-right">
    <el-dropdown>
      <span class="el-dropdown-link">
        用户名<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <span class="user-avatar">XX</span>
  </div>
</div>
</template>

<style scoped>
/* 页头整体样式 */
.app-header {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
}

/* 页头左侧：Logo 和标题以及模块 */
.header-left {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.header-title {
  display: flex;
  align-items: center;
  height: 100%;

  font-size: 20px;
  font-weight: bold;
}

.header-menu {
  margin-left: 16px;
}

/* 菜单样式 */
:deep(.header-menu.el-menu--horizontal) {
  flex: 1;
  min-width: 0;
  display: flex;   /* 覆盖 inline-flex */
}
:deep(.header-menu) {
  height: 100%;
  border-bottom: none;
}
:deep(.header-menu .el-menu-item) {
  height: 100%;
  display: flex;
  align-items: center;
  line-height: normal;

  font-size: 16px;
  font-weight: 500;
  font-family: var(--title-font-family), sans-serif;
  color: var(--text-primary-color);
}

/* 页头右侧：用户信息和下拉菜单 */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: bold;

  cursor: pointer;
  user-select: none;
}
</style>
