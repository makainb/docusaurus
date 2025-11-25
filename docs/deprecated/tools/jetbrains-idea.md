## 1 下载

## 2 破解
私聊

## 3 插件

### 3.1 Translation （翻译）
从汉字改为土味英语。几乎被AI取代。

### 3.2 BackgroundImagePlus （背景图）
听说用这个插件的有两种人，一种是装B，另一种是LSP。

### 3.3 Key Promoter X （快捷键提示）
老年人用了还是忘。新人用了一天，代码没来及写，一直在背快捷键了。

### 3.4 SonarLint （代码质量检测）
自己给自己找不自在。

### 3.5 Github Copilot （代码智能提示插件）
富哥用`Cursor`， 穷逼用 `fitten code`，白嫖用 `Copilot`。

### 3.6 Statistic （代码统计插件）
每天看一下，欣赏最水的自己。

### 3.7 jclasslib （字节码查看）
这个插件的汉化，是给我整懵逼了。抄家伙，去除汉化  
1 定位jar包`.plugs.jclasslib.lib.jclasslib-browser.jar`   
2.定位Properties文件 `org.gjt.jclasslib.browser.messages`  
3.删除文件`Browser_zh_CN.properties` 

## 4 配置

### 4.1 代码区字体大小样式
```
位置 Settings --> Editor--> Color Scheme --> Color Scheme Font 
修改以下
Use color scheme font instead of the default 打钩
Font: Yahei Consolas Hybrid
```
### 4.2 设置编码字符集
```
位置：Settings --> Editor --> File Encodings
修改以下内容
Global Encoding --> UTF-8
Project Encoding --> UTF-8
Default Encoding for properties files --> UTF-8 
Transparent native-to-ascii conversion  --> 打钩
create UTF-8 file --> with no BOM
```
### 4.3 配置JDK
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
### 4.4 Maven配置
```
位置：build, Execution Depolyment --> build tools--> maven
修改以下内容
maven home path --> 修改成自己的 maven
User settings file --> 修改
Local repository --> 修改
```
### 4.5 界面展示
```
view --> appearauce -> toolbar 打钩
```
### 4.6 显示方法的分隔符
```
位置：File | Settings | Editor | General | Appearance 
修改以下
show method separators 打钩
```
### 4.7 提示的时候，忽略大小写
```
位置：File | Settings | Editor | General | Code Completion 
修改如下
Match case 的勾去掉
```
### 4.8 取消tab页单行显示
```
位置：File | Settings | Editor | General | Editor Tabs 
修改如下下
show tabs in one row 打钩
```
### 4.9 单行代码不挤在一行
```
 位置：File | Settings | Editor | General | Code Folding
 修改如下
 Java --> One-line methods 勾去掉。
```