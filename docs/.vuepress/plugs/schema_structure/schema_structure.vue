<template>
  <div class="tool-container">
    <div class="input-section">
      <label for="jsonInput">请粘贴表单结构 JSON：</label>
      <textarea 
        id="jsonInput" 
        v-model="jsonInput" 
        placeholder="请粘贴表单结构 JSON 内容..."
        rows="15"
        class="textarea-field"
      ></textarea>
    </div>

    <div class="button-group">
      <button @click="parseJSON" class="primary-btn">解析 JSON</button>
      <button @click="copyResult" class="secondary-btn" :class="{ 'success-btn': copyStatus }" :disabled="!result || copyStatus">
        {{ copyStatus ? "√复制成功" : "复制结果" }}
      </button>
      <button @click="downloadResult" class="warning-btn" :disabled="!result">下载文件</button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="result" class="result-section">
      <h3>解析结果：</h3>
      <pre class="result-content">{{ result }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import copy from 'copy-to-clipboard'
import { parseSchemaJSON, extractSchemaNameFromResult } from './parser'
import exampleSchema from './exampleSchema.json'

const jsonInput = ref('')
const result = ref('')
const error = ref('')
const copyStatus = ref(false)

// 页面加载时填充示例数据
onMounted(() => {
  jsonInput.value = JSON.stringify(exampleSchema, null, 2)
})

/**
 * 解析 JSON 并生成字段表
 */
function parseJSON(): void {
  error.value = ''
  result.value = ''

  // 验证输入
  if (!jsonInput.value.trim()) {
    error.value = '请粘贴 JSON 内容'
    return
  }

  try {
    result.value = parseSchemaJSON(jsonInput.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
  }
}

/**
 * 复制结果到剪贴板
 */
function copyResult(): void {
  if (!result.value || copyStatus.value) {
    return
  }

  const r = copy(result.value)
  if (r) {
    copyStatus.value = true
    setTimeout(() => {
      copyStatus.value = false
    }, 2000)
  }
}

/**
 * 下载结果为文件
 */
function downloadResult(): void {
  if (!result.value) return

  const schemaName = extractSchemaNameFromResult(result.value)

  const blob = new Blob([result.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${schemaName}_字段表.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped lang="scss">
@use '../common-tools.scss' as *;
</style>