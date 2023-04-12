<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="rgb(53,56,62)"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="store.isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/product/product_list">用品列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><document /></el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item index="/order/order_list">订单信息</el-menu-item>
      <el-menu-item index="/order/order_customer">客户信息</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/settings">
      <el-icon><setting /></el-icon>
      <span>设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useMainStore } from "@/store";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const store = useMainStore();
</script>

<style scoped lang="scss">
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
