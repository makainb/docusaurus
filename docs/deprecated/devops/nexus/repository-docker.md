---
title: 仓库管理之 Docker
sidebar_position: 4
---

## 添加存储

## 添加本地

## 添加远程

## 添加组聚合

## 安全设置


## 验证


/etc/docker/daemon.json 

```json
{ 
  "registry-mirrors": [
    "http://172.16.45.214:8082"
  ],
  "insecure-registries": ["http://172.16.45.214:8083"] 
}
```

Security -> Realms -> Docker Bearer Token Realm 设置为活动