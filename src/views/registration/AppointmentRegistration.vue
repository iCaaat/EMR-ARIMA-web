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

const handleFirstStep = (department) => {
  console.log("选择的科室：", department);
}
</script>

<template>
  <h2 class="page-title">预约挂号</h2>

  <div class="page-content">
    <div class="steps-wrapper">
      <el-steps :active="active" finish-status="success">
        <el-step title="科室选择" />
        <el-step title="预约医生" />
        <el-step title="选择时段" />
      </el-steps>
    </div>

    <el-divider></el-divider>

    <!-- 步骤内容区 -->
    <SelectDepartment v-if="active === 0" @selectDepartment="handleFirstStep"></SelectDepartment>
  </div>
</template>

<style scoped>
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;   /* 所有子元素水平居中 */
}

.steps-wrapper {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}
</style>