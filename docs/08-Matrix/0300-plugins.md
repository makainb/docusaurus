---
title: 外部能力接入与初始化
draft: true
sidebar_class_name: hidden-sidebar-item
---


### 2. `plugins/` — 外部能力接入与初始化

**设计原则：能力注入，一次配置，全局生效。**

* **职责**：
* **`i18n.js`**：负责语言包的加载、合并及切换逻辑。
* **`vxe-table.js`**：负责 VxeTable 的全局默认属性配置、渲染器注册。
* **`element.js`**：Element Plus 的按需引入或全局配置。


* **为什么放在这？**：它们通常在 `main.js` 中通过 `app.use()` 挂载，是架构的“插件接口”。




---

## 3. 响应式 Hooks (Hooks API)

**目标：** 这是架构提效的“黑科技”，需要重点通过代码示例讲解。

* **`useRequest`**：
* **参数说明**：详细列出 `url`, `params`, `axiosOptions`, `uiOptions` 每个字段的作用。
* **最佳实践**：如何配合按钮转圈、如何开启全屏遮罩。


* **`useAuth`**：
* 如何通过权限码控制代码逻辑执行。


* **`useTable`**（如果有）：
* 如何一键绑定 VxeTable 的分页和查询。



---

## 4. 增强组件库 (Components)

**目标：** 类似 Element Plus 的官方文档，展示组件的 Demo 和属性。

* **`BaseButton`**：
* 如何使用 `kShow/kHide`。
* 权限属性 `auth` 的用法。


* **`BaseTable`**：
* **配置驱动**：如何通过一个 JSON 对象定义出复杂的报表。
* **插槽扩展**：如何自定义单元格和工具栏按钮。


* **`BaseForm`**：
* 快速生成搜索区域的配置方法。



---

## 5. 进阶与工程化 (Advanced & DevOps)

**目标：** 给高级开发或架构维护者看，解释底层黑盒。

* **微前端原理**：Vite Module Federation 的配置机制。
* **自动化部署**：如何通过打 Tag 触发 CI/CD 到不同的环境。
* **本地联调**：如何在本地开发时引用远程的 `main-portal` 资源。

---

## 🏗️ Docusaurus 侧边栏配置建议 (`sidebars.js`)

你可以参考这个结构来组织目录：

```javascript
module.exports = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 快速上手',
      items: ['start/install', 'start/config', 'start/standard'],
    },
    {
      type: 'category',
      label: '🛠️ 核心能力 (SDK)',
      items: ['sdk/http', 'sdk/loading', 'sdk/i18n'],
    },
    {
      type: 'category',
      label: '⚓ 逻辑钩子 (Hooks)',
      items: ['hooks/useRequest', 'hooks/useAuth'],
    },
    {
      type: 'category',
      label: '📦 基础组件 (Components)',
      items: ['components/button', 'components/table', 'components/tree'],
    },
    {
      type: 'category',
      label: '🚢 部署与发布',
      items: ['devops/ci-cd', 'devops/docker'],
    },
  ],
};

```

---

## 💡 编写文档的 3 个建议

1. **代码先行**：每一个 API 都要配一个 **"Basic Usage"** 的代码块，开发者最讨厌看长篇大论，最喜欢直接复制。
2. **善用提示框**：Docusaurus 支持 `:::tip` 或 `:::danger`。
* *例：:::danger 警告：严禁在子应用中直接修改 `mk.http` 的拦截器，请在 `axiosOptions` 中通过配置处理。:::*


3. **互动式 Demo**：如果条件允许，可以用 `react-live` 插件让开发者直接在文档里改代码看效果（虽然你的架构是 Vue，但文档可以用静态截图加注释）。

**你的第一篇文档想写哪一部分？如果你决定从最核心的 `useRequest` 开始写，我可以帮你润色一份正式的“文档初稿”供你参考。**