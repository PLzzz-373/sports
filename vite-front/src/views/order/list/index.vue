<template>
  <page-container>
    <el-card>
      <template #header> 订单列表 </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="关键词">
          <el-select placeholder="请选择" clearable v-model="listParams.way">
            <el-option label="商品名称" value="商品名称" />
            <el-option label="收货人" value="收货人" />
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
      <el-table stripe style="width: 100%" :data="list">
        <el-table-column prop="订单编号" label="订单编号" />
        <el-table-column prop="商品名称" label="商品名称" />
        <el-table-column prop="收款" label="收款" />
        <el-table-column prop="品牌" label="品牌" />
        <el-table-column prop="收货人" label="收货人" />
        <el-table-column prop="收货地址" label="收货地址" />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.订单编号)">
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.订单编号)"
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
    v-model:order-id="orderID"
    v-model:is-ban="isBan"
    @success="handleFormSuccess"
  ></adminFromVue>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import adminFromVue from "./adminFrom.vue";
import type { Order } from "@/api/types/orderlist";
import {
  getOrderlist,
  deleteOrderlist,
  updateOrderlist,
} from "@/api/orderlist";
import { ElMessage } from "element-plus";
import { isBooleanAttr } from "@vue/shared";
const orderID = ref<number | null>(null);
const isBan = ref(false);
onMounted(() => {
  loadList();
});
const formVisible = ref(false);
const list = ref<Order[]>([]);
const listParams = reactive({
  content: "",
  page: 1,
  limit: 8,
  pageAll: 10,
  way: "",
  商品名称: "",
  收款: "",
  品牌: "",
  收货人: "",
  收货地址: "",
  订单编号: "",
});
const inintListParams = () => {
  listParams.content = "";
  listParams.商品名称 = "";
  listParams.page = 1;
  listParams.limit = 8;
  listParams.way = "";
  listParams.收款 = "";
  listParams.收货人 = "";
  listParams.品牌 = "";
  listParams.收货地址 = "";
  // listParams.pageAll = 10;
};
const handleCurrentChange = (page: number) => {
  listParams.page = page;
  loadList();
};
const loadList = async () => {
  const data = await getOrderlist(listParams);
  list.value = data.data.data;
  listParams.pageAll = data.data.pageAll;
};
const handleUpdate = (ID: number) => {
  orderID.value = ID;
  console.log(ID);
  isBan.value = true;
  formVisible.value = true;
};
const handleFormSuccess = () => {
  formVisible.value = false;
  loadList();
};
const handleDelete = async (item: number) => {
  await deleteOrderlist(item);
  ElMessage.success("删除成功");
  loadList();
};
const handleQuery = async () => {
  listParams.page = 1;
  if (listParams.way == "商品名称") {
    listParams.商品名称 = listParams.content;
    console.log(listParams.way);
  } else {
    listParams.收货人 = listParams.content;
    console.log(listParams.way);
  }
  loadList().then(() => {
    inintListParams();
  });
  console.log(listParams);
};
</script>

<style lang="scss" scoped></style>
