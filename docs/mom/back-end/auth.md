---
title: 权限控制
sidebar_position: 3
---

## 简单介绍RBAC权限模型和OAuth2
懒得写，GPT直接出答案

## 引入权限依赖
```xml


```

## 标准鉴权-登录权限

- 通过 Gateway 访问，需要完整的认证流程，适用于常规的 CRUD 操作
- 前端发起带 token 的请求，涉及 feign 服务间调用，feign 会自动传递 token

## 标准鉴权-自定义权限
- 通过 Gateway 访问，需要完整的认证流程，适用于常规的 CRUD 操作
- 前端发起带 token 的请求，涉及 feign 服务间调用，feign 会自动传递 token
- 在 `Controller` 层添加 `@PreAuthorize("mom.has('服务名-服务内权限标识')")`。

## 免鉴权-外部访问
通过 Gateway 访问，但无需认证。适用场景：获取验证码、公开接口等

### 方式1：配置方式（推荐）
```yaml
spring.security.ignore=xxxxxxx
```

### 方式2：注解方式（不推荐）
```yaml
// 别用这种，不好维护
@Inner(false)
```

## 免鉴权-内部访问
某些接口未携带 token，涉及 feign 服务间调用。定时任务通过 feign 调用接口、MQ 调用接口等

### 1.接口加 `@Inner` 注解

### 2.Feign中添加默认值
Feign中的参数加一个 `@RequestHeader(SecurityConstants.FROM) String form` 


## 获取当前登录用户
```java
SessionUser sessionUser = SecurityUtils.getUser();
```

注意：只有标准鉴权时可以获取用户信息。

