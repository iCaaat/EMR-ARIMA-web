<script setup>
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import {useLayoutStore} from "@/stores/layout.js";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getMenus} from "@/api/auth.js";

const layoutStore = useLayoutStore()
const route = useRoute()

const menuList = ref([])

const sideMenus = computed(() => {
  return menuList.value.filter(
      item => item.module === layoutStore.activeModule
  )
})
const loadMenus = async () => {
  const res = await getMenus()
  menuList.value = res.data
  console.log(res)
}
onMounted(async () => {
  await loadMenus()
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
        <component :is="ElementPlusIconsVue[item.icon]" />
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
