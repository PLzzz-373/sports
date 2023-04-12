<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { IElDialog } from '@/types/element-plus'

// interface EmitsType {
//   (e: 'confirm'): void
// }

// const emit = defineEmits<EmitsType>()
const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<void>>,
    default: () => Promise.resolve()
  }
})

const dialog = ref<IElDialog | null>(null)
const confirmLoading = ref(false)

const handleCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}

const handleConfirm = async () => {
  confirmLoading.value = true
  // emit('confirm')
  await props.confirm().finally(() => {
    confirmLoading.value = false
  })
}
</script>

<style lang="scss" scoped></style>
