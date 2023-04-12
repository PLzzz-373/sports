<template>
  <page-container>
    <el-card>
      <template #header> 用品列表 </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="关键词">
          <el-select placeholder="请选择" clearable v-model="listParams.way">
            <el-option label="商品编号" value="商品编号" />
            <el-option label="商品名称" value="商品名称" />
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
          添加商品
        </el-button>
      </template>
      <el-table stripe style="width: 100%" :data="list">
        <el-table-column prop="商品编号" label="商品编号" />
        <el-table-column prop="商品名称" label="商品名称" />
        <el-table-column prop="出厂年份" label="出厂年份" />
        <el-table-column prop="价格" label="价格" />
        <el-table-column prop="品牌" label="品牌" />
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button type="text" @click="handleUpdate(scope.row.商品编号)">
              详情
            </el-button>
            <el-button type="text" @click="handleBuy(scope.row.商品编号)">
              购买
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.商品编号)"
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
    v-model:goods-id="goodsID"
    v-model:is-ban="isBan"
    @success="handleFormSuccess"
    @failed="handleFailed"
  ></adminFromVue>
  <goodslist
    v-model="formlVisible"
    v-model:lgoods-id="lgoodsID"
    v-model:is-ban="isBan"
    @success="lhandleFormSuccess"
    @failed="handleFailed"
  ></goodslist>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import adminFromVue from "./adminFrom.vue";
import goodslist from "./goodslist.vue";
import type { goods } from "@/api/types/goods";
import { getGoods, deleteGoods, updateGoods } from "@/api/goods";
import { ElMessage } from "element-plus";
import { isBooleanAttr } from "@vue/shared";
const goodsID = ref<number | null>(null);
const lgoodsID = ref<number | null>(null);
const isBan = ref(false);
onMounted(() => {
  loadList();
});
const formVisible = ref(false);
const formlVisible = ref(false);
const list = ref<goods[]>([]);
const listParams = reactive({
  page: 1,
  limit: 8,
  pageAll: 10,
  way: "",
  商品编号: "",
  商品名称: "",
  出厂年份: 0,
  价格: 0,
  供应商编号: "",
  品牌: "",
  公司地址: "",
  公司电话: "",
  公司联系人: "",
  content: "",
});
const inintListParams = () => {
  listParams.content = "";
  listParams.page = 1;
  listParams.limit = 8;
  listParams.way = "";
  listParams.商品编号 = "";
  listParams.商品名称 = "";
  listParams.出厂年份 = 0;
  listParams.价格 = 0;
  listParams.供应商编号 = "";
  listParams.品牌 = "";
  listParams.公司地址 = "";
  listParams.公司电话 = "";
  listParams.公司联系人 = "";
  // listParams.pageAll = 10;
};
const handleCurrentChange = (page: number) => {
  listParams.page = page;
  loadList();
};
const loadList = async () => {
  const data = await getGoods(listParams);
  list.value = data.data.data;
  listParams.pageAll = data.data.pageAll;
  //   listCount.value = data.count;
};
const handleUpdate = (ID: number) => {
  goodsID.value = ID;
  isBan.value = true;
  formVisible.value = true;
};
const handleBuy = (ID: number) => {
  lgoodsID.value = ID;
  isBan.value = true;
  formlVisible.value = true;
};
const handleFormSuccess = () => {
  formVisible.value = false;
  loadList();
};
const lhandleFormSuccess = () => {
  formlVisible.value = false;
};
const handleDelete = async (item: number) => {
  await deleteGoods(item);
  ElMessage.success("删除成功");
  loadList();
};
const handleFailed = () => {
  ElMessage.error("商品编号或供应商编号重复，请修正！");
};
const handleQuery = async () => {
  listParams.page = 1;
  if (listParams.way == "商品编号") {
    listParams.商品编号 = listParams.content;
    console.log(listParams.way);
  } else {
    listParams.商品名称 = listParams.content;
    console.log(listParams.way);
  }
  loadList().then(() => {
    inintListParams();
  });
  console.log(listParams);
};
</script>

<style lang="scss" scoped></style>
