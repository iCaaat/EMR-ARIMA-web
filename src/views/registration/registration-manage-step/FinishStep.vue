<script setup>
const emit = defineEmits(['back'])
</script>

<template>
  <el-result
      icon="success"
      title="病历提交成功"
      sub-title="患者本次就诊已完成"
  >
    <template #extra>

      <el-button
          type="primary"
          @click="emit('back')"
      >
        返回预约列表
      </el-button>

    </template>
  </el-result>
</template>