<script setup>
import {onMounted, ref} from "vue";
import {listUsersByCondition} from "@/api/user.js";

const userData = ref([])
const filter = ref({})

const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)

const handleSizeChange = (val) => {
  pageSize.value = val
  filter.value.pageSize = val
  loadUsers()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  filter.value.pageNum = val
  loadUsers()
}
const resetFilter = () => {
  filter.value = {}
  loadUsers()
}
const loadUsers = async () => {
  const res = await listUsersByCondition(filter.value);
  userData.value = res.data.records
  total.value = res.data.total
  pageSize.value = res.data.size
  currentPage.value = res.data.page
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <h2 class="page-title">用户管理</h2>

  <div class="filter-container">
    <el-select v-model="filter.roleCode" clearable placeholder="角色">
      <el-option label="普通用户" value="user" />
      <el-option label="管理员" value="admin" />
      <el-option label="医生" value="doctor" />
    </el-select>
    <el-input v-model="filter.username" placeholder="用户名"></el-input>
    <el-input v-model="filter.phone" placeholder="手机号"></el-input>
    <el-input v-model="filter.email" placeholder="邮箱"></el-input>
    <el-input v-model="filter.realName" placeholder="真实姓名"></el-input>
    <el-input v-model="filter.idCard" placeholder="身份证号"></el-input>
    <el-button type="info" @click="resetFilter">重置</el-button>
    <el-button type="primary" @click="loadUsers">搜索</el-button>
  </div>

  <el-table :data="userData" style="width: 100%">
    <el-table-column type="index" />
    <el-table-column prop="uid" label="uid" width="100" />
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="phone" label="手机" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="realNameSecret" label="真实姓名" />
    <el-table-column prop="idCardSecret" label="身份证号" />
    <el-table-column prop="roleName" label="系统角色" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column label="操作" />
  </el-table>

  <div class="page-content">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 50]"
        :size="'default'"
        :background="false"
        layout="sizes, prev, pager, next, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.el-button+.el-button {
  margin-left: 0;
}

.page-content {
  display: flex;
  justify-content: flex-end;
}
</style>