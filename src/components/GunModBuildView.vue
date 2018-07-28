<template>
  <div class="build-container">
    <header class="build-header">MOD自动配置</header>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="武器" v-if="riven.weapons.length > 1">
        <el-select size="medium" v-model="selectWeapon" placeholder="请选择">
          <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.name" :value="weapon.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group size="medium" v-model="selectCompMethod">
          <el-tooltip effect="dark" content="不考虑射速算出的伤害" placement="bottom">
            <el-radio-button label="0">单发伤害</el-radio-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="只考虑射速算出的DPS" placement="bottom">
            <el-radio-button label="1">爆发伤害</el-radio-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="考虑射速、弹匣容量以及装填算出的DPS" placement="bottom">
            <el-radio-button label="2">持续伤害</el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="限制MOD槽位">
        <el-input-number size="small" v-model="slots" :min="4" :max="8" label="使用MOD槽位"></el-input-number>
      </el-form-item>
      <el-form-item label="限制元素类型">
        <el-select size="medium" v-model="selectDamageType" placeholder="请选择元素类型" clearable>
          <el-option v-for="type in elementTypes" :key="type[0]" :label="type[0]" :value="type[1]">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-tooltip effect="dark" content="如尖刃弹头等需要瞄准的MOD" placement="bottom">
          <el-checkbox v-model="usrAcolyteMods">使用追随者MOD</el-checkbox>
        </el-tooltip>
      </el-form-item>
      <!-- <el-form-item label="使用MOD">
        <el-checkbox v-model="useHeavyCaliber">重口径</el-checkbox>
      </el-form-item> -->
    </el-form>
    <div class="build-list">
      <el-card class="build-container" v-for="build in builds" :key="build[0]">
        <div slot="header" class="build-title">
          {{build[0]}} &nbsp; - &nbsp; {{build[1].compareDamage.toFixed(1)}} {{selectCompMethodText}}
        </div>
        <el-row type="flex" :gutter="12" class="build-item">
          <el-col class="build-card" :sm="12" :md="6" :lg="3" v-for="mod in build[1].mods" :key="mod.name">
            <div shadow="hover" class="build-card-box" :class="[mod.rarity]">
              <div class="shine"></div>
              <div slot="header" class="build-card-header">
                <div class="build-card-name">{{mod.name}}</div>
              </div>
              <div class="build-card-body">
                <div class="build-card-prop" v-for="prop in mod.props" :key="prop[0]">
                  {{convertToPropName(prop)}}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="build-result">
        这张紫卡一共提升了
        <span class="score-text">{{score}}%</span> 的{{selectCompMethodText}}
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod, GunModBuild } from "@/warframe";
import { ValuedRivenProperty } from "@/warframe/rivenmod";
import { CompareMode } from "@/warframe/modbuild";
import { GunWeapon, DamageType, DamageTypeDatabase } from "@/warframe/data";

@Component
export default class GunModBuildView extends Vue {
  @Prop() riven: RivenMod
  selectWeapon: GunWeapon = null
  selectCompMethod: CompareMode = CompareMode.TotalDamage
  selectDamageType: string[] = null
  builds: [string, GunModBuild][] = []
  /**  */
  get elementTypes() {
    return [
      ["爆炸", ["4", "5"]],
      ["腐蚀", ["7", "6"]],
      ["毒气", ["4", "6"]],
      ["磁力", ["5", "7"]],
      ["辐射", ["4", "7"]],
      ["病毒", ["5", "6"]],
    ];
  }
  usrAcolyteMods = true
  get selectCompMethodText() {
    return ["单发伤害", "爆发伤害", "持续伤害"][this.selectCompMethod];
  }
  /** 插槽使用数 */
  slots = 8
  /** 紫卡分数 */
  score = 0
  @Watch("selectCompMethod")
  compMethodChange(val: string) {
    this.recalc();
  }
  @Watch("slots")
  slotChange() {
    this.recalc();
  }
  @Watch("riven")
  rivenChange() {
    this.selectWeapon = this.riven.weapons[0];
    this.recalc();
  }
  @Watch("usrAcolyteMods")
  usrAcolyteModsChange() {
    this.recalc();
  }
  @Watch("selectDamageType")
  selectDamageTypeChange() {
    this.recalc();
    console.log(this.selectDamageType);
  }
  mounted() { }
  beforeMount() {
    this.selectWeapon = this.riven.weapons[0];
    this.recalc();
  }
  recalc() {
    this.builds = [];
    let stand = new GunModBuild(this.riven, this.selectWeapon.name);
    let riven = new GunModBuild(this.riven, this.selectWeapon.name);
    stand.compareMode = riven.compareMode = this.selectCompMethod;
    stand.usrAcolyteMods = riven.usrAcolyteMods = this.usrAcolyteMods;
    stand.allowElementTypes = riven.allowElementTypes = this.selectDamageType || null;
    stand.fill(this.slots, 0);
    riven.fill(this.slots, 1);
    this.builds.push(["标准配置", stand]);
    this.builds.push(["紫卡配置", riven]);
    this.score = Math.round(riven.compareDamage / stand.compareDamage * 100 - 100);
  }
  convertToPropName(prop: [string, number]) {
    let rp = this.riven.db.getPropByName(prop[0]);
    if (rp) {
      let vp = new ValuedRivenProperty(rp, prop[1] * 100);
      return vp.name + " " + vp.displayValue;
    }
    return prop[0] + " " + prop[1];
  }
}
</script>

<style>
.build-container {
  overflow: visible;
  margin-bottom: 20px;
}
.build-card-header {
  padding: 18px 8px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.build-card-body {
  padding: 20px;
}
.build-card {
  height: 56px;
  margin-bottom: 12px;
}
.score-text {
  color: #f56c6c;
}
.build-result {
  font-size: 1.6em;
  margin-top: 30px;
}
.build-title {
  font-size: 16pt;
}
.build-card-box {
  overflow: hidden;
  transition: 0.3s;
  max-height: 56px;
  margin-bottom: 8px;
  position: absolute;
  width: 100%;
  z-index: 8;
  text-align: center;
  cursor: pointer;
  color: #fff;
  font-size: 1em;
  letter-spacing: 1px;
  text-shadow: rgba(0, 0, 0, 0.9) 0px 1px 2px;
  border-radius: 4px;
  box-shadow: 0 0 1px white inset, 0 0 1px black;
  /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px,
    inset rgba(255, 255, 255, 0.25) 0px 1px 0px,
    inset rgba(0, 0, 0, 0.25) 0px 0px 0px,
    inset rgba(255, 255, 255, 0.03) 0px 20px 0px,
    inset rgba(0, 0, 0, 0.15) 0px -20px 20px,
    inset rgba(255, 255, 255, 0.05) 0px 20px 20px; */
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.15), transparent);
}
@media only screen and (min-width: 768px) {
  .build-card-box {
    width: calc(50% - 12px);
  }
}
@media only screen and (min-width: 992px) {
  .build-card-box {
    width: calc(25% - 12px);
  }
}
@media only screen and (min-width: 1200px) {
  .build-card-box {
    width: calc(12.5% - 12px);
  }
}
.build-card-box:hover {
  max-height: 300px;
  z-index: 9;

  /* box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px,
    inset rgba(255, 255, 255, 0.25) 0px 1px 0px,
    inset rgba(0, 0, 0, 0.1) 0px 0px 0px,
    inset rgba(255, 255, 255, 0.05) 0px 20px 0px,
    inset rgba(0, 0, 0, 0.1) 0px -20px 20px,
    inset rgba(255, 255, 255, 0.05) 0px 20px 20px; */
}

.build-card-box.n {
  background-color: #865e37;
}
.build-card-box.c {
  background-color: #a7a7a7;
}
.build-card-box.r {
  background-color: #f5e583;
}
.build-card-box.l {
  background-color: #eaeaea;
}
.build-card-box.x {
  background-color: #a072ce;
}
.shine {
  display: block;
  background-image: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  width: 30%;
  margin-left: 20%;
  height: 1px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 5px;
  transition: all 0.3s ease-in-out;
}
.build-card-box:hover .shine {
  margin-left: 60%;
}

.build-item {
  flex-wrap: wrap;
}
.build-container {
  padding: 8px;
}
.build-header {
  font-size: 16pt;
  padding: 8px 0;
}
.build-card-name {
  font-size: 11pt;
}
.build-card-prop {
  font-size: 9pt;
}
</style>
