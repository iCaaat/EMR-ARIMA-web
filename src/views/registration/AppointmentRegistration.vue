<script setup>
import {ref} from "vue";
import SelectDepartment from "@/views/registration/appoint-step/SelectDepartment.vue";

const active = ref(0);

const next = () => {
  if (active.value++ > 2) {
    active.value = 3;
  }
}
const prev = () => {
  if (active.value-- <= 0) {
    active.value = 0;
  }
}
</script>

<template>
  <h2 class="page-title">数据概览</h2>

  <el-steps style="max-width: 800px" :active="active" finish-status="success">
    <el-step title="科室选择" />
    <el-step title="预约医生" />
    <el-step title="选择时段" />
  </el-steps>

  <!-- 步骤内容区 -->
  <SelectDepartment></SelectDepartment>

  <el-button @click="prev">上一步</el-button>
  <el-button @click="next" type="primary">下一步</el-button>
</template>

<style scoped>

</style>