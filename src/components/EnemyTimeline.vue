<template>
  <el-tabs class="timeline-tabs" v-model="visType">
    <el-tab-pane name="chart">
      <span slot="label" class="enemy-tablabel">{{$t("timeline.chart")}}</span>
      <!-- echart 图表 -->
      <div class="timeline-chart" ref="chart">
      </div>
    </el-tab-pane>
    <el-tab-pane name="table">
      <span slot="label" class="enemy-tablabel">{{$t("timeline.table")}}</span>
      <div class="timeline-text">
        <div class="item">
          <div class="time">{{$t("timeline.time")}}</div>
          <div class="hit">{{$t("timeline.hit")}} x {{$t("timeline.ammo")}}</div>
          <div class="dot" v-if="hasDoT">{{$t("timeline.dot")}}</div>
          <div class="hp">{{$t("timeline.hp")}}</div>
          <div class="ar" v-if="hasArmorChange">{{$t("timeline.ar")}}</div>
        </div>
        <div class="item" v-for="(text, sec) in timelineTable" :key="sec">
          <div class="time" v-text="text.time"></div>
          <div class="hit" v-text="text.hit"></div>
          <div class="dot" v-text="text.dot" v-if="hasDoT"></div>
          <div class="hp" v-text="text.hp"></div>
          <div class="ar" v-text="text.ar" v-if="hasArmorChange"></div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import { Vue, Component, Watch, Prop } from "vue-property-decorator";

import echarts from "echarts/lib/echarts";
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import { EnemyTimelineState } from "@/warframe/codex";

@Component
export default class EnemyTimeline extends Vue {
  @Prop() timeline: EnemyTimelineState[];
  @Prop({ type: Boolean }) perBullet: boolean;
  visType = "chart";
  hasDoT = false;
  hasArmorChange = false;
  useTable = false;

  get timelineText() {
    let rst = [];
    let lastHitHead = 0, ammo = 0;
    this.hasDoT = this.hasArmorChange = false;
    this.timeline.forEach((v, i) => {
      ammo += v.ammo;
      if (v.isDoT) {
        let hit = this.timeline[i - 1];
        let dot = ~~(hit.health - v.health);
        if (!this.perBullet || dot) {
          rst.push({
            time: v.ms,
            hit: this.perBullet ? 0 : ~~(this.timeline[lastHitHead].health - hit.health),
            ammo: this.perBullet ? 0 : ammo,
            dot,
            hp: ~~v.health,
            ar: ~~v.armor,
          });
        }
        if (v.armor != this.timeline[0].armor) this.hasArmorChange = true;
        if (dot > 0) this.hasDoT = true;
        lastHitHead = i;
        ammo = 0;
        console.log("dot", hit, dot)
      } else if (this.perBullet || i === this.timeline.length - 1) {
        let hit = ~~(this.timeline[this.perBullet ? Math.max(i - 1, 0) : lastHitHead].health - v.health);
        if (hit) {
          rst.push({
            time: v.ms,
            hit,
            ammo: this.perBullet ? 1 : ammo,
            dot: 0,
            hp: ~~v.health,
            ar: ~~v.armor,
          });
          console.log("HIT", hit)
        }
      }
    });
    return rst
  }

  get timelineTable() {
    return this.timelineText.map(v => ({
      time: `${+(v.time / 1e3).toFixed(1)}s`,
      hit: v.ammo ? `${(v.hit / v.ammo).toFixed()} x ${v.ammo}` : this.$t("timeline.reload"),
      dot: v.dot,
      hp: v.hp,
      ar: v.ar,
    }));
  }

  get chart() { return this.$refs.chart as Element; }

  get timelineData() {
    let tm = [], hp = [], dd = [], pd = [], ar = [];
    let lastHitHead = 0, ammo = 0;
    this.hasDoT = this.hasArmorChange = false;
    this.timeline.forEach((v, i) => {
      ammo += v.ammo;
      if (v.isDoT || this.perBullet) {
        let lastHealth = this.timeline[i - 1] ? this.timeline[i - 1].health : v.health;
        let dot = ~~(lastHealth - v.health);
        tm.push(v.ms / 1e3 + "s");
        hp.push(~~v.health);
        ar.push(~~(v.armor));
        if (v.isDoT) {
          dd.push(~~(this.timeline[lastHitHead].health - lastHealth) || '-');
          pd.push(dot || '-');
        } else {
          dd.push(dot || '-');
          pd.push('-');
        }
        if (v.armor != this.timeline[0].armor) this.hasArmorChange = true;
        if (dot > 0) this.hasDoT = true;
        lastHitHead = i;
        ammo = 0;
      } else if (i === this.timeline.length - 1) {
        tm.push(v.ms / 1e3 + "s");
        hp.push(0);
        ar.push(~~(v.armor));
        dd.push(~~(this.timeline[lastHitHead].health - v.health) || '-');
        pd.push('-');
      }
    });

    let series = [
      {
        name: this.$t("timeline.hp"),
        type: 'bar',
        stack: 'total',
        itemStyle: {
          normal: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          }
        },
        data: hp
      },
      {
        name: this.$t("timeline.dot"),
        type: 'bar',
        stack: 'total',
        label: {
          normal: {
            show: true,
            position: 'bottom'
          }
        },
        data: pd
      },
      {
        name: this.$t("timeline.hit"),
        type: 'bar',
        stack: 'total',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: dd
      }, {
        name: this.$t("timeline.ar"),
        type: 'line',
        data: this.hasArmorChange && ar
      }
    ] as any[];

    let option = {
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: tm
      },
      yAxis: { type: 'value' },
      series
    };
    return option;
  }

  @Watch("timelineData")
  dataChange() {
    if (this.visType !== "chart" || !this.myChart) return;
    this.myChart.setOption(this.timelineData);
  }
  myChart: any;
  mounted() {
    this.$nextTick(() => {
      this.myChart = echarts.init(this.chart, "rivenmirror");
      this.myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        grid: {
          top: '4%',
          left: '0%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
      });
      this.myChart.setOption(this.timelineData);
    });
  }
}

</script>

<style lang="less">
.timeline-chart {
  height: 360px;
  width: 100%;
}
.timeline-text {
  display: flex;
  flex-wrap: wrap;
  border-radius: 2px;
  overflow: hidden;
  .item {
    flex: 1;
  }
  .item:hover {
    background: #ebf1fc;
    transition: all 0.4s;
  }
  .item:first-child > * {
    background: #d9e6ff;
  }
  .item > * {
    height: 1.5em;
    padding: 4px;
    font-size: 1em;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #89b2fd;
    overflow: hidden;
    white-space: nowrap;
  }
}

@media only screen and (max-width: 767px) {
  .timeline-text {
    display: block;
    .item {
      display: flex;
      .time {
        width: 40px;
      }
    }
    .item > *:not(:first-child) {
      flex: 1;
    }
  }
}
</style>
