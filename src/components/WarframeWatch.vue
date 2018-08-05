<template>
  <div class="time-container">
    <div class="time-block">
      <div class="time-header">
        希图斯 {{cetusTime.day?"白天":"夜晚"}}
      </div>
      <div class="time-clock">
        {{cetusTime.text}}
      </div>
    </div>
    <div class="time-block">
      <div class="time-header">
        地球 {{earthTime.day?"白天":"夜晚"}}
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
import { IngameTime } from "../warframe";

interface WarframeTime {
  day: boolean
  text: string
}
@Component
export default class WarframeWatch extends Vue {
  cetusTime: WarframeTime = { day: true, text: "00:00" }
  earthTime: WarframeTime = { day: true, text: "00:00" }
  timerID: any;
  cetus: IngameTime
  earth: IngameTime

  mounted() {
    this.cetus = new IngameTime("cetus");
    this.earth = new IngameTime("earth");
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000);
  }
  beforeDestory() {
    clearInterval(this.timerID);
  }
  updateTime() {
    this.cetusTime = { day: this.cetus.isDay, text: this.cetus.text };
    this.earthTime = { day: this.earth.isDay, text: this.earth.text };
  }
}
</script>

<style scoped>
.time-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 80px;
}
.time-block {
  margin: 0 20px;
  font-size: 10pt;
  display: inline-block;
  vertical-align: middle;
}
</style>
