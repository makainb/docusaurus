---
title: IDEA的配置

---

## 1 代码区字体大小样式
```
位置 Settings --> Editor--> Color Scheme --> Color Scheme Font 
修改以下
Use color scheme font instead of the default 打钩
Font: Yahei Consolas Hybrid
```
## 2 设置编码字符集
```
位置：Settings --> Editor --> File Encodings
修改以下内容
Global Encoding --> UTF-8
Project Encoding --> UTF-8
Default Encoding for properties files --> UTF-8 
Transparent native-to-ascii conversion  --> 打钩
create UTF-8 file --> with no BOM
```
## 3 配置JDK
```
3.1 项目编译的JDK版本
build, Execution Depolyment --> Compiler --> Java Compiler

3.2 配置Project的JDK版本
Project Structure --> Project Settings --> project 

3.3 配置Module依赖的jdk版本（通常不用管）
Project Structure --> Project Settings --> module

3.4 检查平台的的JDK版本
Project Structure --> Platform Settings --> SDKs
```
## 4 Maven配置
```
位置：build, Execution Depolyment --> build tools--> maven
修改以下内容
maven home path --> 修改成自己的 maven
User settings file --> 修改
Local repository --> 修改
```
## 5 界面展示
```
view --> appearauce -> toolbar 打钩
```
## 6 显示方法的分隔符
```
位置：File | Settings | Editor | General | Appearance 
修改以下
show method separators 打钩
```
## 7 提示的时候，忽略大小写
```
位置：File | Settings | Editor | General | Code Completion 
修改如下
Match case 的勾去掉
```
## 8 取消tab页单行显示
```
位置：File | Settings | Editor | General | Editor Tabs 
修改如下下
show tabs in one row 打钩
```
## 9 单行代码不挤在一行
```
 位置：File | Settings | Editor | General | Code Folding
 修改如下
 Java --> One-line methods 勾去掉。
```
​