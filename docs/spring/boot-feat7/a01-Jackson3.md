---
title: Jackson3
sidebar_position: 2
---


## Jackson 3 关键变化

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

jsonMapper.readValue(json, MyClass.class);

```

### **全新功能：hint() 方法**

#### 旧方式（MappingJacksonValue）——繁琐

```java
var jacksonValue = new MappingJacksonValue(user);
jacksonValue.setSerializationView(Summary.class);
```

#### 新方式（Spring Boot 4 + Jackson 3）

```java
var response = this.restClient.post()
    .uri("http://localhost:8080/create")
    .hint(JsonView.class.getName(), Summary.class)
    .body(user)
    .retrieve()
    .body(String.class);
```

更干净、更现代、更线程安全。




## 常用功能

### 初始化 - 默认
Spring Boot 4.0 自动配置了 `JsonMapper`。

### 初始化 - 代码
```java
// Jackson 3 —— 不可变构建器
@Bean
@Primary
public JsonMapper jsonMapper() {
  JsonMapper mapper = JsonMapper.builder()
      .enable(SerializationFeature.INDENT_OUTPUT)
      .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
      .build();  // 线程安全，不可变
  return mapper;
}
```

### 初始化 - 配置
```yaml
spring:
  jackson:
    use-jackson2-defaults: true
    serialization:
      indent-output: true
```

### 对象转JSON
```java
@Test
void writeJson() {
  // Jackson 3 —— 不可变构建器
  User makai = new User("makai", 30, Instant.now());
  String s = jsonMapper.writeValueAsString(makai);
  System.out.println(s);
}
```

### JSON转对象
```java
@Test
void readJson() {
  String str = """
          {"username":"makai","age":30,"i":"2025-11-29T05:40:22.015481800Z"}
          """;
  User user = jsonMapper.readValue(str, User.class);
  System.out.println(user);

}
```

### 视图对象转JSON
```java
@Test
public void writeView(){
  OrderBom ob = new OrderBom(1, "馬凱", LocalDateTime.now(), false, 2L, new BigDecimal("10.9"), "JG-FJ");
  System.out.println(jsonMapper.writerWithView(OrderBomViews.OrderBomAddReqView.class).writeValueAsString(ob));
}
```


### 视图JSON转对象
```java
@Test
public void readView(){
  String str = """
          {"materName":"馬凱","amount":10.9}
          """;
  OrderBom o = jsonMapper.readerWithView(OrderBomViews.OrderBomAddReqView.class).forType(OrderBom.class).readValue(str);
  System.out.println(o);
}
```


## 我的思考
1、如果全局的返回类BaseEntity和Code取消，让Http Response Code 正式使用起来。将会有如下好处。  
2、视图分组，解决类爆炸问题  
3、Record，解决模板代码的问题  

但是如果这么用的话就会出现一个问题，就是返回值是真返回值，而不是代替http状态码

## **更多资源**
* [Spring Boot 4.0 发布说明](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Release-Notes)
* [Jackson 3.0 迁移指南](https://github.com/FasterXML/jackson/wiki/Jackson-3.0)
