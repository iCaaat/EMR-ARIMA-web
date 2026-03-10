<script setup>
import {House, Picture} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const emit = defineEmits(['select-doctor', 'back'])

const dateActiveId = ref(1)
const resetDepartment = () => {
  emit('back')
}
const doctors = ref([
  {
    id: 1,
    name: "张医生",
    title: "主任医师",
    remain: 8,
    fee: 20
  },
  {
    id: 2,
    name: "李医生",
    title: "副主任医师",
    remain: 5,
    fee: 15
  }
])

const appointment = (doctor) => {
  emit("select-doctor", doctor)
}
const handleSelectDate = (index) => {
  dateActiveId.value = index
}
</script>

<template>
  <div class="container">
    <!-- 科室信息区 -->
    <el-card style="width: 80%;border: 0; border-radius: 10px;" shadow="never">
      <div class="card-body">
        <el-image class="hospital-img">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="card-right">
          <div class="hospital-text">
            <h2>二级科室名称</h2>
            <p>三级科室名称</p>
            <p class="department-description">描述</p>
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
            v-for="index in 7"
            :key="index">
          <div class="date-text-area" @click="handleSelectDate(index)" hover="hover">
            <el-text class="date-text" :class="{ 'active': dateActiveId === index }">星期一</el-text>
            <el-text class="date-text" :class="{ 'active': dateActiveId === index }">03-10</el-text>
          </div>
        </el-splitter-panel>
      </el-splitter>
    </div>

    <!-- 医生信息列表 -->
    <div class="doctor-list">
      <div class="doctor-item" v-for="doctor in doctors" :key="doctor.id">

        <!-- 左侧头像 -->
        <el-image class="doctor-avatar">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>

        <!-- 医生信息 -->
        <div class="doctor-info">
          <div class="doctor-name">
            <span class="name">{{ doctor.name }}</span>
            <el-tag type="success" size="small">普通门诊</el-tag>
          </div>

          <div class="doctor-oc-title">
            {{ doctor.title }}
          </div>
        </div>

        <!-- 号源 -->
        <div class="doctor-remain">
          余 {{ doctor.remain }} 号
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
  font-size: 50px;
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
</style>