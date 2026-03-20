<script setup>
import PatientCard from "@/components/registration/PatientCard.vue";
import {ref} from "vue";

const patientList = ref([
  {
    avatarUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    identityName: '8888',
    identityNumber: '88888888888888888',
    institutionTitle: '南华附属医院',
    relation: '本人'
  }
])
</script>

<template>
  <div class="page-header">
    <h2 class="page-title">就诊人管理</h2>

    <el-button>编辑</el-button>
    <el-button type="primary">添加就诊人</el-button>
  </div>

  <div class="card-container">
    <PatientCard v-for="patient in patientList" v-bind="patient"></PatientCard>
  </div>

  <el-divider></el-divider>

  <p>健康卡功能敬请期待</p>
</template>

<style scoped>
.page-header {
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: space-between;
}

.card-container {
  width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>