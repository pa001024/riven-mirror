<template>
  <el-alert v-if="riven.isZaw" title="暂不支持Zaw" type="error">
  </el-alert>
  <div class="build-container" v-else>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="武器" v-if="riven.weapons.length > 1">
        <el-select size="small" v-model="selectWeapon" @change="recalc" placeholder="请选择">
          <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.name" :value="weapon.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox size="small" v-model="isSlide" @change="recalc" border>滑砍</el-checkbox>
      </el-form-item>
      <el-form-item label="限制MOD槽位">
        <el-tooltip effect="dark" content="给剑风等MOD预留位置" placement="bottom">
          <el-input-number size="small" v-model="slots" :min="4" :max="8" label="使用MOD槽位"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="连击倍率">
        <el-tooltip effect="dark" content="将会按照此连击倍率来进行计算 (爪子P会自动相应增加)" placement="bottom">
          <el-input-number size="small" v-model="comboMul" @change="debouncedRecalc" :min="1" :max="6" :step="0.5" label="使用MOD槽位"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="限制元素类型">
        <el-tooltip effect="dark" content="计算时只会使用可构成该元素的MOD" placement="bottom">
          <el-select size="small" v-model="selectDamageType" @change="selectDamageTypeChange" placeholder="不限制" clearable style="width: 120px;">
            <el-option v-for="(value, name) in elementTypes" :key="name" :label="name" :value="name">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="赋能">
        <el-checkbox v-model="isUseFury" @change="recalc">狂怒</el-checkbox>
        <el-checkbox v-model="isUseStrike" @change="recalc">速攻</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="build-list">
      <el-card style="padding:0;overflow:visible;">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="build in builds" :key="build[0]" :name="build[0]">
            <template slot="title">
              <div class="build-title" style="margin:0 16px;">
                {{build[0]}} &nbsp; - &nbsp; {{build[1].compareDamage.toFixed(1)}} {{selectCompMethodText}}
              </div>
            </template>
            <el-row type="flex" :gutter="12" class="build-item" style="margin:8px;">
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
            <el-row type="flex" :gutter="12" class="build-item" style="margin:0 8px;">
              <el-tag style="margin-left: 8px;">面板伤害: {{build[1].panelDamage.toFixed(1)}} </el-tag>
              <el-tag style="margin-left: 8px;">暴击率: {{(build[1].critChance*100).toFixed(1)}}% </el-tag>
              <el-tag style="margin-left: 8px;">暴击伤害: {{(build[1].critMul).toFixed(1)}}x </el-tag>
              <el-tag style="margin-left: 8px;">攻速: {{(build[1].fireRate).toFixed(1)}} </el-tag>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card class="build-result">
        综合评级: [ {{scoreLevelText}} ] ({{scoreLevel.toFixed()}}分) 可提升
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
import { RivenDataBase } from "@/warframe/data";
import { ModBuildView } from "@/components/ModBuildView";

@Component
export default class MeleeModBuildView extends ModBuildView {
  isSlide = true
  builds: [string, MeleeModBuild][] = []
  /** 连击倍率 */
  comboMul = 2
  /** 插槽使用数 */
  slots = 7
  /** 狂怒赋能 */
  isUseFury = false;
  /** 速攻赋能 */
  isUseStrike = false;
  _debouncedRecalc: (() => void);

  @Watch("slots")
  debouncedRecalc() {
    this._debouncedRecalc();
  }
  get selectCompMethodText() {
    return this.isSlide ? "滑砍伤害" : "平砍伤害";
  }
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => { this.recalc(); }, 10);
    this.selectDamageType = localStorage.getItem("selectDamageType.melee") || null;
    this.rivenChange();
  }
  recalc() {
    console.log(" recalc()", this.riven);
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    this.builds = [];
    let options = {
      isCalcSlide: this.isSlide,
      comboLevel: ~~((this.comboMul - 1) * 2),
      allowElementTypes: this.selectDamageType && this.elementTypes[this.selectDamageType] || null,
      isUseFury: this.isUseFury,
      isUseStrike: this.isUseStrike,
    };
    let stand = new MeleeModBuild(this.riven, this.selectWeapon, options);
    let riven = new MeleeModBuild(this.riven, this.selectWeapon, options);
    let best = stand.findBestRiven();
    console.log(best);
    let bestRiven = new MeleeModBuild(best, this.selectWeapon, options);
    console.log("计算收益: 标准配置");
    stand.fill(this.slots, 0);
    console.log("计算收益: 紫卡配置");
    riven.fill(this.slots, 2);
    console.log("计算收益: 最佳紫卡配置");
    bestRiven.fill(this.slots, 2);
    this.builds.push(["标准配置", stand]);
    this.builds.push(["紫卡配置", riven]);
    this.builds.push(["最佳紫卡配置", bestRiven]);
    this.score = Math.round(riven.compareDamage / stand.compareDamage * 100 - 100);
    this.scoreLevel = this.score * 100 / Math.round(bestRiven.compareDamage / stand.compareDamage * 100 - 100);
  }
}
</script>
<style>
</style>
