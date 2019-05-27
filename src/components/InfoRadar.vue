<template>
  <div class="info-radar" ref="chart">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

import echarts from "echarts/lib/echarts";
// 引入雷达图
import "echarts/lib/chart/radar";
// 设置echarts主题
import "@/echart.theme";

@Component({ components: {} })
export default class InfoRadar extends Vue {
  @Prop() val: [string, number][];

  get radarData() {
    const series = [
      {
        name: this.$t("radar.name"),
        type: "radar",
        itemStyle: {
          normal: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)"
          },
          emphasis: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)"
          }
        },
        data: [
          {
            value: this.val.map(v => v[1]),
            name: "1",
            areaStyle: {
              normal: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            }
          },
        ]
      }
    ] as any[];

    const options = {
      radar: [
        {
          indicator: this.val.map(v => ({ text: v[0] }))
        }
      ],
      series
    };
    return options;
  }

  @Watch("val")
  reload() {
    if (!this.myChart) return;
    this.myChart.setOption(this.radarData);
  }
  myChart: any;
  get chart() {
    return this.$refs.chart as Element;
  }

  mounted() {
    this.$nextTick(() => {
      this.myChart = echarts.init(this.chart, "rivenmirror");
      this.myChart.setOption({
        radar: [
          {
            center: ["50%", "50%"],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            name: {
              // formatter: "【{value}】",
              textStyle: {
                color: "#72ACD1"
              }
            },
            splitArea: {
              areaStyle: {
                color: ["rgba(114, 172, 209, 0.2)", "rgba(114, 172, 209, 0.4)", "rgba(114, 172, 209, 0.6)", "rgba(114, 172, 209, 0.8)", "rgba(114, 172, 209, 1)"],
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.5)"
              }
            }
          }
        ]
      });
      this.myChart.setOption(this.radarData);
    });
  }
}
</script>
