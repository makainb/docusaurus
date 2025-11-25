---
title: 安装之Docker-Compose
sidebar_position: 2
---

## 创建目录
```shell
mkdir -p /opt/soft/nexus/ && cd /opt/soft/nexus/
mkdir nexus-data && chown -R 200 nexus-data
```

## Docker Compose文件
```yml
services:
  nexus3:
    image: sonatype/nexus3:3.82.0
    container_name: nexus
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 8081:8081
    volumes:
      - ./nexus-data:/nexus-data
    ulimits:
      nproc: 65535
      nofile:
        soft: 65535
        hard: 65535
```

## 首次登录查看密码

```bash
# 查看密码
cat nexus-data/admin.password
```

http://127.0.0.1:8081  
用户名：admin  
密码：刚刚的 cat 输出  

## 其他

### 修改端口号
```bash
vi nexus-data/etc/nexus.properties
# 修改以下行，并解除注释
# application-port=8081
```