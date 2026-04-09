<script setup>
import {ref} from "vue";
import SelectDepartment from "@/views/registration/appoint-step/SelectDepartment.vue";
import SelectDoctor from "@/views/registration/appoint-step/SelectDoctor.vue";
import SelectPeriod from "@/views/registration/appoint-step/SelectPeriod.vue";
import {appoint} from "@/api/registration.js";
import {ElMessage} from "element-plus";
import AppointmentResult from "@/views/registration/appoint-step/AppointmentResult.vue";
import router from "@/router/index.js";

const active = ref(0);

const selectDepartment = ref({})
const selectSchedule = ref({})
const appointmentForm = ref({})

const next = () => {
  if (active.value++ > 2) {
    active.value = 3
  }
}
const prev = () => {
  if (active.value-- <= 0) {
    active.value = 0
  }
}

const handleFirstStep = (department) => {
  selectDepartment.value = department
  appointmentForm.value.departmentId = selectDepartment.value.departmentId
  next()
}

const handleSecondStep = (schedule) => {
  selectSchedule.value = schedule
  appointmentForm.value.scheduleId = selectSchedule.value.scheduleId
  next()
}
const handleAppointment = async (form) => {
  appointmentForm.value.slotId = form.slotId
  appointmentForm.value.patientId = form.patientId
  appointmentForm.value.contactPhone = form.contactPhone
  appointmentForm.value.payeeCode = form.payeeCode
  const res = await appoint(appointmentForm.value)
  console.log(res)
  if (res.data > 0) {
    ElMessage.success("预约成功")
    next()
    setTimeout(() => {
      router.push({ path: "/user-registration" })
    }, 3000)
  } else {
    ElMessage.error("预约失败")
  }
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
    <SelectDepartment v-if="active === 0" @select-department="handleFirstStep"></SelectDepartment>

    <SelectDoctor v-else-if="active === 1"  :department="selectDepartment" @back="active = 0" @select-doctor="handleSecondStep"></SelectDoctor>

    <SelectPeriod v-else-if="active === 2" :schedule="selectSchedule" @back="active = 1" @appointment="handleAppointment"></SelectPeriod>

    <AppointmentResult v-if="active === 3"></AppointmentResult>
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