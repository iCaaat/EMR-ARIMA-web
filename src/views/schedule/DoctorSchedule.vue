<script setup>
import {onMounted, ref} from "vue"
import {getDepartments} from "@/api/registration.js";

import ScheduleDialog from "@/views/schedule/schedule-dialog/ScheduleDialog.vue";
import {deleteSchedule, getSchedules, updateSchedule} from "@/api/schedule.js";
import {ElMessage, ElMessageBox} from "element-plus";

const loading = ref(false)
const dialogVisible = ref(false)
const editVisible = ref(false)

const departmentOptions = ref([])
const cascaderProps = {
  value: "departmentId",
  label: "name",
  children: "children",
  emitPath: false,
  checkStrictly: false
}
const scheduleList = ref([])
const selectedDoctorSchedule = ref({})
const weekOptions = [
  { label: "周一", value: 1 },
  { label: "周二", value: 2 },
  { label: "周三", value: 3 },
  { label: "周四", value: 4 },
  { label: "周五", value: 5 },
  { label: "周六", value: 6 },
  { label: "周日", value: 7 }
]

// 查询条件
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const filter = ref({
  doctorName: "",
  departmentId: "",
  workDate: "",
  status: ""
})

const loadData = async () => {
  loading.value = true
  filter.value.pageNum = pageNum.value
  filter.value.pageSize = pageSize.value
  const res = await getSchedules(filter.value)
  scheduleList.value = res.data.records
  total.value = res.data.total
  pageSize.value = res.data.size
  pageNum.value = res.data.page
  loading.value = false
}

const getStatusText = (status) => {
  return status === 0 ? "出诊" : "停诊"
}

const loadDepartments = async () => {
  const res = await getDepartments()
  departmentOptions.value = res.data
}
const handleSizeChange = (val) => {
  pageSize.value = val
  filter.value.pageSize = val
  loadData()
}
const handleCurrentChange = (val) => {
  pageNum.value = val
  filter.value.pageNum = val
  loadData()
}

const handleAddScheduleDialog = () => {
  dialogVisible.value = true
}
const handleDeleteSchedule = (row) =>{
  ElMessageBox.confirm('确定要删除排班：' + row.doctorName + '-' + row.workDate + '吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await deleteSchedule(row.scheduleId)
    ElMessage.success('成功删除' + res.data.scheduleResult + '条排班，' + res.data.slotResult + '条号源')
    await loadData()
  })
}
const handleEditDialog = async (row) => {
  selectedDoctorSchedule.value = {...row}
  editVisible.value = true
}
const handleEditScheduleSubmit = async () => {
  console.log(selectedDoctorSchedule.value)
  ElMessageBox.confirm('提交修改排班：' + selectedDoctorSchedule.value.doctorName + '-' + selectedDoctorSchedule.value.workDate + '吗？', '提示' , {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await updateSchedule(selectedDoctorSchedule.value)
    const msg = '成功更新' + res.data.scheduleResult + '条排班，删除' + res.data.slotDelete + '条号源，新增' + res.data.slotResult + '条号源'
    ElMessage.success(msg)
    await loadData()
    editVisible.value = false
  })
}
onMounted(() => {
  loadDepartments()
  loadData()
})
</script>

<template>
  <h2 class="page-title">医生排班</h2>

  <!-- 查询区域 -->
  <div class="filter-container">
    <el-input
        v-model="filter.doctorName"
        placeholder="医生姓名"
        clearable
        style="max-width: 250px"
    />
    <el-cascader
        v-model="filter.departmentId"
        :options="departmentOptions"
        :props="cascaderProps"
        placeholder="请选择科室"
        clearable
    />
    <el-date-picker
        v-model="filter.workDate"
        type="date"
        placeholder="选择日期"
        value-format="YYYY-MM-DD"
        clearable
    />
    <el-select v-model="filter.status" clearable placeholder="状态" style="max-width: 120px">
      <el-option label="出诊" value="0" />
      <el-option label="停诊" value="1" />
    </el-select>
    <el-button type="primary" @click="loadData">
      查询
    </el-button>
    <el-button type="success" @click="handleAddScheduleDialog">新增排班</el-button>
  </div>

  <!-- 表格 -->
  <el-card shadow="false">
    <el-table
        :data="scheduleList"
        border
        style="width: 100%"
        v-loading="loading"
    >
      <el-table-column type="index" />
      <el-table-column
          prop="doctorName"
          label="医生"
          width="120"
      />

      <el-table-column
          prop="departmentName"
          label="科室"
          width="120"
      />

      <el-table-column
          prop="workDate"
          label="日期"
          width="140"
      />

      <el-table-column label="上午时间">
        <template #default="scope">
          {{ scope.row.amStartTime }} - {{ scope.row.amEndTime }}
        </template>
      </el-table-column>

      <el-table-column label="下午时间">
        <template #default="scope">
          {{ scope.row.pmStartTime }} - {{ scope.row.pmEndTime }}
        </template>
      </el-table-column>

      <el-table-column
          prop="intervalMinute"
          label="间隔(分钟)"
          width="120"
      />

      <el-table-column
          prop="maxNumber"
          label="最大号数"
          width="120"
      />

      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag
              :type="scope.row.status === 0 ? 'success' : 'info'"
          >
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          width="150"
          fixed="right"
      >
        <template #default="scope">
          <el-button
              size="small"
              type="primary"
              @click="handleEditDialog(scope.row)"
          >
            编辑
          </el-button>

          <el-button
              size="small"
              type="danger"
              @click="handleDeleteSchedule(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-card>

  <div class="page-content">
    <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 50]"
        :size="'default'"
        :background="false"
        layout="sizes, prev, pager, next, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>

  <ScheduleDialog @confirm="loadData" :width="800" v-model="dialogVisible"></ScheduleDialog>

  <el-dialog v-model="editVisible">
    <el-card shadow="never" >
      <template #header>
        <span>医生信息</span>
      </template>
      <el-descriptions>
        <el-descriptions-item label="医生姓名">{{ selectedDoctorSchedule.doctorName }}</el-descriptions-item>
        <el-descriptions-item label="科室">{{ selectedDoctorSchedule.departmentName }}</el-descriptions-item>
        <el-descriptions-item label="排班时间">{{ selectedDoctorSchedule.workDate }}</el-descriptions-item>
      </el-descriptions>

    </el-card>
    <el-card shadow="never" class="mb20">
      <template #header>
        <span>排班修改</span>
      </template>

      <el-form label-width="120px">
        <el-form-item label="上午工作时间">
          <el-time-picker v-model="selectedDoctorSchedule.amStartTime" value-format="HH:mm:ss" placeholder="上午开始时间" /> -
          <el-time-picker v-model="selectedDoctorSchedule.amEndTime" value-format="HH:mm:ss" placeholder="上午结束时间" />
        </el-form-item>
        <el-form-item label="上午工作时间">
          <el-time-picker v-model="selectedDoctorSchedule.pmStartTime" value-format="HH:mm:ss" placeholder="下午开始时间" /> -
          <el-time-picker v-model="selectedDoctorSchedule.pmEndTime" value-format="HH:mm:ss" placeholder="下午结束时间" />
        </el-form-item>
        <el-form-item label="看诊间隔">
          <el-input-number :min="1" :max="40" v-model="selectedDoctorSchedule.intervalMinute" placeholder="请输入看诊间隔，单位分钟" />（分钟）
        </el-form-item>
        <el-form-item label="出诊状态">
          <el-radio-group v-model="selectedDoctorSchedule.status">
            <el-radio :value="0">出诊</el-radio>
            <el-radio :value="1" style="color: var(--status-danger-color)">停诊</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditScheduleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.page-content {
  display: flex;
  justify-content: flex-end;
}
</style>