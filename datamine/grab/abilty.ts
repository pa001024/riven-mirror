import $ from "axios";
import { _abilityData as a } from "../warframe/codex/warframe.data";

const debug = !!1;
let data = "{{AbilityU10.3\n| name           = 手里剑\n| gameimage      = Shuriken.png\n| cardimage      = ShurikenModU15.jpeg\n| hotkey         = 1\n| energy         = 25\n| description    = 掷出一枚旋转的手里剑，造成高伤害并把敌人钉在墙上。\n| cost           = 0 / 1 / 2 / 3\n| damage         = 100 / 250 / 350 / 500 (伤害)\n| range          = 60 米\n| duration       = N/A\n| misc           = 1 / 1 / 2 / 2 (手里剑数量)\n| cardonly = {{{1|}}}\n| info =  \n*Ash投出'''1 / 1 / 2 / 2'''个手里剑。手里剑会自动寻找目标。每个手里剑造成'''100 / 250 / 350 / 500'''{{Icon|Proc|Slash|text}}伤害，并且有100%异常状态触发几率。\n**伤害取决于[[技能强度]]。\n**由于Ash的被动效果，手里剑造成的[[出血]]效果会在'''9'''秒内造成'''10'''次伤害，每次伤害量为初始伤害的'''43.75%'''。出血伤害无视护甲和护盾。\n**手里剑如果击中敌人头部，则出血的单次伤害为初始伤害的'''87.5%'''。持续时间不变。\n*手里剑技能不会打断[[阴影]]的隐形。\n*可以用来击破[[Corpus飞船#危机|强化玻璃]]。\n*可以在跳跃、滑行、贴墙跑动和前空翻中使用。\n*每次使用该技能有'''0.5'''秒的间隔。\n|augment =\n[[File:{{mi|削甲手里剑}}|200px|left]]\n{{main|Seeking Shuriken|削甲手里剑}}\n{{#lst:Seeking Shuriken|intro}}\n{{#lst:Seeking Shuriken|stats}}\n{{clr}}\n|tips = \n*由于出血效果无视[[Armor|护甲]]并且可以叠加，所以对于高级重甲Grineer单位，我们可以快速重复施展该技能以达到迅速积累出血伤害的效果。\n|max = \n{{Maximization|{{uc:{{#invoke:translate|ToEnglish|手里剑}}}}}}\n}}<noinclude>\n==另见{{anchor|See also}}==\n* [[Ash]]\n\n[[en:Shuriken]]\n[[de:Shuriken]]\n[[分类:更新7]]\n[[分类:单手技能]]\n[[分类:战甲技能]]\n[[分类:Ash]]\n[[分类:切割伤害]]"​​​​;

const wiki = debug ?
  () => new Promise((r, j) => r({ data })) :
  (name: string) => $.get(`https://warframe.huijiwiki.com/index.php?action=raw&title=${encodeURIComponent(name)}`);

let names = a.map(v => v.id.replace(/ /g, "_"))

let rx = /\| *(\d+) *\|\| *.+ *\|\| *(\d+)(?=(?:\s+\|-)?\s+\|\})/

function take(data: string) {
  if (data.match(rx))
    console.log("," + data.match(rx)[2], data.match(rx)[1] == "5" ? "" : "," + data.match(rx)[1])
  else
    console.log(data);
}

if (1)
  wiki("手里剑").then(({ data }) => {
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
