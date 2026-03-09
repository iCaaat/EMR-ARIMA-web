<script setup>
import {onMounted, reactive, ref} from "vue";
import {myInfo, updatePassword, updateUserInfo} from "@/api/user.js";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";

const me = ref({})
const templateMe = ref({})
const templateMeRef = ref()
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const editing = ref(false)
const formDisabled = ref(true)
const passwordShow = ref(false)

const templateMeRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3到20个字符之间', trigger: 'blur' }
  ],
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

onMounted(async () => {
  const res = await myInfo()
  me.value = res.data
  templateMe.value = structuredClone(res.data)
})

const editStart = () => {
  editing.value = true
  formDisabled.value = false
}
const editCancel = () => {
  editing.value = false
  formDisabled.value = true
  passwordShow.value = false
  templateMe.value = { ...me.value }
}
const editReset = () => {
  templateMe.value = { ...me.value }
}
const handleUpdateSubmit = async () => {
  const valid = await templateMeRef.value.validate().catch(() => false)
  if (!valid) {
    ElMessage.error('请完善表单信息')
    return
  }

  const res = await updateUserInfo(templateMe.value)
  ElMessage.success(res.data)
  me.value = { ...templateMe.value }
  editing.value = false
  formDisabled.value = true
  passwordShow.value = false
}
const handleChangePassword = async () => {
  const res = await updatePassword(passwordForm.value)
  ElMessage.success(res.data)
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }
  passwordShow.value = false
  localStorage.removeItem('token')
  await router.push('/login')
}
</script>

<template>
  <h2 class="page-title">个人中心</h2>

  <el-button type="info" v-show="!editing" @click="editStart">编辑</el-button>
  <el-button type="info" v-show="editing" @click="editCancel" style="margin-left: 0;">取消</el-button>
  <el-button type="warning" v-show="editing" @click="editReset">重置</el-button>
  <el-button type="primary" v-show="editing" @click="handleUpdateSubmit">提交</el-button>

  <el-divider></el-divider>

  <el-form label-position="right" label-width="100px" :inline="true" ref="templateMeRef" :rules="templateMeRules" :model="templateMe" :disabled="formDisabled">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="templateMe.username" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="templateMe.realName" disabled />
    </el-form-item>
    <el-form-item label="身份证号" prop="idCard">
      <el-input v-model="templateMe.idCard" disabled />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-input v-model="templateMe.gender" disabled />
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-input v-model="templateMe.birthday" disabled />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="templateMe.phone" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="templateMe.email" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-button @click="passwordShow = !passwordShow">修改密码</el-button>
    </el-form-item>
  </el-form>

  <el-divider v-show="passwordShow"></el-divider>

  <el-form style="width: 300px;" :model="passwordForm" label-position="right" label-width="100px">
    <el-form-item label="当前密码" v-if="passwordShow">
      <el-input type="password" v-model="passwordForm.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码" v-if="passwordShow">
      <el-input type="password" v-model="passwordForm.newPassword" />
    </el-form-item>
    <el-form-item label="确认新密码" v-if="passwordShow">
      <el-input type="password" v-model="passwordForm.confirmNewPassword" />
    </el-form-item>
    <el-form-item label="" v-if="passwordShow">
      <el-button @click="handleChangePassword" type="primary">修改密码</el-button>
    </el-form-item>
  </el-form>



</template>

<style scoped>

</style>