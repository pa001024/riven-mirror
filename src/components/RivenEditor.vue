<template>
  <div class="rivenedit">
    <el-row :gutter="20">

    </el-row>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod } from "@/warframe";
import qrcode from "@/components/QRCode";

/** 倒计时 */
function countDown(sec = 3, tickCallback: (sec: number) => void) {
  return new Promise<void>((resolve, reject) => {
    let count = sec;
    tickCallback(count);
    let timer = setInterval(() => {
      tickCallback(--count);
      if (count <= 0) {
        clearInterval(timer);
        resolve();
      }
    }, 1e3);
    return
  })
}

@Component({
  components: { qrcode }
})
export default class Simulator extends Vue {
  mod = new RivenMod();
  newMod: RivenMod = null;
  openCountdown = 0;
  refreshCountdown = 0;
  hasChoosen = true;
  newType = "";
  types = { "Rifle": "步枪", "Shotgun": "霰弹枪", "Pistol": "手枪", "Melee": "近战" };
  get newTypeString() { return this.types[this.newType] || "随机" }
  // === 事件处理 ===
  newTypeSelect(cmd: string) {
    this.newType = cmd;
  }
  simulatorNew() {
    this.mod = null;
    setTimeout(() => {
      this.mod = new RivenMod();
      this.mod.random(this.newType);
      this.hasChoosen = true;
      localStorage.setItem("simulator", this.mod.qrCodeBase64);
    }, 1e3);

    this.newMod = null;
    countDown(5, v => this.openCountdown = v);
  }
  simulatorRoll() {
    let oldMod = this.mod;
    let newMod = this.mod.reroll();
    this.mod = this.newMod = null;
    setTimeout(() => {
      this.mod = oldMod;
      this.newMod = newMod;
    }, 1e3);
    this.hasChoosen = false;
    countDown(3, v => this.refreshCountdown = v);
  }
  choose(isNew: boolean) {
    if (isNew)
      this.mod = this.newMod;
    this.newMod = null;
    this.hasChoosen = true;
    localStorage.setItem("simulator", this.mod.qrCodeBase64);
  }
  toRiven(mod: RivenMod) {
    window.open("/riven/" + mod.qrCodeBase64);
    // this.$router.push({ name: "ModWithSource", params: { source: mod.qrCodeBase64 } });
  }
  // === 生命周期钩子 ===
  beforeMount() {
    let sto = localStorage.getItem("simulator");
    if (sto)
      this.mod.qrCodeBase64 = sto;
    else
      this.mod.random();
  }
}
</script>
