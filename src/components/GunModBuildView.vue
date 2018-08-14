<template>
  <div class="build-container">
    <el-form :inline="true" class="build-form-inline">
      <el-form-item label="武器" v-if="riven.weapons.length > 1" @change="debouncedRecalc">
        <el-select size="small" v-model="selectWeapon" placeholder="请选择">
          <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.name" :value="weapon.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group size="small" v-model="selectCompMethod" @change="recalc">
          <el-tooltip effect="dark" content="不考虑射速算出的伤害DPH" placement="bottom">
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
        <el-tooltip effect="dark" content="给武器专属或后坐力等MOD预留位置" placement="bottom">
          <el-input-number size="small" v-model="slots" :min="4" :max="8" label="使用MOD槽位"></el-input-number>
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
      <el-form-item label="爆头率">
        <el-tooltip effect="dark" content="更高的爆头率会提高暴击的收益" placement="bottom">
          <el-slider v-model="handShotChance" :format-tooltip="v=>v+'%'" style="width:200px;margin-left: 8px;"></el-slider>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="基伤加成">
        <el-tooltip effect="dark" content="Chroma的怨怒护甲和Mirage的黯然失色可对武器基伤产生大量加成，步枪增幅、死亡之眼等光环MOD也属于这个加成" placement="bottom">
          <el-input size="small" class="chroma-dmg" v-model="chromaBaseDamage" style="width:120px">
            <template slot="append">%</template>
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="使用MOD">
        <el-checkbox v-if="riven.mod === 'Rifle'" v-model="useHeavyCaliber" @change="recalc">重口径</el-checkbox>
        <el-tooltip v-if="riven.mod === 'Rifle'" effect="dark" content="增伤很强大，但切割伤害不是立刻死亡，请自行选择" placement="bottom">
          <el-checkbox v-model="useHunterMunitions" :indeterminate="notMustUseHunterMunitions" @change="useHunterMunitionsChange">猎人战备</el-checkbox>
        </el-tooltip>
        <el-tooltip effect="dark" content="如尖刃弹头等需要瞄准的MOD" placement="bottom">
          <el-checkbox v-model="useAcolyteMods" @change="useAcolyteModsChange">追随者MOD</el-checkbox>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="赋能" v-if="riven.is('sniper') || riven.is('pistol')">
        <el-checkbox v-model="isUseMomentum" v-if="riven.is('sniper')" @change="recalc">动量</el-checkbox>
        <el-checkbox v-model="isUseVelocity" v-if="riven.is('pistol')" @change="recalc">迅速</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="build-list">
      <el-card class="build-container">
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
              <el-tag style="margin-left: 8px;">射速: {{(build[1].fireRate).toFixed(1)}} </el-tag>
              <el-tag style="margin-left: 8px;">触发率(每个弹片): {{(build[1].realProcChance*100).toFixed(1)}}% </el-tag>
              <el-tag v-if="build[1].slashDotDamage > 0" style="margin-left: 8px;">猎人战备切割伤害: {{(build[1].slashDotDamage).toFixed(1)}} </el-tag>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card class="build-result">
        评级: [
        <span class="score-text">{{scoreLevelText}}</span> ] ({{scoreLevel.toFixed()}}/100) 可提升
        <span class="score-text">{{score}}%</span> 的{{selectCompMethodText}}
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod, GunModBuild, ValuedRivenProperty } from "@/warframe";
import { RivenDataBase } from "@/warframe/data";
import { ModBuildView } from "@/components/ModBuildView";

@Component
export default class GunModBuildView extends ModBuildView {
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
  /** chroma加成 */
  chromaBaseDamage = 0;
  /** 动量赋能 */
  isUseMomentum = false;
  /** 迅速赋能 */
  isUseVelocity = false;

  // === 计算属性 ===
  get selectCompMethodText() {
    return ["单发伤害", "爆发伤害", "持续伤害"][this.selectCompMethod];
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

  @Watch("chromaBaseDamage")
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
    this.selectDamageType = localStorage.getItem("GunModBuildView.selectDamageType") || "辐射";
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
      chromaBaseDamage: this.chromaBaseDamage / 100,
      allowElementTypes: this.selectDamageType && this.elementTypes[this.selectDamageType] || null,
      isUseMomentum: this.riven.is('sniper') && this.isUseMomentum,
      isUseVelocity: this.riven.is('pistol') && this.isUseVelocity,
    };
    super.recalc(GunModBuild, options);
  }
}
</script>

<style>
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
