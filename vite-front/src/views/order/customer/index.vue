<template>
  <page-container>
    <el-card>
      <template #header> 客户信息 </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="关键词">
          <el-select placeholder="请选择" clearable v-model="listParams.way">
            <el-option label="客户编号" value="客户编号" />
            <el-option label="客户姓名" value="客户姓名" />
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
          添加客户
        </el-button>
      </template>
      <el-table stripe style="width: 100%" :data="list">
        <el-table-column prop="客户编号" label="客户编号" />
        <el-table-column prop="客户姓名" label="客户姓名" />
        <el-table-column prop="性别" label="性别" />
        <el-table-column prop="电话号码" label="电话号码" />
        <el-table-column prop="总消费" label="总消费" />
        <el-table-column prop="星级" label="星级" />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.客户编号)">
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.客户编号)"
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
    v-model:customer-id="customerID"
    v-model:is-ban="isBan"
    @success="handleFormSuccess"
    @failed="handleFailed"
  ></adminFromVue>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import adminFromVue from "./adminFrom.vue";
import type { Customer } from "@/api/types/customer";
import { getCustomer, deleteCustomer, updateCustomer } from "@/api/customer";
import { ElMessage } from "element-plus";
import { isBooleanAttr } from "@vue/shared";
const customerID = ref<number | null>(null);
const isBan = ref(false);
onMounted(() => {
  loadList();
});
const formVisible = ref(false);
const list = ref<Customer[]>([]);
const listParams = reactive({
  page: 1,
  limit: 8,
  pageAll: 10,
  way: "",
  客户编号: "",
  客户姓名: "",
  性别: "",
  电话号码: "",
  总消费: "",
  星级: "",
  content: "",
});
const inintListParams = () => {
  listParams.content = "";
  listParams.page = 1;
  listParams.limit = 8;
  listParams.way = "";
  listParams.客户编号 = "";
  listParams.客户姓名 = "";
  listParams.性别 = "";
  listParams.电话号码 = "";
  listParams.总消费 = "";
  listParams.星级 = "";
  // listParams.pageAll = 10;
};
const handleCurrentChange = (page: number) => {
  listParams.page = page;
  loadList();
};
const loadList = async () => {
  const data = await getCustomer(listParams);
  list.value = data.data.data;
  listParams.pageAll = data.data.pageAll;
  //   listCount.value = data.count;
};
const handleUpdate = (ID: number) => {
  customerID.value = ID;
  isBan.value = true;
  formVisible.value = true;
};
const handleFormSuccess = () => {
  formVisible.value = false;
  loadList();
};
const handleDelete = async (item: number) => {
  await deleteCustomer(item);
  ElMessage.success("删除成功");
  loadList();
};
const handleFailed = () => {
  ElMessage.error("编号重复，请修正！");
};
const handleQuery = async () => {
  listParams.page = 1;
  if (listParams.way == "客户编号") {
    listParams.客户编号 = listParams.content;
    console.log(listParams.way);
  } else {
    listParams.客户姓名 = listParams.content;
    console.log(listParams.way);
  }
  loadList().then(() => {
    inintListParams();
  });
  console.log(listParams);
};
</script>

<style lang="scss" scoped></style>
