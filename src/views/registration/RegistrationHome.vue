<script setup>
import {onMounted, ref} from "vue";
import DataCard from "@/components/registration/DataCard.vue";
import {getPatientHomeOverview} from "@/api/user.js";

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const summaryList = ref([])
const recentAppointments = ref([]);
const hospitalIntro = ref({});

const loadAppointmentSummary = async () => {
  const res = await getPatientHomeOverview();
  const data = res.data || {};

  const nextAppointment = data.nextAppointment;
  const latestRecord = data.latestMedicalRecord;

  summaryList.value = [
    {
      title: "待就诊预约",
      value: nextAppointment
          ? `${nextAppointment.departmentName} / ${nextAppointment.doctorName}`
          : "暂无待就诊预约",
      time: nextAppointment
          ? `${nextAppointment.visitDate} ${nextAppointment.period} ${nextAppointment.displayNo}`
          : "可前往预约挂号",
      status: nextAppointment ? "warning" : "info"
    },
    {
      title: "累计就诊次数",
      value: `${data.totalVisitCount || 0} 次`,
      time: latestRecord
          ? `最近就诊：${latestRecord.visitDate}`
          : "暂无就诊记录"
    },
    {
      title: "病历记录",
      value: `${data.medicalRecordCount || 0} 份`,
      time: latestRecord
          ? `最近诊断：${latestRecord.diagnosis}`
          : "暂无病历记录",
      status: "good"
    },
    {
      title: "就诊人",
      value: `已添加 ${data.patientCount || 0} 人`,
      time: data.defaultPatient
          ? `默认：${data.defaultPatient.realName}`
          : "请先添加就诊人"
    }
  ];

  recentAppointments.value = data.recentAppointments || [];
  hospitalIntro.value = data.hospitalIntro || {};
}

onMounted(() => {
  loadAppointmentSummary()

})
</script>

<template>
  <h2 class="page-title">首页</h2>
  <div class="data-overview">
    <!-- 数据卡片区 -->
    <div class="data-cards">
<!--      &lt;!&ndash; 卡片1 &ndash;&gt;-->
<!--      <div class="data-card">-->
<!--        <div class="card-title">-->
<!--          <label class="card-label">最近一次就诊</label>-->
<!--          <el-avatar :size="28" :src="circleUrl"/>-->
<!--        </div>-->

<!--        <label class="card-value">XXX科室XX号XXX医生</label>-->
<!--        <label class="card-time">2024-XX-XX</label>-->
<!--      </div>-->

      <data-card
       v-for="(item, index) in summaryList"
        :key="index"
        v-bind="item"
      ></data-card>
    </div>

    <!-- 数据统计展示区 -->
    <div class="diagram-area">
      <div class="diagram-card">
        <div class="section-title">近期挂号记录</div>

        <el-empty
            v-if="recentAppointments.length === 0"
            description="暂无挂号记录"
        />

        <div
            v-for="item in recentAppointments"
            :key="item.appointmentId"
            class="appointment-item"
        >
          <div class="appointment-main">
            <span>{{ item.departmentName }}</span>
            <span>{{ item.doctorName }}</span>
          </div>

          <div class="appointment-sub">
            {{ item.patientName }} ｜ {{ item.visitDate }} {{ item.period }} ｜ {{ item.displayNo }}
          </div>
        </div>
      </div>

      <div class="diagram-card">
        <div class="section-title">
          {{ hospitalIntro.title || "医院服务介绍" }}
        </div>

        <p class="hospital-desc">
          {{ hospitalIntro.description || "本系统支持线上预约挂号、就诊人管理、挂号记录查询和病历信息查看，方便患者快速完成就医流程。" }}
        </p>

        <div class="quick-actions">
          <el-button type="primary">预约挂号</el-button>
          <el-button>就诊人管理</el-button>
          <el-button>挂号记录</el-button>
          <el-button>病历信息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-overview {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 数据卡片区 */
.data-cards {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* 数据卡片样式 */
.data-card {
  width: 320px;
  height: 150px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 10px 20px;
  background-color: var(--card-bg-color);

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

/* 卡片标题区 */
.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card-label {
  font-size: 15px;
  opacity: 0.7;
}

/* 卡片数值 */
.card-value {
  font-size: 20px;
  font-weight: bold;
}

/* 卡片时间 */
.card-time {
  font-size: 14px;
  font-weight: bold;
}

/* 数据统计展示区 */
.diagram-area {
  display: flex;
  justify-content: space-between;

}
.diagram-card {
  width: 480px;
  height: 300px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 10px 20px;
}


.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.appointment-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.appointment-main {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: bold;
}

.appointment-sub {
  margin-top: 6px;
  font-size: 13px;
  color: #909399;
}

.hospital-desc {
  font-size: 14px;
  line-height: 1.8;
  color: #606266;
}

.quick-actions {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>