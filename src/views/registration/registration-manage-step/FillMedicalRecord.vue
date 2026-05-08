<script setup>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {postRecord} from "@/api/record.js";

const props = defineProps({
  appointment: Object
})

const emit = defineEmits(['success'])

// 病历表单
const form = reactive({
  appointmentId: props.appointment?.appointmentId,

  chiefComplaint: '',
  presentIllness: '',
  pastHistory: '',
  allergyHistory: '',

  physicalExam: '',
  auxiliaryExam: '',

  diagnosis: '',
  treatmentPlan: '',
  prescription: '',

  doctorAdvice: '',
  remark: '',

  status: 0
})

// 表单校验
const rules = {
  chiefComplaint: [
    {
      required: true,
      message: '请输入主诉',
      trigger: 'blur'
    }
  ],

  diagnosis: [
    {
      required: true,
      message: '请输入诊断结果',
      trigger: 'blur'
    }
  ]
}

// 提交病历
const submitRecord = async () => {

  console.log(form)

  const res = await postRecord(form)

  ElMessage.success('病历提交成功')

  emit('success')
}

// 保存草稿
const saveDraft = async () => {

  form.status = 0

  console.log(form)

  // TODO:
  // 调用保存草稿接口

  ElMessage.success('草稿保存成功')
}
</script>

<template>
  <div class="record-page">

    <!-- 患者信息 -->
    <el-card shadow="never" class="patient-card">

      <template #header>
        <div class="card-title">
          <span>患者信息</span>
        </div>
      </template>

      <el-descriptions :column="4" border>

        <el-descriptions-item label="患者姓名">
          {{ appointment.patientName }}
        </el-descriptions-item>

        <el-descriptions-item label="联系电话">
          {{ appointment.contactPhone }}
        </el-descriptions-item>

        <el-descriptions-item label="科室">
          {{ appointment.departmentName }}
        </el-descriptions-item>

        <el-descriptions-item label="就诊日期">
          {{ appointment.visitDate }}
        </el-descriptions-item>

        <el-descriptions-item label="排队号">
          {{ appointment.displayNo }}
        </el-descriptions-item>

        <el-descriptions-item label="时段">
          {{ appointment.period === 'am' ? '上午' : '下午' }}
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

    <!-- 病历填写 -->
    <el-form
        :model="form"
        :rules="rules"
        label-width="100px"
        class="record-form"
    >

      <!-- 病情记录 -->
      <el-card shadow="never" class="form-card">

        <template #header>
          <div class="card-title">
            病情记录
          </div>
        </template>

        <el-form-item label="主诉" prop="chiefComplaint">
          <el-input
              v-model="form.chiefComplaint"
              type="textarea"
              :rows="3"
              placeholder="请输入患者主诉"
          />
        </el-form-item>

        <el-form-item label="现病史">
          <el-input
              v-model="form.presentIllness"
              type="textarea"
              :rows="4"
              placeholder="请输入现病史"
          />
        </el-form-item>

        <el-form-item label="既往史">
          <el-input
              v-model="form.pastHistory"
              type="textarea"
              :rows="3"
              placeholder="请输入既往史"
          />
        </el-form-item>

        <el-form-item label="过敏史">
          <el-input
              v-model="form.allergyHistory"
              placeholder="请输入过敏史"
          />
        </el-form-item>

      </el-card>

      <!-- 检查记录 -->
      <el-card shadow="never" class="form-card">

        <template #header>
          <div class="card-title">
            检查记录
          </div>
        </template>

        <el-form-item label="体格检查">
          <el-input
              v-model="form.physicalExam"
              type="textarea"
              :rows="4"
              placeholder="请输入体格检查结果"
          />
        </el-form-item>

        <el-form-item label="辅助检查">
          <el-input
              v-model="form.auxiliaryExam"
              type="textarea"
              :rows="4"
              placeholder="请输入辅助检查结果"
          />
        </el-form-item>

      </el-card>

      <!-- 诊断与治疗 -->
      <el-card shadow="never" class="form-card">

        <template #header>
          <div class="card-title">
            诊断与治疗
          </div>
        </template>

        <el-form-item label="诊断结果" prop="diagnosis">
          <el-input
              v-model="form.diagnosis"
              type="textarea"
              :rows="3"
              placeholder="请输入诊断结果"
          />
        </el-form-item>

        <el-form-item label="治疗方案">
          <el-input
              v-model="form.treatmentPlan"
              type="textarea"
              :rows="4"
              placeholder="请输入治疗方案"
          />
        </el-form-item>

        <el-form-item label="处方信息">
          <el-input
              v-model="form.prescription"
              type="textarea"
              :rows="4"
              placeholder="请输入处方信息"
          />
        </el-form-item>

      </el-card>

      <!-- 医嘱 -->
      <el-card shadow="never" class="form-card">

        <template #header>
          <div class="card-title">
            医嘱与备注
          </div>
        </template>

        <el-form-item label="医嘱">
          <el-input
              v-model="form.doctorAdvice"
              type="textarea"
              :rows="3"
              placeholder="请输入医嘱"
          />
        </el-form-item>

        <el-form-item label="备注">
          <el-input
              v-model="form.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
          />
        </el-form-item>

      </el-card>

      <!-- 底部按钮 -->
      <div class="footer">

        <el-button size="large" @click="saveDraft">
          保存草稿
        </el-button>

        <el-button
            type="primary"
            size="large"
            @click="submitRecord"
        >
          提交病历
        </el-button>

      </div>

    </el-form>

  </div>
</template>

<style scoped>
.record-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.patient-card,
.form-card {
  border-radius: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
}

.record-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0 40px;
}
</style>