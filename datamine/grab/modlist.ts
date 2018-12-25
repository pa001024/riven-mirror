import _ from "lodash";

// data from https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%AE%8A:%E8%AF%A2%E9%97%AE/format%3Djson/limit%3D500/link%3Dall/headers%3Dshow/searchlabel%3DJSON/valuesep%3D,/template%3DModTableEntry/introtemplate%3DModTableHead/outrotemplate%3DModTableTail/offset%3D/-5B-5B%E6%A6%82%E5%BF%B5:Warframe-20mod-20list-5D-5D/-3FEffect/-3FEquippedon/-3FTransmutable/-3FPolarity/-3FRarity/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue
let data = {
  "Mesa的华尔兹": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mesa]]的[[Peacemaker|和平使者]]技能"
      ],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "Mesa的华尔兹",
    "fullurl": "https://warframe.huijiwiki.com/wiki/Mesa%E7%9A%84%E5%8D%8E%E5%B0%94%E5%85%B9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "三幂之力": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ivara]]的[[Quiver|战术箭袋]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Ivara]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "三幂之力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%B8%89%E5%B9%82%E4%B9%8B%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "不屈不挠": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''抗击倒几率''' 并且 <span  style=\"color:green;\" class=\" \">提升</span> '''护盾回复速率'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "不屈不挠",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%B8%8D%E5%B1%88%E4%B8%8D%E6%8C%A0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "不朽意志": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''濒死时限'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "不朽意志",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%B8%8D%E6%9C%BD%E6%84%8F%E5%BF%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "不竭贪婪": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "不竭贪婪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%B8%8D%E7%AB%AD%E8%B4%AA%E5%A9%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "中子星爆": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nova]]的[[Null Star|湮灭流星群]]技能"
      ],
      "Equippedon": [
        "[[Nova]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "中子星爆",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%B8%AD%E5%AD%90%E6%98%9F%E7%88%86",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "二元性状": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "二元性状",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%BA%8C%E5%85%83%E6%80%A7%E7%8A%B6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "亵渎清算": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Oberon]]的[[Reckoning|惩戒清算]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Oberon]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "亵渎清算",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%BA%B5%E6%B8%8E%E6%B8%85%E7%AE%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "体魄": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>生命值上限"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "体魄",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%BD%93%E9%AD%84",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "侦敌雷达": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>团队的侦敌雷达范围"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "侦敌雷达",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%BE%A6%E6%95%8C%E9%9B%B7%E8%BE%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "保温服": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">减轻</span> '''[[File:Cold_b.png|x18px|link=伤害 2.0/冰冻伤害]]&thinsp;[[伤害 2.0/冰冻伤害|<span style=\"color:#11559A;\">冰冻</span>]][[危机]]'''对护盾的影响"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "保温服",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%BF%9D%E6%B8%A9%E6%9C%8D",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "信号闪光": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Excalibur]]的[[Radial Blind|致盲]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Excalibur]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "信号闪光",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E4%BF%A1%E5%8F%B7%E9%97%AA%E5%85%89",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "催泪毒雾": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ash]]的[[Smoke Screen|烟幕]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Ash]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "催泪毒雾",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%82%AC%E6%B3%AA%E6%AF%92%E9%9B%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "元素沙暴": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Inaros]]的[[Sandstorm|吞天沙暴]]技能"
      ],
      "Equippedon": [
        "[[Inaros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "元素沙暴",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%85%83%E7%B4%A0%E6%B2%99%E6%9A%B4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "充能反弹": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>充能格挡时反弹的伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "充能反弹",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%85%85%E8%83%BD%E5%8F%8D%E5%BC%B9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "充能电幕": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Volt]]的[[Electric Shield|电磁屏障]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Volt]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "充能电幕",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%85%85%E8%83%BD%E7%94%B5%E5%B9%95",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "入侵者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">降低</span> '''破解控制台的难度'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "入侵者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%85%A5%E4%BE%B5%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "全蚀": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mirage]]的[[Eclipse|黯然失色]]技能"
      ],
      "Equippedon": [
        "[[Mirage]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "全蚀",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%85%A8%E8%9A%80",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "全面驱动": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "全面驱动",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%85%A8%E9%9D%A2%E9%A9%B1%E5%8A%A8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "再生分流": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>[[health|生命]]自然回复，<span  style=\"color:red;\" class=\" \">增加</span>[[shield|护盾]]回充延迟"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "再生分流",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%8D%E7%94%9F%E5%88%86%E6%B5%81",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冰冷跃动": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且使旋身飞跃造成'''[[File:Cold_b.png|x18px|link=伤害 2.0/冰冻伤害]]&thinsp;[[伤害 2.0/冰冻伤害|<span style=\"color:#11559A;\">冰冻</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "冰冷跃动",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B0%E5%86%B7%E8%B7%83%E5%8A%A8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冰冷雪崩": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Frost]]的[[Avalanche|雪崩]]技能"
      ],
      "Equippedon": [
        "[[Frost]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "冰冷雪崩",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B0%E5%86%B7%E9%9B%AA%E5%B4%A9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冰封护罩": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Frost]]的[[Snow Globe|冰雪护罩]]技能"
      ],
      "Equippedon": [
        "[[Frost]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "冰封护罩",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B0%E5%B0%81%E6%8A%A4%E7%BD%A9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冲击预感": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>战甲的失衡（硬直）或击倒免疫时间"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "冲击预感",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B2%E5%87%BB%E9%A2%84%E6%84%9F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冲刺": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''冲刺速度'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "冲刺",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B2%E5%88%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冲刺提升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>战甲冲刺速度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "冲刺提升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B2%E5%88%BA%E6%8F%90%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "冷静与疯狂": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Equinox]]的[[Rest & Rage|暂息-怒气]]技能"
      ],
      "Equippedon": [
        "[[Equinox]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "冷静与疯狂",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%86%B7%E9%9D%99%E4%B8%8E%E7%96%AF%E7%8B%82",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "净化斩": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Excalibur]]的[[Slash Dash|突斩]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Excalibur]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "净化斩",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%87%80%E5%8C%96%E6%96%A9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "净化烈焰": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ember]]的[[Fire Blast|火焰冲击]]技能（仅限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Ember]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "净化烈焰",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%87%80%E5%8C%96%E7%83%88%E7%84%B0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "减震器": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 倒地时的'''伤害抗性'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "减震器",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%87%8F%E9%9C%87%E5%99%A8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "凤凰新生": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Oberon]]的[[Renewal|疗愈脉动]]技能"
      ],
      "Equippedon": [
        "[[Oberon]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "凤凰新生",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%87%A4%E5%87%B0%E6%96%B0%E7%94%9F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "刀翼闪击": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "刀翼闪击",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%88%80%E7%BF%BC%E9%97%AA%E5%87%BB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "分裂槌音": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "分裂槌音",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%88%86%E8%A3%82%E6%A7%8C%E9%9F%B3",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "刺骨战吼": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Rhino]]的[[Roar|战吼]]技能"
      ],
      "Equippedon": [
        "[[Rhino]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "刺骨战吼",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%88%BA%E9%AA%A8%E6%88%98%E5%90%BC",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "削甲手里剑": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ash]]的[[Shuriken|手里剑]]技能"
      ],
      "Equippedon": [
        "[[Ash]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "削甲手里剑",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%89%8A%E7%94%B2%E6%89%8B%E9%87%8C%E5%89%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "剧毒升腾": {
    "printouts": {
      "Effect": [
        "为满能量情况下的旋身飞跃增加[[File:Toxin_b.png|x18px|link=Damage 2.0/Toxin Damage]]&thinsp;[[Damage 2.0/Toxin Damage|<span style=\"color:#578808;\">毒素</span>]]伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "剧毒升腾",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%89%A7%E6%AF%92%E5%8D%87%E8%85%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "剧毒飞腾": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且旋身飞跃造成'''[[File:Toxin_b.png|x18px|link=Damage 2.0/Toxin Damage]]&thinsp;[[Damage 2.0/Toxin Damage|<span style=\"color:#578808;\">毒素</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "剧毒飞腾",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%89%A7%E6%AF%92%E9%A3%9E%E8%85%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "割魂火圈": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "割魂火圈",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%89%B2%E9%AD%82%E7%81%AB%E5%9C%88",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "力量窜升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>[[Power Strength|技能强度]]，<span  style=\"color:green;\" class=\" \">抵抗</span>[[knockdown|击倒]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "力量窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8A%9B%E9%87%8F%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "加剧反射": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>技能施放速度，<span  style=\"color:red;\" class=\" \">降低</span>[[Power Efficiency|技能效率]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "加剧反射",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8A%A0%E5%89%A7%E5%8F%8D%E5%B0%84",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "动能碰撞": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Volt]]的[[Speed|加速]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Volt]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "动能碰撞",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8A%A8%E8%83%BD%E7%A2%B0%E6%92%9E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "包覆游云": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "包覆游云",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8C%85%E8%A6%86%E6%B8%B8%E4%BA%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "化像之道": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Atlas]]的[[Landslide|土石塌方]]技能"
      ],
      "Equippedon": [
        "[[Atlas]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "化像之道",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8C%96%E5%83%8F%E4%B9%8B%E9%81%93",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "匿踪窜升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>侦测范围，以及飞身瞄准和壁面攀附的时间"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "匿踪窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8C%BF%E8%B8%AA%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "华彩刀剑": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Excalibur]]的[[Exalted Blade|显赫刀剑]]技能"
      ],
      "Equippedon": [
        "[[Excalibur]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "华彩刀剑",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8D%8E%E5%BD%A9%E5%88%80%E5%89%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "协力窜升": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "协力窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8D%8F%E5%8A%9B%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "卸能打击": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nekros]]的[[Soul Punch|灵魂重击]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Nekros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "卸能打击",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8D%B8%E8%83%BD%E6%89%93%E5%87%BB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "原始暴怒": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>[[Power Strength|技能强度]]，<span  style=\"color:green;\" class=\" \">抵抗</span>[[knockdown|击倒]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "原始暴怒",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8E%9F%E5%A7%8B%E6%9A%B4%E6%80%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "反射防御": {
    "printouts": {
      "Effect": [
        "将有一定几率自动格挡敌人攻击"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "反射防御",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8F%8D%E5%B0%84%E9%98%B2%E5%BE%A1",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "反物质吸收": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nova]]的[[Antimatter Drop|反物质释放]]技能"
      ],
      "Equippedon": [
        "[[Nova]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "反物质吸收",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8F%8D%E7%89%A9%E8%B4%A8%E5%90%B8%E6%94%B6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "反物质地雷": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nova]]的[[Antimatter Drop|反物质释放]]技能"
      ],
      "Equippedon": [
        "[[Nova]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "反物质地雷",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8F%8D%E7%89%A9%E8%B4%A8%E5%9C%B0%E9%9B%B7",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "反转脉冲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Polarize|护盾极化]]技能"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "反转脉冲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%8F%8D%E8%BD%AC%E8%84%89%E5%86%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "合成反射": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "合成反射",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%90%88%E6%88%90%E5%8F%8D%E5%B0%84",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "同化": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nyx]]的[[Absorb|吸收]]技能"
      ],
      "Equippedon": [
        "[[Nyx]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "同化",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%90%8C%E5%8C%96",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "和平挑衅": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Equinox]]的[[Pacify & Provoke|轻抚-激怒]]技能"
      ],
      "Equippedon": [
        "[[Equinox]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "和平挑衅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%92%8C%E5%B9%B3%E6%8C%91%E8%A1%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "团结一致": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>全队成员的护甲值"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "团结一致",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%9B%A2%E7%BB%93%E4%B8%80%E8%87%B4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "圣域爆发": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Oberon]]的[[Hallowed Ground|神圣领域]]技能"
      ],
      "Equippedon": [
        "[[Oberon]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "圣域爆发",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%9C%A3%E5%9F%9F%E7%88%86%E5%8F%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "均衡点": {
    "printouts": {
      "Effect": [
        "捡起 '''生命/能量球''' 时恢复部分 '''能量/生命'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "均衡点",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%9D%87%E8%A1%A1%E7%82%B9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "坚忍": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "坚忍",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%9D%9A%E5%BF%8D",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "坚忍窜升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>战甲的[[Warframe_Attributes#Energy|能量上限]]和跑酷速度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "坚忍窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%9D%9A%E5%BF%8D%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "复原装甲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>被击倒时的伤害抗性，<span  style=\"color:red;\" class=\" \">减少</span>[[slide|滑行]]距离"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "复原装甲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%A4%8D%E5%8E%9F%E8%A3%85%E7%94%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "失衡护盾": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mesa]]的[[Shatter Shield|破碎护盾]]技能"
      ],
      "Equippedon": [
        "[[Mesa]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "失衡护盾",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%A4%B1%E8%A1%A1%E6%8A%A4%E7%9B%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "奇异点": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nyx]]的[[Absorb|吸收]]技能"
      ],
      "Equippedon": [
        "[[Nyx]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "奇异点",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%A5%87%E5%BC%82%E7%82%B9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "寒冰之力": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Frost]]的[[Freeze|冻结]]技能"
      ],
      "Equippedon": [
        "[[Frost]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "寒冰之力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%AF%92%E5%86%B0%E4%B9%8B%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "导路龙骸": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Chroma]]的[[Effigy|利欲龙骸]]技能"
      ],
      "Equippedon": [
        "[[Chroma]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "导路龙骸",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%AF%BC%E8%B7%AF%E9%BE%99%E9%AA%B8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "川流不息": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''最大能量'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "川流不息",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%B7%9D%E6%B5%81%E4%B8%8D%E6%81%AF",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "川流不息Prime": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''最大能量'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "川流不息Prime",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%B7%9D%E6%B5%81%E4%B8%8D%E6%81%AFPrime",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "巨大石者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Atlas]]的[[Rumblers|漫步石者]]技能"
      ],
      "Equippedon": [
        "[[Atlas]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "巨大石者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%B7%A8%E5%A4%A7%E7%9F%B3%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "幸存生灵": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nekros]]的[[Soul Punch|灵魂重击]]技能"
      ],
      "Equippedon": [
        "[[Nekros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "幸存生灵",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%B9%B8%E5%AD%98%E7%94%9F%E7%81%B5",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "幼体爆发": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "幼体爆发",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%B9%BC%E4%BD%93%E7%88%86%E5%8F%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "幽影之护": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nekros]]的[[Shadows_Of_The_Dead|亡者幽影]]技能"
      ],
      "Equippedon": [
        "[[Nekros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "幽影之护",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%B9%BD%E5%BD%B1%E4%B9%8B%E6%8A%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "庇护烟幕": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ash]]的[[Smoke Screen|烟幕]]技能"
      ],
      "Equippedon": [
        "[[Ash]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "庇护烟幕",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BA%87%E6%8A%A4%E7%83%9F%E5%B9%95",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "庇护焚炉": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "庇护焚炉",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BA%87%E6%8A%A4%E7%84%9A%E7%82%89",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "延伸": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''技能范围'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "延伸",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BB%B6%E4%BC%B8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "弹性焦点": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "弹性焦点",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BC%B9%E6%80%A7%E7%84%A6%E7%82%B9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "弹指瞬技": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> [[技能效率]]，<span  style=\"color:red;\" class=\" \">降低</span> [[技能持续时间]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "弹指瞬技",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BC%B9%E6%8C%87%E7%9E%AC%E6%8A%80",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "弹道靶心": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mesa]]的[[Ballistic Battery|弹道炮阵]]技能"
      ],
      "Equippedon": [
        "[[Mesa]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "弹道靶心",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BC%B9%E9%81%93%E9%9D%B6%E5%BF%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "强力切换": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "强力切换",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BC%BA%E5%8A%9B%E5%88%87%E6%8D%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "强化刀锋": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:red;\" class=\" \">消耗</span>[[shield|护盾]]，<span  style=\"color:green;\" class=\" \">提升</span>近战[[Melee#Charge_Attacks|蓄力攻击]]的[[Status Effect|异常状态]]的触发几率和伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "强化刀锋",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BC%BA%E5%8C%96%E5%88%80%E9%94%8B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "强化箭袋": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "强化箭袋",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BC%BA%E5%8C%96%E7%AE%AD%E8%A2%8B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "心志偏狭": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>技能的[[Power Duration|技能持续时间]]，<span  style=\"color:red;\" class=\" \">降低</span>[[Power Range|技能范围]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "心志偏狭",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BF%83%E5%BF%97%E5%81%8F%E7%8B%AD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "快速休整": {
    "printouts": {
      "Effect": [
        "利用技能消耗的[[Energy|能量]]来通过<span  style=\"color:green;\" class=\" \">补充</span>[[Shield|护盾]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "快速休整",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BF%AB%E9%80%9F%E4%BC%91%E6%95%B4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "快速充能": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''护盾恢复速率'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "快速充能",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BF%AB%E9%80%9F%E5%85%85%E8%83%BD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "快速切换": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>全队成员的武器收放速度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "快速切换",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E5%BF%AB%E9%80%9F%E5%88%87%E6%8D%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "急流": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Zephyr]]的[[Turbulence|疾风湍流]]技能"
      ],
      "Equippedon": [
        "[[Zephyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "急流",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%80%A5%E6%B5%81",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "怨怒报复": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Chroma]]的[[Vex Armor|怨怒护甲]]技能"
      ],
      "Equippedon": [
        "[[Chroma]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "怨怒报复",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%80%A8%E6%80%92%E6%8A%A5%E5%A4%8D",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "恶怨厅": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mirage]]的[[Hall of Mirrors|镜厅]]技能"
      ],
      "Equippedon": [
        "[[Mirage]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "恶怨厅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%81%B6%E6%80%A8%E5%8E%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "惊惧热浪": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ember]]的[[Fire Blast|火焰冲击]]技能"
      ],
      "Equippedon": [
        "[[Ember]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "惊惧热浪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%83%8A%E6%83%A7%E7%83%AD%E6%B5%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "惩击洗礼": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Oberon]]的[[Smite|惩击]]技能"
      ],
      "Equippedon": [
        "[[Oberon]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "惩击洗礼",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%83%A9%E5%87%BB%E6%B4%97%E7%A4%BC",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "惩戒": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> 对攻击护盾的敌人造成 [[File:Electricity_b.png|x18px|link=伤害 2.0/电击伤害]]&thinsp;[[伤害 2.0/电击伤害|<span style=\"color:#5F04B4;\">电击</span>]] 伤害 的几率"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "惩戒",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%83%A9%E6%88%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "感染毒雾": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Saryn]]的[[Toxic Lash|剧毒鞭苔]]技能"
      ],
      "Equippedon": [
        "[[Saryn]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "感染毒雾",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%84%9F%E6%9F%93%E6%AF%92%E9%9B%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "感染者阻抗": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">降低</span>玩家周围[[Infested]]单位的速度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "感染者阻抗",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%84%9F%E6%9F%93%E8%80%85%E9%98%BB%E6%8A%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "成长之力": {
    "printouts": {
      "Effect": [
        "施加[[Status Effect|异常状态]]时<span  style=\"color:green;\" class=\" \">增加</span>[[Power Strength|技能强度]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "成长之力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%88%90%E9%95%BF%E4%B9%8B%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "战利品探测器": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>团队的寻物雷达范围"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "战利品探测器",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%88%98%E5%88%A9%E5%93%81%E6%8E%A2%E6%B5%8B%E5%99%A8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "战术性撤退": {
    "printouts": {
      "Effect": [
        "战甲生命值低下时<span  style=\"color:green;\" class=\" \">增加</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "战术性撤退",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%88%98%E6%9C%AF%E6%80%A7%E6%92%A4%E9%80%80",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "手枪增幅": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>手枪的伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "手枪增幅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%89%8B%E6%9E%AA%E5%A2%9E%E5%B9%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "手枪弹药搜集者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>拾取的手枪弹药数量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "手枪弹药搜集者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%89%8B%E6%9E%AA%E5%BC%B9%E8%8D%AF%E6%90%9C%E9%9B%86%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "技法连带": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "技法连带",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%80%E6%B3%95%E8%BF%9E%E5%B8%A6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "抗爆覆甲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>对[[File:Blast_b.png|x18px|link=伤害 2.0/爆炸伤害]]&thinsp;[[伤害 2.0/爆炸伤害|<span style=\"color:#B45F04;\">爆炸</span>]]伤害的抗性，<span  style=\"color:red;\" class=\" \">降低</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "抗爆覆甲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%97%E7%88%86%E8%A6%86%E7%94%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "抚慰之风": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nyx]]的[[Psychic Bolts|精神飞刃]]技能"
      ],
      "Equippedon": [
        "[[Nyx]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "抚慰之风",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%9A%E6%85%B0%E4%B9%8B%E9%A3%8E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "护卫传送": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Loki]]的[[Switch_Teleport|移形换位]]技能"
      ],
      "Equippedon": [
        "[[Loki]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "护卫传送",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%A4%E5%8D%AB%E4%BC%A0%E9%80%81",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "护盾瓦解": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">削减</span>任务中所有敌人的护盾"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "护盾瓦解",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%A4%E7%9B%BE%E7%93%A6%E8%A7%A3",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "护盾转移": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Polarize|护盾极化]]技能"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "护盾转移",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%A4%E7%9B%BE%E8%BD%AC%E7%A7%BB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "护盾过载": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Shield Polarize|护盾极化]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "护盾过载",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%A4%E7%9B%BE%E8%BF%87%E8%BD%BD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "护盾速充": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">减少</span>[[shield|护盾]]自然恢复延迟，<span  style=\"color:red;\" class=\" \">降低</span>护盾容量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "护盾速充",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%A4%E7%9B%BE%E9%80%9F%E5%85%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "抵消虫群": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Inaros]]的[[Scarab Swarm|圣甲虫群]]技能"
      ],
      "Equippedon": [
        "[[Inaros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "抵消虫群",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8A%B5%E6%B6%88%E8%99%AB%E7%BE%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "持久力": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>[[Power Duration|技能持续时间]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "持久力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8C%81%E4%B9%85%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "持久力Prime": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>[[Power Duration|技能持续时间]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "持久力Prime",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8C%81%E4%B9%85%E5%8A%9BPrime",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "持久誓约": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "持久誓约",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8C%81%E4%B9%85%E8%AA%93%E7%BA%A6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "指挥家": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "指挥家",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8C%87%E6%8C%A5%E5%AE%B6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "掠夺": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nekros]]的[[Desecrate|亵渎]]技能"
      ],
      "Equippedon": [
        "[[Nekros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "掠夺",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8E%A0%E5%A4%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "探推－挽拉": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Equinox]]的[[Metamorphosis|昼夜交替]]技能（仅限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Equinox]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "探推－挽拉",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%8E%A2%E6%8E%A8%EF%BC%8D%E6%8C%BD%E6%8B%89",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "搏命反扑": {
    "printouts": {
      "Effect": [
        "生命低下时<span  style=\"color:green;\" class=\" \">增加</span>[[Power Efficiency|技能效率]]和[[Power Range|技能范围]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "搏命反扑",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%90%8F%E5%91%BD%E5%8F%8D%E6%89%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "摆荡钩索": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Valkyr]]的[[Rip Line|撕裂钩索]]技能"
      ],
      "Equippedon": [
        "[[Valkyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "摆荡钩索",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%91%86%E8%8D%A1%E9%92%A9%E7%B4%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "撕裂翻转": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且旋身飞跃造成'''[[File:Slash_b.png|x18px|link=伤害 2.0/切割伤害]]&thinsp;[[伤害 2.0/切割伤害|<span style=\"color:;\">切割</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "撕裂翻转",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%92%95%E8%A3%82%E7%BF%BB%E8%BD%AC",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "敌人感应": {
    "printouts": {
      "Effect": [
        "在小地图上显示敌人的位置"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "敌人感应",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%95%8C%E4%BA%BA%E6%84%9F%E5%BA%94",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "救星诱饵": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Loki]]的[[Decoy|诱饵]]技能"
      ],
      "Equippedon": [
        "[[Loki]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "救星诱饵",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%95%91%E6%98%9F%E8%AF%B1%E9%A5%B5",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "无电流飞跃": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>移动力，<span  style=\"color:red;\" class=\" \">中止</span>能量自然回复"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "无电流飞跃",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%97%A0%E7%94%B5%E6%B5%81%E9%A3%9E%E8%B7%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "晶管屏障": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Volt]]的[[Electric Shield|电磁屏障]]技能"
      ],
      "Equippedon": [
        "[[Volt]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "晶管屏障",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%99%B6%E7%AE%A1%E5%B1%8F%E9%9A%9C",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "暗影生命力": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Umbra_Pol.png|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "暗影生命力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9A%97%E5%BD%B1%E7%94%9F%E5%91%BD%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "暗影纤维": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Umbra_Pol.png|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "暗影纤维",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9A%97%E5%BD%B1%E7%BA%A4%E7%BB%B4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "暗影聚精会神": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Umbra_Pol.png|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "暗影聚精会神",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9A%97%E5%BD%B1%E8%81%9A%E7%B2%BE%E4%BC%9A%E7%A5%9E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "机动冲撞": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且旋身飞跃造成'''[[File:Impact_b.png|x18px|link=伤害 2.0/冲击伤害]]&thinsp;[[伤害 2.0/冲击伤害|<span style=\"color:;\">冲击</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "机动冲撞",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9C%BA%E5%8A%A8%E5%86%B2%E6%92%9E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "机甲强化": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "机甲强化",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9C%BA%E7%94%B2%E5%BC%BA%E5%8C%96",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "机甲脉冲": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "机甲脉冲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9C%BA%E7%94%B2%E8%84%89%E5%86%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "杂技装甲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>旋身飞跃期间的伤害抗性，<span  style=\"color:red;\" class=\" \">降低</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "杂技装甲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9D%82%E6%8A%80%E8%A3%85%E7%94%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "极速复元": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">减少</span>[[proc|异常状态]]的持续时间"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "极速复元",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9E%81%E9%80%9F%E5%A4%8D%E5%85%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "构造裂缝": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Atlas]]的[[Tectonics|大地构筑]]技能"
      ],
      "Equippedon": [
        "[[Atlas]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "构造裂缝",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9E%84%E9%80%A0%E8%A3%82%E7%BC%9D",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "枪口闪焰": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mesa]]的[[Shooting Gallery |狂欢靶场]]技能"
      ],
      "Equippedon": [
        "[[Mesa]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "枪口闪焰",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%9E%AA%E5%8F%A3%E9%97%AA%E7%84%B0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "棱彩护卫": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mirage]]的[[Prism|棱镜]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Mirage]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "棱彩护卫",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%A3%B1%E5%BD%A9%E6%8A%A4%E5%8D%AB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "欺幻魔灯": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Titania]]的[[Lantern|幻灯]]技能"
      ],
      "Equippedon": [
        "[[Titania]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "欺幻魔灯",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AC%BA%E5%B9%BB%E9%AD%94%E7%81%AF",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "步枪增幅": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>步枪的伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "步枪增幅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AD%A5%E6%9E%AA%E5%A2%9E%E5%B9%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "步枪弹药搜集者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>拾取的手枪弹药数量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "步枪弹药搜集者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AD%A5%E6%9E%AA%E5%BC%B9%E8%8D%AF%E6%90%9C%E9%9B%86%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "死亡之眼": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>狙击枪的伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "死亡之眼",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AD%BB%E4%BA%A1%E4%B9%8B%E7%9C%BC",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "残响共鸣": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Banshee]]的[[Sonar|声纳]]技能"
      ],
      "Equippedon": [
        "[[Banshee]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "残响共鸣",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AE%8B%E5%93%8D%E5%85%B1%E9%B8%A3",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "残盾转换": {
    "printouts": {
      "Effect": [
        "失去全部[[shields|护盾]]并且在不被中断的情况下完全恢复护盾后获得能量补充"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "残盾转换",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AE%8B%E7%9B%BE%E8%BD%AC%E6%8D%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "残酷无息": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Banshee]]的[[Silence|静音]]技能"
      ],
      "Equippedon": [
        "[[Banshee]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "残酷无息",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AE%8B%E9%85%B7%E6%97%A0%E6%81%AF",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "毒抗": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''[[File:Toxin_b.png|x18px|link=Damage 2.0/Toxin Damage]]&thinsp;[[Damage 2.0/Toxin Damage|<span style=\"color:#578808;\">毒素</span>]] 伤害''' 抗性"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "毒抗",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AF%92%E6%8A%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "毒素抵抗": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "毒素抵抗",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%AF%92%E7%B4%A0%E6%8A%B5%E6%8A%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "永动旋涡": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Vauban]]的[[Vortex|旋涡]]技能"
      ],
      "Equippedon": [
        "[[Vauban]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "永动旋涡",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B0%B8%E5%8A%A8%E6%97%8B%E6%B6%A1",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "永恒之护": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Chroma]]的[[Elemental Ward|元素之护]]技能"
      ],
      "Equippedon": [
        "[[Chroma]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "永恒之护",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B0%B8%E6%81%92%E4%B9%8B%E6%8A%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "永恒战意": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Valkyr]]的[[Warcry|咆哮]]技能"
      ],
      "Equippedon": [
        "[[Valkyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "永恒战意",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B0%B8%E6%81%92%E6%88%98%E6%84%8F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "汲能榨取": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Trinity]]的[[Energy Vampire|能量吸取]]技能"
      ],
      "Equippedon": [
        "[[Trinity]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "汲能榨取",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B1%B2%E8%83%BD%E6%A6%A8%E5%8F%96",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "治愈玻片": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "治愈玻片",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B2%BB%E6%84%88%E7%8E%BB%E7%89%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "活力": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''生命最大值''' 同时 <span  style=\"color:green;\" class=\" \">提升</span> '''最大护盾容量'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "活力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B4%BB%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "活力Prime": {
    "printouts": {
      "Effect": [
        "增加[[Warframe|战甲]]的[[Warframe Attributes#Shields|护盾容量]]和[[Health|生命]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "活力Prime",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B4%BB%E5%8A%9BPrime",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "流线外形": {
    "printouts": {
      "Effect": [
        "提升拔枪速度，滑行，并降低摩擦力。"
      ],
      "Equippedon": [],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "流线外形",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B5%81%E7%BA%BF%E5%A4%96%E5%BD%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "涌流突进": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Excalibur]]的[[Slash Dash|突斩]]技能"
      ],
      "Equippedon": [
        "[[Excalibur]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "涌流突进",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B6%8C%E6%B5%81%E7%AA%81%E8%BF%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "涡卷俯冲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Zephyr]]的[[Dive Bomb|俯冲轰炸]]技能"
      ],
      "Equippedon": [
        "[[Zephyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "涡卷俯冲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B6%A1%E5%8D%B7%E4%BF%AF%E5%86%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "混乱领域": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nyx]]的[[Chaos|混乱]]技能"
      ],
      "Equippedon": [
        "[[Nyx]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "混乱领域",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B7%B7%E4%B9%B1%E9%A2%86%E5%9F%9F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "渗透": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ivara]]的[[Prowl|潜影猎手]]技能"
      ],
      "Equippedon": [
        "[[Ivara]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "渗透",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%B8%97%E9%80%8F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "溢能感应": {
    "printouts": {
      "Effect": [
        "能量全满时可以侦测到一定范围内的敌人"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "溢能感应",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%BA%A2%E8%83%BD%E6%84%9F%E5%BA%94",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "滞痕冰浪": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Frost]]的[[Ice Wave|冰浪]]技能"
      ],
      "Equippedon": [
        "[[Frost]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "滞痕冰浪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%BB%9E%E7%97%95%E5%86%B0%E6%B5%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "漏斗状云": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Zephyr]]的[[Tornado|龙卷云风]]技能"
      ],
      "Equippedon": [
        "[[Zephyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "漏斗状云",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%BC%8F%E6%96%97%E7%8A%B6%E4%BA%91",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "潮汐涌净": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Hydroid]]的[[Tidal_Surge|潮汐浪涌]]技能"
      ],
      "Equippedon": [
        "[[Hydroid]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "潮汐涌净",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%BD%AE%E6%B1%90%E6%B6%8C%E5%87%80",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "激光折射": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "None"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "激光折射",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%BF%80%E5%85%89%E6%8A%98%E5%B0%84",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "激怒": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''倒地时的攻击伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "激怒",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E6%BF%80%E6%80%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "火成碎流": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "火成碎流",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%AB%E6%88%90%E7%A2%8E%E6%B5%81",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "火焰行者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且旋身飞跃造成'''[[File:Heat_b.png|x18px|link=伤害 2.0/火焰伤害]]&thinsp;[[伤害 2.0/火焰伤害|<span style=\"color:#990000;\">火焰</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "火焰行者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%AB%E7%84%B0%E8%A1%8C%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "火焰防护": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''[[File:Heat_b.png|x18px|link=伤害 2.0/火焰伤害]]&thinsp;[[伤害 2.0/火焰伤害|<span style=\"color:#990000;\">火焰</span>]] 伤害''' 抗性"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "火焰防护",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%AB%E7%84%B0%E9%98%B2%E6%8A%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "火绫复苏": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nezha]]的[[Warding Halo|混天火绫]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Nezha]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "火绫复苏",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%AB%E7%BB%AB%E5%A4%8D%E8%8B%8F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "火绫守护": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nezha]]的[[Warding Halo|混天火绫]]技能"
      ],
      "Equippedon": [
        "[[Nezha]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "火绫守护",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%AB%E7%BB%AB%E5%AE%88%E6%8A%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "灵活装甲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>[[Combat_Maneuvers#Sprinting|冲刺速度]]和[[armor|护甲]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "灵活装甲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%B5%E6%B4%BB%E8%A3%85%E7%94%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "灼热跳跃": {
    "printouts": {
      "Effect": [
        "让满能量情况下的旋身飞跃造成[[File:Heat_b.png|x18px|link=伤害 2.0/火焰伤害]]&thinsp;[[伤害 2.0/火焰伤害|<span style=\"color:#990000;\">火焰</span>]]伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "灼热跳跃",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%BC%E7%83%AD%E8%B7%B3%E8%B7%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "灾变连连": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Limbo]]的[[Cataclysm|灾变]]技能"
      ],
      "Equippedon": [
        "[[Limbo]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "灾变连连",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%81%BE%E5%8F%98%E8%BF%9E%E8%BF%9E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "烈焰爆震": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ember]]的[[World On Fire|火海]]技能"
      ],
      "Equippedon": [
        "[[Ember]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "烈焰爆震",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%83%88%E7%84%B0%E7%88%86%E9%9C%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "爆炸戏法": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mirage]]的[[Sleight Of Hand|戏法]]技能"
      ],
      "Equippedon": [
        "[[Mirage]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "爆炸戏法",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%88%86%E7%82%B8%E6%88%8F%E6%B3%95",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "特斯拉陷阱": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Vauban]]的[[Tesla|特斯拉手榴弹]]技能"
      ],
      "Equippedon": [
        "[[Vauban]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "特斯拉陷阱",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%89%B9%E6%96%AF%E6%8B%89%E9%99%B7%E9%98%B1",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狂化冲动": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Valkyr]]的[[Hysteria|狂化爆发]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Valkyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "狂化冲动",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%82%E5%8C%96%E5%86%B2%E5%8A%A8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狂化突击": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Valkyr]]的[[Hysteria|狂化爆发]]技能"
      ],
      "Equippedon": [
        "[[Valkyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "狂化突击",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%82%E5%8C%96%E7%AA%81%E5%87%BB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狂怒标枪": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Excalibur]]的[[Radial Javelin|标枪]]技能"
      ],
      "Equippedon": [
        "[[Excalibur]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "狂怒标枪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%82%E6%80%92%E6%A0%87%E6%9E%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狂暴化": {
    "printouts": {
      "Effect": [
        "战甲 '''将部分生命损耗转化为能量'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "狂暴化",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%82%E6%9A%B4%E5%8C%96",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狂热火球": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ember]]的[[Fireball|火球]]技能"
      ],
      "Equippedon": [
        "[[Ember]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "狂热火球",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%82%E7%83%AD%E7%81%AB%E7%90%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狙击枪弹药搜集者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>狙击枪弹药补给的拾取量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "狙击枪弹药搜集者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%99%E5%87%BB%E6%9E%AA%E5%BC%B9%E8%8D%AF%E6%90%9C%E9%9B%86%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "狡诈窜升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>滑行、<span  style=\"color:green;\" class=\" \">降低</span>摩擦力并<span  style=\"color:green;\" class=\" \">提升</span>[[Power Range|技能范围]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "狡诈窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8B%A1%E8%AF%88%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "猎人肾上腺素": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "猎人肾上腺素",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8C%8E%E4%BA%BA%E8%82%BE%E4%B8%8A%E8%85%BA%E7%B4%A0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "猛毒附加": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Saryn]]的[[Spores|毒性孢子]]技能"
      ],
      "Equippedon": [
        "[[Saryn]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "猛毒附加",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%8C%9B%E6%AF%92%E9%99%84%E5%8A%A0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "生命之池": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Trinity]]的[[Well Of Life|生命之井]]技能"
      ],
      "Equippedon": [
        "[[Trinity]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "生命之池",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%9F%E5%91%BD%E4%B9%8B%E6%B1%A0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "生命力": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''生命最大值'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "生命力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%9F%E5%91%BD%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "生命转换": {
    "printouts": {
      "Effect": [
        "拾取生命球将<span  style=\"color:green;\" class=\" \">提升</span>护甲"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "生命转换",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%9F%E5%91%BD%E8%BD%AC%E6%8D%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "电光冲刺": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且旋身飞跃造成'''[[File:Electricity_b.png|x18px|link=伤害 2.0/电击伤害]]&thinsp;[[伤害 2.0/电击伤害|<span style=\"color:#5F04B4;\">电击</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "电光冲刺",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%B5%E5%85%89%E5%86%B2%E5%88%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "电击加速": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Volt]]的[[Speed|加速]]技能"
      ],
      "Equippedon": [
        "[[Volt]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "电击加速",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%B5%E5%87%BB%E5%8A%A0%E9%80%9F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "电击奇兵": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Volt]]的[[Shock|电击]]技能"
      ],
      "Equippedon": [
        "[[Volt]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "电击奇兵",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%B5%E5%87%BB%E5%A5%87%E5%85%B5",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "电容": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Volt]]的[[Overload|超负荷]]技能"
      ],
      "Equippedon": [
        "[[Volt]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "电容",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%B5%E5%AE%B9",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "电流长矛": {
    "printouts": {
      "Effect": [
        "为满能量情况下的旋身飞跃增加[[File:Electricity_b.png|x18px|link=伤害 2.0/电击伤害]]&thinsp;[[伤害 2.0/电击伤害|<span style=\"color:#5F04B4;\">电击</span>]]伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "电流长矛",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%B5%E6%B5%81%E9%95%BF%E7%9F%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "电磁脉冲场": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">降低</span>[[Corpus]]敌人的射击精准度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "电磁脉冲场",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%94%B5%E7%A3%81%E8%84%89%E5%86%B2%E5%9C%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "疗愈漩涡": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Hydroid]]的[[Undertow|水漩涡]]技能"
      ],
      "Equippedon": [
        "[[Hydroid]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "疗愈漩涡",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%96%97%E6%84%88%E6%BC%A9%E6%B6%A1",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "痛苦阈值": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>硬直回复速度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "痛苦阈值",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%97%9B%E8%8B%A6%E9%98%88%E5%80%BC",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "百折不挠": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''倒地恢复速度''' 并且 <span  style=\"color:green;\" class=\" \">提升</span> '''技能持续时间'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "百折不挠",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%99%BE%E6%8A%98%E4%B8%8D%E6%8C%A0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "盖霜跳马": {
    "printouts": {
      "Effect": [
        "满能量时为旋身飞跃<span  style=\"color:green;\" class=\" \">增加</span>[[File:Cold_b.png|x18px|link=伤害 2.0/冰冻伤害]]&thinsp;[[伤害 2.0/冰冻伤害|<span style=\"color:#11559A;\">冰冻</span>]]伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "盖霜跳马",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9B%96%E9%9C%9C%E8%B7%B3%E9%A9%AC",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "盗贼大师": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''打开上锁箱子的几率'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "盗贼大师",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9B%97%E8%B4%BC%E5%A4%A7%E5%B8%88",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "盗贼天赋": {
    "printouts": {
      "Effect": [
        "标记出在墙后的MOD，并且在小地图上显示MOD和物品"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "盗贼天赋",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9B%97%E8%B4%BC%E5%A4%A9%E8%B5%8B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "目标入定": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "目标入定",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9B%AE%E6%A0%87%E5%85%A5%E5%AE%9A",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "盲怒": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>[[Power Strength|技能强度]]，<span  style=\"color:red;\" class=\" \">降低</span>[[Power Efficiency|技能效率]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "盲怒",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9B%B2%E6%80%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "瞬时坚毅": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''技能强度''' 但是 <span  style=\"color:maroon;\" class=\" \">降低</span> '''技能持续时间'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "瞬时坚毅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9E%AC%E6%97%B6%E5%9D%9A%E6%AF%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "矫捷窜升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">降低</span>滞空时所受伤害，<span  style=\"color:green;\" class=\" \">降低</span>敌人攻击玩家时的[[accuracy|精准度]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "矫捷窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9F%AB%E6%8D%B7%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "矿石凝视": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Atlas]]的[[Petrify|石化凝视]]技能"
      ],
      "Equippedon": [
        "[[Atlas]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "矿石凝视",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%9F%BF%E7%9F%B3%E5%87%9D%E8%A7%86",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "破碎声波": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Banshee]]的[[Sonic Boom|超声波]]技能"
      ],
      "Equippedon": [
        "[[Banshee]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "破碎声波",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A0%B4%E7%A2%8E%E5%A3%B0%E6%B3%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "碎铁弹片": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Rhino]]的[[Iron Skin|钢化皮肤]]技能"
      ],
      "Equippedon": [
        "[[Rhino]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "碎铁弹片",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A2%8E%E9%93%81%E5%BC%B9%E7%89%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "磁吸释放": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Magnetize|磁吸力场]]技能"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "磁吸释放",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A3%81%E5%90%B8%E9%87%8A%E6%94%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "磁浮": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''滑行速度'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "磁浮",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A3%81%E6%B5%AE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "神圣清算": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Oberon]]的[[Reckoning|惩戒清算]]技能"
      ],
      "Equippedon": [
        "[[Oberon]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "神圣清算",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A5%9E%E5%9C%A3%E6%B8%85%E7%AE%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "神针腾跃": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Wukong]]的[[Iron Jab|神针突刺]]技能"
      ],
      "Equippedon": [
        "[[Wukong]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "神针腾跃",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A5%9E%E9%92%88%E8%85%BE%E8%B7%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "私法活力": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "私法活力",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A7%81%E6%B3%95%E6%B4%BB%E5%8A%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "私法追踪": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "私法追踪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A7%81%E6%B3%95%E8%BF%BD%E8%B8%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "空中推进": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>滞空滑行速度，<span  style=\"color:red;\" class=\" \">降低</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "空中推进",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A9%BA%E4%B8%AD%E6%8E%A8%E8%BF%9B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "穿刺抛体": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ivara]]的[[Navigator|导向抛体]]技能"
      ],
      "Equippedon": [
        "[[Ivara]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "穿刺抛体",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A9%BF%E5%88%BA%E6%8A%9B%E4%BD%93",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "穿刺步伐": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 旋身飞跃速度，飞身瞄准及壁面攀附的时间。并且旋身飞跃造成'''[[File:Puncture_b.png|x18px|link=伤害 2.0/穿刺伤害]]&thinsp;[[伤害 2.0/穿刺伤害|<span style=\"color:;\">穿刺</span>]] 伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "穿刺步伐",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%A9%BF%E5%88%BA%E6%AD%A5%E4%BC%90",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "简化": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''技能效率'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "简化",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%AE%80%E5%8C%96",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "精准弹跳": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>生命，<span  style=\"color:red;\" class=\" \">降低</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "精准弹跳",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%B2%BE%E5%87%86%E5%BC%B9%E8%B7%B3",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "精神狂怒": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nyx]]的[[Mind Control|精神控制]]技能"
      ],
      "Equippedon": [
        "[[Nyx]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "精神狂怒",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%B2%BE%E7%A5%9E%E7%8B%82%E6%80%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "紧凑步伐": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>冲刺速度，<span  style=\"color:red;\" class=\" \">降低</span>[[Shield|护盾]]容量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "紧凑步伐",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%B4%A7%E5%87%91%E6%AD%A5%E4%BC%90",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "终结闪光": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Excalibur]]的[[Radial Blind|致盲]]技能"
      ],
      "Equippedon": [
        "[[Excalibur]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "终结闪光",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BB%88%E7%BB%93%E9%97%AA%E5%85%89",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "经验增幅": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "经验增幅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BB%8F%E9%AA%8C%E5%A2%9E%E5%B9%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "续燃": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Chroma]]的[[Spectral Scream|光暴怒吼]]技能"
      ],
      "Equippedon": [
        "[[Chroma]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "续燃",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BB%AD%E7%87%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "缓动惊骇": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nekros]]的[[Terrify|惊骇]]技能"
      ],
      "Equippedon": [
        "[[Nekros]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "缓动惊骇",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BC%93%E5%8A%A8%E6%83%8A%E9%AA%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "翻滚防护": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "翻滚防护",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BF%BB%E6%BB%9A%E9%98%B2%E6%8A%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "翻筋斗": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''倒地起身速度'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "翻筋斗",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BF%BB%E7%AD%8B%E6%96%97",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "翼膜": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> 飞身瞄准及壁面攀附的时间"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "翼膜",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E7%BF%BC%E8%86%9C",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "耗弱链接": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Trinity]]的[[Link|链接]]技能"
      ],
      "Equippedon": [
        "[[Trinity]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "耗弱链接",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%80%97%E5%BC%B1%E9%93%BE%E6%8E%A5",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "聚精会神": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''技能强度'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "聚精会神",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%81%9A%E7%B2%BE%E4%BC%9A%E7%A5%9E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "肾上腺激素": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>能量上限，<span  style=\"color:red;\" class=\" \">降低</span>生命上限"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "肾上腺激素",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%82%BE%E4%B8%8A%E8%85%BA%E6%BF%80%E7%B4%A0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "能量虹吸": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>团队的[[energy|能量]]自然回复率"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "能量虹吸",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%83%BD%E9%87%8F%E8%99%B9%E5%90%B8",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "能量超载": {
    "printouts": {
      "Effect": [
        "将重生能量转化为过载护盾"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "能量超载",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%83%BD%E9%87%8F%E8%B6%85%E8%BD%BD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "能量转换": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>拾取[[Pickups#Energy|能量球]]后的下一次技能的[[Power Strength|技能强度]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "能量转换",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%83%BD%E9%87%8F%E8%BD%AC%E6%8D%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "能量转移": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "能量转移",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%83%BD%E9%87%8F%E8%BD%AC%E7%A7%BB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "脱离速度": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Nova]]的[[Worm Hole|虫洞]]技能"
      ],
      "Equippedon": [
        "[[Nova]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "脱离速度",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%84%B1%E7%A6%BB%E9%80%9F%E5%BA%A6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "腐蚀弹幕": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Hydroid]]的[[Tempest Barrage|暴风雨弹幕]]技能"
      ],
      "Equippedon": [
        "[[Hydroid]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "腐蚀弹幕",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%85%90%E8%9A%80%E5%BC%B9%E5%B9%95",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "腐蚀投射": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">降低</span>所有敌人的[[armor|护甲]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "腐蚀投射",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%85%90%E8%9A%80%E6%8A%95%E5%B0%84",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "致命传送": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ash]]的[[teleport|瞬移]]技能"
      ],
      "Equippedon": [
        "[[Ash]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "致命传送",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%87%B4%E5%91%BD%E4%BC%A0%E9%80%81",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "蓄积长鞭": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "蓄积长鞭",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%93%84%E7%A7%AF%E9%95%BF%E9%9E%AD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "蓄能重划": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>战甲的[[Warframe Attributes#Shields|护盾容量]]"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "蓄能重划",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%93%84%E8%83%BD%E9%87%8D%E5%88%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "虚伪连结": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Loki]]的[[Decoy|诱饵]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Loki]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "虚伪连结",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%99%9A%E4%BC%AA%E8%BF%9E%E7%BB%93",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "蚀能磁触": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Pull|吸引]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "蚀能磁触",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%9A%80%E8%83%BD%E7%A3%81%E8%A7%A6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "蜕化再生": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Saryn]]的[[Molt|蜕皮]]技能"
      ],
      "Equippedon": [
        "[[Saryn]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "蜕化再生",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%9C%95%E5%8C%96%E5%86%8D%E7%94%9F",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "裂隙洪流": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Limbo]]的[[裂隙涌流|裂隙涌流]]技能"
      ],
      "Equippedon": [
        "[[Limbo]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "裂隙洪流",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%A3%82%E9%9A%99%E6%B4%AA%E6%B5%81",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "角斗士决心": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "角斗士决心",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%A7%92%E6%96%97%E5%A3%AB%E5%86%B3%E5%BF%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "角斗士圣盾": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "角斗士圣盾",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%A7%92%E6%96%97%E5%A3%AB%E5%9C%A3%E7%9B%BE",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "角斗士灵巧": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "角斗士灵巧",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%A7%92%E6%96%97%E5%A3%AB%E7%81%B5%E5%B7%A7",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "调节跳跃": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>护盾容量，<span  style=\"color:red;\" class=\" \">降低</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "调节跳跃",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%B0%83%E8%8A%82%E8%B7%B3%E8%B7%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "贪夺触角": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Hydroid]]的[[Tentacle_Swarm|触角肆虐]]技能"
      ],
      "Equippedon": [
        "[[Hydroid]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "贪夺触角",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%B4%AA%E5%A4%BA%E8%A7%A6%E8%A7%92",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "贪婪吸引": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Pull|吸引]]技能"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "贪婪吸引",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%B4%AA%E5%A9%AA%E5%90%B8%E5%BC%95",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "贯彻始终": {
    "printouts": {
      "Effect": [
        "战甲在重生时获得能量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "贯彻始终",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%B4%AF%E5%BD%BB%E5%A7%8B%E7%BB%88",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "跃浪好手": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>移动速度，<span  style=\"color:red;\" class=\" \">降低</span>生命上限"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "跃浪好手",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%B7%83%E6%B5%AA%E5%A5%BD%E6%89%8B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "践踏加固": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Rhino]]的[[Rhino Stomp|犀牛践踏]]技能"
      ],
      "Equippedon": [
        "[[Rhino]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "践踏加固",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%B7%B5%E8%B8%8F%E5%8A%A0%E5%9B%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "轰隆石者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Atlas]]的[[Rumblers|漫步石者]]技能（限[[武形秘仪]]）"
      ],
      "Equippedon": [
        "[[Atlas]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "轰隆石者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%BD%B0%E9%9A%86%E7%9F%B3%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "辐射缴械": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Loki]]的[[Radial Disarm|解除武装]]技能"
      ],
      "Equippedon": [
        "[[Loki]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "辐射缴械",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%BE%90%E5%B0%84%E7%BC%B4%E6%A2%B0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "过度延展": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''技能范围''' 但是 <span  style=\"color:maroon;\" class=\" \">降低</span> '''技能强度'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:D.png|17px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "过度延展",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%BF%87%E5%BA%A6%E5%BB%B6%E5%B1%95",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "返老还童": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>所有队员的生命自然回复率"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "返老还童",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E8%BF%94%E8%80%81%E8%BF%98%E7%AB%A5",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "适应": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "适应",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%80%82%E5%BA%94",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "速度窜升": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span>冲刺和技能施放速度"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "速度窜升",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%80%9F%E5%BA%A6%E7%AA%9C%E5%8D%87",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "避难所": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Limbo]]的[[Banish|放逐]]技能"
      ],
      "Equippedon": [
        "[[Limbo]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "避难所",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%81%BF%E9%9A%BE%E6%89%80",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "避雷针": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''[[File:Electricity_b.png|x18px|link=伤害 2.0/电击伤害]]&thinsp;[[伤害 2.0/电击伤害|<span style=\"color:#5F04B4;\">电击</span>]] 伤害''' 抗性"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "避雷针",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%81%BF%E9%9B%B7%E9%92%88",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "钢铁充能": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>近战武器伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "钢铁充能",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%92%A2%E9%93%81%E5%85%85%E8%83%BD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "钢铁纤维": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">提升</span> '''护甲'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "钢铁纤维",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%92%A2%E9%93%81%E7%BA%A4%E7%BB%B4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "钻石皮肤": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''[[File:Radiation_b.png|x18px|link=伤害 2.0/辐射伤害]]&thinsp;[[伤害 2.0/辐射伤害|<span style=\"color:#088A85;\">辐射</span>]] 伤害''' 抗性"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "钻石皮肤",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%92%BB%E7%9F%B3%E7%9A%AE%E8%82%A4",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "铁甲冲锋": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Rhino]]的[[Rhino Charge|犀牛冲锋]]技能"
      ],
      "Equippedon": [
        "[[Rhino]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "铁甲冲锋",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%93%81%E7%94%B2%E5%86%B2%E9%94%8B",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "长时瘫痪": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Valkyr]]的[[Paralysis|瘫痪]]技能"
      ],
      "Equippedon": [
        "[[Valkyr]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "长时瘫痪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%95%BF%E6%97%B6%E7%98%AB%E7%97%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "闪耀助燃": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ember]]的[[Accelerant|助燃]]技能"
      ],
      "Equippedon": [
        "[[Ember]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "闪耀助燃",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%97%AA%E8%80%80%E5%8A%A9%E7%87%83",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "闪避装甲": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>闪避时的伤害抗性，<span  style=\"color:red;\" class=\" \">降低</span>移动力"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "闪避装甲",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%97%AA%E9%81%BF%E8%A3%85%E7%94%B2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "随机应变": {
    "printouts": {
      "Effect": [
        "战甲 '''消耗能量抵挡致死伤害'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "随机应变",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9A%8F%E6%9C%BA%E5%BA%94%E5%8F%98",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "隔热": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''[[File:Cold_b.png|x18px|link=伤害 2.0/冰冻伤害]]&thinsp;[[伤害 2.0/冰冻伤害|<span style=\"color:#11559A;\">冰冻</span>]] 伤害''' 抗性"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "隔热",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9A%94%E7%83%AD",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "集中箭矢": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "集中箭矢",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9B%86%E4%B8%AD%E7%AE%AD%E7%9F%A2",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "震地共鸣": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "震地共鸣",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9C%87%E5%9C%B0%E5%85%B1%E9%B8%A3",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "震地冲击": {
    "printouts": {
      "Effect": [
        "从高处着陆造成冲击波击倒敌人"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "震地冲击",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9C%87%E5%9C%B0%E5%86%B2%E5%87%BB",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "霰弹枪增幅": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>霰弹枪伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Madurai_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "霰弹枪增幅",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9C%B0%E5%BC%B9%E6%9E%AA%E5%A2%9E%E5%B9%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "霰弹枪弹药搜集者": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>霰弹枪弹药补给拾取量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "霰弹枪弹药搜集者",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9C%B0%E5%BC%B9%E6%9E%AA%E5%BC%B9%E8%8D%AF%E6%90%9C%E9%9B%86%E8%80%85",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "静谧无踪": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Loki]]的[[Invisibility|隐形]]技能"
      ],
      "Equippedon": [
        "[[Loki]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "静谧无踪",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%9D%99%E8%B0%A7%E6%97%A0%E8%B8%AA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "顶天立地": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span> '''抗击倒概率'''"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "t"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "顶天立地",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A1%B6%E5%A4%A9%E7%AB%8B%E5%9C%B0",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "顶天立地Prime": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "传说"
      ]
    },
    "fulltext": "顶天立地Prime",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A1%B6%E5%A4%A9%E7%AB%8B%E5%9C%B0Prime",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "预言协约": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "预言协约",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A2%84%E8%A8%80%E5%8D%8F%E7%BA%A6",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "预言启示": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "预言启示",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A2%84%E8%A8%80%E5%90%AF%E7%A4%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "预言神密": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "预言神密",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A2%84%E8%A8%80%E7%A5%9E%E5%AF%86",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "预言通灵": {
    "printouts": {
      "Effect": [],
      "Equippedon": [],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "预言通灵",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A2%84%E8%A8%80%E9%80%9A%E7%81%B5",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "风起云涌": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Ash]]的[[Blade Storm|剑刃风暴]]技能"
      ],
      "Equippedon": [
        "[[Ash]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "风起云涌",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A3%8E%E8%B5%B7%E4%BA%91%E6%B6%8C",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "飞升技巧": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">增加</span>移动力，<span  style=\"color:red;\" class=\" \">减少</span>护盾容量"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Naramon_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "罕见"
      ]
    },
    "fulltext": "飞升技巧",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A3%9E%E5%8D%87%E6%8A%80%E5%B7%A7",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "飞行员": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">降低</span> 滞空时受到的伤害"
      ],
      "Equippedon": [
        "[[战甲]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Vazarin_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "常见"
      ]
    },
    "fulltext": "飞行员",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A3%9E%E8%A1%8C%E5%91%98",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "驱逐力场": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Vauban|Vauban]]的[[Bastille|力场牢狱]]技能"
      ],
      "Equippedon": [
        "[[Vauban]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "驱逐力场",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%A9%B1%E9%80%90%E5%8A%9B%E5%9C%BA",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  },
  "高压粉碎": {
    "printouts": {
      "Effect": [
        "<span  style=\"color:green;\" class=\" \">强化</span>[[Mag]]的[[Crush|粉碎]]技能"
      ],
      "Equippedon": [
        "[[Mag]]"
      ],
      "Transmutable": [
        "f"
      ],
      "Polarity": [
        "[[File:Zenurik_Pol.svg|x20px|link=Polarity]]"
      ],
      "Rarity": [
        "稀有"
      ]
    },
    "fulltext": "高压粉碎",
    "fullurl": "https://warframe.huijiwiki.com/wiki/%E9%AB%98%E5%8E%8B%E7%B2%89%E7%A2%8E",
    "namespace": 0,
    "exists": "1",
    "displaytitle": ""
  }
};

let tt = {
  "Archwing (Soundtrack)": "Archwing（原声带）",
  "Consume Us": "吞噬我们",
  "Corpus Greed": "Corpus的贪婪",
  "Corrupted (Soundtrack)": "堕落者（原声带）",
  "Derelicts": "遗弃之船",
  "Gene Molds": "基因模板",
  "Ghosts of Void": "虚空鬼魅",
  "Grakata (Soundtrack)": "葛拉卡达（原声带）",
  "Grineer Onslaught": "Grineer的猛攻",
  "Hunhow (Soundtrack)": "Hunhow（原声带）",
  "March Of The Moa": "恐鸟进军",
  "Origin System": "始源星系",
  "Our Disease": "我们的疾病",
  "Rapid Adaptation": "迅速适应",
  "Red Broth": "赤之汤",
  "Sentient Tombs": "Sentient之墓",
  "The Creeping Dark": "诡异之暗",
  "The Profit": "利益",
  "The Second Dream (Soundtrack)": "第二场梦（原声带）",
  "The Witches Lair": "女巫之巢",
  "This Is What You Are": "你的本质",
  "Vor's Prize (Soundtrack)": "Vor的战利品（原声带）",
  "Wings Of War": "战争之翼",
  "Wretched Things": "丑恶之物",
  "Trample": "践踏",
  "Pyroclastic Flow": "火成碎流",
  "Primal Fury (Stance)": "原始狂怒（架式）",
  "Calculated Victory": "算计赢家",
  "Primed Ammo Stock": "霰弹扩充Prime",
  "Chromatic Blade": "华彩刀剑",
  "Frost Insulation": "冰冻抗性",
  "Antitoxin": "毒抗",
  "Affinity Amp": "经验增幅",
  "Primed Pistol Ammo Mutation": "手枪弹药转换Prime",
  "Proboscis": "长吻",
  "Recover": "痊愈",
  "Bane of Corrupted": "灭亡堕落者",
  "Fire Resistance": "火焰抗性",
  "Primed Shred": "撕裂Prime",
  "Resilient Focus": "弹性焦点",
  "Cannonade": "狂轰滥炸",
  "Recuperate": "复元",
  "Laser Deflection": "激光折射",
  "Electrical Resistance": "电击抗性",
  "Remech Osprey": "再启动鱼鹰",
  "Caches": "资源储藏舱",
  "Xiphos Fuselage Blueprint": "Xiphos机身蓝图",
  "Xiphos Engines Blueprint": "Xiphos引擎蓝图",
  "Xiphos Avionics Blueprint": "Xiphos飞航系统蓝图",
  "Vapor Specter Blueprint": "幻雾魅影蓝图",
  "Phase Specter Blueprint": "相位魅影蓝图",
  "Force Specter Blueprint": "原力魅影蓝图",
  "Cosmic Specter Blueprint": "无极魅影蓝图",
  "Forma Blueprint": "Forma蓝图",
  "Expel Corrupted": "驱逐堕落者",
  "Smite Corrupted": "毁灭堕落者",
  "Cleanse Corrupted": "净化堕落者",
  "Bane Of Corrupted": "灭亡堕落者",
  "(Variant) Cephalon Capture": "（变体）夺取中枢",
  "Health Restore (Large)": "生命回复（大）",
  "Cyngas": "合成燃气炮",
  "Agkuza": "驯象钩刃",
  "Arcata": "阿卡塔",
  "Twin Kohmak": "双子寇恩霰机枪",
  "Furax Wraith": "弗拉克斯亡魂",
  "Mutalist Cernos": "异融西诺斯",
  "Dual Toxocyst": "毒囊双枪",
  "Staticor": "静电能量导引枪",
  "Lesion": "病变",
  "Ack \u0026 Brunt": "认知\u0026冲击",
  "Acrid": "阿克里德",
  "Azima": "方位角",
  "Afuris": "盗贼双枪",
  "Akbolto": "螺钉双枪",
  "Akbronco": "野马双枪",
  "Akbronco Prime": "野马双枪Prime",
  "Akjagara": "觉醒双枪",
  "Aklato": "拉托双枪",
  "Aklex": "雷克斯双枪",
  "Akmagnus": "麦格努斯双枪",
  "Aksomati": "轻灵月神双枪",
  "Akstiletto": "史提托双枪",
  "Akstiletto Prime": "史提托双枪Prime",
  "Akvasto": "瓦斯托双枪",
  "AkZani": "荒谬双枪",
  "Amphis": "双头蛇",
  "Amprex": "安培克斯",
  "Angstrum": "安格斯壮",
  "Anku": "夺魂死神",
  "Ankyros": "甲龙双拳",
  "Ankyros Prime": "甲龙双拳Prime",
  "Atomos": "原子矿融炮",
  "Atterax": "阿特拉克斯",
  "Attica": "阿提卡",
  "Auto": "自动",
  "Ballistica": "布里斯提卡",
  "Bo": "玻之武杖",
  "Bo Prime": "玻之武杖Prime",
  "Boar": "野猪",
  "Boar Prime": "野猪Prime",
  "Boltace": "螺钉拐刃",
  "Telos Boltace": "终极螺钉拐刃",
  "Bolto": "螺钉手枪",
  "Boltor": "螺钉步枪",
  "Boltor Prime": "螺钉步枪Prime",
  "Brakk": "布拉克",
  "Braton": "布莱顿",
  "Braton Prime": "布莱顿Prime",
  "Braton Vandal": "布莱顿破坏者",
  "Bronco": "野马",
  "Bronco Prime": "野马Prime",
  "Burst Laser": "激光点发",
  "Burston": "伯斯顿",
  "Burston Prime": "伯斯顿Prime",
  "Buzlok": "巴兹火枪",
  "Castanas": "雷爆信镖",
  "Centaur": "半人马",
  "Cernos": "西诺斯",
  "Cerata": "裸鳃刃",
  "Cestra": "锡斯特",
  "Convectrix": "导热聚焦枪",
  "Corvas": "黑鸦",
  "Ceramic Dagger": "陶瓷匕首",
  "Cronus": "克洛诺斯",
  "Deconstructor": "分离",
  "Daikyu": "大久和弓",
  "Dakra": "达克拉",
  "Dakra Prime": "达克拉Prime",
  "Dark Dagger": "暗黑匕首",
  "Rakta Dark Dagger": "绯红暗黑匕首",
  "Dark Sword": "暗黑长剑",
  "Dark Split-Sword": "暗黑分合剑",
  "Heliocor": "赫利俄光锤",
  "Synoid Heliocor": "枢议赫利俄光锤",
  "Dera": "德拉",
  "Dera Vandal": "德拉破坏者",
  "Despair": "绝望",
  "Detron": "德特昂",
  "Dex Dakra": "Dex达克拉双剑",
  "Dex Sybaris": "Dex席芭莉丝",
  "Dex Furis": "Dex盗贼双枪",
  "Dragon Nikana": "龙之侍刃",
  "Nikana Prime": "侍刃Prime",
  "Drakgoon": "龙骑兵",
  "Dread": "恐惧",
  "Dual Broncos": "野马双枪",
  "Dual Cestra": "锡斯特双枪",
  "Dual Cleavers": "斩肉双刀",
  "Dual Decurion": "什长双枪",
  "Stradavar": "斯特拉迪瓦",
  "Zhuge": "诸葛连弩",
  "MK1-Strun": "MK1-斯特朗",
  "MK1-Furis": "MK1-盗贼",
  "Broken War": "破碎的战争之剑",
  "Okina": "翁",
  "Sibear": "西伯利亚冰锤",
  "Dual Ether": "苍穹双剑",
  "Dual Heat Swords": "烈焰双剑",
  "Dual Ichor": "恶脓双斧",
  "Dual Kamas": "双短柄战镰",
  "Dual Kamas Prime": "双短柄战镰Prime",
  "Dual Raza": "锋月双斧",
  "Dual Skana": "空刃双刀",
  "Dual Zoren": "佐伦双斧",
  "Embolist": "安柏勒斯",
  "Ether Daggers": "苍穹匕首",
  "Ether Reaper": "苍穹死神",
  "Ether Sword": "苍穹之剑",
  "Fang": "狼牙",
  "Fang Prime": "狼牙Prime",
  "Fluctus": "巨浪",
  "Flux Rifle": "通量射线步枪",
  "Fragor": "重击巨锤",
  "Fragor Prime": "重击巨锤Prime",
  "Furax": "弗拉克斯",
  "Furis": "盗贼",
  "Galatine": "迦伦提恩",
  "Galatine Prime": "迦伦提恩Prime",
  "Gammacor": "咖玛腕甲枪",
  "Glaive": "战刃",
  "Glaive Prime": "战刃Prime",
  "Glaxion": "冷冻光束步枪",
  "Gorgon": "蛇发女妖",
  "Gorgon Wraith": "蛇发女妖亡魂",
  "Grakata": "葛拉卡达",
  "Gram": "格拉姆",
  "Grattler": "葛拉特勒",
  "Grinlok": "葛恩火枪",
  "Halikar": "哈利卡",
  "Harpak": "哈帕克",
  "Hate": "憎恨",
  "Heat Dagger": "烈焰短剑",
  "Heat Sword": "烈焰长剑",
  "Hek": "海克",
  "Hikou": "飞扬",
  "Hikou Prime": "飞扬Prime",
  "Hind": "雌鹿",
  "Hysteria (Weapon)": "狂化爆发（武器）",
  "Ignis": "伊格尼斯",
  "Imperator": "凯旋将军",
  "Imperator Vandal": "凯旋将军破坏者",
  "Jat Kittag": "喷射战锤",
  "Jaw Sword": "蛇颚刀",
  "Kama": "短柄战镰",
  "Karak": "卡拉克",
  "Karak Wraith": "卡拉克亡魂",
  "Karyst": "凯洛斯特",
  "Kaszas": "死亡使徒",
  "Kestrel": "红隼",
  "Knux": "克那克斯",
  "Kogake": "科加基",
  "Kohm": "寇恩热能枪",
  "Kraken": "北海巨妖",
  "Kronen": "皇家拐刃",
  "Kohmak": "寇恩霰机枪",
  "Kunai": "苦无",
  "Kulstar": "杀星",
  "Lanka": "兰卡",
  "Lato": "拉托",
  "Lato Prime": "拉托Prime",
  "Lato Vandal": "拉托破坏者",
  "Latron": "拉特昂",
  "Latron Prime": "拉特昂Prime",
  "Latron Wraith": "拉特昂亡魂",
  "Lecta": "勒克塔",
  "Secura Lecta": "保障勒克塔",
  "Lex": "雷克斯",
  "Lex Prime": "雷克斯Prime",
  "Machete": "马谢特砍刀",
  "Machete Wraith": "马谢特砍刀亡魂",
  "Magistar": "执法者",
  "Sancti Magistar": "圣洁执法者",
  "Magnus": "麦格努斯",
  "Mara Detron": "苦痛德特昂",
  "Marelok": "玛瑞火枪",
  "Mutalist Quanta": "异融量子枪",
  "Mire": "米尔",
  "Miter": "米特尔",
  "MK1-Braton": "MK1-布莱顿",
  "MK1-Bo": "MK1-玻之武杖",
  "MK1-Furax": "MK1-弗拉克斯",
  "MK1-Kunai": "MK1-苦无",
  "Nami Skyla": "海波斯库拉对剑",
  "Nami Solo": "海波单剑",
  "Nikana": "侍刃",
  "Sheev": "希芙",
  "Ninkondi": "降灵追猎者",
  "Nukor": "努寇微波枪",
  "Obex": "奥比克斯",
  "Ogris": "食人女魔",
  "Onorix": "奥努里克斯",
  "Opticor": "奥堤克光子枪",
  "Orthos": "欧特鲁斯",
  "Orthos Prime": "欧特鲁斯Prime",
  "Pangolin Sword": "鲮鲤剑",
  "Panthera": "猎豹",
  "Paris": "帕里斯",
  "MK1-Paris": "MK1-帕里斯",
  "Paris Prime": "帕里斯Prime",
  "Phaedra": "菲德菈",
  "Phage": "噬菌者",
  "Plasma Rifle": "等离子步枪",
  "Plasma Sword": "等离子长剑",
  "Laser Rifle": "激光步枪",
  "Paracyst": "附肢寄生者",
  "Prime Laser Rifle": "激光步枪Prime",
  "Prisma Burst Laser": "棱晶激光点发",
  "Prisma Dual Cleavers": "棱晶斩肉双刀",
  "Prisma Gorgon": "棱晶蛇发女妖",
  "Prisma Grakata": "棱晶葛拉卡达",
  "Prisma Skana": "棱晶空刃",
  "Prisma Tetra": "棱晶特拉",
  "Prisma Veritux": "棱晶真理巨剑",
  "Prova": "普罗沃",
  "Prova Vandal": "普罗沃破坏者",
  "Pyrana": "食人鱼",
  "Pyrotechnic Ogris": "烈焰食人女魔",
  "Penta": "潘塔",
  "Quanta": "量子切割器",
  "Quanta Vandal": "量子切割器破坏者",
  "Rakta Ballistica": "绯红布里斯提卡",
  "Rakta Cernos": "绯红西诺斯",
  "Rathbone": "拉斯波恩",
  "Reaper": "收割者",
  "Reaper Prime": "收割者Prime",
  "Redeemer": "救赎者",
  "Ripkas": "锐卡斯",
  "Sancti Castanas": "圣洁雷爆信镖",
  "Sancti Tigris": "圣洁猛虎",
  "Tigris Prime": "猛虎Prime",
  "Sarpa": "蛇刃",
  "Pox": "脓痘",
  "Secura Dual Cestra": "保障锡斯特双枪",
  "Secura Penta": "保障潘塔",
  "Seer": "预言者",
  "Serro": "电能斩锯",
  "Sicarus": "暗杀者",
  "Sicarus Prime": "暗杀者Prime",
  "Silva \u0026 Aegis": "席瓦\u0026神盾",
  "Simulor": "重力奇点拟成枪",
  "Scindo": "分裂斩斧",
  "Scindo Prime": "分裂斩斧Prime",
  "Scoliac": "嵴椎节鞭",
  "Skana": "空刃",
  "Skana Prime": "空刃Prime",
  "Snipetron": "狙击特昂",
  "Snipetron Vandal": "狙击特昂破坏者",
  "Sobek": "鳄神",
  "Soma": "月神",
  "Soma Prime": "月神Prime",
  "Sonicor": "超音波冲击枪",
  "Spectra": "光谱切割器",
  "Spira": "旋刃飞刀",
  "Spira Prime": "旋刃飞刀Prime",
  "Talons": "鹰爪",
  "Stug": "史特克",
  "Strun": "斯特朗",
  "Strun Wraith": "斯特朗亡魂",
  "Supra": "苏普拉",
  "Sweeper": "扫除者",
  "Sweeper Prime": "扫除者Prime",
  "Sybaris": "席芭莉丝",
  "Synapse": "突触生化枪",
  "Synoid Gammacor": "枢议咖玛腕甲枪",
  "Synoid Simulor": "枢议重力奇点拟成枪",
  "Tekko": "铁钩手甲",
  "Telos Akbolto": "终极螺钉双枪",
  "Telos Boltor": "终极螺钉步枪",
  "Tetra": "特拉",
  "Tiberon": "狂鲨",
  "Tigris": "猛虎",
  "Tipedo": "提佩多",
  "Torid": "托里德",
  "Tonbo": "蜻蛉薙",
  "Tonkor": "征服榴炮",
  "Twin Basolk": "双子巴萨克",
  "Twin Grakatas": "双子葛拉卡达",
  "Twin Gremlins": "双子小精灵",
  "Twin Vipers": "双子蝰蛇",
  "Tysis": "啐沫者",
  "Vasto": "瓦斯托",
  "Vasto Prime": "瓦斯托Prime",
  "Vaykor Hek": "勇气海克",
  "Vaykor Marelok": "勇气玛瑞火枪",
  "Vectis": "守望者",
  "Vectis Prime": "守望者Prime",
  "Velocitus": "极速电磁步枪",
  "Venka": "凯旋之爪",
  "Veritux": "真理巨剑",
  "Viper": "蝰蛇",
  "Vulkar": "金工火神",
  "Vulkar Wraith": "金工火神亡魂",
  "Vulklok": "金工火枪",
  "Weapon": "武器",
  "weapon": "武器",
  "Wraith Twin Vipers": "亡魂双子蝰蛇",
  "War": "战争之剑",
  "Broken-War": "破碎的战争之剑",
  "Mios": "牡狮神",
  "Shaku": "双节尺棍",
  "Sydon": "恶龙",
  "Vaykor Sydon": "勇气恶龙",
  "Lacera": "悲痛之刃",
  "Destreza": "技巧之剑",
  "Blink": "闪瞬",
  "Bloomer": "高爆弹",
  "Core Vent": "核心通气",
  "Cosmic Crush": "星体震荡",
  "Disarray": "热诱弹",
  "Energy Shell": "能量护罩",
  "Fighter Escort": "护卫战机",
  "Penumbra": "半影屏蔽",
  "Repel": "脉冲震波",
  "Seeking Fire": "导弹",
  "Thumper (Elytron)": "轰击",
  "Warhead": "毁灭弹头",
  "Watchful Swarm": "警惕机群",
  "Benevolent Decoy": "仁慈诱饵",
  "Warding Grace": "守护恩典",
  "Vengeful Rush": "复仇冲动",
  "Counter Pulse": "反转脉冲",
  "Magnetize": "磁吸力场",
  "Polarize": "护盾极化",
  "Absorb": "吸收",
  "Accelerant": "助燃",
  "Antimatter Drop": "反物质释放",
  "Avalanche": "雪崩",
  "Ballistic Battery": "弹道蓄能",
  "Banish": "放逐",
  "Bastille": "力场牢狱",
  "Blade Storm": "剑刃风暴",
  "Blessing": "祝福",
  "Bounce": "弹跳平台",
  "Bullet Attractor": "子弹磁石",
  "Cataclysm": "灾变",
  "Chaos": "混乱",
  "Cloud Walker": "筋斗游云",
  "Contagion": "传染",
  "Crush": "粉碎",
  "Decoy": "诱饵",
  "Defy": "死命顽抗",
  "Desecrate": "亵渎",
  "desecrate": "亵渎",
  "Dive Bomb": "俯冲轰炸",
  "Eclipse": "黯然失色",
  "Effigy": "利欲龙骸",
  "Electric Shield": "电磁屏障",
  "Elemental Ward": "元素之护",
  "Energy Vampire": "能量吸取",
  "Exalted Blade": "显赫刀剑",
  "Fireball": "火球",
  "Fire Blast": "火焰冲击",
  "Fire Blast (Ruk)": "火焰冲击（Ruk）",
  "Freeze": "冻结",
  "Hall of Mirrors": "镜厅",
  "Hallowed Ground": "神圣领域",
  "Hysteria": "狂化爆发",
  "Ice Wave": "冰浪",
  "Invisibility": "隐形",
  "Iron Jab": "神针突刺",
  "Iron Skin": "钢化皮肤",
  "Landslide": "土石坍方",
  "Link": "链接",
  "Mend \u0026 Maim": "补愈-致残",
  "Metamorphosis": "昼夜交替",
  "Mind Control": "精神控制",
  "Miasma": "瘴气",
  "Molecular Prime": "分子填充",
  "Molt": "蜕皮",
  "Null Star": "湮灭流星群",
  "Overload": "超负荷",
  "Pacify \u0026 Provoke": "轻抚-激怒",
  "Paralysis": "瘫痪",
  "Peacemaker": "和平使者",
  "Petrify": "石化凝视",
  "Primal Fury": "原始狂怒",
  "Prism": "棱镜",
  "Psychic Bolts": "精神飞刃",
  "Pull": "吸引",
  "Radial Blind": "致盲",
  "Radial Disarm": "解除武装",
  "Radial Javelin": "标枪",
  "Renewal": "疗愈脉动",
  "Reckoning": "惩戒清算",
  "Rest \u0026 Rage": "暂息-怒气",
  "Rhino Charge": "犀牛冲锋",
  "Rhino Stomp": "犀牛践踏",
  "Rift Walk": "裂隙漫游",
  "Rift Surge": "裂隙涌流",
  "Rip Line": "撕裂钩索",
  "Rippling Shockwave": "涟漪冲击波",
  "Roar": "战吼",
  "Rumblers": "漫步石者",
  "Seismic Shockwave": "地震波",
  "Silence": "静音",
  "Shield Polarize": "护盾极化",
  "Shuriken": "手里剑",
  "Shatter Shield": "破碎护盾",
  "Shock": "电击",
  "Shooting Gallery": "靶场",
  "Shadows Of The Dead": "亡者幽影",
  "Shadows of the Dead": "亡者幽影",
  "Slash Dash": "突斩",
  "Sleight Of Hand": "戏法",
  "Smite": "惩击",
  "Smoke Screen": "烟幕",
  "Snow Globe": "冰雪护罩",
  "Soul Punch": "灵魂重击",
  "Spectral Scream": "光暴怒吼",
  "Speed": "加速",
  "Sonar": "声纳",
  "Sonic Boom": "超声波",
  "Sound Quake": "音波冲击",
  "Super Jump": "超级弹跳",
  "Switch Teleport": "移形换位",
  "Tectonics": "大地构筑",
  "Teleport": "瞬移",
  "Tempest Barrage": "暴风雨弹幕",
  "Terrify": "惊骇",
  "Tidal Surge": "潮汐浪涌",
  "Tentacle Swarm": "触角肆虐",
  "Tail Wind": "顺风",
  "Tesla": "特斯拉手榴弹",
  "Turbulence": "疾风湍流",
  "Tornado": "龙卷云风",
  "Undertow": "水漩涡",
  "Venom": "猛毒",
  "Vex Armor": "怨怒护甲",
  "Vortex": "旋涡",
  "Warcry": "咆哮",
  "Well Of Life": "生命之井",
  "World On Fire": "火海",
  "Worm Hole": "虫洞",
  "Quiver": "战术箭袋",
  "Navigator": "导向抛体",
  "Artemis Bow": "月神狩弓",
  "Prowl": "潜影猎手",
  "Dispel": "驱散",
  "Spore": "毒性孢子",
  "Spores": "毒性孢子",
  "Toxic Lash": "剧毒鞭苔",
  "Toxic Slash": "剧毒鞭苔",
  "Cloak Arrow": "隐蔽之箭",
  "Dashwire Arrow": "悬丝之箭",
  "Noise Arrow": "喧扰之箭",
  "Sleep Arrow": "沉睡之箭",
  "Fire Walker": "风火飞轮",
  "Blazing Chakram": "乾坤火圈",
  "Warding Halo": "混天火绫",
  "Divine Spears": "圣火尖枪",
  "Scarab Swarm": "圣甲虫群",
  "Desiccation": "枯沙竭血",
  "Sandstorm": "吞天沙暴",
  "Devour": "沙涡之祭",
  "Spellbind": "迷尘",
  "Tribute": "献灵",
  "Lantern": "幻灯",
  "Razorwing": "剃刀之翼",
  "Ceres": "谷神星",
  "Clan Dojo": "氏族道场",
  "Corpus Ice Planet": "Corpus冰原星球",
  "Corpus Gas City": "Corpus燃气城市",
  "Corpus Outpost": "Corpus哨站",
  "Corpus Ship": "Corpus飞船",
  "Corpus Ship (Archwing)": "Corpus飞船（Archwing）",
  "Corpus Trench Run": "Corpus战壕追逐",
  "Trench Run": "战壕追逐",
  "Dark Sector": "黑暗地带",
  "Dark Sectors": "黑暗地带",
  "Derelict": "遗迹",
  "Earth": "地球",
  "Eris": "阋神星",
  "Europa": "欧罗巴",
  "Free Space": "外太空",
  "Grineer Asteroid": "Grineer小行星",
  "Grineer Forest": "Grineer丛林",
  "Grineer Galleon": "Grineer巨舰",
  "Grineer Settlement": "Grineer营地",
  "Grineer Shipyard": "Grineer船坞",
  "Infested Ship": "Infested飞船",
  "Infested Ship (Archwing)": "Infested飞船（Archwing）",
  "Planet": "星球",
  "Jupiter": "木星",
  "Mars": "火星",
  "Mercury": "水星",
  "Neptune": "海王星",
  "Orokin Derelict": "被遗弃的Orokin船只",
  "Orokin Void": "Orokin虚空",
  "Phobos": "火卫一",
  "Planets": "星球",
  "Pluto": "冥王星",
  "Relay": "中继站",
  "Saturn": "土星",
  "Sedna": "赛德娜",
  "Solar Rail": "星际航道",
  "Solar Rails": "星际航道",
  "Tower": "堡垒",
  "Uranus": "天王星",
  "Venus": "金星",
  "Void": "虚空",
  "Lua": "月球",
  "Orokin Moon": "Orokin之月",
  "Grineer Sealab": "Grineer深海研究所",
  "Simulacrum": "幻影装置",
  "Nightwatch Lancers": "夜巡者枪兵",
  "Sand Shadow": "沙土幽灵",
  "Executioners": "行刑者",
  "Gorth": "行刑者Gorth",
  "Reth": "行刑者Reth",
  "Garesh": "行刑者Garesh",
  "Harkonar": "行刑者Harkonar",
  "Nok": "行刑者Nok",
  "Vay Molta": "行刑者Vay Molta",
  "Zura": "行刑者Zura",
  "Dok Thul": "行刑者Dok Thul",
  "Hyekka Master": "鬣猫驯兽师",
  "Arcane Machine": "法典仪器",
  "Ancient Healer": "远古治愈者",
  "Ancient Disrupter": "远古干扰者",
  "Ancient Disruptor": "远古干扰者",
  "Anti MOA": "逆进恐鸟",
  "Arc Trap": "电弧陷阱",
  "Arctic Eximus": "极寒卓越者",
  "Attack Drone": "无人机",
  "Ballista": "弩炮",
  "Drekar Ballista": "龙舰弩炮",
  "Drekar Lancer": "龙舰枪兵",
  "Bombard": "轰击者",
  "Boiler": "痈裂者",
  "Brood Mother": "病变虫母",
  "Butcher": "屠夫",
  "Arid Butcher": "沙漠屠夫",
  "Drekar Butcher": "龙舰屠夫",
  "Frontier Butcher": "前线屠夫",
  "Captain Vor": "Vor上尉",
  "Captain Vor (Corrupted)": "堕落的Vor",
  "Carrier (Enemy)": "母舰",
  "Charger": "疾冲者",
  "Crawler": "爬行者",
  "Crewman": "船员",
  "Crewmen": "船员",
  "Comba": "驱逐员",
  "Sikula": "水雷无人机",
  "Commander": "指挥官（敌人）",
  "Corpus Power Carrier": "Corpus能量运送者",
  "Corpus Target": "Corpus目标",
  "Corpus Tech": "Corpus技师",
  "Corrupted Ancient": "远古堕落者",
  "Corrupted Bombard": "堕落轰击者",
  "Corrupted Butcher": "堕落屠夫",
  "Corrupted Crewman": "堕落船员",
  "Corrupted Heavy Gunner": "堕落重型机枪手",
  "Corrupted Lancer": "堕落枪兵",
  "Corrupted MOA": "堕落恐鸟",
  "Corrupted Nullifier": "堕落虚能者",
  "Corrupted Vor": "堕落的Vor",
  "Corvette": "护卫舰",
  "Councilor Vay Hek": "Vay Hek议员",
  "Shock Draga": "电击疏浚兵",
  "Darek Draga": "疏浚兵长",
  "Denial Bursa": "守护金流恐鸟",
  "Detron Crewman": "德特昂船员",
  "Desert Skate": "沙漠鳐鱼",
  "Infested Hive": "感染巢囊",
  "Disruptor Drone": "破坏型无人机",
  "Drahk Master": "爪喀驯兽师",
  "Drone": "无人机",
  "Drone Guardian": "无人机守卫",
  "Drover Bursa": "驱引金流恐鸟",
  "Isolator Bursa": "隔离金流恐鸟",
  "Dargyn": "轻型艇",
  "Drahk": "爪喀",
  "Dreg": "无人机（Grineer空战）",
  "Electric Crawler": "电击爬行者",
  "Elite Crewman": "精英船员",
  "Elite Lancer": "精英枪兵",
  "Drekar Elite Lancer": "龙舰精英枪兵",
  "Elite Arid Lancer": "精英沙漠枪兵",
  "Elite Frontier Lancer": "精英前线枪兵",
  "Eviscerator": "开膛者",
  "Arid Eviscerator": "沙漠开膛者",
  "Drekar Eviscerator": "龙舰开膛者",
  "Eximus": "卓越者",
  "Fan": "风扇",
  "Flameblade": "烈焰刀客",
  "Fomorian": "巨人战舰",
  "Frigate": "驱逐舰",
  "Fusion MOA": "熔岩恐鸟",
  "Fusion MOA Guardian": "熔岩恐鸟守卫",
  "Fusion Drone": "熔岩无人机",
  "General Sargas Ruk": "Sargas Ruk将军",
  "Grate": "铁格栅",
  "Grineer Power Carrier": "Grineer能量运送者",
  "Grineer Target": "Grineer目标",
  "Grineer Warden": "Grineer典狱长",
  "Guardsman": "禁卫军",
  "Heat Generator": "热能产生器",
  "Heavy Gunner": "重型机枪手",
  "Arid Heavy Gunner": "沙漠重型机枪手",
  "Drekar Heavy Gunner": "龙舰重型机枪手",
  "Hellion": "恶徒",
  "Arid Hellion": "沙漠恶徒",
  "Drekar Hellion": "龙舰恶徒",
  "Hellion Dargyn": "恶徒轻型艇",
  "Hyena Pack": "鬣狗群",
  "Infested Tumor": "Infested肿瘤",
  "Jackal": "豺狼",
  "Jordas Golem": "Jordas魔像",
  "Juggernaut": "巨兽",
  "Juggernaut Behemoth": "重装巨兽",
  "Kubrow (Feral)": "野生库狛",
  "Feral Kubrow": "野生库狛",
  "Hyekka": "鬣猫",
  "Kubrow Den": "库狛兽穴",
  "Lancer": "枪兵",
  "Arid Lancer": "沙漠枪兵",
  "Lancer Dreg": "无人机枪兵",
  "Laser Barrier": "激光栅栏",
  "Latcher": "粘子",
  "Leaper": "奔跳者",
  "Leech Osprey": "吸血鱼鹰",
  "Lobber Crawler": "喷吐爬行者",
  "Locust Drone": "蝗虫无人机",
  "Lieutenant Lech Kril": "Lech Kril中尉",
  "Lynx": "山猫",
  "Lynx Turret": "山猫炮塔",
  "Lynx Osprey": "山猫鱼鹰",
  "Maggot": "蛆虫",
  "Manic": "狂躁者",
  "Drekar Manic": "龙舰狂躁者",
  "Manic Bombard": "狂躁轰击者",
  "Drekar Manic Bombard": "龙舰狂躁轰击者",
  "Mine Osprey": "地雷鱼鹰",
  "Mining Machine": "采矿车",
  "MOA": "恐鸟",
  "Mutalist Alad V": "异融者Alad V",
  "Mutalist Osprey": "剧毒无人机",
  "Napalm": "火焰轰击者",
  "Nauseous Crawler": "呕心爬行者",
  "Nullifier Crewman": "虚能船员",
  "Orbital Strike Drone": "卫星冲击无人机",
  "Orokin Drone": "Orokin无人机",
  "Orokin Turret": "Orokin炮台",
  "Osprey": "鱼鹰",
  "Oxium Osprey": "奥席金属鱼鹰",
  "Penta Ranger": "潘塔突击队员",
  "Power Carrier": "能量运送者",
  "Powerfist": "重击手",
  "Propaganda Drone": "宣传无人机",
  "Prosecutor": "判官",
  "Prod Crewman": "监工船员",
  "Quanta Ranger": "量子切割器突击队员",
  "Rampart": "炮座壁垒",
  "Ranger": "突击队员",
  "Raptor": "猛禽",
  "Zeplen": "齐柏伦飞船",
  "Railgun MOA": "磁轨炮恐鸟",
  "Regulator": "调整者",
  "Roller": "滚子",
  "Runner": "狂奔者",
  "Sapping Osprey": "基蚀鱼鹰",
  "Scavenger Drone": "清道夫无人机",
  "Scorch": "怒焚者",
  "Scorpion": "天蝎",
  "Drekar Scorpion": "龙舰天蝎",
  "Scrambus": "扰敌员",
  "Security Camera": "监控摄像头",
  "Seeker": "追踪者",
  "Arid Seeker": "沙漠追踪者",
  "Drekar Seeker": "龙舰追踪者",
  "Senser Bar": "感应条",
  "Sensor Bar": "感应条",
  "Reinforced Glass": "强化玻璃",
  "Sensor Regulator": "感应调整者",
  "Shield Dargyn": "护盾轻型艇",
  "Shield Lancer": "盾枪兵",
  "Shield Osprey": "护盾鱼鹰",
  "Shield-Hellion Dargyn": "护盾恶徒轻型艇",
  "Shockwave MOA": "震荡恐鸟",
  "Sniper Crewman": "狙击手船员",
  "Spark": "火花",
  "Specter (Enemy)": "魅影（敌方）",
  "Specter (Tenno)": "魅影（友方）",
  "Swarm Mutalist MOA": "异融胞群恐鸟",
  "Swarm-Mutalist MOA": "异融胞群恐鸟",
  "Tar-Mutalist MOA": "异融焦油恐鸟",
  "Tech": "技师",
  "Temporal Dreg": "滞缓无人机",
  "Feral Kavat": "野生库娃",
  "Kavat": "库娃",
  "the Grustrag Three": "Grustrag三霸",
  "The Grustrag Three": "Grustrag三霸",
  "The Sergeant": "海军陆战队中士",
  "Toxic Ancient": "远古剧毒者",
  "Toxic Crawler": "剧毒爬行者",
  "Toxin Injector": "毒素注射器",
  "Trooper": "骑兵",
  "Arid Trooper": "沙漠骑兵",
  "Drekar Trooper": "龙舰骑兵",
  "Artificer": "技工",
  "Attack Multalist": "发射感染孢子",
  "Bailiff": "执法员",
  "Corpus Warden": "Corpus典狱长",
  "Volatile Runner": "爆炸奔跑者",
  "Warden": "典狱长",
  "Zanuka Hunter": "Zanuka猎犬",
  "Conculyst": "震荡使",
  "Battalyst": "武装使",
  "Oculyst": "全视使",
  "Acolyte": "追随者",
  "acolyte": "追随者",
  "Torment": "折磨",
  "Malice": "怨恨",
  "Mania": "躁狂",
  "Angst": "焦虑",
  "Misery": "苦难",
  "Violence": "暴力",
  "Void Shade": "虚空之影",
  "Draga": "疏浚兵",
  "Adhesive Blast": "凝胶爆破",
  "Energy Conversion": "能量转换",
  "Health Conversion": "生命转换",
  "Cat's Eye": "猫眼",
  "Reflect": "反射",
  "Charm": "招福",
  "Mischief": "顽皮",
  "Pounce": "猛扑",
  "Sense Danger": "危机感知",
  "Sharpened Claws": "磨锋之爪",
  "Swipe": "挥击",
  "Territorial Aggression": "侵略领土",
  "Electromagnetic Shielding": "电磁屏障（认知\u0026冲击）",
  "Acid Shells": "酸性弹药",
  "Fomorian Accelerant": "巨人促进剂",
  "Harkonar Scope": "哈库纳瞄准镜",
  "Hunter's Bonesaw": "猎人骨锯",
  "Nightwatch Napalm": "夜巡燃烧弹",
  "Rift Strike": "裂缝打击",
  "Vulcan Blitz": "火神闪击",
  "Medi-Ray": "医疗射线",
  "Gilded Truth": "镀金真相",
  "Stinging Truth": "过激真相",
  "Concealed Explosives": "内置炸药",
  "Greedy Pull": "贪婪吸引",
  "Tectonic Fracture": "构造裂缝",
  "Ore Gaze": "矿石凝视",
  "Titanic Rumbler": "巨大石者",
  "Duality": "二元性状",
  "Calm \u0026 Frenzy": "冷静与疯狂",
  "Peaceful Provocation": "和平挑衅",
  "Accelerated Blast": "加速冲击",
  "Afterburn": "续燃",
  "Ammo Drum": "弹鼓",
  "Ammo Stock": "霰弹扩充",
  "Ancient Fusion Core": "远古融合核心",
  "Anemic Agility": "乏能迅敏",
  "Animal Instinct": "动物本能",
  "Antimatter Absorb": "反物质吸收",
  "Antitoxin (Mod)": "毒抗",
  "Apex Predator": "顶级掠食者",
  "Arc Coil": "电弧线圈",
  "Argon Plating": "氩晶装甲",
  "Armored Agility": "灵活装甲",
  "Arrow Mutation": "箭矢转换",
  "Astral Twilight": "星界微光",
  "Atlantis Vulcan": "深渊之火",
  "Auger Strike": "螺钻打击",
  "Automatic Trigger": "自动扳机",
  "Auxiliary Power": "辅助动力",
  "Aviator": "飞行员",
  "Bane of Corpus": "灭亡Corpus",
  "Bane of Grineer": "灭亡Grineer",
  "Bane of Infested": "灭亡Infested",
  "Primed Bane of Corpus": "灭亡Corpus Prime",
  "Primed Bane of Grineer": "灭亡Grineer Prime",
  "Primed Bane of Infested": "灭亡Infested Prime",
  "Primed Pressure Point": "压迫点Prime",
  "Barrel Diffusion": "弹头扩散",
  "Battering Maneuver": "机动冲撞",
  "Berserker": "狂战士",
  "Bite": "咬碎",
  "Blade of Truth": "真相之刃",
  "Blaze": "烈焰",
  "Blazing Steel": "炽烈坚刃",
  "Bleeding Edge": "血色刃缘",
  "Bleeding Willow": "血色万柳",
  "Blind Justice": "无明制裁",
  "Blind Rage": "盲怒",
  "Blind Shot": "盲目射击",
  "Blunderbuss": "雷筒",
  "Bore": "枪膛",
  "Bounty Hunter": "赏金猎人",
  "Breach Loader": "破裂填装",
  "Bright Purity": "光明纯净",
  "Lasting Purity": "永恒纯净",
  "Winds of Purity": "纯净之风",
  "Broad Eye": "广域之视",
  "Brutal Tide": "残暴浪潮",
  "Burdened Magazine": "过载弹匣",
  "Burning Wasp": "炙热黄蜂",
  "Buzz Kill": "败兴虐杀",
  "Calculated Shot": "精算射击",
  "Capacitance": "电容",
  "Surging Dash": "涌流突进",
  "Rising Storm": "风起云涌",
  "Charged Chamber": "蓄力装填",
  "Charged Shell": "充电弹头",
  "Chilling Grasp": "急冻控场",
  "Chilling Reload": "激冷装填",
  "Clashing Forest": "巨林冲击",
  "Cleanse Corpus": "净化Corpus",
  "Cleanse Grineer": "净化Grineer",
  "Cleanse Infested": "净化Infested",
  "Cleaving Whirlwind": "弧刃回天",
  "Coiling Viper": "毒蛇螺旋",
  "Collision Force": "冲击巨力",
  "Combustion Beam": "灼热光束",
  "Combustion Rounds": "燃烧弹头",
  "Concussion Rounds": "震荡弹头",
  "Constitution": "百折不挠",
  "Contagious Spread": "传染蔓延",
  "Continuity": "持久力",
  "Continuous Misery": "无尽苦难",
  "Convulsion": "痉挛",
  "Seeking Fury": "狂暴追猎",
  "Coolant Leak": "冷却液外泄",
  "Corrosive Projection": "腐蚀投射",
  "Corrupt Charge": "邪恶蓄力",
  "Covert Lethality": "致命匿杀",
  "Crash Course": "连续冲击",
  "Smite Infusion": "惩击洗礼",
  "Creeping Bullseye": "匍匐靶心",
  "Crimson Dervish": "赤红狂舞",
  "Critical Deceleration": "降速暴击",
  "Critical Delay": "关键延迟",
  "Crossing Snakes": "双蛇牙突",
  "Crowd Dispersion": "人群驱散",
  "Crushing Ruin": "月落乌啼",
  "Cryo Rounds": "低温弹头",
  "Curative Undertow": "疗愈漩涡",
  "Cutting Edge": "切割刃缘",
  "Dead Eye": "死亡之眼",
  "Deep Freeze": "深层冷冻",
  "Decisive Judgement": "果断裁决",
  "Scattered Justice": "散射正义",
  "Shattering Justice": "破碎正义",
  "Default Stance": "默认架式",
  "Defiled Reckoning": "亵渎清算",
  "Detect Vulnerability": "弱点侦测",
  "Diamond Skin": "钻石皮肤",
  "Dig": "挖掘",
  "Disruptor": "冲击干扰",
  "Dual Rounds": "双重弹头",
  "Eagle Eye": "鹰眼",
  "Efficient Transferral": "高效传输",
  "Eject Magazine": "弹匣置换",
  "Electrified Barrel": "带电枪管",
  "Electro Pulse ": "电光脉冲",
  "Eleventh Storm": "终焉风暴",
  "Enduring Strike": "不朽打击",
  "Energy Amplifier": "能量扩散",
  "Energy Channel": "能量导引",
  "Energy Inversion": "能量转化",
  "Energy Siphon": "能量虹吸",
  "Enemy Radar": "侦敌雷达",
  "Enemy Sense": "敌人感应",
  "Enhanced Durability": "耐久强化",
  "Equilibrium": "均衡点",
  "Escape Velocity": "脱离速度",
  "Exalted Blade (Stance)": "显赫刀剑（架式）",
  "Expel Corpus": "驱逐Corpus",
  "Expel Grineer": "驱逐Grineer",
  "Expel Infested": "驱逐Infested",
  "Explosive Demise": "爆散消亡",
  "Extend": "延展",
  "Fanged Fusillade": "尖牙连射",
  "Fast Deflection": "快速充能",
  "Fast Deflection (Sentinel)": "快速充能",
  "Fast Deflection (Kubrow)": "急速偏斜",
  "Fast Hands": "爆发装填",
  "Fatal Acceleration": "致死加速",
  "Fatal Attraction": "致命诱惑",
  "Freeze Force": "寒冰之力",
  "Ferocity": "凶恶终结",
  "Fever Strike": "热病打击",
  "Final Harbinger": "最终先驱",
  "Finishing Touch": "画龙点睛",
  "Fireball Frenzy": "狂热火球",
  "Firestorm": "烈焰风暴",
  "Fired Up": "过热射击",
  "Firewalker": "火焰行者",
  "Flailing Branch": "多流抽击",
  "Flame Repellent": "火焰防护",
  "Flash Accelerant": "闪耀助燃",
  "Flechette": "箭型弹头",
  "Fleeting Expertise": "弹指瞬技",
  "Flow": "川流不息",
  "Focus Energy": "聚焦能量",
  "Follow Through": "贯彻始终",
  "Fortitude": "不屈不挠",
  "Four Riders": "天启异象",
  "Fracturing Wind": "破碎之风",
  "Frail Momentum": "虚弱动能",
  "Frigid Blast": "冰冷疾风",
  "Frostbite": "结霜侵蚀",
  "Full Capacity": "充量弹容",
  "Full Contact": "全面接触",
  "Furious Javelin": "狂怒标枪",
  "Furor": "狂怒",
  "Fury": "狂暴",
  "Fusion Core": "融合核心",
  "Gaia's Tragedy": "母神悲歌",
  "Galvanized Blade": "通电刀刃",
  "Gemini Cross": "纵横双子",
  "Ghost": "幽灵",
  "Glacial Edge": "冰冷刃缘",
  "Gleaming Talon": "微光利爪",
  "Gnashing Payara": "狼鱼咬咬",
  "Grim Fury": "冷面狂怒",
  "Guardian": "守护者",
  "Gunslinger": "神枪手",
  "Hall of Malevolence": "恶怨厅",
  "Hallowed Reckoning": "神圣清算",
  "Hawk Eye": "隼目",
  "Hammer Shot": "重锤射击",
  "Handspring": "翻筋斗",
  "Heated Charge": "火焰装填",
  "Heavy Caliber": "重口径",
  "Heavy Impact": "震地冲击",
  "Heavy Trauma": "重创",
  "Hellfire": "地狱火",
  "Hell's Chamber": "地狱弹膛",
  "High Noon": "正午",
  "High Voltage": "高压电流",
  "Hollow Point": "空尖弹",
  "Hollowed Bullets": "中空子弹",
  "Homing Fang": "连牙追袭",
  "Hornet Strike": "黄蜂蛰刺",
  "Howl": "嚎声",
  "Hunt": "狩猎",
  "Hush": "消音器",
  "Hydraulic Barrel": "液压枪管",
  "Hydraulic Chamber": "液压枪膛",
  "Hydraulic Gauge": "液压弹药",
  "Hyperion Thrusters": "超越推进",
  "Hysteria (Stance)": "狂化爆发（架式）",
  "Hysterical Assault": "狂化突击",
  "Hysterical Fixation": "狂化冲动",
  "Ice Spring": "冰冷跃动",
  "Ice Storm": "冰风暴",
  "Ice Wave Impedance": "滞痕冰浪",
  "Incendiary Coat": "燃烧外壳",
  "Infected Clip": "污染弹匣",
  "Infested Impedance": "感染者阻抗",
  "Insulation": "隔热",
  "Intensify": "聚精会神",
  "Intruder": "入侵者",
  "Investigator": "侦察",
  "Iron Phoenix": "钢铁凤凰",
  "Iron Shrapnel": "碎铁弹片",
  "Ironclad Charge": "铁甲冲锋",
  "Irradiating Disarm": "辐射缴械",
  "Jagged Edge": "锯刃",
  "Jolt": "电流震击",
  "Justice Blades": "正义刀锋",
  "Kinetic Collision": "动能碰撞",
  "Killing Blow": "一击必杀",
  "Lasting Sting": "未完之刺",
  "Legendary Fusion Core": "传说核心",
  "Lethal Torrent": "致命洪流",
  "Lethal Momentum": "致命动量",
  "Life Strike": "生命打击",
  "Lightning Dash": "电光冲刺",
  "Lightning Rod": "避雷针",
  "Lingering Torment": "恒久折磨",
  "Link Health": "生命值连结",
  "Link Shields": "护盾连结",
  "Link Armor": "护甲连结",
  "Loaded Capacity": "加载弹容",
  "Lock and Load": "填弹上膛",
  "Loose Chamber": "松弛枪膛",
  "Loose Hatch": "松弛枪盖",
  "Loose Magazine": "松弛弹匣",
  "Loot Detector": "战利品探测器",
  "Loyal Companion": "忠实搭档",
  "Lucky Shot": "幸运射击",
  "Madurai Transmute Core": "Madurai转换核心",
  "Magazine Extension": "扩充弹匣",
  "Magazine Warp": "弹匣增幅",
  "Maglev": "磁浮",
  "Magma Chamber": "熔岩弹膛",
  "Magnum Force": "重装火力",
  "Maim": "致残枪弹",
  "Malicious Raptor": "恶毒猛禽",
  "Malignant Force": "致命火力",
  "Marathon": "马拉松",
  "Martial Magnetism": "心眼",
  "Master Thief": "盗贼大师",
  "Maul": "捶击",
  "Maximum Capacity": "极限弹容",
  "Melee Prowess": "非凡技巧",
  "Metal Auger": "合金钻头",
  "Mind Freak": "精神狂怒",
  "Mobilize": "全面驱动",
  "Modified Munitions": "弹药改良",
  "Molten Impact": "熔岩冲击",
  "Momentary Pause": "片刻喘息",
  "Morphic Transformer": "非晶变压器",
  "Naramon Transmute Core": "Naramon转换核心",
  "Narrow Minded": "心志偏狭",
  "Natural Talent": "天赋",
  "Neutralize": "啃咬压制",
  "Neutron Star": "中子星爆",
  "Night Stalker": "暗夜追迹者",
  "No Return": "有去无回",
  "North Wind": "北风",
  "Organ Shatter": "肢解",
  "Overcharge Detectors": "溢能感应",
  "Overextended": "过度延展",
  "Overview": "综观全局",
  "Pack Leader": "领袖",
  "Parallax Scope": "视差瞄具",
  "Parry": "格挡",
  "Patagium": "翼膜",
  "Pathogen Rounds": "病原弹头",
  "Perpetual Agony": "永恒苦痛",
  "Physique": "体魄",
  "Piercing Caliber": "穿甲口径",
  "Piercing Hit": "穿甲伤害",
  "Piercing Step": "穿刺步伐",
  "Pilfering Swarm": "贪夺触角",
  "Pistol Ammo Mutation": "手枪弹药转换",
  "Pistol Gambit": "手枪精通",
  "Pistol Pestilence": "瘟疫手枪",
  "Pistol Scavenger": "手枪弹药搜集者",
  "Point Blank": "抵近射击",
  "Point Strike": "致命一击",
  "Pointed Wind": "尖锐之风",
  "Poisonous Sting": "剧毒螫刺",
  "Polar Magazine": "极地弹仓",
  "Power Throw": "奋力一掷",
  "Pressure Point": "压迫点",
  "Primed Blunderbuss": "雷筒Prime",
  "Primed Chamber": "膛室Prime",
  "Primed Continuity": "持久力Prime",
  "Primed Fast Hands": "爆发装填Prime",
  "Primed Flow": "川流不息Prime",
  "Primed Heated Charge": "火焰装填Prime",
  "Primed Heavy Trauma": "重创Prime",
  "Primed Pistol Gambit": "手枪精通Prime",
  "Primed Pistol Mutation": "手枪弹药转换Prime",
  "Primed Point Blank": "抵近射击Prime",
  "Primed Ravage": "破灭Prime",
  "Primed Reach": "剑风Prime",
  "Primed Rifle Ammo Mutation": "步枪弹药转换Prime",
  "Primed Shotgun Ammo Mutation": "霰弹枪弹药转换Prime",
  "Primed Slip Magazine": "串联弹匣Prime",
  "Primed Target Cracker": "弱点专精Prime",
  "Prize Kill": "杀戮奖励",
  "Protect": "保护",
  "Provoked": "激怒",
  "Pummel": "强力猛击",
  "Purging Slash": "净化斩",
  "Purifying Flames": "净化烈焰",
  "Quickdraw": "持续火力",
  "Quick Charge": "护盾速充",
  "Quick Rest": "快速回复",
  "Quick Return": "快速收回",
  "Quick Thinking": "随机应变",
  "Quickening": "加速（MOD）",
  "Radiant Finish": "终结闪光",
  "Rage": "狂暴化",
  "Rapid Resilience": "极速复元",
  "Ravage": "破灭",
  "Razor Shot": "剃刀射击",
  "Reach": "剑风",
  "Reaping Spiral": "收割螺旋",
  "Rebound": "弹跳",
  "Recharge Barrier": "充能电幕",
  "Redirection": "蓄能重划",
  "Redirection (Sentinel)": "精算蓄能",
  "Reflection": "充能反弹",
  "Reflex Coil": "增幅线圈",
  "Reflex Draw": "反射拔枪",
  "Reflex Guard": "反射防御",
  "Regen": "重生",
  "Rejuvenation": "返老还童",
  "Relentless Assault": "残酷打击",
  "Rending Crane": "撕裂鹤击",
  "Rending Strike": "撕裂打击",
  "Rending Turn": "撕裂翻转",
  "Repelling Bastille": "驱逐力场",
  "Resonance": "残响共鸣",
  "Retribution": "惩戒",
  "Retrieve": "嗅索取物",
  "Revenge": "复仇",
  "Rifle Ammo Mutation": "步枪弹药转换",
  "Rifle Amp": "步枪增幅",
  "Rifle Aptitude": "步枪才能",
  "Rifle Scavenger": "步枪弹药搜集者",
  "Rift Torrent": "裂隙洪流",
  "Rime Rounds": "白霜弹头",
  "Rubedo-Lined Barrel": "红晶枪管",
  "Ruinous Extension": "毁灭扩展",
  "Rupture": "破裂",
  "Rush": "冲刺",
  "Sanctuary (Mod)": "守护光罩",
  "Sapping Reach": "蚀能磁触",
  "Savage Silence": "残酷无息",
  "Savagery": "野蛮压制",
  "Sawtooth Clip": "锯齿弹链",
  "Scattering Inferno": "炼狱轰击",
  "Scavenge": "搜集",
  "Scorch (Mod)": "灼痕焦点",
  "Muzzle Flash": "枪口闪焰",
  "Searing Steel": "炽燃钢铁",
  "Second Wind": "再起",
  "Seeker (Mod)": "弹头导引",
  "Seeking Force": "穿透力",
  "Seismic Palm": "震撼冲拳",
  "Self Destruct": "自爆",
  "Serration": "膛线",
  "Shell Compression": "压缩弹药",
  "Shell Shock": "电冲弹药",
  "Shelter": "庇护",
  "Shattering Storm": "云暴山碎",
  "Shield Disruption": "护盾瓦解",
  "Shield Flux": "护盾通量",
  "Shield Overload": "护盾过载",
  "Shield Transference": "护盾转移",
  "Shimmering Blight": "飞光荒疫",
  "Shock Absorbers": "减震器",
  "Shock Trooper": "电击奇兵",
  "Shocking Touch": "电击触点",
  "Shotgun Ammo Mutation": "霰弹枪弹药转换",
  "Shotgun Savvy": "通晓霰弹枪",
  "Shotgun Scavenger": "霰弹枪弹药搜集者",
  "Shotgun Spazz": "表演时间",
  "Shred": "撕裂",
  "Shredder": "粉碎器",
  "Signal Flare": "信号闪光",
  "Singularity": "奇异点",
  "Sinister Reach": "凶恶延伸",
  "Sinking Talon": "沉没之爪",
  "Slip Magazine": "串联弹匣",
  "Smite Corpus": "毁灭Corpus",
  "Smite Grineer": "毁灭Grineer",
  "Smite Infested": "毁灭Infested",
  "Smoke Shadow": "庇护烟幕",
  "Sniper Ammo Mutation": "狙击枪弹药转换",
  "Sniper Scavenger": "狙击枪弹药搜集者",
  "Soft Hands": "精湛快手",
  "Jet Stream": "急流",
  "Soul Survivor": "幸存生灵",
  "Spare Parts": "残余",
  "Spoiled Strike": "腐坏打击",
  "Speed Holster": "快速切换",
  "Speed Trigger": "灵敏扳机",
  "Split Chamber": "分裂膛室",
  "Sprint Boost": "冲刺提升",
  "Stabilizer": "稳定",
  "Stalk": "隐密追踪",
  "Stalking Fan": "缠旋风切",
  "Stand Ground": "坚守",
  "Steady Hands": "稳定枪手",
  "Steel Charge": "钢铁充能",
  "Steel Fiber": "钢铁纤维",
  "Steel Fiber (Sentinel)": "金属纤维（守护）",
  "Stormbringer": "暴风使者",
  "Streamline": "简化",
  "Stretch": "延伸",
  "Striker": "前锋",
  "Stunning Speed": "慑人神速",
  "Sudden Impact": "瞬间冲击",
  "Sundering Strike": "破甲",
  "Sundering Weave": "分裂编织",
  "Superior Defenses": "卓越防御",
  "Suppress": "消音",
  "Sure Footed": "顶天立地",
  "Sure Shot": "准确射手",
  "Sweeping Serration": "扫荡锯齿",
  "Swift Deth": "瞬杀",
  "Swirling Tiger": "旋风虎击",
  "Vengeful Revenant": "复仇亡灵",
  "Defiled Snapdragon": "积秽骁龙",
  "Vulpine Mask": "狡狐诈面",
  "System Reroute": "系统重划",
  "Tactical Pump": "战术上膛",
  "Tactical Reload": "机动装填",
  "Tainted Clip": "感染弹匣",
  "Tainted Mag": "腐败弹匣",
  "Tainted Shell": "污秽弹药",
  "Target Cracker": "弱点专精",
  "Targeting Receptor": "目标感应",
  "Tear Gas": "催泪毒雾",
  "Tempered Blade": "强化刀片",
  "Tempo Royale": "皇家节奏",
  "Terminal Velocity": "极限速度",
  "Tesla Link": "特斯拉陷阱",
  "Thermite Rounds": "铝热焊弹",
  "Tracking Shot": "标记射击",
  "Trick Mag": "戏法增幅",
  "Thief's Wit": "盗贼天赋",
  "Thunderbolt": "雷火",
  "Thumper": "重击者",
  "Tidal Impunity": "潮汐涌净",
  "Total Eclipse": "全蚀",
  "Toxic Barrage": "毒素弹幕",
  "Toxic Blight": "毁坏毒素",
  "Toxic Flight": "剧毒飞腾",
  "Transient Fortitude": "瞬时坚毅",
  "Tranquil Cleave": "秋风落叶",
  "True Punishment": "真实惩罚",
  "True Steel": "斩铁",
  "Twitch": "迅速抽换",
  "Undying Will": "不朽意志",
  "Unleashed": "释放",
  "Vacuum": "吸取",
  "Vampire Leech": "汲能榨取",
  "Vaporize": "汽化",
  "Vazarin Transmute Core": "Vazarin转换核心",
  "Venom Dose": "猛毒附加",
  "Venomous Clip": "恶毒弹匣",
  "Vermillion Storm": "朱红暴风",
  "Vicious Frost": "蚀骨寒霜",
  "Vicious Spread": "恶性扩散",
  "Vigor": "活力",
  "Vile Acceleration": "卑劣加速",
  "Vile Precision": "极恶精准",
  "Virulent Scourge": "剧毒灾害",
  "Vital Sense": "弱点感应",
  "Vitality": "生命力",
  "Vitality (Sentinel)": "构造强化",
  "Volcanic Edge": "爆裂刀刃",
  "Voltaic Strike": "伏打电能",
  "Warm Coat": "保温服",
  "Warrior": "战士",
  "Whirlwind": "旋风",
  "Wildfire": "野火",
  "Primed Morphic Transformer": "非晶变压器Prime",
  "Agility Drift": "矫捷窜升",
  "Power Drift": "力量窜升",
  "Stealth Drift": "匿踪窜升",
  "Cunning Drift": "狡诈窜升",
  "Speed Drift": "速度窜升",
  "Endurance Drift": "坚忍窜升",
  "Coaction Drift": "协力窜升",
  "Primed Fury": "狂暴Prime",
  "Primed Vigor": "活力Prime",
  "Hushed Invisibility": "静谧无踪",
  "Spring-Loaded Chamber": "簧压膛室",
  "Pressurized Magazine": "增压弹匣",
  "Body Count": "杀伤计数",
  "Catalyzer Link": "触媒连动",
  "Focused Defense": "重点防御",
  "Hydraulic Crosshairs": "液压准心",
  "Shrapnel Shot": "破片射击",
  "Bladed Rounds": "尖刃弹头",
  "Blood Rush": "急进猛突",
  "Embedded Catalyzer": "内置触媒",
  "Guided Ordinance": "制导弹药",
  "Laser Sight": "雷射瞄具",
  "Repeater Clip": "转轮弹匣",
  "Sharpened Bullets": "尖锐子弹",
  "Targeting Subsystem": "定位辅助",
  "Weeping Wounds": "创口溃烂",
  "Argon Scope": "氩晶瞄具",
  "Maiming Strike": "致残突击",
  "Nano-Applicator": "纳米涂覆",
  "Narrow Barrel": "狭窄枪膛",
  "Electro Pulse": "电光脉冲",
  "Air Thrusters": "空中推进",
  "Adept Surge": "跃浪好手",
  "Rising Skill": "飞升技巧",
  "Calculated Spring": "精准弹跳",
  "Tempered Bound": "调节跳跃",
  "Low Current Leap": "低能耗飞跃",
  "Meteor Munitions": "流星弹药",
  "Impaler Munitions": "穿刺弹药",
  "Razor Munitions": "剃刀弹药",
  "Comet Rounds": "彗星弹头",
  "Ripper Rounds": "撕裂弹头",
  "Serrated Rounds": "锯刃弹头",
  "Crash Shot": "溃散射击",
  "Shred Shot": "撕碎射击",
  "Flak Shot": "高射炮击",
  "Counterweight": "平衡配重",
  "Serrated Edges": "锯齿边缘",
  "Sharpened Blade": "锐利刀刃",
  "Armored Recovery": "复原装甲",
  "Anticipation": "冲击预感",
  "Spry Sights": "迅敏视觉",
  "Agile Aim": "机动瞄准",
  "Snap Shot": "速射",
  "Air Recon": "空中侦察",
  "Anti-Flak Plating": "抗爆覆甲",
  "Armored Acrobatics": "杂技装甲",
  "Armored Evade": "闪避装甲",
  "Surplus Diverters": "残盾转换",
  "Gun Glide": "恒稳枪杆",
  "Double-Barrel Drift": "游离双管",
  "Strafing Slide": "滑行扫射",
  "Martial Fury": "狂暴尚武",
  "Heartseeker": "觅心猎手",
  "Impenetrable Offense": "绝壁强攻",
  "Sword Alone": "一剑在手",
  "Lie In Wait": "埋伏射击",
  "Rumbled": "轰隆石者",
  "Push \u0026 Pull": "探推－挽拉",
  "Deceptive Bond": "虚伪连结",
  "Prism Guard": "棱彩护卫",
  "Discharge Strike": "卸能打击",
  "Ward Recovery": "火绫复苏",
  "Antimatter Mine": "反物质地雷",
  "Power of Three": "三幂之力",
  "Mesa's Waltz": "Mesa的华尔兹",
  "Overcharged": "能量超载",
  "Deadly Sequence": "致命数列",
  "Sequence Burn": "延烧数列",
  "Toxic Sequence": "毒素数列",
  "Resonating Quake": "震地共鸣",
  "Creeping Terrify": "缓动惊骇",
  "Iron Vault": "神针腾跃",
  "Primal Rage": "原始暴怒",
  "Phoenix Renewal": "凤凰新生",
  "Eroding Blight": "侵蚀毁坏",
  "Gleaming Blight": "毁坏微光",
  "Entropy Burst": "熵数爆发",
  "Entropy Flight": "飞逝熵数",
  "Entropy Spike": "熵数尖钉",
  "Arcane Strike": "速攻赋能",
  "Arcane Trickery": "诡计赋能",
  "Arcane Energize": "充沛赋能",
  "Arcane Eruption": "爆发赋能",
  "Arcane Pulse": "生机赋能",
  "Arcane Avenger": "复仇者赋能",
  "Accuracy": "精准度",
  "Affinity": "经验值",
  "Alert": "警报",
  "Alerts": "警报",
  "Alliance": "联盟",
  "Alloy Armor": "合金装甲",
  "Ammo": "弹药",
  "Arcane": "秘奥",
  "Arcane Enhancement": "赋能",
  "Arcane Enhancements": "赋能",
  "Archwing Maneuvers": "Archwing操控",
  "Armor": "护甲",
  "armour": "护甲",
  "Arsenal": "军械库",
  "Attack Speed": "攻击速度",
  "Attributes": "属性",
  "Aura": "光环",
  "Balor Fomorian": "巴罗尔巨人战舰",
  "Bleed": "出血",
  "Blocking": "格挡",
  "Blueprint": "蓝图",
  "Blueprints": "蓝图",
  "Boss": "头目",
  "Bosses": "头目",
  "Cell": "小队",
  "Cephalon": "中枢",
  "Characters": "角色",
  "Challenge Reward": "挑战奖励",
  "Channeling": "导引",
  "Clan": "氏族",
  "Cloned Flesh": "复制肉体",
  "Codex": "资料库",
  "Cold": "冰冻",
  "Color Palettes": "色彩包",
  "Colour Picker Extension": "调色板",
  "Color Picker Extension": "调色板",
  "Companions": "同伴",
  "Common": "常见",
  "Corrupted": "堕落者",
  "Corrupted Mods": "堕落MOD",
  "Credits": "现金",
  "Credit": "现金",
  "credits": "现金",
  "Critical Hit": "暴击",
  "Critical Hit (Mechanic)": "暴击",
  "Crit Chance": "暴击几率",
  "Crit Multiplier": "暴击倍率",
  "Daily Tribute": "每日献礼",
  "Damage": "伤害",
  "Damage 2.0": "伤害",
  "Damaged Mods": "瑕疵的MOD",
  "Death": "死亡",
  "Death Mark": "死亡标记",
  "Ducats": "杜卡德金币",
  "Duel": "决斗",
  "Dojo": "道场",
  "Electric": "电击",
  "Elemental Damage": "元素伤害",
  "Elemental Sandstorm": "元素沙暴",
  "Enemy Behavior": "敌方行为",
  "Enemy Body Parts": "敌人身体部位",
  "Enemy Level Scaling": "敌方等级变化规律",
  "Energy": "能量",
  "Equipment": "配备",
  "Exilus Mods": "特殊功能MOD",
  "Experience Mechanics": "经验机制",
  "Event": "活动",
  "Events": "活动",
  "FAQ": "提问与解答",
  "Ferrite Armor": "铁制装甲",
  "Ferrite armor": "铁制装甲",
  "Finisher": "处决",
  "Finishing": "处决",
  "Fire Rate": "射速",
  "Fire Rate (Mechanic)": "射速",
  "Flesh": "肉体",
  "Focus": "专精",
  "Formorian": "巨人战舰",
  "Fossilized": "化石",
  "Founders": "创始人",
  "Foundry": "铸造厂",
  "Factions": "派系",
  "Faction Damage Mods": "派系伤害MOD",
  "Fusion": "融合",
  "Game Modes": "游戏模式",
  "Gear": "携带道具",
  "Hacking": "骇入",
  "Heads-Up Display": "抬头显示界面",
  "Health": "生命",
  "Heat": "火焰",
  "Hidden Messages": "被隐藏的信息",
  "Idle Animations": "站姿",
  "Impact": "冲击",
  "Infested Flesh": "感染肉体",
  "I. Flesh": "感染肉体",
  "Infested Sinew": "感染肌腱",
  "Key Bindings": "按键绑定",
  "Knockdown": "击倒",
  "Kubrow": "库狛",
  "Kuria": "库利亚猫神器",
  "Oddities": "奇特物件",
  "Landing Craft": "登陆艇",
  "Movement Speed": "移动速度",
  "Login Rewards": "登录奖励",
  "Machinery": "机械",
  "Magnetic": "磁力",
  "Corrosive": "腐蚀",
  "Maneuver": "操控",
  "Maneuvers": "操控",
  "Market": "商店",
  "Mastery": "段位",
  "Mastery Rank": "段位",
  "Maximization": "最大化",
  "Maximized": "最大化",
  "Maximized Power Duration": "技能持续时间最大化",
  "Maximized Power Efficiency": "技能效率最大化",
  "Maximized Power Range": "技能范围最大化",
  "Maximized Power Strength": "技能强度最大化",
  "Melee": "近战",
  "Melee Combo Counter": "近战连击数",
  "Melee 2.0": "近战",
  "Mission": "任务",
  "missions": "任务",
  "Mods": "MOD",
  "Mods 2.0": "MOD",
  "Mod": "MOD",
  "Multishot": "多重射击",
  "Multishot (Mechanic)": "多重射击",
  "Nav Segment": "导航模块",
  "Nightmare Mode": "噩梦模式",
  "Noise Level": "噪音等级",
  "Object": "物件",
  "Object (Health)": "物件",
  "objects": "物件",
  "Obstacle Course": "障碍训练场",
  "One-Handed Action": "单手动作",
  "Operator": "指挥官",
  "Orbiter": "轨道飞行器",
  "Orbiter Segments": "轨道飞行器模块",
  "Orokin Vault": "Orokin宝库",
  "Overshield": "过载护盾",
  "Overshields": "过载护盾",
  "Passives": "被动效果",
  "Pickups": "可拾取物",
  "Pickup": "可拾取物",
  "Platinum": "白金",
  "Polarity": "极性",
  "Polarization": "极化",
  "Power Efficiency": "技能效率",
  "Power Efficiency (Mechanic)": "技能效率",
  "Power Mods and Abilities": "能力MOD与技能",
  "Power Strength": "技能强度",
  "Power Duration": "技能持续时间",
  "Power Range": "技能范围",
  "Powers": "技能",
  "Prime Access": "Prime特权",
  "Proc": "异常状态",
  "Projectile Speed": "抛射物飞行速度",
  "Proto Shield": "原型护盾",
  "Punch Through": "穿透",
  "Punch Through (Mechanic)": "穿透",
  "Puncture": "穿刺",
  "PvP": "玩家间对抗",
  "Quest": "系列任务",
  "Rare": "稀有",
  "Recoil": "后坐力",
  "Referral Program": "招募计划",
  "Reload": "装填",
  "Reload Speed": "装填速度",
  "Research": "研究",
  "Research/Tenno Lab Research Tab": "Tenno实验室",
  "Reward System": "奖励系统",
  "Rift Plane": "裂隙位面",
  "Robotic": "机器",
  "Schema": "架构",
  "Semi-Auto": "半自动",
  "Sentinel": "守护",
  "Sentinels": "守护",
  "Shield": "护盾",
  "Shielded": "护盾",
  "Shields": "护盾",
  "Sigil": "纹章",
  "Sigils": "纹章",
  "Slash": "切割",
  "slide": "滑行",
  "Somatic Link": "活体连接器",
  "Special Weapons": "特殊武器",
  "Specter": "魅影",
  "squad": "小队",
  "Stamina": "耐力",
  "Stance": "架式",
  "Standing": "声望",
  "Status Chance": "异常触发几率",
  "Status Effect": "异常状态",
  "Stealth": "偷袭",
  "Story and History": "背景故事",
  "Supercharger": "极限突破装置",
  "Superchargers": "极限突破装置",
  "Syndicate": "集团",
  "Syndicate Alert": "集团警报",
  "Syndicate Medallions": "集团奖章",
  "Syndicate Operatives": "集团特工",
  "Syndicates": "集团",
  "System Requirements": "配置需求",
  "Threat Level": "威胁等级",
  "Tile Sets": "地图板块",
  "Tileset": "地图板块",
  "Toxic": "毒素",
  "Toxin Damage": "毒素伤害",
  "Toxin": "毒素",
  "Trade": "交易",
  "Trading": "交易",
  "Trade System": "交易系统",
  "Transference Room": "传识之间",
  "Transmutation": "转换",
  "Tritium Battery": "氚电池",
  "Uncommon": "罕见",
  "Viral": "病毒",
  "Void Trader": "虚空商人",
  "WARFRAME (China)": "星际战甲",
  "Warframe China": "星际战甲",
  "Warframes": "战甲",
  "Warframe Attributes": "战甲属性",
  "Warframe Augment Mods": "战甲强化MOD",
  "Warframe Augment Mod": "战甲强化MOD",
  "Warframe Chassis Blueprint": "战甲机体蓝图",
  "Warframe Cosmetics": "战甲外观",
  "Sentinel Cosmetics": "守护外观",
  "Warframe Helmet Blueprint": "战甲头盔蓝图",
  "Warframe Systems Blueprint": "战甲系统蓝图",
  "Weapon Augments": "武器强化",
  "Weapon Augment Mods": "武器强化MOD",
  "Weapons Mastery Rank": "武器段位限制",
  "Weapons": "武器",
  "Wild": "野生动物",
  "Zoom": "瞄准",
  "Prime Vault": "Prime宝库",
  "Faction": "派系",
  "Mission Rewards": "任务奖励",
  "Tilesets": "地图板块",
  "Kubrow Cosmetics": "库狛外观",
  "Augment": "强化",
  "Blight": "毁坏",
  "aim": "瞄准",
  "Focus Lens": "专精晶体",
  "Lunaro": "月动球",
  "Sentinel Mods": "守护MOD",
  "Companion": "同伴",
  "Systems": "系统",
  "Cerebrum": "头部",
  "Carapace": "外壳",
  "Prisma": "棱晶",
  "Guides of the Lotus": "Lotus的指引者",
  "factions": "派系",
  "invasion": "入侵",
  "Finishing Damage": "处决伤害",
  "Field Bosses": "乱入头目",
  "Field Boss": "乱入头目",
  "Assassin": "刺客",
  "Zanuka Project": "Zanuka计划",
  "Alternate Fire": "次要开火模式",
  "Confusion": "迷惑",
  "Silent": "无声",
  "Datamass": "数据块",
  "Widget": "改造器",
  "Truth": "真相",
  "Corpus Language": "Corpus语",
  "Vandal": "破坏者",
  "Wraith": "亡魂",
  "Emotes": "表情动作",
  "Sniper Rifle": "狙击枪",
  "Syandana": "披饰",
  "Secondary Fire": "次要开火模式",
  "Disarm": "解除武装",
  "Void Relics": "虚空遗物",
  "Void Relic": "虚空遗物",
  "Starchart": "星图",
  "Void Fissure": "虚空裂缝",
  "Fragments": "碎片",
  "Junction": "接合点",
  "Void Traces": "虚空光体",
  "Lith": "古纪",
  "Meso": "前纪",
  "Neo": "中纪",
  "Axi": "后纪",
  "Lith Era": "古世纪",
  "Meso Era": "前世纪",
  "Neo Era": "中世纪",
  "Axi Era": "后世纪",
  "Rotation": "轮次",
  "Sol": "太阳系",
  "Star Chart": "星图",
  "Scanner": "扫描",
  "Bleedout": "濒死",
  "Maroo's Bazaar": "Maroo的市集",
  "Endo": "内融核心",
  "Huras Kubrow": "匿踪型库狛",
  "Raksa Kubrow": "防护型库狛",
  "Sahasa Kubrow": "突击型库狛",
  "Sunika Kubrow": "猎杀型库狛",
  "Chesa Kubrow": "寻猎型库狛",
  "Smeeta Kavat": "笑面型库娃",
  "Adarza Kavat": "镜像型库娃",
  "Carrier": "搬运者",
  "Carrier Sentinel": "搬运者",
  "Deth Machine Rifle": "死亡机枪",
  "Dethcube": "死亡魔方",
  "Diriga": "电气浮囊",
  "Djinn": "引灵",
  "Djinn Sentinel": "引灵",
  "Helios Sentinel": "赫利俄斯",
  "Helios": "赫利俄斯",
  "Shade": "阴影",
  "Shade Sentinel": "阴影",
  "Stinger": "毒刺",
  "Wyrm": "蛟龙",
  "Wyrm Sentinel": "蛟龙",
  "Wyrm Prime": "蛟龙Prime",
  "Carrier Prime": "搬运者Prime",
  "Prisma Shade": "棱晶阴影",
  "Specter Regiment": "魅影军团",
  "Trading Post": "交易站",
  "Research lab": "研究实验室",
  "research lab": "研究实验室",
  "Energy Lab": "能源实验室",
  "Chemical Lab": "化学实验室",
  "Biological Lab": "生物实验室",
  "Orokin Lab": "Orokin实验室",
  "Alloy Plate": "合金板",
  "Argon Crystal": "氩结晶",
  "Beacons": "信标",
  "Circuits": "电路",
  "Control Module": "控制模块",
  "Credit Cache": "现金匣",
  "Detonite Ampule": "爆燃安瓿",
  "Detonite Injector": "爆燃喷射器",
  "Fieldron": "电磁力场装置",
  "Fieldron Sample": "电磁力场装置样本",
  "Ferrite": "铁氧体",
  "Gallium": "镓",
  "Morphics": "非晶态合金",
  "Mutagen Sample": "样本突变原",
  "Nano Spores": "纳米孢子",
  "Nav Coordinates": "遗迹船导航坐标",
  "Neural Sensors": "神经传感器",
  "Neurodes": "神经元",
  "Omega Isotopes": "奥米伽同位素",
  "Orokin Cell": "Orokin电池",
  "Pigment": "颜料",
  "Plastids": "生物质",
  "Polymer Bundle": "聚合物束",
  "Rare Resource Blueprint": "稀有资源蓝图",
  "Rubedo": "红化结晶",
  "Resources": "资源",
  "resources": "资源",
  "Salvage": "回收金属",
  "Sanctuary (Cephalon Simaris)": "圣殿",
  "Cryotic": "永冻晶矿",
  "Oxium": "奥席金属",
  "Tellurium": "碲",
  "Mutagen Mass": "突变原聚合物",
  "Sunlight Threshcone": "日光去壳毬果",
  "Moonlight Threshcone": "月光去壳毬果",
  "Sunlight Dragonlily": "日光龙百合",
  "Moonlight Dragonlily": "月光龙百合",
  "Sunlight Jadeleaf": "日光玉叶",
  "Moonlight Jadeleaf": "月光玉叶",
  "Nitain Extract": "泥炭萃取物",
  "Dusklight Sarracenia": "尘光瓶子草",
  "Ruk's Claw": "Ruk之爪",
  "Lunar Pitcher": "月之猪笼草",
  "Frostleaf": "霜叶",
  "Vestan Moss": "灶神藓",
  "Suspicious Shipments": "可疑的货物",
  "Hive": "清巢",
  "Annihilation": "歼夺",
  "Rush (Archwing)": "突袭",
  "Pursuit": "追击",
  "Assassination": "刺杀",
  "Capture": "捕获",
  "Cephalon Capture": "夺取中枢",
  "Conclave": "武形秘仪",
  "Crossfire": "多方交战",
  "Deception": "欺骗",
  "Defense": "防御",
  "Endless Defense": "防御",
  "Arena": "竞技场",
  "Endless Defense Missions": "防御",
  "Environmental Hazards": "危机",
  "Excavation": "挖掘",
  "Exterminate": "歼灭",
  "Hijack": "劫持",
  "Hive Sabotage": "清巢",
  "Fomorian Sabotage": "破坏巨人战舰",
  "Reactor Sabotage": "核心破坏",
  "Howl of the Kubrow": "库狛取得任务",
  "Interception": "拦截",
  "Invasion": "入侵",
  "Missions": "任务",
  "Mobile Defense": "移动防御",
  "Once Awake": "悲剧的开端",
  "Operation Gate Crash": "行动代号：摧毁传送门",
  "Operation: Gate Crash": "行动代号：摧毁传送门",
  "Orokin Sabotage": "Orokin破坏",
  "Patient Zero": "零号病患",
  "Player vs. Player (PvP)": "玩家间对抗",
  "Recovery": "重整态势",
  "Rescue": "救援",
  "Rescue 2.0": "救援",
  "Sabotage": "破坏",
  "Solar Rail Conflict": "黑暗地带冲突",
  "Sortie": "突击",
  "Spy": "间谍",
  "Spy 2.0": "间谍",
  "Survival": "生存",
  "Tactical Alert": "战术警报",
  "Team Annihilation": "团队歼夺",
  "The Archwing": "Archwing（系列任务）",
  "The Law of Retribution": "复仇法则",
  "the Jordas Verdict": "Jordas的审判",
  "The Jordas Verdict": "Jordas的审判",
  "The Limbo Theorem": "Limbo定理",
  "Limbo Theorem": "Limbo定理",
  "The New Strange": "新疑谜团",
  "The Second Dream": "第二场梦",
  "Trial": "试炼",
  "Stolen Dreams": "被偷走的梦",
  "Vor's Prize": "Vor的战利品",
  "Vor's Prize quest": "Vor的战利品",
  "Sealab Sabotage": "深海研究所破坏",
  "A Man of Few Words": "沉默寡言的男人",
  "zipline": "滑索",
  "Zipline": "滑索",
  "Synthesis": "结合仪式",
  "Orokin Moon/Agility Test": "矫捷考验",
  "Orokin Moon/Power Test": "力量考验",
  "Orokin Moon/Stealth Test": "匿踪考验",
  "Orokin Moon/Cunning Test": "狡诈考验",
  "Orokin Moon/Speed Test": "速度考验",
  "Orokin Moon/Endurance Test": "坚忍考验",
  "Orokin Moon/Collaboration Test": "协力考验",
  "Dark Sector Survival": "黑暗地带生存",
  "Dark Sector Defense": "黑暗地带防御",
  "Dark Sector Excavation": "黑暗地带挖掘",
  "The Jordas Precept": "Jordas枢律",
  "Ayatan Sculptures": "阿耶檀识塑像",
  "Ayatan Sculpture": "阿耶檀识塑像",
  "Storage Container": "储存容器",
  "Storage Containers": "储存容器",
  "Locker": "储存柜",
  "Crate": "储存箱",
  "Corpse": "尸体",
  "Resource Cache": "资源储藏容器",
  "Blunt": "便携掩体",
  "Nightfall Apothic": "夜幕药剂",
  "Twilight Apothic": "暮光药剂",
  "Sunrise Apothic": "日升药剂",
  "Pherliac Pod": "费洛髂荚囊",
  "Abra Paris Skin": "帕里斯磨蚀外观",
  "Loki Knave Skin": "Loki无赖外观",
  "Saryn Orphid Skin": "Saryn兰花外观",
  "Oberon Feyarch Skin": "Oberon精灵之王外观",
  "Adventus Arrow Collection": "初来乍到箭矢组合包",
  "Affinity Booster": "经验值加成",
  "Air Support Charge": "空中支援呼叫器",
  "Air Support Charges": "空中支援呼叫器",
  "Aurora Frost Helmet": "极光Frost头盔",
  "Antiserum Injector": "抗血清注射器",
  "Antitoxin (Gear)": "解毒剂",
  "Antitoxins": "解毒剂",
  "Fomorian Disruptor": "巨人战舰干扰器",
  "Baro Ki'Teer Noggle": "Baro Ki'Teer摇头娃娃",
  "Bastet Valkyr Helmet": "芭丝特Valkyr头盔",
  "Bleeding Key": "残血龙钥",
  "Booster": "加成物品",
  "Boosters": "加成物品",
  "Brokk": "布洛克外观",
  "Chorus Banshee Helmet": "Banshee合音头盔",
  "Clan Key": "氏族钥匙",
  "Codex Scanner": "扫描器",
  "Coil Mag Helmet": "线圈Mag头盔",
  "Corpus Turret": "Corpus炮塔",
  "Cipher": "破解器",
  "Credit Booster": "现金加成",
  "Dagger Axe (Scindo)": "分裂斩斧戈刃外观",
  "Dagger Axe (Zoren)": "佐伦双斧戈刃外观",
  "Decaying Key": "腐朽龙钥",
  "Dragon Key": "龙钥",
  "Dragon Keys": "龙钥",
  "Decaying Dragon Key": "腐朽龙钥",
  "Distilling Extractor": "精粹采集者",
  "Distilling Extractor Prime": "精粹采集者Prime",
  "DNA Stabilizer": "DNA稳定剂套装",
  "Eros Arrow Skin": "爱神之箭外观",
  "Explosive Barrel": "炸药桶",
  "Extinguished Key": "熄灭龙钥",
  "Extractor": "采集者",
  "Forest-Camo Skin Pack": "森林迷彩外观包",
  "Gemini Nikana Sheath": "侍刃双子刀鞘",
  "Genetic Code Template": "基因密码模板",
  "Grand Finale": "压轴好戏",
  "Grineer Desert Tactics Pack": "Grineer沙漠战术包",
  "Health Restore": "生命补给（大型）",
  "Hobbled Key": "蹒跚龙钥",
  "Huntsman Soma": "猎手外观",
  "Incubator Upgrade Segment": "孵化器升级模块",
  "Kinetic Siphon Trap": "动能吸收陷阱",
  "Kinetic Siphon Traps": "动能吸收陷阱",
  "Kotara": "窟窿",
  "Landing Craft Foundry Segment": "登陆艇铸造厂模块",
  "Large Team Ammo Restore": "团队弹药补给（大型）",
  "Large Team Energy Restore": "团队能量补给（大型）",
  "Large Team Heal Restore": "团队生命补给（大型）",
  "Large Team Shield Restore": "团队护盾补给（大型）",
  "Manticore": "蝎尾狮外观",
  "Medium Team Ammo Restore": "团队弹药补给（中型）",
  "Medium Team Energy Restore": "团队能量补给（中型）",
  "Medium Team Heal Restore": "团队生命补给（中型）",
  "Medium Team Shield Restore": "团队护盾补给（中型）",
  "Menticide Nyx Helmet": "灭神Nyx头盔",
  "Meridian Trinity Helmet": "经络Trinity头盔",
  "MOA Cabinet Spawner": "恐鸟储存柜",
  "Mutalist Alad V Assassinate Key": "异融者Alad V刺杀钥匙",
  "Nexus Fur Pattern": "纳瑟斯毛皮花纹",
  "Nightwatch Camouflage": "夜巡者伪装迷彩",
  "Omni Ammo Box": "综合弹药箱",
  "The Tekelu Collection": "提奇鲁外观组合包",
  "Orokin Reactor": "Orokin反应堆",
  "Orokin Catalyst": "Orokin催化剂",
  "Exilus Adapter": "特殊功能槽连接器",
  "Pahta": "飞翔",
  "Pistol Ammo Box": "弹药箱",
  "Pistol_Ammo_Box": "弹药箱",
  "Polar Glaxion Skin": "冷冻光束步枪极地外观",
  "Prisma Arrows": "棱晶箭矢",
  "Prisma Sigil": "棱晶纹章",
  "Proto-Glaive Skin": "战刃原型外观",
  "Pyra Sugatra": "珮菈坠饰",
  "Rahk Fluctus": "巨浪拉克外观",
  "Resource Booster": "资源数量加成",
  "Resource Drop Chance Booster": "资源掉落几率加成",
  "Reverb Banshee Helmet": "Banshee返响头盔",
  "Shield Restore": "护盾回复",
  "Shock Camo Pack": "闪电迷彩包",
  "Small Health Restore": "生命补给（小型）",
  "Starburst": "光芒四射",
  "Stealth Pack": "隐秘潜入包",
  "Stun Baton": "电击棒",
  "Synthesis Scanner": "结合扫描器",
  "Sugatra": "坠饰",
  "Synoid Syandana": "枢议披饰",
  "Team Ammo Restore": "团队弹药补给（小型）",
  "Team Bonus Consumables": "团队补给消耗品",
  "Team Energy Restore": "团队能量补给（小型）",
  "Team Shield Restore": "团队护盾补给（小型）",
  "Team Heal Restore": "团队生命补给（小型）",
  "Team Heal": "团队生命补给",
  "Titan Extractor": "泰坦采集者",
  "Titan Extractor Prime": "泰坦采集者Prime",
  "Void Key": "虚空钥匙",
  "Void Keys": "虚空钥匙",
  "Winter Bundle": "冬日组合包",
  "Prime Eos Shoulder Plate": "曙光女神肩甲Prime",
  "Prime Eos Chest Plate": "曙光女神胸甲Prime",
  "Prime Eos Spurs": "曙光女神马刺Prime",
  "Prisma Hecate Syandana": "棱晶朔月女神披饰",
  "Prisma Daedalus Chest Plate": "棱晶代达罗斯胸甲",
  "Prisma Daedalus Shin Guard": "棱晶代达罗斯护膝板",
  "Prisma Daedalus Shoulder Guard": "棱晶代达罗斯护肩",
  "Prisma Jet Sentinel Wings": "棱晶喷射机翼",
  "Prisma Mech Head Sentinel Mask": "棱晶机甲头盔面具",
  "Day of the Dead Dark Sword Skin": "暗影长剑亡灵节外观",
  "Day of the Dead Weapon Skin Pack": "亡灵节武器外观包",
  "Elixis Redeemer": "救赎者镀铜外观",
  "Incubator Power Core": "孵化器能量核心",
  "Kubrow Egg": "库狛蛋",
  "Incubator": "孵化器",
  "Kavasa Prime": "喀婆萨Prime",
  "Kavasa Prime Collar": "喀婆萨Prime项圈",
  "Ictus Attachments": "扬音守护配件",
  "Simaris Helios Skin": "Simaris外观赫利俄斯",
  "Kavat Starter Kit": "库娃初心者套装",
  "Kavat Genetic Code": "库娃遗传密码",
  "Mod Pack": "MOD包",
  "Arbiters of Hexis": "均衡仲裁者",
  "Cephalon Suda": "中枢苏达",
  "Entropy": "熵数",
  "Genius": "天才",
  "Justice": "正义",
  "New Loka": "新世间",
  "Partner": "伙伴",
  "Red Veil": "血色面纱",
  "Steel Meridian": "钢铁防线",
  "The Perrin Sequence": "佩兰数列",
  "Perrin Sequence": "佩兰数列",
  "Aiming at Downed Enemy": "对着倒地敌人",
  "Button Combination": "按键组合",
  "Hold": "按住",
  "In Air": "在空中",
  "Launching Spring": "升龙拳",
  "Move": "招式",
  "Pause": "暂停",
  "Roaring Drums": "狂吼战拳",
  "Slide": "滑行时",
  "Through Strike": "穿龙破",
  "Wallrun": "壁面蹬冲",
  "Sands of Inaros": "Inaros之沙",
  "Operation Eyes of Blight": "行动代号：毁灭之眼",
  "Operation: Shadow Debt": "行动代号：影子之债",
  "Arid Fear Event": "行动代号：沙漠恐惧",
  "Artifact Defense Event": "行动代号：神器防御",
  "Avalanche Offensive": "行动代号：雪崩进攻",
  "Fusion Moa Event": "行动代号：熔岩恐鸟",
  "Informant Event": "行动代号：Grineer通报者",
  "Operation Breeding Grounds": "行动代号：清巢",
  "Operation Cryotic Front": "行动代号：永冻晶矿前线",
  "Operation: Mutalist Incursions": "行动代号：异融者入侵",
  "Sling-Stone Event": "行动代号：机弦",
  "Specters Of Liberty": "魅影自由之战",
  "Survival Weekend Event": "生存周末活动",
  "Tethra's Doom": "行动代号：泰斯拉末日",
  "The Cicero Crisis": "行动代号：西塞罗危机",
  "the Cicero Crisis": "行动代号：西塞罗危机",
  "The Gradivus Dilemma": "行动代号：荧惑",
  "The Hunt For Alad V": "行动代号：追击Alad V",
  "Operation False Profit": "行动代号：变造利益",
  "Operation Tubemen of Regor": "行动代号：Regor的实验体",
  "Gift Of The Lotus": "Lotus的赏赐",
  "Tactical Recall Bonus Weekend": "战术警报重现奖励周末",
  "A Favor For Darvo": "协助Darvo",
  "Ties That Bind": "结为盟友",
  "The Silver Grove": "落银树庭",
  "Update 7": "更新7",
  "Update 8": "更新8",
  "Update 9": "更新9",
  "Update 10": "更新10",
  "Update 11": "更新11",
  "Update 12": "更新12",
  "Update 13": "更新13",
  "Update 14": "更新14",
  "Update 15": "更新15",
  "Update 16": "更新16",
  "Update 17": "更新17",
  "Update 18": "更新18",
  "Update 19": "更新19",
  "Specters of the Rail": "航道幽影",
  "Closed Beta": "内测",
  "Cephalon Simaris": "中枢Simaris",
  "Color Pack Alpha": "颜料包A",
  "Color Pack Beta": "颜料包B",
  "Frugal Credit Bundle": "节约套组",
  "High Roller Credit Bundle": "一掷千金套组",
  "Wrecking Rhino Pack": "破碎Rhino包",
  "Aim": "瞄准",
  "Carpet Bomb": "地毯式轰炸",
  "Damage 2.0/Alloy Armor": "合金装甲",
  "Damage 2.0/Cloned Flesh": "复制肉体",
  "Damage 2.0/Electricity Damage": "电击伤害",
  "Damage 2.0/Ferrite Armor": "铁制装甲",
  "Damage 2.0/Finishing Damage": "处决伤害",
  "Damage 2.0/Flesh": "肉体",
  "Damage 2.0/Fossilized": "化石",
  "Damage 2.0/Infested": "感染",
  "Damage 2.0/Infested Flesh": "感染肉体",
  "Damage 2.0/I. Flesh": "感染肉体",
  "Damage 2.0/Infested Sinew": "感染肌腱",
  "Damage 2.0/Machinery": "机械",
  "Damage 2.0/Magnetic Damage": "磁力伤害",
  "Damage 2.0/Object": "物件",
  "Damage 2.0/Proto Shield": "原型护盾",
  "Damage 2.0/Puncture Damage": "穿刺伤害",
  "Damage 2.0/Robotic": "机器",
  "Damage 2.0/Shielded": "护盾",
  "Damage 2.0/Shield": "护盾",
  "Damage 2.0/Sinew": "感染肌腱",
  "Damage 2.0/Slash Damage": "切割伤害",
  "Damage 2.0/Cold Damage": "冰冻伤害",
  "Damage 2.0/Impact Damage": "冲击伤害",
  "Damage 2.0/Fire Damage": "火焰伤害",
  "Damage 2.0/Toxin Damage": "毒素伤害",
  "Damage 2.0/Radiation Damage": "辐射伤害",
  "Damage 2.0/Corrosive Damage": "腐蚀伤害",
  "Damage 2.0/Blast Damage": "爆炸伤害",
  "Damage 2.0/Gas Damage": "毒气伤害",
  "Glossary": "游戏用语",
  "Grineer Language": "Grineer语",
  "Med Tower": "治愈之塔",
  "Override": "覆写",
  "Settings": "选项",
  "Trivia": "小常识",
  "Patch History": "更新历史",
  "Mechanics": "机制",
  "Stats": "详细信息",
  "Gallery": "相关图片",
  "Acquisition": "入手方法",
  "Characteristics": "特点",
  "Tips": "提示",
  "Quotes": "语录",
  "Behavior": "行动模式",
  "See also": "另见",
  "References": "引用",
  "Comparisons": "比较",
  "Skins": "外观",
  "Tactics": "行动策略",
  "Sources": "引用",
  "Media": "影音资料",
  "Abilities": "技能",
  "Bugs": "漏洞",
  "Sentinel Loadouts": "守护配装",
  "Note": "附注",
  "Notes": "附注",
  "Legendary Mods": "传说MOD",
  "Primed Mods": "Prime版MOD",
  "Daily Tribute Rewards": "每日献礼奖励",
  "Archwing Gun": "Archwing枪械",
  "Archwing Weapons": "Archwing武器",
  "Archwing Abilities": "Archwing技能",
  "Channeled Abilities": "持续消耗型技能",
  "Dual Swords": "双剑",
  "Melee Weapons": "近战武器",
  "Slash Damage Weapons": "切割伤害武器",
  "Primary Weapons": "主武器",
  "Bow": "弓",
  "Puncture Damage Weapons": "穿刺伤害武器",
  "Single-Shot": "单发",
  "Sniper Rifles": "狙击枪",
  "Semi-Automatic": "半自动",
  "Tactical Alert Reward": "战术警报奖励",
  "Impact Damage Weapons": "冲击伤害武器",
  "Mutalist": "异融",
  "Assault Rifle": "突击步枪",
  "Electricity Damage": "电击伤害",
  "Event Reward": "活动奖励",
  "Blast Damage": "爆炸伤害",
  "Augmented Weapons": "强化武器",
  "Syndicate Offerings": "集团商品",
  "Shotgun": "霰弹枪",
  "Launchers": "发射器",
  "Magnetic Damage": "磁力伤害",
  "Warframe China Timed Exclusive": "星际战甲限时专享",
  "Automatic": "全自动",
  "Hybrid Weapons": "合成武器",
  "Hybrid": "多形态武器",
  "Secondary Weapons": "副武器",
  "Dual Sidearms": "双持副武器",
  "Heat Damage": "火焰伤害",
  "Shotgun Sidearm": "副手霰弹枪",
  "Single Sidearm": "单持副武器",
  "Thrown": "投掷类武器",
  "Radiation Damage": "辐射伤害",
  "Community Concept": "玩家创意",
  "Baro Ki'Teer Offering": "Baro Ki'Teer商品",
  "Scythe": "镰刀",
  "Lore": "背景知识",
  "Heavy Blade": "巨刃",
  "Rapier": "细剑",
  "Holiday Content": "节日特供",
  "Polearm": "长柄武器",
  "Blade and Whip": "剑鞭",
  "Dual Daggers": "双匕首",
  "Hammer": "锤",
  "Cold Damage": "冰冻伤害",
  "Fist": "拳套",
  "Nunchaku": "双截棍",
  "Dagger": "匕首",
  "Sword": "剑",
  "Sword and Shield": "剑盾",
  "Gunblade": "枪刃",
  "Sparring": "搏击",
  "Staff": "长棍",
  "Whip": "鞭",
  "Claws": "双爪",
  "Tonfa": "拐刃",
  "Stance Mods": "架式MOD",
  "Orokin Language": "Orokin语",
  "Archwing Mods": "Archwing机体MOD",
  "Madurai Mods": "Madurai极性MOD",
  "Removed": "已绝版",
  "Burst Fire": "连发点射",
  "Sentinel Weapons": "守护武器",
  "Enemies": "敌人",
  "Warframe Mods": "战甲MOD",
  "Naramon Mods": "Naramon极性MOD",
  "Vazarin Mods": "Vazarin极性MOD",
  "Rifle Mods": "步枪MOD",
  "Assault Rifle Mods": "突击步枪MOD",
  "Pistol Mods": "手枪MOD",
  "Melee Mods": "近战MOD",
  "Ammo Mutation Mods": "弹药转换MOD",
  "Shotgun Mods": "霰弹枪MOD",
  "Clip Size Mods": "弹匣容量MOD",
  "Speculation": "推测",
  "Updateme": "待更页面",
  "Kavat Cosmetics": "库娃外观",
  "Common Mods": "常见MOD",
  "Uncommon Mods": "罕见MOD",
  "Penjaga Mods": "Penjaga极性MOD",
  "Rare Mods": "稀有MOD",
  "Kavat Mods": "库娃MOD",
  "Dual Stat Mods": "双属性MOD",
  "Nightmare Mode Mods": "噩梦MOD",
  "Kubrow Mods": "库狛MOD",
  "Plants": "植物",
  "Navbox": "导航模板",
  "Females": "女性",
  "Males": "女性",
  "Sortie Reward": "突击奖励",
  "Augmented Mods": "强化MOD",
  "Zenurik Mods": "Zenurik极性MOD",
  "Weapons Required as Crafting Ingredients": "可用于铸造的武器",
  "Enemy Weapon": "敌人武器",
  "Archwing Melee": "Archwing近战",
  "Emplacement Weapons": "场景武器",
  "Corrosive Damage": "腐蚀伤害",
  "Dark Sector Reference": "黑暗地带相关",
  "Updates": "更新",
  "Viral Damage": "病毒伤害",
  "Components": "零件",
  "Resistance Mods": "抗性MOD",
  "Stamina Mods": "耐力MOD",
  "Channeling Mods": "导引MOD",
  "Liset Segments": "登陆艇模块",
  "Frontier Hellion": "前线恶徒",
  "Frontier Lancer": "前线枪兵",
  "Frontier Regulator": "前线调整者",
  "Frontier Heavy Gunner": "前线重型机枪手",
  "Nemes": "自爆机",
  "Carabus": "自爆虫",
  "Electric Damage": "电击伤害",
  "damaged": "受损",
  "Calculated Redirection": "精算蓄能",
  "Electrical Damage": "电击伤害",
  "Desert Heavy Gunner": "沙漠重型机枪兵",
  "Slash Damage": "切割伤害",
  "Variations": "种类",
  "Nav Coordinate": "遗迹船导航坐标",
  "Head": "锤头",
  "Handle": "握柄",
  "Hilt": "握柄",
  "Ornament": "饰物",
  "Grip": "弓身",
  "Barrel": "枪管",
  "Disc": "圆盘",
  "String": "弓弦",
  "Upper Limb": "上弓臂",
  "Lower Limb": "下弓臂",
  "Pouch": "镖袋",
  "Stars": "星标",
  "Stock": "枪托",
  "Receiver": "枪机",
  "Blade": "刀刃",
  "Gauntlet": "拳套",
  "Helmet": "头盔",
  "Chassis": "机体",
  "System": "系统",
  "Neuroptics": "头部神经光元",
  "Neuroptics Blueprint": "头部神经光元蓝图",
  "Systems Blueprint": "系统蓝图",
  "System Blueprint": "系统蓝图",
  "Chassis Blueprint": "机体蓝图",
  "Harness": "外甲",
  "Wings": "机翼",
  "Harness Blueprint": "外甲蓝图",
  "Wings Blueprint": "机翼蓝图",
  "Collar Blueprint": "项圈蓝图",
  "Collar Band": "项圈带",
  "Collar Buckle": "项圈扣",
  "Hellion Power Carrier": "核心搬运恶徒",
  "Mutalist Osprey Carrier": "异融能量运送者",
  "Operation Sling-Stone": "行动代号：机弦",
  "Rubico": "绝路",
  "Radiation": "辐射",
  "Artifact": "神器",
  "Brief Respite": "快速休整",
  "EMP Aura": "电磁脉冲场",
  "Empowered Blades": "强化刀锋",
  "Growing Power": "成长之力",
  "Pistol Amp": "手枪增幅",
  "Shotgun Amp": "霰弹枪增幅",
  "Stand United": "团结一致",
  "Warframes Comparison": "战甲对比",
  "Orphid Specter": "兰花魅影",
  "Feyarch Specter": "精灵之王魅影",
  "Knave Specter": "无赖魅影",
  "Thermagnetic Shells": "热磁弹药",
  "Kinetic Ricochet": "动力回弹",
  "Medi-Pet Kit": "宠物治疗套件",
  "Shield Charger": "护盾充能",
  "Static Discharge": "静电释放",
  "Pain Threshold": "痛苦阈值",
  "The Index": "指数之场",
  "Cephalon Sark": "中枢Sark",
  "Raptor RX": "猛禽RX",
  "Arson": "纵火",
  "Arctic": "极寒",
  "Specter (Gear)": "魅影（配备）",
  "Attack Drone (Archwing Enemy)": "无人机（Corpus空战）",
  "Sentients": "Sentient",
  "Ascaris": "蛔虫",
  "Streamlined Form": "流线外形",
  "Nightmare": "噩梦",
  "Seeking Shuriken": "削甲手里剑",
  "Fatal Teleport": "致命传送",
  "Path of Statues": "化像之道",
  "Sonic Fracture": "破碎声波",
  "Everlasting Ward": "永恒之护",
  "Vexing Retaliation": "怨怒报复",
  "Fire Fright": "惊惧热浪",
  "Firequake": "烈焰爆震",
  "Chilling Globe": "冰封护罩",
  "Infiltrate": "渗透",
  "Cataclysmic Continuum": "灾变连连",
  "Safeguard Switch": "护卫传送",
  "Fracturing Crush": "高压粉碎",
  "Ballistic Bullseye": "弹道靶心",
  "Staggering Shield": "失衡护盾",
  "Explosive Legerdemain": "爆炸戏法",
  "Despoil": "掠夺",
  "Shield of Shadows": "幽影之护",
  "Safeguard": "火绫守护",
  "Pacifying Bolts": "抚慰之风",
  "Chaos Sphere": "混乱领域",
  "Assimilate": "同化",
  "Hallowed Eruption": "圣域爆发",
  "Piercing Roar": "刺骨战吼",
  "Regenerative Molt": "蜕化再生",
  "Contagion Cloud": "感染毒雾",
  "Pool of Life": "生命之池",
  "Abating Link": "耗弱链接",
  "Swing Line": "摆荡钩索",
  "Eternal War": "永恒战意",
  "Prolonged Paralysis": "长时瘫痪",
  "Perpetual Vortex": "永动旋涡",
  "Shocking Speed": "电击加速",
  "Divebomb Vortex": "涡卷俯冲",
  "Funnel Clouds": "漏斗状云",
  "Haven": "避难所",
  "Tile Set": "地图板块",
  "Kuva Siphon": "赤毒虹吸器",
  "Twin Rogga": "双子罗格",
  "Kesheg": "怯薛",
  "Kuva Braid": "赤毒织巾",
  "Kuva Cloak": "赤毒斗篷",
  "Kuva Kavat Armor": "赤毒库娃护甲",
  "Kuva Kubrow Armor": "赤毒库狛护甲",
  "Continuity Collection": "延续组合包",
  "Kuva Fortress": "赤毒要塞",
  "The War Within": "内战",
  "Assault": "强袭",
  "Disrupter Drone": "破坏型无人机",
  "Vay Hek Terra Frame": "Vay Hek地球外装战甲",
  "Executioner Gorth": "行刑者Gorth",
  "Executioner Vay Molta": "行刑者Vay Molta",
  "status chance": "触发几率",
  "Riven Mods": "裂罅MOD",
  "Orvius": "灵枢",
  "Broken Scepter": "破损珽杖",
  "Zarr": "沙皇",
  "Cernos Prime": "西诺斯Prime",
  "Venka Prime": "凯旋之爪Prime",
  "Zenistar": "天顶之星",
  "Kuva Guardian": "赤毒守卫者",
  "Kuva Jester": "赤毒小丑",
  "Grineer Queens": "Grineer双子女皇",
  "Grineer Asteroid Fortress": "Grineer小行星要塞",
  "Kuva Ballista": "赤毒弩炮",
  "Kuva Bombard": "赤毒轰击者",
  "Kuva Butcher": "赤毒屠夫",
  "Kuva Dargyn": "赤毒轻型艇",
  "Kuva Elite Lancer": "赤毒精英枪兵",
  "Kuva Drahk Master": "赤毒爪喀驯兽师",
  "Kuva Eviscerator": "赤毒开膛者",
  "Kuva Flameblade": "赤毒烈焰刀客",
  "Kuva Heavy Gunner": "赤毒重型机枪手",
  "Kuva Hellion": "赤毒恶徒",
  "Kuva Hyekka Master": "赤毒鬣猫驯兽师",
  "Kuva Powerclaw": "赤毒猛力爪兵",
  "Kuva Roller": "赤毒滚子",
  "Kuva Lancer": "赤毒枪兵",
  "Kuva Napalm": "赤毒火焰轰击者",
  "Kuva Scorch": "赤毒怒焚者",
  "Kuva Scorpion": "赤毒天蝎",
  "Kuva Seeker": "赤毒追踪者",
  "Kuva Shield Lancer": "赤毒盾枪兵",
  "Kuva Trooper": "赤毒骑兵",
  "Raptors": "猛禽",
  "Frontier Trooper": "前线骑兵",
  "Triton Hydroid Helmet": "Hydroid海之信使头盔",
  "Dispatch Overdrive": "超速击杀",
  "Healing Return": "治愈归复",
  "Condition Overload": "异况超量",
  "Relentless Combination": "残酷组合",
  "Guardian Derision": "奚落守护",
  "Enduring Affliction": "长时苦难",
  "Icy Avalanche": "冰冷雪崩",
  "Corroding Barrage": "腐蚀弹幕",
  "Savior Decoy": "救星诱饵",
  "Reinforcing Stomp": "践踏加固",
  "Slo Comba": "滞缓驱逐员",
  "Nul Comba": "虚无驱逐员",
  "Sap Comba": "衰竭驱逐员",
  "Fog Comba": "迷雾驱逐员",
  "Slo Scrambus": "滞缓扰敌员",
  "Nul Scrambus": "虚无扰敌员",
  "Fog Scrambus": "迷雾扰敌员",
  "Sap Scrambus": "衰竭扰敌员",
  "Ryu Nikana Skin": "侍刃「龙」外观",
  "Turret": "炮塔",
  "Shrapnel Mine": "霰弹地雷",
  "Kuva Flood": "赤毒洪潮",
  "Golden Maw": "黄金喉兽",
  "Rashasi Polearm Skin": "长柄武器罗刹外观",
  "Lech Kril": "Lech Kril中尉",
  "Orokin Derelicts": "被遗弃的Orokin船只",
  "Orokin Tower": "Orokin堡垒",
  "Relic": "遗物",
  "Enhanced Vitality": "构造强化",
  "Accelerated Deflection": "加速充能",
  "Mutalist Nav Coordinate": "异融导航坐标",
  "Freight Line": "货运线路",
  "Navigation Array": "导航阵列",
  "Canyon Settlement": "峡谷殖民地",
  "Operation: Tubemen of Regor": "行动代号：Regor的实验体",
  "Docking Bay": "停靠间",
  "Titania Solstice Skin": "Titania冬至外观",
  "Grineer Worker": "Grineer工人",
  "Moltecoil": "热熔炸弹",
  "Oracle Room": "启示研究室",
  "Organization Rooms": "组建型房间",
  "Interactive Rooms": "互动型房间",
  "Decorations": "道场装饰",
  "Connector": "接连件",
  "Dueling Room": "决斗房",
  "Incense Container": "焚香容器",
  "Cairn": "石堆纪念碑",
  "Koi Pond": "锦鲤池",
  "Planter": "盆栽",
  "Storage Crate": "储存箱",
  "Wooden Bench": "木质长椅",
  "Yin Yang Garden": "阴阳庭院",
  "Floor Plate": "地面拼花",
  "Polychrome": "彩绘房间",
  "Tenno Research Lab": "Tenno实验室",
  "Simulacrum Access Key": "幻影装置存取密钥",
  "Drifting Contact": "漂移接触",
  "Ash Koga Skin": "Ash甲贺外观",
  "Atlas Tartarus Helmet": "Atlas炼狱头盔",
  "Atlas Shikoro Helmet": "Atlas兜围头盔",
  "Banshee Soprana Skin": "Banshee女高音外观",
  "Cosmetics": "外观",
  "Augments": "强化",
  "Amaru Chroma Helmet": "Chroma羽蛇神头盔",
  " Arcane Distiller": "赋能萃取器",
  "Kuva Cord Sugatra": "赤毒绳结",
  "Kuva Chest Plate": "赤毒胸甲",
  "Glyph Prism": "浮印光谱",
  "Glyph": "浮印",
  "Weapon Cosmetics": "武器外观",
  "Daman Sugatra": "达曼坠饰",
  "Mutalist Carrier Osprey": "异融运输者鱼鹰",
  "Arcane Distiller": "赋能萃聚器",
  "Riven Disposition": "裂罅倾向性",
  "Javlok": "燃焰标枪",
  "The Glast Gambit": "Glast的千钧一策",
  "Virulence": "致病力",
  "Larva": "幼体",
  "Parasitic Link": "寄生链接",
  "Ravenous": "贪婪",
  "Hema": "血肢",
  "Hirudo": "蚂蝗",
  "Thorac Syandana": "胸廓披饰",
  "Infested Salvage": "Infested资源回收",
  "Tether Grenades": "系绳榴弹",
  "Flux Overdrive": "通量射线步枪超载",
  "Antiserum Injector Fragment": "抗血清注射器的碎片",
  "Two-Handed Abilities": "双手技能",
  "Nidus Prion Helmet": "Nidus朊毒头盔",
  "Phoenix Ember Helmet": "Ember凤凰头盔",
  "Bullet Dance": "刀锋弹舞",
  "Helminth Hunt": "Helminth狩猎",
  "Kuva": "赤毒",
  "Ammo Case": "弹药储转箱",
  "Frost Harka Skin": "Frost寒地牛怪外观",
  "Ohma": "欧玛",
  "Sovereign Outcast": "至尊浪人",
  "Solar Flare": "烈阳之焰",
  "Adrenaline Boost": "肾上腺激素",
  "Final Act": "搏命反扑",
  "Hastened Steps": "紧凑步伐",
  "Heightened Reflexes": "加剧反射",
  "No Current Leap": "无电流飞跃",
  "Rime Vault": "盖霜跳马",
  "Searing Leap": "灼热跳跃",
  "Tactical Retreat": "战术性撤退",
  "Vital Systems Bypass": "再生分流",
  "Venomous Rise": "剧毒升腾",
  "Voltaic Lance": "电流长矛",
  "Ambush Optics": "伏击光子",
  "Brain Storm": "头脑风暴",
  "Directed Convergence": "定向汇聚",
  "Double Tap": "双重连击",
  "Draining Gloom": "幽暗枯竭",
  "Final Tap": "最终一击",
  "Gorgon Frenzy": "蛇发女妖的狂热",
  "Grinloked": "精准火枪",
  "Precision Munition": "精准弹药",
  "Shrapnel Rounds": "破片弹头",
  "Skull Shots": "头颅射击",
  "Spring-Loaded Broadhead": "簧压猎箭",
  "Static Alacrity": "活泼静电",
  "Sudden Justice": "骤然正义",
  "Thundermiter": "雷电米特尔",
  "Triple Tap": "三重连击",
  "Emergent Aftermath": "紧急后果",
  "Kill Switch": "屠戮换弹",
  "Measured Burst": "精准爆发",
  "Focused Acceleration": "聚焦加速",
  "Feathered Arrows": "轻羽箭",
  "Plan B": "应急备案",
  "Soaring Strike": "上升打击",
  "Heavy Warhead": "重型弹头",
  "Secondary Wind": "回气再起",
  "Mortal Conduct": "垂死挣扎",
  "Argent Scourge": "银白天灾",
  "Biting Piranha": "食人鱼噬咬",
  "Celestial Nightfall": "天界黄昏",
  "Crashing Havoc": "崩毁浩劫",
  "Crashing Timber": "原木冲击",
  "Cunning Aspect": "狡诈面貌",
  "Dividing Blades": "分裂之刃",
  "Fateful Truth": "宿命真理",
  "Lashing Coil": "盘旋鞭笞",
  "Last Herald": "终末使者",
  "Mafic Rain": "重铁雨落",
  "Noble Cadence": "高贵踏频",
  "Piercing Fury": "狂怒穿刺",
  "Quaking Hand": "震动之拳",
  "Rending Wind": "撕裂之风",
  "Rising Steel": "崛起之刃",
  "Scarlet Hurricane": "深红飓风",
  "Shadow Harvest": "暗影收割",
  "Star Divide": "星辰分裂",
  "Tainted Hydra": "污染水螅",
  "Vicious Approach": "凶途恶径",
  "Deft Tempo": "灵快节拍",
  "Astral Autopsy": "星界剖解",
  "Challenges": "成就",
  "Discharge": "电能释放",
  "Quaro Collection": "求知组合包",
  "Quick Steel": "急速锋刃",
  "blind": "目盲",
  "Looter": "搜刮者",
  "Metal Fiber": "金属纤维",
  "Primed Regen": "重生Prime",
  "Simaris": "中枢Simaris",
  "Freeze Damage": "冰冻伤害",
  "Orokin Spectator": "Orokin观察使",
  "Hastened Deflection": "急速偏斜",
  "Roller Sentry": "滚子哨兵",
  "Link Shield": "护盾连结",
  "Taxon": "塔克桑",
  "Artax": "阿塔克斯",
  "Retarget": "重定向",
  "Molecular Conversion": "分子转化",
  "KINTSUGI WEAPON SKIN COLLECTION": "金缮武器外观组合包",
  "NOCTURNE WEAPON SKIN COLLECTION": "夜景武器外观组合包",
  "Oro": "奥金之魂",
  "Vauban Suppressor Skin": "Vauban镇压者外观",
  "Nyx Saikou Skin": "Nyx精神病外观",
  "Afterburner": "加力燃烧",
  "Cold Snap": "寒流来袭",
  "Energy Field": "能量力场",
  "Comet Blast": "彗星爆发",
  "Quasar Drill": "类星钻体",
  "Shell Rush": "填弹加速",
  "Zodiac Shred": "黄道碎裂",
  "Astral Slash": "星体切砍",
  "Nebula Bore": "星云钻孔",
  "Meteor Crash": "流星撞击",
  "Telemetry Key": "遥测钥匙",
  "Valkyr Gersemi Skin": "Valkyr璀璨外观",
  "The Pacifism Defect": "和平者之叛",
  "Euphona Prime": "悦音Prime",
  "Helios Prime": "赫利俄斯Prime",
  "Deconstructor Prime": "分离Prime",
  "Bodo Syandana": "博多披饰",
  "Ignis Wraith": "伊格尼斯亡魂",
  "Harkonor Weapon Skin Collection": "哈库那武器外观组合包",
  "Kavor Defector": "Kavor叛逃者",
  "Void Dash": "虚空冲刺",
  "Evacuation": "撤离",
  "Officium Syandana": "圣祷披饰",
  "Ferrox": "铁晶磁轨炮",
  "Corrupted Warden": "堕落典狱长",
  "Flight Speed": "抛射物飞行速度",
  "Silent Battery": "寂静炮组",
  "Datalyst": "资料师",
  "Guided Ordnance": "制导弹药",
  "Dead Aim": "正中红心",
  "Purity": "纯净",
  "Disadvantages": "缺点",
  "Depleted Reload": "耗竭装填",
  "Ice Damage": "冰冻伤害",
  "Update 20": "更新20",
  "Stims": "刺激剂",
  "Infested Frigate": "Infested护卫舰",
  "Octavia's Anthem": "Octavia的赞歌",
  "Mandachord": "曼达和弦琴",
  "Resonator": "共鸣渲染",
  "Mallet": "槌音铮鏦",
  "Captura Mode": "Captura摄像棚",
  "Amp": "增幅器",
  "Percussion": "打击乐",
  "Pandero": "手鼓",
  "Metronome": "谐韵节拍",
  "Tenora": "双簧管",
  "Caustacyst": "灼蚀变体镰",
  "Octavia Cadenza Helmet": "Octavia华彩乐章头盔",
  "Stasis": "停滞",
  "Excavator": "挖掘机",
  "Stratos Emblem": "战术警报徽章",
  "Ratel": "蜜獾",
  "Limbo Aristeas Helmet": "Limbo诗人头盔",
  "Limbo Magrite Helmet": "Limbo画家头盔",
  "Limbo Aureolus Helmet": "Limbo奥雷奥路斯头盔",
  "Synthula": "合成刺激质",
  "Frontier Seeker": "前线追踪者",
  "Project Undermine": "暗蚀计划",
  "One Thousand Cuts": "千刀万剐",
  "spread": "扩散",
  "Vanquished Prey": "战无不克",
  "Frontier Eviscerator": "前线开膛者",
  "Operation Arid Fear": "行动代号：沙漠恐惧",
  "Zenith": "天穹之顶",
  "Primed Cryo Rounds": "低温弹头Prime",
  "Avionics": "飞航系统",
  "Fuselage": "机身",
  "Engines": "引擎",
  "Cycron": "循环离子枪",
  "Avenging Truth": "复仇真相",
  "Sacrifice": "牺牲",
  "Negation Swarm": "抵消虫群",
  "Counterattack finisher": "反击处决",
  "Silva \u0026 Aegis Prime": "席瓦\u0026神盾Prime",
  "Sybaris Prime": "席芭莉丝Prime",
  "Aroka Prime Sugatra": "阿若卡Prime坠饰",
  "Sukira Prime Syandana": "素奇拉Prime披饰",
  "Aklex Prime": "雷克斯双枪Prime",
  "Supra Vandal": "苏普拉破坏者",
  "Light Staff": "光棍",
  "Counterattack Finishers": "反击处决",
  "Stealth Finishers": "偷袭处决",
  "Arcane Helmet": "秘奥头盔",
  "Arcane Warmth": "温暖赋能",
  "Voltage Sequence": "电压数列",
  "Magnetized Discharge": "磁吸释放",
  "Blitz": "闪击",
  "Parasitic": "寄生",
  "Energy Leech": "能量吸取",
  "Caustic": "腐蚀",
  "Leech": "吸血",
  "Sanguine": "血红",
  "Venomous": "恶毒",
  "Transistor Shield": "晶管屏障",
  "Operation: Ambulas Reborn": "行动代号：Ambulas重生",
  "Guided Effigy": "导路龙骸",
  "Piercing Navigator": "穿刺抛体",
  "Beguiling Lantern": "欺幻魔灯",
  "Status Effects": "异常状态",
  "Orokin Derelict Survival": "Orokin遗迹生存",
  "Orokin Derelict Sabotage": "Orokin遗迹破坏",
  "Orokin Derelict Capture": "Orokin遗迹捕获",
  "Orokin Derelict Defense": "Orokin遗迹防御",
  "Orokin Derelict Mobile Defense": "Orokin遗迹移动防御",
  "Orokin Derelict Exterminate": "Orokin遗迹歼灭",
  "Orokin Derelict Assassinate": "Orokin遗迹刺杀",
  "Defection": "叛逃",
  "Chains of Harrow": "Harrow的枷锁",
  "Condor Dropship": "秃鹫空投艇",
  "Shadow Step": "暗影步伐",
  "Shattering Impact": "碎裂冲击",
  "Remote Observer": "遥控视角镜头",
  "damage": "伤害",
  "Reservoir": "储梦池",
  "rank": "等级",
  "Cost": "消耗",
  "Rest and Rage": "暂息-怒气",
  "Impair": "损害",
  "Credits Cache": "现金匣",
  "Hit-scan": "瞬间命中",
  "Power Core": "能量核心",
  "Grustrag Bolt": "Grustrag枷锁",
  "Grustrag Bolt Release": "Grustrag枷锁解除器",
  "Thurible": "聚能焚炉",
  "Penance": "苦行加护",
  "Covenant": "庇佑圣约",
  "Condemn": "责难束缚",
  "Endura": "三叶坚韧",
  "Prisma Obex": "棱晶奥比克斯",
  "Gazal Machete": "加扎勒反曲刀",
  "Toxin Resistance": "毒素抵抗",
  "Nightwatch Reaver": "夜巡掠夺者",
  "Rathuum Broadcaster": "Rathuum直播者",
  "Kuva Drahk": "赤毒爪喀",
  "Band": "项圈带",
  "Buckle": "项圈扣",
  "Blades": "爪刃",
  "Guard": "护手",
  "Iron Wake": "钢铁守望",
  "Tenno Specter": "Tenno魅影",
  "Guandao": "关刀",
  "Mozi Syandana": "墨子披饰",
  "Zakti": "毒芽",
  "Arcane Acceleration": "加速赋能",
  "Arcane Aegis": "神盾赋能",
  "Arcane Agility": "灵敏赋能",
  "Arcane Arachne": "蜘蛛赋能",
  "Arcane Awakening": "觉醒赋能",
  "Arcane Barrier": "壁垒赋能",
  "Arcane Consequence": "结果赋能",
  "Arcane Deflection": "偏折赋能",
  "Arcane Fury": "狂怒赋能",
  "Arcane Guardian": "保卫者赋能",
  "Arcane Grace": "优雅赋能",
  "Arcane Healing": "复原赋能",
  "Arcane Ice": "冰冷赋能",
  "Arcane Nullifier": "消磁赋能",
  "Arcane Momentum": "动量赋能",
  "Arcane Phantasm": "幻象赋能",
  "Arcane Precision": "精确赋能",
  "Arcane Rage": "愤怒赋能",
  "Arcane Resistance": "抗毒赋能",
  "Arcane Tempo": "节奏赋能",
  "Arcane Ultimatum": "通牒赋能",
  "Arcane Victory": "胜利赋能",
  "Arcane Velocity": "迅速赋能",
  "Blast Damage Weapons": "爆炸伤害武器",
  "Cold Damage Weapons": "冰冻伤害武器",
  "orange critical": "橙色暴击",
  "orange criticals": "橙色暴击",
  "Lenz": "楞次弓",
  "Jat Kusar": "喷射锁镰",
  "Dr. Intehb": "Intehb博士",
  "Held": "持续射击",
  "Operation: Rathuum": "行动代号：Rathuum",
  "Razorback Cipher": "利刃豺狼破解器",
  "Ballistica Prime": "布里斯提卡Prime",
  "Nami Skyla Prime": "海波斯库拉对剑Prime",
  "Operatives": "特工",
  "Knell": "丧钟",
  "Arch-Melee Weapons": "Archwing近战",
  "Halls of Ascension": "月球密室",
  "jordas": "jordas",
  "Affinity Range": "经验共享范围",
  "Ability Strength": "技能强度",
  "Ability Duration": "技能持续时间",
  "Ability Range": "技能范围",
  "Ability Efficiency": "技能效率",
  "Nox": "毒化者",
  "Cyclone Kraken": "飓风海怪",
  "Arca Plasmor": "弧电离子枪",
  "Arca Scisco": "弧电探知者",
  "Arca Titron": "弧电振子锤",
  "Hydroid Ketos Helmet": "Hydroid海怪头盔",
  "Hydroid Rorqual Helmet": "Hydroid鳁鲸头盔",
  "Mag Specter": "Mag魅影",
  "Nightwatch Seeker": "夜巡追踪者",
  "Stockpiled Blight": "积存毁坏",
  "Entropy Detonation": "熵数起爆",
  "Disarming Purity": "缴械纯净",
  "Neutralizing Justice": "抵消正义",
  "Prisma Angstrum": "棱晶安格斯壮",
  "Cephalon Suda/Quotes": "中枢苏达/语录",
  "Armored Roller": "重装滚子",
  "Loki  Experience": "洛基小心得",
  "Corpus Commander": "Corpus指挥官",
  "Corpus Stasis Mine": "Corpus阻滞地雷",
  "Scourge": "祸根",
  "Dark Split-Sword (Dual Swords)": "暗黑分合剑（双剑）",
  "Dark Split-Sword (Heavy Blade)": "暗黑分合剑（巨刃）",
  "Seismic Wave": "震波",
  "Gas": "毒气",
  "Grineer Manic": "狂躁Grineer",
  "Bailiff Defector": "叛逃执法员",
  "Frontier Bailiff": "前綫执法员",
  "Sequence": "数列",
  "Update 22": "更新22",
  "Fishing": "捕鱼",
  "Mining": "采矿",
  "Augur Accord": "预言协约",
  "Augur Message": "预言启示",
  "Augur Reach": "预言通灵",
  "Augur Secrets": "预言神密",
  "Gladiator Aegis": "角斗士圣盾",
  "Gladiator Finesse": "角斗士灵巧",
  "Gladiator Resolve": "角斗士决心",
  "Vigilante Pursuit": "私法追踪",
  "Vigilante Vigor": "私法活力",
  "Augur Pact": "预言契约",
  " Augur Seeker": "预言探求",
  "Vigilante Supplies": "私法补给",
  "Vigilante Armaments": "私法军备",
  "Vigilante Offense": "私法侵犯",
  "Vigilante Fervor": "私法热诚",
  "Gladiator Might": "角斗士威猛",
  "Gladiator Rush": "角斗士猛突",
  "Gladiator Vice": "角斗士钳制",
  "Kinetic Diversion": "动力转移",
  "Spring-Loaded Blade": "簧压刀刃",
  "Target Acquired": "锁定目标",
  "Nistlepod": "尼蒐荚",
  "Grokdrul": "葛克度",
  "Maprico": "马利可",
  "Cetus Wisp": "希图斯幽魂",
  "Astilla": "碎裂者",
  "Fusilai": "齐射玻刃",
  "Volnus": "创伤",
  "Argonak": "氩格纳克",
  "Krohkur": "克鲁古尔",
  "Twin Krohkur": "双子克鲁古尔",
  "Swooping Falcon": "猎鹰俯击",
  "Carving Mantis": "雕斩螳螂",
  "Twirling Spire": "回转尖峰",
  "Stinging Thorn": "蛰刺狂棘",
  "Focus 2.0": "专精 2.0",
  "Operator Amp": "指挥官增幅器",
  "Bounties": "赏金",
  "Advantages": "优点",
  "The Quills": "夜羽",
  "Sharrac": "鲨客",
  "Sharrac Teeth": "鲨客牙齿",
  "Boot": "靴子",
  "Charc Eel": "查克鳗",
  "Charc Electroplax": "查克放电腺体",
  "Goopolla": "古泊拉",
  "Goopolla Spleen": "古泊拉脾脏",
  "Murkray": "阴暗鳐",
  "Murkray Liver": "阴暗鳐肝脏",
  "Murkray Bait": "阴暗鳐鱼饵",
  "Karkina": "卡其那",
  "Twilight Bait": "黄昏鱼饵",
  "Karkina Antenna": "卡其那触须",
  "Mawfish": "喉鱼",
  "Mawfish Bones": "喉鱼骨骼",
  "Khut-Khut": "库特-库特",
  "Khut-Khut Venom Sac": "库特-库特毒囊",
  "Yogwun": "约格温",
  "Yogwun Stomach": "约格温鱼胃",
  "Tralok": "塔洛",
  "Tralok Eyes": "塔洛鱼眼",
  "Mortus Lungfish": "摩图斯肺鱼",
  "Mortus Horn": "摩图斯角",
  "Fish Meat": "鱼肉",
  "Fish Oil": "鱼油",
  "Fish Scales": "鱼鳞",
  "Peppered Bait": "胡椒鱼饵",
  "Glappid": "盖拉佩德",
  "Glappid Bait": "盖拉佩德鱼饵",
  "Seram Bettle Shell": "瑟拉姆甲虫外壳",
  "Norg": "诺格",
  "Norg Brain": "诺格鱼脑",
  "Cuthol": "克苏尔",
  "Norg Bait": "诺格鱼饵",
  "Cuthol Bait": "克苏尔鱼饵",
  "Cuthol Tendrils": "克苏尔卷须",
  "Lanzo Fishing Spear": "兰佐鱼叉",
  "Tulok Fishing Spear": "图洛克鱼叉",
  "Peram Fishing Spear": "佩拉姆鱼叉",
  "Breath Of The Eidolon": "夜灵之息",
  "Kuaka Spinal Claw": "库阿卡脊爪",
  "Iradite": "伊莱体",
  "Condroc Wing": "秃鹰翅膀",
  "Eidolon Shard": "夜灵碎片",
  "Brilliant Eidolon Shard": "闪亮的夜灵碎片",
  "Auron": "金辉",
  "Coprun": "亚铜",
  "Ferros": "铁岩",
  "Pyrol": "炎晶",
  "Azurite": "蓝铜矿石",
  "Crimzian": "绯红石",
  "Devar": "兄弟之石",
  "Nyth": "灵息石",
  "Sentirum": "心智晶核",
  "Veridos": "翠萤石",
  "Esher Devar": "伊舍兄弟之石",
  "Tear Azurite": "泪滴形石青",
  "Auroxium Alloy": "金辉合金",
  "Marquise Veridos": "女侯爵翠萤石",
  "Fersteel Alloy": "钢化铁岩",
  "Star Crimzian": "星形绯红石",
  "Heart Nyth": "心形灵息石",
  "Coprite Alloy": "亚铜合金",
  "Radian Sentirum": "弧度心智晶核",
  "spear": "鱼叉",
  "Splinter Storm": "玻片风暴",
  "Amp (Ability)": "强音增幅",
  "Shattered Lash": "琉璃碎击",
  "Mass Vitrify": "广域玻璃化",
  "Spectrorage": "光谱盛怒",
  "Cryptographic ALU": "暗号算术逻辑单元",
  "Pyrotic Alloy": "炎晶合金",
  "Orokin Cipher": "Orokin破解器",
  "critical": "暴击",
  "Virtuos Null": "正直空无",
  "Virtuos Tempo": "正直节奏",
  "Virtuos Fury": "正直狂怒",
  "Virtuos Strike": "正直打击",
  "Virtuos Shadow": "正直暗影",
  "Virtuos Ghost": "正直鬼魅",
  "Exodia Brave": "神威勇武",
  "Exodia Valor": "神威勇猛",
  "Exodia Triumphr": "神威凯旋",
  "Exodia Might": "神威力量",
  "Exodia Hunt": "神威狩猎",
  "Exodia Force": "神威气力",
  "Magus Vigor": "魔导活力",
  "Magus Husk": "魔导外壳",
  "Magus Cloud": "魔导游云",
  "Magus Cadence": "魔导韵律",
  "Magus Replenish": "魔导充盈",
  "Magus Elevate": "魔导振奋",
  "Exodia Triumph": "神威凯旋",
  "Eidolon Lure": "夜灵诱饵",
  "Archwing Launcher": "Archwing发射器",
  "Archwing Launcher Segment": "Archwing发射模块",
  "Tusk Firbolg": "巨牙博格",
  "Tusk Bolkor": "巨牙博寇",
  "Tusk Seeker Drone": "巨牙追踪者无人机",
  "Ogma": "欧格玛",
  "Eidolon Teralyst": "夜灵兆力使",
  "Balla": "宝拉",
  "Cyath": "西亚什",
  "Dehtat": "德塔特",
  "Mewan": "密丸",
  "Ooltha": "乌尔萨",
  "Kronsh": "客隆什",
  "Jayap": "查亚普",
  "Kroostra": "克鲁斯查",
  "Laka": "拉卡",
  "Seekalla": "斯卡拉",
  "Kwath": "库阿斯",
  "Peye": "佩耶",
  "Calcifin Stim": "钙化刺激剂",
  "Adrenal Stim": "肾上腺刺激剂",
  "Refract Stim": "折光刺激剂",
  "Clotra Stim": "凝血刺激剂",
  "Syndicate Weapons": "集团武器",
  "Syndicate Radial Effects": "集团范围效果",
  "Incursion": "侵袭",
  "Plains of Eidolon": "夜灵平野",
  "Mortar": "迫击炮",
  "Tusk Mortar Bombard": "巨牙迫击炮轰击者",
  "Tusk Ogma": "巨牙欧格玛",
  "Mordda Turret": "迫击炮塔",
  "Tusk Dargyn": "巨牙轻型艇",
  "Tusk Shield Dargyn": "巨牙护盾轻型艇",
  "Set Mods": "组合MOD",
  "Incursions": "侵袭",
  "Tusk Reaver": "巨牙掠夺者",
  "Tusk Elite Lancer": "巨牙精英枪兵",
  "Tusk Eviscerator": "巨牙开膛者",
  "Tusk Drahk Master": "巨牙爪喀驯兽师",
  "Tusk Napalm": "巨牙火焰轰击者",
  "Tusk Heavy Gunner": "巨牙重型机枪手",
  "Tusk Bombard": "巨牙轰击者",
  "Tusk Hyekka Master": "巨牙鬣猫驯兽师",
  "Tusk Scorch": "巨牙怒焚者",
  "Tusk Hellion Carrier": "巨牙恶徒运输者",
  "Tusk Hellion": "巨牙恶徒",
  "Tusk Lancer": "巨牙枪兵",
  "Tusk Shield Lancer": "巨牙盾枪兵",
  "Tusk Trooper": "巨牙骑兵",
  "Tusk Seeker": "巨牙追踪者",
  "Tusk Roller": "巨牙滚子",
  "Tusk Flameblade": "巨牙烈焰刀客",
  "Tusk Butcher": "巨牙屠夫",
  "Tusk Powerclaw": "巨牙猛力爪兵",
  "Tusk Ballista": "巨牙弩炮",
  "Tusk Drudge": "巨牙苦工",
  "Tusk Power Carrier": "巨牙能量运送者",
  "Tusk Scorpion": "巨牙天竭",
  "Fisher Hai-Luk": "渔夫Hai-Luk",
  "Condroc": "秃鹰",
  "Spinning Needle": "旋压刺针",
  "Eidolon Zenurik Lens": "夜灵Zenurik晶体转换",
  "Eidolon Vazarin Lens": "夜灵Vazarin晶体转换",
  "Eidolon Naramon Lens": "夜灵Naramon晶体转换",
  "Eidolon Madurai Lens": "夜灵Madurai晶体转换",
  "Eidolon Unairu Lens": "夜灵Unairu晶体转换",
  "Bounty": "赏金",
  "Zenurik Lens": "Zenurik晶体",
  "Madurai Lens": "Madurai晶体",
  "Unairu Lens": "Unairu晶体",
  "Vazarin Lens": "Vazarin晶体",
  "Naramon Lens": "Naramon晶体",
  "Furax Wraith Right Gauntlet": "弗拉克斯亡魂右拳套",
  "Furax Wraith Left Gauntlet": "弗拉克斯亡魂左拳套",
  "Eidolon Lens": "夜灵晶体",
  "Augur Seeker": "预言探求",
  "Optional Quest": "可选任务",
  "Walkthrough": "流程",
  "Recon Commander": "侦察指挥官",
  "Cetus": "希图斯",
  "Operation: Plague Star": "行动代号：瘟疫之星",
  "Eidolon Phylaxis": "夜灵抗体",
  "Infested Catalyst": "Infested催化剂",
  "Fulmination": "猛烈爆发",
  "Primed Bane of Corrupted": "灭亡堕落者Prime",
  "Primed Fever Strike": "热病打击Prime",
  "Operational Supply": "行动补给",
  "Hemocyte Cystolith": "免疫血胞体结石",
  "Hemocyte": "免疫血胞体",
  "Old Man Suumbaat": "老者Suumbaat",
  "TearAzurite": "泪滴形石青",
  "MarquiseVeridos": "女侯爵翠萤石",
  "Surah": "苏拉（朋友）",
  "Livestreams": "直播",
  "Ruhang": "如杭",
  "Ruhang II": "如杭 II",
  "Fosfor Blau": "青色磷光",
  "Fosfor Rahd": "赤色磷光",
  "Sigma \u0026 Octantis": "西格玛\u0026南极座",
  "Minelayer": "布雷器",
  "Seram Beetle Shell": "瑟拉姆甲虫外壳",
  "Thousand-Year Fish": "千年灵鱼",
  "Apothic": "药剂",
  "Orokin Power Core": "Orokin能量核心",
  "Saya's Vigil": "Saya的守夜",
  "Baza": "苍鹰",
  "Cassowar": "鹤鸵长戟",
  "Hunter Adrenaline": "猎人肾上腺素",
  "Hunter Command": "猎人命令",
  "Hunter Munitions": "猎人战备",
  "Hunter Synergy": "猎人协力",
  "Hunter Track": "猎人追踪",
  "Hunter Recovery": "猎人复元",
  "Exodia Contagion": "神威触染",
  "Exodia Epidemic": "神威流行病",
  "Plague Akwin": "瘟疫艾克文",
  "Plague Keewar": "瘟疫奇沃",
  "Plague Bokwin": "瘟疫柏克文",
  "Plague Kripath": "瘟疫克里帕丝",
  "Energy Orbs": "能量球",
  "Old Man Sumbaat": "老者Sumbaat",
  "Akbolto Prime": "螺钉双枪Prime",
  "Kogake Prime": "科加基Prime",
  "Twin Vipers Wraith": "双子蝰蛇亡魂",
  "Quills": "夜羽",
  "Corinth": "科林斯",
  "Gunsen": "军扇",
  "Eidolon Vomvalyst": "夜灵轰击使",
  "Sentient Cores": "Sentient核心",
  "Somachord": "身心和弦琴",
  "Somachord Tones": "身心和弦琴音调",
  "Plains Commander": "平野指挥官",
  "Aerial Commander": "空中指挥官",
  "Tusk Command Dargyn": "巨牙指挥轻型艇",
  "Ghoul Purge": "尸鬼净化",
  "Warframe Soundtrack": "Warframe原声带",
  "Ghoul": "尸鬼",
  "Maggor Assault Pack": "玛戈侵袭组合包",
  "Ghoul Auger": "钻孔尸鬼",
  "Ghoul Expired": "除役尸鬼",
  "Ghoul Rictus": "裂嘴尸鬼",
  "Ghoul Devourer": "吞噬尸鬼",
  "Operation: Cryotic Front": "行动代号：永冻晶矿前线",
  "The Ascension": "升华",
  "Operation: Breeding Grounds": "行动代号：清巢",
  "Cephalon Cordylon": "中枢Cordylon",
  "Lanzo": "兰佐",
  "Tulok": "图洛克",
  "Peram": "佩拉姆",
  "Warframe": "战甲",
  "Nauseous Void Shade": "呕吐虚空之影",
  "Stubba": "史度巴",
  "Quartakk": "夸塔克",
  "Viper Wraith": "蝰蛇亡魂",
  "Janus Key": "雅努斯之钥",
  "Nervos Mine": "神经地雷",
  "Teleport (Vor)": "传送（Vor）",
  "Sphere Shield": "球形护罩",
  "WARFRAME: Ghouls": "WARFRAME：尸鬼",
  "Damage 2.0/Hit Points": "生命",
  "Dr. Tengus": "Tengus博士",
  "Intact Sentient Core": "完整的Sentient核心",
  "Vay Hek Frequency Triangulator": "Vay Hek座标频率三角仪",
  "Warfan": "武扇",
  "Slicing Feathers": "割裂羽翼",
  "Combos": "连招",
  "Law of Retribution": "复仇法则",
  "Nightwatch Manic": "夜巡狂躁者",
  "Jai": "翟",
  "Ekwana II Ruhang": "伊克瓦纳 II 如杭",
  "Jai II": "翟 II",
  "Vargeet II Jai": "瓦吉特 II 翟",
  "Vargeet II Ruhang": "瓦吉特 II 如杭",
  "Ekwana Jai II": "伊克瓦纳 翟 II",
  "Ekwana Ruhang II": "伊克瓦纳 如杭 II",
  "Ekwana Ruhang": "伊克瓦纳 如杭",
  "Ekwana Jai": "伊克瓦纳 翟",
  "Vargeet Jai": "瓦吉特 翟",
  "Vargeet Jai II": "瓦吉特 翟 II",
  "Vargeet Ruhang II": "瓦吉特 如杭 II",
  "Vargeet Ruhang": "瓦吉特 如杭",
  "Ekwana II Jai": "伊克瓦纳 II 翟",
  "Magus Nourish": "魔导滋养",
  "Damage 2.0/Void Damage": "虚空伤害",
  "Encrypted Journal Fragment": "加密的日记碎片",
  "march": "三月",
  "Razorwing Blitz": "刀翼闪击",
  "Larva Burst": "幼体爆发",
  "Lasting Covenant": "持久誓约",
  "Eidolon Gantulyst": "夜灵巨力使",
  "Eidolon Hydrolyst": "夜灵水力使",
  "Ghoul Auger Alpha": "钻孔尸鬼首领",
  "Corpus Scout": "Corpus 侦察兵",
  "Razorback": "利刃豺狼",
  "Razorback Armada": "利刃豺狼舰队",
  "Exceptional Sentient Core": "卓越的Sentient核心",
  "Flawless Sentient Core": "无瑕的Sentient核心",
  "Articula": "可动模型",
  "Radiant Eidolon Shard": "光辉的夜灵碎片",
  "Rogue Condroc": "游荡秃鹰",
  "Target Fixation": "目标入定",
  "Raplak Prism": "拉普拉克棱镜",
  "Shwaak Prism": "施瓦克棱镜",
  "Granmu Prism": "格兰姆棱镜",
  "Pencha Scaffold": "潘查支架",
  "Scaffold": "支架",
  "Shraksun Scaffold": "施拉克孙支架",
  "Klebrik Scaffold": "克莱布里克支架",
  "Juttni Brace": "加特尼曲柄",
  "Clapkra Brace": "克拉普拉克曲柄",
  "Brace": "曲柄",
  "Lohrin Brace": "洛林曲柄",
  "Tiberon Prime": "狂鲨Prime",
  "Kronen Prime": "皇家拐刃Prime",
  "Senta Turret": "森塔炮台",
  "Orokin Sentry": "Orokin哨卫",
  "Akkalak Turret": "阿卡拉克炮台",
  "Vruush Turret": "维鲁士火箭炮台",
  "Foil Card": "闪光卡牌",
  "Variants": "变体",
  "Mutalist Toxic Carrier": "异融剧毒运送者",
  "Attack Mutalist": "攻击型异融体",
  "Mutalist Lightning Carrier": "异融电击运送者",
  "Cross Connector": "十字形接连件",
  "T Shaped Connector": "丁字形接连件",
  "Elbow Connector": "弯形接连件",
  "Straight Hallway": "笔直长廊",
  "Extended Straight Hallway": "加长型笔直长廊",
  "Elevator": "升降机",
  "Operator Arcane": "指挥官 赋能",
  "Tar Mutalist Moa": "异融焦油恐鸟",
  "Energy Transfer": "能量转移",
  "Concentrated Arrow": "集中箭矢",
  "Reaping Chakram": "割魂火圈",
  "Nightwatch Bailiff": "夜巡执法员",
  "Assassins": "刺客",
  "Flash Bang": "炸裂闪光",
  "Riven Transmuter": "裂罅转换器",
  "Hydrolyst": "水力使",
  "Blast Grenade": "炎爆榴弹",
  "Inferno": "炼狱火海",
  "Gradivus: Loyalty Emblem": "荧惑：忠诚徽章",
  "Damage 2.0/True Damage": "真实伤害",
  "True Damage": "真实伤害",
  "Plasma Grenade Cluster": "集束离子榴弹",
  "Stomp Shockwave": "践踏冲击波",
  "Plasma Grenade": "离子榴弹",
  "Infested Corpus Ship": "被感染的Corpus飞船",
  "Sanctuary Onslaught": "圣殿突袭",
  "Any": "任意",
  "Void Onslaught": "圣殿突袭",
  "Veldt": "草原猎手",
  "Hystrix": "豪猪",
  "Dual Keres": "凯瑞斯双刀",
  "Venari": "薇娜丽",
  "Whipclaw": "长鞭利爪",
  "Ensnare": "束缚陷阱",
  "Strangledome": "绞杀穹顶",
  "Korb": "科布",
  "Shtung": "石当",
  "Sepfahn": "瑟普梵",
  "Rabvee": "拉比威",
  "Dokrahm": "多克拉姆",
  "Peculiar Bloom": "花开怪奇",
  "Tenno Lab": "Tenno实验室",
  "Peculiar Mods": "奇异MOD",
  "Kuaka": "库阿卡",
  "Prisma Machete": "棱晶马谢特砍刀",
  "Corpus Ship Freight Scene": "Corpus船货场景",
  "Grineer Sealab Centrifuge Scene": "Grineer海底实验室离心机场景",
  "Lua Balcony Scene": "月球楼厅场景",
  "Elite Santucary Onslaught": "精英级圣殿突袭",
  "Synthetic Eidolon Shard": "合成的夜灵碎片",
  "Grineer Settlement Artillery Scene": "Grineer驻扎地火炮场景",
  "Kuva Fortress Crevice Scene": "赤毒要塞裂缝场景",
  "Critical Chance": "暴击几率",
  "Cadus": "光棍",
  "Stinger Prime": "毒刺Prime",
  "Dual Krohkur": "双子克鲁古尔",
  "Burst Laser Prime": "激光点发Prime",
  "Prisma Orthos": "棱晶欧特鲁斯",
  "Deth Machine Rifle Prime": "死亡机枪Prime",
  "Void Mode": "虚空模式",
  "Exclusive Mastery": "限时物品段位经验",
  "Ghoul Rictus Alpha": "裂嘴尸鬼头领",
  "Jack O'Naut": "杰克南瓜",
  "Pherliac Pods": "费洛髂荚囊",
  "Pulsating Tubercles": "脉动节瘤",
  "Infected Palpators": "感染触肢",
  "Chitinous Husk": "几丁质外壳",
  "Severed Bile Sac": "胆囊块",
  "Lt Lech Kril": "Lech Kril中尉",
  "Nightwatch Corps": "夜巡者部队",
  "Operation: Arid Fear": "行动代号：沙漠恐惧",
  "Executioner": "行刑者",
  "Dhurnam": "行刑者Dhurnam",
  "Back To School Special Alert Week": "返校周特别警报",
  "The Corpus Bust Alerts": "Corpus搜捕行动警报",
  "Gift from the Lotus": "Lotus的赏赐",
  "Halloween 2014 Alert": "2014年万圣节警报",
  "Infested Nightmares Bonus Weekend": "Infested噩梦奖励周末",
  "Infested Summer": "Infested夏季活动",
  "The Proxy Rebellion Bonus Weekend": "机器叛乱奖励周末",
  "The Proxy Retribution Bonus Weekend": "机器复仇奖励周末",
  "Pistol Riven Mod": "手枪裂罅MOD",
  "Shotgun Riven Mod": "霰弹枪裂罅MOD",
  "Legendary Core": "传说核心",
  "Melee Riven Mod": "近战裂罅MOD",
  "Ayatan Anasa Sculpture": "阿耶檀识Anasa塑像",
  "Rifle Riven Mod": "步枪裂罅MOD",
  "Airburst": "空爆",
  "Cryopod": "冷冻舱",
  "Nutrio Incubator Upgrade Segment": "照育孵化器升级模块",
  "Chroma Amaru Helmet": "Chroma羽蛇神头盔",
  "Chroma Drac Helmet": "Chroma龙蛇头盔",
  "Equinox Solstice Helmet": "Equinox至点头盔",
  "Operation Oxium Espionage": "行动代号：奥席金属间谍",
  "Ash Prime Skin": "Ash Prime外观",
  "Banshee Skin": "Banshee外观",
  "Banshee Prime Skin": "Banshee Prime外观",
  "Octavia Skin": "Octavia外观",
  "Valkyr Skin": "Valkyr外观",
  "Atlas Skin": "Atlas外观",
  "Chroma Skin": "Chroma外观",
  "Chroma Dynasty Skin": "Chroma王朝外观",
  "Heavy Blade Dominion Skin": "巨刃君权外观",
  "Mesa Skin": "Mesa外观",
  "Opticor Shock-Camo Skin": "奥堤克光子枪闪电迷彩外观",
  "Ember Skin": "Ember外观",
  "Ember Prime Skin": "Ember Prime外观",
  "Excalibur Onyx Skin": "Excalibur玛瑙外观",
  "Lex Onyx Skin": "雷克斯玛瑙外观",
  "Orthos Onyx Skin": "欧特鲁斯玛瑙外观",
  "Tigris Onyx Skin": "猛虎玛瑙外观",
  "Titania Skin": "Titania外观",
  "Frost Skin": "Frost外观",
  "Longsword Frysta Skin": "长剑凝冰外观",
  "Frost Prime Skin": "Frost Prime外观",
  "Gara Skin": "Gara外观",
  "Marelok Harkonar Skin": "玛瑞火枪哈库纳外观",
  "Grinlok Harkonar Skin": "葛恩火枪哈库纳外观",
  "Javlok Harkonar Skin": "燃焰标枪哈库纳外观",
  "Kohm Harkonar Skin": "寇恩热能枪哈库纳外观",
  "Hydroid Skin": "Hydroid外观",
  "Hydroid Prime Skin": "Hydroid Prime外观",
  "Nidus Skin": "Nidus外观",
  "Carrier Jade Skin": "搬运者翡翠外观",
  "Dethcube Jade Skin": "死亡魔方翡翠外观",
  "Tonkor Jade Skin": "征服榴炮翡翠外观",
  "Aklato Kintsugi Skin": "拉托双枪金继外观",
  "Braton Kintsugi Skin": "布莱顿金继外观",
  "Kunai Kintsugi Skin": "苦无金继外观",
  "Lato Kintsugi Skin": "拉托金继外观",
  "Paris Kintsugi Skin": "帕里斯金继外观",
  "Skana Kintsugi Skin": "空刃金继外观",
  "Bo Kintsugi Skin": "玻之武杖金继外观",
  "Loki Skin": "Loki外观",
  "Loki Prime Skin": "Loki Prime外观",
  "Mag Skin": "Mag外观",
  "Limbo Skin": "Limbo外观",
  "Mag Prime Skin": "Mag Prime外观",
  "Mirage Skin": "Mirage外观",
  "Mirage Prime Skin": "Mirage Prime外观",
  "Wukong Skin": "Wukong外观",
  "Nekros Skin": "Nekros外观",
  "Nekros Prime Skin": "Nekros Prime外观",
  "Nezha Skin": "Nezha外观",
  "Brakk Nightwatch Skin": "布拉克夜巡者外观",
  "Diriga Nightwatch Skin": "电气浮囊夜巡者外观",
  "Dual Cleavers Nightwatch Skin": "斩肉双刀夜巡者外观",
  "Grinlok Nightwatch Skin": "葛恩火枪夜巡者外观",
  "Jat Kittag Nightwatch Skin": "喷射战锤夜巡者外观",
  "Machete Nightwatch Skin": "马谢特砍刀夜巡者外观",
  "Marelok Nightwatch Skin": "玛瑞火枪夜巡者外观",
  "Tonkor Nightwatch Skin": "征服榴炮夜巡者外观",
  "Ash Skin": "Ash外观",
  "Nova Skin": "Nova外观",
  "Nova Prime Skin": "Nova Prime外观",
  "Nyx Skin": "Nyx外观",
  "Nyx Prime Skin": "Nyx Prime外观",
  "Oberon Prime Skin": "Oberon Prime外观",
  "Glaive Obsidian Skin": "战刃黑曜石外观",
  "Ivara Obsidian Skin": "Ivara黑曜石外观",
  "Oberon Skin": "Oberon外观",
  "Harrow Skin": "Harrow外观",
  "Spira Obsidian Skin": "旋刃飞刀黑曜石外观",
  "Ivara Skin": "Ivara外观",
  "Rhino Skin": "Rhino外观",
  "Rhino Prime Skin": "Rhino Prime外观",
  "Djinn Gazal Skin": "引灵加扎勒外观",
  "Inaros Skin": "Inaros外观",
  "Saryn Skin": "Saryn外观",
  "Saryn Prime Skin": "Saryn Prime外观",
  "Aklato Nocturne Skin": "拉托双枪夜景外观",
  "Braton Nocturne Skin": "布莱顿夜景外观",
  "Kunai Nocturne Skin": "苦无夜景外观",
  "Lato Nocturne Skin": "拉托夜景外观",
  "Paris Nocturne Skin": "帕里斯夜景外观",
  "Skana Nocturne Skin": "空刃夜景外观",
  "Bo Nocturne Skin": "玻之武杖夜景外观",
  "Zephyr Skin": "Zephyr外观",
  "Vauban Skin": "Vauban外观",
  "Vauban Prime Skin": "Vauban Prime外观",
  "Trinity Skin": "Trinity外观",
  "Trinity Prime Skin": "Trinity Prime外观",
  "Ankyros Prominence Skin": "甲龙双拳名望外观",
  "Excalibur Prominence Skin": "Excalibur名望外观",
  "Valkyr Prime Skin": "Valkyr Prime外观",
  "Volt Skin": "Volt外观",
  "Volt Prime Skin": "Volt Prime外观",
  "Hydroid Immortal Skin": "Hydroid不朽外观",
  "Zephyr Immortal Skin": "Zephyr不朽外观",
  "Equinox Skin": "Equinox外观",
  "Zephyr Prime Skin": "Zephyr Prime外观",
  "Stone Skin": "石化外肤",
  "Medusa Skin": "梅杜莎之肤",
  "Thick Skin": "硬化装甲",
  "Lacera Scorn Skin": "悲痛之刃轻蔑外观",
  "Cattaril Arrow Skin": "香蒲箭矢外观",
  "Sylus Arrow Skin": "赛勒斯箭矢外观",
  "Meer Arrow Skin": "边境箭矢外观",
  "Arcata Riv Skin": "阿卡塔Riv外观",
  "Nikana Ryu Skin": "侍刃「龙」外观",
  "Sonicor Cliona Skin": "超音波冲击枪穿贝海绵外观",
  "Ki'Teer Arrow Skin": "Ki'Teer箭矢外观",
  "Orthos Phased Skin": "相位外观欧特鲁斯",
  "Scimitar Magus Skin": "Scimitar术士外观",
  "Scimitar Prisma Skin": "Scimitar棱晶外观",
  "Scimitar Echo Skin": "Scimitar回音外观",
  "Scimitar Nami Skin": "Scimitar纳米外观",
  "Scimitar Sotz Skin": "Scimitar蝙蝠外观",
  "Akbolto Ormolu Skin": "螺钉双枪镀金外观",
  "Bolto Ormolu Skin": "螺钉手枪镀金外观",
  "Daikyu Ormolu Skin": "大久和弓镀金外观",
  "Tipedo Ormolu Skin": "提佩多镀金外观",
  "Spearmint Scythe Skin": "薄荷口味拐杖糖镰刀外观",
  "Akvasto Conclave Skin": "瓦斯托双枪武形秘仪外观",
  "Ack \u0026 Brunt Conclave Skin": "认知\u0026冲击武形秘仪外观",
  "Aklato Conclave Skin": "拉托双枪武形秘仪外观",
  "Angstrum Conclave Skin": "安格斯壮武形秘仪外观",
  "Braton Conclave Skin": "布莱顿武形秘仪外观",
  "Daikyu Conclave Skin": "大久和弓武形秘仪外观",
  "Dragon Nikana Conclave Skin": "龙之侍刃武形秘仪外观",
  "Dual Skana Conclave Skin": "空刃双刀武形秘仪外观",
  "Furax Conclave Skin": "弗拉克斯武形秘仪外观",
  "Glaive Conclave Skin": "战刃武形秘仪外观",
  "Gorgon Conclave Skin": "蛇发女妖武形秘仪外观",
  "Grinlok Conclave Skin": "葛恩火枪武形秘仪外观",
  "Jat Kittag Conclave Skin": "喷射战锤武形秘仪外观",
  "Karak Conclave Skin": "卡拉克武形秘仪外观",
  "Kraken Conclave Skin": "北海巨妖武形秘仪外观",
  "Kronen Conclave Skin": "皇家拐刃武形秘仪外观",
  "Lato Conclave Skin": "拉托武形秘仪外观",
  "Lato Vandal Conclave Skin": "拉托破坏者武形秘仪外观",
  "Latron Conclave Skin": "拉特昂武形秘仪外观",
  "Lex Conclave Skin": "雷克斯武形秘仪外观",
  "Marelok Conclave Skin": "玛瑞火枪武形秘仪外观",
  "Nikana Conclave Skin": "侍刃武形秘仪外观",
  "Opticor Conclave Skin": "奥堤克光子枪武形秘仪外观",
  "Skana Conclave Skin": "空刃武形秘仪外观",
  "Soma Conclave Skin": "月神武形秘仪外观",
  "Strun Conclave Skin": "斯特朗武形秘仪外观",
  "Sybaris Conclave Skin": "席芭莉丝武形秘仪外观",
  "Akstiletto Conclave Skin": "史提托双枪武形秘仪外观",
  "Tipedo Conclave Skin": "提佩多武形秘仪外观",
  "Tonkor Conclave Skin": "征服榴砲武形秘仪外观",
  "Vasto Conclave Skin": "瓦斯托武形秘仪外观",
  "Viper Conclave Skin": "蝰蛇武形秘仪外观",
  "Twin Vipers Conclave Skin": "双子蝰蛇武形秘仪外观",
  "Akmagnus Dakila Skin": "麦格努斯双枪尊贵英勇外观",
  "Akmagnus Hivelight Skin": "麦格努斯双枪巢状耀光外观",
  "Dual Zoren Combustion Skin": "佐伦双斧炙燃外观",
  "Dual Zoren Kuberus Skin": "佐伦双斧地狱狛犬外观",
  "Magnus Dakila Skin": "麦格努斯尊贵英勇外观",
  "Magnus Hivelight Skin": "麦格努斯巢状耀光外观",
  "Scindo Combustion Skin": "分裂斩斧炙燃外观",
  "Scindo Kuberus Skin": "分裂斩斧地狱狛犬外观",
  "Vectis Sharpshooter Skin": "守望者锐利射手外观",
  "Vectis Silferer Skin": "守望者冷银外观",
  "Glaxion Polar Skin": "冷冻光束步枪极地外观",
  "Scindo Dagger-Axe Skin": "分裂斩斧戈刃外观",
  "Braton Shock-Camo Skin": "布莱顿闪电迷彩外观",
  "Cestra Shock-Camo Skin": "锡斯特闪电迷彩外观",
  "Dera Shock-Camo Skin": "德拉闪电迷彩外观",
  "Detron Shock-Camo Skin": "德特昂闪电迷彩外观",
  "Dual Cestra Shock-Camo Skin": "锡斯特双枪闪电迷彩外观",
  "Flux Rifle Shock-Camo Skin": "通量射线步枪闪电迷彩外观",
  "Lanka Shock-Camo Skin": "兰卡闪电迷彩外观",
  "Lecta Shock-Camo Skin": "勒克塔闪电迷彩外观",
  "Obex Shock-Camo Skin": "奥比克斯闪电迷彩外观",
  "Penta Shock-Camo Skin": "潘塔闪电迷彩外观",
  "Prova Shock-Camo Skin": "普罗沃闪电迷彩外观",
  "Snipetron Shock-Camo Skin": "狙击特昂闪电迷彩外观",
  "Spectra Shock-Camo Skin": "光谱切割器闪电迷彩外观",
  "Supra Shock-Camo Skin": "苏普拉闪电迷彩外观",
  "Tetra Shock-Camo Skin": "特拉闪电迷彩外观",
  "Dual Zoren Dagger-Axe Skin": "佐伦双斧戈刃外观",
  "Excalibur Skin": "Excalibur外观",
  "Alabaster Skin": "雪花石膏外观",
  "Excalibur Prime Immortal Skin": "Excalibur Prime不朽外观",
  "Excalibur Prime Skin": "Excalibur Prime外观",
  "Excalibur Jade Skin": "Excalibur翡翠外观",
  "Afuris Forest-Camo Skin": "盗贼双枪森林迷彩外观",
  "Akvasto Forest-Camo Skin": "瓦斯托双枪森林迷彩外观",
  "Ballistica Forest-Camo Skin": "布里斯提卡森林迷彩外观",
  "Boltor Forest-Camo Skin": "螺钉步枪森林迷彩外观",
  "Braton Forest-Camo Skin": "布莱顿森林迷彩外观",
  "Dethcube Forest-Camo Skin": "死亡魔方森林迷彩外观",
  "Dual Heat Swords Forest-Camo Skin": "烈焰双剑森林迷彩外观",
  "Dual Zoren Forest-Camo Skin": "佐伦双斧森林迷彩外观",
  "Furis Forest-Camo Skin": "盗贼森林迷彩外观",
  "Heat Dagger Forest-Camo Skin": "烈焰匕首森林迷彩外观",
  "Heat Sword Forest-Camo Skin": "烈焰长剑森林迷彩外观",
  "Orthos Forest-Camo Skin": "欧特鲁斯森林迷彩外观",
  "Paris Forest-Camo Skin": "帕里斯森林迷彩外观",
  "Scindo Forest-Camo Skin": "分裂斩斧森林迷彩外观",
  "Soma Forest-Camo Skin": "月神森林迷彩外观",
  "Vasto Forest-Camo Skin": "瓦斯托森林迷彩外观",
  "Vectis Forest-Camo Skin": "守望者森林迷彩外观",
  "Frost Prime Immortal Skin": "Frost Prime不朽外观",
  "Gorgon Desert-Camo Skin": "蛇发女妖沙漠迷彩外观",
  "Grakata Desert-Camo Skin": "葛拉卡塔尔沙漠迷彩外观",
  "Gremlins Desert-Camo Skin": "双子小精灵沙漠迷彩外观",
  "Kraken Desert-Camo Skin": "北海巨妖沙漠迷彩外观",
  "Sobek Desert-Camo Skin": "鳄神沙漠迷彩外观",
  "Twin Vipers Desert-Camo Skin": "双子蝰蛇沙漠迷彩外观",
  "Viper Desert-Camo Skin": "蝰蛇沙漠迷彩外观",
  "Vulkar Desert-Camo Skin": "金工火神沙漠迷彩外观",
  "Fragor Brokk Skin": "重击巨锤布洛克外观",
  "Ack \u0026 Brunt Nightwatch Skin": "认知＆冲击夜巡者外观",
  "Nukor Nightwatch Skin": "努寇微波枪夜巡者外观",
  "Ogris Nightwatch Skin": "食人女魔夜巡者外观",
  "Xiphos Ifrit Skin": "Xiphos伊弗利特外观",
  "Xiphos Henipa Skin": "Xiphos汉尼拔外观",
  "Xiphos Prisma Skin": "Xiphos棱晶外观",
  "Aklato Day Of The Dead Skin": "拉托双枪亡灵节外观",
  "Akvasto Day Of The Dead Skin": "瓦斯托双枪亡灵节外观",
  "Amprex Day Of The Dead Skin": "安培克斯亡灵节外观",
  "Angstrum Day Of The Dead Skin": "安格斯壮亡灵节外观",
  "Veritux Day Of The Dead Skin": "真理巨剑亡灵节外观",
  "Boltor Day Of The Dead Skin": "螺钉步枪亡灵节外观",
  "Braton Day Of The Dead Skin": "布莱顿亡灵节外观",
  "Buzlok Day Of The Dead Skin": "巴兹火枪亡灵节外观",
  "Dark Dagger Day Of The Dead Skin": "暗影匕首亡灵节外观",
  "Dark Sword Day Of The Dead Skin": "暗影长剑亡灵节外观",
  "Dragon Nikana Day Of The Dead Skin": "龙之侍刃亡灵节外观",
  "Dual Zoren Day Of The Dead Skin": "佐伦双斧亡灵节外观",
  "Galatine Day Of The Dead Skin": "迦伦提恩亡灵节外观",
  "Glaive Day Of The Dead Skin": "战刃亡灵节外观",
  "Glaxion Day Of The Dead Skin": "冷冻光束步枪亡灵节外观",
  "Gorgon Day Of The Dead Skin": "蛇发女妖亡灵节外观",
  "Grinlok Day Of The Dead Skin": "葛恩火枪亡灵节外观",
  "Imperator Day Of The Dead Skin": "凯旋将军亡灵节外观",
  "Jat Kittag Day Of The Dead Skin": "喷射战锤亡灵节外观",
  "Kronen Day Of The Dead Skin": "皇家拐刃亡灵节外观",
  "Kunai Day Of The Dead Skin": "苦无亡灵节外观",
  "Lato Day Of The Dead Skin": "拉托亡灵节外观",
  "Lato Vandal Day Of The Dead Skin": "拉托破坏者亡灵节外观",
  "Liset Day Of The Dead Skin": "Liset亡灵节外观",
  "Mantis Day Of The Dead Skin": "Mantis亡灵节外观",
  "Marelok Day Of The Dead Skin": "玛瑞火枪亡灵节外观",
  "Nikana Day Of The Dead Skin": "侍刃亡灵节外观",
  "Nukor Day Of The Dead Skin": "努寇微波枪亡灵节外观",
  "Opticor Day Of The Dead Skin": "奥堤克光子枪亡灵节外观",
  "Orthos Day Of The Dead Skin": "欧特鲁斯亡灵节外观",
  "Paris Day Of The Dead Skin": "帕里斯亡灵节外观",
  "Ack \u0026 Brunt Day Of The Dead Skin": "认知＆冲击亡灵节外观",
  "Scindo Day Of The Dead Skin": "分裂斩斧亡灵节外观",
  "Skana Day Of The Dead Skin": "空刃亡灵节外观",
  "Sobek Day Of The Dead Skin": "鳄神亡灵节外观",
  "Soma Day Of The Dead Skin": "月神亡灵节外观",
  "Gremlins Day Of The Dead Skin": "小精灵亡灵节外观",
  "Vasto Day Of The Dead Skin": "瓦斯托亡灵节外观",
  "Frost Festive Skin": "Frost冬幕外观",
  "Mirage Winter Skin": "Mirage冬幕外观",
  "Soma Huntsman Skin": "月神猎手外观",
  "Paracyst Zebra Skin": "附肢寄生者斑纹外观",
  "Mantis Bajada Skin": "Mantis冲积扇外观",
  "Mantis Gloam Skin": "Mantis黄昏外观",
  "Mantis Oscuro Skin": "Mantis阴郁外观",
  "Mantis Prisma Skin": "Mantis棱晶外观",
  "Dual Heat Swords Jade Skin": "烈焰双剑翡翠外观",
  "Heat Dagger Jade Skin": "烈焰匕首翡翠外观",
  "Heat Sword Jade Skin": "烈焰长剑翡翠外观",
  "Itzal Jade Skin": "Itzal翡翠外观",
  "Ringers Skin": "响叮当外观",
  "Helios Simaris Skin": "赫利俄斯Simaris外观",
  "Liset Hima Skin": "Liset雪之外观",
  "Liset Kuza Skin": "Liset草之外观",
  "Liset Zikha Skin": "Liset羽冠外观",
  "Liset Jade Skin": "Liset翡翠外观",
  "Liset Pahta Skin": "Liset飞翔外观",
  "Liset Kotara Skin": "Liset窟窿外观",
  "Liset Obsidian Skin": "Liset黑曜石外观",
  "Odonata Obsidian Skin": "Odonata黑曜石外观",
  "Liset Prisma Skin": "Liset棱晶外观",
  "Dual Swords Nari \u0026 Vali Skin": "双剑纳莉与瓦利外观",
  "Scindo Manticore Skin": "分裂斩斧蝎尾狮外观",
  "Nova Asuri Skin": "Nova阿修罗外观",
  "Nyx Nemesis Skin": "Nyx复仇女神外观",
  "Sword And Shield Danaus Skin": "剑盾斑蝶外观",
  "Bow Dryad Skin": "弓箭树精外观",
  "Attica Obsidian Skin": "阿提卡黑曜石外观",
  "Excalibur Obsidian Azura Skin": "Excalibur黑曜石碧空外观",
  "Galatine Obsidian Skin": "迦伦提恩黑曜石外观",
  "Gorgon Obsidian Skin": "蛇发女妖黑曜石外观",
  "Silva \u0026 Aegis Obsidian Skin": "席瓦\u0026神盾黑曜石外观",
  "Twin Vipers Obsidian Skin": "双子蝰蛇黑曜石外观",
  "Viper Obsidian Skin": "蝰蛇黑曜石外观",
  "Veritux Tekelu Skin": "真理巨剑提奇鲁外观",
  "Ballistica Tekelu Skin": "布里斯提卡提奇鲁外观",
  "Galatine Tekelu Skin": "迦伦提恩提奇鲁外观",
  "Imperator Tekelu Skin": "凯旋将军提奇鲁外观",
  "Orthos Tekelu Skin": "欧特鲁斯提奇鲁外观",
  "Tigris Tekelu Skin": "猛虎提奇鲁外观",
  "Vectis Tekelu Skin": "守望者提奇鲁外观",
  "Dark Split-Sword Dulus Skin": "暗黑分合剑棕榈䳭外观",
  "Liset Prime Skin": "Liset Prime外观",
  "Paris Abra Skin": "帕里斯磨蚀外观",
  "Excalibur Proto-Armor Skin": "Excalibur原型装甲外观",
  "Braton Obsidian Skin": "布莱顿黑曜石外观",
  "Lato Obsidian Skin": "拉托黑曜石外观",
  "Skana Obsidian Skin": "空刃黑曜石外观",
  "Hammers Palatine Skin": "战锤伯爵外观",
  "Rhino Palatine Skin": "Rhino伯爵外观",
  "Fluctus Rahk Skin": "拉克外观巨浪",
  "Drakgoon Rubedo Plated Skin": "龙骑兵电镀红晶外观",
  "Galatine Rubedo Plated Skin": "迦伦提恩电镀红晶外观",
  "Rhino Rubedo Plated Skin": "Rhino电镀红晶外观",
  "Twin Vipers Rubedo Plated Skin": "双子蝰蛇电镀红晶外观",
  "Viper Rubedo Plated Skin": "蝰蛇电镀红晶外观",
  "Dual Swords Cyskis Skin": "双剑赛斯克外观",
  "Galatine Claymire Skin": "迦伦提恩感染外观",
  "Dual Skana Infested Skin": "空刃双刀感染外观",
  "Skana Infested Skin": "空刃感染外观",
  "Orthos Magesty Skin": "欧特鲁斯威严外观",
  "Jat Kittag Noxious Hammer Skin": "喷射战锤染毒外观",
  "Excalibur Vespula Skin": "Excalibur胡蜂外观",
  "Liset Hellkite Skin": "Liset残虐外观",
  "Liset Quilate Skin": "Liset金克拉外观",
  "Mag Knaita Skin": "Mag磁曲刃外观",
  "Sybaris Overload Skin": "席芭莉丝超负荷外观",
  "Volt Amp Skin": "Volt安培外观",
  "Nova Cygni Skin": "Nova天鹅座外观",
  "Mag Orbit Skin": "Mag轨道外观",
  "Zephyr Hagoromo Skin": "Zephyr羽衣外观",
  "Liset Maltzur Oculus Skin": "Liset隐匿之眼外观",
  "Excalibur Sentient Slayer Skin": "ExcaliburSentient杀手外观",
  "Zephyr Skeiron Skin": "Zephyr西北风神外观",
  "Enchant Any Staff With This Skin": "用这个外观来给任何杖类武器增加魔力。",
  "Staves Volu Skin": "长棍沃鲁外观",
  "Trinity Strega Skin": "Trinity黑魔女外观",
  "Ankyros Phased Skin": "甲龙双拳相位外观",
  "Akvasto Phased Skin": "瓦斯托双枪相位外观",
  "Tigris Phased Skin": "猛虎相位外观",
  "Vasto Phased Skin": "瓦斯托相位外观",
  "Vauban Phased Skin": "Vauban相位外观",
  "Boar Phosphor Skin": "野猪磷光外观",
  "Excalibur Prisma Skin": "Excalibur棱晶外观",
  "Quanta Aufeis Skin": "量子切割器积冰外观",
  "Redeemer Elixis Skin": "救赎者镀铜外观",
  "Ash Immortal Skin": "Ash不朽外观",
  "Banshee Immortal Skin": "Banshee不朽外观",
  "Ember Immortal Skin": "Ember不朽外观",
  "Excalibur Immortal Skin": "Excalibur不朽外观",
  "Frost Immortal Skin": "Frost不朽外观",
  "Loki Immortal Skin": "Loki不朽外观",
  "Mag Immortal Skin": "Mag不朽外观",
  "Nekros Immortal Skin": "Nekros不朽外观",
  "Nova Immortal Skin": "Nova战甲的不朽外观",
  "Nyx Immortal Skin": "Nyx不朽外观",
  "Oberon Immortal Skin": "Oberon不朽外观",
  "Rhino Immortal Skin": "Rhino不朽外观",
  "Saryn Immortal Skin": "Saryn不朽外观",
  "Trinity Immortal Skin": "Trinity不朽外观",
  "Valkyr Immortal Skin": "Valkyr不朽外观",
  "Vauban Immortal Skin": "Vauban不朽外观",
  "Volt Immortal Skin": "Volt不朽外观",
  "Glaxion Festive Skin": "冷冻光束步枪冬幕节外观",
  "Sonicor Festive Skin": "超音波冲击枪冬幕节外观",
  "Select Skin": "选择外观",
  "Default Skin": "默认外观",
  "Arrow Skin": "箭矢外观",
  "Bronco Jade Skin": "野马翡翠外观",
  "Cernos Obsidian Skin": "西诺斯翡翠外观",
  "Djinn Jade Skin": "引灵翡翠外观",
  "Dual Kamas Jade Skin": "双短柄战镰黑曜石外观",
  "Fang Jade Skin": "狼牙翡翠外观",
  "Heat Dagger Obsidian Skin": "烈焰匕首黑曜石外观",
  "Helios Obsidian Skin": "赫利俄斯黑曜石外观",
  "Jat Kittag Obsidian Skin": "喷射战锤黑曜石外观",
  "Kama Jade Skin": "短柄战镰翡翠外观",
  "Latron Jade Skin": "拉特昂翡翠外观",
  "Magistar Obsidian Skin": "执法者黑曜石外观",
  "Opticor Obsidian Skin": "奥堤克光子枪黑曜石外观",
  "Scindo Jade Skin": "分裂斩斧黑曜石外观",
  "Shade Obsidian Skin": "阴影黑曜石外观",
  "Synapse Obsidian Skin": "突触生化枪黑曜石外观",
  "Wyrm Obsidian Skin": "蛟龙黑曜石外观",
  "Daikyu Day Of The Dead Skin": "大久和弓亡灵节外观",
  "Dark Split-Sword Day Of The Dead Skin": "暗黑分合剑亡灵节外观",
  "Grakata Day Of The Dead Skin": "葛拉卡达亡灵节外观",
  "Sarpa Day Of The Dead Skin": "蛇刃亡灵节外观",
  "Silva \u0026 Aegis Day Of The Dead Skin": "席瓦\u0026神盾亡灵节外观",
  "Simulor Day Of The Dead Skin": "重力奇点拟成枪亡灵节外观",
  "Sonicor Day Of The Dead Skin": "超音波冲击枪亡灵节外观",
  "Spira Day Of The Dead Skin": "旋刃飞刀亡灵节外观",
  "Stradavar Day Of The Dead Skin": "斯特拉迪瓦亡灵节外观",
  "Tonkor Day Of The Dead Skin": "征服榴炮亡灵节外观",
  "Twin Grakatas Day Of The Dead Skin": "双子葛拉卡塔尔亡灵节外观",
  "Burston Solstice Skin": "伯斯顿冬至外观",
  "Heliocor Solstice Skin": "赫利俄光锤冬至外观",
  "Scindo Solstice Skin": "分裂斩斧冬至外观",
  "Grakata Towsun Skin": "葛拉卡达夏至外观",
  "Kesheg Towsun Skin": "怯薛夏至外观",
  "Twin Grakatas Towsun Skin": "双子葛拉卡达夏至外观",
  "Twin Rogga Towsun Skin": "双子罗格夏至外观",
  "Zarr Towsun Skin": "沙皇夏至外观",
  "Scimitar Kuva Skin": "Scimitar赤毒外观",
  "Xiphos Kuva Skin": "Xiphos赤毒外观",
  "Mantis Kuva Skin": "Mantis赤毒外观",
  "Liset Kuva Skin": "Liset赤毒外观",
  "Anpu Staff Skin": "长棍安普外观",
  "Bronco Proto Skin": "野马原型外观",
  "Pandero Ceramica Skin": "手鼓陶瓷外观",
  "Ceramica Tonfa Skin": "陶瓷拐刃外观",
  "Odonata Elixis Skin": "Odonata镀铜外观",
  "Opticor Elixis Skin": "奥堤克光子枪镀铜外观",
  "Sonicor Elixis Skin": "超音波冲击枪镀铜外观",
  "Nusku Pistol Skin": "努斯库手枪外观",
  "Ember Vermillion Skin": "Ember朱红外观",
  "Excalibur Dex Skin": "Excalibur Dex外观",
  "Furis Proto Skin": "盗贼原型外观",
  "Inaros Ramses Skin": "Inaros拉美西斯外观",
  "Longsword Kopesh Skin": "镰刀长剑外观",
  "Fragor Jade Skin": "重击巨锤翡翠外观",
  "Rhino Jade Skin": "Rhino翡翠外观",
  "Khora Skin": "Khora外观",
  "Lato Proto Skin": "拉托原型外观",
  "Lex Proto Skin": "雷克斯原型外观",
  "Mag Pneuma Skin": "Mag元气外观",
  "Maruta Tonfa Skin": "丸太拐刃外观",
  "Perla Dual Pistol Skin": "珍珠双持手枪外观",
  "Perla Pistol Skin": "珍珠手枪外观",
  "Mesa Presidio Skin": "Mesa边塞外观",
  "Thanatos Scythe Skin": "萨那托斯镰刀外观",
  "Nekros Irkalla Skin": "Nekros伊卡拉外观",
  "Akmagnus Obsidian Skin": "麦格努斯双枪黑曜石外观",
  "Hek Obsidian Skin": "海克黑曜石外观",
  "Magnus Obsidian Skin": "麦格努斯黑曜石外观",
  "Boltor Bravura Skin": "螺钉步枪炫技外观",
  "Octavia Maestra Skin": "Octavia音乐名家外观",
  "Glaive Proto Skin": "战刃原型外观",
  "Sicarus Proto Skin": "暗杀者原型外观",
  "Galatine Solstice Skin": "迦伦提恩冬至外观",
  "Ignis Solstice Skin": "伊格尼斯冬至外观",
  "Tigris Prominence Skin": "猛虎名望外观",
  "Diode Hammer Skin": "二极管战锤外观",
  "Volt Proto Skin": "Volt原型外观",
  "Volt Prominence Skin": "Volt名望外观",
  "Frost Grost Skin": "Frost G之风格外观",
  "Frost Hailstorm Skin": "Frost冰雹外观",
  "Frost Vojnik Skin": "Frost列兵外观",
  "Kronen Arit Skin": "皇家拐刃元数外观",
  "Mag Alata Skin": "Mag阿拉塔外观",
  "Nova Device Skin": "Nova计谋外观",
  "Nova Gnova Skin": "Nova G之风格外观",
  "Nova Lamia Skin": "Nova蛇身女怪外观",
  "Nova Stinger Skin": "Nova毒刺外观",
  "Nova Visage Skin": "Nova面容外观",
  "Saryn Amalgama Skin": "Saryn汞合金外观",
  "Ivara Arcuata Skin": "Ivara弓形外观",
  "Longsword Arit Skin": "长剑元数外观",
  "Atlas Graxx Skin": "Atlas G之风格外观",
  "Wukong Auman Skin": "Wukong神猴外观",
  "Tonfa Ba'Geth Skin": "G之武风拐刃外观",
  "Ash Bai Hu Skin": "Ash白虎外观",
  "Volt Capacitor Skin": "Volt电容外观",
  "Nyx Carnifex Skin": "Nyx刽子手外观",
  "Excalibur Corpra Skin": "Excalibur C之船员外观",
  "Valkyr Delusion Skin": "Valkyr妄想外观",
  "Longsword Dero Skin": "长剑迪若外观",
  "Mesa Devil Ranger Skin": "Mesa恶魔游侠外观",
  "Nezha Devine Skin": "Nezha感知外观",
  "Polearm Diva Skin": "长柄武器歌姬外观",
  "Octavia Diva Skin": "Octavia歌姬外观",
  "Nezha Dracun Skin": "Nezha龙线虫外观",
  "Harrow Graxx Skin": "Harrow G之风格外观",
  "Hydroid Graxx Skin": "Hydroid G之风格外观",
  "Mag Graxx Skin": "Mag G之风格外观",
  "Mesa Graxx Skin": "Mesa G之风格外观",
  "Nova Graxx Skin": "Nova G之风格外观",
  "Vauban Graxx Skin": "Vauban G之风格外观",
  "Inaros Horus Skin": "Inaros荷鲁斯外观",
  "Ember Ignition Skin": "Ember引燃外观",
  "Loki Incubus Skin": "Loki梦魇外观",
  "Equinox Insomnia Skin": "Equinox不寐外观",
  "Saryn Integra Skin": "Saryn型格外观",
  "Heavy Blade Kilzorath Skin": "巨刃天剑外观",
  "Trinity Knightess Skin": "Trinity女骑士外观",
  "Galatine Magesty Skin": "迦伦提恩威严外观",
  "Ember Magesty Skin": "Ember威严外观",
  "Rhino Mastodon Skin": "Rhino乳齿象外观",
  "Heavy Blade Mithra Skin": "巨刃密特拉外观",
  "Mirage Mithra Skin": "Mirage密特拉外观",
  "Atlas Monolith Skin": "Atlas独石外观",
  "Mirage Morgaine Skin": "Mirage摩甘娜外观",
  "Saryn Napellus Skin": "Saryn舟形乌头外观",
  "Saryn Nita'S Moda Skin": "Saryn妮塔的时尚外观",
  "Polearm Phorcys Skin": "长柄武器福耳库斯外观",
  "Hydroid Poseidon Skin": "Hydroid波塞冬外观",
  "Chroma Drevni Skin": "Chroma古龙外观",
  "Excalibur Apex Skin": "Excalibur顶点外观",
  "Excalibur Caduto Skin": "Excalibur陷落外观",
  "Excalibur Graxx Skin": "Excalibur G之风格外观",
  "Mirage Graxx Skin": "Mirage G之风格外观",
  "Mirage Sigyn Skin": "Mirage西格恩外观",
  "Nyx Athena Skin": "Nyx雅典娜外观",
  "Rhino Graxx Skin": "Rhino G之风格外观",
  "Rhino Vojnik Skin": "Rhino列兵外观",
  "Valkyr Graxx Skin": "Valkyr G之风格外观",
  "Volt Graxx Skin": "Volt G之风格外观",
  "Chroma Vojnik Skin": "Chroma列兵外观",
  "Ember Graxx Skin": "Ember G之风格外观",
  "Frost Emperor Skin": "Frost帝王外观",
  "Nyx Graxx Skin": "Nyx G之风格外观",
  "Saryn Graxx Skin": "Saryn G之风格外观",
  "Banshee Sonority Skin": "Banshee洪亮外观",
  "Heavy Blade Tengoken Skin": "巨刃天剑外观",
  "Ash Tsukuyomi Skin": "Ash月读外观",
  "Titania Unseelie Skin": "Titania邪恶妖精外观",
  "Limbo Vasiona Skin": "Limbo宇宙外观",
  "Saryn Velenosa Skin": "Saryn恶毒外观",
  "Limbo Vistyxio Skin": "Limbo冥界子爵外观",
  "Oberon Wendigo Skin": "Oberon温迪戈外观",
  "Nezha Yaksha Skin": "Nezha夜叉外观",
  "Ivara Youkai Skin": "Ivara妖怪外观",
  "Volt Zener Skin": "Volt齐纳外观",
  "Chroma Dynasty Helmet": "Chroma王朝头盔",
  "Excalibur Onyx Helmet": "Excalibur玛瑙头盔",
  "Nezha Jinza Helmet": "Nezha金吒头盔",
  "Ivara Obsidian Helmet": "Ivara黑曜石头盔",
  "Ivara Zirastra Helmet": "Ivara头罩头盔",
  "Inaros Canopic Helmet": "Inaros卡诺匹斯头盔",
  "Excalibur Prominence Helmet": "Excalibur名望头盔",
  "Wukong Macak Helmet": "Wukong猕猴头盔",
  "Arcane Locust Helmet": "飞蝗秘奥头盔",
  "Arcane Chorus Helmet": "合音秘奥头盔",
  "Arcane Reverb Helmet": "返响秘奥头盔",
  "Arcane Phoenix Helmet": "凤凰秘奥头盔",
  "Arcane Backdraft Helmet": "复燃秘奥头盔",
  "Arcane Avalon Helmet": "阿瓦隆秘奥头盔",
  "Arcane Pendragon Helmet": "潘德拉冈秘奥头盔",
  "Arcane Aurora Helmet": "极光秘奥头盔",
  "Arcane Squall Helmet": "飑风秘奥头盔",
  "Arcane Menticide Helmet": "灭神秘奥头盔",
  "Arcane Essence Helmet": "本质秘奥头盔",
  "Arcane Swindle Helmet": "诈欺秘奥头盔",
  "Arcane Coil Helmet": "线圈秘奥头盔",
  "Arcane Gauss Helmet": "高斯秘奥头盔",
  "Arcane Scorpion Helmet": "毒蝎秘奥头盔",
  "Arcane Flux Helmet": "通量秘奥头盔",
  "Arcane Vespa Helmet": "黄蜂秘奥头盔",
  "Arcane Thrak Helmet": "震击秘奥头盔",
  "Arcane Vanguard Helmet": "先锋秘奥头盔",
  "Arcane Chlora Helmet": "氯毒秘奥头盔",
  "Arcane Hemlock Helmet": "铁杉秘奥头盔",
  "Arcane Esprit Helmet": "机敏秘奥头盔",
  "Arcane Aura Helmet": "预言秘奥头盔",
  "Arcane Meridian Helmet": "经络秘奥头盔",
  "Arcane Gambit Helmet": "策略秘奥头盔",
  "Arcane Storm Helmet": "风暴秘奥头盔",
  "Arcane Pulse Helmet": "脉冲秘奥头盔",
  "Ash Locust Helmet": "Ash飞蝗头盔",
  "Banshee Chorus Helmet": "Banshee合音头盔",
  "Banshee Reverb Helmet": "Banshee返响头盔",
  "Banshee Helmet": "Banshee头盔",
  "Banshee Soprana Helmet": "Banshee女高音头盔",
  "Valkyr Gersemi Helmet": "Valkyr璀璨头盔",
  "Atlas Helmet": "Atlas头盔",
  "Chroma Helmet": "Chroma头盔",
  "Ember Phoenix Helmet": "Ember凤凰头盔",
  "Ember Backdraft Helmet": "Ember复燃头盔",
  "Ember Helmet": "Ember头盔",
  "Ember Prime Helmet": "Ember Prime头盔",
  "Equinox Helmet": "Equinox头盔",
  "Excalibur Avalon Helmet": "Excalibur阿瓦隆头盔",
  "Excalibur Pendragon Helmet": "Excalibur潘德拉冈头盔",
  "Excalibur Helmet": "Excalibur头盔",
  "Excalibur Mordred Helmet": "Excalibur莫德雷头盔",
  "Excalibur Prime Helmet": "Excalibur Prime头盔",
  "Excalibur Umbra Helmet": "ExcaliburUmbra头盔",
  "Excalibur Jade Helmet": "Excalibur翡翠头盔",
  "Titania Aurai Helmet": "Titania风之妖精头盔",
  "Frost Aurora Helmet": "Frost极光头盔",
  "Frost Squall Helmet": "Frost飑风头盔",
  "Frost Helmet": "Frost头盔",
  "Frost Harka Helmet": "Frost寒地牛怪头盔",
  "Frost Prime Helmet": "Frost Prime头盔",
  "Mesa Longhorn Helmet": "Mesa长角头盔",
  "Mesa Helmet": "Mesa头盔",
  "Mirage Harlequin Helmet": "Mirage丑角头盔",
  "Mirage Helmet": "Mirage头盔",
  "Hydroid Triton Helmet": "Hydroid海之信使头盔",
  "Hydroid Helmet": "Hydroid头盔",
  "Nyx Menticide Helmet": "Nyx灭神头盔",
  "Nyx Helmet": "Nyx头盔",
  "Loki Essence Helmet": "Loki本质头盔",
  "Loki Swindle Helmet": "Loki诈欺头盔",
  "Loki Helmet": "Loki头盔",
  "Loki Knave Helmet": "Loki无赖头盔",
  "Loki Enigma Helmet": "Loki谜样头盔",
  "Loki Prime Helmet": "Loki Prime头盔",
  "Mag Coil Helmet": "Mag线圈头盔",
  "Mag Gauss Helmet": "Mag高斯头盔",
  "Mag Helmet": "Mag头盔",
  "Limbo Helmet": "Limbo头盔",
  "Mag Prime Helmet": "Mag Prime头盔",
  "Mesa Ovis Helmet": "Mesa角羊头盔",
  "Mirage Trivelin Helmet": "Mirage丑仆头盔",
  "Wukong Helmet": "Wukong头盔",
  "Nekros Helmet": "Nekros头盔",
  "Nekros Shroud Helmet": "Nekros裹尸布头盔",
  "Nekros Raknis Helmet": "Nekros古墓头盔",
  "Nyx Prime Helmet": "Nyx Prime头盔",
  "Nezha Circa Helmet": "Nezha奇尔卡头盔",
  "Nezha Helmet": "Nezha头盔",
  "Ash Scorpion Helmet": "Ash毒蝎头盔",
  "Ash Helmet": "Ash头盔",
  "Ash Koga Helmet": "Ash甲贺头盔",
  "Nova Quantum Helmet": "Nova量子头盔",
  "Nova Flux Helmet": "Nova通量头盔",
  "Nova Helmet": "Nova头盔",
  "Nova Asuri Helmet": "Nova阿修罗头盔",
  "Nova Prime Helmet": "Nova Prime头盔",
  "Nova Slipstream Helmet": "Nova气流头盔",
  "Nyx Vespa Helmet": "Nyx黄蜂头盔",
  "Nyx Nemesis Helmet": "Nyx复仇女神头盔",
  "Excalibur Obsidian Azura Helmet": "Excalibur黑曜石碧空头盔",
  "Oberon Markhor Helmet": "Oberon捻角山羊头盔",
  "Oberon Oryx Helmet": "Oberon羚羊头盔",
  "Oberon Feyarch Helmet": "Oberon精灵之王头盔",
  "Oberon Helmet": "Oberon头盔",
  "Excalibur Proto-Armor Helmet": "Excalibur原型装甲头盔",
  "Excalibur Obsidian Helmet": "Excalibur黑曜石头盔",
  "Ivara Loxley Helmet": "Ivara洛克斯利头盔",
  "Ivara Helmet": "Ivara头盔",
  "Rhino Thrak Helmet": "Rhino震击头盔",
  "Rhino Vanguard Helmet": "Rhino先锋头盔",
  "Rhino Helmet": "Rhino头盔",
  "Rhino Palatine Helmet": "Rhino伯爵头盔",
  "Rhino Prime Helmet": "Rhino Prime头盔",
  "Rhino Rubedo Plated Helmet": "Rhino电镀红晶头盔",
  "Inaros Anubis Helmet": "Inaros阿努比斯头盔",
  "Inaros Helmet": "Inaros头盔",
  "Saryn Chlora Helmet": "Saryn氯毒头盔",
  "Saryn Hemlock Helmet": "Saryn铁杉头盔",
  "Saryn Helmet": "Saryn头盔",
  "Saryn Orphid Helmet": "Saryn兰花头盔",
  "Mag Anthro Helmet": "Mag人类学头盔",
  "Volt Arrester Helmet": "Volt避雷头盔",
  "Excalibur Arturius Helmet": "Excalibur亚瑟略斯头盔",
  "Mag Induction Helmet": "Mag电磁感应头盔",
  "Excalibur Isurus Helmet": "Excalibur鲭鲨头盔",
  "Excalibur Ogrant Helmet": "Excalibur欧格朗特头盔",
  "Volt Relay Helmet": "Volt继电头盔",
  "Excalibur Vespula Helmet": "Excalibur胡蜂头盔",
  "Mag Knaita Helmet": "Mag磁曲刃头盔",
  "Volt Amp Helmet": "Volt安培头盔",
  "Nova Cygni Helmet": "Nova天鹅座头盔",
  "Mesa Falcon Helmet": "Mesa战隼头盔",
  "Zephyr Hagoromo Helmet": "Zephyr羽衣头盔",
  "Chroma Kaiju Helmet": "Chroma怪兽头盔",
  "Nekros Lazarus Helmet": "Nekros拉撒路头盔",
  "Zephyr Monsoon Helmet": "Zephyr季风头盔",
  "Mag Orbit Helmet": "Mag轨道头盔",
  "Excalibur Sentient Slayer Helmet": "Excalibur Sentient杀手头盔",
  "Zephyr Skeiron Helmet": "Zephyr西北风神头盔",
  "Chroma Tarrasque Helmet": "Chroma塔拉斯各头盔",
  "Volt Thales Helmet": "Volt泰勒斯头盔",
  "Mag Toroidal Helmet": "Mag环状头盔",
  "Titania Helmet": "Titania头盔",
  "Vauban Esprit Helmet": "Vauban机敏头盔",
  "Vauban Helmet": "Vauban头盔",
  "Trinity Aura Helmet": "Trinity预言头盔",
  "Trinity Meridian Helmet": "Trinity经络头盔",
  "Trinity Helmet": "Trinity头盔",
  "Trinity Strega Helmet": "Trinity黑魔女头盔",
  "Valkyr Kara Helmet": "Valkyr狂者头盔",
  "Valkyr Bastet Helmet": "Valkyr芭丝特头盔",
  "Valkyr Helmet": "Valkyr头盔",
  "Vauban Gambit Helmet": "Vauban策略头盔",
  "Vauban Armistice Helmet": "Vauban休战头盔",
  "Vauban Phased Helmet": "Vauban相位头盔",
  "Volt Storm Helmet": "Volt风暴头盔",
  "Volt Pulse Helmet": "Volt脉冲头盔",
  "Volt Helmet": "Volt头盔",
  "Volt Prime Helmet": "Volt Prime头盔",
  "Excalibur Prisma Avalon Helmet": "Excalibur棱晶阿瓦隆头盔",
  "Excalibur Prisma Helmet": "Excalibur棱晶头盔",
  "Excalibur Prisma Pendragon Helmet": "Excalibur棱晶潘德拉冈头盔",
  "Wukong Dasheng Helmet": "Wukong大圣头盔",
  "Zephyr Cierzo Helmet": "Zephyr西熟风头盔",
  "Zephyr Helmet": "Zephyr头盔",
  "Zephyr Tengu Helmet": "Zephyr天狗头盔",
  "Ceno Helmet": "Ceno头盔",
  "Ash Prime Helmet": "Ash Prime头盔",
  "Banshee Prime Helmet": "Banshee Prime头盔",
  "Chroma Prime Helmet": "Chroma Prime头盔",
  "Hydroid Prime Helmet": "Hydroid Prime头盔",
  "Limbo Prime Helmet": "Limbo Prime头盔",
  "Mesa Prime Helmet": "Mesa Prime头盔",
  "Mirage Prime Helmet": "Mirage Prime头盔",
  "Nekros Prime Helmet": "Nekros Prime头盔",
  "Oberon Prime Helmet": "Oberon Prime头盔",
  "Saryn Prime Helmet": "Saryn Prime头盔",
  "Trinity Prime Helmet": "Trinity Prime头盔",
  "Valkyr Prime Helmet": "Valkyr Prime头盔",
  "Vauban Prime Helmet": "Vauban Prime头盔",
  "Zephyr Prime Helmet": "Zephyr Prime头盔",
  "Ember Vermillion Helmet": "Ember朱红头盔",
  "Excalibur Dex Helmet": "Excalibur Dex头盔",
  "Inaros Ramses Helmet": "Inaros拉美西斯头盔",
  "Rhino Jade Helmet": "Rhino翡翠头盔",
  "Khora Delphi Helmet": "Khora德尔斐头盔",
  "Khora Helmet": "Khora头盔",
  "Mag Pneuma Helmet": "Mag元气头盔",
  "Mesa Presidio Helmet": "Mesa边塞头盔",
  "Nekros Irkalla Helmet": "Nekros伊卡拉头盔",
  "Octavia Maestra Helmet": "Octavia音乐名家头盔",
  "Volt Proto Helmet": "Volt原型头盔",
  "Volt Prominence Helmet": "Volt名望头盔",
  "Frost Grost Helmet": "Frost G之风格头盔",
  "Frost Hailstorm Helmet": "Frost冰雹头盔",
  "Frost Summit Helmet": "Frost高峰头盔",
  "Frost Vojnik Helmet": "Frost列兵头盔",
  "Frost Zastruga Helmet": "Frost雪脊头盔",
  "Mag Alata Helmet": "Mag阿拉塔头盔",
  "Mesa Dead Eye Helmet": "Mesa死亡之眼头盔",
  "Nova Device Helmet": "Nova计谋头盔",
  "Nova Gnova Helmet": "Nova G之风格头盔",
  "Nova Lamia Helmet": "Nova蛇身女怪头盔",
  "Nova Stinger Helmet": "Nova毒刺头盔",
  "Nova Tachyon Helmet": "Nova超光子头盔",
  "Nova Visage Helmet": "Nova面容头盔",
  "Saryn Amalgama Helmet": "Saryn汞合金头盔",
  "Nyx Ampulex Helmet": "Nyx扁头泥蜂头盔",
  "Trinity Ancyra Helmet": "Trinity安卡拉头盔",
  "Ivara Arcuata Helmet": "Ivara弓形头盔",
  "Atlas Graxx Helmet": "Atlas G之风格头盔",
  "Wukong Auman Helmet": "Wukong神猴头盔",
  "Ash Bai Hu Helmet": "Ash白虎头盔",
  "Saryn Belladonna Helmet": "Saryn颠茄头盔",
  "Volt Capacitor Helmet": "Volt电容头盔",
  "Nyx Carnifex Helmet": "Nyx刽子手头盔",
  "Excalibur Corpra Helmet": "Excalibur C之船员头盔",
  "Valkyr Delusion Helmet": "Valkyr妄想头盔",
  "Mesa Devil Ranger Helmet": "Mesa恶魔游侠头盔",
  "Nezha Devine Helmet": "Nezha感知头盔",
  "Octavia Diva Helmet": "Octavia歌姬头盔",
  "Banshee Dominia Helmet": "Banshee女主头盔",
  "Nezha Dracun Helmet": "Nezha龙线虫头盔",
  "Oberon Ferosh Helmet": "Oberon猛烈头盔",
  "Harrow Graxx Helmet": "Harrow G之风格头盔",
  "Hydroid Graxx Helmet": "Hydroid G之风格头盔",
  "Mag Graxx Helmet": "Mag G之风格头盔",
  "Mesa Graxx Helmet": "Mesa G之风格头盔",
  "Nova Graxx Helmet": "Nova G之风格头盔",
  "Vauban Graxx Helmet": "Vauban G之风格头盔",
  "Harrow Hieropha Helmet": "Harrow圣职者头盔",
  "Frost Himavat Helmet": "Frost雪妖头盔",
  "Inaros Horus Helmet": "Inaros荷鲁斯头盔",
  "Ember Ignition Helmet": "Ember引燃头盔",
  "Loki Incubus Helmet": "Loki梦魇头盔",
  "Equinox Insomnia Helmet": "Equinox不寐头盔",
  "Saryn Integra Helmet": "Saryn型格头盔",
  "Valkyr Ion Helmet": "Valkyr离子头盔",
  "Inaros Kephri Helmet": "Inaros凯布利头盔",
  "Trinity Knightess Helmet": "Trinity女骑士头盔",
  "Ember Magesty Helmet": "Ember威严头盔",
  "Rhino Mastodon Helmet": "Rhino乳齿象头盔",
  "Mirage Mithra Helmet": "Mirage密特拉头盔",
  "Atlas Monolith Helmet": "Atlas独石头盔",
  "Mirage Morgaine Helmet": "Mirage摩甘娜头盔",
  "Saryn Napellus Helmet": "Saryn舟形乌头头盔",
  "Saryn Nita'S Moda Helmet": "Saryn妮塔的时尚头盔",
  "Hydroid Poseidon Helmet": "Hydroid波塞冬头盔",
  "Atlas Arhat Helmet": "Atlas罗汉头盔",
  "Loki Rogue Helmet": "Loki恶棍头盔",
  "Oberon Destrier Helmet": "Oberon战马头盔",
  "Trinity Messiah Helmet": "Trinity弥赛亚头盔",
  "Valkyr Cheetah Helmet": "Valkyr猎豹头盔",
  "Wukong Xingzhe Helmet": "Wukong行者头盔",
  "Excalibur Apex Helmet": "Excalibur顶点头盔",
  "Excalibur Caduto Helmet": "Excalibur陷落头盔",
  "Excalibur Graxx Helmet": "Excalibur G之风格头盔",
  "Frost Jotun Helmet": "Frost冰霜巨人头盔",
  "Excalibur Graxx-V2 Helmet": "Excalibur G之风格-V2头盔",
  "Loki Ersatz Helmet": "Loki合成头盔",
  "Mirage Graxx Helmet": "Mirage G之风格头盔",
  "Mirage Jolli Helmet": "Mirage欢乐头盔",
  "Mirage Sigyn Helmet": "Mirage西格恩头盔",
  "Nova Fusion Helmet": "Nova融合头盔",
  "Nyx Athena Helmet": "Nyx雅典娜头盔",
  "Rhino Graxx Helmet": "Rhino G之风格头盔",
  "Valkyr Graxx Helmet": "Valkyr G之风格头盔",
  "Vauban Chapelon Helmet": "Vauban沙佩隆头盔",
  "Volt Graxx Helmet": "Volt G之风格头盔",
  "Zephyr Migisi Helmet": "Zephyr白头鹫头盔",
  "Ash Carabid Helmet": "Ash步甲头盔",
  "Atlas Telamon Helmet": "Atlas特拉蒙头盔",
  "Banshee Echo Helmet": "Banshee回声头盔",
  "Ember Graxx Helmet": "Ember G之风格头盔",
  "Frost Emperor Helmet": "Frost帝王头盔",
  "Nyx Graxx Helmet": "Nyx G之风格头盔",
  "Saryn Graxx Helmet": "Saryn G之风格头盔",
  "Nyx Saikou Helmet": "Nyx精神病头盔",
  "Banshee Sonority Helmet": "Banshee洪亮头盔",
  "Vauban Suppressor Helmet": "Vauban镇压者头盔",
  "Oberon Taurus Helmet": "Oberon金牛宫头盔",
  "Rhino Teutonic Helmet": "Rhino条顿头盔",
  "Ash Tsukuyomi Helmet": "Ash月读头盔",
  "Titania Unseelie Helmet": "Titania邪恶妖精头盔",
  "Limbo Vasiona Helmet": "Limbo宇宙头盔",
  "Saryn Velenosa Helmet": "Saryn恶毒头盔",
  "Limbo Venari Helmet": "Limbo狩猎头盔",
  "Limbo Vistyxio Helmet": "Limbo冥界子爵头盔",
  "Rhino Warlust Helmet": "Rhino海象头盔",
  "Oberon Wendigo Helmet": "Oberon温迪戈头盔",
  "Nezha Yaksha Helmet": "Nezha夜叉头盔",
  "Ivara Youkai Helmet": "Ivara妖怪头盔",
  "Volt Zener Helmet": "Volt齐纳头盔",
  "Octavia Helmet": "Octavia头盔",
  "Gara Virago Helmet": "Gara悍妇头盔",
  "Gara Helmet": "Gara头盔",
  "Nidus Helmet": "Nidus头盔",
  "Harrow Suffragan Helmet": "Harrow副主教头盔",
  "Harrow Helmet": "Harrow头盔",
  "Peculiar Growth": "生长怪奇",
  "Reawaken": "再启动",
  "Divine Will": "神圣意志",
  "Nekros Irkalla Collection": "Nekros伊卡拉组合包",
  " Magnum Mambo": "重炮曼波",
  "Lead Tango": "铅导探戈",
  "Automatic Rhumba": "全自动曼巴",
  "Frysta Longsword Skin": "凝冰长剑外观",
  "Negate": "抵消",
  "Kavats": "库娃",
  "Kubrows": "库狛",
  "Control Console": "控制台",
  "Fortress Turret": "Grineer炮台",
  "Orokin Void Laser Console": "Orokin虚空激光控制台",
  "Health Orb": "生命球",
  "Energy Orb": "能量球",
  "Fortress Scanner": "Grineer感应条",
  "Affinity Orb": "经验球",
  "Ash Koga Skin Bundle": "Ash甲贺外观组合包",
  "Ormolu Skin Bundle": "镀金外观组合包",
  "Immortal Skin Bundle": "不朽外观组合包",
  "Loki Deluxe Skin Bundle": "Loki华丽外观组合包",
  "Tennogen Weapon Skin Bundle": "Tennogen武器外观组合包",
  "Solstice Skin Bundle": "冬至外观组合包",
  "Maggor Armor Bundle": "玛戈护甲组合包",
  "Zauba Armor Bundle": "Zauba护甲组合包",
  "Ceno Armor Bundle": "Ceno护甲组合包",
  "Vahd Armor Bundle": "Vahd护甲组合包",
  "Tennocon 2018 Armor Bundle": "Tennocon 2018护具组合包",
  "Ceramica Armor Bundle": "陶瓷装甲组合包",
  "Syrinx Armor Bundle": "鸣管护甲组合包",
  "Gazal Armor Bundle": "加扎勒护甲组合包",
  "Porta Armor Bundle": "传送门护甲组合包",
  "Daedalus Armor Bundle": "代达罗斯装甲包",
  "Eos Armor Bundle": "曙光女神盔甲包",
  "Edo Armor Bundle": "江户护甲包",
  "Embolist Armor Bundle": "安柏勒斯护甲组合包",
  "Iliac Armor Bundle": "髂骨护甲组合包",
  "Solstice Daedalus Armor Bundle": "冬至代达罗斯护甲组合包",
  "Koppra Operator Suit Bundle": "Koppra指挥官套装组合包",
  "Varida Operator Suit Bundle": "Varida指挥官套装组合包",
  "Hunhow's Gift": "Hunhow的礼物",
  "Kopesh Longsword Skin": "镰刀长剑外观",
  "Spearmint Scythe": "薄荷口味拐杖糖镰刀外观",
  "Winter Solstice Skin Bundle": "冬至外观组合包",
  "Rubedo Skins": "电镀红晶系列外观",
  "Third Party Deals and Rewards": "第三方合作和奖励",
  "Harkonar Weapon Skin Collection": "哈库纳武器外观组合包",
  "Slam Attack": "震地攻击",
  "jump attack": "跳跃攻击",
  "Carmine Penta": "绯红五芒星榴弹炮",
  "Rakta": "绯红",
  "swing": "攻击",
  "Apostasy Prologue": "变节序言",
  "slot": "槽位",
  "Executioner Harkonar": "行刑者Harkonar",
  "Executioner Dhurnam": "行刑者Dhurnam",
  "Executioner Dok Thul": "行刑者Dok Thul",
  "Executioner Garesh": "行刑者Garesh",
  "Executioner Nok": "行刑者Nok",
  "Executioner Reth": "行刑者Reth",
  "Executioner Zura": "行刑者Zura",
  "Alert Missions": "警报",
  "Lone Vengeance": "孤独复仇",
  "Impending Dread": "恐惧逼近",
  "Rising Hate": "憎恨增强",
  "Drowning Despair": "绝望淹溺",
  "Oberon Feyarch Collection": "Oberon精灵之王组合包",
  "Octavia Maestra Collection": "Octavia音乐名家收藏",
  "Verismo Syandana": "写实歌剧披饰",
  "Melia Sugatra": "栋之坠饰",
  "Inaros Ramses Collection": "Inaros拉美西斯组合包",
  "Scarab Syandana": "圣甲虫披饰",
  "Volt Proto Skin Collection": "Volt原型外观组合包",
  "Cathode Syandana": "阴极披饰",
  "AT Ogris": "自动追踪食人女魔",
  "Bundle": "组合包",
  "Deluxe Skins": "华丽外观",
  "Immortal Skin": "不朽外观",
  "Mask": "面具",
  "Forest-Camo Skin": "森林迷彩外观",
  "Gazal Skin": "加扎勒外观",
  "Nightwatch Skin": "夜巡者外观",
  "Bundles": "组合包",
  "Obsidian Skin": "黑曜石外观",
  "Jade Skin": "翡翠外观",
  "Wing": "飞翼",
  "ColtekMask": "寇塔克面具",
  "HunhowMask": "Hunhow面具",
  "IctusMask": "扬音面具",
  "KubrowMask": "库狛面具",
  "LotusMask": "Lotus面具",
  "MandibleMask": "下颚骨面具",
  "ParaMask": "鹦鹉面具",
  "Unda Prime": "脉涌Prime",
  "ChrysalisWings": "蝶蛹飞翼",
  "ColtekWings": "寇塔克飞翼",
  "DiamondWings": "钻石飞翼",
  "DomeWings": "巨蛋飞翼",
  "IctusWings": "扬音飞翼",
  "JetWings": "喷射动力飞翼",
  "ParaWings": "鹦鹉翅膀",
  "PrismaJetWings": "棱晶喷射动力飞翼",
  "Tail": "尾部",
  "CapsuleTail": "微型尾部",
  "ColtekTail": "寇塔克尾部",
  "IctusTail": "扬音尾部",
  "ParaTail": "鹦鹉尾部",
  "KoiTail": "锦鲤尾部",
  "PrismaKoiTail": "棱晶锦鲤尾部",
  "Sentinel Accessory Pack": "守护配件组合包",
  "Sentinel Accessory Pack 2": "守护配件组合包2",
  "Coltek Sentinel Pack": "寇塔克守护组合包",
  "Ictus Sentinel Pack": "扬音组合包",
  "ParaBundle": "鹦鹉组合包",
  "Cephalon Jordas": "中枢Jordas",
  "Cephalon Vull": "中枢Vull",
  "Cephalon Apnar": "中枢Apnar",
  "Cephalon Samodeus": "中枢Samodeus",
  "Primed Sure Footed": "顶天立地Prime",
  "Gazal Complete Collection": "加扎勒完整套装",
  "Nightwatch Skin Pack": "夜巡者外观包",
  "Update 13 Mega Pack": "更新13超级组合包",
  "Ki'Teer Arrows": "Ki'Teer箭矢外观",
  "Bought": "购买",
  "console": "主机",
  "console platforms": "主机平台",
  "The Sacrifice": "牺牲",
  "Towsun Skin Collection": "夏至外观组合包",
  "Centuria Towsun Syandana": "百人夏至披饰",
  "Dagger Zoren Skin": "佐伦双斧戈刃外观",
  "Crafted": "制造",
  "Ceramica Collection": "陶瓷组合包",
  "Radial Howl": "范围嚎声",
  "Archwing Cosmetics": "Archwing外观",
  "Exalted Blade (Weapon)": "显赫刀剑（武器）",
  "Exalted Weapon": "显赫武器",
  "Pyrana Prime": "食人鱼Prime",
  "Destreza Prime": "技巧之剑Prime",
  "Greater Lens": "高级晶体",
  "Skiajati": "影生",
  "Atavist Prime": "返像Prime",
  "Edo Prime": "江户Prime",
  "Spritsail Prime": "斜帆Prime",
  "Targis Prime": "超瓷材Prime",
  "Acanthus Prime": "莨苕Prime",
  "Harkonar Wraith": "哈库纳亡魂",
  "Dendra": "登德拉",
  "Foros": "福罗斯",
  "Obsidian Dendra": "黑曜石登德拉",
  "Obsidian Azura": "黑曜石碧空",
  "Exclusive": "限定",
  "Jade Daedalus": "翡翠代达罗斯",
  "Naberus": "恶魔纳贝流士",
  "PrismaNaberus": "棱晶恶魔纳贝流士",
  "Ki'Teer Fireworks": "Ki'Teer烟花",
  "Baits": "鱼饵",
  "Cutters": "切割器",
  "Nosam Cutter": "诺萨姆切割器",
  "Focused Nosam Cutter": "聚焦诺萨姆切割器",
  "Advanced Nosam Cutter": "高级诺萨姆切割器",
  "Dex Pixia": "Dex妖精",
  "Diwata": "仙女",
  "Regulators": "监察者双枪",
  "Artemis Bow (Weapon)": "月神狩弓（武器）",
  "Regulators (Weapon)": "监察者双枪",
  "Equinox Clisthert Helmet": "Equinox晨昏恶魔头盔",
  "Ba'Geth Tonfa Skin": "拐刃G之武风外观",
  "Valkyr Talons": "Valkyr之爪",
  "Iron Staff": "定海神针",
  "Liset Maltzer Oculus Skin": "Liset隐匿之眼外观",
  "Infested boils": "Infested疖瘤",
  "Corpus Void Key": "Corpus虚空钥匙",
  "Insatiable": "不竭贪婪",
  "Warding Thurible": "庇护焚炉",
  "Partitioned Mallet": "分裂槌音",
  "Empowered Quiver": "强化箭袋",
  "Mortos Binds": "死亡枷锁",
  "Chordalla Prime": "寇达菈Prime",
  "Chroma Dynasty Wings": "Chroma王朝翅膀",
  "Irkalla Binds": "伊卡拉枷锁",
  "Valkyr's Bonds": "Valkyr的枷锁",
  "Excalibur Umbra Sunder Helmet": "Excalibur Umbra断裂头盔",
  "Warframe Blueprint": "战甲蓝图",
  "Warframe Neuroptics": "战甲头部神经光元",
  "Warframe Systems": "战甲系统",
  "Warframe Chassis": "战甲机体",
  "Umbral Intensify": "暗影聚精会神",
  "Umbral Vitality": "暗影生命力",
  "Umbral Fiber": "暗影纤维",
  "Sacrificial Steel": "牺牲斩铁",
  "Sacrificial Pressure": "牺牲压迫点",
  "Towsun Skin Collection II": "夏至外观组合包II",
  "Maggor Towsun Armor": "夏至玛戈护甲",
  "Maggor Towsun Syandana": "夏至玛戈披饰",
  "Quartakk Towsun Skin": "夸塔克夏至外观",
  "Stubba Towsun Skin": "史度巴夏至外观",
  "Gorgon Towsun Skin": "蛇发女妖夏至外观",
  "Maggor Towsun Armorn Bundle": "夏至玛戈护甲包",
  "The Sacrifice Collection": "牺牲组合包",
  "Umbra Armor": "Umbra护甲",
  "Umbra Kavat Armor": "Umbra库娃护甲",
  "Umbra Kubrow Armor": "Umbra库狛护甲",
  "Nikana Dax Skin": "侍刃禁卫外观",
  "Orvius Dax Skin": "灵枢禁卫外观",
  "Dax Syandana": "禁卫披饰",
  "Dax Portrait": "禁卫肖像",
  "Slayer": "戮杀者",
  "Ymir-Form Gemini Nikana Sheath": "侍刃霜巨人双子刀鞘",
  "Surt-Form Gemini Nikana Sheath": "侍刃火巨人双子刀鞘",
  "Tactical Alert:Hyena Facility": "战术警报：鬣狗生产设施",
  "Tactical Alert:Shifting Sands": "战术警报：流沙",
  "Tactical Alert:Cold Revenge": "战术警报：冰冷复仇",
  "Tactical Alert:Pack Mentality": "战术警报：团体意识",
  "Tactical Alert:Toxic Terrors": "战术警报：毒性恐惧",
  "Tactical Alert:Fleet Footed": "战术警报：健步如飞",
  "Tactical Alert:Fight or Flight": "战术警报：战斗或逃跑",
  "Tactical Alert:Overtake": "战术警报：奇袭",
  "Tactical Alert:Phoenix Intercept": "战术警报：凤凰拦截行动",
  "Infested Corpus": "Lephantis（Corpus头）",
  "Infested Grineer ": "Lephantis（Grineer 头）",
  "Ancient Infested": "Lephantis（远古头）",
  "Infested Grineer": "Lephantis（Grineer头）",
  "Event Emblems": "活动徽章",
  "Sekhara": "饰冠",
  "Asita Rakta Syandana": "隐士绯红披饰",
  "Jordas Sekhara": "Jordas饰冠",
  "Invati Sekhara": "义恩瓦提饰冠",
  "Aseron Sekhara": "艾瑟伦饰冠",
  "Sevati Sekhara": "纯洁饰冠",
  "Disciple's Emblem": "门徒徽章",
  "Hunter's Emblem": "巡猎者徽章",
  "Master's Emblem": "大师徽章",
  "Grand Master's Emblem": "大宗师徽章",
  "Ki'Teer Sekhara": "Ki'Teer饰冠",
  "Kuria Emblem": "库利亚猫神器徽章",
  "Solstice Conclave Emblem": "冬至武形秘仪徽章",
  "Ancient": "远古",
  "Healing": "治疗",
  "Umbra Mod": "Umbra系列MOD",
  "Exalted Umbra Blade": "显赫刀剑Umbra",
  "Controls": "控制",
  "Gameplay": "玩法",
  "Chat": "聊天",
  "Interface": "界面",
  "Display": "显示",
  "Audio": "音频",
  "Legacy Color Palettes": "传统调色盘",
  "Cryogenic Leakage": "冷却液泄漏",
  "Bullet Jump": "旋身飞跃",
  "Bow Mods": "弓MOD",
  "Fire Rate Mods": "射速MOD",
  "PvP Mods": "PvP用MOD",
  "Accuracy Mods": "精准度MOD",
  "Damage Mods": "伤害MOD",
  "Nidus Phryke Skin": "Nidus恐惧神外观",
  "Helminth Charger Metus Skin": "Helminth疾冲者米图斯外观",
  "Deimos Claw Skin": "德莫斯爪外观",
  "Nidus Phryke Collection": "Nidus恐惧神组合包",
  "Metus Kubrow Armor": "米图斯库狛护甲",
  "Nosos Syandana": "恶疾披饰",
  "Acolyte Mods": "追随者MOD",
  "Mimic": "拟态者",
  "Gara Silica Helmet": "Gara石英头盔",
  "Nekros Ion Helmet": "Nekros离子头盔",
  "Deluxe Weapon Skins": "华丽武器外观",
  "Excalibur Exaltation Skin": "Excalibur晋升外观",
  "Excalibur Ronin Skin": "Excalibur浪人外观",
  "Chroma Thyrus Skin": "Chroma酒神杖外观",
  "Chroma Graxx Skin": "Chroma G之外观",
  "Loki Erebus Skin": "Loki厄瑞波斯外观",
  "Loki Kodama Skin": "Loki木灵外观",
  "Mag Ferro Skin": "Mag铁磁外观",
  "Mesa Marlet Skin": "Mesa玛蕾特外观",
  "Nova Corpra Skin": "Nova C之船员外观",
  "Nyx Aurelia Skin": "Nyx奥蕾丽亚外观",
  "Oberon Blade of the Lotus Skin": "Oberon Lotus之剑外观",
  "Rhino Blade of the Lotus Skin": "Rhino Lotus之剑外观",
  "Rhino Scarab Sect Skin": "Rhino甲虫外观",
  "Trinity Blade of the Lotus Skin": "Trinity Lotus之剑外观",
  "Volt Fulgursor Skin": "Volt 闪电外观",
  "Zephyr Strafe Skin": "Zephyr 猛烈轰炸外观",
  "Dero Sword Skin": "长剑迪若外观",
  "Diva Polarm Skin": "长柄武器歌姬外观",
  "Kilzorath Heavy Blade Skin": "巨刃天剑外观",
  "Magesty Galatine Skin": "迦伦提恩威严外观",
  "Magesty Orthos Skin": "欧特鲁斯威严外观",
  "Mithra Heavy Blade Skin": "巨刃密特拉外观",
  "Phorcys Polearm Skin": "长柄武器福耳库斯外观",
  "Skana ARIT Skin": "空刃元数外观",
  "Hammer Ogun Skin": "战锤铁神外观",
  "Jat Kittag Noxius Hammer Skin": "喷射战锤染毒外观",
  "Longsword Eisen Skin": "长剑铸铁外观",
  "Lympharis Polearm Skin": "长柄武器水闪蝶外观",
  "Polearm Aphria Skin": "长柄武器艾菲亚外观",
  "Liset Protege Skin": "Liset门徒外观",
  "Ak-Sura Syandana": "阿卡苏拉披饰",
  "Despot Cape": "暴君披饰",
  "Due Volpi Syandana": "双卷披饰",
  "Mirtha Syandana": "密特拉披饰",
  "Mushussu Syandana": "怒蛇披饰",
  "Sovereign Syandana": "主权披饰",
  "Icarius Syandana": "伊卡洛斯披饰",
  "Kunshu Syandana": "君主披饰",
  "Seraphim Syandana": "炽天使披饰",
  "Shurihoshi Syandana": "秽星手里剑披饰",
  "Sildarg Syandana": "赛卓格披饰",
  "Sydeko Syandana": "赛迪科披饰",
  "Prisma Excalibur Bundle": "棱晶Excalibur组合包",
  "Primed Quickdraw": "持续火力Prime",
  "Nocturne Weapon Skin Collection": "夜景武器外观组合包",
  "Kintsugi Weapon Skin Collection": "金继武器外观组合包",
  "Spektaka Liset Skin": "Liset华丽演出外观",
  "Spektaka Color Palette": "华丽演出调色板",
  "Prominence Sigil": "名望纹章",
  "Clan Emblem": "氏族徽章",
  "Maximized Ability Duration": "技能持续时间最大化",
  "Offering": "商品",
  "completed": "完成",
  "Vomvalyst Bloom Summon": "召唤夜灵之花",
  "Vomvalyst": "夜灵轰击使",
  "Warlords": "军阀",
  "Vauban Citadel Skin": "Vauban城塞外观",
  "Marquis Sugatra": "侯爵坠饰",
  "Mortier Heavy Blade Skin": "莫迪尔巨刃外观",
  "Phased Skins": "相位系列外观",
  "Kin": "情同手足",
  "Trusted": "受到信任",
  "Visitor": "访客",
  "Offworlder": "异世者",
  "Mistral": "西北风",
  "Tempest": "暴风",
  "Hurricane": "飓风",
  "Typhoon": "台风",
  "Domus Syandana": "家宅披饰",
  "Prisma Uru Syandana": "棱晶乌鲁披饰",
  "Anpu Sugatra": "安普坠饰",
  "Ki'Teer Sugatra": "Ki'Teer坠饰",
  "Prisma Yamako Syandana": "棱晶山越披饰",
  "Ki'Teer Diax Syandana": "Ki'Teer大亚披饰",
  "Ki'Teer Razza Syandana": "Ki'Teer类种披饰",
  "Ki'Teer Solstice Syandana": "Ki'Teer冬至披饰",
  "Ki'Teer Syandana": "Ki'Teer披饰",
  "Dragon Mod Pack": "恶龙MOD包",
  "Falcon Mod Pack": "猎鹰MOD包",
  "Pedestal Prime": "基座Prime",
  "Ki'Teer Tribute Glyph": "Ki'Teer致敬浮印",
  "Frame Fighter": "战甲霸王",
  "Impact Damage": "冲击伤害",
  "Fire Damage": "火焰伤害",
  "Blast": "爆炸",
  "Hawk Mod Pack": "苍鹰MOD包",
  "Eagle Mod Pack": "金鹰MOD包",
  "Phoenix Mod Pack": "凤凰MOD包",
  "Tomb Guardian": "古墓保卫者",
  "Tomb Protector": "古墓捍卫者",
  "Tomb Protector Effigy": "古墓捍卫者雕像",
  "Anspatha Brace": "安斯帕萨曲柄",
  "Phahd Scaffold": "法得支架",
  "Rahn Prism": "染棱镜",
  "Teralyst": "兆力使",
  "Gantulyst": "巨力使",
  "John Prodman": "约翰·跑得慢",
  "Spectral Tide Glyph": "光谱浪潮浮印",
  "Guiding Rose Glyph": "指路玫瑰浮印",
  "Unaffiliated": "无所属派系",
  "Neutral": "中立派系",
  "Blueprints Requiring Circuits": "需要电路的蓝图",
  "Gathering Tips": "收集提示",
  "Blueprints Requiring Alloy Plate": "需要合金板的蓝图",
  "fishing": "捕鱼",
  "Kavat Incubator Upgrade Segment": "库娃孵化器升级模块",
  "Modifiers": "改造",
  "The Executioners": "行刑者",
  "Rewards": "奖励",
  "Vauban Citadel Collection": "Vauban城塞组合包",
  "Prisma Twin Gremlins": "棱晶双子小精灵",
  "Kavat Gene-Masking Kits": "库娃基因伪装包",
  "Phantasma": "幻离子",
  "The Index Preview": "指数之场预览",
  "Sling Stone Emblem": "机弦徽章",
  "Clan Tier Multiplier": "氏族规模倍率",
  "Dargyn Pilot": "轻型艇飞行员",
  "Ashen Kuaka": "苍灰库阿卡",
  "Pharoma": "芳香信息素",
  "Luminos Dye": "光亮染料",
  "Void Beam": "虚空射线",
  "Alloy Drum": "合金桶",
  "Argon Pegmatite": "氩结晶岩",
  "Arid Blunt": "沙漠便携掩体",
  "Cell Array": "电池阵列",
  "Compacted Salvage": "压缩过的回收金属",
  "Drekar Blunt": "龙舰便携掩体",
  "Death Orb": "死亡宝珠",
  "The Pyrus Project": "烈焰计划",
  "Pyrus Essence": "烈焰精华",
  "Pyrus Essence Carrier": "烈焰精华搬运者",
  "Relay Strut Component": "中继站结构组件",
  "Trembera Essence": "战栗精华",
  "General Sargus Ruk": "Sargas Ruk将军",
  "Noggle": "摇头娃娃",
  "Riven Mod": "裂罅MOD",
  "Update 23": "更新23",
  "Weapon Skins": "武器外观",
  "Cascade Bomb": "串接炸弹",
  "limbs": "弓臂",
  "Arch-melee": "Archwing近战",
  "Arch-gun": "Archwing枪械",
  "Magnum Mambo": "重炮曼波",
  "Zylok": "席尔火枪",
  "Destreza Finesse Pack": "手腕技巧包",
  "Destreza Finesse Bundle": "手腕技巧包",
  "Beryl Antitoxin": "绿宝石解毒剂",
  "Citrine Antitoxin": "黄水晶解毒剂",
  "Vermillion Antitoxin": "辰砂解毒剂",
  "Lapis Antitoxin": "天青石解毒剂",
  "Loki Pack": "Loki包",
  "Volt Value Pack": "Volt超值包",
  "Enveloping Cloud": "包覆游云",
  "Accumulating Whipclaw": "蓄积长鞭",
  "Conductor": "指挥家",
  "Mending Splinters": "治愈玻片",
  "Mirage Immortal Skin": "Mirage不朽外观",
  "Prisma Koi Sentinel Tail": "棱晶锦鲤尾部",
  "Ki'Teer Atmos Diadem": "Ki'Teer大气权冠",
  "Nexus Gene-Masking Kit": "纳瑟斯基因伪装包",
  "Sands of Inaros Bundle": "Inaros之沙组合包",
  "Abrasys Syandana": "磨蚀披饰",
  "Okina Master Pack": "宗师翁组合包",
  "Kuva Cord": "赤毒绳结",
  "The Silver Grove Bundle": "落银树庭组合包",
  "Anyocorp Reclamation Unit Noggle Pack": "Anyo企业回收部队摇头娃娃包",
  "Noggle Statue": "摇头娃娃",
  "Anyocorp Investor Relations Noggle Pack": "Anyo企业投资人关系部摇头娃娃包",
  "Anyocorp Trading Group Noggle Pack'": "Anyo企业贸易组摇头娃娃包",
  "Anyocorp Claims Investigation Noggle Pack": "Anyo企业索赔调查队摇头娃娃包",
  "Immovable": "不动如山",
  "Elytron Ultimatum Bundle": "Elytron最后通牒组合包",
  "Equinox Mega Pack": "Equinox超级组合包",
  "Grineer Assault": "Grineer突击组合包",
  "Itzal Raider Pack": "Itzal袭击者组合包",
  "Jordas Syandana Pack": "Jordas披饰组合包",
  "Opulas Robe": "奥普洛斯礼袍",
  "Igaro Syandana": "伊卡洛披饰",
  "Limbo Bundle": "Limbo组合包",
  "Liset Athari Skin": "Liset余烬外观",
  "Nezha Empyrean Skin": "Nezha九霄外观",
  "Nezha Empyrean Collection": "Nezha九霄组合包",
  "Buzhou Syandana": "不周披饰",
  "Teng Dagger Skin": "飞腾匕首外观",
  "What Remains": "那些残留的",
  "Videos": "影音资料",
  "Duplex Fire": "双发",
  "Gram Prime": "格拉姆Prime",
  "Rubico Prime": "绝路Prime",
  "The Old War": "远古之战",
  "Enthrall": "奴役意志",
  "Mesmer Skin": "催眠外表",
  "Reave": "精华掠夺",
  "Danse Macabre": "死亡之舞",
  "Nidus Collection": "Nidus组合包",
  "Nyx Pack": "Nyx包",
  "3-Day Credit Booster": "现金加成（3天）",
  "7-Day Credit Booster": "现金加成（7天）",
  "30-Day Credit Booster": "现金加成（30天）",
  "3-Day Affinity Booster": "经验值加成（3天）",
  "7-Day Affinity Booster": "经验值加成（7天）",
  "30-Day Affinity Booster": "经验值加成（30天）",
  "Adi Holster Collection": "艾迪近战收纳组合包",
  "Octavia Collection": "Octavia组合包",
  "Mirage Bundle": "Mirage组合包",
  "Stay Frosty Pack": "停滞冷冻包",
  "Poisonous Attitude Pack": "剧毒姿态包",
  "Poison Attitude Pack": "剧毒姿态包",
  "Arcane Helmets": "秘奥头盔",
  "April Fools": "愚人节",
  "Grate Prime": "铁格栅Prime",
  "Ranged": "远程",
  "Primed Charged Shell": "充电弹头Prime",
  "Taxon Desert-Camo Skin": "塔克桑沙漠迷彩外观",
  "Paladin Bundle": "圣骑士组合包",
  "Female Warframe Pack": "女性Warframe组合包",
  "Huntress Bundle": "女猎手组合包",
  "Salix Syandana": "柳树披饰",
  "Brawler Bundle": "斗争者组合包",
  "Dead Silence Pack": "死寂组合包",
  "Gunslinger Bundle": "神枪手组合包",
  "Femme Fatale Pack": "蛇蝎美人组合包",
  "Update 10 Mega Bundle": "更新10综合包",
  "Dragon Bundle": "龙骑组合包",
  "Harrow Collection": "Harrow组合包",
  "Nave Syandana": "中殿披饰",
  "Endura Collection": "三叶坚韧组合包",
  "Broca Syandana": "布洛卡披饰",
  "Nidina Armor": "尼迪纳护甲",
  "Guandao Collection": "关刀组合包",
  "Ballistic Blades Bundle": "刀刃弹道组合包",
  "Secura Syandana": "保障披饰",
  "Vaykor Syandana": "勇气披饰",
  "Sancti Syandana": "圣洁披饰",
  "Rakta Syandana": "绯红披饰",
  "Telos Syandana": "终极披饰",
  "Celestia Syandana": "天文披饰",
  "Infestation Outbreaks": "Infested爆发",
  "Twitch Prominence Bundle": "Twitch名望包",
  "Jade Axa Bundle": "翡翠Axa组合包",
  "Bounty of the Lotus": "Lotus的慷慨",
  "Razor Gunplay Bundle": "剃刀枪战组合包",
  "Embolist Collection": "安柏勒斯组合包",
  "Embolist armor": "安柏勒斯护甲",
  "Embolist Armor": "安柏勒斯护甲",
  "Tentacyst accessory": "囊须坠饰",
  "Tentacyst Sugatra": "囊须坠饰",
  "Pistoleer Special": "手枪控包",
  "Forged Artistry Bundle": "武器锻造工艺组合包",
  "Forged Artistry Weapon Pack": "武器锻造工艺组合包",
  "Maggor Syandana": "玛戈披饰",
  "Supreme Soma Set": "至尊月神组合包",
  "Echoes Syandana Pack": "回音披饰包",
  "Izvara Syandana": "自在披饰",
  "Vanquished Banner": "战败旗帜",
  "Nelumbo Syandana": "莲花披饰",
  "Udyat Syandana": "乌加特披饰",
  "Female Helmet Pack": "女性头盔组合包",
  "Male Helmet Pack": "男性头盔组合包",
  "Moth Syandana Pack": "飞蛾披饰包",
  "Bombyx Syandana": "家蚕披饰",
  "Foxglove Syandana": "毛地黄披饰",
  "Samia Syandana": "眉纹天蚕蛾披饰",
  "Display Pack": "展示图组合包",
  "Corpus Walker": "Corpus步行者",
  "Transmutation core": "转换核心",
  "Double Affinity Weekend Pack": "双倍经验周末包",
  "Swarmer Detron": "蜂群德特昂",
  "Mask of the Lost One": "迷失者的面具",
  "Update 12 Mega Bundle": "更新12超级组合包",
  "Overheat": "过热",
  "Antiserum Injector Fragments": "抗血清注射器的碎片",
  "Infested Spore": "感染孢子",
  "Esophage": "吞噬者",
  "Cyan Ayatan Star": "阿耶檀识青蓝星",
  "Amber Ayatan Star": "阿耶檀识琥珀星",
  "Arcane Boiler": "秘奥痈裂者",
  "Breeding Grounds Badge": "清巢行动徽章",
  "Primed Expel Corpus": "驱逐Corpus Prime",
  "Primed Expel Corrupted": "驱逐堕落者Prime",
  "Primed Expel Infested": "驱逐Infested Prime",
  "Primed Expel Grineer": "驱逐Grineer Prime",
  "Grineer Settlement Reactor Scene": "Grineer居住点反应炉场景",
  "Lua's Nursery Scene": "月球苗圃场景",
  "Corpus Ice Planet Wreckage Scene": "Corpus冰封星球残骸场景",
  "Hunhow's Datascape Scene": "Hunhow的数据景观场景",
  "Corpus Gas City Conduit Scene": "Corpus集气城市管道场景",
  "Harrow's Temple Scene": "Harrow的神庙场景",
  "Infested Ship Bridge Scene|": "Infested舰桥场景",
  "Grineer Shipyards Manufactory Scene": "Grineer造船厂场景",
  "Pupacyst": "毒囊骨茧",
  "Falcor": "猎鹰轮",
  "Zastra Dual Dagger Skin": "札斯塔双持匕首外观",
  "Kludgekil Machete Skin": "杂组残杀者马谢特砍刀外观",
  "Silver Grove Shrine Scene": "落银树庭圣所场景",
  "Lua Containment Scene": "月球力场场景",
  "Hunhow’s Chamber Scene": "Hunhow的室内场景",
  "Kuva Throne Scene": "赤毒王座场景",
  "Mycona Colony Scene": "Mycona殖民地场景",
  "Chamber of the Lotus Scene": "Lotus的室内场景",
  "Sanctuary Conduit Scene": "圣殿喷泉场景",
  "Ambush": "幽灵伏击",
  "Energy Generator": "能量产生器",
  "Paracesis": "心智之殁",
  "The Man in The Wall": "墙里的人",
  "Personal Quarters": "个人居住模块",
  "Void Blast": "虚空爆裂",
  "Operator Cosmetics": "指挥官外观",
  "Masks": "面具",
  "Armors": "护甲",
  "Chimera Prologue": "虚妄嵌合序言",
  "Sharpshooter": "神射手",
  "Cautious Shot": "谨慎射击",
  "Power Donation": "献出力量",
  "Vigorous Swap": "强力切换",
  "Rolling Guard": "翻滚防护",
  "Adaptation": "适应",
  "Arbitrations": "仲裁警报",
  "Arbitration": "仲裁警报",
  " Courier": "运输船",
  "Revenant Vania Helmet": "Revenant瓦尼亚头盔",
  "Spektaka Sugatra": "华丽演出坠饰",
  "Spektaka Prime Syandana": "华丽演出Prime披饰",
  "Wall Run": "壁面蹬冲",
  "Calavera Glyph": "骷髅头浮印",
  "Sacred Vessel": "神圣容器",
  "Carrion Charger": "腐肉疾冲者",
  "Hyena LN2": "鬣狗液氮",
  "Hyena Pb": "鬣狗铅",
  "Hyena Th": "鬣狗钍",
  "Hyena Ng": "鬣狗硝酸",
  "Ogma Elite": "精英欧格玛",
  "Aim Glide": "飞身瞄准",
  "Nightwatch Lancer": "夜巡者枪兵",
  "Decaying Conculyst": "腐坏震荡使",
  "Nightwatch Bombard": "夜巡轰击者",
  "Reaver": "掠夺者",
  "Tar Mutalist MOA": "异融焦油恐鸟",
  "Nightwatch Flameblade": "夜巡烈焰刀客",
  "Tusk Grattler": "巨牙葛拉特勒",
  "Alternative Helmets": "可替换头盔",
  "Tusk Predator": "巨牙掠食者",
  "Nightwatch Powerclaw": "夜巡者猛力爪兵",
  "Nightwatch Brunt Lancer": "夜巡者盾枪兵",
  "Nightwatch Hyekka Master": "夜巡者鬣猫驯兽师",
  "Bio Lab": "生物实验室",
  "Happy Zephyr": "快乐的Zephyr",
  "Dread Mirror": "恐惧魔镜",
  "Blood Altar": "鲜血祭坛",
  "Bloodletting": "祭血仪式",
  "Seeking Talons": "穿心利爪",
  "Vega Toroid": "维加环型装置",
  "Calda Toroid": "告达环型装置",
  "Sola Toroid": "索拉环型装置",
  "Pobber": "泡博",
  "Sunny Pobber": "阳光泡博",
  "Delicate Pobber": "精巧泡博",
  "Subterranean Pobber": "地下泡博",
  "Virmink": "弗鸣克",
  "White-Breasted Virmink": "白胸弗鸣克",
  "Dusky-Headed Virmink": "灰首弗鸣克",
  "Red-Chested Virmink": "红冠弗鸣克",
  "Bolarola": "波雷罗拉",
  "Spotted Bolarola": "斑点波雷多拉",
  "Black-Banded Bolarola": "黑条纹波雷多拉",
  "Thorny Bolarola": "尖角波雷多拉",
  "Kubrodon": "库伯顿",
  "Brindle Kubrodon": "斑纹库狛顿",
  "Vallis Kubrodon": "山谷库狛顿",
  "Kubrodon Incarnadine": "血红库狛顿",
  "Eye-Eye": "目-目",
  "Scrubber": "洗涤者",
  "Echowinder": "回声环绕者",
  "Mirewinder": "污泥环绕者",
  "Longwinder": "长型环绕者",
  "Tink": "修补机",
  "Brickie": "砖瓦匠",
  "Kriller": "磷虾杀手",
  "Sapcaddy": "液集者",
  "Recaster": "续播机",
  "Tromyzon": "多目鳗",
  "Charamote": "重筑虾",
  "Synathid": "海龙",
  "Travoride": "铁镍矿",
  "Travocyte Alloy": "铁镍合金",
  "Axidite": "酸化矿物",
  "Axidrol Alloy": "酸化合金",
  "Venerol": "启明矿石",
  "Venerdo Alloy": "启明合金",
  "Hesperon": "长庚矿石",
  "Hespazym Alloy": "长庚合金",
  "Phasmin": "翡斯敏石",
  "Smooth Phasmin": "光滑翡斯敏石",
  "Noctrul": "夜石",
  "Heart Noctrul": "心形夜石",
  "Goblite": "填充细石",
  "Goblite Tears": "泪滴形填充细石",
  "Amarast": "紫苋石",
  "Star Amarast": "星形紫苋石",
  "Zodian": "黄道宝石",
  "Radiant Zodian": "发光的黄道宝石",
  "Thyst": "赤色水晶",
  "Marquise Thyst": "女侯爵赤色水晶",
  "Catchmoon": "捕月",
  "Tombfinger": "墓指",
  "Rattleguts": "响胆",
  "Gaze": "凝目",
  "Ramble": "漫游",
  "Lovetap": "爱击",
  "Deepbreath": "深息",
  "Slap": "掌击",
  "Haymaker": "重拳",
  "Gibber": "碎语",
  "Bellows": "风箱",
  "Zip": "速力",
  "Bashrack": "狂虐",
  "Slapneedle": "拍针",
  "Sparkfire": "花火",
  "Swiftfire": "颤火",
  "Stitch": "穿纫",
  "Zipneedle": "速针",
  "Thunderdrum": "雷鼓",
  "Zipfire": "速火",
  "Splat": "溅击",
  "Killstream": "连杀",
  "Ramflare": "猛光",
  "Flutterfire": "激火",
  "Nagantaka": "噬蛇弩",
  "Solaris United": "索拉里斯联盟",
  "Orb Vallis": "奥布山谷",
  "Wyrmius": "蛟龙巡航机",
  "Miscellaneous": "杂项",
  "Kitgun": "组合枪",
  "Vox Solaris": "索拉里斯之声",
  "Oxylus": "奥克绪罗斯",
  "Scan Lifeforms": "扫描生命体征",
  "Scan Matter": "扫描物质",
  "Ventkids": "通风小子",
  "Bad Baby": "坏小孩",
  "Coldfusor": "冷聚堆",
  "Beaky": "鹰钩",
  "Twin Kavats": "双子库娃",
  "Air Time": "乘空时间",
  "Trail Blazer": "轨上燃焰",
  "Mag Locks": "磁吸固锁",
  "Flat Belly": "坦腹",
  "Arc Twelve": "十二弧",
  "Wingnut": "翼型螺母",
  "Step Tens": "十位步",
  "Kinetic Friction": "动能摩擦",
  "Inertia Dampeners": "惯性减震",
  "Slay Board": "斩杀悬浮板",
  "Needlenose": "针尖鼻",
  "Hothead": "暴脾气",
  "Dink-A-Donk": "叮叮咚咚",
  "Fatboys": "胖男孩",
  "Sonic Boost": "声波提升",
  "Extreme Velocity": "极限加速",
  "Nitro Boost": "氮气喷射",
  "Thrash Landing": "收尾痛击",
  "Little Duck": "小鸭子",
  "Haztech Armor Bundle": "危难技工护甲组合包",
  "Smelter Armor Bundle": "冶炼技工护甲组合包",
  "Outrider Armor Bundle": "侦查员护甲组合包",
  "Vent Rate Armor Bundle": "通风鼠护甲组合包",
  "Operative": "工人",
  "Coilwheel": "线圈滚轮",
  "Tranq Rifle": "麻醉步枪",
  "Echo-Lure": "回声诱饵",
  "Shockprod Fishing Spear": "电冲刺鱼叉",
  "Broad-Spectrum Bait": "广谱鱼饵",
  "Narrow-Spectrum Bait": "窄谱鱼饵",
  "Sunpoint Plasma Drill": "阳点等离子钻头",
  "Akvasto Prime": "瓦斯托双枪Prime",
  "Ocucor": "视使之触",
  "Battacor": "武使之力",
  "Kreska": "直镐",
  "Mask of the Revenant": "Revenant的面具",
  "Rotoblade": "旋叶片",
  "Exa Brain": "艾脑",
  "Anoscopic Sensor": "微孔视觉感应器",
  "Parallel Biode": "并联生物二极体",
  "Lathe Coogulant": "车床凝冻液",
  "Dissipator Coil": "消散线圈",
  "Muon Battery": "缪子电池",
  "Thermal Laser": "热能激光",
  "Venedo Case": "维内多箱",
  "Neural Relay": "神经中继器",
  "Entroplasma": "熵离子体",
  "Sagan Module": "萨根模块",
  "Ecosynth Analyzer": "环境合成分析器",
  "Tek Enhance": "技法强化",
  "Tek Assault": "技法猛袭",
  "Tek Collateral": "技法连带",
  "Tek Gravity": "技法引力",
  "Mecha Pulse": "机甲脉冲",
  "Mecha Overdrive": "机甲超载",
  "Mecha Recharge": "机甲充能",
  "Mecha Empowered": "机甲强化",
  "Helminth Charger": "Helminth疾冲者",
  "Mecha Mods": "机甲MOD",
  "Tek Mods": "技法MOD",
  "Synth Reflex": "合成反射",
  "Synth Mods": "合成MOD",
  "Synth Fiber": "合成纤维",
  "Synth Deconstruct": "合成解构",
  "Synth Charge": "合成充能",
  "Augur Mods": "预言MOD",
  "Gladiator Mods": "角斗士MOD",
  "Hunter Mods": "猎人MOD",
  "Sacrificial Mods": "牺牲MOD",
  "Umbral Mods": "暗影MOD",
  "Vigilante Mods": "私法MOD",
  "K-Drive Launcher": "K式悬浮板发射器",
  "K-Drive": "K式悬浮板",
  "Debt-Bond": "债务债券",
  "Fortuna": "福尔图娜",
  "Vitus Essence": "生息精华",
  "Gorgaricus Spore": "葛嘉里菌孢子",
  "Mytocardia Spore": "心肌菌孢子",
  "Tepa Nodule": "缇帕瘤",
  "Thermal Sludge": "热能软泥",
  "Assault Mode": "突击模式",
  "Helminth Ferocity": "Helminth凶恶终结",
  "Rail Guards": "护轨器",
  "Venerdo Hoverdrive": "启明物悬浮驱动",
  "Training Debt-Bond": "培训债务债券",
  "Shelter Debt-Bond": "庇护债务债券",
  "Medical Debt-Bond": "医疗债务债券",
  "Advances Debt-Bond": "预支债务债券",
  "Familial Debt-Bond": "家族债务债券",
  "Scrap": "废料",
  "The Business": "Business",
  "Orb Vallis Conservation Emblem": "奥布山谷保护徽章",
  "Arcane  Healing": "复原赋能",
  "Purchasable": "可购买",
  "Pax Soar": "和平高飞",
  "Pax Charge": "和平电充",
  "Pax Bolt": "和平电闪",
  "Pax Seeker": "和平追寻者",
  "Update 24": "更新24",
  "haztech": "冶炼技工",
  "Orvius Blade": "灵枢刀刃",
  "Orvius Disc": "灵枢圆盘",
  "Shockprod": "电冲刺鱼叉",
  "Stunna": "电震波鱼叉",
  "Rude Zuud": "粗鲁的Zuud",
  "Flatbelly": "坦腹",
  "Vox Solaris (Syndicate)": "索拉里斯之声（集团）",
  "Vox Solaris (Quest)": "索拉里斯之声（系列任务）",
  "Security Override": "协议覆盖",
  "Anti-Grav Grenade": "反重力榴弹",
  "Shockwave Actuators": "震波驱动器",
  "Stasis Field": "静态力场",
  "Tractor Beam": "牵引光束",
  "Garuda Bathory Helmet": "Garuda巴托里头盔",
  "Mirewinder Bait": "污泥环绕者鱼饵",
  "Longwinder Bait": "长型环绕者鱼饵",
  "Kriller Bait": "磷虾杀手鱼饵",
  "Tromyzon Bait": "多目鳗鱼饵",
  "Charamote Bait": "重筑虾鱼饵",
  "Synathid Bait": "海龙鱼饵",
  "Crewmen's Boot": "船员的靴子",
  "Profit-Taker Orb": "利润收割者圆蛛",
  "Exploiter Orb": "剥削者圆蛛",
  "Conservation": "保护活动",
  "Raknoid": "蛛形机",
  "Scyto Raknoid": "赛托蛛形机",
  "Kyta Raknoid": "凯塔蛛形机",
  "Mite Raknoid": "微螨蛛型机",
  "Cinderthresh Hyena": "炉渣翻打鬣狗",
  "Gyre Hyena": "回旋鬣狗",
  "Icemire Hyena": "冰沼鬣狗",
  "Rabbleback Hyena": "烈背鬣狗",
  "Terra Raptor SX": "大地猛禽 SX",
  "Terra Attack Drone": "大地攻击型无人机",
  "Terra Shield Osprey": "大地护盾鱼鹰",
  "Terra Embattor MOA": "大地布阵恐鸟",
  "Terra MOA": "大地恐鸟",
  "Terra Shockwave MOA": "大地震荡恐鸟",
  "Terra Crewman": "大地船员",
  "Terra Jailer": "大地狱吏",
  "Terra Overtaker": "大地掷弹者",
  "Terra Plasmor Crewman": "大地离子枪船员",
  "Terra Sniper Crewman": "大地狙击手船员",
  "Terra Provisor": "大地采办者",
  "Terra Trencher": "大地掘沟者",
  "Redeemer Prime": "救赎者Prime",
  "Akjagara Prime": "觉醒双枪Prime",
  "Solari Language": "索拉里斯语",
  "Vendors": "供应商",
  "Venom Teeth": "牙齿毒液",
  "Flame Gland": "火焰腺体",
  "Frost Jaw": "冰冻双颚",
  "Shock Collar": "电击项圈"
}

let rvtt = new Map<string, string>(Object.keys(tt).map(v => [tt[v], v] as [string, string]))

let one = Object.keys(data).map(v => data[v])[0]
console.log(one)

const rtt = {
  怪奇: "g",
  常见: "n",
  罕见: "c",
  稀有: "r",
  传说: "l",
  裂罅: "x",
}

const ptt = {
  Zenurik: "=",
  Naramon: "-",
  Madurai: "r",
  Vazarin: "d",
}

const _BASE62_ST = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function base62(src/*: number*/)/*: string*/ {
  let rst = "", negative = src < 0;
  if (negative) src = -src;
  while (1) {
    let a = ~~src % 62;
    rst = _BASE62_ST[a] + rst;
    src = ~~(src / 62)
    if (src <= 0) {
      break;
    }
  }
  return negative ? "-" + rst : rst;
}

function debase62(src/*: string*/)/*: number*/ {
  let rst = 0, negative = src[0] === "-";
  if (negative) src = src.substr(1);
  for (let i = 0; i < src.length; i++) {
    const a = _BASE62_ST.indexOf(src[i]);
    if (a < 0) {
      continue;
    }
    rst = rst * 62 + a;
  }
  return negative ? -rst : rst;
}

let stidx = debase62("G0");
stidx

let ccnames = [
  ..."成长之力 • 手枪增幅 • 步枪增幅 • 死亡之眼 • 献出力量 • 钢铁充能 • 霰弹枪增幅".split(" • "),
  ..."体魄 • 团结一致 • 感染者阻抗 • 毒素抵抗 • 电磁脉冲场 • 返老还童".split(" • "),
  ..."侦敌雷达 • 冲刺提升 • 强化刀锋 • 快速切换 • 战利品探测器 • 手枪弹药搜集者 • 护盾瓦解 • 机甲强化 • 步枪弹药搜集者 • 狙击枪弹药搜集者 • 能量虹吸 • 腐蚀投射 • 霰弹枪弹药搜集者".split(" • "),
  ..."快速休整".split(" • "),
  ...Array(20).fill("占位符"),

  ..."聚精会神 • 延伸 • 简化 • 持久力 • 持久力Prime • 川流不息 • 川流不息Prime".split(" • "),
  ..."盲怒 • 弹指瞬技 • 心志偏狭 • 过度延展 • 瞬时坚毅".split(" • "),
  ..."生命力 • 蓄能重划 • 钢铁纤维".split(" • "),
  ..."不屈不挠 • 活力 • 活力Prime • 灵活装甲 • 百折不挠".split(" • "),
  ..."随机应变 • 狂暴化 • 飞行员 • 保温服 • 隔热 • 火焰防护 • 避雷针 • 毒抗 • 钻石皮肤 • 极速复元 • 生命转换 • 能量转换 • 均衡点 • 快速充能 • 激怒 • 不朽意志 • 反射防御".split(" • "),
  ..."强力切换 • 翻滚防护 • 适应".split(" • "),
  ..."暗影生命力 • 暗影纤维 • 暗影聚精会神".split(" • "),
  ...Array(40).fill("占位符"),
  // 特殊功能
  ..."矫捷窜升 • 协力窜升 • 狡诈窜升 • 坚忍窜升 • 力量窜升 • 速度窜升 • 匿踪窜升".split(" • "),
  ..."机动冲撞 • 穿刺步伐 • 撕裂翻转".split(" • "),
  ..."火焰行者 • 冰冷跃动 • 电光冲刺 • 剧毒飞腾".split(" • "),
  ..."磁浮 • 全面驱动 • 翼膜 • 冲刺 • 流线外形".split(" • "),
  ..."飞行员 • 减震器 • 顶天立地 • 顶天立地Prime • 保温服".split(" • "),
  ..."敌人感应 • 翻筋斗 • 震地冲击 • 入侵者 • 盗贼大师 • 痛苦阈值 • 花开怪奇 • 生长怪奇 • 惩戒 • 合成反射 • 盗贼天赋".split(" • "),
  // ..."指挥家 • 脱离速度 • 狂化突击 • Mesa的华尔兹".split(" • "),
  ..."预言协约 • 预言启示 • 预言通灵 • 预言神密".split(" • "),
  ..."角斗士圣盾 • 角斗士灵巧 • 角斗士决心".split(" • "),
  ..."猎人肾上腺素".split(" • "),
  ..."私法追踪 • 私法活力".split(" • "),
  ..."技法连带".split(" • "),
  ..."机甲脉冲".split(" • "),
  ..."合成反射".split(" • "),
  ...Array(40).fill("占位符"),

  // 技能强化
  ..."削甲手里剑 • 庇护烟幕 • 致命传送 • 风起云涌".split(" • "),
  ..."化像之道 • 巨大石者 • 构造裂缝 • 矿石凝视".split(" • "),
  ..."残响共鸣 • 残酷无息 • 破碎声波 • 震地共鸣".split(" • "),
  ..."导路龙骸 • 怨怒报复 • 永恒之护 • 续燃".split(" • "),
  ..."惊惧热浪 • 烈焰爆震 • 狂热火球 • 闪耀助燃".split(" • "),
  ..."二元性状 • 冷静与疯狂 • 和平挑衅 • 能量转移".split(" • "),
  ..."华彩刀剑 • 涌流突进 • 狂怒标枪 • 终结闪光".split(" • "),
  ..."冰冷雪崩 • 冰封护罩 • 寒冰之力 • 滞痕冰浪".split(" • "),
  ..."治愈玻片".split(" • "),
  ..."庇护焚炉 • 持久誓约".split(" • "),
  ..."潮汐涌净 • 疗愈漩涡 • 腐蚀弹幕 • 贪夺触角".split(" • "),
  ..."元素沙暴 • 抵消虫群".split(" • "),
  ..."强化箭袋 • 渗透 • 穿刺抛体 • 集中箭矢".split(" • "),
  ..."蓄积长鞭".split(" • "),
  ..."灾变连连 • 裂隙洪流 • 避难所".split(" • "),
  ..."护卫传送 • 救星诱饵 • 辐射缴械 • 静谧无踪".split(" • "),
  ..."反转脉冲 • 磁吸释放 • 贪婪吸引 • 高压粉碎".split(" • "),
  ..."Mesa的华尔兹 • 失衡护盾 • 弹道靶心 • 枪口闪焰".split(" • "),
  ..."全蚀 • 恶怨厅 • 爆炸戏法".split(" • "),
  ..."幸存生灵 • 幽影之护 • 掠夺 • 缓动惊骇".split(" • "),
  ..."割魂火圈 • 火成碎流 • 火绫守护".split(" • "),
  ..."不竭贪婪 • 幼体爆发".split(" • "),
  ..."中子星爆 • 反物质吸收 • 脱离速度".split(" • "),
  ..."同化 • 抚慰之风 • 混乱领域 • 精神狂怒".split(" • "),
  ..."凤凰新生 • 圣域爆发 • 惩击洗礼 • 神圣清算".split(" • "),
  ..."分裂槌音 • 指挥家".split(" • "),
  ..."刺骨战吼 • 碎铁弹片 • 践踏加固 • 铁甲冲锋".split(" • "),
  ..."感染毒雾 • 猛毒附加 • 蜕化再生".split(" • "),
  ..."刀翼闪击 • 欺幻魔灯".split(" • "),
  ..."汲能榨取 • 生命之池 • 耗弱链接".split(" • "),
  ..."摆荡钩索 • 永恒战意 • 狂化突击 • 长时瘫痪".split(" • "),
  ..."永动旋涡 • 特斯拉陷阱 • 驱逐力场".split(" • "),
  ..."晶管屏障 • 电击加速 • 电击奇兵 • 电容".split(" • "),
  ..."包覆游云 • 原始暴怒 • 神针腾跃".split(" • "),
  ..."急流 • 漏斗状云 • 目标入定".split(" • "),
];

// console.log(ccnames)

let list = ccnames.map(v => (!data[v] && console.log(v), data[v] || { fulltext: data[v] && data[v].fulltext || v, printouts: { Polarity: [] } }))
  // .filter(v => rvtt.get(v.fulltext))
  .map((v, i) => {
    let m = v.printouts.Polarity[0] && v.printouts.Polarity[0].match(/File:(.+)(?=_)/, "$1"), po = m && m[1];
    let en = rvtt.get(v.fulltext) || v.fulltext;
    if (!en) console.log(v)
    let o = {
      cn: v.fulltext,
      id: base62(stidx + i),
      name: en && en.replace(/ \w(?=\w)/g, w => w.toUpperCase()).replace(/[ &']+/g, "").replace(/^\w/, w => w.toLowerCase()),
    } as any;
    if (v.printouts.Polarity && v.printouts.Polarity[0]) o.polarity = ptt[po];
    if (v.printouts.Rarity && v.printouts.Rarity[0]) o.rarity = v.printouts.Rarity[0].replace(/.+/, v => rtt[v]);
    if (v.printouts.Equippedon && v.printouts.Equippedon[0]) o.type = v.printouts.Equippedon[0].replace(/[\[\]]/g, "").replace("战甲", "Warframe");
    else o.type = "Warframe";
    return o;
  })

// console.log(list)
// console.log(JSON.stringify(list))
console.log(list[0], JSON.stringify(list.map(v => [v.id, v.name, v.cn,v.type, v.polarity, v.rarity])))

// console.log(Object.keys(data).filter(v => !ccnames.includes(v)))
// console.log(Object.keys(data).map(v => data[v])
//   .filter(v => rvtt.get(v.fulltext)).map(v => v.fulltext).join("\n"))
