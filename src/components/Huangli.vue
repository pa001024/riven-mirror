<template>

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
  { name: "开紫卡", good: "会出自己很想要的卡", bad: "开出来的都是垃圾" },
  { name: "砸核桃", good: "出金概率很高", bad: "光辉都会出福马" },
  { name: "使用%t", good: "你看起来更有品位", bad: "别人会觉得你在装逼" },
  { name: "打突击", good: "不是紫卡就是传核", bad: "不是雕像就是加成" },
  { name: "收东西", good: "能收到很便宜的东西", bad: "收了半天全是奸商" },
  { name: "卖东西", good: "一下子就卖完了", bad: "完全没人理" },
  { name: "刷垃圾", good: "保底都是45币", bad: "打了半天全是15币" },
  { name: "收垃圾", good: "下回奸商会带好东西", bad: "根本收不到便宜的" },
  { name: "刷洪潮", good: "队友很给力，躺好就行了", bad: "会各种翻车" },
] as Activitie[];

const warframes = ["黑咖喱", "MESA", "侍刃", "ASH", "守望者", "Ivara", "IE", "NIDUS", "RHINO"];



@Component
export default class Huangli extends Vue {
  beforeMount() {
    let today = new Date();
    let iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    let numGood = random(iday, 98) % 3 + 2;
    let numBad = random(iday, 87) % 3 + 2;
    let eventArr = pickRandomActivity(numGood + numBad);
    // 从 activities 中随机挑选 size 个
    function pickRandomActivity(size: number) {
      let picked_events = pickRandom(activities, size);
      for (var i = 0; i < picked_events.length; i++) {
        picked_events[i] = parse(picked_events[i]);
      }
      return picked_events;
    }

    // 从数组中随机挑选 size 个
    function pickRandom(array: Activitie[], size: number) {
      let result: Activitie[] = [];
      for (var i = 0; i < array.length; i++) {
        result.push(array[i]);
      }
      for (var j = 0; j < array.length - size; j++) {
        var index = random(iday, j) % result.length;
        result.splice(index, 1);
      }
      return result;
    }

    // 解析占位符并替换成随机内容
    function parse(event: Activitie) {
      var result = { name: event.name, good: event.good, bad: event.bad } as Activitie;  // clone
      if (result.name.indexOf('%t') != -1) {
        result.name = result.name.replace('%t', warframes[random(iday, 11) % warframes.length]);
      }
      if (result.name.indexOf('%l') != -1) {
        result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
      }
      return result;
    }
  }
  mounted() {
  }
  beforeDestory() {
  }

  get TodayLucks() {

    return {

    };
  }
}
</script>

<style scoped>
</style>
