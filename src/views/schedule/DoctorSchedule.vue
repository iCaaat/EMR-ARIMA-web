<script setup>
import {onMounted, ref} from "vue"
import {getDepartments} from "@/api/registration.js";

import ScheduleDialog from "@/views/schedule/schedule-dialog/ScheduleDialog.vue";
import {getSchedules} from "@/api/schedule.js";

const loading = ref(false)
const dialogVisible = ref(false)

const departmentOptions = ref([])
const cascaderProps = {
  value: "departmentId",
  label: "name",
  children: "children",
  emitPath: false,
  checkStrictly: false
}
// 模拟数据
const scheduleList = ref([])

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
          >
            编辑
          </el-button>

          <el-button
              size="small"
              type="danger"
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