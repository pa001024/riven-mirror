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
                    <div class="time">
                      {{cetusTime.text}}
                    </div>
                    <div class="title">
                      希图斯 {{cetusTime.phase}}
                    </div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item class="earth" :class="[earthTime.isDay ? 'day' : 'night']">
                <div class="clock-body">
                  <div class="block">
                    <div class="time">
                      {{earthTime.text}}
                    </div>
                    <div class="title">
                      地球 {{earthTime.phase}}
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-col>
        <!-- 突击 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="sortie.id">
          <el-card class="index-card sortie">
            <h3 slot="header"><i class="wf-icon-sortie"></i> {{i18n.sortie}}</h3>
            <ul>
              <div class="sortie-info">
                <i :class="['wf-icon-' + sortie.faction.toLowerCase()]"></i> {{sortie.boss}}
              </div>
              <div class="time">{{i18n.remaining}}: {{renderTime(sortie.expiry)}}</div>
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
            <h3 slot="header"><i class="wf-icon-alert"></i> {{i18n.alerts}}</h3>
            <ul>
              <li v-for="(v, i) in alerts" :key="i">
                <div class="info">
                  <div class="mission">{{v.mission.type}}</div>
                  <div class="reward">{{v.mission.reward.items.join(" + ")}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <i :class="['wf-icon-' + v.mission.faction.toLowerCase()]"></i> {{v.mission.node}}
                  </div>
                  <div class="time">{{i18n.remaining}}: {{renderTime(v.expiry)}}</div>
                </div>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 新闻 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="news.length > 0">
          <el-card class="index-card news">
            <h3 slot="header"><i class="wf-icon-earth"></i> {{i18n.news}}</h3>
            <ul>
              <li v-for="(v, i) in news" :key="i">
                <i class="el-icon-caret-right"></i>
                <a :href="v.link" target="_blank">{{v.message}}</a>
              </li>
            </ul>
          </el-card>
        </el-col>
        <!-- 网站信息 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="index-card info">
            <h3 slot="header">公告</h3>
            <ul>
              <li>内测群号: 165371868</li>
              <li>←功能菜单(手机的话是在右上角)</li>
              <li style="color:grey">注: 紫卡截图请不要让鼠标挡住字 最好是只截文字部分</li>
              <li>更多功能正在开发中~ 敬请期待</li>
            </ul>
          </el-card>
        </el-col>
        <!-- 裂缝 -->
        <el-col :xs="24" :sm="12" :lg="8" v-if="fissures.length > 0">
          <el-card class="index-card fissure">
            <h3 slot="header"><i class="wf-icon-fissure"></i> {{i18n.fissures}}</h3>
            <ul>
              <li v-for="(v, i) in fissures" :key="i">
                <div class="info">
                  <div class="tier">{{v.tier}}</div>
                  <div class="mission">{{v.missionType}}</div>
                </div>
                <div class="misc">
                  <div class="node">
                    <i :class="['wf-icon-' + v.enemy.toLowerCase()]"></i> {{v.node}}
                  </div>
                  <div class="time">{{i18n.remaining}}: {{renderTime(v.expiry)}}</div>
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
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { CetusTime, EarthTime, WorldStat, Translator, Sortie, Alert, News, Fissure } from "@/warframe";
import BScroll from 'better-scroll';
interface WarframeTime {
  isDay: boolean
  phase: string
  text: string
}
@Component
export default class Index extends Vue {
  cetusTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" }
  earthTime: WarframeTime = { isDay: true, phase: "黎明", text: "00:00" }
  timerID: number;
  statID: number;
  stat: WorldStat = new WorldStat();
  showTimeType = "cetus";
  scroll: BScroll;
  seconds = ~~(Date.now() / 1e3);
  scrollWidth = 1920;
  scrollEnable = false;
  i18n = {
    sortie: Translator.getLocText("Sortie"),
    alerts: Translator.getLocText("Alerts"),
    news: Translator.getLocText("News"),
    fissures: Translator.getLocText("Fissures"),
    remaining: Translator.getLocText("Remaining"),
  };
  sortie: Sortie = this.stat.sortie;
  alerts: Alert[] = [];
  news: News[] = [];
  fissures: Fissure[] = [];

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
  resize() {
    if (document.documentElement.clientWidth < 767) {
      this.scrollWidth = 0;
    }
    else {
      let ls = document.querySelectorAll(".index > .el-col"), lastRect: DOMRect, width = -20;
      [].forEach.call(document.querySelectorAll(".index > .el-col"), (el: HTMLElement) => {
        let rect = el.getBoundingClientRect() as DOMRect;
        if (!lastRect || lastRect.x != rect.x) {
          width += rect.width;
          lastRect = rect;
          // console.log(width, rect, lastRect)
        }
      });
      this.scrollWidth = width;
    }
    this.scrollEnable = (this.$refs.wrapper as HTMLElement).getBoundingClientRect().width < this.scrollWidth;
  }
  // === 生命周期钩子 ===
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper as Element, {
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
        eventPassthrough: 'vertical'
      });
      window.addEventListener("resize", this.resize);
      this.resize();
    });
  }
  updated() {
    this.scroll.refresh();
  }
  beforeMount() {
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000);
    this.updateStat();
    this.statID = setInterval(this.updateStat, 6e4);
  }
  beforeDestory() {
    clearInterval(this.timerID);
    clearInterval(this.statID);
    window.removeEventListener("resize", this.resize);
  }
  updateStat() {
    this.stat.fetch().then(() => {
      this.sortie = this.stat.sortie;
      this.alerts = this.stat.alerts;
      this.news = this.stat.news;
      this.fissures = this.stat.fissures;
      this.$nextTick(() => this.resize());
    }).catch(() => setTimeout(() => this.updateStat(), 5e3));
  }
  updateTime() {
    this.seconds = ~~(Date.now() / 1e3);
    this.cetusTime = { isDay: CetusTime.isDay, phase: CetusTime.phaseText, text: CetusTime.text };
    this.earthTime = { isDay: EarthTime.isDay, phase: EarthTime.phaseText, text: EarthTime.text };
  }
}
</script>

<style>
.index-card.news li {
  color: #3d5afe;
  transition: 0.4s ease-out;
}
.index-card.news li + li {
  padding-top: 8px;
}
.index-card.news li:hover {
  color: #7385ec;
}
.index-card.news li a {
  margin-left: 8px;
  text-decoration: none;
  color: #222;
  transition: 0.4s;
}
.index-card.news li a:hover {
  text-decoration: underline;
  color: #3d5afe;
}
.index-card.fissure .mission {
  font-size: 1rem;
  font-weight: normal;
}

.index-card .el-card__body {
  background: #3d5afe;
  padding: 16px;
}
.index-card ul {
  background: #fff;
  border-radius: 8px;
  margin-top: -16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}
.index-card ul li {
  padding: 14px 28px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.index-card .info {
  flex: 1;
}
.index-card .misc {
  text-align: right;
}
.index-card .tier {
  font-size: 1.5rem;
  font-weight: 300;
}
.index-card .mission {
  font-size: 1.5rem;
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
.index-card .el-card__header {
  background: #3d5afe;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);
  border: 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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
.clock .earth {
  background-size: 100%;
  background-repeat: no-repeat;
}
.clock .cetus.day {
  background-image: url(/static/images/eidolon-day.jpg);
}
.clock .cetus.night {
  background-image: url(/static/images/eidolon-night.jpg);
}
.clock .earth.day {
  background-image: url(/static/images/eidolon-day.jpg);
}
.clock .earth.night {
  background-image: url(/static/images/eidolon-night.jpg);
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
