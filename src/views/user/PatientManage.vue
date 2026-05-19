<script setup>
import PatientCard from "@/components/registration/PatientCard.vue";
import {onMounted, reactive, ref} from "vue";
import {
  addPatientDetail,
  deletePatientDetail,
  getPatientDetail,
  getUserPatients,
  updatePatientDetail
} from "@/api/user.js";
import {ElMessage, ElMessageBox} from "element-plus";

const loading = ref(true)
const detailVisible = ref(false)
const patients = ref([])
const patientList = ref([])
const detailFormTemp = ref({})
const detailForm = ref({})
const dialogTitle = ref('详细')

const formGutter = ref(10)
const relationOptions = [
  { label: '父亲', value: 'father' },
  { label: '母亲', value: 'mother' },
  { label: '配偶', value: 'spouse' },
  { label: '子女', value: 'child' },
  { label: '本人', value: 'self', disabled: true },
]
const relationInput = ref('')
const detailFormRef = ref()
const detailFormRules = reactive({
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    { min: 2, max: 50, message: '姓名长度应在2到50个字符之间', trigger: 'blur' }
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { pattern: /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/, message: '请输入有效的身份证号', trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的11位手机号', trigger: 'blur' }
  ]
})
const flag = ref('update')

const handleRelationChange = (val) => {
  updateRelation(val)
}
const handleRelationBlur = () => {
  updateRelation(relationInput.value)
}
const updateRelation = (val) => {
  const option = relationOptions.find(item => item.value === val)

  if (option) {
    detailFormTemp.value.relation = option.value
    detailFormTemp.value.relationDisplay = option.label
  } else {
    detailFormTemp.value.relation = 'other'
    detailFormTemp.value.relationDisplay = val
  }
}
const handleIdCardChange = () => {
  const id = detailFormTemp.value.idCard

  if (!id || id.length !== 18) return

  // 出生日期
  const year = id.substring(6, 10)
  const month = id.substring(10, 12)
  const day = id.substring(12, 14)

  detailFormTemp.value.birthday = `${year}-${month}-${day}`

  // 性别
  const genderCode = id.substring(16, 17)

  if (parseInt(genderCode) % 2 === 1) {
    detailFormTemp.value.gender = 'M'
  } else {
    detailFormTemp.value.gender = 'F'
  }
}
const addPatient = () => {
  flag.value = 'add'
  detailForm.value = {}
  detailFormTemp.value = {}
  relationInput.value = ''
  detailVisible.value = true
  loading.value = false
}
const showDetail = async (patientId) => {
  flag.value = 'update'
  detailVisible.value = true
  loading.value = true

  const res = await getPatientDetail(patientId)
  detailForm.value = res.data
  detailFormTemp.value = structuredClone(res.data)

  // 关系展示同步
  relationInput.value = detailFormTemp.value.relationDisplay

  loading.value = false
}
const handleDialogConfirm = async () => {
  const valid = await detailFormRef.value.validate().catch(() => false)
  if (!valid) {
    ElMessage.error('请完善表单信息')
    return
  }

  detailForm.value = { ...detailFormTemp.value }
  if (flag.value === 'update') {
    const res = await updatePatientDetail(detailForm.value)
    if (res.code === 200) {
      ElMessage.success(res.data)
      await loadData()
      detailVisible.value = false
    }
  } else if (flag.value === 'add') {
    const res = await addPatientDetail(detailForm.value)
    if (res.code === 200) {
      ElMessage.success(res.data)
      await loadData()
      detailVisible.value = false
    }
  }
}

const handleClose = (id) => {
  ElMessageBox.confirm(
      '此操作将删除就诊人信息',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
  ).then(async () => {
    const res = await deletePatientDetail(id)
    ElMessage.success(res.data)
    await loadData()
  })
}

const loadData = async () => {
  const res = await getUserPatients()
  patients.value = res.data
  patientList.value = patients.value.map(item => ({
    mainId: item.patientId,
    identityName: item.realNameSecret,
    identityNumber: item.idCardSecret,
    relation: item.relation,
    relationDisplay: item.relationDisplay,
    avatarUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    institutionTitle: '附属医院',
    buttonText: '展开详细'
  }))
}

onMounted(loadData)
</script>

<template>
  <div class="page-header">
    <h2 class="page-title">就诊人管理</h2>

    <div class="buttons">
      <el-button type="primary" @click="addPatient">添加就诊人</el-button>
    </div>
  </div>

  <div class="card-container">
    <PatientCard v-for="patient in patientList" :data="patient" @close="handleClose" @view-detail="showDetail"></PatientCard>
  </div>

  <el-dialog
      v-model="detailVisible"
      v-loading="loading"
      :title="dialogTitle"
      width="800"
  >
    <el-form
        ref="detailFormRef"
        size="default"
        :model="detailFormTemp"
        :rules="detailFormRules"
        v-loading="loading"
        :inline="true"
        label-position="right"
        label-width="auto">
      <el-row :gutter="formGutter">
        <el-col :span="12">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="detailFormTemp.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="detailFormTemp.idCard" @blur="handleIdCardChange" placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="formGutter">
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="detailFormTemp.gender" disabled>
              <el-radio value="M">♂ 男</el-radio>
              <el-radio value="F">♀ 女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期">
            <el-date-picker v-model="detailFormTemp.birthday" type="date" disabled placeholder="请选择出生日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="formGutter">
        <el-col :span="12">
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="detailFormTemp.contactPhone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="家庭住址">
            <el-input v-model="detailFormTemp.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="formGutter">
        <el-col :span="12">
          <el-form-item label="民族">
            <el-input v-model="detailFormTemp.nationality"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职业">
            <el-input v-model="detailFormTemp.occupation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="formGutter">
        <el-col :span="24">
          <el-form-item label="婚姻状态">
            <el-radio-group v-model="detailFormTemp.maritalStatus">
              <el-radio :value="0">未婚</el-radio>
              <el-radio :value="1">已婚</el-radio>
              <el-radio :value="2">丧偶</el-radio>
              <el-radio :value="3">离异</el-radio>
              <el-radio :value="9">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="formGutter">
        <el-col :span="12">
          <el-form-item label="紧急联系人">
            <el-input v-model="detailFormTemp.emergencyContact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急联系电话">
            <el-input v-model="detailFormTemp.emergencyPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="formGutter">
        <el-col :span="12">
          <el-form-item label="医疗保险号">
            <el-input v-model="detailFormTemp.insuranceNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关系">
            <el-select @change="handleRelationChange"
                       @blur="handleRelationBlur"
                       filterable
                       allow-create
                       v-model="relationInput"
                       :disabled="detailFormTemp.relation === 'self'">
              <el-option :disabled="item.disabled"
                         v-for="item in relationOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="detailVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-divider></el-divider>

  <p>健康卡功能敬请期待</p>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
}

.card-container {
  width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.el-form-item {
  margin: 0 0 18px 0;
  width: 85%;
}
</style>