import $ from "axios";
const debug = false;
let data = '{{ModBox\n|navtype=vazarin\n|effect={{text|green|增加}} \'\'\'{{Icon|Proc|Cold|text|black}} 伤害\'\'\' 抗性\n|equippedon=[[战甲]]\n|image=InsulationU227.png\n|polarity={{Icon|Pol|D}}\n|rarity=常见\n|droppedby=Grineer [[Napalm|火焰轰击者]] <br> [[Orokin Void|Orokin虚空]] [[Storage Containers|储存容器]]\n}}\n\'\'\'隔热\'\'\'能增加[[Warframe|战甲]]生命和护盾对[[Damage 2.0/Cold Damage|冰冻伤害]]伤害的抗性。 \n\n==详细信息{{anchor|Stats}}==\n{| class="emodtable"\n|-\n! [[Mods#Mod Rank|等级]] \n! 冰冻抗性\n! [[Mods#Mod Power Cost|消耗]] \n|- \n| 0 || +10% || 4 \n|-\n| 1 || +20% || 5 \n|-\n| 2 || +30% || 6 \n|-\n| 3 || +40% || 7 \n|-\n| 4 || +50% || 8 \n|-\n| 5 || +60% || 9 \n|-\n|}\n<!--\n=={{subst:ch|Gallery}}{{anchor|Gallery}}==\n<gallery>\nInsulationMod.png|Original Card\nIns.jpg|Old appearance\n</gallery>\n-->\n\n==附注{{anchor|Note}}==\n*本MOD与[[Warm Coat|保温服]]效果\'\'\'不相同\'\'\'，它只会提升玩家对[[Damage 2.0/Cold Damage|冰冻伤害]]的抗性，并不会降低低温冰冻环境危机的影响（降低护盾上限）。 \n*与所有的抗性MOD一样，这个MOD的抗性效果相当于从从玩家的[[Damage 2.0/Flesh|肉体]]和[[Damage 2.0/Shielded|护盾]]伤害系数中减去对应数值。在MOD满级的情况下，护盾系数会从1.5将至0.9而生命系数会从1将至0.4。因此，它能让护盾对冰冻伤害的抵抗效率增加约\'\'\'+66.7%\'\'\'，让生命对冰冻伤害的抵抗效率增加\'\'\'+150%\'\'\'。\n\n==更新历史{{anchor|Patch History}}==\n{{Scrollbox/Article|\n{{PatchHistoryNeeded}}\n\n}}\n\n==另见{{anchor|See also}}==\n\n*[[Mods|MOD]]\n\n[[es:Aislamiento]]\n[[de:Isolierung]]\n[[ru:Утепление]]\n[[en:Insulation]]\n[[分类:MOD]]\n[[分类:战甲MOD]]\n[[分类:抗性MOD]]\n[[分类:常见MOD]]\n[[分类:冰冻抗性]]\n[[分类:更新8]]\n[[分类:Vazarin极性MOD]]';

const wiki = debug ?
  () => new Promise((r, j) => r({ data })) :
  (name: string) => $.get(`https://warframe.huijiwiki.com/index.php?action=raw&title=${encodeURIComponent(name)}`);

let rx = /\| *(\d+) *\|\| *.+ *\|\| *(\d+)(?=(?:\s+\|-)?\s+\|\})/

function take(data: string) {
  if (data.match(rx))
    console.log("," + data.match(rx)[2], data.match(rx)[1] == "5" ? "" : "," + data.match(rx)[1])
  else
    console.log(data);
}
// 单个

if (0)
  wiki("流线外形").then(({ data }) => {
    // console.log(JSON.stringify(data))
    take(data)
  })

else
  // 批量
  Promise.all([
    ...`猎人肾上腺素
    私法活力
    技法连带
    机甲脉冲
    合成反射`.split(/\s+/g).map(v => wiki(v))
  ]).then(rst => rst.map(({ data }) => take(data)))
