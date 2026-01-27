import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "藏鲸阁",
  tagline: "只见广厦千万，不见寒士欢颜。",
  favicon: "img/favicon.ico",
  url: "https://makainb.com",
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "makainb", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  deploymentBranch: "gh-pages",

  markdown: {
    mermaid: true,
    hooks:{
      onBrokenMarkdownLinks: 'warn',
    }
    
  },
  themes: ["@docusaurus/theme-mermaid"],

  onBrokenLinks: "warn",

  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          remarkPlugins: [remarkMath, remarkBreaks, remarkBreaks],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          remarkPlugins: [remarkMath, remarkBreaks, remarkBreaks],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "ignore", // warn
          onInlineAuthors: "ignore",// warn
          onUntruncatedBlogPosts: "ignore",// warn
          showReadingTime: true,
          blogTitle: "周报汇总",
          blogListComponent: "@theme/BlogListPage", // 你可以自定义这个组件
          blogDescription: "记录每周的成长与思考",
          // 这里的配置决定汇总页的样子
          blogSidebarTitle: "近期周报",
          blogSidebarCount: "ALL", // 侧边栏显示所有周报
          postsPerPage: 10, // 每页显示几篇
        },
        // 3. 重点：在这里配置 src/pages 的 Markdown 插件
        pages: {
          remarkPlugins: [remarkMath, remarkBreaks, remarkBreaks],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://fastly.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "藏鲸阁",
        items: [
          // {label: '编程语言', type: 'docSidebar', sidebarId: 'langSidebar', position: 'left'},
          {
            label: 'Spring', 
            position: 'left', 
            type: 'dropdown',
            items: [
              // {label: 'Spring 全家桶', type: 'docSidebar', sidebarId: 'springSidebar'}, // 指向整个 Spring 侧边栏
              {label: 'Spring Security', to: '/docs/Spring/SpringSecurity/intro'}, // 直接跳转到具体的 SpringSecurity 入口
            ],
          },
          // {label: '计算机基础', type: 'docSidebar', sidebarId: 'csSidebar', position: 'left'},
          // {label: '中间件', type: 'docSidebar', sidebarId: 'middlewareSidebar', position: 'left'},
          // {label: '部署', type: 'docSidebar', sidebarId: 'deploySidebar', position: 'left'},
          // {label: '工具', type: 'docSidebar', sidebarId: 'toolsSidebar', position: 'left'},
          // {label: '项目管理', type: 'docSidebar', sidebarId: 'projectSidebar', position: 'left'},
          // {label: '周报', to: '/weekly', position: 'right'},
          {
            label: '架构', 
            position: 'left', 
            type: 'dropdown',
            items: [
              // {label: 'Spring 全家桶', type: 'docSidebar', sidebarId: 'springSidebar'}, // 指向整个 Spring 侧边栏
              {label: '前端架构-Matrix', to: '/docs/Matrix/frontend/intro', sidebarId: 'matrixFrontend'}, // 直接跳转到具体的 SpringSecurity 入口
            ],
          },
          {label: '周报', to: '/blog', position: 'right'},
          {label: '关于', to: '/about', position: 'right'},
        ],
      
      },

      prism: {
        theme: prismThemes.vsDark,
        magicComments: [
          {
            className: "code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "code-block-add-line",
            line: "highlight-add-line",
            block: { start: "highlight-add-start", end: "highlight-add-end" },
          },
          {
            className: "code-block-update-line",
            line: "highlight-update-line",
            block: {
              start: "highlight-update-start",
              end: "highlight-update-end",
            },
          },
          {
            className: "code-block-error-line",
            line: "highlight-error-line",
            block: {
              start: "highlight-error-start",
              end: "highlight-error-end",
            },
          },
        ],
        additionalLanguages: ["java", "json"],
      },
    }),
};

export default config;
