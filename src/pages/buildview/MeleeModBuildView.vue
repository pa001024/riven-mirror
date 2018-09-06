<template>
  <el-alert v-if="riven.isZaw" title="暂不支持Zaw" type="error">
  </el-alert>
  <div class="build-container" v-else>
    <el-form :inline="true" class="build-form-inline">
      <!-- 选择武器 -->
      <el-form-item :label="$t('buildview.weapon')" v-if="riven.weapons.length > 1">
        <el-select size="small" v-model="selectWeapon" @change="debouncedRecalc" :placeholder="$t('buildview.selectWeapon')">
          <el-option v-for="weapon in riven.weapons" :key="weapon.id" :label="$t('zh') ? weapon.name : weapon.id" :value="weapon.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 攻击方式 -->
      <el-form-item>
        <el-switch v-model="isSlide" @change="debouncedRecalc" :active-text="$t('buildview.slide')" :inactive-text="$t('buildview.attack')">
        </el-switch>
        <!-- <el-checkbox size="small" v-model="isSlide" @change="debouncedRecalc" border>滑砍</el-checkbox> -->
      </el-form-item>
      <!-- 限制MOD槽位 -->
      <el-form-item :label="$t('buildview.limitSlots')">
        <el-tooltip effect="dark" :content="$t('buildview.limitSlotsTip')" placement="bottom">
          <el-input-number size="small" v-model="slots" :min="4" :max="8"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <!-- 连击倍率 -->
      <el-form-item :label="$t('buildview.comboMul')">
        <el-tooltip effect="dark" :content="$t('buildview.comboMulTip')" placement="bottom">
          <el-input-number size="small" v-model="comboMul" @change="debouncedRecalc" :min="1" :max="6" :step="0.5"></el-input-number>
        </el-tooltip>
      </el-form-item>
      <!-- 限制元素类型 -->
      <el-form-item :label="$t('buildview.limitElementsType')">
        <el-tooltip effect="dark" :content="$t('buildview.limitElementsTypeTip')" placement="bottom">
          <el-select size="small" v-model="selectDamageType" @change="selectDamageTypeChange()" :placeholder="$t('buildview.unlimited')" clearable style="width: 120px;">
            <el-option v-for="(value, name) in elementTypes" :key="name" :label="$t(`elements.${name}`)" :value="name">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>
      <!-- 基伤加成 -->
      <el-form-item :label="$t('buildview.extraBaseDamage')">
        <el-tooltip effect="dark" placement="bottom">
          <div slot="content">
            <div v-html="$t('buildview.extraBaseDamageTip')"></div>
          </div>
          <el-input size="small" class="chroma-dmg" v-model="extraBaseDamage" style="width:120px">
            <template slot="append">%</template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <!-- 总伤加成 -->
      <el-form-item :label="$t('buildview.extraOverall')">
        <el-tooltip effect="dark" placement="bottom">
          <div slot="content">
            <div v-html="$t('buildview.extraOverallTip')"></div>
          </div>
          <el-input size="small" class="chroma-dmg" v-model="extraOverall" style="width:120px">
            <template slot="append">%</template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <!-- 赋能 -->
      <el-form-item :label="$t('buildview.arcanes')">
        <el-checkbox-group v-model="arcanes">
          <el-checkbox v-for="arcane in availableArcanes" :key="arcane.id" :label="arcane" @change="debouncedRecalc">{{$t("zh") ? arcane.name : arcane.id}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="build-list">
      <el-card class="build-container">
        <el-collapse v-model="activeNames" v-if="builds.length">
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
                    <div class="build-card-name">{{$t("zh") ? mod.name: mod.id}}</div>
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
              <el-tag style="margin-left: 8px;">{{$t("buildview.panelDamage")}} {{build[1].panelDamage.toFixed(1)}} </el-tag>
              <el-tag style="margin-left: 8px;">{{$t("buildview.critChance")}} {{(build[1].critChance*100).toFixed(1)}}% </el-tag>
              <el-tag style="margin-left: 8px;">{{$t("buildview.critMul")}} {{(build[1].critMul).toFixed(1)}}x </el-tag>
              <el-tag style="margin-left: 8px;">{{$t("buildview.fireRate")}} {{(build[1].fireRate).toFixed(1)}} </el-tag>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <div class="loading" v-else>
          <i class="el-icon-loading"></i> {{$t("buildview.loading")}}
        </div>
      </el-card>
      <el-card class="build-result" v-if="builds.length">
        {{$t("buildview.rank")}} [
        <span class="score-text">{{scoreLevelText}}</span> ] ({{scoreLevel.toFixed()}}/100)
        <span v-html="$t('buildview.scoreResult', [score])"></span> {{selectCompMethodText}}
        <!-- <span class="build-price">
          估价:
          <span class="price-text">{{riven.calcPrice(scoreLevel)}}</span>
          <span class="price-tip">(*仅供参考)</span>
        </span> -->
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod, MeleeModBuild, ValuedRivenProperty, RivenDataBase, Codex, MeleeWeapon, MeleeCompareMode } from "@/warframe";
import { BaseModBuildView } from "./BaseModBuildView";

@Component
export default class MeleeModBuildView extends BaseModBuildView {
  isSlide = true
  builds: [string, MeleeModBuild][] = []
  /** 连击倍率 */
  comboMul = 2
  /** 插槽使用数 */
  slots = 7
  /** 基伤加成 */
  extraBaseDamage = 0;
  /** 总伤加成 */
  extraOverall = 0;
  /** 赋能 */
  arcanes = [];
  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }

  // === 计算属性 ===
  get selectCompMethodText() {
    return this.isSlide ? this.$t("buildview.slideDamage").toString() :
      this.$t("buildview.attackDamage").toString();
  }

  /**
   * 计算默认模式
   * if 弹匣 / 射速 < 2s 持续伤害
   * if 射速 > 2 爆发伤害
   * else 单发伤害
   */
  get defalutMode() {
    let melee = this.weapon as MeleeWeapon;
    let slideList = ["Whip", "Polearm", "Staff"];
    if (melee.tags.some(v => slideList.includes(v))) return MeleeCompareMode.SlideDamage;
    return MeleeCompareMode.TotalDamage;
  }

  // === 事件处理器 ===
  @Watch("extraBaseDamage")
  @Watch("extraOverall")
  @Watch("slots")
  debouncedRecalc() {
    this.builds = [];
    this._debouncedRecalc();
  }

  // === 生命周期钩子 ===
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => { this.recalc(); }, 66);
    this.selectDamageType = localStorage.getItem("GunModBuildView.selectDamageType") || "Corrosive";
    this.rivenChange();
  }
  recalc() {
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    let options = {
      compareMode: this.isSlide ? 1 : 0,
      comboLevel: ~~((this.comboMul - 1) * 2),
      allowElementTypes: this.selectDamageType && this.elementTypes[this.selectDamageType] || null,
      extraBaseDamage: this.extraBaseDamage / 100,
      extraOverall: this.extraOverall / 100,
      arcanes: this.arcanes
    };
    super.recalc(MeleeModBuild, options);
  }

}
</script>
<style>
</style>
