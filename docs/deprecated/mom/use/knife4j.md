---
title: Knife4j 文档
sidebar_position: 2
---

## 访问

http://xxx/doc.html

## 注解
| 注解名             | 用途说明                             | 常用属性（字段）                                                                                                                      |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `@Operation`    | 描述接口方法元信息（如 summary、description） | `summary`, `description`, `operationId`, `tags`, `responses`, `parameters`, `requestBody`                                     |
| `@Parameter`    | 描述请求参数（如 query、path、header 等）    | `name`, `in`, `description`, `required`, `example`, `schema`                                                                  |
| `@Schema`（类级）   | 描述对象模型（实体类）结构                    | `description`, `example`, `required`, `nullable`, `implementation`                                                            |
| `@Schema`（字段）   | 描述字段信息与约束                        | `description`, `example`, `required`, `maxLength`, `minLength`, `minimum`, `maximum`, `nullable`, `format`, `default`, `type` |
| `@ApiResponse`  | 描述响应状态码和返回体                      | `responseCode`, `description`, `content`, `headers`                                                                           |
| `@Content`      | 描述请求或响应体的内容类型和结构                 | `mediaType`, `schema`, `examples`                                                                                             |
| `@RequestBody`  | 描述请求体（POST/PUT 提交的 JSON 等）       | `description`, `required`, `content`                                                                                          |
| `@ApiResponses` | 包裹多个 `@ApiResponse` 注解（可选用单个或多个） | 无属性（作为容器）                                                                                                                     |


## 模拟登录

## 关闭 knife4j