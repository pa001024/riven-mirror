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
        <div class="item" v-for="(text, sec) in timelineText" :key="sec">
          <div class="time">{{text.time / 1e3}}s</div>
          <div class="hit">{{text.ammo ? `${(text.hit/text.ammo).toFixed()} x ${text.ammo}` : $t("timeline.reload")}}</div>
          <div class="dot" v-if="hasDoT">{{text.dot}}</div>
          <div class="hp">{{text.hp}}</div>
          <div class="ar" v-if="hasArmorChange">{{text.ar}}</div>
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
  visType = "chart";
  hasDoT = false;
  hasArmorChange = false;

  get timelineText() {
    let rst = [];
    let lastHitHead = 0, ammo = 0;
    this.hasDoT = this.hasArmorChange = false;
    this.timeline.forEach((v, i) => {
      ammo += v.ammo;
      if (v.isDoT) {
        let hit = this.timeline[i - 1];
        let dot = ~~(hit.health - v.health);
        rst.push({
          time: v.ms,
          hit: ~~(this.timeline[lastHitHead].health - hit.health),
          ammo,
          dot,
          hp: ~~v.health,
          ar: ~~v.armor,
        });
        if (v.armor != this.timeline[0].armor) this.hasArmorChange = true;
        if (dot > 0) this.hasDoT = true;
        lastHitHead = i;
        ammo = 0;
      } else if (i === this.timeline.length - 1) {
        rst.push({
          time: v.ms,
          hit: ~~(this.timeline[lastHitHead].health - v.health),
          ammo,
          dot: 0,
          hp: 0,
          ar: 0,
        });
      }
    });
    return rst;
  }

  get chart() { return this.$refs.chart as Element; }

  get timelineData() {
    let tm = [], hp = [], dd = [], pd = [], ar = [];
    let lastHitHead = 0, ammo = 0;
    this.hasDoT = this.hasArmorChange = false;
    this.timeline.forEach((v, i) => {
      ammo += v.ammo;
      if (v.isDoT) {
        let hit = this.timeline[i - 1];
        let dot = ~~(hit.health - v.health);
        tm.push(v.ms / 1e3 + "s");
        hp.push(~~v.health);
        ar.push(~~(v.armor));
        dd.push(~~(this.timeline[lastHitHead].health - hit.health) || '-');
        pd.push(dot || '-');
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

<style>
.timeline-chart {
  height: 360px;
  width: 100%;
}
.timeline-text {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding: 0 2px;
}
.timeline-text .item {
  flex: 1;
}
.timeline-text .item:hover {
  background: #ebf1fc;
  transition: all 0.4s;
}
.timeline-text .item:first-child > * {
  background: #d9e6ff;
}
.timeline-text .item > * {
  height: 1.5em;
  padding: 4px;
  margin: 2px 0;
  font-size: 1em;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #89b2fd;
  overflow: hidden;
  white-space: nowrap;
}
</style>
