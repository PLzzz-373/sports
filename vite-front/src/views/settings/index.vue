<template>
  <page-container>
    <el-card>
      <template #header> 数据筛选 </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="关键词">
          <el-select placeholder="请选择" clearable v-model="listParams.way">
            <el-option label="管理员名称" value="管理员名称" />
            <el-option label="管理员账号" value="管理员账号" />
          </el-select>
        </el-form-item>
        <el-form-item :label="listParams.way">
          <el-input
            clearable
            placeholder="请输入"
            v-model="listParams.content"
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit"> 查询 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <el-button type="primary" @click="formVisible = true">
          添加管理员
        </el-button>
      </template>
      <el-table stripe style="width: 100%" :data="list">
        <el-table-column prop="ID" label="ID" />
        <el-table-column prop="nickname" label="用户姓名" />
        <el-table-column prop="username" label="账号" />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.ID)">
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.ID)"
            >
              <template #reference>
                <el-button type="text"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:page-size="listParams.limit"
        :page-count="listParams.pageAll"
        v-model:current-page="listParams.page"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </page-container>
  <adminFromVue
    v-model="formVisible"
    v-model:admin-id="adminID"
    v-model:is-ban="isBan"
    @success="handleFormSuccess"
    @failed="handleFailed"
  ></adminFromVue>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import adminFromVue from "./adminFrom.vue";
import type { Admin } from "@/api/types/admin";
import { getAdmins, deleteAdmin, updateAdmin } from "@/api/admin";
import { ElMessage } from "element-plus";
import { isBooleanAttr } from "@vue/shared";
const adminID = ref<number | null>(null);
const isBan = ref(false);
onMounted(() => {
  loadList();
});
const formVisible = ref(false);
const list = ref<Admin[]>([]);
const listParams = reactive({
  page: 1,
  limit: 8,
  pageAll: 10,
  way: "",
  nickname: "",
  username: "",
  content: "",
});
const inintListParams = () => {
  listParams.content = "";
  listParams.page = 1;
  listParams.limit = 8;
  listParams.way = "";
  listParams.nickname = "";
  listParams.username = "";
  // listParams.pageAll = 10;
};
const handleCurrentChange = (page: number) => {
  listParams.page = page;
  loadList();
};
const loadList = async () => {
  const data = await getAdmins(listParams);
  list.value = data.data.data;
  listParams.pageAll = data.data.pageAll;
  //   listCount.value = data.count;
};
const handleUpdate = (ID: number) => {
  adminID.value = ID;
  isBan.value = true;
  formVisible.value = true;
};
const handleFormSuccess = () => {
  formVisible.value = false;
  loadList();
};
const handleDelete = async (item: number) => {
  await deleteAdmin(item);
  ElMessage.success("删除成功");
  loadList();
};
const handleFailed = () => {
  ElMessage.error("编号或账号重复，请修正！");
};
const handleQuery = async () => {
  listParams.page = 1;
  if (listParams.way == "管理员账号") {
    listParams.username = listParams.content;
    console.log(listParams.way);
  } else {
    listParams.nickname = listParams.content;
    console.log(listParams.way);
  }
  loadList().then(() => {
    inintListParams();
  });
  console.log(listParams);
};
</script>

<style lang="scss" scoped></style>
