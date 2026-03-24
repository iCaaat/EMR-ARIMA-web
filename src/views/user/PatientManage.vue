<script setup>
import PatientCard from "@/components/registration/PatientCard.vue";
import {onMounted, ref} from "vue";
import {getPatientDetail, getUserPatients} from "@/api/user.js";

const loading = ref(true)
const detailVisible = ref(false)
const patients = ref([])
const patientList = ref([])
const detailForm = ref({})

const showDetail = async (patientId) => {
  detailVisible.value = true
  loading.value = true
  // 发送请求
  console.log(patientId)
  try {
    const res = await getPatientDetail(patientId)
    detailForm.value = res.data
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const res = await getUserPatients()
  patients.value = res.data
  patientList.value = patients.value.map(item => ({
    mainId: item.patientId,
    identityName: item.realNameSecret,
    identityNumber: item.idCardSecret,
    relation: item.relationDisplay,
    avatarUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    institutionTitle: '南华附属医院',
    buttonText: '展开详细'
  }))
})
</script>

<template>
  <div class="page-header">
    <h2 class="page-title">就诊人管理</h2>

    <div class="buttons">
      <el-button>编辑</el-button>
      <el-button type="primary">添加就诊人</el-button>
    </div>
  </div>

  <div class="card-container">
    <PatientCard v-for="patient in patientList" :data="patient" @view-detail="showDetail"></PatientCard>
  </div>

  <el-dialog
      v-model="detailVisible"
      v-loading="loading"
      title="Tips"
      width="500"
  >
    <el-form>
      <el-form-item>
        <el-input v-model="detailForm.patientId"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="detailVisible = false">Cancel</el-button>
        <el-button type="primary" @click="detailVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

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