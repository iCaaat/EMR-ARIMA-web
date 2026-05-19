<script setup>

import {computed, onMounted, ref} from "vue";
import {getScheduleByToken} from "@/api/schedule.js";
import {ElMessage} from "element-plus";
import {getDepartments} from "@/api/registration.js";

// 当前日历月份
const currentDate = ref(new Date())

// 排班数据
const scheduleList = ref([])

// 按日期分组后的排班Map
const scheduleMap = ref({})

const departmentMap = ref({});
// 把树形科室拍平成 Map
const flattenDepartments = (departments, parentPath = "") => {
  const map = {};

  departments.forEach(item => {
    const fullPath = parentPath
        ? `${parentPath} / ${item.name}`
        : item.name;

    map[item.departmentId] = {
      ...item,
      fullPath
    };

    if (item.children && item.children.length > 0) {
      Object.assign(map, flattenDepartments(item.children, fullPath));
    }
  });

  return map;
};
// 根据科室ID获取科室名称
const getDepartmentName = (departmentId) => {
  return departmentMap.value[departmentId]?.fullPath || "未知科室";
};

// 卡片头展示的科室信息
const departmentText = computed(() => {
  const ids = [
    ...new Set(
        scheduleList.value
            .map(item => item.departmentId)
            .filter(Boolean)
    )
  ];

  if (ids.length === 0) {
    return "暂无科室";
  }

  return ids
      .map(id => getDepartmentName(id))
      .join("、");
});

const loadSchedule = async () => {
  try {
    const res = await getScheduleByToken()

    scheduleList.value = res.data || []

    // 转换为 Map，方便日历按日期读取
    const map = {}

    scheduleList.value.forEach(item => {
      map[item.workDate] = item
    })

    scheduleMap.value = map

  } catch (e) {
    ElMessage.error('排班加载失败')
  }
}

// 获取某天排班
const getSchedule = (date) => {
  return scheduleMap.value[date]
}

// 状态文字
const getStatusText = (status) => {
  switch (status) {
    case 0:
      return '正常'
    case 1:
      return '停诊'
    default:
      return '未知'
  }
}

// 状态Tag类型
const getStatusType = (status) => {
  switch (status) {
    case 0:
      return 'success'
    case 1:
      return 'danger'
    default:
      return 'info'
  }
}

const loadDepartment = async () => {
  const res = await getDepartments()
  departmentMap.value = flattenDepartments(res.data || []);
}

onMounted(() => {
  loadSchedule()
  loadDepartment()
})
</script>

<template>
  <h2 class="page-title">我的排班</h2>
  <div class="schedule-page">

    <el-card shadow="never" class="calendar-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">排班日历</span>
          <span class="department-info">
        科室：{{ departmentText }}
      </span>
        </div>
      </template>
      <el-calendar v-model="currentDate">

        <template #date-cell="{ data }">
          <div class="calendar-cell">

            <!-- 日期 -->
            <div class="date-text">
              {{ data.day.split('-').slice(2).join('') }}
            </div>

            <!-- 排班内容 -->
            <template v-if="getSchedule(data.day)">
              <div class="schedule-content">

                <el-tag
                    size="small"
                    :type="getStatusType(getSchedule(data.day).status)"
                >
                  {{ getStatusText(getSchedule(data.day).status) }}
                </el-tag>

                <div class="time-block am">
                  上午：
                  {{ getSchedule(data.day).amStartTime.substring(0,5) }}
                  -
                  {{ getSchedule(data.day).amEndTime.substring(0,5) }}
                </div>

                <div class="time-block pm">
                  下午：
                  {{ getSchedule(data.day).pmStartTime.substring(0,5) }}
                  -
                  {{ getSchedule(data.day).pmEndTime.substring(0,5) }}
                </div>

                <div class="extra-info">
                  号源：{{ getSchedule(data.day).maxNumber }}
                </div>

              </div>
            </template>

          </div>
        </template>

      </el-calendar>
    </el-card>
  </div>
</template>

<style scoped>
.schedule-page {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.calendar-card {
  border-radius: 12px;
}

.calendar-cell {
  height: 100%;
  padding: 4px;
  box-sizing: border-box;
}

.date-text {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.schedule-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-block {
  font-size: 12px;
  line-height: 18px;
  color: #606266;
}

.am {
  color: #409EFF;
}

.pm {
  color: #67C23A;
}

.extra-info {
  font-size: 12px;
  color: #909399;
}

/* 整个日期格子高度 */
:deep(.el-calendar-table .el-calendar-day) {
  height: 140px;
  padding: 8px;
}

/* 让内容顶部对齐 */
.calendar-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 时间块间距 */
.schedule-content {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
}

.department-info {
  font-size: 14px;
  color: #606266;
}
</style>