<template>
  <div class="editor-main">
    <el-row :gutter="20" v-if="id">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{weapon.name}}</span>
            </div>
            <table class="weapon-props">
              <tbody>
                <tr><td>暴击率</td>
                  <td>{{weapon.criticalChances*100}}%</td>
                  <td v-if="weapon.criticalChances!=build.critChance"><i class="el-icon-arrow-right"></i> {{Num(build.critChance*100)}}%</td>
                </tr>
                <tr><td>暴击伤害</td>
                  <td>{{weapon.criticalMultiplier}}x</td>
                  <td v-if="weapon.criticalMultiplier!=build.critMul"><i class="el-icon-arrow-right"></i> {{Num(build.critMul)}}</td>
                </tr>
                <tr><td>攻速</td>
                  <td>{{weapon.fireRate}}</td>
                  <td v-if="weapon.fireRate!=build.fireRate"><i class="el-icon-arrow-right"></i> {{Num(build.fireRate)}}</td>
                </tr>
                <tr><td>触发几率</td>
                  <td>{{weapon.status*100}}%</td>
                  <td v-if="weapon.status!=build.procChance"><i class="el-icon-arrow-right"></i> {{Num(build.procChance*100)}}%</td>
                </tr>
                <tr><td>精确度</td>
                  <td>{{weapon.accuracy}}</td>
                  <td v-if="weapon.accuracy!=build.accuracy"><i class="el-icon-arrow-right"></i> {{Num(build.accuracy)}}</td>
                </tr>
                <tr v-if="weapon.bullets!=1||build.bullets!=1"><td>弹片数</td>
                  <td>{{weapon.bullets}}</td>
                  <td v-if="weapon.bullets!=build.bullets"><i class="el-icon-arrow-right"></i> {{Num(build.bullets)}}</td>
                </tr>
                <tr><td>弹匣容量</td>
                  <td>{{weapon.magazine}}</td>
                  <td v-if="weapon.magazine!=build.magazineSize"><i class="el-icon-arrow-right"></i> {{Num(build.magazineSize)}}</td>
                </tr>
                <tr><td>装填</td>
                  <td>{{weapon.reload}}</td>
                  <td v-if="weapon.reload!=build.reloadTime">{{Num(build.reloadTime,2)}}</td>
                </tr>
                <tr v-for="[dname, oldvalue, newvalue] in mergedDmg" :key="dname"><td>{{mapDname(dname)}}</td>
                  <td>{{oldvalue}}</td>
                  <td v-if="newvalue!=oldvalue"><i class="el-icon-arrow-right"></i> {{Num(newvalue)}}</td>
                </tr>
                <tr><td>面板伤害</td>
                  <td>{{build.originalDamage}}</td>
                  <td v-if="build.originalDamage!=build.panelDamage"><i class="el-icon-arrow-right"></i> {{Num(build.panelDamage)}}</td>
                </tr>
                <tr><td class="select-cpmode" :class="{active: build.compareMode===0}" @click="changeMode(0)">单发伤害</td>
                  <td>{{build.oriTotalDamage}}</td>
                  <td v-if="build.oriTotalDamage!=build.totalDamage"><i class="el-icon-arrow-right"></i> {{Num(build.totalDamage)}}</td>
                </tr>
                <tr><td class="select-cpmode" :class="{active: build.compareMode===1}" @click="changeMode(1)">爆发伤害</td>
                  <td>{{Num(build.oriBurstDamage)}}</td>
                  <td v-if="build.oriBurstDamage!=build.burstDamage"><i class="el-icon-arrow-right"></i> {{Num(build.burstDamage)}}</td>
                </tr>
                <tr><td class="select-cpmode" :class="{active: build.compareMode===2}" @click="changeMode(2)">持续伤害</td>
                  <td>{{Num(build.oriSustainedDamage)}}</td>
                  <td v-if="build.oriSustainedDamage!=build.sustainedDamage"><i class="el-icon-arrow-right"></i> {{Num(build.sustainedDamage)}}</td>
                </tr>
              </tbody>
            </table>
            <div class="build-tools">
              <el-button plain @click="fill">自动配置</el-button>
              <el-button plain @click="fillEmpty">填充空白</el-button>
              <el-button plain @click="clear">清空</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :sm="24" :md="12" :lg="18">
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="item.name" v-for="item in tabs" :label="item.title" :name="item.name">
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods">
                <el-col :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <div class="mod-slot" :class="[mod&&mod.rarity,{active:!mod}]" @click="!mod && slotClick(index)">
                    <template v-if="mod">
                      <div class="mod-title" @click="slotClick(index)">{{mod.name}}</div>
                      <div class="mod-detail" @click="slotRemove(index)">
                        <div class="mod-stat">
                          <div class="mod-prop" v-for="prop in mod.props" :key="prop[0]">{{convertToPropName(prop)}}</div>
                          <div class="mod-sum">{{PNNum(100*item.build.modValue(mod.id))}}% 总收益</div>
                        </div>
                        <div class="mod-action">
                          <button type="button" class="mod-slot-remove">
                            <i class="el-icon-close"></i>
                          </button>
                        </div>
                      </div>
                    </template>
                    <i v-else class="el-icon-plus"></i>
                  </div>
                </el-col>
              </draggable>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div v-else class="error">
      <el-alert title="错误" type="error" :closable="false">
      </el-alert>
    </div>
    <el-dialog title="选择MOD" :visible.sync="dialogVisible" width="600">
      <ModSelector ref="selector" :build="build" @command="modSelect"></ModSelector>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenWeapon, ModBuild, RivenDataBase, GunWeapon, GunModBuild, NormalMod, Damage2_0, DamageType, ValuedRivenProperty } from "@/warframe";
import ModSelector from "@/components/ModSelector.vue";

declare interface BuildSelectorTab {
  title: string
  name: string
  build: ModBuild
  mods: NormalMod[]
}

@Component({
  components: { ModSelector }
})
export default class BuildEditor extends Vue {
  get id() { return this.$route.params.id; }
  private _lastid = "";
  tabs: BuildSelectorTab[] = [];
  tabValue = "common";
  selectModIndex = 0;
  dialogVisible = false;
  private _weapon: GunWeapon;
  private _rWeapon: RivenWeapon;
  get weapon() { if (this.id !== this._lastid) this.reload(); return this._weapon; }
  get rWeapon() { if (this.id !== this._lastid) this.reload(); return this._rWeapon; }
  get currentTab() { return this.tabs.find(v => v.name === this.tabValue); }
  get build() { return this.currentTab.build; }
  get mergedDmg() {
    let lD = this.weapon.dmg;
    let nD = this.build.dmg;
    let rst: { [v: string]: [number, number] } = {};
    lD.forEach(([vn, vv]) => {
      rst[vn] = [vv, 0];
    })
    nD.forEach(([vn, vv]) => {
      if (rst[vn]) rst[vn][1] = vv;
      else rst[vn] = [0, vv];
    })
    return _.map(rst, (v, i) => [i, ...v]) as [string, number, number][];
  }
  fill() {
    this.build.fill(8, 0);
    this.currentTab.mods = this.build.mods;
  }
  fillEmpty() {
    this.build.fillEmpty(8, 0);
    this.currentTab.mods = this.build.mods;
  }
  clear() {
    this.currentTab.mods = Array(8);
    this.refleshMods();
  }
  changeMode(mode: number) {
    this.build.compareMode = mode;
    this.$refs.selector && (this.$refs.selector as ModSelector).reload();
  }
  reload() {
    this._lastid = this.id;
    this._weapon = RivenDataBase.getNormalWeaponsByName(this.id.replace(/_/g, " ")) as GunWeapon;
    this._rWeapon = RivenDataBase.getRivenWeaponByName(this.weapon.rivenName || this.weapon.id);
    this.tabs = [{
      title: "通用配置",
      name: "common",
      build: new GunModBuild(this.weapon),
      mods: Array(8)
    }];
    this.tabValue = 'common';
  }

  convertToPropName(prop: [string, number]) {
    let rp = RivenDataBase.getPropByName(prop[0]);
    if (rp) {
      let vp = new ValuedRivenProperty(rp, prop[1] * 100);
      return vp.displayValue + " " + vp.name;
    }
    return prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }
  /** 返回固定精确度数值 */
  Num(num: number, preci = 1) {
    return +num.toFixed(preci);
  }
  /** 返回固定精确度数值并带正负号 */
  PNNum(num: number, preci = 1) {
    let n = +num.toFixed(preci);
    return n < 0 ? n.toString() : "+" + n;
  }
  refleshMods() {
    this.build.clear();
    let mods = _.compact(this.currentTab.mods);
    console.log(mods.map(v => v.name));
    mods.forEach(mod => this.build.applyMod(mod));
  }
  mapDname(id: string) {
    let dtype = Damage2_0.getDamageType(id as DamageType);
    return dtype && dtype.name || "";
  }
  // === 事件处理 ===
  modSelect(mod: NormalMod) {
    this.currentTab.mods[this.selectModIndex] = mod;
    this.refleshMods();
    this.dialogVisible = false;
  }
  slotClick(modIndex: number) {
    this.selectModIndex = modIndex;
    this.dialogVisible = true;
  }
  slotRemove(modIndex: number) {
    this.currentTab.mods[modIndex] = null;
    this.refleshMods();
  }
  handleTabsEdit(targetName, action: "add" | "remove") {
    if (action === 'add') {
      let newTabName = "SET " + (1 + (+this.tabs[this.tabs.length - 1].name.split(" ")[1] || 0));
      this.tabs.push({
        title: newTabName.replace("SET", "配置"),
        name: newTabName,
        build: new GunModBuild(this.weapon),
        mods: Array(8)
      });
      this.tabValue = newTabName;
    }
    if (action === 'remove') {
      let tabs = this.tabs;
      let activeName = this.tabValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.tabValue = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
  // === 生命周期钩子 ===
  beforeRouteUpdate() {
    console.log(this.id);
    this.reload();
  }
  beforeMount() {
    console.log(this.id, this.tabs);
  }
}
</script>

<style>
.mod-stat .mod-prop {
  font-size: 9pt;
  color: #777;
}
.mod-sum {
  font-size: 11pt;
  color: #67c23a;
}
.mod-title,
.mod-detail {
  cursor: pointer;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
.mod-detail:hover {
  background: #ffd6d6;
}
.mod-stat {
  display: initial;
}
.mod-detail:hover .mod-stat {
  display: none;
}
.mod-action {
  display: none;
}
.mod-detail:hover .mod-action {
  display: initial;
}
.mod-title {
  font-size: 20px;
  border-radius: 4px 0 0 4px;
}
.mod-title:hover {
  background: #e8f0ff;
}
.mod-title,
.mod-detail {
  flex: 1;
}
.mod-slot-remove {
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 36px;
}
.build-tools {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 12px;
  flex-wrap: wrap;
}
.build-tools > * {
  flex: 1;
}
.select-cpmode {
  cursor: pointer;
}
.select-cpmode.active {
  color: #3d5afe;
}
.editor-main > .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 1366px) {
  .editor-main > .el-dialog__wrapper > .el-dialog {
    width: 70%;
    margin: 0 !important;
  }
}
@media only screen and (max-width: 992px) {
  .editor-main > .el-dialog__wrapper > .el-dialog {
    width: 90%;
    margin: 0 !important;
  }
}
.weapon-props {
  width: 100%;
}
.mod-slot-containor {
  flex-wrap: wrap;
}
.mod-slot {
  border-left: 4px solid transparent;
  text-align: center;
  margin: 8px 0;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mod-slot.n {
  border-left-color: #865e37;
}
.mod-slot.c {
  border-left-color: #a7a7a7;
}
.mod-slot.r {
  border-left-color: #f5e583;
}
.mod-slot.l {
  border-left-color: #eaeaea;
}
.mod-slot.x {
  border-left-color: #a072ce;
}
.mod-slot.active {
  cursor: pointer;
}
.mod-slot .el-icon-plus {
  font-size: 40px;
  padding: 20px;
  color: #89b2fd;
}
.mod-slot:hover i {
  color: #6199ff;
}
.mod-select {
  max-height: 64vh;
  overflow: auto;
}
</style>
