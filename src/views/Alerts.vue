<template>
  <div class="wrapper alerts-container" ref="wrapper" :class="{disable: !scrollEnable}">
    <div class="content" ref="content" :style="{ width: scrollWidth ? scrollWidth + 'px' : '100%' }">
      <el-row :gutter="20" class="index" type="flex">
        <!-- 时间 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="index-clock" :body-style="{ padding: '0px' }">
            <el-carousel :autoplay="false" class="clock no-invert">
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
              <el-carousel-item class="cambion" :class="[cambionTime.isDay ? 'day' : 'night']">
                <div class="clock-body">
                  <div class="block">
                    <div class="time">{{cambionTime.text}}</div>
                    <div class="title">{{$t("time.cambion")}} - {{cambionTime.phase}}</div>
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
             --><WfIcon :type="sortie.faction"/> {{sortie.boss}}<!--
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
        <!-- S船 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="sentientOutposts">
          <el-card class="index-card sentientOutposts">
            <h3 slot="header"><WfIcon type="sentient" shadow/> {{$t("alerting.sentientOutposts")}}</h3>
            <ul>
              <li v-if="sentientOutposts.active">
                <div class="info">
                  <div class="mission">{{sentientOutposts.mission.type || "???"}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <WfIcon :type="sentientOutposts.mission.faction"/> {{sentientOutposts.mission.node}}
                  </div>
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(sentientOutposts.activation, 0, 10800)}}</div>
                </div>
              </li>
              <li v-else>
                <div class="info">
                  <div class="mission">{{$t("alerting.inactive")}}</div>
                </div>
                <div class="misc">
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(sentientOutposts.activation, 0, 10800)}}</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 仲裁 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="arbitration">
          <el-card class="index-card arbitration">
            <h3 slot="header"><WfIcon type="arbitration" shadow/> {{$t("alerting.arbitration")}}</h3>
            <ul>
              <li>
                <div class="info">
                  <div class="mission">{{arbitration.type}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <WfIcon :type="arbitration.enemy"/> {{arbitration.node}}
                  </div>
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(arbitration.expiry)}}</div>
                </div>
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
                    <WfIcon :type="v.mission.faction"/> {{v.mission.node}}
                  </div>
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(v.expiry)}}</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 电波 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="nightwave && nightwave.activeChallenges.length > 0">
          <el-card class="index-card nightwave">
            <h3 slot="header"><WfIcon type="radio" shadow/> {{$t("alerting.nightwave")}}</h3>
            <ul>
              <li v-for="(v, i) in nightwave.activeChallenges" :key="i">
                <div class="info">
                  <div class="title">{{v.title}}</div>
                  <div class="desc">{{v.desc}}</div>
                  <div class="reward">{{v.reputation}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <div class="mission">{{v.type}}</div>
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
        <!-- 赤毒 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="kuva.length > 0">
          <el-card class="index-card kuva">
            <h3 slot="header"><WfIcon type="kuva" shadow/> {{$t("alerting.kuva")}}</h3>
            <ul>
              <li v-for="(v, i) in kuva" :key="i">
                <div class="info">
                  <div class="mission">{{v.type}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <WfIcon :type="v.enemy"/> {{v.node}}
                  </div>
                  <div class="time">{{$t("alerting.remaining")}}: {{renderTime(v.expiry)}}</div>
                </div>
              </li>
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
                    <WfIcon :type="v.enemy"/> {{v.node}}
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
                    <WfIcon :type="v.attackingFaction"/>
                    {{v.attackerReward.itemString || '-'}}
                  </div>
                  <div class="reward">
                    <WfIcon :type="v.defendingFaction"/>
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
        <!-- 火卫二赏金 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="entrati.length > 0">
          <el-card class="index-card entrati">
            <h3 slot="header"><WfIcon type="entrati" shadow/> {{$t("alerting.entrati")}}</h3>
            <ul>
              <li v-for="(v, i) in entrati" :key="i">
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
import BScroll from "better-scroll";
import { WorldStat, Sortie, News, Fissure, Invasion, Job, VoidTrader, Alert, Nightwave, Kuva, Arbitration, SentientOutpost } from "@/warframe/worldstat";
import { CetusTime, FortunaTime, CambionTime, EarthTime, SentientTime } from "@/warframe/gametime";
import { Getter, Action } from "vuex-class";
import "../less/alert.less";

interface WarframeTime {
  isDay: boolean;
  phase: string;
  text: string;
}
@Component
export default class Alerts extends Vue {
  cetusTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" };
  fortunaTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" };
  cambionTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" };
  earthTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" };
  sentientTime = { active: true, text: "00:00" };
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
  entrati: Job[] = [];
  voidTrader: VoidTrader = null;
  nightwave: Nightwave = null;
  kuva: Kuva[] = [];
  arbitration: Arbitration = null;
  sentientOutposts: SentientOutpost = null;

  get wrapper() {
    return this.$refs.wrapper as HTMLDivElement;
  }

  renderTime(time: string, offset?: number, period?: number) {
    let sec = ~~(Date.parse(time) / 1e3) - this.seconds;
    if (offset) sec += offset;
    if (period) while (sec < 0) sec += period;
    if (sec < 0) return "00:00:00";
    let min = ~~(sec / 60);
    let hou = ~~(min / 60);
    let day = ~~(hou / 24);
    hou = hou % 24;
    min = min % 60;
    sec = sec % 60;
    return `${day !== 0 ? day + ":" : ""}${hou < 10 ? "0" + hou : hou}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }

  @Getter("platform") platform: string;

  // === 事件处理 ===
  @Watch("$route")
  resize() {
    if (document.documentElement.clientWidth < 767) {
      this.scrollWidth = 0;
    } else {
      // 计算宽度
      let ls = document.querySelectorAll(".index > .el-col") as any,
        lastRect: DOMRect = null,
        width = 0;
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
  scrollHorizontally(e: MouseEvent) {
    e.preventDefault();
    var delta = Math.max(-1, Math.min(1, e["wheelDelta"] || -e.detail));
    const width = document.querySelector("#app > section > main > div.wrapper.alerts-container").querySelector(".index-card.sortie").clientWidth;
    this.scroll.scrollBy(delta * (width + 20), 0, 300);
  }
  // === 生命周期钩子 ===
  updated() {
    this.resize();
  }
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper as any, {
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
        eventPassthrough: "vertical",
      });
      this.scrollWidth = 0;
      window.addEventListener("resize", this.resize);

      const w = this.wrapper;
      // IE9, Chrome, Safari, Opera
      w.addEventListener("mousewheel", this.scrollHorizontally, false);
      // Firefox
      w.addEventListener("DOMMouseScroll", this.scrollHorizontally, false);
    });
  }
  beforeMount() {
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000) as any;
    this.updateStat();
    this.statID = setInterval((_) => this.updating || this.updateStat(), 6e4) as any;
  }
  beforeDestroy() {
    clearInterval(this.timerID);
    clearInterval(this.statID);
    window.removeEventListener("resize", this.resize);
  }
  updateStat() {
    this.updating = true;
    this.stat.platform = this.platform;
    this.stat
      .fetch()
      .then(() => {
        this.updating = false;
        this.sortie = this.stat.sortie;
        this.alerts = this.stat.alerts;
        this.news = this.stat.news;
        this.fissures = this.stat.fissures;
        this.invasions = this.stat.invasions;
        this.ostrons = this.stat.ostrons;
        this.solarisUnited = this.stat.solarisUnited;
        this.entrati = this.stat.entrati;
        this.voidTrader = this.stat.voidTrader;
        this.nightwave = this.stat.nightwave;
        this.kuva = this.stat.kuva || [];
        this.arbitration = this.stat.arbitration;
        this.sentientOutposts = this.stat.sentientOutposts;
        CetusTime.calibration(this.stat.cetusCycle.expiry, this.stat.cetusCycle.isDay);
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => this.updateStat(), 3e3);
      });
  }
  updateTime() {
    this.seconds = ~~(Date.now() / 1e3);
    this.cetusTime = { isDay: CetusTime.isDay, phase: CetusTime.phaseText, text: CetusTime.text };
    this.fortunaTime = { isDay: FortunaTime.isDay, phase: FortunaTime.phaseText, text: FortunaTime.text };
    this.cambionTime = { isDay: CambionTime.isDay, phase: CambionTime.phaseText, text: CambionTime.text };
    this.earthTime = { isDay: EarthTime.isDay, phase: EarthTime.phaseText, text: EarthTime.text };
    this.sentientTime = { active: SentientTime.isActive, text: SentientTime.text };
  }
}
</script>
