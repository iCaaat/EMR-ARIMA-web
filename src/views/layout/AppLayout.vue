<script setup>
import AppHeader from "@/views/layout/AppHeader.vue";
import AppAside from "@/views/layout/AppAside.vue";
import {useLayoutStore} from "@/stores/layout.js";
import {getMenus} from "@/api/auth.js";
import {onMounted} from "vue";
import router from "@/router/index.js";

const layoutStore = useLayoutStore()

const loadMenus = async () => {

  if (layoutStore.menuLoaded) return

  const res = await getMenus()
  const menus = res.data
  layoutStore.setMenus(menus)
  const firstMenu = menus.find(item => item.path)
  await router.push(firstMenu.path)
}

onMounted(() => {
  loadMenus()
})
</script>

<template>
    <el-container class="el-container--fluid">
      <el-header class="el-header-left">
        <AppHeader></AppHeader>
      </el-header>

      <el-container>
        <el-aside width="200px" class="el-aside">
          <AppAside></AppAside>
        </el-aside>

        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
</template>

<style scoped>
.el-container {
  height: 100vh;
}

.el-header-left {
  border: 1px solid var(--border-color);
  padding: 0;
  background-color: var(--card-bg-color);
}

.el-aside {
  border: 1px solid var(--border-color);
  border-top: none;
  background-color: var(--card-bg-color);
}
</style>
