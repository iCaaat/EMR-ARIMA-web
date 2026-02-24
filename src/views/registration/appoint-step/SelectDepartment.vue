<script setup>
import {reactive} from "vue";

const department = reactive([
  {
    id: 1,
    name: '内科',
    children: [
      {
        id: 11,
        name: '心血管内科',
        children: [
          { id: 111, name: '冠心病内科门诊'},
          { id: 112, name: '高血压门诊'}
        ]
      },
      {
        id: 12,
        name: '呼吸内科门诊',
        children: [
          { id: 121, name: '呼吸内科门诊'},
          { id: 122, name: '哮喘门诊'}
        ]
      }
    ]
  },
  {
    id: 2,
    name: '外科',
    children: [
      {
        id: 21,
        name: '骨科中心',
        children: [
          { id: 211, name: '骨外科门诊'},
          { id: 212, name: '骨科（关节外科）'}
        ]
      }
    ]
  }
])
</script>

<template>
  <el-card style="max-width: 300px" v-for="item in department" :key="item.id">
    <template #header>
      <div class="card-header">
        <span>{{ item.name }}</span>
      </div>
    </template>

    <div class="card-content">
      <el-popover placement="right" trigger="click" v-for="child in item.children" :key="child.id">
        <template #reference>
          <el-button text>{{ child.name }}</el-button>
        </template>
        <el-button text v-for="sub in child.children" :key="sub.id">{{ sub.name }}</el-button>
      </el-popover>
    </div>
  </el-card>
</template>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>