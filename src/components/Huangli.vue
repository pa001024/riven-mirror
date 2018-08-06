<template>
  <el-row type="flex" :gutter="20" justify="center">
    <div class="huangli">
      <div class="title">
        仓鼠老黄历
        <sup>beta</sup>
      </div>
      <div class="date">
        {{todayString}}
      </div>
      <div class="evs">
        <div class="ev good">
          <div class="ev-title">宜</div>
          <ul class="ev-list">
            <li v-for="good in goods" :key="good.name">
              <div class="ev-name">{{good.name}}</div>
              <div class="ev-desc">{{good.good}}</div>
            </li>
          </ul>
        </div>
        <div class="ev bad">
          <div class="ev-title">不宜</div>
          <ul class="ev-list">
            <li v-for="bad in bads" :key="bad.name">
              <div class="ev-name">{{bad.name}}</div>
              <div class="ev-desc">{{bad.bad}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="line-tip">
        <strong>朝向：</strong>面向<span class="direction_value">{{directionString}}</span>破关节，伤害最高
      </div>
      <div class="line-tip">
        <strong>星球：</strong>去<span class="direction_value">{{starsString}}</span>刷裂缝，出金最多
      </div>
      <div class="line-tip">
        <strong>大佬指数：</strong><span class="dalao_value">{{dalaoValue}}</span>
      </div>
      <div class="comment">
        <ul>
          <li>*仅供参考</li>
        </ul>
      </div>
    </div>
  </el-row>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

// 伪随机
function random(dayseed: number, indexseed: number) {
  let n = dayseed % 11117;
  for (var i = 0; i < 100 + indexseed; i++) {
    n = n * n;
    n = n % 11117;   // 11117 是个质数
  }
  return n;
}

interface Activitie {
  name: string;
  good: string;
  bad: string;
  weekend?: boolean
}
const weeks = ["日", "一", "二", "三", "四", "五", "六"];
const directions = ["北方", "东北方", "东方", "东南方", "南方", "西南方", "西方", "西北方"];
const activities = [
  { name: "泡澡", good: "会连出稀有遗物", bad: "泡着到一半队友全部掉线了" },
  { name: "水专精", good: "队友辅助的很舒服，一把就水完了", bad: "队友会挂机，打得很难受" },
  { name: "狩猎夜灵", good: "出个充沛不在话下", bad: "全是非洲车" },
  { name: "挖武器", good: "会发现以前没发现的好东西", bad: "福马丢进去发现是个垃圾" },
  { name: "挖战甲", good: "会发现从未发现过的新玩法", bad: "福马丢进去发现是个垃圾" },
  { name: "洗紫卡", good: "几下就洗出不错的属性", bad: "可能导致失去信心" },
  { name: "洗%f的紫卡", good: "运气不错", bad: "可能导致失去信心" },
  { name: "开紫卡", good: "会出自己很想要的卡", bad: "开出来的都是垃圾" },
  { name: "砸核桃", good: "出金概率很高", bad: "光辉都会出福马" },
  { name: "使用%w", good: "你看起来更有品位", bad: "别人会觉得你在装逼" },
  { name: "打突击", good: "不是紫卡就是传核", bad: "不是雕像就是加成" },
  { name: "收东西", good: "能收到很便宜的东西", bad: "收了半天全是奸商" },
  { name: "卖东西", good: "非常畅销", bad: "完全没人理" },
  { name: "刷垃圾", good: "保底都是45币", bad: "打了半天全是15币" },
  { name: "收垃圾", good: "下回奸商会带好东西", bad: "都是些15的垃圾" },
  { name: "刷洪潮", good: "今天猫的心情不错", bad: "猫根本不会叫" },
  { name: "打超过%l波无尽", good: "连金传说", bad: "什么都不出" },
  { name: "去%a水", good: "别人觉得你是个大佬", bad: "今天杠精很多" },
  { name: "逛B站", good: "会发现不错的东♂西", bad: "满眼广告区大佬", weekend: true },
  { name: "作死", good: "在大佬群中七进七出", bad: "除非你活够了，死得早点没关系" },
] as Activitie[];


const warframes = ["黑咖喱", "Ash", "Atlas", "Banshee", "Chroma", "Ember", "Equinox", "Excalibur", "Frost",
  "Gara", "Harrow", "Hydroid", "Inaros", "Ivara", "Khora", "Limbo", "Loki", "Mag", "Mesa", "Mirage",
  "Nekros", "Nezha", "Nidus", "Nova", "Nyx", "Oberon", "Octavia", "Rhino", "Saryn", "Titania",
  "Trinity", "Valkyr", "Vauban", "Volt", "Wukong", "Zephyr"];
const weapons = "兰卡,狂鲨,金工火神,奥堤克光子枪,苏普拉,绝路,双簧管,铁晶磁轨炮,安培克斯,沙皇,楞次弓,席芭莉丝,斯特朗,野猪,碎裂者,科林斯,食人鱼,循环离子枪,雷克斯双枪,安培克斯,悦音Prime,暗杀者,弧电离子枪,布拉克,嵴椎节鞭,提佩多,玻之武杖,怯薛,西亚什,瘟疫 克里帕丝,欧玛,关刀".split(",");
const areas = ["贴吧", "氏族", "区域频道", "联盟"];
const stars = "水星,金星,地球,月球,火星,火卫一,谷神星,木星,欧罗巴,土星,天王星,海王星,冥王星,赛德娜,阋神星,虚空".split(",");

@Component
export default class Huangli extends Vue {
  today = new Date();
  get iday() { return this.today.getFullYear() * 10000 + (this.today.getMonth() + 1) * 100 + this.today.getDate(); }
  get directionString() { return directions[random(this.iday, 55) % directions.length] }
  get starsString() { return stars[random(this.iday, 233) % stars.length] }
  get dalaoValue() {
    return Array(5).fill("").map((v, o) => o <= random(this.iday, 18) % 6 ? "★" : "☆").join("");
  }
  goods = []
  bads = []
  beforeMount() {
    this.goods = [];
    this.bads = [];
    let numGood = random(this.iday, 56) % 3 + 1;
    let numBad = random(this.iday, 33) % 3 + 1;
    let eventArr = this.pickRandomActivity(numGood + numBad);
    for (var i = 0; i < numGood; i++) {
      this.goods.push(eventArr[i]);
    }
    for (var i = 0; i < numBad; i++) {
      this.bads.push(eventArr[numGood + i]);
    }
  }

  // 从 activities 中随机挑选 size 个
  pickRandomActivity(size: number) {
    let picked_events = this.pickRandom(activities, size);
    for (var i = 0; i < picked_events.length; i++) {
      picked_events[i] = this.parse(picked_events[i]);
    }
    return picked_events;
  }

  // 从数组中随机挑选 size 个
  pickRandom(array: Activitie[], size: number) {
    let result: Activitie[] = [];
    for (var i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
    for (var j = 0; j < array.length - size; j++) {
      var index = random(this.iday, j) % result.length;
      result.splice(index, 1);
    }
    return result;
  }

  // 解析占位符并替换成随机内容
  parse(event: Activitie) {
    var result = { name: event.name, good: event.good, bad: event.bad } as Activitie;  // clone
    if (result.name.indexOf('%w') != -1) {
      result.name = result.name.replace('%w', warframes[random(this.iday, 11) % warframes.length]);
    }
    if (result.name.indexOf('%f') != -1) {
      result.name = result.name.replace('%f', weapons[random(this.iday, 51) % weapons.length]);
    }
    if (result.name.indexOf('%a') != -1) {
      result.name = result.name.replace('%a', areas[random(this.iday, 35) % areas.length]);
    }
    if (result.name.indexOf('%l') != -1) {
      result.name = result.name.replace('%l', (random(this.iday, 12) % 12 + 5).toString());
    }
    return result;
  }

  get todayString() {
    return "今天是" + this.today.getFullYear() + "年" + (this.today.getMonth() + 1) + "月" + this.today.getDate() + "日 星期" + weeks[this.today.getDay()];
  }
}
</script>

<style>
.huangli .comment {
  color: #aaa;
  margin: 8px;
  text-align: right;
}
.direction_value {
  color: #4a4;
  font-weight: bold;
}
.dalao_value {
  color: #f87;
}
.line-tip {
  font-size: 11pt;
  padding: 8px;
  background: white;
}
.ev-title {
  flex: 1;
  text-align: center;
  box-sizing: border-box;
  font-size: 2em;
  font-weight: bold;
  /* box-shadow: 0 0 1px white inset, 0 0 1px black; */
  margin: 16px 8px;
}
.ev-list {
  flex: 2;
  box-sizing: border-box;
  padding: 16px 8px;
  background: #ffffff8c;
  line-height: 1.5;
}
.ev-list li {
  margin: 8px;
}

.ev-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #444;
}
.ev-desc {
  font-size: 1em;
  color: #777;
}
.huangli {
  width: 440px;
}
.huangli .title {
  display: block;
  width: 100%;
  box-sizing: border-box;
  background: rgb(61, 90, 254);
  padding: 10px;
  color: white;
  font-size: 1.2em;
  margin: 0;
  border-bottom: 8px solid #a8c7ff;
}
.huangli .date {
  padding: 8px;
  background: white;
}
.huangli .title sub {
  vertical-align: super;
  font-size: smaller;
}
.ev {
  display: flex;
  align-items: center;
}
.ev.good {
  background-color: #fbe04c;
}
.ev.bad {
  background: #d8502b;
}
</style>
