---
title: http工具类
sidebar_position: 1
---

## 介绍
在 Matrix 架构中，所有的后端通信必须统一通过 `utils/http.js` 进行。该模块基于 `axios` 进行了深度定制，集成了身份校验、自动错误拦截、多语言提示以及全屏加载联动。

## 设计目标

* **统一性**：全局共享一个 Axios 实例，确保所有请求的超时时间、BaseURL 一致。
* **安全性**：自动从本地缓存注入 Token，并在 401（授权失效）时强制跳转登录。
* **国际化**：错误弹窗文案根据当前系统语言自动切换。


## 核心配置

`http.js` 默认导出了一个预配置的请求对象，其拦截器逻辑如下：

### 1. 请求拦截器 (Request Interceptor)

每次请求发出前，系统会自动检查 `localStorage`。

* **Header 注入**：自动添加 `Authorization: Bearer <token>`。
* **多语言注入**：自动添加 `Accept-Language` 响应头，确保后端返回的错误信息也是对应语言的。

### 2. 响应拦截器 (Response Interceptor)

系统对返回的状态码进行了标准化拦截：

* **Success (2xx)**：直接返回 `response.data`，剥离 Axios 包装层。
* **Error (401)**：检测到认证过期，自动清空缓存并重定向至 `Login` 页面。

## 基础配置

该模块导出的 `http` 对象支持所有 Axios 原生配置。

* **Base URL**: 自动读取环境变量 `VITE_API_URL`。
* **Timeout**: 默认 `10000ms`。
* **Headers**: 默认注入 `Content-Type: application/json`。



## 方法列表

### 1. GET 方法

用于获取数据，参数会序列化为 Query String 拼接到 URL 后。

**语法：** `http.get(url, config)`

```javascript
import http from '@/utils/http';

const fetchUser = async (id) => {
  const data = await http.get(`/api/user/${id}`, {
    params: { refresh: true }, // 最终为 /api/user/123?refresh=true
    timeout: 5000              // 覆盖默认超时
  });
  return data;
};

```

### 2. POST 方法 (JSON 格式)

这是最常用的提交方式，用于发送复杂的结构化数据。

**语法：** `http.post(url, data, config)`

```javascript
const saveProcess = async (payload) => {
  const res = await http.post('/api/mes/process', {
    code: 'OP10',
    name: '工序10',
    details: payload
  });
  return res;
};

```

### 3. POST 方法 (Form Data 格式)

常用于**文件上传**或对接传统的表单接口。

**语法：** `http.post(url, formData, config)`

```javascript
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'avatar');

  const res = await http.post('/api/oss/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // 必须指定
    }
  });
  return res;
};

```

### 4. POST 方法 (Form WWW-URL-Encoded 格式)


### 5. download 方法 (下载文件)

## 参数详解

### `url` (string)

请求的资源路径。如果是以 `http` 开头的绝对路径，则会跳过默认的 `baseURL`。

### `data / params` (object)

* `params`: 对应 GET 请求的 URL 参数。
* `data`: 对应 POST/PUT/PATCH 请求的 Body 体。

### `config` (AxiosRequestConfig)

常用属性扩展：
| 属性名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `headers` | `object` | 自定义请求头（如上传文件时的 Content-Type）。 |
| `responseType` | `string` | 下载文件时需设置为 `'blob'`。 |
| `onUploadProgress` | `function` | 获取上传进度。 |

## 错误处理机制


## 2026-01-30 优化

### 修改 http.js 的核心逻辑
我们在 request 函数中增加对简写参数的处理：

```javascript title="src/utils/http.js"
// 1. 定义 Content-Type 映射表
const contentTypeMap = {
  'json': 'application/json;charset=UTF-8',
  'form': 'application/x-www-form-urlencoded;charset=UTF-8',
  'file': 'multipart/form-data',
  'text': 'text/plain'
};

async function request({ method, url, data, params, type = 'json', headers = {}, ...options }) {
  // 2. 根据简写 type 自动设置 Content-Type
  const contentType = contentTypeMap[type] || type;
  
  const mergedHeaders = {
    'Content-Type': contentType,
    ...headers
  };

  // 后续逻辑保持不变...
  const res = await instance({ 
    method, 
    url, 
    data, 
    params, 
    headers: mergedHeaders, 
    ...options 
  });
  // ...
}
```

### 2. 优化后的 http 对象导出
我们将常用方法进行二次封装，让默认行为更聪明：
```javascript title="src/utils/http.js"
export const http = {
  request,
  
  get(url, params, options) { 
    return request({ method: "get", url, params, ...options }); 
  },

  // 默认是 JSON，但可以通过 type 快速切换
  post(url, data, options) { 
    return request({ method: "post", url, data, ...options }); 
  },

  // 快捷表单提交 (x-www-form-urlencoded)
  postForm(url, data, options) {
    return request({ method: "post", url, data, type: 'form', ...options });
  },

  // 快捷上传 (multipart/form-data)
  upload(url, data, options) {
    return request({ method: "post", url, data, type: 'file', ...options });
  }
};
```


### 3. 使用对比：效率大幅提升

以前的写法（啰嗦）：
```javascript
mk.http.post('/api/save', data, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
```
现在的写法（极致简洁）：
```javascript
// 方式 A：使用 type 参数
mk.http.post('/api/save', data, { type: 'form' });

// 方式 B：使用语义化方法
mk.http.postForm('/api/save', data);

// 上传文件也变得非常简单
mk.http.upload('/api/file/upload', formData);
```