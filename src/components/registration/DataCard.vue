<script setup>
defineProps({
  title: String,
  value: String,
  time: String,

  // 头像
  avatar: String,
  // 状态
  status: String,
  // 图标类名
  icon: String
})
</script>

<template>
  <div class="data-card">
    <div class="card-label">{{ title }}</div>
    <div class="card-value">{{ value }}</div>
    <div class="card-time">{{ time }}</div>

    <div class="card-right">
      <!-- 1.有头像 -->
      <el-avatar class="avatar" v-if="avatar" :size="40" :src="avatar"/>
      <!-- 2.有状态 -->
      <div class="status-box" v-else-if="status" :class="`status-${status}`" />
      <!-- 3.有图标 -->
      <el-icon v-else-if="icon" size="40"><component :is="icon" /></el-icon>
      <!-- 4.默认图标 -->
      <div class="placeholder-box" v-else />
    </div>

  </div>
</template>

<style scoped>
/* 数据卡片样式 */
.data-card {
  height: 150px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 10px 25px;
  background-color: var(--card-bg-color);

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  position: relative;
}

/* 卡片标签 */
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

/* 状态展示区 */
.card-right {
  position: absolute;
  top: 20px;
  right: 20px;
}

/* 状态框样式 */
.status-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.status-good {
  background-color: var(--status-good-color);
}
.status-warning {
  background-color: var(--status-warning-color);
}
.status-danger {
  background-color: var(--status-danger-color);
}

/* 占位图标样式 */
.placeholder-box {
  width: 40px;
  height: 40px;
  border-radius: 20%;
  background-color: var(--primary-color);
}
</style>