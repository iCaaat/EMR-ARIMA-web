<script setup>
import {onMounted, ref} from "vue";
import {getAppointments, getDepartments} from "@/api/registration.js";

const departmentOptions = ref([])
const appointmentData = ref([])
const filter = ref({
  patientId: '',
  doctorName: '',
  contactPhone: '',
  visitDate: '',
  status: ''
})

const cascaderProps = {
  value: "departmentId",
  label: "name",
  children: "children",
  emitPath: false,
  checkStrictly: false
}
const loading = ref(false)

const handleSearch = async () => {
  loading.value = true
  await loadAppointments()
  loading.value = false
}
const resetFilter = () => {
  filter.value = {}
}
const loadAppointments = async () =>{
  const res = await getAppointments(filter.value)
  appointmentData.value = res.data
}

const loadDepartments = async () => {
  const res = await getDepartments()
  departmentOptions.value = res.data
}
onMounted(async () => {
  loading.value = true
  await loadAppointments()
  await loadDepartments()
  loading.value = false
})
</script>

<template>
  <h2 class="page-title">我的挂号</h2>

  <div class="filter-container">
    <el-cascader
        v-model="filter.departmentId"
        :options="departmentOptions"
        :props="cascaderProps"
        placeholder="请选择科室"
        clearable
        style="width: 100%"
    />
    <el-date-picker v-model="filter.visitDate" value-format="YYYY-MM-DD" placeholder="就诊日期" clearable style="width: 100%" />
    <el-input v-model="filter.doctorName" placeholder="医生姓名"></el-input>
    <el-input v-model="filter.contactPhone" placeholder="联系电话"></el-input>
    <el-select v-model="filter.status" clearable placeholder="就诊状态">
      <el-option label="未就诊" value="0" />
      <el-option label="就诊中" value="1" />
      <el-option label="已完成" value="2" />
      <el-option label="已取消" value="3" />
    </el-select>
    <el-button type="info" @click="resetFilter">重置</el-button>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>

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
.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>