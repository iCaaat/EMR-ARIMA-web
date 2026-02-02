<script>
import AppHeader from "@/views/layout/AppHeader.vue";
import AppAsider from "@/views/layout/AppAsider.vue";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppAsider
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <AppAsider></AppAsider>
        </el-aside>
        <el-container>
          <el-main>
            <RouterView></RouterView>
          </el-main>

          <el-footer>
            foot
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
