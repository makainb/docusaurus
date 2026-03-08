# JDK的安装
## 上传文件
`rz jdk-8u181-linux-x64.tar.gz`

## 解压文件
`sudo tar -zxvf jdk-8u72-linux-x64.tar.gz`

## 添加到环境变量
打开文件
`sudo vi /etc/profile`

在文件末尾追加以下路径（注意，JavaHome为你解压后的真实地址。）
```shell
# JDK
JAVA_HOME=/opt/soft/jdk1.8.0_181
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME
export JRE_HOME
export PATH
export CLASSPATH
```


## 环境变量生效
`source /etc/profile`
## 检查
`java -version`





```bash
sudo yum install java-11-openjdk-devel


$ java -version
openjdk version "11.0.12" 2021-07-20 LTS
OpenJDK Runtime Environment 18.9 (build 11.0.12+7-LTS)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.12+7-LTS, mixed mode, sharing)

$ which java
/usr/bin/java

# 设置环境变量
sudo tee /etc/profile.d/java11.sh <<EOF
export JAVA_HOME=$(dirname $(dirname $(readlink $(readlink $(which javac)))))
export PATH=\$PATH:\$JAVA_HOME/bin
export CLASSPATH=.:\$JAVA_HOME/jre/lib:\$JAVA_HOME/lib:\$JAVA_HOME/lib/tools.jar
EOF

# 生效
source /etc/profile.d/java11.sh

```