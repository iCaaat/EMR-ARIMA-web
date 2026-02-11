<script setup>
import {ref} from "vue";
import DataCard from "@/components/registration/DataCard.vue";

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const summaryList = [
  {
    title: '最近一次就诊',
    value: 'XXX科室XX号XXX医生',
    time: '2024-XX-XX',
    avatar: circleUrl.value
  },
  {
    title: '累计就诊次数',
    value: '12次',
    time: '2024-XX-XX',
  },
  {
    title: '最近体检',
    value: '血常规正常',
    time: '2024-XX-XX',
    status: 'good'
  },
  {
    title: '账户余额',
    value: '￥100.00',
    time: '2024-XX-XX',
    icon: 'WalletFilled'
  }
]
</script>

<template>
  <h2 class="page-title">数据概览</h2>
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

      </div>
      <div class="diagram-card">

      </div>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  margin: 0 0 20px;
}

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
.diagram-card {
  width: 480px;
  height: 300px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 10px 20px;
}
</style>