import { defineCollections, defineCollection } from 'vuepress-theme-plume'

const docsNote = defineCollection({
  type: 'doc',
  title: '文档',
  dir: 'docs',
  linkPrefix: '/docs/',
  sidebar: [{
    text: '基础',
    prefix: '/',
    icon: 'vscode-icons:file-type-chef-cookbook',
    collapsed: true,
    items: [
      '/docs/language/',
      '/docs/dev-tools/',
      '/docs/noun/',
      '/docs/check-code/',
      '/docs/form-events/',
      '/docs/list-events/'
    ]
  }, {
    text: '前端API',
    prefix: '/',
    icon: 'vscode-icons:file-type-js',
    collapsed: true,
    items: [
      '/docs/form-js-api/',
      '/docs/form-js-set-get/',
      '/docs/list-js-api/',
      '/docs/js-instance/'
    ]
  }, {
    text: '后端API',
    prefix: '/',
    icon: 'vscode-icons:file-type-csharp',
    collapsed: true,
    items: [
      '/docs/biz-object/',
      '/docs/bo-set-get/',
      '/docs/organization/',
      '/docs/workflow/',
      '/docs/notification/',
      '/docs/timer/',
      '/docs/exec-sql/',
      '/docs/cs-json/',
      '/docs/cs-instance/'
    ]
  }, {
    text: '数据库',
    prefix: '/',
    icon: 'vscode-icons:file-type-plsql',
    collapsed: true,
    items: [
      '/docs/sql-report/',
      '/docs/sql-dashboard/',
      '/docs/database/'
    ]
  }, {
    text: '代码示例',
    prefix: '/',
    icon: 'vscode-icons:file-type-affinitydesigner',
    collapsed: true,
    items: [
      '/docs/js-example/',
      '/docs/cs-example/',
      '/docs/interactive-example/',
      '/docs/sql-example/',
      '/docs/pure-example/',
      '/docs/tool-function/'
    ]
  }, {
    text: '第三方系统集成',
    prefix: '/',
    icon: 'vscode-icons:file-type-rnc',
    collapsed: true,
    items: [
      '/docs/req-ws/',
      '/docs/req-api/',
      {
        text: '第三方调用氚云OpenApi',
        link: 'https://h3yun-pro-doc-openapi.apifox.cn/'
      }
    ]
  }, {
    text: '其他',
    prefix: '/',
    icon: 'vscode-icons:file-type-rust-toolchain',
    collapsed: true,
    items: [
      '/docs/automation/',
      '/docs/standard/',
      '/docs/faq/'
    ]
  }]
})

const blogNote = defineCollection({
  type: 'post',
  title: '博客',
  dir: 'blog',
  linkPrefix: '/blog/',
})

export const collections = defineCollections([docsNote, blogNote])