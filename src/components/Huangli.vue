<template>
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
      <!-- <strong>朝向：</strong>面向<span class="direction_value">{{directionString}}</span>破关节，伤害最高 -->
    </div>
  </div>
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
}
const weeks = ["日", "一", "二", "三", "四", "五", "六"];
const directions = ["北方", "东北方", "东方", "东南方", "南方", "西南方", "西方", "西北方"];
const activities = [
  { name: "泡澡", good: "会连出稀有遗物", bad: "泡着到一半队友全部掉线了" },
  { name: "水专精", good: "队友辅助的很舒服，一把就水完了", bad: "队友会挂机，打得很难受" },
  { name: "狩猎夜灵", good: "出个充沛不在话下", bad: "全是非洲车" },
  { name: "挖武器", good: "暗杀不会被发现", bad: "除非你活够了，死得早点没关系" },
  { name: "洗紫卡", good: "几下就洗出不错的属性", bad: "可能导致失去信心" },
  { name: "洗%f的紫卡", good: "运气不错", bad: "可能导致失去信心" },
  { name: "开紫卡", good: "会出自己很想要的卡", bad: "开出来的都是垃圾" },
  { name: "砸核桃", good: "出金概率很高", bad: "光辉都会出福马" },
  { name: "使用%w", good: "你看起来更有品位", bad: "别人会觉得你在装逼" },
  { name: "打突击", good: "不是紫卡就是传核", bad: "不是雕像就是加成" },
  { name: "收东西", good: "能收到很便宜的东西", bad: "收了半天全是奸商" },
  { name: "卖东西", good: "非常畅销", bad: "完全没人理" },
  { name: "刷垃圾", good: "保底都是45币", bad: "打了半天全是15币" },
  { name: "收垃圾", good: "下回奸商会带好东西", bad: "根本收不到便宜的" },
  { name: "刷洪潮", good: "今天猫的心情不错", bad: "猫根本不会叫" },
  { name: "去%a水", good: "别人觉得你是个大佬", bad: "今天杠精很多" },
  { name: "逛B站", good: "还需要理由吗？", bad: "满屏兄贵亮瞎你的眼", weekend: true },
] as Activitie[];


const warframes = ["黑咖喱", "Ash", "Atlas", "Banshee", "Chroma", "Ember", "Equinox", "Excalibur", "Frost",
  "Gara", "Harrow", "Hydroid", "Inaros", "Ivara", "Khora", "Limbo", "Loki", "Mag", "Mesa", "Mirage",
  "Nekros", "Nezha", "Nidus", "Nova", "Nyx", "Oberon", "Octavia", "Rhino", "Saryn", "Titania",
  "Trinity", "Valkyr", "Vauban", "Volt", "Wukong", "Zephyr"];
const weapons = ["兰卡", "安培克斯", "沙皇", "悦音Prime", "暗杀者", "弧电离子枪", "关刀"];
const areas = ["贴吧", "氏族", "区域频道", "联盟"];

@Component
export default class Huangli extends Vue {
  today = new Date();
  get iday() { return this.today.getFullYear() * 10000 + (this.today.getMonth() + 1) * 100 + this.today.getDate(); }
  get directionString() { return directions[random(this.iday, 2) % directions.length] }
  goods = []
  bads = []
  beforeMount() {
    this.goods = [];
    this.bads = [];
    let numGood = random(this.iday, 56) % 3 + 2;
    let numBad = random(this.iday, 33) % 3 + 2;
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
.direction_value {
  color: #4a4;
  font-weight: bold;
}
.line-tip {
  font-size: 11pt;
  margin-top: 10px;
  margin-left: 10px;
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
