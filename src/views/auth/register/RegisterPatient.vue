<script setup>
import {reactive, ref, watch} from "vue";

import emailIcon from "@/assets/icons/login_and_register/email_icon.svg";
import lineIcon from "@/assets/icons/login_and_register/line.svg";
import passwordIcon from "@/assets/icons/login_and_register/user_passwd_icon.svg";
import userIcon from "@/assets/icons/login_and_register/user_icon.svg";
import {ElMessage} from "element-plus";

const emit = defineEmits(['back', 'submit-exp-form']);

const registerFormRef = ref()
const registerForm = reactive({
  realName: '',
  idCard: '',
  gender: '',
  birthday: '',
  phone: '',
  email: '',
  address: '',
  nationality: '',
  occupation: '',
  maritalStatus: '',
  emergencyContact: '',
  emergencyPhone: '',
  insuranceNumber: ''
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
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  birthday: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的11位手机号', trigger: 'blur' }
  ],
  email: [
    { required: false, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  address: [],
  nationality: [],
  occupation: [],
  maritalStatus: [],
  emergencyContact: [],
  emergencyPhone: [],
  insuranceNumber: []
})

watch(
    () => registerForm.idCard,
    (val) => {
      if (!val || val.length < 18) return

      // 根据身份证号自动提取出生日期和性别
      const birthYear = val.substring(6, 10)
      const birthMonth = val.substring(10, 12)
      const birthDay = val.substring(12, 14)
      registerForm.birthday = `${birthYear}-${birthMonth}-${birthDay}`

      const genderCode = parseInt(val.substring(16, 17))
      registerForm.gender = (genderCode % 2 === 0) ? 'F' : 'M'
    }
)

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
    <h2 class="card-title">2.其他信息</h2>

    <!-- 表单区 -->
    <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
        label-width="100px"
        label-position="right"
        class="register-form">
      <el-row :gutter="24">
        <!-- 真实姓名 -->
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="registerForm.realName" placeholder="姓名" />
          </el-form-item>
        </el-col>

        <!-- 身份证号 -->
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="registerForm.idCard" placeholder="身份证号" />
          </el-form-item>
        </el-col>

        <!-- 性别 -->
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="registerForm.gender" disabled>
              <el-radio value="M" size="default">男</el-radio>
              <el-radio value="F" size="default">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <!-- 出生日期 -->
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
                v-model="registerForm.birthday"
                type="date"
                placeholder="选择出生日期"
                :size="'default'"
                disabled
            />
          </el-form-item>
        </el-col>

        <!-- 手机号 -->
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="11位手机号" />
          </el-form-item>
        </el-col>

        <!-- 邮箱 -->
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="邮箱" />
          </el-form-item>
        </el-col>

        <!-- 家庭住址（占满一行） -->
        <el-col :span="24">
          <el-form-item label="家庭住址">
            <el-input v-model="registerForm.address" placeholder="住址"/>
          </el-form-item>
        </el-col>

        <!-- 民族 -->
        <el-col :span="12">
          <el-form-item label="民族">
            <el-input v-model="registerForm.nationality" placeholder="民族"/>
          </el-form-item>
        </el-col>

        <!-- 职业 -->
        <el-col :span="12">
          <el-form-item label="职业">
            <el-input v-model="registerForm.occupation" placeholder="职业"/>
          </el-form-item>
        </el-col>

        <!-- 婚姻状态（占满） -->
        <el-col :span="24">
          <el-form-item label="婚姻状态">
            <el-radio-group v-model="registerForm.maritalStatus">
              <el-radio value="0" size="default">未婚</el-radio>
              <el-radio value="1" size="default">已婚</el-radio>
              <el-radio value="2" size="default">丧偶</el-radio>
              <el-radio value="3" size="default">离异</el-radio>
              <el-radio value="9" size="default">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <!-- 紧急联系人 -->
        <el-col :span="12">
          <el-form-item label="紧急联系人">
            <el-input v-model="registerForm.emergencyContact" placeholder="联系人姓名"/>
          </el-form-item>
        </el-col>

        <!-- 紧急联系电话 -->
        <el-col :span="12">
          <el-form-item label="紧急联系电话">
            <el-input v-model="registerForm.emergencyPhone" placeholder="联系人电话" />
          </el-form-item>
        </el-col>

        <!-- 医疗保险号（占满） -->
        <el-col :span="24">
          <el-form-item label="医疗保险号">
            <el-input v-model="registerForm.insuranceNumber" placeholder="医疗保险号码"/>
          </el-form-item>
        </el-col>
      </el-row>
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
  width: 860px;
  height: 700px;
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
  margin-top: 6%;
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
