<script setup>
// TODO: 提交注册信息，进行前端验证
import { ref, reactive } from 'vue';

import lineIcon from "@/assets/icons/login_and_register/line.svg";
import passwordIcon from "@/assets/icons/login_and_register/user_passwd_icon.svg";
import userIcon from "@/assets/icons/login_and_register/user_icon.svg";

const emit = defineEmits(['back', 'next']);
const registerForm = reactive({
  userName: '',
  userPasswd: '',
  confirmPasswd: ''
})

function submitRegister() {
  const { userName, userPasswd, confirmPasswd } = registerForm;

  if (!userName || !userPasswd || !confirmPasswd) {
    alert("请填写所有字段。");
    return;
  }
  if (userName.length < 2 || userName.length > 20) {
    alert("用户名长度必须在3到20个字符之间。");
    return;
  }
  if (userPasswd.length < 6 || userPasswd.length > 20) {
    alert("密码长度必须在6到20个字符之间。");
    return;
  }
  if (confirmPasswd !== userPasswd) {
    alert("两次输入的密码不一致，请重新输入。");
  }
}
</script>

<template>
  <div class="register-card">
    <h2 class="card-title">1.基本信息</h2>
    <div class="register-form">
      <div class="input-group">
        <img :src="userIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.userName" type="text" class="register-input" placeholder="用户名(2-20字符,英文/数字/下划线)">
      </div>
      <div class="input-group form2">
        <img :src="passwordIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.userPasswd" type="text" class="register-input" placeholder="密码(6-20字符)">
      </div>
      <div class="input-group form2">
        <img :src="passwordIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.confirmPasswd" type="text" class="register-input" placeholder="确认密码">
      </div>
      <!-- 按钮区 -->
      <div class="action-row">
        <el-button @click="emit('back')" class="btn-prev btn">
          上一步
        </el-button>

        <el-button type="primary" @click="emit('next', registerForm)" class="btn-next btn">
          下一步
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 顶层卡片 */
.register-card {
  /* layout */
  width: 424px;
  height: 531px;
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

/* 卡片标题 */
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

/* 表单区 */
.register-form {
  /* flex */
  display: flex;  /* 使用 flex 排列元素 */
  align-items: center;      /* 垂直居中 */
  flex-direction: column;
  gap: 20px;
}

/* 表单区-输入组 */
.input-group {
  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
  gap: 13px;

  background-color: var(--bg-color);
  border-radius: 8px; /* 可选：让背景圆角 */
}

.input-icon {
  width: 20px;
  margin-left: 13px;
  flex-shrink: 0;
  padding: 0;
}

.input-line {
  width: 1px;
  height: 23px;
}

.register-input {
  border: none;
  outline: none;
  background-color: var(--bg-color);  /* 设置输入框背景颜色 */
  font-family: inherit;  /* 继承父组件字体 */
  height: 35px;

  min-width: 0;
  width: 212px;

  flex: 1;

  flex-direction: column;
  justify-content: center;

  margin-left: 10px;
}

input:focus {
  border: 1px;
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
