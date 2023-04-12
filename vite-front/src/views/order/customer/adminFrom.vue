<template>
  <el-dialog
    :title="props.customerId ? '编辑客户' : '添加客户'"
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
      <el-form-item label="客户编号" prop="客户编号">
        <el-input
          v-model="formData.客户编号"
          placeholder="请输入客户编号"
          :disabled="isBan"
        />
      </el-form-item>
      <el-form-item label="客户姓名" prop="客户姓名">
        <el-input v-model="formData.客户姓名" placeholder="请输入客户姓名" />
      </el-form-item>
      <el-form-item label="性别" prop="性别">
        <el-input v-model="formData.性别" placeholder="请输入性别" />
      </el-form-item>
      <el-form-item label="电话号码" prop="电话号码">
        <el-input v-model="formData.电话号码" placeholder="请输入电话号码" />
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
import { getRoles } from "@/api/customer";
import { createCustomer, updateCustomer } from "@/api/customer";
const props = defineProps({
  customerId: {
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
  (e: "update:customer-id", value: number | null): void;
  (e: "success"): void;
  (e: "failed"): void;
  (e: "update:is-ban", value: boolean): void;
}

const emit = defineEmits<EmitsType>();

const form = ref<IElForm | null>(null);
const formLoading = ref(false);
const formData = ref({
  客户编号: 0,
  客户姓名: "",
  性别: "",
  电话号码: "",
  总消费: 0,
  星级: "",
});
const formRules: IFormRule = {
  客户姓名: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
  性别: [{ required: true, message: "请输入性别", trigger: "blur" }],
  电话号码: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
};

const dialog = ref<IElDialog | null>(null);
const handleOpen = async () => {
  await loadRoles();
};
const loadRoles = async () => {
  if (!props.customerId) {
    return;
  }
  const data = await getRoles(props.customerId);
  formData.value = data;
};

const handleSubmmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  if (props.customerId) {
    //更新客户
    const result = await updateCustomer(props.customerId, formData.value);
    if (result.data.code == 1000) {
      ElMessage.error(result.data.message);
      return;
    }
  } else {
    const result = await createCustomer(formData.value);
    if (result.data.code == 1000) {
      emit("failed");
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
  emit("update:customer-id", null);
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
