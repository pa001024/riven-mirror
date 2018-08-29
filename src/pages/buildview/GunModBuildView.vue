<template>
  <div class="build-container">
    <el-form :inline="true" class="build-form-inline">
      <!-- 选择武器 -->
      <el-form-item :label="$t('buildview.weapon')" v-if="riven.weapons.length > 1">
        <el-select size="small" v-model="selectWeapon" @change="recalc" :placeholder="$t('buildview.selectWeapon')">
          <el-option v-for="weapon in riven.weapons" :key="weapon.id" :label="$t('zh') ? weapon.name : weapon.id" :value="weapon.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 选择比较类型 -->
      <el-form-item>
        <el-radio-group size="small" v-model="selectCompMethod" @change="recalc">
          <el-tooltip effect="dark" :content="$t('buildview.totalDamageTip')" placement="bottom">
            <el-radio-button label="0">{{$t("buildview.totalDamage")}}</el-radio-button>
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('buildview.burstDamageTip')" placement="bottom">
            <el-radio-button label="1">{{$t("buildview.burstDamage")}}</el-radio-button>
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('buildview.sustainedDamageTip')" placement="bottom">
            <el-radio-button label="2">{{$t("buildview.sustainedDamage")}}</el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <!-- 限制MOD槽位 -->
      <el-form-item :label="$t('buildview.limitSlots')">
        <el-tooltip effect="dark" :content="$t('buildview.limitSlotsTip')" placement="bottom">
          <el-input-number size="small" v-model="slots" :min="4" :max="8"></el-input-number>
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
      <!-- 爆头几率 -->
      <el-form-item :label="$t('buildview.handshotChance')">
        <el-tooltip effect="dark" :content="$t('buildview.handshotChanceTip')" placement="bottom">
          <el-slider v-model="handShotChance" :format-tooltip="v=>v+'%'" style="width:200px;margin-left: 8px;"></el-slider>
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
      <!-- 使用MOD -->
      <el-form-item :label="$t('buildview.usemods')">
        <el-checkbox v-if="riven.mod === 'Rifle'" v-model="useHeavyCaliber" @change="recalc">{{$t("buildview.heavyCaliber")}}</el-checkbox>
        <!-- <el-tooltip v-if="riven.mod === 'Rifle'" effect="dark" content="增伤很强大，但切割伤害不是立刻死亡，请自行选择" placement="bottom">
          <el-checkbox v-model="useHunterMunitions" :indeterminate="notMustUseHunterMunitions" @change="useHunterMunitionsChange">猎人战备</el-checkbox>
        </el-tooltip> -->
        <el-tooltip effect="dark" :content="$t('buildview.acolyteModsTip')" placement="bottom">
          <el-checkbox v-model="useAcolyteMods" @change="useAcolyteModsChange">{{$t("buildview.acolyteMods")}}</el-checkbox>
        </el-tooltip>
      </el-form-item>
      <!-- 赋能 -->
      <el-form-item :label="$t('buildview.arcanes')">
        <el-checkbox-group v-model="arcanes">
          <el-checkbox v-for="arcane in availableArcanes" :key="arcane.id" :label="arcane" @change="recalc">{{$t("zh") ? arcane.name : arcane.id}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <!-- 配置列表 -->
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
              <el-tag style="margin-left: 8px;">{{$t("buildview.status")}} {{(build[1].realProcChance*100).toFixed(1)}}% </el-tag>
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
import { RivenMod, GunModBuild, ValuedRivenProperty, RivenDataBase, Codex } from "@/warframe";
import { BaseModBuildView } from "./BaseModBuildView";

@Component
export default class GunModBuildView extends BaseModBuildView {
  builds: [string, GunModBuild][] = []
  /** 使用追随者MOD */
  useAcolyteMods = false
  /** 使用重口径 */
  useHeavyCaliber = true
  /** 使用猎人战备 */
  useHunterMunitions = false;
  notMustUseHunterMunitions = false;
  /** 爆头几率 */
  handShotChance = 0;
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
    return [this.$t("buildview.totalDamage"), this.$t("buildview.burstDamage"), this.$t("buildview.sustainedDamage")][this.selectCompMethod];
  }

  // === 事件处理器 ===
  useHunterMunitionsChange(newVal, oldVal) {
    // 三种状态 state:use,notMust = 0:ff 1:?t 2:tf
    if (this.notMustUseHunterMunitions) {
      this.notMustUseHunterMunitions = false;
      this.useHunterMunitions = true;
    } else {
      if (newVal)
        this.notMustUseHunterMunitions = true;
    }
    this.debouncedRecalc();
  }

  @Watch("extraBaseDamage")
  @Watch("extraOverall")
  @Watch("handShotChance")
  @Watch("slots")
  debouncedRecalc() {
    this._debouncedRecalc();
  }
  useAcolyteModsChange() {
    this.debouncedRecalc();
    localStorage.setItem("useAcolyteMods", JSON.stringify(this.useAcolyteMods));
  }

  // === 生命周期钩子 ===
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => { this.recalc(); }, 10);
    this.selectDamageType = localStorage.getItem("GunModBuildView.selectDamageType") || "Radiation";
    this.useAcolyteMods = JSON.parse(localStorage.getItem("useAcolyteMods"));
    this.rivenChange();
  }

  recalc() {
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    let options = {
      compareMode: this.selectCompMethod,
      useAcolyteMods: this.useAcolyteMods,
      useHeavyCaliber: this.useHeavyCaliber,
      useHunterMunitions: this.useHunterMunitions ? this.notMustUseHunterMunitions ? 1 : 2 : 0,
      handShotChance: this.handShotChance / 100,
      allowElementTypes: this.selectDamageType && this.elementTypes[this.selectDamageType] || null,
      extraBaseDamage: this.extraBaseDamage / 100,
      extraOverall: this.extraOverall / 100,
      arcanes: this.arcanes
    };
    super.recalc(GunModBuild, options);
  }
}
</script>

<style>
.build-price {
  font-size: 16px;
  color: #fff;
}
.price-tip {
  font-size: 11px;
}
.chroma-dmg .el-input-group__append {
  padding: 0 10px;
}
.build-form-inline .el-form-item {
  margin-bottom: 8px;
}
.build-list .build-container {
  overflow: visible;
  padding: 0;
}
.build-container .el-collapse {
  border: 0;
}
.build-container .el-collapse-item__wrap {
  overflow: visible;
}
.build-container .el-collapse-item__header {
  height: auto;
  min-height: 48px;
}
.build-container .el-collapse-item:last-child .el-collapse-item__wrap,
.build-container .el-collapse-item:last-child .el-collapse-item__header {
  border: 0;
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
  padding: 10px;
}
.build-card {
  height: 56px;
  margin-bottom: 12px;
}
.build-list {
  margin-top: 8px;
}
.score-text {
  color: #f56c6c;
}
.build-result {
  font-size: 1.6em;
  margin-top: 14px;
}
.build-title {
  font-size: 16pt;
}
.build-card-box {
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.48, 1.09, 0.74, -0.23);
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
.build-container > .el-card__body {
  padding: 8px;
}
.build-header {
  font-size: 16pt;
  padding: 8px 0;
}
.build-card-name {
  font-size: 11pt;
  line-height: 20px;
}
.build-card-prop {
  font-size: 9pt;
}
</style>
