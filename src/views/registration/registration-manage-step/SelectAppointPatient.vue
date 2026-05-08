<script setup>
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {listAppointments, updateAppointmentStatus} from "@/api/registration.js";

const emit = defineEmits(['select'])

// 查询条件
const filter = ref({
  patientName: '',
  contactPhone: '',
  visitDate: '',
  status: ''
})

// 分页
const pageQuery = ref({
  pageNum: 1,
  pageSize: 10
})

// 表格数据
const tableData = ref([])

// 总数
const total = ref(0)

// loading
const loading = ref(false)

// 加载数据
const loadAppointmentList = async () => {
  loading.value = true

  try {
    const params = {
      ...filter.value,
      ...pageQuery.value
    }

    const res = await listAppointments(params)

    tableData.value = res.data.records || []
    total.value = res.data.total || 0

  } catch (e) {
    ElMessage.error('加载预约列表失败')
  } finally {
    loading.value = false
  }
}

// 查询
const handleSearch = () => {
  pageQuery.value.pageNum = 1
  loadAppointmentList()
}

// 重置
const handleReset = () => {
  filter.value = {
    patientName: '',
    contactPhone: '',
    visitDate: '',
    status: ''
  }

  handleSearch()
}

// 状态Tag
const getStatusType = (status) => {
  switch (status) {
    case 0:
      return 'warning' // 未就诊
    case 1:
      return 'primary' // 就诊中
    case 2:
      return 'success' // 已完成
    case 3:
      return 'info' // 已取消
    default:
      return 'info'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return '未就诊'
    case 1:
      return '就诊中'
    case 2:
      return '已完成'
    case 3:
      return '已取消'
    default:
      return '未知'
  }
}

// 上午下午
const getPeriodText = (period) => {
  return period === 'am' ? '上午' : '下午'
}

// 选择患者
const handleSelect = async (row) => {
  // 未就诊 -> 开始就诊
  if (row.status === 0) {

    await ElMessageBox.confirm(
        `确认开始接诊患者【${row.patientName}】吗？`,
        '开始就诊',
        {
          type: 'warning'
        }
    )

    // 修改状态为 就诊中
    await updateAppointmentStatus(
        row.appointmentId,
        1
    )

    ElMessage.success('已开始接诊')

    // 更新本地状态
    row.status = 1
  }

  // 进入下一步
  emit('select', row)
}

onMounted(() => {
  loadAppointmentList()
})
</script>

<template>
  <el-card shadow="never" class="query-card">

    <!-- 查询 -->
    <el-form :inline="true" :model="filter">

      <el-form-item label="患者姓名">
        <el-input
            v-model="filter.patientName"
            placeholder="请输入患者姓名"
            clearable
        />
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input
            v-model="filter.contactPhone"
            placeholder="请输入联系电话"
            clearable
        />
      </el-form-item>

      <el-form-item label="就诊日期">
        <el-date-picker
            v-model="filter.visitDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="状态">
        <el-select
            v-model="filter.status"
            placeholder="请选择状态"
            clearable
            style="width: 140px"
        >
          <el-option label="待就诊" :value="0" />
          <el-option label="就诊中" :value="1" />
          <el-option label="已完成" :value="2" />
          <el-option label="已取消" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch">
          查询
        </el-button>

        <el-button @click="handleReset">
          重置
        </el-button>
      </el-form-item>

    </el-form>

  </el-card>

  <!-- 表格 -->
  <el-card shadow="never" class="table-card">

    <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
    >

      <el-table-column prop="patientName" label="患者姓名" width="120" />

      <el-table-column prop="contactPhone" label="联系电话" width="150" />

      <el-table-column prop="departmentName" label="科室" />

      <el-table-column prop="visitDate" label="就诊日期" width="140" />

      <el-table-column label="时段" width="100">
        <template #default="{ row }">
          {{ getPeriodText(row.period) }}
        </template>
      </el-table-column>

      <el-table-column prop="displayNo" label="排队号" width="130" />

      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">

          <!-- 未就诊 -->
          <el-button
              v-if="row.status === 0"
              type="primary"
              size="small"
              @click="handleSelect(row)"
          >
            开始就诊
          </el-button>

          <!-- 就诊中 -->
          <el-button
              v-else-if="row.status === 1"
              type="warning"
              size="small"
              @click="handleSelect(row)"
          >
            继续就诊
          </el-button>

          <!-- 已完成 -->
          <el-button
              v-else-if="row.status === 2"
              type="success"
              size="small"
              disabled
          >
            已完成
          </el-button>

          <!-- 已取消 -->
          <el-button
              v-else
              type="info"
              size="small"
              disabled
          >
            已取消
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">

      <el-pagination
          v-model:current-page="pageQuery.pageNum"
          v-model:page-size="pageQuery.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next"
          @current-change="loadAppointmentList"
          @size-change="loadAppointmentList"
      />

    </div>

  </el-card>
</template>

<style scoped>
.query-card,
.table-card {
  border-radius: 12px;
  margin-bottom: 20px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>