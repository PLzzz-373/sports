<template>
  <el-dialog
    title="编辑订单"
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
      <el-form-item label="商品名称" prop="商品名称">
        <el-input
          v-model="formData.商品名称"
          placeholder="请输入商品名称"
          :disabled="isBan"
        />
      </el-form-item>
      <el-form-item label="收款" prop="收款">
        <el-input v-model="formData.收款" placeholder="请输入收款" />
      </el-form-item>
      <el-form-item label="品牌" prop="品牌">
        <el-input
          v-model="formData.品牌"
          placeholder="请输入品牌"
          :disabled="isBan"
        />
      </el-form-item>
      <el-form-item label="收货人" prop="收货人">
        <el-input v-model="formData.收货人" placeholder="请输入收货人" />
      </el-form-item>
      <el-form-item label="收货地址" prop="收货地址">
        <el-input
          v-model="formData.收货地址"
          placeholder="请输入收货地址"
          :disabled="isBan"
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
import { getRoles } from "@/api/orderlist";
import { updateOrderlist } from "@/api/orderlist";
const props = defineProps({
  orderId: {
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
  (e: "update:order-id", value: number | null): void;
  (e: "success"): void;
  (e: "failed"): void;
  (e: "update:is-ban", value: boolean): void;
}

const emit = defineEmits<EmitsType>();

const form = ref<IElForm | null>(null);
const formLoading = ref(false);
const formData = ref({
  订单编号: 0,
  商品名称: "",
  收款: "",
  品牌: "",
  收货人: "",
  收货地址: "",
});
const formRules: IFormRule = {
  收款: [{ required: true, message: "请输入收款金额", trigger: "blur" }],
  收货人: [{ required: true, message: "请输入收货人", trigger: "blur" }],
};

const dialog = ref<IElDialog | null>(null);
const handleOpen = async () => {
  await loadRoles();
  console.log(props.orderId);
};
const loadRoles = async () => {
  const data = await getRoles(<number>props.orderId);
  console.log(data);
  formData.value = data;
};

const handleSubmmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  //更新管理员
  await updateOrderlist(<number>props.orderId, formData.value);
  emit("success");
  ElMessage.success("保存成功");
};

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false;
  }
};

const handleClosed = () => {
  emit("update:order-id", null);
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
