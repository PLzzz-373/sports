<template>
  <!-- <el-icon @click="handleCollapse">
    <div v-html="collapseIcon"></div>
  </el-icon> -->
  <el-icon @click="handleCollapse"><cellphone /></el-icon>
</template>

<script lang="ts" setup>
import { useMainStore } from "@/store";
import { computed } from "vue";

const store = useMainStore();
const handleCollapse = () => {
  store.setCollapse(!store.isCollapse);
};
</script>

<style lang="scss" scoped></style>
