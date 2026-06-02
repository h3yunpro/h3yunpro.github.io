<template>
  <div class="tool-container">
    <div class="tab-container">
      <!-- Tab 头部 -->
      <div class="tab-header">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'input' }"
          @click="activeTab = 'input'"
        >
          输入
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'output' }"
          @click="activeTab = 'output'"
        >
          输出
        </div>
      </div>

      <!-- Tab 内容 -->
      <div class="tab-content">
        <!-- 输入 Tab -->
        <div v-if="activeTab === 'input'" class="input-section">
          <div class="input-header">
            <label for="jsonInput">请粘贴表单结构 JSON：</label>
            <div class="button-group">
              <button @click="parseJSON" class="primary-btn">解析 JSON</button>
            </div>
          </div>
          <textarea 
            id="jsonInput" 
            v-model="jsonInput" 
            placeholder="请粘贴表单结构 JSON 内容..."
            rows="15"
            class="textarea-field"
          ></textarea>
        </div>

        <!-- 输出 Tab -->
        <div v-if="activeTab === 'output'">
          <div class="output-header">
            <div class="output-title">
              <h3>解析结果：</h3>
              <span v-if="fileName" class="file-name" @click="copyFileName" :title="'点击复制文件名'">
                {{ fileName }}_字段表.md
                <span v-if="copyFileNameStatus" class="copy-hint">√</span>
              </span>
            </div>
            <div class="button-group">
              <button @click="copyResult" class="secondary-btn" :class="{ 'success-btn': copyStatus }" :disabled="!result || copyStatus">
                {{ copyStatus ? "√复制成功" : "复制结果" }}
              </button>
              <button @click="downloadResult" class="warning-btn" :disabled="!result">下载文件</button>
            </div>
          </div>
          <div class="result-section">
            <div v-if="error" class="error-message">
              {{ error }}
            </div>
            <pre v-else class="result-content">{{ result }}</pre>
          </div>
        </div>
      </div>
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
const activeTab = ref<'input' | 'output'>('input')
const fileName = ref('')
const copyFileNameStatus = ref(false)

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
  fileName.value = ''

  // 验证输入
  if (!jsonInput.value.trim()) {
    error.value = '请粘贴 JSON 内容'
    // 验证失败时也切换到输出 Tab
    activeTab.value = 'output'
    return
  }

  try {
    result.value = parseSchemaJSON(jsonInput.value)
    // 提取文件名
    fileName.value = extractSchemaNameFromResult(result.value)
    // 解析成功后自动切换到输出 Tab
    activeTab.value = 'output'
  } catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
    // 发生错误时也切换到输出 Tab
    activeTab.value = 'output'
  }
}

/**
 * 复制文件名到剪贴板
 */
function copyFileName(): void {
  if (!fileName.value || copyFileNameStatus.value) {
    return
  }

  const fullFileName = `${fileName.value}_字段表.md`
  const r = copy(fullFileName)
  if (r) {
    copyFileNameStatus.value = true
    setTimeout(() => {
      copyFileNameStatus.value = false
    }, 2000)
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
  link.download = `${schemaName}_字段表.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped lang="scss">
@use '../common-tools.scss' as *;
</style>