import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';



// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '写代码的说唱诗人',
  tagline: '只见广厦千万，不见寒士欢颜。',
  favicon: 'img/favicon.ico',
  url: 'https://makainb.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'makainb', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMath, remarkBreaks],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: false,
          remarkPlugins: [remarkMath, remarkBreaks],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        // 3. 重点：在这里配置 src/pages 的 Markdown 插件
        pages: {
          remarkPlugins: [remarkMath, remarkBreaks],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://fastly.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '藏鲸阁',
        items: [
          {
            label:'Spring',
            type: 'dropdown',
            items: [

              // 分隔符
              { type: 'html', value: '<b>SpringBoot新特性</b>', className: 'dropdown-archived-versions',},
              { to: '/docs/spring/boot-feat7/a00', label: 'SpringBoot7新特性',},

            ]
          },

          { label: '博客', position: 'right', to: '/blog/archive',},


          {
            label:'关于',
            type: 'dropdown',
            position: 'right',
            items: [
              // 分隔符
              { to: '/about/aboutme', label: '关于我',},
              { to: '/about/aboutsite', label: '关于本站', },
              
            ],
          },


        ],
      },

      prism: {
        theme: prismThemes.vsDark,
        magicComments: [
          {
            className: 'code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' }
          },
          {
            className: 'code-block-add-line',
            line: 'highlight-add-line',
            block: { start: 'highlight-add-start', end: 'highlight-add-end' }
          },
          {
            className: 'code-block-update-line',
            line: 'highlight-update-line',
            block: { start: 'highlight-update-start', end: 'highlight-update-end' }
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-error-line',
            block: { start: 'highlight-error-start', end: 'highlight-error-end' }
          },
        ],
        additionalLanguages: [
          'java',
          'json',
        ],
      },
    }),
};

export default config;
