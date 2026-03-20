<script setup>
defineProps({
  avatarUrl: String,
  logoUrl: String,
  identityName: String,
  relation: String,
  identityNumber: String,
  institutionTitle: String
})

</script>

<template>
  <el-card shadow="false" class="card">
    <div class="card-body">
      <div class="card-left">
        <el-avatar size="large" shape="square" :src="avatarUrl">Ava</el-avatar>
        <div class="identity-info">
          <h2 class="identity-name">{{ identityName }}</h2>
          <div class="identity-relation">关系：{{ relation }}</div>
        </div>
        <div class="identity-number">
          {{ identityNumber }}
        </div>
      </div>

      <div class="card-right">
        <div class="institution-info">
          <div class="institution-title">{{ institutionTitle }}</div>
          <el-avatar :src="logoUrl" class="institution-logo">Logo</el-avatar>
        </div>
        <el-button type="primary">展开详细</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  max-width: 500px;
  min-width: 350px;
  width: 100%;

  padding: 10px;
  border-radius: 15px;
  border-color: var(--border-color);
}

.card-body {
  display: flex;
  justify-content: space-between;
}

/* 左边 */
.card-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.identity-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 右边 */
.card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.institution-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}
</style>