---
title: 工具库使用
sidebar_position: 1
---

## Spring工具类（内置，最小依赖）
| 分类名称         | 工具类名称             |
|------------------|------------------------|
| 对象、数组、集合 | Collections/Lists/Objects |
| 对象、数组、集合 | ObjectUtils            |
| 对象、数组、集合 | StringUtils            |
| 对象、数组、集合 | CollectionUtils        |
| 对象、数组、集合 | BooleanUtils           |
| 文件、资源、IO流 | IOUtils(常用)          |
| 文件、资源、IO流 | FileCopyUtils          |
| 文件、资源、IO流 | ResourceUtils          |
| 文件、资源、IO流 | StreamUtils            |
| 反射、AOP        | ReflectionUtils        |
| 反射、AOP        | AopUtils               |
| 反射、AOP        | AopContext             |
| 反射、AOP        | AOP举例                |
| 反射、AOP        | ClassUtils(常用)       |
| 反射、AOP        | BeanUtils(常用)        |
| 编解码、字符编码 | Base64Utils            |
| 编解码、字符编码 | StandardCharsets       |
| 编解码、字符编码 | DigestUtils            |
| 编解码、字符编码 | SerializationUtils     |
| 日志与网络       | MDC                    |
| 日志与网络       | HttpStatus             |


## Apache Commons 工具类

Apache 提供了大量实用的 Java 工具类库，最著名的是 [Apache Commons](https://commons.apache.org/) 项目，它被广泛用于 Java 开发中，提供了对集合、字符串、IO、反射、日期、网络等常见功能的封装。
| 分类           | 工具类                     | 所属包（Maven）                 | 说明                                                         |
|----------------|----------------------------|----------------------------------|--------------------------------------------------------------|
| 字符串         | StringUtils                | commons-lang3                   | 字符串处理（空判断、截取、替换等）                           |
| 字符串         | StringEscapeUtils          | commons-text                    | HTML/XML/Java/SQL 转义与反转义                              |
| 字符串         | WordUtils                  | commons-text                    | 单词操作（大小写、换行等）                                  |
| 数组与对象     | ArrayUtils                 | commons-lang3                   | 数组操作（添加、删除、合并等）                               |
| 数组与对象     | ObjectUtils                | commons-lang3                   | 对象比较、默认值、克隆等                                    |
| 集合           | CollectionUtils            | commons-collections4            | 集合操作（过滤、交集、差集、是否为空等）                     |
| 集合           | MapUtils                   | commons-collections4            | Map 操作（取值、合并、是否为空等）                           |
| 文件与IO       | FileUtils                  | commons-io                      | 文件拷贝、移动、删除、读写等                                 |
| 文件与IO       | IOUtils                    | commons-io                      | IO 流的复制、关闭、读取等                                     |
| 文件与IO       | FilenameUtils              | commons-io                      | 路径/文件名提取、转换                                        |
| 文件与IO       | FileCopyUtils              | spring-core                     | Spring 文件拷贝工具                                          |
| 文件与IO       | ResourceUtils              | spring-core                     | Spring 资源加载工具                                          |
| 文件与IO       | StreamUtils                | spring-core                     | Spring 流处理工具                                            |
| 日期与时间     | DateUtils                  | commons-lang3                   | 日期加减、截断                                               |
| 日期与时间     | DurationFormatUtils        | commons-lang3                   | 时间段格式化                                                 |
| 日期与时间     | FastDateFormat             | commons-lang3                   | 线程安全的日期格式化工具                                     |
| Bean与反射     | BeanUtils                  | commons-beanutils               | Bean 属性拷贝、类型转换等                                    |
| Bean与反射     | PropertyUtils              | commons-beanutils               | 反射读写 JavaBean 属性                                       |
| Bean与反射     | FieldUtils                 | commons-lang3                   | 获取/设置字段（包括私有字段）                                |
| Bean与反射     | MethodUtils                | commons-lang3                   | 获取/调用方法（包括私有方法）                                |
| Bean与反射     | ClassUtils                 | commons-lang3                   | 类操作（判断父子关系、获取类名等）                           |
| 编解码         | Base64                     | commons-codec                   | Base64 编解码                                                 |
| 编解码         | Hex                        | commons-codec                   | Hex 编解码                                                    |
| 编解码         | DigestUtils                | commons-codec                   | MD5、SHA 等摘要加密                                           |
| 编解码         | SerializationUtils         | commons-lang3                   | 对象序列化/反序列化                                          |
| 系统工具       | SystemUtils                | commons-lang3                   | 系统属性/环境变量等                                          |
| 系统工具       | RandomStringUtils          | commons-lang3                   | 生成随机字符串                                                |
| 数字处理       | NumberUtils                | commons-lang3                   | 数字解析、最值、比较等                                       |
| 校验工具       | GenericValidator           | commons-validator               | 通用字段验证（长度、类型、范围）                             |
| 校验工具       | EmailValidator             | commons-validator               | 邮箱格式验证                                                 |
| 校验工具       | UrlValidator               | commons-validator               | URL 格式验证                                                 |
| 校验工具       | CreditCardValidator        | commons-validator               | 信用卡格式验证                                               |
| 网络工具       | HttpStatus                 | spring-web                      | HTTP 状态码常量定义（Spring 提供）                           |
| 异常与日志     | MDC                        | slf4j-api                       | 日志上下文传递                                               |
| AOP 与反射     | ReflectionUtils            | spring-core                     | Spring 反射工具                                              |
| AOP 与反射     | AopUtils                   | spring-aop                      | Spring AOP 工具类                                             |
| AOP 与反射     | AopContext                 | spring-aop                      | 获取当前 AOP 代理对象                                        |



## Google Guava工具类（优雅）

| 分类           | 工具类                   | 说明                                                         |
|----------------|--------------------------|--------------------------------------------------------------|
| 集合           | Lists                    | 创建和操作 List                                              |
| 集合           | Sets                     | 创建和操作 Set                                               |
| 集合           | Maps                     | 创建和操作 Map                                               |
| 集合           | Multimap                 | 一键多值的 Map                                               |
| 集合           | Multiset                 | 允许重复元素的 Set（Bag）                                    |
| 集合           | ImmutableList/Set/Map    | 不可变集合                                                   |
| 集合           | BiMap                    | 值唯一的双向 Map                                             |
| 集合           | Table                    | 二维 Map 结构（行-列-值）                                    |
| 集合           | RangeSet                 | 不重叠的区间集合                                             |
| 集合           | TreeMultimap             | 排序的 Multimap                                              |
| 字符串         | Strings                  | 空判断、填充、重复等                                         |
| 字符串         | Splitter                 | 字符串分割                                                   |
| 字符串         | Joiner                   | 字符串拼接                                                   |
| 字符串         | CharMatcher              | 字符匹配、过滤                                               |
| 字符串         | CaseFormat               | 命名格式转换（如 lowerCamel → UPPER_UNDERSCORE）            |
| 基础工具       | Preconditions            | 参数断言检查                                                 |
| 基础工具       | Optional                 | 可选值，避免 NullPointer                                     |
| 基础工具       | Objects                  | equals、hashCode、toString 辅助                             |
| 基础工具       | MoreObjects              | 更强的 Objects 工具，支持 toStringHelper 等                 |
| 基础工具       | Suppliers                | 延迟加载、缓存 Supplier                                      |
| 基础工具       | Functions                | 函数式工具                                                   |
| 缓存           | Cache                    | 本地缓存接口                                                 |
| 缓存           | CacheBuilder             | 构建缓存（大小、过期策略等）                                 |
| 缓存           | LoadingCache             | 支持自动加载的缓存                                           |
| 并发与限流     | RateLimiter              | 限流器（令牌桶）                                             |
| 并发与限流     | ListeningExecutorService | 支持回调的线程池                                             |
| 并发与限流     | Futures                  | 异步任务处理                                                 |
| 并发与限流     | MoreExecutors            | 创建线程池的工具                                             |
| 哈希           | Hashing                  | 多种哈希算法（Murmur3、SHA-256 等）                         |
| 哈希           | Hasher                   | 构造哈希值                                                   |
| 哈希           | HashCode                 | 表示哈希值对象                                               |
| 比较与排序     | Ordering                 | 构建比较器                                                   |
| 比较与排序     | ComparisonChain          | 链式比较（用于 compareTo）                                   |
| IO与文件       | Files                    | 文件读写、拷贝、哈希等                                       |
| IO与文件       | ByteStreams              | byte 流操作                                                  |
| IO与文件       | CharStreams              | char 流操作                                                  |
| IO与文件       | Closer                   | 自动关闭多个资源                                             |
| IO与文件       | BaseEncoding             | Base64/Base32 编解码                                         |
| 其他           | Throwables               | 异常处理，堆栈打印、转换等                                   |
| 其他           | Stopwatch                | 精确计时器                                                   |
| 其他           | Ints / Longs / Doubles   | 基本类型工具类                                               |


## Hutool工具类

| **模块**             | **介绍**                                         |
| ------------------ | ---------------------------------------------- |
| hutool-aop         | JDK 动态代理封装，提供非 IOC 下的切面支持                      |
| hutool-bloomFilter | 布隆过滤，提供一些 Hash 算法的布隆过滤                         |
| hutool-cache       | 简单缓存实现                                         |
| hutool-core        | 核心，包括 Bean 操作、日期、各种 Util 等                     |
| hutool-cron        | 定时任务模块，提供类 Crontab 表达式的定时任务                    |
| hutool-crypto      | 加密解密模块，提供对称、非对称和摘要算法封装                         |
| hutool-db          | JDBC 封装后的数据操作，基于 ActiveRecord 思想               |
| hutool-dfa         | 基于 DFA 模型的多关键字查找                               |
| hutool-extra       | 扩展模块，对第三方封装（模板引擎、邮件、Servlet、二维码、Emoji、FTP、分词等） |
| hutool-http        | 基于 HttpUrlConnection 的 Http 客户端封装              |
| hutool-log         | 自动识别日志实现的日志门面                                  |
| hutool-script      | 脚本执行封装，例如 Javascript                           |
| hutool-setting     | 功能更强大的 Setting 配置文件和 Properties 封装             |
| hutool-system      | 系统参数调用封装（JVM 信息等）                              |
| hutool-json        | JSON 实现                                        |
| hutool-captcha     | 图片验证码实现                                        |
| hutool-poi         | 针对 POI 中 Excel 和 Word 的封装                      |
| hutool-socket      | 基于 Java 的 NIO 和 AIO 的 Socket 封装                |
| hutool-jwt         | JSON Web Token (JWT)封装实现                       |


## 其它-加密库（BC, CC）

## 模板类
### Redis模板类
### RocketMQ模板类
### File模板类


