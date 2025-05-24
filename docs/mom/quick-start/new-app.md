---
title: 应用接入
---

## 引入公共POM

在 `pom.xml` 中添加以下内容 

```xml
<parent>
    <groupId>com.zmj.sy</groupId>
    <artifactId>mom-commons-pom</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <relativePath />
</parent>

<artifactId>项目标识</artifactId>
```

## 引入模块(可选)

选择依赖引入，一般来说Web框架你需要引入的是一个基础依赖和权限依赖

```xml
<dependency>
    <groupId>com.zmj.sy</groupId>
    <artifactId>mom-commons-security</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</dependency>
```

## nacos配置


在 `application.yaml` 中有两个你必须添加的配置：
- `${spring.application.name}.yml` 
- discovery-nacos-mom.yml

剩下的都是可选配置，例如redis, aps的msql数据库：
- nosql-redis-mom.yaml
- rdbms-mysql-aps.yaml

```yaml
spring: 
  config:
    import:
      - nacos:${spring.application.name}.yml
      - nacos:discovery-nacos-mom.yml
      - nacos:rdbms-mysql-wms.yml

```

## 启动脚本

启动脚本中一定要指定 `namespace` 和 `server-addr`，下面是事例：
```shell
#!/bin/sh

SERVICE=mom-commons-gateway.jar
LOG=nohup.out

PID=""
JAVA_OPTS=" -Xms2048m -Xmx2048m -Xmn512m  -Dspring.cloud.nacos.config.namespace=pro -Dspring.cloud.nacos.config.server-addr=172.31.3.155:8848 "


checkPid() {
  PID=$(ps -ef | grep java | grep $SERVICE | grep -v grep | awk '{print $2}')
}

stop() {
  checkPid
  if [ -n "${PID}" ]; then
    echo "服务停止中..."
    
    kill -9 ${PID}
    
    while [ -n "${PID}" ]
    do
      sleep 1
      checkPid
    done
    echo "服务已停止."
  fi
}

start() {
  echo "启动中..."
  nohup java -jar ${JAVA_OPTS} ${SERVICE} > ${LOG} 2>&1 &
  tail -f ${LOG}
}

status() {
  checkPid
  if [ -n "${PID}" ]; then
    echo "服务运行中."
  else
    echo "服务已关闭."
  fi
}

restart() {
  stop
  start
}

case "$1" in
  "stop")
    stop
  ;;
  "status")
    status
  ;;
  *)
    restart
  ;;
esac

```