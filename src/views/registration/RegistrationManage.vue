<script setup>
import {ref} from "vue";
import SelectAppointPatient from "@/views/registration/registration-manage-step/SelectAppointPatient.vue";
import FillMedicalRecord from "@/views/registration/registration-manage-step/FillMedicalRecord.vue";
import FinishStep from "@/views/registration/registration-manage-step/FinishStep.vue";

// 当前步骤
const active = ref(0)

// 当前选中的预约
const currentAppointment = ref(null)

// 选择预约后
const handleSelectAppointment = (row) => {
  currentAppointment.value = row
  console.log(row)
  active.value = 1
}

// 病历保存成功
const handleRecordSuccess = () => {
  active.value = 2
}

// 返回第一页
const backToFirst = () => {
  active.value = 0
  currentAppointment.value = null
}
</script>

<template>
  <h2 class="page-title">就诊管理</h2>

  <!-- 步骤条 -->
  <el-card shadow="never" class="step-card">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="选择预约患者" />
      <el-step title="填写病历" />
      <el-step title="完成" />
    </el-steps>
  </el-card>

  <!-- 步骤内容 -->
  <div class="step-content">

    <!-- 第一步 -->
    <SelectAppointPatient
        v-if="active === 0"
        @select="handleSelectAppointment"
    />

    <!-- 第二步 -->
    <FillMedicalRecord
        v-if="active === 1"
        :appointment="currentAppointment"
        @success="handleRecordSuccess"
    />

    <!-- 第三步 -->
    <FinishStep
        v-if="active === 2"
        @back="backToFirst"
    />

  </div>
</template>

<style scoped>
.step-card {
  border-radius: 12px;
  margin-bottom: 20px;
}

.step-content {
  margin-top: 20px;
}
</style>