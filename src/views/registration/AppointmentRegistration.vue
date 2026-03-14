<script setup>
import {ref} from "vue";
import SelectDepartment from "@/views/registration/appoint-step/SelectDepartment.vue";
import SelectDoctor from "@/views/registration/appoint-step/SelectDoctor.vue";
import SelectPeriod from "@/views/registration/appoint-step/SelectPeriod.vue";

const active = ref(0);

const selectDepartment = ref({});
const selectSchedule = ref({})

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
  selectDepartment.value = department;
  next()
}

const handleSecondStep = (schedule) => {
  selectSchedule.value = schedule;
  next()
}
const handleAppointment = (appointment) => {
  console.log(appointment);
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

    <SelectPeriod v-else :schedule="selectSchedule" @back="active = 1" @appointment="handleAppointment"></SelectPeriod>
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