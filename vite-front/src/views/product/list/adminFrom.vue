<template>
  <el-dialog
    :title="props.goodsId ? '详情' : '添加商品'"
    ref="dialog"
    @open="handleOpen"
    @closed="handleClosed"
    :confirm="handleSubmmit"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="商品编号" prop="商品编号">
        <el-input
          v-model="formData.商品编号"
          placeholder="请输入商品编号"
          :disabled="isBan"
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="商品名称">
        <el-input v-model="formData.商品名称" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="出厂年份" prop="出厂年份">
        <el-input v-model="formData.出厂年份" placeholder="请输入出厂年份" />
      </el-form-item>
      <el-form-item label="价格" prop="价格">
        <el-input v-model="formData.价格" placeholder="请输入价格" />
      </el-form-item>
      <el-form-item label="供应商编号" prop="供应商编号">
        <el-input
          v-model="formData.供应商编号"
          placeholder="请输入供应商编号"
          :disabled="isBan"
        />
      </el-form-item>
      <el-form-item label="品牌" prop="品牌">
        <el-input v-model="formData.品牌" placeholder="请输入品牌" />
      </el-form-item>
      <el-form-item label="公司地址" prop="公司地址">
        <el-input v-model="formData.公司地址" placeholder="请输入公司地址" />
      </el-form-item>
      <el-form-item label="公司电话" prop="公司电话">
        <el-input v-model="formData.公司电话" placeholder="请输入公司电话" />
      </el-form-item>
      <el-form-item label="公司联系人" prop="公司联系人">
        <el-input
          v-model="formData.公司联系人"
          placeholder="请输入公司联系人"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { PropType } from "vue";
import type { IElDialog, IElForm, IFormRule } from "@/types/element-plus";
import { ElMessage } from "element-plus";
import { getRoles } from "@/api/goods";
import { createGoods, updateGoods } from "@/api/goods";
const props = defineProps({
  goodsId: {
    // 编辑的管理员 ID
    type: Number as PropType<number | null>,
    default: null,
  },
  isBan: {
    type: Boolean,
    default: false,
  },
});

interface EmitsType {
  (e: "update:goods-id", value: number | null): void;
  (e: "success"): void;
  (e: "failed"): void;
  (e: "update:is-ban", value: boolean): void;
}

const emit = defineEmits<EmitsType>();

const form = ref<IElForm | null>(null);
const formLoading = ref(false);
const formData = ref({
  商品编号: 0,
  商品名称: "",
  出厂年份: 0,
  价格: 0,
  供应商编号: 0,
  品牌: "",
  公司地址: "",
  公司电话: "",
  公司联系人: "",
});

const formRules: IFormRule = {
  商品编号: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
  商品名称: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  出厂年份: [{ required: true, message: "请输入出厂年份", trigger: "blur" }],
  价格: [{ required: true, message: "请输入价格", trigger: "blur" }],
  供应商编号: [
    { required: true, message: "请输入供应商编号", trigger: "blur" },
  ],
  品牌: [{ required: true, message: "请输入品牌", trigger: "blur" }],
  公司地址: [{ required: true, message: "请输入公司地址", trigger: "blur" }],
  公司电话: [{ required: true, message: "请输入公司电话", trigger: "blur" }],
  公司联系人: [
    { required: true, message: "请输入公司联系人", trigger: "blur" },
  ],
};

const dialog = ref<IElDialog | null>(null);
const handleOpen = async () => {
  await loadRoles();
};
const loadRoles = async () => {
  if (!props.goodsId) {
    return;
  }
  const data = await getRoles(props.goodsId);
  formData.value = data;
};

const handleSubmmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  if (props.goodsId) {
    const result = await updateGoods(props.goodsId, formData.value);
    if (result.data.code == 1000) {
      ElMessage.error(result.data.message);
      return;
    }
  } else {
    const result = await createGoods(formData.value);
    if (result.data.code == 1000) {
      ElMessage.error(result.data.message);
      return;
    }
  }
  emit("success");
  ElMessage.success("保存成功");
};

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false;
  }
};

const handleClosed = () => {
  emit("update:goods-id", null);
  emit("update:is-ban", false);
  form.value?.clearValidate();
  form.value?.resetFields();
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
