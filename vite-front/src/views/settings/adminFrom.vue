<template>
  <el-dialog
    :title="props.adminId ? '编辑管理员' : '添加管理员'"
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
      <el-form-item label="管理员编号" prop="ID">
        <el-input
          v-model="formData.ID"
          placeholder="请输入管理员编号"
          :disabled="isBan"
        />
      </el-form-item>
      <el-form-item label="管理员账号" prop="username">
        <el-input v-model="formData.username" placeholder="请输入管理员账号" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="passwd">
        <el-input
          v-model="formData.passwd"
          type="password"
          placeholder="请输入管理员密码"
        />
      </el-form-item>
      <el-form-item label="管理员姓名" prop="nickname">
        <el-input v-model="formData.nickname" placeholder="请输入管理员姓名" />
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
import { getRoles } from "@/api/admin";
import { createAdmin, updateAdmin } from "@/api/admin";
const props = defineProps({
  adminId: {
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
  (e: "update:admin-id", value: number | null): void;
  (e: "success"): void;
  (e: "failed"): void;
  (e: "update:is-ban", value: boolean): void;
}

const emit = defineEmits<EmitsType>();

const form = ref<IElForm | null>(null);
const formLoading = ref(false);
const formData = ref({
  ID: 0,
  username: "",
  passwd: "",
  nickname: "",
  position: "",
  token: "",
});
const formRules: IFormRule = {
  username: [{ required: true, message: "请输入管理员账号", trigger: "blur" }],
  passwd: [{ required: true, message: "请输入管理员密码", trigger: "blur" }],
  ID: [{ required: true, message: "请输入管理员编号", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入管理员姓名", trigger: "blur" }],
};

const dialog = ref<IElDialog | null>(null);
const handleOpen = async () => {
  await loadRoles();
};
const loadRoles = async () => {
  if (!props.adminId) {
    return;
  }
  const data = await getRoles(props.adminId);
  formData.value = data;
};

const handleSubmmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return;
  }
  if (props.adminId) {
    //更新管理员
    const result = await updateAdmin(props.adminId, formData.value);
    if (result.data.code == 1000) {
      ElMessage.error(result.data.message);
      return;
    }
  } else {
    const result = await createAdmin(formData.value);
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
  emit("update:admin-id", null);
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
