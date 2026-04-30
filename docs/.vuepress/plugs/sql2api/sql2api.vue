<template>
    <div class="tool-container">
        <div class="input-section">
            <label for="sqlInput">请输入要转换的SELECT语句：</label>
            <textarea 
                id="sqlInput"
                placeholder="请在此处输入要转换的SELECT语句..." 
                v-model="sql"
                rows="10"
                class="textarea-field"
            ></textarea>
        </div>

        <div class="button-group">
            <button @click="generate" class="primary-btn">生成LoadBizObjects接口请求JSON</button>
            <button class="secondary-btn" :class="{ 'success-btn': copyStatus }" @click="copyResult" :disabled="!outputContent || copyStatus">
                {{ copyStatus ? "√复制成功" : "点我复制结果" }}
            </button>
        </div>

        <div v-if="outputError" class="error-message">
            {{ outputContent }}
        </div>

        <div v-if="outputContent && !outputError" class="result-section">
            <h3>输出区域：</h3>
            <pre class="result-content">{{ outputContent }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AST, Parser, Select } from 'node-sql-parser';
import copy from 'copy-to-clipboard';

import generateApiRequest from './parser.ts';
// @ts-ignore
import exampleSQL from './exampleSQL.sql?raw';

const sql = ref(exampleSQL);
const outputContent = ref('');
const outputError = ref(false);
const copyStatus = ref(false);

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
    } catch (Error: unknown) {
        outputContent.value = (Error as Error).message;
        outputError.value = true;
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