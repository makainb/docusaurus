---
title: 响应式Hooks
draft: true
sidebar_class_name: hidden-sidebar-item
---



### 3. `hooks/` — 响应式逻辑与状态管理

**设计原则：逻辑复用，自动化状态处理。**

* **职责**：
* **`useRequest.js`**：你最核心的 Hook，自动管理 Loading 状态、错误弹窗、全屏遮罩。
* **`useAuth.js`**：封装按钮级权限校验逻辑。
* **`useTable.js`**：封装 VxeTable 的分页、自动查询等重复逻辑。


* **为什么放在这？**：它们必须在 Vue 的 `setup` 生命周期内使用，利用 `ref/computed` 帮开发者把“脏活”干完。

### 4. `components/` — 增强型基础组件

**设计原则：透明代理，UI 标准化。**

* **职责**：
* **`BaseTable`**：基于 VxeTable，预设好工厂报表所需的边框、虚拟滚动、导出配置。
* **`BaseButton`**：基于 ElButton，扩展 `kShow/kHide`（转圈）和权限控制。
* **`BaseTree`**：基于 ElTree，封装工厂层级（车间-产线-工位）的树形展示。


* **为什么放在这？**：为了保持 UI 高度统一，子应用禁止直接调用原生 Element。
