<template>
  <div class="time-container">
    <div class="time-block">
      <div class="time-header">
        {{$t("time.cetus")}} {{cetusTime.phase}}
      </div>
      <div class="time-clock">
        {{cetusTime.text}}
      </div>
    </div>
    <div class="time-block">
      <div class="time-header">
        {{$t("time.earth")}} {{earthTime.phase}}
      </div>
      <div class="time-clock">
        {{earthTime.text}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch } from "vue-property-decorator";
import { EarthTime, CetusTime } from "../warframe";

interface WarframeTime {
  phase: string
  text: string
}
@Component
export default class MiniClock extends Vue {
  cetusTime: WarframeTime = { phase: "黎明", text: "00:00" }
  earthTime: WarframeTime = { phase: "黎明", text: "00:00" }
  timerID: any;

  mounted() {
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000);
  }
  beforeDestory() {
    clearInterval(this.timerID);
  }
  updateTime() {
    this.cetusTime = { phase: CetusTime.phaseText, text: CetusTime.text };
    this.earthTime = { phase: EarthTime.phaseText, text: EarthTime.text };
  }
}
</script>

<style>
.time-container {
  height: 60px;
  display: flex;
  align-items: center;
}
.time-block {
  margin: 0 20px;
  font-size: 10pt;
  display: inline-block;
  text-align: center;
}
.time-clock {
  font-family: SAOUI;
  font-size: 16px;
  letter-spacing: 1px;
}
</style>
