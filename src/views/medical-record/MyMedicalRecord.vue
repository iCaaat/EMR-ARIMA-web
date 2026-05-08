<script setup>
import {onMounted, ref} from "vue";
import {getUserPatientsSimple} from "@/api/user.js";
import {getRecord} from "@/api/record.js";

// 就诊人列表
const patientList = ref([])

// 当前选择就诊人
const currentPatient = ref(null)

// 病历列表
const recordList = ref([])

// 详情弹窗
const detailVisible = ref(false)

// 当前病历
const currentRecord = ref({})

// 加载就诊人
const loadPatients = async () => {

  const res = await getUserPatientsSimple()

  patientList.value = res.data || []

  // 默认加载第一个
  if (patientList.value.length > 0) {

    currentPatient.value = patientList.value[0]

    await loadRecordList(
        currentPatient.value.patientId
    )
  }
}

// 加载病历
const loadRecordList = async (patientId) => {

  const res = await getRecord(patientId)

  recordList.value = res.data || []
}

// 点击切换就诊人
const handleSelectPatient = async (patient) => {

  currentPatient.value = patient

  await loadRecordList(patient.patientId)
}

// 查看详情
const handleViewDetail = (record) => {

  currentRecord.value = record

  detailVisible.value = true
}

onMounted(() => {
  loadPatients()
})
</script>

<template>
  <h2 class="page-title">我的病历</h2>

  <div class="record-page">

    <!-- 左侧就诊人 -->
    <el-card shadow="never" class="patient-panel">

      <template #header>
        <div class="panel-title">
          就诊人
        </div>
      </template>

      <div
          v-for="item in patientList"
          :key="item.patientId"
          class="patient-item"
          :class="{
            active:
            currentPatient?.patientId === item.patientId
          }"
          @click="handleSelectPatient(item)"
      >

        <div class="patient-name">
          {{ item.realName }}
        </div>

        <div class="patient-idcard">
          {{ item.idCardSecret }}
        </div>

      </div>

    </el-card>

    <!-- 右侧病历 -->
    <div class="record-panel">

      <el-empty
          v-if="recordList.length === 0"
          description="暂无病历记录"
      />

      <!-- 病历卡片 -->
      <div
          v-for="record in recordList"
          :key="record.recordId"
          class="record-card-wrapper"
      >

        <el-card
            shadow="hover"
            class="record-card"
        >

          <div class="record-header">

            <div>

              <div class="department-name">
                {{ record.departmentName }}
              </div>

              <div class="doctor-name">
                {{ record.doctorName }}
              </div>

            </div>

            <div class="visit-date">
              {{ record.visitDate }}
            </div>

          </div>

          <div class="record-content">

            <div class="record-item">
              <span class="label">主诉：</span>
              {{ record.chiefComplaint }}
            </div>

            <div class="record-item">
              <span class="label">诊断：</span>
              {{ record.diagnosis }}
            </div>

          </div>

          <div class="record-footer">

            <span class="time-text">
              创建时间：
              {{ record.createTime }}
            </span>

            <el-button
                type="primary"
                text
                @click="handleViewDetail(record)"
            >
              查看详情
            </el-button>

          </div>

        </el-card>

      </div>

    </div>

    <!-- 病历详情 -->
    <el-dialog
        v-model="detailVisible"
        title="病历详情"
        width="900px"
    >

      <el-descriptions
          :column="2"
          border
      >

        <el-descriptions-item label="患者姓名">
          {{ currentRecord.patientName }}
        </el-descriptions-item>

        <el-descriptions-item label="接诊医生">
          {{ currentRecord.doctorName }}
        </el-descriptions-item>

        <el-descriptions-item label="科室">
          {{ currentRecord.departmentName }}
        </el-descriptions-item>

        <el-descriptions-item label="就诊日期">
          {{ currentRecord.visitDate }}
        </el-descriptions-item>

      </el-descriptions>

      <div class="detail-section">

        <div class="detail-title">
          主诉
        </div>

        <div class="detail-content">
          {{ currentRecord.chiefComplaint || '无' }}
        </div>

      </div>

      <div class="detail-section">

        <div class="detail-title">
          现病史
        </div>

        <div class="detail-content">
          {{ currentRecord.presentIllness || '无' }}
        </div>

      </div>

      <div class="detail-section">

        <div class="detail-title">
          既往史
        </div>

        <div class="detail-content">
          {{ currentRecord.pastHistory || '无' }}
        </div>

      </div>

      <div class="detail-section">

        <div class="detail-title">
          诊断结果
        </div>

        <div class="detail-content">
          {{ currentRecord.diagnosis || '无' }}
        </div>

      </div>

      <div class="detail-section">

        <div class="detail-title">
          治疗方案
        </div>

        <div class="detail-content">
          {{ currentRecord.treatmentPlan || '无' }}
        </div>

      </div>

      <div class="detail-section">

        <div class="detail-title">
          医嘱
        </div>

        <div class="detail-content">
          {{ currentRecord.doctorAdvice || '无' }}
        </div>

      </div>

    </el-dialog>

  </div>
</template>

<style scoped>
.record-page {
  display: flex;
  gap: 20px;
  height: 100%;
}

.patient-panel {
  width: 260px;
  flex-shrink: 0;
  border-radius: 12px;
}

.panel-title {
  font-size: 18px;
  font-weight: bold;
}

.patient-item {
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #ebeef5;
  margin-bottom: 12px;
  transition: all 0.2s;
}

.patient-item:hover {
  background: #f5f7fa;
}

.patient-item.active {
  background: #ecf5ff;
  border-color: #409eff;
}

.patient-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}

.patient-idcard {
  color: #909399;
  font-size: 13px;
}

.record-panel {
  flex: 1;
}

.record-card-wrapper {
  margin-bottom: 20px;
}

.record-card {
  border-radius: 12px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.department-name {
  font-size: 18px;
  font-weight: bold;
}

.doctor-name {
  color: #606266;
  margin-top: 4px;
}

.visit-date {
  color: #909399;
}

.record-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  line-height: 24px;
}

.label {
  font-weight: bold;
}

.record-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}

.time-text {
  color: #909399;
  font-size: 13px;
}

.detail-section {
  margin-top: 20px;
}

.detail-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.detail-content {
  background: #f5f7fa;
  padding: 12px;
  border-radius: 8px;
  line-height: 24px;
  color: #606266;
}
</style>