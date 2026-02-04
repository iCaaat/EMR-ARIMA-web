<script setup>
import { ref } from 'vue'

const emit = defineEmits(['back', 'next'])

// 默认选择患者
const role = ref('patient')
</script>

<template>
  <div class="register-card">
    <h2 class="card-title">注册身份</h2>

    <div class="register-form">
      <div class="role-row">
        <span class="role-text">以</span>
        <el-select
            v-model="role"
            class="role-select"
        >
          <el-option label="患者" value="patient" />
          <el-option label="医生" value="doctor" />
        </el-select>
        <span class="role-text">身份注册</span>
      </div>

      <!-- 按钮区 -->
      <div class="action-row">
        <el-button @click="emit('back')" class="btn-prev btn">
          返回
        </el-button>

        <el-button type="primary" @click="emit('next', role)" class="btn-next btn">
          下一步
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-card {
  /* layout */
  width: 424px;
  height: 350px;
  flex-shrink: 0;
  position: relative;
  top: 120px;

  /* Flexbox layout */
  display: flex; /* 设置为 flex 容器 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中 */

  /* style */
  border-radius: 32px;
  background: var(--card-bg-color);
  box-shadow: 1px 2px 12.3px rgba(0, 0, 0, 0.25);
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.card-title {
  /* layout */
  width: 191px;
  height: 72px;
  flex-shrink: 0;

  /* style */
  color: var(--text-primary-deep-color);
  text-align: center;
  font-family: "Source Han Sans CN (Pseudo-SC)", "Source Han Sans CN", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 15%;
}

/* “以 [选择框] 身份注册”这一行 */
.role-row {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.role-text {
  white-space: nowrap;
}

.role-select {
  width: 100px;
  margin: 0 8px;
}

/* 按钮区 */
.action-row {
  padding: 32px 60px;
  display: flex;
  justify-content: space-between;
}

.btn {
  letter-spacing: 3.6px;
}

.btn-prev {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.btn-next {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 看起来有立体阴影 */
  border-radius: 8px;

  --el-button-hover-bg-color: var(--primary-hover-color);
  --el-button-hover-border-color: var(--primary-hover-color);
  --el-button-bg-color: var(--primary-color);
  --el-button-border-color: var(--primary-color);
}
</style>