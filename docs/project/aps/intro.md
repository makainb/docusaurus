---
title: 什么是排产
sidebar_position: 1
---

制造业里最让人抓狂的两个字，不是“交期”，也不是“库存”，而是：排产。

看似一个排程表，背后牵扯着订单交付、库存周转、设备负载、物料到货、人员排班、客户催货、老板催利润。稍有一步排错，前线就停工，仓库就爆表，领导那边电话就开始响。

很多人说：“我已经上了系统，也建了BOM，但产线还是乱，一天到晚改计划、调物料、补工单，根本忙不过来。”

其实问题根本不是“系统不好”，而是 **你没搞懂计划逻辑这套底层“通路”**

——它不是靠一张表排出来的，而是一整套从 **订单→BOM→物料→工序→产能→计划的“链式闭环”**。

今天我们就来把这套逻辑从头到尾捋一遍，讲完你就明白，排产这事，真不是拍脑袋排的。

## 1 搞清楚“计划”到底是干啥的？

很多人以为“计划”就是“排时间”， 但实际上，计划的本质是平衡资源与需求之间的矛盾。
- 换句话说，你手上有订单，是“需求”；
- 你车间有人、有料、有设备，是“资源”；
- 计划的任务就是把这俩之间的关系捋顺。

所以一个靠谱的生产计划，应该能回答这几个问题：
- 我们到底该生产哪些产品？
- 每个产品需要多少材料、用哪些设备、安排多长时间？
- 什么时候该买料、什么时候该备料、什么时候开始动工？
- 如果这个单子插队，会不会影响其他客户的交期？

这些都不是脑袋能算出来的，而是需要一个结构化的逻辑链来支撑。而这个逻辑链的起点，就从BOM说起。



## 2 BOM不是“物料清单”，是计划的“发动机”

什么是BOM？有人会说是“Bill of Materials”，是“物料清单”。  
错，BOM不是静态清单，而是“制造路径图”。

举个例子，我们要做一把椅子，你以为BOM长这样：
- 实木腿 × 4
- 椅背 × 1
- 坐垫 × 1
- 螺丝 × 12

但如果你的工厂是“自主加工”+“部分外协”，那真实的BOM长成这样：
- 椅背：原料木板（内部开料）、打磨（人工）、包布（外协）
- 坐垫：PU材料（采购）、模具压成型（内制）
- 木腿：标准件（库存现货）

也就是说，BOM不仅决定了你需要什么，还决定了怎么做、在哪做、谁来做。

**这就涉及到计划的第一步** ：  
订单来了 → 拆解BOM → 主生产计划（MPS） → 物料需求计划（MPR） → 推动采购（库存） → 生成生产工单

如果你BOM没维护清楚，比如：
- 工艺流程没写
- 用料单位错了（PCS/套/公斤乱）
- 层级关系乱（多级BOM没展清楚）
- 物料替代规则没录

那你算出来的计划就是错的，错了之后采购跟着瞎买，产线没法开工，排产表再漂亮也白搭。

## 3 物料计划：搞清楚“啥时候要料”和“料够不够”
BOM拆完之后，你需要知道下一步：我啥时候该准备这些料？料够不够？是不是得先买？

这时候就要引入一个关键角色：MRP（物料需求计划）。

它是干嘛的？一句话解释：把订单转化为“采购”和“生产”的清单，并自动考虑库存、在途、交期、批量。

比如说你要生产100台机器，BOM里说每台要2个电机：库存里还有30个，之前下过订单，还有40个在路上，实际只需要再买130个吗？不对！你得看这些在途能不能准时到、有没有批次限制、有没有优先级。

所以MRP不能靠人脑跑，得靠系统逻辑，一般会跑出一张叫“物料需求分析表”：显示订单的计划生产时间，显示原材料、外购件的计算采购时间，显示每个工序级计划的生产时间，显示物料的流转时间。

这个表一跑，采购就知道该干嘛了，计划就能同步给生产团队安排工序——这就开始进入排产了。

## 4 排产不是“拉个表格”，而是复杂的“资源统筹”

到了这一步，大多数人都犯一个错：拿个Excel排排产能，画个甘特图，搞定。

但真实世界是复杂的，你需要考虑至少这5个变量：

- 产能：人有多少、设备能用多久、是否可加班
- 工艺：顺序有无并行、是否串联、多道工序用同一设备
- 物料：有没有料、有没有采购未到、有没有替代
- 交期：哪个单最急、哪个单能压后
- 换线/切换成本：频繁换模、换设备、调设备，损耗大

一个靠谱的排产逻辑，应该像这样：按交期优先级 → 根据产能池排任务 → 校验物料可用性 → 生成工序级计划表

有些公司会用APS（高级计划排程）系统，有些用MES系统里的排程模块，没系统的只能人工手排，但逻辑不能变。


## 5 怎么用APS系统把生产计划真正跑起来？
前面说了那么多，其实很多人卡在一点上：我知道逻辑了，但靠人扛根本扛不住，这事是不是该让系统来干？

答案是：对，但不是所有APS都能干好生产计划这件事。咱先说说APS到底能干嘛，然后再说你该怎么用。

### 5.1 APS能做什么？核心就是“四算一协同”：

- BOM管理：多级BOM、工艺路线、版本控制等，保障“拆得准”
- MRP运算：根据订单+BOM+库存跑出物料需求，决定“买什么、买多少、什么时候买”
- 生产工单生成：系统自动从订单生成制造任务、分批分段、下发工序
- 产能负载计算：判断工序排程与设备资源是否冲突，保障“排得动”
- 跨模块协同：采购、库存、销售、车间全打通，信息一个入口流到底

一句话，APS不是排产Excel的替代品，而是排产背后的“大脑中枢”。

### 5.2 怎么用APS，真正把排产逻辑跑通？
你得让APS系统“跑”起来，而不是“记录”而已。


下面这套动作顺下来，基本就能把你原来靠Excel跑的全替换掉：

Step 1：建立结构化BOM和工艺路线
- BOM每一级都要维护清楚，不能只写顶层
- 每道工序、加工时间、是否并行、用什么设备、用什么人都得配置

Step 2：跑MRP 下完销售订单或预测订单
- 系统根据BOM和库存运算，自动生成 **【采购计划】+【原材料需求计划】+【生产工单】**
- 明确哪天该买啥、哪天该开始做、预计啥时候交货

Step 3：产能评估 + 排程建议
- 系统校验设备、人员的可用时间段，给出推荐排程
- 有冲突的地方预警，让你可以提前调整（不是等爆了再救）

Step 4：下发工单 + MES联动
- 工单一旦下发，MES或者工位就能实时知道自己下一步干什么
- 实时反馈回APS，比如进度条、完工数、异常记录等

APS里的生产计划不是“一排就定”，而是“能动能调”。有紧急插单？物料延迟？APS系统会重新跑影响分析，提醒你调整顺序

### 5.3 为什么很多企业APS排产用不起来？
不是不会，是这三点没打通：
- BOM和工艺路线太粗，系统根本跑不出物料清单
- 计划和执行断层，MES没接上，反馈不上来
- 只用APS当“订单登记簿”，没用它来推逻辑、控进度

所以很多企业花了几十万买APS，结果还是靠老王用Excel天天改表格，那你不如不上。

真正用得好的APS，是每个生产动作都有数据来源、都有交付节点、有反馈机制、有预警提示。


最后总：

别再拿排产表当交差，你得先搞清楚这套计划逻辑

排产这事，不是调个顺序那么简单，而是打通“需求-资源-执行”的一整条逻辑链。

你BOM拆得清、物料算得准、任务安排合理、执行有反馈，计划就能跑得起来。

要是这些环节靠拍脑袋、靠人扛，那你就算上再多系统、画再多表，也只是在救火。

核心目的：计划指导生产，生产修正计划。


原则：

生产全部走工序，示范工厂就是因为外购件没走工序，组件拼装不走工序，开报工没有统一而不好控制行为。