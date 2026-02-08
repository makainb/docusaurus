---
title: 核心工具与无状态封装
draft: true
sidebar_class_name: hidden-sidebar-item
---

设计原则：单例、无状态、全局唯一。

职责：

http.js：基于 Axios 的基础封装（拦截器、Token 注入、401 处理）。它是整个系统的通信兵。

loading.js：刚才封装的 globalLoading 变量，提供命令式调用。

bus.js（可选）：跨组件通信的事件总线。

为什么放在这？：这些工具不依赖 Vue 的 setup 环境，在任何 .js 或 .vue 文件里 import 就能用。

没关系，这是好事！说明我们的架构正在从“雏形期”走向“标准化成熟期”。

你目前的目录结构（`utils`, `plugins`, `hooks`, `components`）其实非常符合 **Vue 生态的直觉**。我们不需要推翻它，只需要把各部分的**职责（Mission Statement）**定死，这就是最稳固的架构。

以下是根据你现有目录整理的 **Matrix-SDK 开发手册（培训版）**，每一块都清晰定义了“脏活累活”该往哪扔。

---

## 🏗️ Matrix 前端中台：各目录设计原则

### 1. `utils/` — 核心工具与无状态封装

**设计原则：单例、无状态、全局唯一。**

* **职责**：
* **`http.js`**：基于 Axios 的基础封装（拦截器、Token 注入、401 处理）。它是整个系统的通信兵。
* **`loading.js`**：刚才封装的 `globalLoading` 变量，提供命令式调用。
* **`bus.js`**（可选）：跨组件通信的事件总线。


* **为什么放在这？**：这些工具不依赖 Vue 的 `setup` 环境，在任何 `.js` 或 `.vue` 文件里 `import` 就能用。


## 2. 核心 SDK 手册 (The `mk` SDK)

**目标：** 详细说明 `utils` 和 `plugins` 的用法，这是开发者每天都要打交道的地方。

* **Http 请求 (`utils/http`)**：
* 拦截器逻辑说明。
* 如何配置开发环境的反向代理。


* **全局状态与变量**：
* `globalLoading`：如何手动控制全屏遮罩。


* **国际化 (`plugins/i18n`)**：
* 如何新增语言包。
* 子应用如何动态合并语言包。
