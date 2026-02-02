<script>
import emailIcon from "@/assets/icons/login_and_register/email_icon.svg";
import lineIcon from "@/assets/icons/login_and_register/line.svg";
import passwordIcon from "@/assets/icons/login_and_register/user_passwd_icon.svg";
import userIcon from "@/assets/icons/login_and_register/user_icon.svg";

export default {
  name: 'RegisterCard',
  data() {
    return {
      // icons
      emailIcon,
      passwordIcon,
      lineIcon,
      userIcon,
      // data
      registerForm: {
        userName: '',
        userEmail: '',
        userPasswd: '',
        confirmPasswd: ''
      }
    };
  },
  methods: {
    submitRegister() {
      if (!this.registerForm.userName || !this.registerForm.userEmail
          || !this.registerForm.userPasswd || !this.registerForm.confirmPasswd) {
        alert("请填写所有字段。");
        return;
      }
      if (this.registerForm.userName.length < 2 || this.registerForm.userName.length > 20) {
        alert("用户名长度必须在3到20个字符之间。");
        return;
      }
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(this.registerForm.userEmail)) {
        alert("请输入有效的邮箱地址。");
        return;
      }
      if (this.registerForm.userPasswd.length < 6 || this.registerForm.userPasswd.length > 20) {
        alert("密码长度必须在6到20个字符之间。");
        return;
      }
      if (this.registerForm.confirmPasswd !== this.registerForm.userPasswd) {
        alert("两次输入的密码不一致，请重新输入。");
      }
    }
  }
}
</script>

<template>
  <div class="register-card">
    <h2 class="card-title">注册</h2>
    <div class="register-form">
      <div class="input-group">
        <img :src="userIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.userName" type="text" class="register-input" placeholder="请输入您的用户名">
      </div>
    </div>
    <div class="register-form form2">
      <div class="input-group">
        <img :src="emailIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.userEmail" type="text" class="register-input" placeholder="请输入您的邮箱">
      </div>
    </div>
    <div class="register-form form2">
      <div class="input-group">
        <img :src="passwordIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.userPasswd" type="text" class="register-input" placeholder="请输入您的密码">
      </div>
    </div>
    <div class="register-form form2">
      <div class="input-group">
        <img :src="passwordIcon" alt="email-icon" class="input-icon">
        <img :src="lineIcon" alt="line-icon" class="input-line">
        <input v-model="registerForm.confirmPasswd" type="text" class="register-input" placeholder="请确认您的密码">
      </div>
    </div>

    <div class="register-button">
      <button class="register-btn" @click="submitRegister">注册</button>
    </div>

    <div class="create-account">
      <span>已有账号？</span>
      <router-link to="/login" class="register-link">登录</router-link>
    </div>
  </div>
</template>

<style scoped>
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

.register-form {
  /* layout */
  width: 78%;
  height: 48px;

  /* style */
  background-color: var(--input-color);
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
  gap: 18px;
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

.register-input {
  border: none;
  display: flex;
  width: 212px;
  height: 35px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  margin-left: 10px;
  flex-grow: 1;  /* 让输入框填充剩余空间 */
  background-color: var(--input-color);  /* 设置输入框背景颜色 */
  font-family: inherit;  /* 继承父组件字体 */
  border: 0;
  outline: none;
}

input:focus {
  border: 1px;
}

.forget-password {
  margin-top: 10px;

  color: #005EB5;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2.52px;
}

.forget-link {
  text-decoration: none;
}

.register-button {
  display: flex;
  width: 176px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;


  border-radius: 8px;
  background: var(--dark-color, #242426);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 看起来有立体阴影 */
}

.register-button:hover {
  background-color: black;
}

.register-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: var(--primary-color, #F4F4F2);
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

</style>
