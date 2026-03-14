<script setup>
import {onMounted, ref} from "vue";
import {AVATAR_BASE_URL} from "@/config/index.js";
import {loadPeriod, loadSelectSchedule} from "@/api/registration.js";

import doctorAvatar from "@/assets/icons/medical/doctor.svg"

const props = defineProps({
  schedule: Object
})
const emit = defineEmits(['back']);

const selectSchedule = ref({})
const periodList = ref([])
const selectPeriod = ref('')
const appointForm = ref({})

const handleClick = async () => {
  console.log(selectSchedule)
}
const handleSelectPeriod = () => {
  console.log(selectSchedule)
}

onMounted(async () => {
  const scheduleId = props.schedule.scheduleId
  const res = await loadSelectSchedule(scheduleId)
  selectSchedule.value = res.data

  const periodRes = await loadPeriod(scheduleId)
  const rawPeriod = periodRes.data
  rawPeriod.forEach(item => {
    const p = {
      label: item.period + ' / 余' + item.remainNumber + '号',
      value: item.slotId
    }
    periodList.value.push(p)
  })
})
</script>

<template>
  <div class="container">
    <el-card style="width: 80%;border: 0; border-radius: 10px;">
      <template #header>
        <div class="card-header">
          <el-image class="doctor-avatar" :src="AVATAR_BASE_URL + selectSchedule.avatar">
            <template #error>
              <div class="image-slot">
                <el-image :src="doctorAvatar" alt="医生"></el-image>
              </div>
            </template>
          </el-image>

          <div class="header-right">
            <div class="doctor-name">
              <h2>{{ selectSchedule.realName }}</h2>
              <p>{{ selectSchedule.doctorTitle }}</p>
            </div>

            <div class="doctor-right">
              <p>操作</p>
              <el-button type="info" @click="emit('back')">重选医生</el-button>
            </div>
          </div>

        </div>
      </template>
      <div class="schedule-info">
        <el-descriptions border column="1" label-width="15%">
          <el-descriptions-item label-align="center" align="center" label="就诊科室">{{ selectSchedule.departmentName }}</el-descriptions-item>
          <el-descriptions-item label-align="center" align="center" label="就诊时间" class-name="schedule-date">{{ selectSchedule.appointmentDate }}</el-descriptions-item>
          <el-descriptions-item label-align="center" align="center" label="挂号费用" class-name="schedule-fee">￥{{ selectSchedule.fee }}</el-descriptions-item>
          <el-descriptions-item label-align="center" label="医生擅长">{{ selectSchedule.specialty }}</el-descriptions-item>
          <el-descriptions-item label-align="center" label="医生简介">{{ selectSchedule.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        *根据物价规定，7岁以下儿童挂号费加收30%
      </template>
    </el-card>

    <div class="appointment-form-container">
      <el-form class="appointment-form" label-position="right" label-width="100px">
        <el-form-item label="时段">
          <el-select v-model="selectPeriod" placeholder="请选择" @change="handleSelectPeriod">
            <el-option
                v-for="period in periodList"
                :key="period.value"
                :label="period.label"
                :value="period.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="序号">
          <el-select placeholder="请选择就诊时段">

          </el-select>
        </el-form-item>
        <el-form-item label="就诊人">
          <el-select placeholder="请选择就诊人">

          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input placeholder="填写接收预约短信的号码"></el-input>
          <span class="contact-warning">预约短信回发送到此号码，请认真填写</span>
        </el-form-item>
        <el-form-item label="收费人员工号">
          <el-input placeholder="请输入收费人员工号（选填）"></el-input>
        </el-form-item>
      </el-form>

      <el-divider direction="vertical" style="height: auto"></el-divider>

      <div class="form-right">
        <p>操作</p>
        <el-button type="info" @click="handleClick" >重置填写</el-button>
        <el-button type="primary" @click="handleClick" >确认预约</el-button>
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

/* 卡片头 */
.card-header {
  display: flex;
}

.header-right {
  margin-left: 5%;

  flex: 1;
  display: flex;
  justify-content: space-between;
}

.doctor-avatar {
  width: 100px;
  max-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-slot {
  font-size: 30px;
}

.header-right {
  display: flex;
  justify-content: space-between;
}

.doctor-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-right: 5%;
}

.operation-button {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

/* 卡片内容 */
:deep(.schedule-date) {
  --el-text-color-primary: var(--primary-color);
}
:deep(.schedule-fee) {
  --el-text-color-primary: var(--status-danger-color);
}

/* 表单区 */
.appointment-form-container {
  width: 80%;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--card-bg-color);

  display: flex;
  gap: 5px;
}
.appointment-form {
  width: 75%;
  padding: 20px;
}
.form-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
:deep(.el-button + .el-button) {
  margin-left: 0;
}

.contact-warning {
  font-size: 12px;
  color: var(--status-danger-color);
}

</style>