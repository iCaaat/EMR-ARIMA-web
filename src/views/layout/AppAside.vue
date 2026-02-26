<script setup>
import {FirstAidKit, House, Service} from "@element-plus/icons-vue";
import {useLayoutStore} from "@/stores/layout.js";
import {computed} from "vue";
import {useRoute} from "vue-router";

const layoutStore = useLayoutStore()
const route = useRoute()

const menuMap = {
  registration: [
    { name: '首页', path: '/home', icon: House},
    { name: '预约挂号', path: '/appointment', icon: FirstAidKit},
    { name: '我的挂号', path: '/myRegistration'}
  ],
  record: [
    { name: '病历列表', path: '/dashboard'},
    { name: '健康管理', path: '/health'}
  ]
}

const sideMenus = computed(() => {
  return menuMap[layoutStore.activeModule]
})

const textColor = '#00B2D6'
</script>

<template>
<div class="app-aside">
  <el-menu
      :default-active="route.path"
      class="el-menu-aside"
      background-color="transparent"
      text-color="#2C3E50"
      active-text-color="#00B2D6"
      router>
    <el-menu-item v-for="item in sideMenus" :key="item.path" :index="item.path">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.name }}</span>
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
