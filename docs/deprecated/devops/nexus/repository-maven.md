---
title: 仓库管理之 Maven
sidebar_position: 3
---

## 创建 maven仓库 存储
创建 maven-store

## 创建 阿里-代理 仓库
创建仓库:maven2-proxy
```
name: maven-proxy-aliyun
online:打钩
remote storage:https://maven.aliyun.com/repository/public
blob store：maven-store
```

## 创建 正式-本地 仓库
默认已创建

## 创建 快照-本地 仓库
默认已创建

## 创建 组 聚合上面所有的maven仓库
默认已创建  
修改的部分如下：
```
Member Repositories:

maven-release
maven-snapshots
maven-proxy-aliyun
maven-central
```

## 验证使用
