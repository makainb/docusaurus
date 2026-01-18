---
title: 快速入门-第一个 Spring Security 应用
sidebar_position: 0102
---
## 项目配置
### 创建总项目

创建 `SpringSecurity` 项目

```gradle title="settings.gradle"
rootProject.name = 'SpringSecurity'

include 'S0102-FirstApp'
```

```gradle title="build.gradle"
plugins {
    id 'java'
    // 统一在这里定义版本，apply false 表示父项目本身不使用这些插件
    id 'org.springframework.boot' version '4.0.1' apply false
    id 'io.spring.dependency-management' version '1.1.7' apply false
}

ext {
    javaVersion = '25'
    springBootVersion = '4.0.1'
}

description = 'SpringSecurity'

allprojects {
    group = 'com.makaix'
    version = '1.0.0'

    repositories {
        mavenCentral()
    }

}

subprojects {
    apply plugin: 'java'
    // 注意：在这里 apply 会生效，是因为 plugins 块已经下载了对应的 jar 包
    apply plugin: 'io.spring.dependency-management'

    // 关键修正：手动将父项目托管的插件应用到子项目，而不通过子项目的 plugins 块
    java {
        sourceCompatibility = JavaVersion.VERSION_25
        targetCompatibility = JavaVersion.VERSION_25
    }

    dependencyManagement {
        imports {
            mavenBom 'org.springframework.boot:spring-boot-dependencies:4.0.1'
        }
    }
}
```

添加 `.gitignore` 文件
添加 `README.md` 文件

### 创建当前项目

添加 `S0102-FirstApp` 项目
添加 `build.gradle` 文件

```gradle title="S0102-FirstApp/build.gradle"
// 子工程 build.gradle
plugins {
    id 'java'
    id 'org.springframework.boot'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}
```
### 创建启动类

```java title="S0102-FirstApp/com.makaix.s0102firstapp.S0102FirstAppApplication.java"
package com.makaix.s0102firstapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class S0102FirstAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(S0102FirstAppApplication.class, args);
    }

}

```

### 创建Controller

```java title="S0102-FirstApp/com.makaix.s0102firstapp.controller.UserController.java"
package com.makaix.s0102firstapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public String user() {
        return "Hello World";
    }
}
```

### 创建配置文件

```yml title="S0102-FirstApp/application.yml"
spring:
  application:
    name: S0102-FirstApp
server:
  port: 8001
```

### 启动验证

浏览器打开 `http://localhost:8001/user` 会直接返回Hello World

## 引用Spring Security


### 添加依赖

```gradle title="S0102-FirstApp/build.gradle"
dependencies {
    // 追加该行
    implementation 'org.springframework.boot:spring-boot-starter-security'
}
```

### 验证 

添加依赖后，刷新gradle，浏览器打开 `http://localhost:8001/user`，此时会跳转到登录页面。
用户名默认为：`user`
密码是SpringSecurity自动生成的，每次都不一样的：他是一个uuid，在控制台显示。

登录成功后，会返回一个JSESSIONID，在浏览器的Cookie中会生成一个JSESSIONID，这个JSESSIONID就是SpringSecurity自动生成的uuid。

登录成功后，再次访问 `http://localhost:8001/user`，此时会返回Hello World。


### 自定义用户名密码

```yml title="S0102-FirstApp/application.yml"
spring:
  security:
    user:
      name: makai
      password: 123456
```
