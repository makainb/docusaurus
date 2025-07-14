---
title: 部署 - Docker Compose
sidebar_position: 2
---


## 拉取镜像

```bash
docker pull prom/prometheus
```

## 创建文件夹
```bash
mkdir -p conf data 
```

## 找到并复制配置文件
```bash
# 查找文件
find / -name prometheus.yml
# 把XXX换成你的路径
cp /var/xxxx/prometheus.yml conf/prometheus.yml
```

## docker-compose文件

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./conf/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./data:/prometheus  # 数据持久化
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.enable-lifecycle'  # 允许热重载配置
    ports:
      - "9090:9090"

```

## 验证

访问：http://localhost:9090