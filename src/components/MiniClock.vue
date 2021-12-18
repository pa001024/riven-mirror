<template>
  <div class="time-container">
    <el-popover placement="bottom" width="260" trigger="click">
      <div class="reminder-title">{{$t("reminder.title")}}</div>
      <!-- 平原时间提醒模块 -->
      <div class="reminder-list">
        <div v-for="time in cetusFutureTimes" :key="time" @click="addReminder(time)" :class="{active: timeReminder.hasSchedule(time)}">
          <span class="add">
            <i :class="[timeReminder.hasSchedule(time) ? 'el-icon-check' : 'el-icon-plus']"></i>
          </span>
          <span class="time">{{$d(time, "time")}}</span>
          <span class="phase">{{$t("time.night")}}</span>
        </div>
      </div>
      <div class="reminder-setting">
        {{$t("reminder.settingPrefix")}}
        <input style="width:50px;text-align:center;" class="text-input" @change="saveReminder" autocomplete="off" type="text" v-model="timeReminder.minutesInAdvance">
        {{$t("reminder.settingSubfix")}}
      </div>
      <div slot="reference" class="time-block cetus">
        <div class="time-header">
          {{$t("time.cetus")}} {{cetusTime.phase}}
        </div>
        <div class="time-clock">
          {{cetusTime.text}}
        </div>
      </div>
    </el-popover>
    <div class="time-block fortuna">
      <div class="time-header">
        {{$t("time.fortuna")}} {{fortunaTime.phase}}
      </div>
      <div class="time-clock">
        {{fortunaTime.text}}
      </div>
    </div>
    <div class="time-block cambion">
      <div class="time-header">
        {{$t("time.cambion")}} {{cambionTime.phase}}
      </div>
      <div class="time-clock">
        {{cambionTime.text}}
      </div>
    </div>
    <div class="time-block earth">
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
import { Vue, Component, Watch } from "vue-property-decorator";
import { i18n } from "@/i18n";
import Axios from "axios";
import { CetusTime, EarthTime, FortunaTime, CambionTime } from "@/warframe/gametime";
import localStorage from "universal-localstorage";

interface WarframeTime {
  phase: string
  text: string
}
interface Timedown {
  time: number
}
class TimeReminder {
  minutesInAdvance = 5;
  schedules: number[] = [];
  notification: Notification;
  constructor() {
    this.load();
  }
  testSchedule() {
    let now = Date.now();
    let needClose = true;
    this.schedules = this.schedules.filter(v => v > now);
    this.schedules.forEach(v => {
      if (v - now > 0 && v - now <= this.minutesInAdvance * 6e4) {
        if (!this.notification) {
          this.notification = new Notification(i18n.t("reminder.notificationTitle") as string, {
            body: i18n.t("reminder.notificationBody", [this.minutesInAdvance]) as string,
            icon: "https://cdn.riven.im/img/eidolon-night.m.jpg"
          });
          this.notification.onclick = () => {
            this.removeSchedule(v);
            this.notification.close();
            this.notification = null;
          };
        }
        needClose = false;
      }
    });
    if (needClose) {
      if (!this.notification) return;
      this.notification.close();
      this.notification = null;
    }
  }
  hasSchedule(time: number) {
    return this.schedules.some(v => Math.abs(v - time) < 2e3);
  }
  addSchedule(time: number) {
    if (!this.hasSchedule(time)) {
      this.schedules.push(time);
      this.save();
    }
    else
      this.removeSchedule(time);
  }
  removeSchedule(time: number) {
    this.schedules = this.schedules.filter(v => Math.abs(v - time) >= 2e3);
    this.save();
  }
  save() {
    localStorage.setItem("reminder.schedules", JSON.stringify(this.schedules));
    localStorage.setItem("reminder.mins", JSON.stringify(this.minutesInAdvance));
  }
  load() {
    this.schedules = JSON.parse(localStorage.getItem("reminder.schedules")) || [];
    this.minutesInAdvance = JSON.parse(localStorage.getItem("reminder.mins")) || 5;
  }
}
@Component
export default class MiniClock extends Vue {
  cetusTime: WarframeTime = { phase: "", text: "00:00" }
  earthTime: WarframeTime = { phase: "", text: "00:00" }
  fortunaTime: WarframeTime = { phase: "", text: "00:00" }
  cambionTime: WarframeTime = { phase: "", text: "00:00" }
  timerID: any;
  timeReminder = new TimeReminder();
  now: number;
  cetusFutureTimes = CetusTime.futures(5);

  addReminder(time: number) {
    Notification.requestPermission((perm) => {
      if (perm === "denied")
        this.$message.error(this.$t("reminder.permissionDenied") as string);
      else {
        this.timeReminder.addSchedule(time);
      }
    })
  }
  saveReminder() {
    this.timeReminder.save();
  }
  mounted() {
    this.updateTime();
    this.timerID = setInterval(this.updateTime, 1000);

    if (this.$route.name != "Alerts")
      Axios.get("https://api.warframestat.us/pc/cetusCycle", { timeout: 30e3 })
        .then(data => {
          CetusTime.calibration(data.data.expiry, data.data.isDay);
        });
  }
  beforeDestroy() {
    clearInterval(this.timerID);
  }
  updateTime() {
    this.cetusTime = { phase: CetusTime.phaseText, text: CetusTime.text };
    this.earthTime = { phase: EarthTime.phaseText, text: EarthTime.text };
    this.fortunaTime = { phase: FortunaTime.phaseText, text: FortunaTime.text };
    this.cambionTime = { phase: CambionTime.phaseText, text: CambionTime.text };
    this.timeReminder.testSchedule();
    this.cetusFutureTimes = CetusTime.futures(5);
  }
}
</script>

<style>
input.text-input[type="text"] {
  border: 0;
  outline: 0;
  border-bottom: 1px solid;
  transition: 0.4s;
}
input.text-input[type="text"]:focus,
input.text-input[type="text"]:active {
  color: #6199ff;
}
.reminder-setting {
  margin: 8px;
  font-size: 1.1em;
  text-align: center;
}
.reminder-title {
  text-align: center;
  font-size: 1em;
  padding: 12px 8px;
  background: #3d5afe;
  color: #fff;
  margin-bottom: 12px;
  border-radius: 4px;
  text-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);
}
.reminder-list {
  font-size: 1.3em;
  letter-spacing: 1px;
  text-align: center;
}
.reminder-list li {
  cursor: pointer;
  transition: 0.5s;
  padding: 4px 8px;
  font-family: SAOUI, "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial,
    sans-serif;
}
.reminder-list li.active {
  color: #6199ff;
}
.reminder-list li:hover {
  background: #d9e6ff;
}
.reminder-list .phase {
  font-size: 14px;
}
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
.time-block.cetus {
  cursor: pointer;
}
.time-clock {
  font-family: SAOUI;
  font-size: 16px;
  letter-spacing: 1px;
}
</style>
