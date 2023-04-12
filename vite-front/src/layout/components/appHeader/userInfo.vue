<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon><Avatar /></el-icon>
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogou"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const logout = () => {
  const storage = window.localStorage;
  storage.clear();
};
const handleLogou = () => {
  // 退出提示
  ElMessageBox.confirm("确认退出吗？", "退出提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      // 确认发出退出请求
      await logout();

      ElMessage({
        type: "success",
        message: "退出成功!",
      });

      // 跳转到登录页
      router.push({
        name: "login",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消退出",
      });
    });
};
</script>

<style lang="scss" scoped></style>
