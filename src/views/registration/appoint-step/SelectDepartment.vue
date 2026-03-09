<script setup>
import {onMounted, ref} from "vue";
import {getDepartments} from "@/api/registration.js";

const emit = defineEmits(['select-department'])

const department = ref([])
const activeDept = ref('')

onMounted(async () => {
  const res = await getDepartments()
  department.value = res.data
  activeDept.value = department.value[0]?.departmentId || ''
})
</script>

<template>
  <el-tabs v-model="activeDept" type="border-card" style="width: 70%">
    <el-tab-pane
        v-for="item in department"
        :key="item.departmentId"
        :label="item.name"
        :name="item.departmentId">
      <div class="second-container">
        <template v-for="child in item.children" :key="child.departmentId">
          <el-popover
              v-if="child.children && child.children.length"
              trigger="click"
              placement="bottom-start"
              popper-style="min-width: 200px;">
            <template #reference>
              <el-button class="dept-btn">
                {{ child.name }}
              </el-button>
            </template>

            <div class="third-container">
              <el-button
                  v-for="sub in child.children"
                  :key="sub.departmentId"
                  text
                  @click="emit('select-department', sub)"
              >
                {{ sub.name }}
              </el-button>
            </div>
          </el-popover>

          <el-button
              v-else
              class="dept-btn"
              @click="emit('select-department', child)"
          >
            {{ child.name }}
          </el-button>
        </template>
      </div>
    </el-tab-pane>

  </el-tabs>
</template>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.second-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.dept-btn {
  width: 100%;
}
:deep(.el-button + .el-button) {
  margin-left: 0;
}

</style>