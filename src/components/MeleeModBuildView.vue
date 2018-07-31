<template>
  <el-alert v-if="riven.isZaw" title="暂不支持Zaw" type="error">
  </el-alert>
  <div class="build-container" v-else>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="武器" v-if="riven.weapons.length > 1">
        <el-select size="small" v-model="selectWeapon" placeholder="请选择">
          <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.name" :value="weapon.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox size="small" v-model="isSlide" border>滑砍</el-checkbox>
      </el-form-item>
      <el-form-item label="限制MOD槽位">
        <el-tooltip effect="dark" content="给剑风等MOD预留位置" placement="bottom">
          <el-input-number size="small" v-model="slots" :min="4" :max="8" label="使用MOD槽位"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="连击倍率">
        <el-tooltip effect="dark" content="将会按照此连击倍率来进行计算 (爪子P会自动相应增加)" placement="bottom">
          <el-input-number size="small" v-model="comboMul" :min="1" :max="6" :step="0.5" label="使用MOD槽位"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="限制元素类型">
        <el-tooltip effect="dark" content="计算时只会使用可构成该元素的MOD" placement="bottom">
          <el-select size="small" v-model="selectDamageType" placeholder="不限制" clearable style="width: 120px;">
            <el-option v-for="(value, name) in elementTypes" :key="name" :label="name" :value="name">
            </el-option>
          </el-select>
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
            <div class="build-card-box" :class="[mod.rarity]">
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
        <el-row type="flex" :gutter="12" class="build-item">
          <el-tag style="margin-left: 8px;">面板伤害: {{build[1].panelDamage.toFixed(1)}} </el-tag>
          <el-tag style="margin-left: 8px;">暴击率: {{(build[1].critChance*100).toFixed(1)}}% </el-tag>
          <el-tag style="margin-left: 8px;">暴击伤害: {{(build[1].critMul).toFixed(1)}}x </el-tag>
          <el-tag style="margin-left: 8px;">攻速: {{(build[1].fireRate).toFixed(1)}} </el-tag>
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
import { RivenMod, MeleeModBuild } from "@/warframe";
import { ValuedRivenProperty } from "@/warframe/rivenmod";

@Component
export default class MeleeModBuildView extends Vue {
  @Prop() riven: RivenMod
  selectWeapon = ""
  selectDamageType: string = null
  isSlide = true
  builds: [string, MeleeModBuild][] = []
  /** 连击倍率 */
  comboMul = 2
  /** 插槽使用数 */
  slots = 7
  /** 紫卡分数 */
  score = 0
  /** 元素类型 */
  elementTypes = {
    "物理": ["8", "9", "A"],
    "辐射": ["4", "7"],
    "腐蚀": ["7", "6"],
    "毒气": ["4", "6"],
    "病毒": ["5", "6"],
    "爆炸": ["4", "5"],
    "磁力": ["5", "7"],
  }

  _debouncedRecalc: (() => void);
  @Watch("isSlide")
  @Watch("slots")
  @Watch("selectWeapon")
  @Watch("comboMul")
  debouncedRecalc() {
    this._debouncedRecalc();
  }
  get selectCompMethodText() {
    return this.isSlide ? "滑砍伤害" : "平砍伤害";
  }
  @Watch("riven")
  rivenChange() {
    let weapons = this.riven.weapons;
    if (weapons.length === 0) {
      return;
    }
    this.selectWeapon = weapons[weapons.length - 1].name;
    this.debouncedRecalc();
  }
  @Watch("selectDamageType")
  selectDamageTypeChange() {
    this.debouncedRecalc();
    if (this.selectDamageType)
      localStorage.setItem("selectDamageType.melee", this.selectDamageType);
    else
      localStorage.removeItem("selectDamageType.melee");
  }
  mounted() { }
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => { this.recalc(); }, 10);
    this.selectDamageType = localStorage.getItem("selectDamageType.melee") || null;
    this.rivenChange();
  }
  recalc() {
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    this.builds = [];
    let stand = new MeleeModBuild(this.riven, this.selectWeapon);
    let riven = new MeleeModBuild(this.riven, this.selectWeapon);
    stand.isCalcSlide = riven.isCalcSlide = this.isSlide;
    stand.comboLevel = riven.comboLevel = ~~((this.comboMul - 1) * 2);
    stand.allowElementTypes = riven.allowElementTypes = this.selectDamageType && this.elementTypes[this.selectDamageType] || null;
    console.log("计算收益: 标准配置");
    stand.fill(this.slots, 0);
    console.log("计算收益: 紫卡配置");
    riven.fill(this.slots, 2);
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
    return prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }
}
</script>
<style>
</style>
