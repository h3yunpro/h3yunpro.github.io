/**
 * llms.txt 链接修复脚本
 * 
 * 作用：修复 vuepress-theme-plume 主题生成的 llms.txt 文件中的链接格式问题
 * 
 * 问题描述：
 * vuepress-theme-plume 主题的 llmstxt 功能存在已知 bug，生成的链接会包含 `/index.md` 后缀，
 * 例如：https://h3yunpro.github.io/docs/automation/index.md
 * 这导致访问时出现 404 错误，因为正确的链接应该是：https://h3yunpro.github.io/docs/automation/
 * 
 * 解决方案：
 * 在 VuePress 构建完成后自动运行此脚本，将所有 `/xxx/index.md` 格式的链接替换为 `/xxx/`
 * 
 * 使用方法：
 * 在 package.json 的 docs:build 命令后添加：&& node fix-llms-links.js
 * 
 * 注意：
 * 这是一个临时解决方案，直到 vuepress-theme-plume 主题官方修复此 bug。
 * 如果将来主题更新了，可以删除此文件并移除构建命令中的相关调用。
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const llmsFilePath = path.join(__dirname, 'docs/.vuepress/dist/llms.txt')

if (fs.existsSync(llmsFilePath)) {
  let content = fs.readFileSync(llmsFilePath, 'utf-8')
  
  // 修复链接：将 /xxx/index.md 替换为 /xxx/
  content = content.replace(/\/([\w-]+)\/index\.md/g, '/$1/')
  
  fs.writeFileSync(llmsFilePath, content, 'utf-8')
  console.log('✅ Fixed llms.txt links')
} else {
  console.log('⚠️ llms.txt not found')
}
