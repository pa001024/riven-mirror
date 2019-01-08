<template>
  <div class="wrapper" ref="wrapper" :class="{disable: !scrollEnable}">
    <div class="content" ref="content" :style="{ width: scrollWidth ? scrollWidth + 'px' : '100%' }">
      <el-row :gutter="20" class="index" type="flex">
        <!-- 时间 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="index-clock" :body-style="{ padding: '0px' }">
            <el-carousel :autoplay="false" class="clock">
              <el-carousel-item class="cetus" :class="[cetusTime.isDay ? 'day' : 'night']">
                <div class="clock-body">
                  <div class="block">
                    <div class="time">{{cetusTime.text}}</div>
                    <div class="title">{{$t("time.cetus")}} - {{cetusTime.phase}}</div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item class="fortuna" :class="[fortunaTime.isDay ? 'day' : 'night']">
                <div class="clock-body">
                  <div class="block">
                    <div class="time">{{fortunaTime.text}}</div>
                    <div class="title">{{$t("time.fortuna")}} - {{fortunaTime.phase}}</div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item class="earth" :class="[earthTime.isDay ? 'day' : 'night']">
                <div class="clock-body">
                  <div class="block">
                    <div class="time">{{earthTime.text}}</div>
                    <div class="title">{{$t("time.earth")}} - {{earthTime.phase}}</div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-col>
        <!-- 突击 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="sortie.id">
          <el-card class="index-card sortie">
            <h3 slot="header"><WfIcon type="sortie" shadow/> {{$t("alerting.sortie")}}</h3>
            <ul>
              <div class="sortie-info"><!--
             --><WfIcon :type="sortie.faction.toLowerCase()"/> {{sortie.boss}}<!--
           --></div>
              <div class="time">{{$t("alerting.remaining")}}: {{renderTime(sortie.expiry)}}</div>
              <li v-for="(v, i) in sortie.variants" :key="i">
                <div class="info">
                  <div class="mission">{{v.missionType}}</div>
                  <div class="modifier">{{v.modifier}}</div>
                </div>
                <div class="node">{{v.node}}</div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 警报 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="alerts.length > 0">
          <el-card class="index-card alert">
            <h3 slot="header"><WfIcon type="alert" shadow/> {{$t("alerting.alerts")}}</h3>
            <ul>
              <li v-for="(v, i) in alerts" :key="i">
                <div class="info">
                  <div class="mission">{{v.mission.type}}</div>
                  <div class="reward">{{v.mission.reward.itemString}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <WfIcon :type="v.mission.faction.toLowerCase()"/> {{v.mission.node}}
                  </div>
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(v.expiry)}}</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 新闻 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="news.length > 0">
          <el-card class="index-card news">
            <h3 slot="header"><WfIcon type="earth" shadow/> {{$t("alerting.news")}}</h3>
            <ul>
              <li v-for="(v, i) in news" :key="i">
                <i class="el-icon-caret-right"></i>
                <a :href="v.link" target="_blank">{{v.message}}</a>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 虚空商人 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="voidTrader">
          <el-card class="index-card voidtrader">
            <h3 slot="header"><WfIcon type="voidtrader" shadow/> {{$t("alerting.voidTrader")}}</h3>
            <ul>
              <li>
                <div class="location">{{voidTrader.location}}</div>
                <div class="padding"></div>
                <div class="time">{{$t("alerting.remaining")}}: {{renderTime(voidTrader.active ? voidTrader.expiry : voidTrader.activation)}}</div>
              </li>
              <template v-if="voidTrader.inventory.length > 0">
                <li v-for="(v, i) in voidTrader.inventory" :key="i">
                  <div class="info">
                    <div class="item">{{v.item}}</div>
                  </div>
                  <div class="cost">
                    <div class="cost-ducats">{{v.ducats}}</div>
                    <div class="cost-credits">{{v.credits}}</div>
                  </div>
                </li>
              </template>
            </ul>
          </el-card>
        </el-col>
        <!-- 裂缝 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="fissures.length > 0">
          <el-card class="index-card fissure">
            <h3 slot="header"><WfIcon type="fissure" shadow/> {{$t("alerting.fissures")}}</h3>
            <ul>
              <li v-for="(v, i) in fissures" :key="i">
                <div class="info">
                  <div class="tier">{{v.tier}}</div>
                  <div class="mission">{{v.missionType}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <WfIcon :type="v.enemy.toLowerCase()"/> {{v.node}}
                  </div>
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(v.expiry)}}</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 入侵 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="invasions.length > 0">
          <el-card class="index-card invasion">
            <h3 slot="header"><WfIcon type="invasion" shadow/> {{$t("alerting.invasion")}}</h3>
            <ul>
              <li v-for="(v, i) in invasions" :key="i">
                <div class="info">
                  <div class="reward">
                    <WfIcon :type="v.attackingFaction.toLowerCase()"/>
                    {{v.attackerReward.itemString || '-'}}
                  </div>
                  <div class="reward">
                    <WfIcon :type="v.defendingFaction.toLowerCase()"/>
                    {{v.defenderReward.itemString || '-'}}
                  </div>
                </div>
                <div class="misc">
                  <div class="node">{{v.node}}</div>
                  <div class="progress">{{$t("alerting.progress")}} {{v.completion.toFixed()}}%</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 地球赏金 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="ostrons.length > 0">
          <el-card class="index-card ostrons">
            <h3 slot="header"><WfIcon type="ostrons" shadow/> {{$t("alerting.ostrons")}}</h3>
            <ul>
              <li v-for="(v, i) in ostrons" :key="i">
                <div class="info">
                  <div class="mission">{{v.type}}</div>
                  <div class="reward">
                    <div class="reward-item" v-for="reward in v.rewardPool" :key="reward">{{reward}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 金星赏金 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="solarisUnited.length > 0">
          <el-card class="index-card solarisUnited">
            <h3 slot="header"><WfIcon type="fortuna" shadow/> {{$t("alerting.solarisUnited")}}</h3>
            <ul>
              <li v-for="(v, i) in solarisUnited" :key="i">
                <div class="info">
                  <div class="mission">{{v.type}}</div>
                  <div class="reward">
                    <div class="reward-item" v-for="reward in v.rewardPool" :key="reward">{{reward}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BScroll from 'better-scroll';
import { WorldStat, Sortie, News, Fissure, Invasion, Job, VoidTrader, Alert } from "@/warframe/worldstat";
import { CetusTime, FortunaTime, EarthTime } from "@/warframe/gametime";
interface WarframeTime {
  isDay: boolean
  phase: string
  text: string
}
@Component
export default class Alerts extends Vue {
  cetusTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" }
  fortunaTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" }
  earthTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" }
  timerID: number;
  statID: number;
  updating = false;
  stat: WorldStat = new WorldStat();
  showTimeType = "cetus";
  scroll: BScroll;
  seconds = ~~(Date.now() / 1e3);
  scrollWidth = 0;
  scrollEnable = false;
  sortie: Sortie = this.stat.sortie;
  alerts: Alert[] = [];
  news: News[] = [];
  fissures: Fissure[] = [];
  invasions: Invasion[] = [];
  ostrons: Job[] = [];
  solarisUnited: Job[] = [];
  voidTrader: VoidTrader = null;

  renderTime(time: string) {
    let sec = ~~(Date.parse(time) / 1e3) - this.seconds;
    if (sec < 0) return "00:00:00";
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    let day = ~~(hou / 24);
    hou = hou % 24;
    min = min % 60;
    sec = sec % 60;
    return `${day !== 0 ? day + ":" : ""}${hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
  }

  // === 事件处理 ===
  @Watch("$route")
  resize() {
    if (document.documentElement.clientWidth < 767) {
      this.scrollWidth = 0;
    }
    else {
      // 计算宽度
      let ls = document.querySelectorAll(".index > .el-col") as any, lastRect: DOMRect = null, width = -20;
      [].forEach.call(ls, (el: HTMLElement) => {
        let rect = el.getBoundingClientRect() as DOMRect;
        if (!lastRect || lastRect.left != rect.left) {
          width += rect.width;
          lastRect = rect;
        }
      });
      if (this.scroll && !this.scroll.isInTransition) {
        this.scroll.refresh();
        this.scrollWidth = width;
      }
    }
    let wrapperWidth = (this.$refs.wrapper as HTMLElement).getBoundingClientRect().width;
    this.scrollEnable = wrapperWidth < this.scrollWidth;
  }
  // === 生命周期钩子 ===
  updated() {
    this.resize();
  }
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper as Element, {
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
        eventPassthrough: 'vertical'
      });
      this.scrollWidth = 0;
      window.addEventListener("resize", this.resize);
    });
  }
  beforeMount() {
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000);
    this.updateStat();
    this.statID = setInterval(_ => this.updating || this.updateStat(), 6e4);
  }
  beforeDestroy() {
    clearInterval(this.timerID);
    clearInterval(this.statID);
    window.removeEventListener("resize", this.resize);
  }
  updateStat() {
    this.updating = true;
    this.stat.fetch().then(() => {
      this.updating = false;
      this.sortie = this.stat.sortie;
      this.alerts = this.stat.alerts;
      this.news = this.stat.news;
      this.fissures = this.stat.fissures;
      this.invasions = this.stat.invasions;
      this.ostrons = this.stat.ostrons;
      this.solarisUnited = this.stat.solarisUnited;
      this.voidTrader = this.stat.voidTrader;
    }).catch(() => setTimeout(() => this.updateStat(), 1e3));
  }
  updateTime() {
    this.seconds = ~~(Date.now() / 1e3);
    this.cetusTime = { isDay: CetusTime.isDay, phase: CetusTime.phaseText, text: CetusTime.text };
    this.fortunaTime = { isDay: FortunaTime.isDay, phase: FortunaTime.phaseText, text: FortunaTime.text };
    this.earthTime = { isDay: EarthTime.isDay, phase: EarthTime.phaseText, text: EarthTime.text };
  }
}
</script>

<style lang="less">
.index-card.news li {
  color: #3d5afe;
  transition: 0.4s ease-out;
  + li {
    padding-top: 8px;
  }
  &:hover {
    color: #7385ec;
  }
  a {
    margin-left: 8px;
    text-decoration: none;
    color: #222;
    transition: 0.4s;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
      text-decoration: underline;
      color: #3d5afe;
    }
  }
}

.index-card.fissure .mission {
  font-size: 1em;
  font-weight: normal;
}

.index-card .el-card__body {
  background: #3d5afe;
  padding: 16px;
}
.index-card {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #fff;
    border-radius: 8px;
    margin-top: -16px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    li {
      padding: 14px 28px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      width: calc(100% - 56px);
    }
  }
}
.index-card .padding {
  flex: 1;
}
.index-card.info ul li {
  white-space: normal;
}
.index-card .info {
  flex: 1;
}
.index-card .misc {
  text-align: right;
}
.index-card .tier {
  font-size: 1.5em;
  font-weight: 300;
}
.index-card .mission {
  font-size: 1.5em;
  font-weight: 300;
}
.index-card .modifier,
.index-card .reward {
  margin-top: 10px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
}
.index-card.sortie .time {
  color: #3d5afe;
  text-align: right;
  float: right;
  margin: 22px 24px 0 0;
}
.index-card .progress,
.index-card .time {
  color: #999;
  text-align: right;
  float: right;
  margin-top: 4px;
}
.index-card.sortie .sortie-info {
  border: 1px solid #3d5afe;
  color: #3d5afe;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  margin: 16px 0 0 24px;
}
@media only screen and (max-width: 444px) {
  .index-card.sortie .sortie-info {
    padding: 4px 12px;
    margin: 14px 0 0 16px;
  }
  .index-card.sortie .time {
    margin: 20px 20px 0 0;
  }
}
.index-card .el-card__header {
  background: #3d5afe;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);
  border: 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
.index-card.ostrons .reward,
.index-card.solarisUnited .reward {
  white-space: normal;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.index-card.voidtrader .location {
  font-size: 1.3em;
}
.index-card.voidtrader .item {
  font-weight: 300;
  font-size: 1.2em;
}
.index-card.voidtrader .cost {
  font-size: 1.1em;
  text-align: right;
}
.index-card.voidtrader .cost > * {
  display: inline-block;
  margin-left: 12px;
}
.reward-item {
  display: inline-block;
  border-bottom: 1px solid #999;
  padding: 2px 4px;
  margin: 0 2px 2px 0;
}
.wrapper {
  height: 100%;
  user-select: none;
}
.content {
  height: 100%;
  width: 1920px;
}
.index {
  flex-flow: column wrap;
  align-items: center;
  font-size: 1.1rem;
}
.disable .index {
  align-content: center;
}
.clock > .el-carousel__container {
  height: initial;
}
.clock > .el-carousel__container::before {
  content: "";
  display: block;
  padding-top: 38.66666667%;
}
.clock .cetus,
.clock .fortuna,
.clock .earth {
  background-size: 100%;
  background-repeat: no-repeat;
}
.clock .cetus.day {
  background-image: url(/img/eidolon-day.jpg);
}
.clock .cetus.night {
  background-image: url(/img/eidolon-night.jpg);
}
.clock .fortuna.day {
  background-image: url(/img/fortuna-day.jpg);
}
.clock .fortuna.night {
  background-image: url(/img/fortuna-night.jpg);
}
.clock .earth.day {
  background-image: url(/img/earth-day.jpg);
}
.clock .earth.night {
  background-image: url(/img/earth-night.jpg);
}
.clock-body {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.clock-body .title {
  font-size: calc(4vw - 2px);
  text-align: center;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
.clock-body .time {
  font-family: SAOUI;
  font-size: calc(11vw - 5px);
  padding: 3vw 0;
  text-align: center;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
}
.index .el-card {
  margin-bottom: 16px;
  border: 0;
}
@media only screen and (min-width: 767px) {
  .clock-body .title {
    font-size: calc(2vw - 2px);
  }
  .clock-body .time {
    padding: calc(1.4vw - 1px) 0;
    font-size: calc(5.2vw - 5px);
  }
  .wrapper {
    overflow: hidden;
  }
  .index {
    height: 100%;
    width: calc(100vw - 80px);
  }
  .index-card ul {
    max-height: calc(100vh - 178px);
    overflow-y: auto;
  }
}
@media only screen and (min-width: 1200px) {
  .clock-body .title {
    font-size: calc(1.3vw - 1px);
  }
  .clock-body .time {
    padding: calc(1vw - 1px) 0;
    font-size: calc(3.5vw - 2.8px);
  }
}
</style>
