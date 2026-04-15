<script setup>
import { ref } from 'vue'
import userIcon from "@/assets/icons/login_and_register/user_icon.svg";
import lineIcon from "@/assets/icons/login_and_register/line.svg";

const token = ref('')
const setToken = () => {
  localStorage.setItem('token', token.value)
}

const value = ref('')

const data = ref({
  name: ''
})

const handleSuccess = (res) => {
  console.log("上传成功", res)
}
const uploadHeaders = {
  Authorization: "Bearer " + localStorage.getItem("token")
}
</script>

<template>
  <h2 class="page-title">测试页面</h2>
  <el-input placeholder="设置token" v-model="token"></el-input>
  <el-button type="primary" @click="setToken">设置</el-button>

  <el-divider />

  <el-upload :headers="uploadHeaders" action="/api/file/upload" :on-success="handleSuccess">
    <el-button type="primary">点击上传</el-button>
  </el-upload>

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