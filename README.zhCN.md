# Riven Mirror

<p align="center">
  <a href="https://riven.im"><img alt="Website" src="https://img.shields.io/website/https/riven.im"></a>
  <a href="https://circleci.com/gh/pa001024/riven-mirror/tree/dev"><img src="https://img.shields.io/circleci/project/github/pa001024/riven-mirror/dev.svg" alt="Build Status"></a>
  <br>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/david/pa001024/riven-mirror" alt="Dependencies"></a>
  <a href="https://github.com/pa001024/riven-mirror"><img src="https://img.shields.io/github/license/pa001024/riven-mirror" alt="License"></a>
  <a href="https://discord.gg/m8pGvfP"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat"></a>
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/pa001024/riven-mirror">
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/pa001024/riven-mirror.svg" alt="Chat"></a>
</p>

> 此项目意为创建一个裂罅MOD的快捷鉴别工具

> 本项目目前处于ALPHA阶段 很多功能不完善请注意

## 项目介绍

详见WIKI: [A测公式帖](https://gitee.com/pa001024/riven-mirror/wikis/A测公式贴)

## 近期 TODO-LIST

- [ ] 账号

## 特性

- 输入
  - [x] MOD截图识别
    - [x] 英文识别
  - [x] 文本输入
  - [x] 手动选择属性
  - [x] 随机Roll
  - ~~[x] 二维码~~
- 编辑
  - [x] 自主选卡
  - [x] 统一加成
- 输出
  - [ ] 多方案比较
  - [x] 派系伤害模拟
  - [x] 自动配卡
  - [x] 基准值评分
- [x] 武器配装
  - [x] 触发计算
  - [x] 派系计算
  - [x] 幻影装置
  - [x] 概率计算

## 架构
目前转ssr中

目标架构:

本地缓存数据 在首次加载时读入IndexedDB 之后可直接调用IndexedDB进行读写操作

需要注意同步问题 每次版本更新之后更换hash或者tag以重新下载数据

进入某页面之后需按默认自动填充缺失

武器架构

分层结构:

族(Rubico)->体(Rubico Prime)->模(3X Scope)->伤(Direct)->敌(Coprus Elite)

分别存为RivenDB WeaponDB WeaponMode(自动生成) WeaponDamage(自动生成) EnemyDB

加载过程分为网络过程和本地过程 离线自动降级


## 贡献

没什么要求，直接提交MR即可。

本地编译设置下镜像：
```bash
yarn config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
yarn config set ELECTRON_BUILDER_BINARIES_MIRROR https://npm.taobao.org/mirrors/electron-builder-binaries/
```


## change log

1.6.0
- [新] 搜索工具 (可搜索中英文武器/MOD/战甲名字)

1.5.7:
- 添加新武器和战甲

1.5.6:
- 空战武器紫卡
- 添加是否使用致命效率开关 (默认禁用)

1.5.4:
- Zaw 模拟: 瘟疫伤害数据重置 [查看详细](https://warframe.huijiwiki.com/p/29884)

1.5.3:
- UI: 添加移动端部分界面缩放的选项
- 紫卡: 新紫卡输入界面 (可在设置中禁用)
- 配装: 添加一个爆发伤害计算的采样大小选项
- 配装: 添加配装页自动保存功能

1.5.2:
- 添加近战范围显示 [查看详细](https://shimo.im/sheets/gPCoXxkrEHMzVf5h/)

1.5.1:
- 裂罅倾向更新 [查看详细](https://forums.warframe.com/topic/1078776-april-2019-riven-disposition-updates/)
- MOD "凝固汽油榴弹" 支持

1.4.22:
- 紫卡分析: 添加紫卡价格
- 设置: 添加夜间模式

1.4.21:
- 紫卡分析: 可选择并计算当前紫卡应用于特定技能的收益 (Gara, Khora, Atlas)
- 配置缩略图改进

1.4.20:
- 预览(可能不准确)
  - 新战甲: Equinox Prime
  - 新武器: 斯特拉迪瓦 Prime、提佩多 Prime
- 新功能:
  - 幻影装置: 模拟的时间上限从10秒增加到了300秒 (再多我怕你电脑会爆炸)
  - 幻影装置: 表格模式中对于超过10秒仍旧无法击杀的敌人，将在最后一格中显示
- BUG修复:
  - 修复非正常弹药消耗的武器(比如射线类、寇恩等)在幻影装置中显示的弹药数不正确的问题
  - 修正橙色以上的爆头暴击公式
  - 修正Edge浏览器无法正常调整敌人等级的问题

1.4.19:
- 添加配置概要

1.4.18:
- Warframe 更新 24.4.0:
  - 新增MOD: "并合"系列
  - 新增武器: 棱晶 葛恩火枪、龙辰、翠雀(空战), 奥堤克光子枪 破坏者
  - 新增战甲: Hildryn
  - 新增显赫: 野火充能
- 近战3.0: 添加取消连击伤害加成的选项

1.4.17:
- 添加战甲加成

1.4.16:
- 新MOD(潘塔 葛拉卡达等专属卡) / 新武器(恶狼战锤)
- 添加土星六号之狼 (未测试) (2019/3/3)
- 添加新系列MOD (devstream) (2019/3/4)

1.4.15:
- 修复射线武器多重不影响面板的问题
- 修复近战配卡不使用狂战士的问题
- 加入沙漠之风 土石塌方计算
- 增加武器极化次数计算

1.4.14:
- 修复蓄力武器的持续射速计算的问题 (via 鸦夜星河)
- 添加异况超量的量化计算(自动带入当前的"状态量期望进行计算" 可手动禁用)

1.4.13:
- 添加使用提示

1.4.12:
- 增加技能武器的基础强度buff
- 移除了显赫武器的裂罅选项 (虚拟技能武器裂罅保留并增加武器选择)
- 增加其他信息 WIKI/WM 相关

1.4.11:
- 增加战甲技能数据

1.4.10
- 增加战甲自动填充选项
- **幻影装置** 增加逐发模式

1.4.9: 优化图片加载速度

1.4.8:
- 体魄和重装火力改版了 (可能会影响紫卡评分)
- 修正沙皇、科林斯和斯特朗的装填算法

1.4.7: 添加增幅器赋能

1.4.6:
- 修复霰弹枪紫卡分析
- 转移图片到CDN

1.4.5:
- 新增增幅器模拟装配 / 伤害模拟
- 修复部分敌人数据问题 / 添加金星飞机和圆蛛
- 修复伤害模型和幻影装置重复计算敌人血质的问题
- 修复夜灵模型下概率可视化显示不正确的问题
- 新增射程限制显示

1.4.4:
- 近战现在在滑行攻击模式下显示 **滑行暴击几率** 了
- 标题会随不同页面更新了

1.4.3:
- 战甲槽位极性可视化
- 概率可视化

1.4.2: 新增伤害模型功能，可以将伤害按照不同对象的血肉类型进行模拟，也预制了夜灵的模型（暂时没有幻影装置那么精确，之后会改进）

1.4.0:  增加了新的首页，新的名字「极镜」，新的域名，为了有一个新的开始

1.3.4~1.3.9: 各种各种BUG修复

1.3.3: 技术上(负)优化了一下加载速度

1.3.0~1.3.2:
- 新增战甲配装功能
- 加入了金星的武器和MOD

1.2.9:
- 新功能: 极化和容量显示
- 算法更新: 修正一些错误的算法
  - 修正加法触发和连击触发
  - 修正射线类武器多重对触发的错误加成
  - 修正平均触发伤害算法

1.2.8: 更新武器选择器: 支持使用/weapon#ZAW 直接跳转到相应tab ZAW术语修改

1.2.7: 新功能: 触发计算 上线 / 实时信息网络优化

1.2.6: 添加觉醒P/救赎P相关信息

1.2.5: 修复在老版本浏览器中实时信息页面无法滚动的问题

1.2.3 / 1.2.4: 修复一些BUG

1.2.2: 更新新编码方式 (RMEncoding2.0) 修正牛吼的buff类型

1.2.1: 修复一些BUFF和分享方面的BUG

1.2.0:
- 属性名国际化
- 武器配装新属性投射物速度
- 关联异融电盾元素附加BUFF的效果现在可以正确计算了 (有飞行时间的会合成复合元素反之不会)
- 现在BUFF可以随链接分享了

1.1.7: 修正英文紫卡识别问题

1.1.6: 紫卡编辑器新外观 优化2+1-紫卡快速输入 武器配装快速选择添加4活动元素

1.1.5: 小丑BUFF移动到最终伤害 新增DJ4技能的BUFF

1.1.4: 更新最佳紫卡算法 幻影装置默认等级155->160

1.1.3: 更新组合枪属性 修复弱点专精P数据错误

1.1.2: 添加国服翻译选项

1.1.1: 添加金星赏金任务

1.1.0: 新增Zaw和组合枪(kitgun)的紫卡分析功能

1.0.9: 更新译名与游戏同步

1.0.8: 新增金星时钟显示/修正数据译名等问题

1.0.7: 新增组装枪模拟

1.0.6: 更新金星平原系列武器/裂罅倾向改动

1.0.5: 修复数值变动过小时不显示变动的bug

1.0.4: 修正狂战士无法正常工作的bug/添加天穹之顶次要模式

1.0.3: 修正月神狩弓无法安装MOD的bug

1.0.2: 给武器配装页增加分享按钮/修正zaw部件的错误

1.0.1: 新紫卡创建页面/修正部分翻译错误

1.0.0 本地化代码重构

0.9.1 加成系统独立

0.9.0 新界面/性能优化

0.8.0 幻影装置发布/赋能完整支持

0.7.0 首页发布

0.6.0 武器配装发布

0.5.0 第一次发布

0.4.0 实现洗卡模拟

0.3.0 实现黄历

0.2.4 实现最佳紫卡生成

0.2.3 支持二维码 支持猎人战备

0.2.2 支持近战MOD

0.2.1 实现了元素类型限制 以及追随者MOD限制

0.2.0 demo2 实现了自动配卡标准输出

0.1.0 demo1 实现了mod截图识别
