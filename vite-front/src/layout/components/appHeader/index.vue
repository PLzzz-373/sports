<template>
  <el-space size="large">
    <sideBarVue />
    <breadCrumb />
  </el-space>
  <el-space size="large">
    <!-- <MenuSearch /> -->
    <!-- <FullScreen /> -->
    <!-- <Notification /> -->
    <userInfo />
  </el-space>
</template>

<script lang="ts" setup>
import sideBarVue from "./sideBar.vue";
import breadCrumb from "./breadCrumb.vue";
// import MenuSearch from './MenuSearch.vue'
// import FullScreen from './FullScreen.vue'
// import Notification from "./Notification.vue";
import userInfo from "./userInfo.vue";
</script>

<style lang="scss" scoped>
i {
  font-size: 19px;
  cursor: pointer;
}
</style>
