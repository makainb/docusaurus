---
title: 版本控制
sidebar_position: 3
---

## 四种版本控制策略

### 1. 路径段版本控制（Path Segment Versioning）

#### 示例
```java

@RequestMapping("/user")
@RestController
public class UserController {
    @GetMapping(value = "/{version}/users", version = "1.0")
    public List<User> findAllv1() {
        return userRepository.findAll();
    }

    @GetMapping(value = "/{version}/users", version = "2.0")
    public List<User> findAllv2() {
        return userRepository.findAll();
    }
}

```

#### Java配置
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configureApiVersioning(ApiVersionConfigurer configurer) {
        configurer
            .usePathSegment(1)  // 指定版本号所在的路径段位置,下标从0开始
            .addSupportedVersions("1.0", "2.0")
            .setDefaultVersion("1.0");
    }
}

```

#### 文件配置
```properties
spring.mvc.apiversion.use.path-segment=1
spring.mvc.apiversion.supported=1.0,2.0
spring.mvc.apiversion.default=1.0
```

#### 示例
```bash
GET /user/1.0/users   # Version 1.0
GET /user/2.0/users   # Version 2.0
```

### 2.请求头版本控制（Request Header Versioning）

#### 示例
```java
@GetMapping(value = "/users", version = "1.0")
public List<User> findAllv1() {
    System.out.println("v1");
    return new ArrayList<>();
}

@GetMapping(value = "/users", version = "2.0")
public List<User> findAllv2() {
    System.out.println("v2");
    return new ArrayList<>();
}
```

#### Java 配置
```java
configurer.useRequestHeader("X-API-Version");
```

#### 文件配置
```
spring.mvc.apiversion.use.header=X-API-Version
```

#### 客户端调用
```
GET /user/users
X-API-Version: 2.0
```

### 3.查询参数版本控制（Query Parameter Versioning）

#### 示例
```java
@GetMapping(value = "/users", version = "1.0")
public List<User> findAllv1() {
    System.out.println("v1");
    return new ArrayList<>();
}

@GetMapping(value = "/users", version = "2.0")
public List<User> findAllv2() {
    System.out.println("v2");
    return new ArrayList<>();
}
```

#### Java 配置
```java
configurer.useQueryParam("version");
```

#### 文件配置
```
spring.mvc.apiversion.use.query-parameter=version
```

#### 客户端调用
```
GET /user/users?version=2.0

GET /user/users?version=1.0
```

### 4.媒体类型版本控制 / 内容协商（Media Type Versioning）

#### 示例
```java
@GetMapping(value = "/users", version = "1.0")
public List<User> findAllv1() {
    System.out.println("v1");
    return new ArrayList<>();
}

@GetMapping(value = "/users", version = "2.0")
public List<User> findAllv2() {
    System.out.println("v2");
    return new ArrayList<>();
}
```

#### Java 配置
```java
configurer.useMediaTypeParameter(MediaType.APPLICATION_JSON, "version");
```

#### 文件配置
```
spring.mvc.apiversion.use.media-type-parameter[application/json]=version
```

#### 客户端调用
```
GET /user/users
Accept: application/json;version=2.0

```

### 5.自定义版本解析


#### 示例
```java
@GetMapping(value = "/{version}/users", version = "1.0")
public List<User> findAllv1() {
    System.out.println("v1");
    return new ArrayList<>();
}

@GetMapping(value = "/{version}/users", version = "2.0")
public List<User> findAllv2() {
    System.out.println("v2");
    return new ArrayList<>();
}
```

#### Java 配置
```java
configurer.usePathSegment(1)
    .setVersionParser((ApiVersionParser<String>) (String version) -> {

        if (version.startsWith("v") || version.startsWith("V")) {
            version = version.substring(1);
        }

        if (!version.contains(".")) {
            version = version + ".0";
        }

        return version;
    });
```


#### 客户端调用
```
GET /user/v1/users
```

```java

public class ApiVersionParser implements org.springframework.web.accept.ApiVersionParser {

    @Override
    public Comparable parseVersion(String version) {
        // Allow "v1" or "v2" instead of "1.0" or "2.0"
        if (version.startsWith("v") || version.startsWith("V")) {
            version = version.substring(1);
        }
        
        // Auto-append ".0" for major versions
        if (!version.contains(".")) {
            version = version + ".0";
        }
        
        return version;
    }
}
```

## 其他设置

### 可选版本控制(Optional Versioning )
虽然默认需要版本，但你可以选择，默认使用最新版本：

```java
configurer.setVersionRequired(false);
```
或者用配置文件
```
spring.mvc.api-versioning.version-required=false
```

## 对比

| 版本控制方式     | 优点                              | 缺点                        | 推荐场景                 |
| ---------- | ------------------------------- | ------------------------- | -------------------- |
| **路径版本**   | URL 直观；最 RESTful；易于路由和文档；CDN 友好 | URL 变长；不能与其他方式混用          | 对外公开 API；长期稳定接口      |
| **请求头版本**  | URL 干净；不暴露版本号；不影响路由             | 调试不便；客户端必须设置 Header；缓存不友好 | 微服务内部调用；对 URL 清洁度有要求 |
| **查询参数版本** | 简单好用；调试方便；框架兼容好                 | 不够 RESTful；参数易遗漏；规范性弱     | 调试环境；后台管理系统；中小型项目    |
| **媒体类型版本** | 最灵活；符合 HTTP 内容协商；不污染 URL        | 调试难；客户端复杂；配置成本高           | 大型企业接口；需要严格内容协商的系统   |

