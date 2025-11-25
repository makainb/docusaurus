---
title: Jackson3
sidebar_position: 2
---




# **在 Spring Boot 4.0 中使用 Jackson JsonView**

一份全面、可实践的教程，带你探索 Spring Boot 4.0 中的 Jackson JSON 处理方式。
学习如何控制 JSON 序列化与反序列化、利用 Jackson 3 的新特性、配置 JsonMapper，并使用 `@JsonView` 和全新的 `hint()` 方法实现真实场景中的过滤模式。

如果你想了解更多关于这些变化的细节，可以阅读 Sébastien Deleuze 撰写的
[这篇文章](https://spring.io/blog/2025/10/07/introducing-jackson-3-support-in-spring)。

---

## **你将学到什么**

* **Jackson 2 与 3 的兼容性**
  了解为什么本项目同时使用 Jackson 3.0.1（databind）和 jackson-annotations 2.20，以及 Spring Boot 4.0 如何实现两者的无缝桥接。

* **Jackson 3 的关键变化**
  包含全新的 `tools.jackson` 包结构、不可变构建器配置、默认使用 ISO-8601 日期格式，以及可与 Lambda/Streams 兼容的非受检异常。

* **JsonMapper：读写 JSON**
  学习 Spring Boot 如何自动配置 JsonMapper，如何用 TypeReference 从文件读取 JSON，并在需要时自定义 builder。

* **应用配置属性深度解析**
  掌握 `use-jackson2-defaults`、`indent-output` 等属性，理解为什么 `sort-properties-alphabetically` 对 record 无效，以及其他常见配置的作用。

* **JSON Views**
  使用 `@JsonView` 从一个模型生成多个 JSON 视图，减少 DTO 泛滥；学习服务端与客户端请求过滤方式，包括 Spring Boot 4 引入的全新 `hint()` 方法，比旧的 `MappingJacksonValue` 更优雅。

---

## **Jackson 2 & 3 的兼容性**

本项目使用：

* **Jackson 3.0.1**（databind）
* **jackson-annotations 2.20**

没错，这种版本不一致是**有意为之**！

### 为什么是不同版本？

Jackson 团队需要解决一个关键问题：
**如何让生态系统在慢慢迁移到 Jackson 3 时仍能继续使用旧的注解库？**

### **解决方案：**

* **Jackson Core 3.0.1**
  使用全新的 `tools.jackson` 包名、提升的 API、线程安全的 builder。

* **jackson-annotations 2.20**
  一个对 Jackson 2 和 3 都兼容的共享注解库。

### 这意味着：

* `@JsonView`、`@JsonFormat` 等注解在 Jackson 2 和 3 中表现一致
* 企业可以逐步迁移，而不会破坏共享 domain model
* Spring Boot 4.0 使用 Jackson 3 作为引擎，同时保持注解完全兼容

### **依赖树：**

```xml
spring-boot-starter-jackson (4.0.0-RC1)
├── tools.jackson.core:jackson-databind:3.0.1     ← Jackson 3 引擎
└── com.fasterxml.jackson.core:jackson-annotations:2.20  ← 共享注解
```

这是**最终方案**，而不是过渡方案，确保 Java 生态的最大兼容性。

---

## **Jackson 3 关键变化**

### 包名变更

```java
// Jackson 2
import com.fasterxml.jackson.databind.ObjectMapper;

// Jackson 3
import tools.jackson.databind.json.JsonMapper;
```

---

### 基于 Builder 的配置（不可变）

```java
// Jackson 2 —— 可变（不推荐）
ObjectMapper mapper = new ObjectMapper();
mapper.enable(SerializationFeature.INDENT_OUTPUT);

// Jackson 3 —— 不可变构建器
JsonMapper mapper = JsonMapper.builder()
    .enable(SerializationFeature.INDENT_OUTPUT)
    .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
    .build();  // 线程安全，不可变
```

---

### 日期序列化默认值变更

```json
// Jackson 2 默认（时间戳）
{"bakedAt": 1699257000000}

// Jackson 3 默认（ISO-8601）
{"bakedAt": "2025-11-06T05:30:00"}
```

Jackson 3 默认使用 ISO-8601 字符串，更易读也更适合前端解析。

---

### 非受检异常（Unchecked Exceptions）

```java
// Jackson 2 —— 受检异常
try {
    objectMapper.readValue(json, MyClass.class);
} catch (JsonProcessingException | IOException e) {
}

// Jackson 3 —— 非受检异常
try {
    jsonMapper.readValue(json, MyClass.class);
} catch (JacksonException e) {
}
```

#### 为什么要改变？

Jackson 2 的异常继承来自 `IOException`（早期 I/O 设计理念）。
但现代 Java 中这会带来：

1. Lambda 不兼容
2. Stream API 使用困难
3. 大量模板代码
4. JSON 错误大多无法恢复，本质上是运行时错误

#### Jackson 3 的好处：

```java
// Jackson 2 —— Lambda 下无法编译
donuts.stream()
    .map(d -> jsonMapper.writeValueAsString(d))  // ❌受检异常
    .toList();

// Jackson 3 —— 运行正常
donuts.stream()
    .map(d -> jsonMapper.writeValueAsString(d))  // ✅
    .toList();
```

* 可用于 Lambda/Stream
* 更简洁
* 单一异常体系
* 不影响捕获异常
* 更符合现代 Java 风格

---

## **JsonMapper：读写 JSON**

Spring Boot 4.0 自动配置了 `JsonMapper`。

```java
@Component
public class DataLoader implements ApplicationRunner {
    private final JsonMapper jsonMapper;
    private final ResourceLoader resourceLoader;

    public DataLoader(JsonMapper jsonMapper, ResourceLoader resourceLoader) {
        this.jsonMapper = jsonMapper;
        this.resourceLoader = resourceLoader;
    }
}
```

---

### **从文件读取 JSON**

```java
@Override
public void run(ApplicationArguments args) throws Exception {
    Resource resource = resourceLoader.getResource("classpath:data/donuts-menu.json");

    this.donuts = jsonMapper.readValue(
        resource.getInputStream(),
        new TypeReference<List<Donut>>() {}
    );

    log.info("Loaded {} donuts from JSON file", donuts.size());
}
```

#### 为什么要用 TypeReference？

* Java 泛型擦除
* TypeReference 保留 `List<Donut>` 的类型信息

---

### **序列化 JSON**

```java
String json = jsonMapper.writeValueAsString(donuts.getFirst());
log.info("Serialized donut:\n{}", json);
```

---

### **自定义配置（可选）**

```java
@Configuration
public class JacksonConfig {

    @Bean
    public JsonMapper jsonMapper() {
        return JsonMapper.builder()
            .enable(SerializationFeature.INDENT_OUTPUT)
            .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
            .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
            .build();
    }
}
```

---

## **应用配置属性深入解析**

```yaml
spring:
  jackson:
    use-jackson2-defaults: true
    serialization:
      indent-output: true
```

### use-jackson2-defaults

迁移期间保持 Jackson 2 行为。
确认无问题后可以移除。

### sort-properties-alphabetically（不生效原因）

Jackson 3 在 record 或含构造函数的类中优先使用构造参数顺序，而不是字母序。

---

## **JSON Views**

使用一个模型生成多种 API 输出：

* Mobile：type, price
* Public：type, price, glaze, toppings, isVegan
* Internal：全部+calories, bakedAt
* Admin：全部字段 + 系统元数据

### 模型定义

```java
public record Donut(
    @JsonView(Views.Summary.class)
    String type,

    @JsonView(Views.Public.class)
    Glaze glaze,

    @JsonView(Views.Public.class)
    List<String> toppings,

    @JsonView(Views.Summary.class)
    BigDecimal price,

    @JsonView(Views.Public.class)
    boolean isVegan,

    @JsonView(Views.Internal.class)
    Integer calories,

    @JsonView(Views.Internal.class)
    LocalDateTime bakedAt
) {}
```

### 视图层级

```java
public class Views {
    public interface Summary {}
    public interface Public extends Summary {}
    public interface Internal extends Public {}
    public interface Admin extends Internal {}
}
```

---

## **全新功能：hint() 方法**

### 旧方式（MappingJacksonValue）——繁琐

```java
var jacksonValue = new MappingJacksonValue(user);
jacksonValue.setSerializationView(Summary.class);
```

### 新方式（Spring Boot 4 + Jackson 3）

```java
var response = this.restClient.post()
    .uri("http://localhost:8080/create")
    .hint(JsonView.class.getName(), Summary.class)
    .body(user)
    .retrieve()
    .body(String.class);
```

更干净、更现代、更线程安全。

---

## **快速开始**

### 启动服务

```bash
./mvnw spring-boot:run
```

### 启动客户端

```bash
./mvnw spring-boot:run -Dstart-class=dev.danvega.donuts.ClientApp
```

---

## **更多资源**

* [Jackson JsonView 文档](https://github.com/FasterXML/jackson-docs/wiki/JacksonJsonViews)
* [Spring Boot 4.0 发布说明](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Release-Notes)
* [Jackson 3.0 迁移指南](https://github.com/FasterXML/jackson/wiki/Jackson-3.0)
