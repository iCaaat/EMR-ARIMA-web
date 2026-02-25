<script setup>
import {onMounted, ref} from "vue";
import {getDepartments} from "@/api/registration.js";

const department = ref([])

onMounted(async () => {
  const res = await getDepartments()
  department.value = res.data
})

const handleThirdClick = (department) => {
  console.log("点击三级科室", department)
}

const handleSecondClick = (department) => {
  console.log("点击二级科室", department)
}
</script>

<template>
  <el-card style="max-width: 300px" v-for="item in department" :key="item.id">
    <template #header>
      <div class="card-header">
        <span>{{ item.name }}</span>
      </div>
    </template>

    <div class="card-content">
      <template v-for="child in item.children" :key="child.id">
        <el-popover
            v-if="child.children && child.children.length > 0"
            placement="right"
            trigger="click"
        >
          <template #reference>
            <el-button text>{{ child.name }}</el-button>
          </template>
          <el-button
            text
            v-for="sub in child.children"
            :key="sub.id"
            @click="handleThirdClick(sub)"
            >
            {{ sub.name }}
          </el-button>
        </el-popover>

        <el-button
          v-else
          text
          @click="handleSecondClick(child)"
          >
          {{ child.name }}
        </el-button>
      </template>
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