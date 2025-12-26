---
title: Rest客户端
sidebar_position: 4
---


## 路径变量
```java
@GetExchange("/user/getPath/{id}")
List<UserDto> getPath(@PathVariable String id);
```

## 查询参数变量
```java
@GetExchange("/user/getParam")
List<UserDto> getParam(@RequestParam String username, @RequestParam String password);
```

## 查询参数变量2
```java
@GetExchange("/user/getParam2?username={username}&password={password}")
List<UserDto> getParam2(@PathVariable String username, @PathVariable String password);
```

## 发送JSON
```java
@PostExchange("/user/postJson")
List<UserDto> postJson(@RequestBody UserDto userDto);
```

## 发送文件
```java

// 文件 转 资源
//        Resource resource = new FileSystemResource("C:/temp/test.txt");

// 输入流 转 资源
//        InputStream is = new FileInputStream("C:/temp/test.txt");
//        Resource resource = new InputStreamResource(is);

// 字节数组 转 资源
Resource r = new ByteArrayResource("你好世界!".getBytes(StandardCharsets.UTF_8)){
    @Override
    public String getFilename() {
        return "a.txt";
    }
};


userClientService.postFile(r, "马凯");
```

## 发送请求头
```java
@PostMapping("/postHeader")
public List<UserDto> postHeader() {
    userClientService.postHeader("makai");
    return new ArrayList<>();
}
```


## 发送Cookie
```java
@PostMapping("/postCookie")
public List<UserDto> postCookie() {
    userClientService.postCookie("makai");
    return new ArrayList<>();
}
```

## 接口注册
## 默认值
## 全局异常处理
## 自定义数据类型
## url从配置读取


除了自定义异常和服务名访问，其余已测通，可以替代feign