/**
<<<<<<< HEAD
 * llms.txt 和 llms-full.txt 链接修复脚本
 * 
 * 作用：修复 vuepress-theme-plume 主题生成的 llms.txt 和 llms-full.txt 文件中的链接格式问题
=======
 * llms.txt 链接修复脚本
 * 
 * 作用：修复 vuepress-theme-plume 主题生成的 llms.txt 文件中的链接格式问题
>>>>>>> d3db0e796589de359e762546ea05a4bcc8b1eadf
 * 
 * 问题描述：
 * vuepress-theme-plume 主题的 llmstxt 功能存在已知 bug，生成的链接会包含 `/index.md` 后缀，
 * 例如：https://h3yunpro.github.io/docs/automation/index.md
 * 这导致访问时出现 404 错误，因为正确的链接应该是：https://h3yunpro.github.io/docs/automation/
 * 
 * 解决方案：
<<<<<<< HEAD
 * 1. llms.txt：全文替换所有 `/xxx/index.md` 为 `/xxx/`（因为该文件只包含链接列表）
 * 2. llms-full.txt：只修复 YAML frontmatter 中的 url 字段，避免误替换文档正文内容
 *    - 使用精确的正则表达式匹配 `url: '...'` 或 `url: "..."` 格式
 *    - 确保不会修改文档正文中的任何代码示例或链接引用
=======
 * 在 VuePress 构建完成后自动运行此脚本，将所有 `/xxx/index.md` 格式的链接替换为 `/xxx/`
>>>>>>> d3db0e796589de359e762546ea05a4bcc8b1eadf
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

<<<<<<< HEAD
const distDir = path.join(__dirname, 'docs/.vuepress/dist')
const llmsFilePath = path.join(distDir, 'llms.txt')
const llmsFullFilePath = path.join(distDir, 'llms-full.txt')

/**
 * 修复 llms.txt 文件中的链接格式
 * 全文替换所有 /xxx/index.md 为 /xxx/（因为 llms.txt 只包含链接列表）
 * @param {string} filePath - 文件路径
 * @param {string} fileName - 文件名称（用于日志）
 */
function fixLinksInFile(filePath, fileName) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8')
    
    // 修复链接：将 /xxx/index.md 替换为 /xxx/
    const originalContent = content
    content = content.replace(/\/([\w-]+)\/index\.md/g, '/$1/')
    
    // 只有当内容发生变化时才写入文件
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8')
      console.log(`✅ Fixed ${fileName} links`)
    } else {
      console.log(`ℹ️  ${fileName} links are already correct`)
    }
  } else {
    console.log(`⚠️  ${fileName} not found`)
  }
}

/**
 * 修复 llms-full.txt 文件中的链接格式
 * 只修复 YAML frontmatter 中的 url 字段，避免误替换文档正文内容
 * @param {string} filePath - 文件路径
 * @param {string} fileName - 文件名称（用于日志）
 */
function fixLLMSFullFile(filePath, fileName) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8')
    
    // 只修复 YAML frontmatter 中的 url 字段
    // 匹配模式：url: 'https://.../xxx/index.md' 或 url: "https://.../xxx/index.md"
    // 将其替换为：url: 'https://.../xxx/' 或 url: "https://.../xxx/"
    const originalContent = content
    content = content.replace(
      /(url:\s*['"])([^'"]+?)\/([\w-]+)\/index\.md(['"])/g,
      '$1$2/$3/$4'
    )
    
    // 只有当内容发生变化时才写入文件
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8')
      console.log(`✅ Fixed ${fileName} links (frontmatter only)`)
    } else {
      console.log(`ℹ️  ${fileName} links are already correct`)
    }
  } else {
    console.log(`⚠️  ${fileName} not found`)
  }
}

// 修复 llms.txt（全文替换，因为 llms.txt 只包含链接列表）
fixLinksInFile(llmsFilePath, 'llms.txt')

// 修复 llms-full.txt（只修复 frontmatter 中的 url 字段）
fixLLMSFullFile(llmsFullFilePath, 'llms-full.txt')
=======
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
>>>>>>> d3db0e796589de359e762546ea05a4bcc8b1eadf
