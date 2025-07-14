// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';



// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '凉皮店主',
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
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '藏鲸阁',
        // logo: {
        //   alt: '网站 Logo',
        //   src: 'img/logo.jpg',
        // },
        items: [
          // {label: '文档',type: 'docSidebar',sidebarId: 'tutorialSidebar'},
          { label: '导航', sidebarId:'allSidebar', to: '/docs/intro',},
          // { label: 'Java', sidebarId:'javaSidebar', to: '/docs/java/intro',},
          { label: '算法', to: '/docs/algorithm/intro',sidebarId:'algorithmSidebar',},
          { label: '工具', sidebarId:'toolsSidebar', to: '/docs/tools/jetbrains-idea',},
          // { label: 'MOM文档', sidebarId:'momSidebar', to: '/docs/mom/use/base-tools',},
          {
            label:'DevOps',
            type: 'dropdown',
            items: [

              // 分隔符
              { type: 'html', value: '<b>项目管理</b>', className: 'dropdown-archived-versions',},
              { to: '/docs/devops/jira/intro', label: 'Jira',},

              { type: 'html', value: '<b>文档管理</b>', className: 'dropdown-archived-versions',},
              { to: '/docs/confluence/intro', label: 'Confluence',},

              { type: 'html', value: '<b>代码管理</b>', className: 'dropdown-archived-versions',},
              // { to: '/about/todo', label: 'Gitlab',},
              // { to: '/about/todo', label: 'Gitea',},

              { type: 'html', value: '<b>制品管理</b>', className: 'dropdown-archived-versions',},
              { to: '/docs/nexus/intro', label: 'Nexus',},

              { type: 'html', value: '<b>持续集成</b>', className: 'dropdown-archived-versions',},
              // { to: '/about/todo', label: 'Drone',},
              // { to: '/about/todo', label: 'Jenkins',},
              // { to: '/about/todo', label: 'Tekton',},

              { type: 'html', value: '<b>质量检查</b>', className: 'dropdown-archived-versions',},
              // { to: '/about/todo', label: 'Sonarcube',},

              { type: 'html', value: '<b>持续部署</b>', className: 'dropdown-archived-versions',},
              // { to: '/about/todo', label: 'ArgoCD',},
              // { to: '/about/todo', label: 'KubeVela',},
              // { to: '/about/todo', label: 'Zadig',},
              
            ],
          },


          // { label: '博客', position: 'right', to: '/blog'},
          { label: '博客', position: 'right', to: '/blog/archive',},


          /*
          {
            type: 'dropdown',
            label: 'Community',
            position: 'left',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com',
              },
              {
                // label: 'Facebook',
                // href: 'https://www.facebook.com',
                type: 'doc',
                label: 'Social',
                docId: 'java/intro',
              },
              // ... more items
            ],
          },

          */


          {
            label:'关于',
            type: 'dropdown',
            position: 'right',
            items: [
              // 分隔符
              { to: '/about/aboutme', label: '关于我',},
              { to: '/about/aboutsite', label: '关于本站', },

              // { type: 'html', value: '<hr class="dropdown-separator">',},           
              // { type: 'html', value: '<hr class="dropdown-separator">',},
              // // 分组名
              // { type: 'html', value: '<b>Archived versions</b>', className: 'dropdown-archived-versions',},
              
            ],
          },


        ],
      },

      /*
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      */
      // prism: {
      //   theme: prismThemes.github,
      //   darkTheme: prismThemes.dracula,
      // },
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
        // languages enabled by default: https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L23
        // prism supported languages: https://prismjs.com/#supported-languages
        additionalLanguages: [
          'java',
          'json',
        ],
      },
    }),
};

export default config;
