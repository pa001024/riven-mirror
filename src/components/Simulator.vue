<template>
  <div class="simulator">
    <el-row :gutter="20">
      <el-row type="flex" justify="center">
        <el-col :sm="24" :md="12" :lg="8" style="padding:0 11px;">
          <el-button class="simulator-new" type="primary" size="medium" :disabled="openCountdown > 0" icon="el-icon-plus" @click="simulatorNew">{{openCountdown > 0 ? `请等待${openCountdown}秒` : '开卡'}}</el-button>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" style="padding:0 11px;">
          <el-button class="simulator-roll" type="primary" size="medium" :disabled="refreshCountdown > 0 || !hasChoosen" icon="el-icon-refresh" @click="simulatorRoll">{{refreshCountdown > 0 ? `请等待${refreshCountdown}秒` : '循环'}}</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20" justify="center">
        <!-- 老卡 -->
        <transition name="el-zoom-in-center">
          <el-col :sm="24" :md="12" :lg="8" v-if="mod">
            <div v-show="mod.name" class="mod-display">
              <el-card class="mod-props-box">
                <div slot="header" class="mod-name">
                  <span>{{mod.name}} {{mod.subfix}}</span>
                </div>
                <div v-for="prop in mod.properties" :key="prop.name" class="mod-prop" :class="{'negative-prop':prop.isNegative}">
                  {{prop.displayValue}} {{prop.name}}
                </div>
                <div class="mod-extra">
                  <el-tag size="medium" class="mod-rank">段位: {{mod.rank}}</el-tag>
                  <el-tag size="medium" class="mod-recycleTimes">循环: {{mod.recycleTimes}}</el-tag>
                </div>
                <div class="mod-qrcode">
                  <el-popover placement="bottom" trigger="hover">
                    <div style="text-align:center;">
                      <qrcode :value="mod.qrCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                    </div>
                    <div style="text-align:center;">
                      手机扫描或直接粘贴
                    </div>
                    <el-button slot="reference" icon="el-icon-share" @click="ttoRiven(mod)">分析</el-button>
                  </el-popover>
                  <el-button class="simulator-choose" type="primary" icon="el-icon-check" v-if="newMod" @click="choose(false)">确认选择</el-button>
                </div>
              </el-card>
            </div>
          </el-col>
        </transition>
        <!-- 新卡 -->
        <transition name="el-zoom-in-center">
          <el-col :sm="24" :md="12" :lg="8" v-if="newMod">
            <div class="mod-display">
              <el-card class="mod-props-box">
                <div slot="header" class="mod-name">
                  <span>{{newMod.name}} {{newMod.subfix}}</span>
                </div>
                <div v-for="prop in newMod.properties" :key="prop.name" class="mod-prop" :class="{'negative-prop':prop.isNegative}">
                  {{prop.displayValue}} {{prop.name}}
                </div>
                <div class="mod-extra">
                  <el-tag size="medium" class="mod-rank">段位: {{newMod.rank}}</el-tag>
                  <el-tag size="medium" class="mod-recycleTimes">循环: {{newMod.recycleTimes}}</el-tag>
                </div>
                <div class="mod-qrcode">
                  <el-popover placement="bottom" trigger="hover">
                    <div style="text-align:center;">
                      <qrcode :value="newMod.qrCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                    </div>
                    <div style="text-align:center;">
                      手机扫描或直接粘贴
                    </div>
                    <el-button slot="reference" icon="el-icon-share" @click="toRiven(newMod)">分析</el-button>
                  </el-popover>
                  <el-button class="simulator-choose" type="primary" icon="el-icon-check" v-if="newMod" @click="choose(true)">确认选择</el-button>
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
  // === 事件处理 ===
  simulatorNew() {
    this.mod = null;
    setTimeout(() => {
      this.mod = new RivenMod();
      this.mod.random();
    }, 1e3);

    this.newMod = null;
    countDown(5, v => this.openCountdown = v);
    localStorage.setItem("simulator", this.mod.qrCodeBase64);
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
    this.$router.push({ name: "ModWithSource", params: { source: this.mod.qrCodeBase64 } });
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
.simulator-new,
.simulator-roll,
.simulator-choose {
  width: 100%;
  background-color: #6199ff;
  border-color: #6199ff;
}
.simulator-choose {
  margin-top: 12px;
}
.simulator .mod-prop {
  text-align: center;
  line-height: 1.5;
}
</style>
