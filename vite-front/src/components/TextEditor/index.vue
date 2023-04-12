<template>
  <div id="editor" />
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from '@vue/runtime-core'
import E from 'wangeditor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

interface EmitsType {
  (e: 'update:model-value', value: string): void
}

const emit = defineEmits<EmitsType>()

const editor = ref<InstanceType<typeof E> | null>(null)

const unWatchModelValue = watch(() => props.modelValue, () => {
  // 操作 DOM 的方式修改内容
  editor.value?.txt.html(props.modelValue)
  unWatchModelValue() // 取消监视
})

onMounted(() => {
  initEditor()
})

const initEditor = () => {
  editor.value = new E('#editor')

  // 配置 onchange 回调函数
  editor.value.config.onchange = function (newHtml: string) {
    emit('update:model-value', newHtml)
  }

  editor.value.config.zIndex = 500

  editor.value.create()
  // editor.value.txt.html(props.modelValue) // 注意：必须在 create 之后
}
</script>

<style lang="scss" scoped></style>
