<script setup>
import {onMounted, ref} from "vue";
import {getAppointments} from "@/api/registration.js";

const appointmentData = ref([])

const loading = ref(false)
const loadAppointments = async () =>{
  const res = await getAppointments()
  appointmentData.value = res.data
}
onMounted(async () => {
  loading.value = true
  await loadAppointments()
  loading.value = false
})
</script>

<template>
  <h2 class="page-title">我的挂号</h2>

  <el-table :data="appointmentData" style="width: 100%" v-loading="loading">
    <el-table-column prop="appointmentId" label="ID" width="50" />
    <el-table-column prop="patientName" label="就诊人"  />
    <el-table-column prop="doctorName" label="医生姓名" />
    <el-table-column prop="departmentName" label="科室"  />
    <el-table-column prop="visitDate" label="就诊日期"  />
    <el-table-column prop="displayPeriod" label="就诊时段" />
    <el-table-column prop="displayNo" label="序号" />
    <el-table-column prop="contactPhone" label="联系电话" />
    <el-table-column prop="fee" label="费用" />
    <el-table-column prop="payeeCode" label="收费人员代码" />
    <el-table-column prop="displayStatus" label="就诊状态" />
  </el-table>
</template>

<style scoped>

</style>