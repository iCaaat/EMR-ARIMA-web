<script setup>
import {House, Picture} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

import hospital from "@/assets/icons/medical/hospital.svg"
import {getDoctors, getSevenDays, loadSelectDepartment} from "@/api/registration.js";

const emit = defineEmits(['select-doctor', 'back'])
const props = defineProps({
  department: Object
})
const selectDepartmentId = props.department.departmentId
const selectDepartmentInfo = ref({})

const baseUrl = "http://localhost:8080/files/"
const dateActiveId = ref(0)
const resetDepartment = () => {
  emit('back')
}
const doctors = ref([])
const dateList = ref([])
const selectedDate = ref("")

const appointment = (doctor) => {
  emit("select-doctor", doctor)
}
const handleSelectDate = (date, index) => {
  dateActiveId.value = index
  selectedDate.value = date
  loadDoctors()
}
const loadDoctors = async () => {
  const res = await getDoctors(selectDepartmentId, selectedDate.value)
  doctors.value = res.data
}

onMounted(async () => {
  const res = await getSevenDays();
  dateList.value = res.data;
  selectedDate.value = dateList.value[0].date
  await loadDoctors()
  const departmentRes = await loadSelectDepartment(selectDepartmentId)
  selectDepartmentInfo.value = departmentRes.data
})
</script>

<template>
  <div class="container">
    <!-- 科室信息区 -->
    <el-card style="width: 80%;border: 0; border-radius: 10px;" shadow="never">
      <div class="card-body">
        <el-image class="hospital-img img-container" :src="hospital">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="card-right">
          <div class="hospital-text">
            <h2>{{ selectDepartmentInfo.parentDepartmentName }}</h2>
            <p>{{ selectDepartmentInfo.selectDepartmentName }}</p>
            <p class="department-description">{{ selectDepartmentInfo.description }}</p>
          </div>
          <div class="hospital-right">
            <p>操作</p>
            <el-button @click="resetDepartment" type="info">重选科室</el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 医生信息区 -->
    <div class="doctor-title">
      <div class="text-span"></div>
      <p class="doctor-title-text">选择预约日期以及医生</p>
    </div>

    <!-- 日期选择 -->
    <div class="date-list">
      <el-splitter>
        <el-splitter-panel
            :resizable="false"
            v-for="(item, index) in dateList"
            :key="item.date">
          <div class="date-text-area" @click="handleSelectDate(item.date, index)" hover="hover">
            <el-text class="date-text" :class="{ 'active': dateActiveId === index }">{{ item.week }}</el-text>
            <el-text class="date-text" :class="{ 'active': dateActiveId === index }">{{ item.monthDay }}</el-text>
          </div>
        </el-splitter-panel>
      </el-splitter>
    </div>

    <!-- 医生信息列表 -->
    <div class="doctor-list" v-if="doctors.length > 0">
      <div class="doctor-item" v-for="doctor in doctors" :key="doctor.id">

        <!-- 左侧头像 -->
        <el-image class="doctor-avatar img-container" :src="baseUrl + doctor.avatar">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>

        <!-- 医生信息 -->
        <div class="doctor-info">
          <div class="doctor-name">
            <span class="name">{{ doctor.realName }}</span>
            <el-tag v-if="doctor.outpatientType === '专家门诊'" type="danger" size="small">{{ doctor.outpatientType }}</el-tag>
            <el-tag v-else type="success" size="small">{{ doctor.outpatientType }}</el-tag>
          </div>

          <div class="doctor-oc-title">
            {{ doctor.doctorTitle }}
          </div>
        </div>

        <!-- 号源 -->
        <div class="doctor-remain">
          余 {{ doctor.remainNumber }} 号
        </div>

        <!-- 价格 -->
        <div class="doctor-fee">
          ￥{{ doctor.fee }}
        </div>

        <!-- 挂号按钮 -->
        <div class="doctor-action">
          <el-button type="primary" @click="appointment(doctor)">预约挂号</el-button>
        </div>

      </div>
    </div>

    <el-empty v-else></el-empty>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 医院卡片 */
.card-body {
  display: flex;
  margin-left: 5%;
}

.hospital-img {
  width: 100px;
  height: 150px;
  border: 1px solid var(--border-color);
}

.card-right {
  margin-left: 5%;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.department-description {
  font-size: 14px;
  color: gray;
}

.hospital-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-right: 5%;
}

.image-slot {
  font-size: 30px;
}

/* 医生信息头 */
.doctor-title {
  border-radius: 10px;
  background-color: var(--card-bg-color);
  width: 80%;

  font-size: 18px;
  font-weight: bold;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.text-span {
  width: 5px;
  height: 20px;
  background-color: var(--status-good-color);

  margin-left: 5px;
}
.doctor-title-text {
  margin: 8px;
}

/* 日期部分 */
.date-list {
  width: 80%;
  height: 60px;

  background-color: var(--card-bg-color);
}

.date-text-area {
  min-width: 20px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.date-text-area:hover {
  cursor: pointer;
}

.date-text {
  font-weight: bold;
}

.date-text.active {
  color: var(--primary-color);
}

/* 医生卡片 */
.doctor-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.doctor-item {
  display: flex;
  align-items: center;

  background: var(--card-bg-color);
  border-radius: 10px;

  padding: 15px;
}

.doctor-avatar {
  width: 70px;
  height: 90px;
  border: 1px solid var(--border-color);
}

.doctor-info {
  margin-left: 20px;
  flex: 1;
}

.doctor-name {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  gap: 10px;
  align-items: center;
}

.doctor-oc-title {
  color: gray;
  margin-top: 10px;
}

.doctor-remain {
  width: 120px;
  font-size: 18px;
  font-weight: bold;
}

.doctor-fee {
  width: 120px;
  font-size: 18px;
  font-weight: bold;
}

.doctor-action {
  width: 120px;
  text-align: right;
}

/* 通用 */
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>