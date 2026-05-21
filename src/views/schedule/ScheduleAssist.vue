<script setup>
import {ref, onMounted, computed, nextTick} from "vue"
import axios from "axios"
import * as echarts from "echarts"
import {getDepartments} from "@/api/registration.js";
import {predict} from "@/api/schedule.js";
import {ElMessage} from "element-plus";

const loading = ref(false)
// 科室列表
const departmentList = ref([])
// 推荐排班
const scheduleList = ref([])
// 模型
const model = ref({})
// 数据分析
const analysis = ref({})

const chartData = ref({})

// 查询参数
const query = ref({
  departmentId:null,
  days:7
})

const loadDepartment = async () => {
  const res = await getDepartments()
  departmentList.value = res.data
}

const hasData = computed(() => {
  return (
      chartData.value &&
      chartData.value.dates &&
      chartData.value.dates.length > 0
  )
})
// =========================
// 预测（模拟ARIMA数据）
// =========================
const handlePredict = async () => {
  loading.value = true

  if (query.value.days <= 0) {
    ElMessage.error('预测天数不合法')
    loading.value = false
    return
  }
  if (query.value.departmentId == null) {
    ElMessage.error('科室选择不能为空')
    loading.value = false
    return
  }

  const res = await predict(query.value)
  const data = res.data

  // ===== 图表数据 =====
  chartData.value = data

  // ===== 模型信息 =====
  model.value = data.model
  analysis.value = data.analysis

  // ===== 排班建议 =====
  scheduleList.value = data.suggestions.map(item => ({
    date: item.date,
    predictedCount: Number(item.predictedCount.toFixed(2)),
    level: item.level,
    recommendDoctors: item.recommendDoctors,
    suggestion: item.suggestion
  }))

  loading.value = false

  await nextTick()
  drawChart(data)
}

// =========================
// 画趋势图
// =========================
const chartRef = ref(null)
let chartInstance = null
const drawChart = (data) => {
  if (chartInstance) {
    chartInstance.dispose()   // ❗销毁旧实例
  }

  chartInstance = echarts.init(chartRef.value)

  chartInstance.setOption({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ["历史", "预测"]
    },
    xAxis: {
      type: "category",
      data: data.dates
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "历史",
        type: "line",
        data: data.history,
        smooth: true
      },
      {
        name: "预测",
        type: "line",
        data: data.forecast,
        smooth: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    ]
  })
}

// =========================
// 生成排班（模拟）
// =========================
const createSchedule = (row) => {
  console.log("生成排班：",row)
}

onMounted(()=>{
  loadDepartment()
})
</script>

<template>
  <div class="container">
    <!-- 查询区域 -->
    <el-card>
      <template #header>
        <span>智能排班辅助（ARIMA）</span>
      </template>

      <el-form :inline="true">
        <el-form-item label="科室">
          <el-cascader
              v-model="query.departmentId"
              :options="departmentList"
              :props="{
                  value: 'departmentId',
                  label: 'name',
                  children: 'children',
                  emitPath: false,
                  checkStrictly: true
              }"
              placeholder="选择科室"
              style="width: 200px"
              clearable
          />
        </el-form-item>
        <!-- 预测天数 -->
        <el-form-item label="预测天数">
          <el-input-number
              v-model="query.days"
              :min="1"
              :max="30"
          />
        </el-form-item>

        <el-form-item>
          <el-button
              type="primary"
              @click="handlePredict"
          >
            开始预测
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 趋势图 -->
    <div class="chart-wrapper">

      <!-- 左：趋势图 -->
      <div class="left">
        <el-card class="card-full">
          <template #header>
            <span>挂号趋势预测</span>
          </template>

          <el-skeleton v-if="loading" :rows="6" animated />
          <el-empty
              v-else-if="!hasData"
              description="暂无预测数据"
          />
          <div v-else ref="chartRef" class="chart"></div>
        </el-card>
      </div>

      <!-- 右：模型分析 -->
      <div class="right">
        <el-card class="card-full">
          <template #header>
            <span>模型分析</span>
          </template>

          <template v-if="model && Object.keys(model).length">
            <el-descriptions :column="1" border size="small">
              <el-descriptions-item label="模型">
                SARIMA({{ model.p }}, {{ model.d }}, {{ model.q }})(1, 1, 1)<sub>7</sub>
              </el-descriptions-item>

              <el-descriptions-item label="RMSE">
                {{ model.rmse?.toFixed(2) }}
              </el-descriptions-item>

              <el-descriptions-item label="AIC">
                {{ model.aic?.toFixed(2) }}
              </el-descriptions-item>

              <el-descriptions-item label="BIC">
                {{ model.bic?.toFixed(2) }}
              </el-descriptions-item>

              <el-descriptions-item label="平均值">
                {{ analysis.mean }}
              </el-descriptions-item>

              <el-descriptions-item label="最大值">
                {{ analysis.max }}
              </el-descriptions-item>

              <el-descriptions-item label="最小值">
                {{ analysis.min }}
              </el-descriptions-item>

              <el-descriptions-item label="趋势">
                <el-tag :type="analysis.trend === 'stable' ? 'success' : 'warning'">
                  {{ analysis.trend }}
                </el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="平稳性">
                <el-tag :type="analysis.is_stationary ? 'success' : 'danger'">
                  {{ analysis.is_stationary ? '平稳' : '非平稳' }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </template>

          <el-empty v-else description="请先进行预测" />

        </el-card>
      </div>
    </div>

    <!-- 推荐排班表 -->

    <el-card style="margin-top:20px">

      <template #header>
        <span>推荐排班</span>
      </template>

      <el-table :data="scheduleList" border style="width:100%" v-loading="loading">

        <el-table-column prop="date" label="日期" />

        <el-table-column prop="predictedCount" label="预测人数" />

        <el-table-column label="压力等级">
          <template #default="scope">
            <el-tag
                :type="scope.row.level === '高' ? 'danger'
              : scope.row.level === '中' ? 'warning'
              : 'success'"
            >
              {{ scope.row.level }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="recommendDoctors" label="建议医生数" />

        <el-table-column prop="suggestion" label="建议" />

      </el-table>

    </el-card>


  </div>
</template>

<style scoped>
.container{
  padding:20px;
}

.chart-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

/* 左右比例（等价 16:8） */
.left {
  flex: 2;
  display: flex;
}

.right {
  flex: 1;
  display: flex;
}

/* 卡片撑满 */
.card-full {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 卡片内容撑满 */
.card-full :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 图表高度控制 */
.chart {
  height: 400px;
}

/* empty 居中 */
.el-empty {
  margin: auto;
}
</style>