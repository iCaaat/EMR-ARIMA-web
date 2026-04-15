<script setup>
import {onMounted, reactive, ref} from "vue";
import {getDepartments} from "@/api/registration.js";
import {registerDoctor} from "@/api/user.js";
import {ElMessage, ElMessageBox} from "element-plus";

const formRef = ref()

// 表单数据
const form = reactive({
  username: '',
  password: '',
  phone: '',
  email: '',
  realName: '',
  idCard: '',
  departmentId: '',
  gender: '',
  specialty: '',
  description: '',
  qualification: '',
  experienceYears: '',
  doctorTitle: '',
  outpatientType: 'normal',
  fee: 18,
  avatar: ''
})

// 正则规则
const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{2,19}$/
const realNameRegex = /(^[\u4e00-\u9fa5]{2,18}$)|(^[a-zA-Z\s]{1,64}$)/
const phoneRegex = /^1[3-9]\d{9}$/
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/
// 简单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: usernameRegex, message: '用户名格式不正确', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: phoneRegex, message: '手机号格式不正确', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: emailRegex, message: '邮箱格式不正确', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { pattern: realNameRegex, message: '真实姓名格式不正确', trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { pattern: idCardRegex, message: '身份证号格式不正确', trigger: 'blur' }
  ],
  departmentId: [
    { required: true, message: '请选择科室', trigger: 'change' }
  ],
  doctorTitle: [
    { required: true, message: '请输入职称', trigger: 'blur' }
  ],
  qualification: [
    { required: true, message: '请输入资格证明', trigger: 'blur' }
  ],
  specialty: [
    { required: true, message: '请输入专业领域', trigger: 'blur' }
  ],
  fee: [
    { required: true, message: '请输入挂号费', trigger: 'blur' }
  ]
}
const departmentOptions = ref([])
const cascaderProps = {
  value: "departmentId",
  label: "name",
  children: "children",
  emitPath: false,
  checkStrictly: false
}
const registerResult = ref(null)

const handleIdCardChange = (val) => {
  if (!val || val.length !== 18) return

  // 计算性别
  const genderCode = val.charAt(16)
  form.gender = genderCode % 2 === 1 ? '男' : '女'

  // 自动生成密码（身份证后6位）
  if (!form.password) {
    form.password = val.slice(-6)
  }
}

// 提交（仅模板壳）
const handleSubmit = () => {
  formRef.value.validate( async valid => {
    if (valid) {
      ElMessageBox.confirm('确认提交注册信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await registerDoctor(form)
        registerResult.value = res.data
        console.log(res.data)
        ElMessage.success(res.message || '注册成功')
      })
    }
  })
}

// 重置
const handleReset = () => {
  formRef.value.resetFields()
}

// 加载科室
const loadDepartments = async () => {
  const res = await getDepartments()
  departmentOptions.value = res.data
}

onMounted(() => {
  loadDepartments()
})
</script>

<template>
  <h2 class="page-title">医生注册</h2>

  <el-card shadow="none">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
    >

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="密码">
            <el-input
                v-model="form.password"
                placeholder="若为空则默认为身份证号后6位"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
                v-model="form.email"
                placeholder="用户信息将会发送到此邮箱"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="form.realName" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input
                v-model="form.idCard"
                @blur="handleIdCardChange(form.idCard)"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="科室" prop="departmentId">
            <el-cascader
                v-model="form.departmentId"
                :options="departmentOptions"
                :props="cascaderProps"
                placeholder="请选择科室"
                clearable
                style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="form.gender" disabled>
              <el-radio label="男" />
              <el-radio label="女" />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="职称" prop="doctorTitle">
            <el-input v-model="form.doctorTitle" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="从业年限">
            <el-input-number
                v-model="form.experienceYears"
                :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="门诊类型">
            <el-select v-model="form.outpatientType">
              <el-option label="普通门诊" value="normal" />
              <el-option label="专家门诊" value="expert" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="挂号费" prop="fee">
            <el-input-number
                v-model="form.fee"
                :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item label="专业领域" prop="specialty">
        <el-input
            v-model="form.specialty"
            type="textarea"
        />
      </el-form-item>

      <el-form-item label="描述">
        <el-input
            v-model="form.description"
            type="textarea"
        />
      </el-form-item>

      <el-form-item label="资格证明" prop="qualification">
        <el-input
            v-model="form.qualification"
            type="textarea"
        />
      </el-form-item>


      <el-form-item label="头像">
        <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            list-type="picture-card"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="handleSubmit">
          提交
        </el-button>

        <el-button @click="handleReset">
          重置
        </el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<style scoped>
.doctor-register {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
}

.avatar-uploader {
  width: 120px;
}
</style>