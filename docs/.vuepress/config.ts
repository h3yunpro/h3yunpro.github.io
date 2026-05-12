import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { collections } from './collections'

const doc_domain = 'https://h3yunpro.github.io';

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '氚专开发者扩展文档',
  description: '氚云文档,氚云专业版文档,氚云开发者文档,氚云专业版开发者扩展文档',

  head: [
    // 配置站点图标
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    //配置百度分析
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?3ebded631a588622afe51344cf018299";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],

  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  pagePatterns: ['**/*.md', '!**/*.snippet.md', '!.vuepress', '!node_modules'],
  theme: plumeTheme({
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    hostname: doc_domain,

    /* 文档仓库配置，用于 editLink */
    docsRepo: 'https://github.com/h3yunpro/h3yunpro.github.io.git',
    // docsDir: 'docs',
    // docsBranch: '',

    // copyright: {
    //   license: {
    //     name: 'CC-BY-4.0', // 许可证名称
    //     url: 'https://github.com/h3yunpro/h3yunpro.github.io?tab=CC-BY-4.0-1-ov-file#readme' // 许可证地址
    //   },
    //   creation: 'original', // 创作方式
    // },

    /* 开启llm */
    llmstxt: {
      llmsTxt: true, // 是否生成 llms.txt 文件（包含各部分链接的索引文件）
      llmsFullTxt: true, // 是否生成 llms-full.txt 文件（包含所有文档内容的单一合并文件）
      llmsPageTxt: true, // 是否为网站的每个页面生成对 LLM 友好的 Markdown 版本
      stripHTML: true, // 是否从生成的 Markdown 文件中剥离 HTML 标签，以确保 LLM 输入更干净
      filter: (page) => {
        if (page.path.includes('/article/')) {
          return false;
        }
        return true;
      },
      domain: doc_domain,
    },

    /* 页内信息 */
    editLink: false,
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      }
    },
    contributors: true,
    changelog: false,

    collections: collections,
    /**
     * 博客
     * @see https://theme-plume.vuejs.press/config/basic/#blog
     */
    // blog: false, // 禁用博客
    // blog: {
    //   postList: true, // 是否启用文章列表页
    //   tags: true, // 是否启用标签页
    //   archives: true, // 是否启用归档页
    //   categories: true, // 是否启用分类页
    //   postCover: 'right', // 文章封面位置
    //   pagination: 15, // 每页显示文章数量
    // },

    markdown: {
      // codeTree: true,// 启用代码树
    },

    /* 博客文章页面链接前缀 */
    article: '/article/',

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
     */
    autoFrontmatter: {
      permalink: true,  // 是否生成永久链接
      createTime: true, // 是否生成创建时间
      title: true,      // 是否生成标题
    },

    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        themes: { light: 'one-light', dark: 'one-dark-pro' },
        // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        langs: ['c#', 'sql', 'typescript', 'javascript', 'json'],
        twoslash: false, // 启用 twoslash
        whitespace: false, // 启用 空格/Tab 高亮
        lineNumbers: true, // 启用行号
        collapsedLines: true, //折叠代码
        notationDiff: true,//启用差异标记
      },

      /* 本地搜索, 默认启用 */
      // search: true,

      /**
       * Algolia DocSearch
       * 启用此搜索需要将 本地搜索 search 设置为 false
       * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
       */
      // docsearch: {
      //   appId: '',
      //   apiKey: '',
      //   indexName: '',
      // },

      /* 文章字数统计、阅读时间，设置为 false 则禁用 */
      // readingTime: true,

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      // markdownEnhance: {
      //   chartjs: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      // },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      markdownPower: {
        //   pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
        //   caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
        //   plot: true,         // 启用隐秘文本语法 !!xxxx!!
        //   bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
        //   youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
        //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
        //   audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
        icons: true,        // 启用内置图标语法  :[icon-name]:
        //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
        //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
        //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
        //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
        //   npmTo: true,        // 启用 npm-to 容器  ::: npm-to
        //   demo: true,         // 启用 demo 容器  ::: demo
        //   repl: {             // 启用 代码演示容器
        //     go: true,         // ::: go-repl
        //     rust: true,       // ::: rust-repl
        //     kotlin: true,     // ::: kotlin-repl
        //   },
        imageSize: 'all', // 启用 自动填充 图片宽高属性，避免页面抖动
      },

      /**
       * 在 Markdown 文件中导入其他 markdown 文件内容。
       * @see https://theme-plume.vuejs.press/guide/markdown/include/
       */
      // markdownInclude: true,

      /**
       * Markdown 数学公式
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-math/
       */
      // markdownMath: {
      //   type: 'katex',
      // },

      /**
       * 水印
       * @see https://theme-plume.vuejs.press/guide/features/watermark/
       */
      // watermark: true,

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   category: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
  }),
})
