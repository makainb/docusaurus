安装nacos


## 前置工具
unzip , jdk, 

## 准备工作
mkdir -p /home/makai/kai-common-nacos
cd /home/makai/kai-common-nacos
curl -O https://download.nacos.io/nacos-server/nacos-server-3.1.1.zip
unzip nacos-server-3.1.1.zip

## 配置
nacos.core.auth.plugin.nacos.token.secret.key
nacos.core.auth.server.identity.key
nacos.core.auth.server.identity.value

## 启动单机版
sh bin/startup.sh -m standalone


