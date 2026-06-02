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
                        <label for="sqlInput">请输入要转换的SELECT语句：</label>
                        <div class="button-group">
                            <button @click="generate" class="primary-btn">生成LoadBizObjects接口请求JSON</button>
                        </div>
                    </div>
                    <textarea 
                        id="sqlInput"
                        placeholder="请在此处输入要转换的SELECT语句..." 
                        v-model="sql"
                        rows="10"
                        class="textarea-field"
                    ></textarea>
                </div>

                <!-- 输出 Tab -->
                <div v-if="activeTab === 'output'">
                    <div class="output-header">
                        <h3>生成结果：</h3>
                        <div class="button-group">
                            <button class="secondary-btn" :class="{ 'success-btn': copyStatus }" @click="copyResult" :disabled="!outputContent || copyStatus">
                                {{ copyStatus ? "√复制成功" : "点我复制结果" }}
                            </button>
                        </div>
                    </div>
                    <div class="result-section">
                        <div v-if="outputError" class="error-message">
                            {{ outputContent }}
                        </div>
                        <pre v-else class="result-content">{{ outputContent }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AST, Parser, Select } from 'node-sql-parser';
import copy from 'copy-to-clipboard';

import generateApiRequest from './parser.ts';
// @ts-ignore
import exampleSQL from './exampleSQL.sql?raw';

const sql = ref(exampleSQL);
const outputContent = ref('');
const outputError = ref(false);
const copyStatus = ref(false);
const activeTab = ref<'input' | 'output'>('input');

function generate() {
    try {
        const sqlStr = sql.value;
        if (!sqlStr) {
            throw new Error('请先输入要转换的SELECT语句');
        }
        if (sqlStr.toUpperCase().indexOf('BETWEEN') >= 0) {
            throw new Error('LoadBizObjects不支持BETWEEN查询');
        }

        const parser = new Parser();
        const astArray = parser.astify(sqlStr, {
            database: 'mysql'
        }); // 解析SQL为AST
        if (!astArray) {
            throw new Error('解析SQL失败');
        }
        if (Array.isArray(astArray)) {
            throw new Error('只支持一条SELECT语句');
        }
        const ast = astArray as AST;
        if (ast.type !== 'select') {
            throw new Error('只支持SELECT语句');
        }
        const select = ast as Select;

        const result = generateApiRequest(select); // 生成API请求JSON
        outputContent.value = JSON.stringify(result, null, 2);
        outputError.value = false;
        // 生成成功后自动切换到输出 Tab
        activeTab.value = 'output';
    } catch (Error: unknown) {
        outputContent.value = (Error as Error).message;
        outputError.value = true;
        // 发生错误时也切换到输出 Tab
        activeTab.value = 'output';
    }
}

//复制结果
function copyResult() {
    if (!outputContent.value || copyStatus.value) {
        return;
    }

    const r = copy(outputContent.value);
    if (r) {
        copyStatus.value = true;
        setTimeout(() => {
            copyStatus.value = false;
        }, 2000);
    }
}
</script>

<style scoped lang="scss">
@use '../common-tools.scss' as *;
</style>