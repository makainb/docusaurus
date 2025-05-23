---
title: nacos配置
---

## 修改部分配置

```
设置nacos.core.auth.server.identity.key为你自定义的键名，例如myServerIdentityKey。
设置nacos.core.auth.server.identity.value为你自定义的键值，例如mySecureKeyValue，确保其具有足够的复杂度和唯一性。
```


## 常见运维命令

### 启动
```bash
bin/startup.sh -m standalone
```

### 停止
```bash
bin/shutdown.sh
```

