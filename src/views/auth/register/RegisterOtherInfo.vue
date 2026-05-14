<script setup>
import {reactive, ref, watch} from "vue";

import {ElMessage} from "element-plus";

const emit = defineEmits(['back', 'submit-exp-form']);

const registerFormRef = ref()
const registerForm = reactive({
  realName: '',
  idCard: '',
  phone: '',
  email: ''
})
const registerFormRules = reactive({
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 2, max: 50, message: '姓名长度应在2到50个字符之间', trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { pattern: /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/, message: '请输入有效的身份证号', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的11位手机号', trigger: 'blur' }
  ],
  email: [
    { required: false, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: '请输入有效的邮箱地址', trigger: 'blur' }
  ]
})

const handleSubmit = async () => {
  const valid = await registerFormRef.value.validate().catch(() => false)
  if (!valid) {
    ElMessage.error('请完善表单信息')
    return
  }
  emit('submit-exp-form', registerForm)
}
</script>

<template>
  <div class="register-card">
    <!-- 标题 -->
    <h2 class="card-title">2.扩展信息</h2>

    <!-- 表单区 -->
    <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        label-width="100px"
        label-position="right"
        class="register-form">
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="registerForm.realName" placeholder="姓名" />
      </el-form-item>

      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="registerForm.idCard" placeholder="身份证号" />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone" placeholder="11位手机号" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" placeholder="邮箱" />
      </el-form-item>
    </el-form>

    <!-- 按钮区 -->
    <div class="action-row">
      <el-button @click="emit('back')" class="btn-prev btn">
        上一步
      </el-button>

      <el-button type="primary" @click="handleSubmit" class="btn-next btn">
        提交注册
      </el-button>
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
  width: 80%;
}

.register-form :deep(.el-input__wrapper) {
  --el-input-bg-color: var(--bg-color);
  border-radius: 6px;
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
