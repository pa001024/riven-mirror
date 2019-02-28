export const magic = "ALPHA";
export const version = "1.4.16";
export const updateLogs = [
  {
    version: "1.4.16",
    date: "2019/2/28",
    md: {
      en: `- new mods/new Mutalist Quanta buff (Orb)/new weapon`,
      cn: `- 新MOD/新异融球BUFF/新武器`
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
  /*
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
