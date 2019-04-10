export const magic = "ALPHA";
export const version = "1.5.3";
export const updateLogs = [
  {
    version: "1.5.3",
    date: "2019/4/11",
    md: {
      en: `- UI: add High DPI Mode
- Riven/Setting: update riven editor
- Build/Setting: add global burst sample size
- Build: add build auto save`,
      cn: `- - UI: 添加移动端部分界面缩放的选项
- 紫卡: 更新紫卡输入界面
- 配装: 添加一个爆发伤害计算的采样选项
- 配装: 添加配装页自动保存功能`
    }
  },
  {
    version: "1.5.2",
    date: "2019/4/9",
    md: {
      en: `- Add range support of melee weapons`,
      cn: `- 添加近战范围显示 [查看详细](https://shimo.im/sheets/gPCoXxkrEHMzVf5h/)`
    }
  },
  {
    version: "1.5.1",
    date: "2019/4/3",
    md: {
      en: `- Riven Disposition Updated [See Detail](https://forums.warframe.com/topic/1078776-april-2019-riven-disposition-updates/)
- MOD "Napalm Grenades" Support`,
      cn: `- 裂罅倾向更新 [查看详细](https://forums.warframe.com/topic/1078776-april-2019-riven-disposition-updates/)
- MOD "凝固汽油榴弹" 支持`
    }
  },
  /*
  {
    version: "1.4.22",
    date: "2019/3/30",
    md: {
      en: `- Riven Analyzer: Price data
- Setting: add night mode`,
      cn: `- 紫卡分析: 添加紫卡价格
- 设置: 添加夜间模式`
    }
  },
  {
    version: "1.4.21",
    date: "2019/3/25",
    md: {
      en: `- Riven Analyzer: Now able to select and calculate the current Riven for the benefit of a specific skill (Gara, Khora, Atlas)
- build minimap improvements`,
      cn: `- 紫卡分析: 可选择并计算当前紫卡应用于特定技能的收益 (Gara, Khora, Atlas)
- 配置缩略图改进`
    }
  },
  {
    version: "1.4.20",
    date: "2019/3/16",
    md: {
      en: `- preview(maybe incorrect)
  - New Warframe: Equinox Prime
  - New Weapon: Stradavar Prime, Tipedo Prime
- new feature:
   - Simulacrum: The time limit for the simulation has increased from 10 seconds to 300 seconds (more I am afraid your computer will explode)
   - Simulacrum: Enemies in table mode that are still unable to be killed for more than 10 seconds will be displayed in the last column
- BUG fix:
   - Fixed an issue where the amount of ammunition displayed in the Simulacrum was not correct for weapons that were consumed by abnormal ammunition (such as laser, kohm, etc.)
   - Fixed high-level headshot crit damage formula
   - Fixed an issue where the Edge browser could not properly adjust the enemy level.`,
      cn: `- 预览(可能不准确)
  - 新战甲: Equinox Prime
  - 新武器: 斯特拉迪瓦 Prime、提佩多 Prime
- 新功能:
  - 幻影装置: 模拟的时间上限从10秒增加到了300秒 (再多我怕你电脑会爆炸)
  - 幻影装置: 表格模式中对于超过10秒仍旧无法击杀的敌人，将在最后一格中显示
- BUG修复:
  - 修复非正常弹药消耗的武器(比如射线类、寇恩等)在幻影装置中显示的弹药数不正确的问题
  - 修正橙色以上的爆头暴击公式
  - 修正Edge浏览器无法正常调整敌人等级的问题`
    }
  },
  {
    version: "1.4.19",
    date: "2019/3/11",
    md: {
      en: `- add build minimap`,
      cn: `- 添加配置缩略图`
    }
  },
  {
    version: "1.4.18",
    date: "2019/3/8",
    md: {
      en: `- Warframe Update 24.4.0:
  - New MOD: "Amalgam" series
  - New Weapon: Prisma Grinlok, Tatsu, Larkspur(Archwing), Opticor Vandal
  - New Warframe: Hildryn
  - New Exalted: Balefire
- Melee3.0: Add a swtich to control combo damage multiply`,
      cn: `- Warframe 更新 24.4.0:
  - 新增MOD: "并合"系列
  - 新增武器: 棱晶 葛恩火枪、龙辰、翠雀(空战), 奥堤克光子枪 破坏者
  - 新增战甲: Hildryn
  - 新增显赫: 野火充能
- 近战3.0: 添加取消连击伤害加成的选项`
    }
  }
  {
    version: "1.4.17",
    date: "2019/3/6",
    md: {
      en: `- add warframe buff`,
      cn: `- 添加战甲加成`
    }
  },
  {
    version: "1.4.16",
    date: "2019/2/28",
    md: {
      en: `- new mods / ~~new Mutalist Quanta buff (Orb)~~ / new weapon
- add Wolf of Saturn Six (untest) (2019/3/3)
- add new Mod (devstream) (2019/3/4)`,
      cn: `- 新MOD / ~~新异融球BUFF~~ / 新武器
- 添加土星六号之狼 (未测试) (2019/3/3)
- 添加新系列MOD (devstream) (2019/3/4)`
    }
  },
  {
    version: "1.4.15",
    date: "2019/2/26",
    md: {
      en: `- Fixing the ray weapon multishot does not affect the panel damage
- Fix the melee builder without the use of the Berserker problem.
- add Desert Wind and Landslide
- add weapon forma count`,
      cn: `- 修复射线武器多重不影响面板的问题
- 修复近战配卡不使用狂战士的问题
- 加入沙漠之风 土石塌方计算
- 增加武器极化次数计算`
    }
  },
  {
    version: "1.4.14",
    date: "2019/2/18",
    md: {
      en: `- Fixing the firing rate calculation problem of "charged" weapons (via 鸦夜星河)
- Add Condition Overload's quantitative calculation (automatically use the current "Average Proc QE", can be manually disabled)`,
      cn: `- 修复蓄力武器的持续射速计算的问题 (via 鸦夜星河)
- 添加异况超量的量化计算(自动带入当前的"状态量期望进行计算" 可手动禁用)`
    }
  },
  {
    version: "1.4.13",
    date: "2019/2/12",
    md: {
      en: `- Add tour `,
      cn: `- 添加使用提示`
    }
  },
  {
    version: "1.4.12",
    date: "2019/2/1",
    md: {
      en: `- Add Exalted Weapon strength buff
- Remove riven in Exalted Weapon (except for virtual weapons: Whipclaw and Shattered Lash)
- Add other info for WIKI/WM
- fix bugs (1.4.12.x)`,
      cn: `- 增加技能武器的基础强度buff
- 移除了显赫武器的裂罅选项 (虚拟技能武器裂罅保留并增加武器选择)
- 增加其他信息 WIKI/WM 相关
- 修复各种BUG (1.4.12.x)`
    }
  },
  {
    version: "1.4.11",
    date: "2019/1/30",
    md: {
      en: `- Add warframe ability data`,
      cn: `- 增加战甲技能数据`
    }
  },
  {
    version: "1.4.10",
    date: "2019/1/28",
    md: {
      en: `- Add warframe auto-fill options
- Add Round Mode in **Simulacrum**`,
      cn: `- 增加战甲自动填充选项
- **幻影装置** 增加逐发模式`
    }
  },
  {
    version: "1.4.9",
    date: "2019/1/26",
    md: {
      en: `- Optimize image loading speed`,
      cn: `- 优化图片加载速度`
    }
  },
  {
    version: "1.4.8",
    date: "2019/1/24",
    md: {
      en: `- new Magnum Force / Physique
- fix reload time algorithm of Zarr, Corinth and Strun`,
      cn: `- 体魄和重装火力改版了 (可能会影响紫卡评分)
- 修正沙皇、科林斯和斯特朗的装填算法`
    }
  },
  {
    version: "1.4.7",
    date: "2019/1/23",
    md: {
      en: `- add Amp Arcanes`,
      cn: `- 添加增幅器赋能`
    }
  },
  {
    version: "1.4.6",
    date: "2019/1/22",
    md: {
      en: `- fix shotgun riven analyze
- use CDN for images`,
      cn: `- 修复霰弹枪紫卡分析
- 转移图片到CDN`
    }
  },
  {
    version: "1.4.5",
    date: "2019/1/21",
    md: {
      en: `- add amp builer / build editor
- fix some enemy data / add new enemy
- fix 'Simulacrum' duplicate calc enemy health type when use 'Damage Model'
- fix 'Probability Visualization' when use Eidolon Damage Model
- add range limit in build
`,
      cn: `- 新增增幅器模拟装配 / 伤害模拟
- 修复部分敌人数据问题 / 添加金星飞机和圆蛛
- 修复伤害模型和幻影装置重复计算敌人血质的问题
- 修复夜灵模型下概率可视化显示不正确的问题
- 新增射程限制显示
`
    }
  },
  {
    version: "1.4.4",
    md: {
      en: `- title will change when page loaded
- fix "Slash When Crit" props effect in status calc
  `,
      cn: `- 标题会随不同页面更新了
- 修复猎人战备类MOD在触发计算中数据错误
  `
    }
  },
  {
    version: "1.4.3",
    md: {
      en: `- Warframe Pol Visualization
- add Probability-Visualization
- MeleeBuildEditor now show **slide crit chance** in slide mode
  `,
      cn: `- 战甲槽位极性可视化
- 概率可视化
- 近战现在在滑行攻击模式下显示 **滑行暴击几率** 了
  `
    }
  },
  {
    version: "1.4.2",
    md: {
      en: `+ fix weapon data
+ add damage model (test)
  `,
      cn: `+ 修复部分武器数据错误
+ 新增 **伤害模型** 功能 (试行)
  `
    }
  },
  {
    version: "1.4.1",
    md: {
      en: `+ add Robotic weapons data
+ replace icons
+ add user login
  `,
      cn: `+ 新增守护武器数据
+ 更换部分图标
+ 增加用户登录页面
  `
    }
  },
  {
    version: "1.4.0",
    md: {
      en: `+ fix some bugs
+ new domain **[Riven.IM]** active
+ new index page
  `,
      cn: `+ 修复了一些bug
+ 启用新域名 **「Riven.IM」**
+ 新版首页
  `
    }
  },
  {
    version: "1.3.9",
    md: {
      en: `+ **[Riven Analyze]** Add configureable melee range & combo support`,
      cn: `+ **[紫卡分析]** 添加了对近战紫卡范围和连击属性的支持，评分更加有参考价值，如果不需要可以在选项中设置`
    }
  }
  /**/
];
