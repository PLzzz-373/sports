<template>
  <el-card class="box-card">
    <div class="introduce container_wrap">
      <div class="header">体育用品销售系统 项目介绍</div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :show-header="false"
      >
        <el-table-column prop="date"> </el-table-column>
        <el-table-column prop="name"> </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: "开发",
    name: "计科(2)班顾浩、吉科泓",
  },
  {
    date: "数据库",
    name: "MySQL",
  },
  {
    date: "后端服务器",
    name: "基于nodejs",
  },
  {
    date: "前端技术栈",
    name: "Vue3 + ElementUi + Ts + vite(打包工具)",
  },
];
</script>
<style lang="scss" scoped>
.header {
  padding: 10px 0;
  border-bottom: 1px #eeeeee solid;
  font-size: 16px;
  color: #303133;
}
</style>
