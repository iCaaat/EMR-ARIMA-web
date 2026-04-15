<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue"
import {getDepartments} from "@/api/registration.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {getDoctorsSimple} from "@/api/user.js";
import {addSchedule} from "@/api/schedule.js";

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: "新增排班"
  },
  loading: Boolean
})
const emit = defineEmits(["update:modelValue", "confirm"])
const visible = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val)
})
const handleClose = () => {
  visible.value = false
}

const handleConfirm = async () => {
  ElMessageBox.confirm('确认提交排班信息？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'}).then(async () => {

    // 提取医生ID列表
    scheduleForm.doctorIds = selectedDoctors.value.map(doctor => doctor.doctorId)
    scheduleForm.amStartTime = amStartTime.value
    scheduleForm.amEndTime = amEndTime.value
    scheduleForm.pmStartTime = pmStartTime.value
    scheduleForm.pmEndTime = pmEndTime.value

    const res = await addSchedule(scheduleForm)
    ElMessage.success("医生排班成功，共插入" + res.data + "条排班记录")
    emit("confirm")
    visible.value = false
  })
}


const loading = ref(false)
// 科室数据
const departmentOptions = ref([])

// 医生模拟数据
const doctorList = ref([])

// 选中医生
const selectedDoctors = ref([])

// 查询条件
const tableRef = ref()
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const queryForm = reactive({
  departmentId: "",
  doctorName: ""
})

// 科室级联选择配置
const cascaderProps = {
  value: "departmentId",
  label: "name",
  children: "children",
  emitPath: false,
  checkStrictly: true
}

// 排班时间
const amStartTime = ref("09:00:00")
const amEndTime = ref("12:00:00")
const pmStartTime = ref("14:00:00")
const pmEndTime = ref("18:00:00")

// 排班规则
const scheduleForm = reactive({
  ruleType: "single",
  singleDate: "",
  multiDates: [],
  weekdays: [],
  dateRange: [],
  startDate: "",
  endDate: "",
  intervalMinute: 4
})

// 星期选项
const weekOptions = [
  { label: "周一", value: 1 },
  { label: "周二", value: 2 },
  { label: "周三", value: 3 },
  { label: "周四", value: 4 },
  { label: "周五", value: 5 },
  { label: "周六", value: 6 },
  { label: "周日", value: 7 }
]

// 加载科室
const loadDepartments = async () => {
  const res = await getDepartments()
  departmentOptions.value = res.data
}

// 分页处理
const handleSizeChange = val => {
  pageSize.value = val
  queryForm.pageSize = pageSize.value
}
const handleCurrentChange = val => {
  pageNum.value = val
  queryForm.pageNum = pageNum.value
}

// 表格选择
const handleSelectionChange = val => {
  selectedDoctors.value = val
}
const removeDoctor = (doctor) => {
  selectedDoctors.value =
      selectedDoctors.value.filter(
          item => item.doctorId !== doctor.doctorId
      )
  tableRef.value?.toggleRowSelection(doctor, false)
}

// 提交排班
const submitSchedule = () => {
  if (selectedDoctors.value.length === 0) {
    ElMessage.warning("请选择医生")
    return
  }

  console.log("医生", selectedDoctors.value)
  console.log("排班规则", scheduleForm)

  ElMessage.success("模拟提交成功")
}
const loadDoctors = async () => {
  loading.value = true
  queryForm.pageNum = pageNum.value
  queryForm.pageSize = pageSize.value
  const res = await getDoctorsSimple(queryForm)
  doctorList.value = res.data.records
  total.value = res.data.total
  loading.value = false
}
watch(
    () => scheduleForm.dateRange,
    (val) => {
      if (val) {
        scheduleForm.startDate = val[0]
        scheduleForm.endDate = val[1]
      }
    }
)
onMounted(() => {
  loadDepartments()
  loadDoctors()
})
</script>

<template>
  <el-dialog
      v-model="visible"
      :title="title"
      v-bind="$attrs"
      @close="handleClose"
      v-loading="loading"
  >
    <!-- Step 1 选择医生 -->
    <el-card shadow="never" class="mb20">
      <template #header>
        <span>第一步：选择医生</span>
      </template>
      <!-- 已选医生池 -->
      <el-card
          v-if="selectedDoctors.length"
          shadow="never"
          class="mb15"
      >
        <template #header>
          <span>已选医生</span>
        </template>

        <el-tag
            v-for="item in selectedDoctors"
            :key="item.id"
            closable
            class="mr10 mb10"
            @close="removeDoctor(item)"
        >
          {{ item.doctorName }} - {{ item.departmentName }}
        </el-tag>

      </el-card>
      <div class="filter-container">
        <el-cascader
            v-model="queryForm.departmentId"
            :options="departmentOptions"
            :props="cascaderProps"
            placeholder="请选择科室"
            clearable
        />
        <el-input
            v-model="queryForm.doctorName"
            placeholder="输入医生姓名"
            clearable
            style="max-width: 200px"
        />
        <el-button type="primary" @click="loadDoctors">搜索</el-button>
      </div>

      <el-table
          ref="tableRef"
          :data="doctorList"
          @selection-change="handleSelectionChange"
          row-key="doctorId"
          :reserve-selection="true"
          border
          v-loading="loading"
      >
        <el-table-column
            type="selection"
            width="50"
        />
        <el-table-column
            prop="doctorId"
            label="医生ID"
            width="100"
        />
        <el-table-column
            prop="doctorName"
            label="医生姓名"
        />
        <el-table-column
            prop="departmentName"
            label="科室"
        />
        <el-table-column
            prop="doctorTitle"
            label="职称"
        />
      </el-table>

      <div class="page-content">
        <el-pagination
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[10, 15, 20]"
            :size="'default'"
            :background="false"
            layout="sizes, prev, pager, next, total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Step 2 排班规则 -->
    <el-card shadow="never" class="mb20">
      <template #header>
        <span>第二步：排班规则</span>
      </template>

      <el-form label-width="120px">
        <el-form-item label="排班类型">
          <el-radio-group v-model="scheduleForm.ruleType">
            <el-radio label="single">
              单选日期
            </el-radio>

            <el-radio label="multi">
              多选日期
            </el-radio>

            <el-radio label="week">
              多选星期
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 单选日期 -->
        <el-form-item
            label="排班日期"
            v-if="scheduleForm.ruleType === 'single'"
        >
          <el-date-picker
              v-model="scheduleForm.singleDate"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              type="date"
              placeholder="选择日期"
          />
        </el-form-item>

        <!-- 多选日期 -->
        <el-form-item
            label="多个日期"
            v-if="scheduleForm.ruleType === 'multi'"
        >
          <el-date-picker
              v-model="scheduleForm.multiDates"
              type="dates"
              placeholder="选择多个日期"
          />
        </el-form-item>

        <!-- 星期排班 -->
        <el-form-item
            label="星期选择"
            v-if="scheduleForm.ruleType === 'week'"
        >
          <el-checkbox-group
              v-model="scheduleForm.weekdays"
          >
            <el-checkbox
                v-for="item in weekOptions"
                :key="item.value"
                :label="item.value"
            >
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 日期范围 -->
        <el-form-item
            label="排班范围"
            v-if="scheduleForm.ruleType === 'week'"
        >
          <el-date-picker
              v-model="scheduleForm.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item label="上午工作时间">
          <el-time-picker v-model="amStartTime" value-format="HH:mm:ss" placeholder="上午开始时间" /> -
          <el-time-picker v-model="amEndTime" value-format="HH:mm:ss" placeholder="上午结束时间" />
        </el-form-item>
        <el-form-item label="上午工作时间">
          <el-time-picker v-model="pmStartTime" value-format="HH:mm:ss" placeholder="下午开始时间" /> -
          <el-time-picker v-model="pmEndTime" value-format="HH:mm:ss" placeholder="下午结束时间" />
        </el-form-item>
        <el-form-item label="看诊间隔">
          <el-input-number :min="1" :max="40" v-model="scheduleForm.intervalMinute" placeholder="请输入看诊间隔，单位分钟" />（分钟）
        </el-form-item>
      </el-form>
    </el-card>
    <!-- footer -->
    <template #footer>
      <slot name="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped>
.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>