<template>
  <div class="build-container">
    <!-- 配置列表 -->
    <div class="build-list">
      <!-- 评级 -->
      <div class="build-result" v-if="builds.length">
        <span class="rank-final">{{scoreLevelText}}</span>
        <el-progress class="rank-progress" :show-text="false" :percentage="+(scoreLevel<0?0:scoreLevel>100?100:scoreLevel).toFixed()"></el-progress>
        <span class="rank-progress-text">{{scoreLevel.toFixed()}}%</span>
        <span v-html="$t('buildview.scoreResult', [score, selectCompMethodText])"></span>
        <!-- <span class="build-price">
          估价:
          <span class="price-text">{{riven.calcPrice(scoreLevel)}}</span>
          <span class="price-tip">(*仅供参考)</span>
        </span> -->
      </div>
      <el-collapse v-model="activeNames" v-if="builds.length">
        <el-collapse-item v-for="build in builds" :key="build[0]" :name="build[0]">
          <template slot="title">
            <div class="build-title">
              {{$t(build[0])}} &nbsp; - &nbsp; {{build[1].compareDamage.toFixed(1)}} {{selectCompMethodText}}
            </div>
          </template>
          <el-row type="flex" :gutter="12" class="build-item" style="margin:8px;">
            <el-col class="build-card" :sm="12" :md="6" :lg="3" v-for="mod in build[1].mods" :key="mod.name">
              <div class="build-card-box" :class="[mod.rarity]">
                <div class="build-card-header">
                  <div class="build-card-name">{{mod.name}}</div>
                </div>
                <div class="build-card-body">
                  <div class="build-card-prop" v-for="prop in mod.vProps" :key="prop.id">
                    {{prop.fullName}}
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="12" class="build-item" style="margin:0 8px;">
            <el-button size="small" type="primary" round style="margin-left: 8px;" @click="toBuild(build[1])">{{$t("buildview.tobuild")}}</el-button>
            <el-tag style="margin-left: 8px;">{{$t("buildview.panelDamage")}} {{build[1].panelDamage.toFixed(1)}} </el-tag>
            <el-tag style="margin-left: 8px;">{{$t("buildview.critChance")}} {{(build[1].critChance*100).toFixed(1)}}% </el-tag>
            <el-tag style="margin-left: 8px;">{{$t("buildview.critMul")}} {{(build[1].critMul).toFixed(1)}}x </el-tag>
            <el-tag style="margin-left: 8px;">{{$t("buildview.fireRate")}} {{(build[1].fireRate).toFixed(1)}} </el-tag>
            <el-tag style="margin-left: 8px;">{{$t("buildview.magazine")}} {{(build[1].magazineSize).toFixed(0)}} </el-tag>
            <el-tag style="margin-left: 8px;">{{$t("buildview.reload")}} {{(build[1].reloadTime).toFixed(1)}} </el-tag>
            <el-tag style="margin-left: 8px;">{{$t("buildview.status")}} {{(build[1].realProcChance*100).toFixed(1)}}% </el-tag>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div class="loading" v-else>
        <i class="el-icon-loading"></i> {{$t("buildview.loading")}}
      </div>
    </div>
    <!-- 设置区域 -->
    <div class="setting">
      <el-form :inline="true" class="build-form-inline">
        <!-- 选择武器 -->
        <el-form-item :label="$t('buildview.weapon')" v-if="riven.weapons.length > 1">
          <el-select size="small" v-model="selectWeapon" @change="debouncedRecalc" :placeholder="$t('buildview.selectWeapon')">
            <el-option v-for="weapon in riven.weapons" :key="weapon.id" :label="weapon.displayName" :value="weapon.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择KITGUN组件 -->
        <el-form-item :label="$t('buildview.components')" v-if="riven.isKitgun">
          <el-select style="width:120px" size="small" v-model="gripId" @change="kitgunPartChange" :placeholder="$t('buildview.selectKitgunGrip')">
            <el-option v-for="grip in gripList" :key="grip.id" :label="$t(`messages.${grip.name}`)" :value="grip.id">
            </el-option>
          </el-select>
          <el-select style="width:120px" size="small" v-model="loaderId" @change="kitgunPartChange" :placeholder="$t('buildview.selectKitgunLoader')">
            <el-option v-for="loader in loaderList" :key="loader.id" :label="$t(`messages.${loader.name}`)" :value="loader.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择比较类型 -->
        <el-form-item>
          <el-radio-group size="small" v-model="selectCompMethod" @change="debouncedRecalc">
            <el-tooltip effect="dark" :content="$t('buildview.totalDamageTip')" placement="bottom">
              <el-radio-button :label="0">{{$t("buildview.totalDamage")}}</el-radio-button>
            </el-tooltip>
            <el-tooltip v-if="weapon.tags.includes('Sniper')" effect="dark" :content="$t('buildview.firstAmmoDamageTip')" placement="bottom">
              <el-radio-button :label="3">{{$t("buildview.firstAmmoDamage")}}</el-radio-button>
            </el-tooltip>
            <el-tooltip effect="dark" :content="$t('buildview.burstDamageTip')" placement="bottom">
              <el-radio-button :label="1">{{$t("buildview.burstDamage")}}</el-radio-button>
            </el-tooltip>
            <el-tooltip effect="dark" :content="$t('buildview.sustainedDamageTip')" placement="bottom">
              <el-radio-button :label="2">{{$t("buildview.sustainedDamage")}}</el-radio-button>
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
        <el-form-item :label="$t('buildview.headshotChance')">
          <el-tooltip effect="dark" :content="$t('buildview.headshotChanceTip')" placement="bottom">
            <el-slider v-model="headShotChance" :format-tooltip="v=>v+'%'" style="width:200px;margin-left: 8px;"></el-slider>
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
          <el-checkbox v-if="riven.mod === 'Rifle'" v-model="useHeavyCaliber" @change="debouncedRecalc">{{$t("buildview.heavyCaliber")}}</el-checkbox>
          <el-checkbox v-if="weapon.tags.includes('Sniper')" v-model="usePrimedChamber" @change="debouncedRecalc">{{$t("buildview.primedChamber")}}</el-checkbox>
          <el-tooltip effect="dark" :content="$t('buildview.acolyteModsTip')" placement="bottom">
            <el-checkbox v-model="useAcolyteMods" @change="useAcolyteModsChange">{{$t("buildview.acolyteMods")}}</el-checkbox>
          </el-tooltip>
        </el-form-item>
        <!-- 赋能 -->
        <el-form-item :label="$t('buildview.arcanes')">
          <el-checkbox-group v-model="arcanes">
            <el-checkbox v-for="arcane in availableArcanes" :key="arcane.id" :label="arcane" @change="debouncedRecalc">{{$t(`buff.${arcane.name}`)}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { BaseModBuildView } from "./BaseModBuildView";
import { GunModBuild, GunCompareMode } from "@/warframe/gunmodbuild";
import { KitgunChamberData, KitgunGripData, KitgunLoaderData, KitgunChamber, KitgunGrip, KitgunLoader, Kitgun, RivenDataBase, Codex, GunWeapon } from "@/warframe/codex";
import { RivenMod } from "@/warframe/rivenmod";

@Component
export default class GunModBuildView extends BaseModBuildView {
  builds: [string, GunModBuild][] = []
  /** 使用追随者MOD */
  useAcolyteMods = false
  /** 使用重口径 */
  useHeavyCaliber = true
  /** 使用金首发 */
  usePrimedChamber = false
  /** 使用猎人战备 */
  useHunterMunitions = false;
  notMustUseHunterMunitions = false;
  /** 爆头几率 */
  headShotChance = 0;
  /** 基伤加成 */
  extraBaseDamage = 0;
  /** 总伤加成 */
  extraOverall = 0;
  /** 赋能 */
  arcanes = [];

  chamberList = KitgunChamberData;
  gripList = KitgunGripData;
  loaderList = KitgunLoaderData;
  chamber: KitgunChamber = null;
  grip: KitgunGrip = null;
  loader: KitgunLoader = null;
  gripId: string = null;
  loaderId: string = null;

  /** [overwrite] 武器 */
  get weapon() {
    if (this.riven.isKitgun) {
      return new Kitgun(this.chamber, this.grip, this.loader);
    }
    else
      return RivenDataBase.getNormalWeaponsByName(this.selectWeapon);
  }

  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }

  // === 计算属性 ===
  get selectCompMethodText() {
    return [this.$t("buildview.totalDamage"), this.$t("buildview.burstDamage"), this.$t("buildview.sustainedDamage"), this.$t("buildview.firstAmmoDamage")][this.selectCompMethod];
  }

  /**
   * 计算默认模式
   * if 弹匣 / 射速 < 1.5 * 换弹时间 默认为持续伤害
   * if 射速 > 2 默认为爆发伤害
   * else 默认为单发伤害
   */
  get defalutMode() {
    let gun = this.weapon as GunWeapon;
    if (gun.tags.includes("Sniper") && gun.magazine <= 2) return GunCompareMode.FirstAmmoDamage;
    if (gun.magazine / gun.fireRate < gun.reload * 1.5) return GunCompareMode.SustainedDamage;
    if (gun.fireRate > 2) return GunCompareMode.BurstDamage;
    return GunCompareMode.TotalDamage;
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
  @Watch("headShotChance")
  @Watch("slots")
  debouncedRecalc() {
    this.builds = [];
    this._debouncedRecalc();
  }
  useAcolyteModsChange() {
    this.debouncedRecalc();
    localStorage.setItem("useAcolyteMods", JSON.stringify(this.useAcolyteMods));
  }

  @Watch("riven")
  rivenChange(riven?: RivenMod, oldRiven?: RivenMod) {
    if (this.riven.isKitgun) {
      this.chamber = KitgunChamberData.find(v => v.id === this.riven.id);
      this.selectWeapon = this.riven.id;
    } else {
      let weapons = this.riven.weapons;
      if (!weapons || weapons.length === 0) {
        console.warn("warn: weapons.length === 0");
        return;
      }
      this.selectWeapon = weapons[weapons.length - 1].id;
    }
    if (!oldRiven || this.riven && oldRiven.id !== this.riven.id)
      this.selectCompMethod = this.defalutMode;
    this.debouncedRecalc();
  }

  kitgunPartChange() {
    this.grip = this.gripList.find(v => v.id === this.gripId);
    this.loader = this.loaderList.find(v => v.id === this.loaderId);
    this.debouncedRecalc();
  }
  // === 生命周期钩子 ===
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => { this.recalc(); }, 150);
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
      usePrimedChamber: this.usePrimedChamber,
      useHunterMunitions: this.useHunterMunitions ? this.notMustUseHunterMunitions ? 1 : 2 : 0,
      headShotChance: this.headShotChance / 100,
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
.rank-final {
  font-size: 38px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: #3d5afe;
  background-image: linear-gradient(90deg, #3d5afe 0%, #508aff 100%);
  color: #fff;
  display: inline-block;
  text-align: center;
  border-radius: 30px;
  padding: 8px;
  color: #fff;
  margin: -20px 10px -20px -48px;
}
.build-container .setting {
  background: #fff;
  padding: 8px 20px 0;
  margin: 16px 0;
  border-radius: 20px;
  border-left: 4px solid #3e5dfe;
  border-right: 4px solid #508aff;
}
.build-item .el-tag {
  background: #fff;
  border-radius: 20px;
}
.build-list .loading {
  padding: 10px 20px;
}
.build-list .el-collapse-item + .el-collapse-item .el-collapse-item__header {
  padding-top: 0;
}
.build-list .el-collapse-item__header,
.build-list .el-collapse-item__wrap {
  background: unset;
  border: 0;
}
.build-list {
  background-color: #fff;
  color: #222;
  border-radius: 20px;
  border-left: 4px solid #3e5dfe;
  border-right: 4px solid #508aff;
}
.build-list .el-collapse-item__header {
  margin: 8px 8px 0;
  height: auto;
  min-height: 40px;
  border-radius: 20px;
  background-color: #3d5afe;
  background-image: linear-gradient(90deg, #3d5afe 0%, #508aff 100%);
}
.build-list .el-collapse-item__arrow {
  line-height: 40px;
  margin-right: 16px;
  color: #fff;
}
.build-title {
  font-size: 1rem;
  line-height: 40px;
  padding: 0px 16px;
  color: #fff;
}
.build-card-header {
  padding: 10px 0px;
  border: 0;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #fff;
  margin: 8px;
  border-radius: 20px;
  color: #68646d;
  text-shadow: none;
}
.build-result {
  font-size: 1em;
  margin: 0 10px;
  padding: 10px;
}
.build-result .rank-progress {
  width: 140px;
  display: inline-block;
}
.build-result .rank-progress-text {
  display: inline-block;
  font-size: 14px;
  color: #606266;
  vertical-align: middle;
  margin: 0 6px;
  line-height: 1;
}
@media only screen and (max-width: 482px) {
  .build-result .rank-progress {
    display: none;
  }
}
/* 以上是新样式 */

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
  margin: 4px;
}
.build-list .build-container {
  overflow: visible;
  padding: 0;
}
.build-list .el-collapse-item__content {
  padding-bottom: 14px;
}
.build-container .el-collapse {
  border: 0;
}
.build-container .el-collapse-item__wrap {
  overflow: visible;
}
.build-container .el-collapse-item:last-child .el-collapse-item__wrap,
.build-container .el-collapse-item:last-child .el-collapse-item__header {
  border: 0;
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
  padding-bottom: 8px;
}
.score-text {
  color: #f56c6c;
}
.build-card-box {
  overflow: hidden;
  transition: max-height 0.4s ease-in;
  max-height: 56px;
  margin-bottom: 8px;
  position: absolute;
  width: calc(100% - 12px);
  z-index: 8;
  text-align: center;
  cursor: pointer;
  color: #fff;
  font-size: 1em;
  text-shadow: rgba(0, 0, 0, 0.9) 0px 1px 2px;
  border-radius: 27px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.12), transparent);
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
