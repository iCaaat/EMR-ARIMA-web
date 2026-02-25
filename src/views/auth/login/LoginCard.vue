<script setup>
import { useRouter } from 'vue-router'
import { login } from '@/api/auth.js'
import { reactive } from "vue";

import userIcon from '@/assets/icons/login_and_register/user_icon.svg';
import passwordIcon from '@/assets/icons/login_and_register/user_passwd_icon.svg';
import lineIcon from '@/assets/icons/login_and_register/line.svg';

const router = useRouter();
const data = reactive({
  username: '',
  password: ''
})

// TODO: 提交登录信息
const handleSubmitLogin = async () => {
  try {
    const res = await login(data)
    const token = res.data.token
    localStorage.setItem('token', token)

    // TODO: 保存token

    router.push('/')
  } catch (err) {
    alert(err.message || '登录失败，请重试')
  }
}
</script>

<template>
  <div class="login-card">
    <h2 class="login-title">欢迎</h2>

    <div class="login-form form1">
      <div class="input-group">
        <img :src="userIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="data.username" type="text" class="login-input" placeholder="请输入您的用户名">
      </div>
    </div>
    <div class="login-form form2">
      <div class="input-group">
        <img :src="passwordIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="data.password" type="text" class="login-input" placeholder="请输入您的密码">
      </div>
    </div>

    <div class="forget-password">
      <router-link to="/forget-password" class="forget-link">忘记密码？</router-link>
    </div>

    <div class="login-button">
      <button class="login-btn" @click="handleSubmitLogin">登录</button>
    </div>

    <div class="create-account">
      <span>没有账号？</span>
      <router-link to="/register" class="register-link">注册</router-link>
    </div>
  </div>
</template>

<style scoped>
.login-card {
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

.login-title {
  /* layout */
  width: 191px;
  height: 72px;
  flex-shrink: 0;

  /* style */
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  line-height: normal;
  margin-top: 15%;
}

.login-form {
  /* layout */
  width: 78%;
  height: 48px;

  /* style */
  background-color: var(--bg-color);
  border-radius: 8px; /* 可选：让背景圆角 */

  /* flex */
  display: flex;  /* 使用 flex 排列元素 */
  align-items: center;      /* 垂直居中 */
  flex-direction: column;

}

.form2 {
  margin-top: 19px;
}

.input-group {
  display: flex;
  width: 330px;
  height: 47px;
  align-items: center;
  gap: 13px;
  flex-shrink: 0;
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

.login-input {
  border: none;
  display: flex;
  width: 212px;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  margin-left: 10px;
  flex-grow: 1;  /* 让输入框填充剩余空间 */
  background-color: var(--bg-color);  /* 设置输入框背景颜色 */
  font-family: inherit;  /* 继承父组件字体 */
  border: 0;
  outline: none;
}

input:focus {
  border: 1px;
}

.forget-password {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.52px;
}

.forget-link {
  text-decoration: none;
  color: var(--secondary-color)
}

.login-button {
  display: flex;
  width: 176px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  border-radius: 8px;
  background: var(--primary-color, #242426);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 看起来有立体阴影 */
}

.login-button:hover {
  background-color: var(--primary-hover-color);
}

.login-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: var(--text-primary-white-color, #F4F4F2);
  width: 100%;
  height: 100%;

  outline: none;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 3.6px;
  cursor: pointer;
}

.create-account {
  margin-top: 20px;

  opacity: 0.65;
  color: #000;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.52px;
}

.register-link {
  text-decoration: none;
  color: var(--secondary-color);
}

</style>
