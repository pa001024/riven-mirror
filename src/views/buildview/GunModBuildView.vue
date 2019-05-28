<template>
  <div class="build-container">
    <!-- 配置列表 -->
    <div class="build-list">
      <!-- 评级 -->
      <div class="build-result" v-if="builds.length">
        <span class="rank-final">{{scoreLevelText}}</span>
        <el-progress class="rank-progress" :show-text="false" :percentage="+(scoreLevel<0?0:scoreLevel>100?100:scoreLevel).toFixed()"></el-progress>
        <span class="rank-progress-text">{{$t("buildview.score", [scoreLevel.toFixed()])}}</span>
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
              {{$t(build[0])}} &nbsp;-&nbsp; {{build[1].compareDamage.toFixed(1)}} {{selectCompMethodText}}
            </div>
          </template>
          <el-row type="flex" :gutter="12" class="build-item autozoom" style="margin:8px;">
            <el-col class="build-card" :span="bigScreen ? 12 : 24" :sm="12" :md="6" :lg="3" v-for="mod in build[1].mods" :key="mod.name">
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
          <el-row class="build-prop">
            <el-button size="small" type="primary" round @click="toBuild(build[1])">{{$t("buildview.tobuild")}}</el-button>
            <el-tag>{{$t("buildview.panelDamage")}} {{build[1].panelDamage.toFixed(1)}} </el-tag>
            <el-tag>{{$t("buildview.critChance")}} {{(build[1].critChance*100).toFixed(1)}}% </el-tag>
            <el-tag>{{$t("buildview.critMul")}} {{(build[1].critMul).toFixed(1)}}x </el-tag>
            <el-tag>{{$t("buildview.fireRate")}} {{(build[1].fireRate).toFixed(1)}} </el-tag>
            <el-tag>{{$t("buildview.magazine")}} {{(build[1].magazineSize).toFixed(0)}} </el-tag>
            <el-tag>{{$t("buildview.reload")}} {{(build[1].reloadTime).toFixed(1)}} </el-tag>
            <el-tag>{{$t("buildview.status")}} {{(build[1].realProcChance*100).toFixed(1)}}% </el-tag>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div class="loading" v-else>
        <i class="el-icon-loading"></i> {{$t("buildview.loading")}}
      </div>
    </div>
    <!-- 设置区域 -->
    <div class="setting">
      <el-form :inline="true" class="build-form-inline" :size="bigScreen ? 'mini' : 'small'">
        <!-- 选择武器 -->
        <el-form-item :label="$t('buildview.weapon')" v-if="riven.weapons.length > 1">
          <el-select v-model="selectWeapon" @change="debouncedRecalc" :placeholder="$t('buildview.selectWeapon')">
            <el-option v-for="weapon in riven.weapons" :key="weapon.id" :label="weapon.displayName" :value="weapon.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择KITGUN组件 -->
        <el-form-item :label="$t('buildview.components')" v-if="riven.isKitgun">
          <el-select style="width:120px" v-model="gripId" @change="kitgunPartChange" :placeholder="$t('buildview.selectKitgunGrip')">
            <el-option v-for="grip in gripList" :key="grip.id" :label="$t(`messages.${grip.name}`)" :value="grip.id">
            </el-option>
          </el-select>
          <el-select style="width:120px" v-model="loaderId" @change="kitgunPartChange" :placeholder="$t('buildview.selectKitgunLoader')">
            <el-option v-for="loader in loaderList" :key="loader.id" :label="$t(`messages.${loader.name}`)" :value="loader.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择比较类型 -->
        <el-form-item>
          <el-radio-group v-model="selectCompMethod" @change="debouncedRecalc">
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
            <el-input-number v-model="slots" :min="4" :max="8"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <!-- 限制元素类型 -->
        <el-form-item :label="$t('buildview.limitElementsType')">
          <el-tooltip effect="dark" :content="$t('buildview.limitElementsTypeTip')" placement="bottom">
            <el-select v-model="selectDamageType" @change="selectDamageTypeChange()" :placeholder="$t('buildview.unlimited')" clearable style="width: 120px;">
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
            <el-input class="chroma-dmg" v-model="extraBaseDamage" style="width:120px">
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
            <el-input class="chroma-dmg" v-model="extraOverall" style="width:120px">
              <template slot="append">%</template>
            </el-input>
          </el-tooltip>
        </el-form-item>
        <!-- 使用MOD -->
        <el-form-item :label="$t('buildview.usemods')">
          <el-checkbox v-if="riven.mod === 'Rifle'" v-model="useHeavyCaliber" @change="debouncedRecalc">{{$t("buildview.heavyCaliber")}}</el-checkbox>
          <el-checkbox v-if="riven.mod === 'Archgun'" v-model="useDeadlyEfficiency" @change="debouncedRecalc">{{$t("buildview.deadlyEfficiency")}}</el-checkbox>
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
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { BaseModBuildView } from "./BaseModBuildView";
import { GunModBuild, GunCompareMode } from "@/warframe/gunmodbuild";
import { KitgunChamberData, KitgunGripData, KitgunLoaderData, KitgunChamber, KitgunGrip, KitgunLoader, Kitgun, RivenDataBase, Codex } from "@/warframe/codex";
import { RivenMod } from "@/warframe/rivenmod";
import "@/less/buildview.less";
import localStorage from "universal-localstorage";

@Component
export default class GunModBuildView extends BaseModBuildView {
  builds: [string, GunModBuild][] = [];
  /** 使用追随者MOD */
  useAcolyteMods = false;
  /** 使用重口径 */
  useHeavyCaliber = true;
  /** 使用致命效率 */
  useDeadlyEfficiency = false;
  /** 使用金首发 */
  usePrimedChamber = false;
  /** 使用猎人战备 */
  useHunterMunitions = false;
  notMustUseHunterMunitions = false;
  /** 爆头几率 */
  headShotChance = 0;
  /** 基伤加成 */
  extraBaseDamage = 0;
  /** 总伤加成 */
  extraOverall = 0;

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
    if (this.riven.weapon.isKitgun) {
      return new Kitgun(this.chamber, this.grip, this.loader);
    } else return RivenDataBase.getNormalWeaponByName(this.selectWeapon);
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
   * if 弹匣 / 射速 < 1.8 * 换弹时间 (手枪再乘1.6) 默认为持续伤害
   * if 射速 > 2 默认为爆发伤害
   * else 默认为单发伤害
   */
  get defalutMode() {
    let gun = this.weapon;
    if (gun.tags.includes("Sniper") && gun.magazine <= 2) return GunCompareMode.FirstAmmoDamage;
    if (gun.magazine / (gun.tags.includes("Secondary") ? gun.defalutMode.fireRate * 1.6 : gun.defalutMode.fireRate) < gun.reload * 1.8) return GunCompareMode.SustainedDamage;
    if (gun.defalutMode.fireRate > 2) return GunCompareMode.BurstDamage;
    return GunCompareMode.TotalDamage;
  }

  // === 事件处理器 ===
  useHunterMunitionsChange(newVal, oldVal) {
    // 三种状态 state:use,notMust = 0:ff 1:?t 2:tf
    if (this.notMustUseHunterMunitions) {
      this.notMustUseHunterMunitions = false;
      this.useHunterMunitions = true;
    } else {
      if (newVal) this.notMustUseHunterMunitions = true;
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
    if (this.riven.weapon.isKitgun) {
      this.chamber = KitgunChamberData.find(v => v.name === this.riven.name);
      this.selectWeapon = this.riven.name;
    } else {
      let weapons = this.riven.weapon.weapons;
      if (!weapons || weapons.length === 0) {
        console.warn("warn: weapons.length === 0");
        return;
      }
      this.selectWeapon = weapons[weapons.length - 1].name;
    }
    if (!oldRiven || (this.riven && oldRiven.name !== this.riven.name)) this.selectCompMethod = this.defalutMode;
    this.debouncedRecalc();
  }

  kitgunPartChange() {
    this.grip = this.gripList.find(v => v.name === this.gripId);
    this.loader = this.loaderList.find(v => v.name === this.loaderId);
    this.debouncedRecalc();
  }
  // === 生命周期钩子 ===
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => {
      this.recalc();
    }, 150);
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
      useDeadlyEfficiency: this.useDeadlyEfficiency,
      usePrimedChamber: this.usePrimedChamber,
      useHunterMunitions: this.useHunterMunitions ? (this.notMustUseHunterMunitions ? 1 : 2) : 0,
      headShotChance: this.headShotChance / 100,
      allowElementTypes: (this.selectDamageType && this.elementTypes[this.selectDamageType]) || null,
      extraBaseDamage: +this.extraBaseDamage,
      extraOverall: +this.extraOverall
    };
    super.recalc(GunModBuild, options);
  }
}
</script>
