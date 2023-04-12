<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <appMenu></appMenu>
      </el-aside>
      <el-container>
        <el-header>
          <appHeader></appHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import appMenu from "./components/appMenu/index.vue";
import appHeader from "./components/appHeader/index.vue";
</script>

<style scoped lang="scss">
.el-header {
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: rgb(53, 56, 62);
  color: #333;
  width: auto;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  height: 100vh;
}
</style>
