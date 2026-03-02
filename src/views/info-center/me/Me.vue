<script setup>
import {onMounted, ref} from "vue";
import {myInfo} from "@/api/auth.js";

const me = ref({})
const templateMe = ref({})

const editing = ref(false)
const formDisabled = ref(true)

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
  templateMe.value = { ...me.value }
}
const editReset = () => {
  templateMe.value = { ...me.value }
}
</script>

<template>
  <h2 class="page-title">个人中心</h2>

  <el-button type="info" v-show="!editing" @click="editStart">编辑</el-button>
  <el-button type="info" v-show="editing" @click="editCancel" style="margin-left: 0;">取消</el-button>
  <el-button type="warning" v-show="editing" @click="editReset">重置</el-button>
  <el-button type="primary" v-show="editing">提交</el-button>

  <el-divider></el-divider>

  <el-form :inline="true" :model="templateMe" :disabled="formDisabled">
    <el-form-item label="用户名">
      <el-input v-model="templateMe.username" />
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="templateMe.realName" />
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="templateMe.idCard" />
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="templateMe.gender" />
    </el-form-item>
    <el-form-item label="出生日期">
      <el-input v-model="templateMe.birthday" />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="templateMe.phone" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="templateMe.email" />
    </el-form-item>
    <el-form-item label="密码">
      <el-button>修改密码</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>