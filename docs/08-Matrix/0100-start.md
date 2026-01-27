---
title: 快速上手
draft: true
sidebar_class_name: hidden-sidebar-item
---


## 1. 概览与入门 (Getting Started)

**目标：** 让新入职的同事在 15 分钟内跑通第一个页面。

* **架构初衷**：为什么要搞 `Matrix` 架构？解决什么痛点？（组件，知识点，JS库碎片化、UI 不统一等）。
* **快速上手**：
* 环境准备（Node 版本、Vite 插件）。
* 如何克隆子应用模板。
* 如何关联主基座进行本地调试。


* **开发规范**：Git 提交规范、命名规范（为什么视图要放 `exposed` 目录）。




---

## 💡 培训时如何向组员解释这套“流程”？

你可以用一个**“工单提交”**的例子来说明：

1. **用户点击** `components/BaseButton`。
2. **业务逻辑** 调用 `hooks/useRequest` 发起 POST。
3. **`useRequest`** 内部通过 `utils/loading.js` 开启遮罩，并调用 `utils/http.js` 发送请求。
4. **`utils/http.js`** 发现 Token 过期，通过 `plugins/i18n.js` 获取翻译后的错误提示。
5. **`useRequest`** 拿到结果，自动关闭遮罩，通知业务代码更新数据。

---

## 🛠️ 建议你的 PPT 总结页：

| 目录 | 对应动作 | 给开发者的价值 |
| --- | --- | --- |
| **`utils`** | 调接口、开遮罩 | 屏蔽网络层复杂性，统一报错处理。 |
| **`plugins`** | 换语言、配表格 | 抹平第三方库的配置差异，实现开箱即用。 |
| **`hooks`** | 定义请求、算状态 | **最核心：** 减少 70% 的 `ref` 定义和 `try-catch` 代码。 |
| **`components`** | 写页面、做交互 | **最直观：** 拖拽式开发，界面风格秒变专业。 |

**这个结构已经非常健壮且逻辑自洽了。接下来，你是否需要我帮你针对 `BaseTable` 增加一个“通过 hooks 自动配置”的功能，让它能根据 `useRequest` 返回的 `loading` 自动显示加载动画？**

