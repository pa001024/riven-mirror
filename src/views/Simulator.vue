<template>
  <div class="simulator">
    <el-row :gutter="20">
      <el-row type="flex" justify="center">
        <el-col :sm="24" :md="12" :lg="8" style="padding:0 11px;">
          <el-dropdown class="simulator-new" :class="{ 'is-disabled': openCountdown > 0 }"  size="medium" split-button type="primary" @click="simulatorNew" @command="newTypeSelect" trigger="click">
            <i class="el-icon-plus"></i> {{openCountdown > 0 ? $t("simulator.pleaseWait",[openCountdown]) :  $t("simulator.open",[$t(`simulator.${newType.toLowerCase() || "random"}`)])}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="">{{$t("simulator.random")}}</el-dropdown-item>
              <el-dropdown-item command="Rifle">{{$t("simulator.rifle")}}</el-dropdown-item>
              <el-dropdown-item command="Shotgun">{{$t("simulator.shotgun")}}</el-dropdown-item>
              <el-dropdown-item command="Pistol">{{$t("simulator.pistol")}}</el-dropdown-item>
              <el-dropdown-item command="Melee">{{$t("simulator.melee")}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" style="padding:0 11px;">
          <el-button class="simulator-roll" type="primary" size="medium" :disabled="refreshCountdown > 0 || !hasChoosen" icon="el-icon-refresh" @click="simulatorRoll">{{refreshCountdown > 0 ? $t("simulator.pleaseWait",[refreshCountdown]) : $t("simulator.recycle")}}</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20" justify="center">
        <!-- 老卡 -->
        <transition name="el-zoom-in-center">
          <el-col :sm="24" :md="12" :lg="8" v-if="mod">
            <div v-show="mod.name" class="mod-display">
              <el-card class="mod-props-box">
                <div slot="header" class="mod-name">
                  <span>{{$t("zh") ? mod.name : mod.id}} {{mod.subfix}}</span>
                </div>
                <div v-for="prop in mod.properties" :key="prop.name" class="mod-prop" :class="{'negative-prop':prop.isNegative}">
                  {{$t("prop.fullName." + prop.id, [prop.displayValue])}}
                </div>
                <div class="mod-extra">
                  <el-tag size="medium" class="mod-rank">{{$t("riven.rank")}}{{mod.rank}}</el-tag>
                  <el-tag size="medium" class="mod-recycleTimes">{{$t("riven.recycle")}}{{mod.recycleTimes}}</el-tag>
                </div>
                <div class="mod-qrcode">
                  <el-popover placement="bottom" trigger="hover">
                    <div style="text-align:center;">
                      <qrcode :value="mod.qrCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                    </div>
                    <div style="text-align:center;">
                      {{$t("riven.sharetip")}}
                    </div>
                    <el-button slot="reference" icon="el-icon-search" @click="toRiven(mod)">{{$t("simulator.analyze")}}</el-button>
                  </el-popover>
                  <el-button class="simulator-choose" type="primary" icon="el-icon-check" v-if="newMod" @click="choose(false)">{{$t("simulator.choose")}}</el-button>
                </div>
              </el-card>
            </div>
          </el-col>
        </transition>
        <!-- 新卡 -->
        <transition name="el-zoom-in-center">
          <el-col :sm="24" :md="12" :lg="8" v-if="newMod && !hasChoosen">
            <div class="mod-display">
              <el-card class="mod-props-box">
                <div slot="header" class="mod-name">
                  <span>{{$t("zh") ? newMod.name : newMod.id}} {{newMod.subfix}}</span>
                </div>
                <div v-for="prop in newMod.properties" :key="prop.name" class="mod-prop" :class="{'negative-prop':prop.isNegative}">
                  {{$t("prop.fullName." + prop.id, [prop.displayValue])}}
                </div>
                <div class="mod-extra">
                  <el-tag size="medium" class="mod-rank">{{$t("riven.rank")}}{{newMod.rank}}</el-tag>
                  <el-tag size="medium" class="mod-recycleTimes">{{$t("riven.recycle")}}{{newMod.recycleTimes}}</el-tag>
                </div>
                <div class="mod-qrcode">
                  <el-popover placement="bottom" trigger="hover">
                    <div style="text-align:center;">
                      <qrcode :value="newMod.qrCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                    </div>
                    <div style="text-align:center;">
                      {{$t("riven.sharetip")}}
                    </div>
                    <el-button slot="reference" icon="el-icon-search" @click="toRiven(newMod)">{{$t("simulator.analyze")}}</el-button>
                  </el-popover>
                  <el-button class="simulator-choose" type="primary" icon="el-icon-check" v-if="newMod" @click="choose(true)">{{$t("simulator.choose")}}</el-button>
                </div>
              </el-card>
            </div>
          </el-col>
        </transition>
      </el-row>
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
<style>
.simulator-new {
  display: block;
  width: 100%;
}
.simulator-new.el-dropdown .el-button-group {
  display: inline-flex;
  width: 100%;
}
.simulator-new button:first-child {
  flex: 1;
}
.simulator-new.is-disabled .el-button,
.simulator-new.is-disabled .el-button:focus,
.simulator-new.is-disabled .el-button:hover {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
  cursor: not-allowed;
  background-image: none;
  pointer-events: none;
}
.simulator-roll,
.simulator-choose {
  width: 100%;
}
.simulator-choose {
  margin-top: 12px;
}
.simulator .mod-prop {
  text-align: center;
  line-height: 1.5;
}
</style>
