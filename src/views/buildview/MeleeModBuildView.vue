<template>
  <div class="build-container">
    <div class="build-list">
      <!-- 评级 -->
      <div class="build-result" v-if="builds.length">
        <span class="rank-final">{{ scoreLevelText }}</span>
        <el-progress class="rank-progress" :show-text="false" :percentage="+(scoreLevel < 0 ? 0 : scoreLevel > 100 ? 100 : scoreLevel).toFixed()"></el-progress>
        <span class="rank-progress-text">{{ $t("buildview.score", [scoreLevel.toFixed()]) }}</span>
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
            <div class="build-title">{{ $t(build[0]) }} &nbsp;-&nbsp; {{ build[1].compareDamage.toFixed(1) }} {{ selectCompMethodText }}</div>
          </template>
          <el-row type="flex" :gutter="12" class="build-item autozoom" style="margin:8px;">
            <el-col class="build-card" :span="bigScreen ? 12 : 24" :sm="12" :md="6" :lg="3" v-for="mod in build[1].vmods" :key="mod.name">
              <div class="build-card-box" :class="[mod.rarity]">
                <div class="build-card-header">
                  <div class="build-card-name">{{ mod.name }}</div>
                </div>
                <div class="build-card-body">
                  <div class="build-card-prop" v-for="prop in mod.vProps" :key="prop.id">
                    {{ prop.fullName }}
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="build-prop">
            <el-button size="small" type="primary" round @click="toBuild(build[1])">{{ $t("buildview.tobuild") }}</el-button>
            <el-tag>{{ $t("buildview.panelDamage") }} {{ build[1].panelDamage.toFixed(1) }} </el-tag>
            <el-tag>{{ $t("buildview.critChance") }} {{ (build[1].critChance * 100).toFixed(1) }}% </el-tag>
            <el-tag>{{ $t("buildview.critMul") }} {{ build[1].critMul.toFixed(1) }}x </el-tag>
            <el-tag v-if="build[1].range">{{ $t("build.range") }} {{ build[1].range.toFixed(1) }}m </el-tag>
            <el-tag>{{ $t("buildview.fireRate") }} {{ build[1].fireRate.toFixed(1) }} </el-tag>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div class="loading" v-else><i class="el-icon-loading"></i> {{ $t("buildview.loading") }}</div>
    </div>
    <!-- 设置区域 -->
    <div class="setting">
      <el-form :inline="true" class="build-form-inline" :size="bigScreen ? 'mini' : 'small'">
        <!-- 武器模式 -->
        <el-form-item :label="$t('build.weaponMode')" v-if="weapon.modes.length > 1">
          <el-select v-model="modeIndex" @change="debouncedRecalc" :placeholder="$t('build.weaponMode')">
            <el-option v-for="(item, k) in weapon.modes" :key="k" :label="item.locName" :value="k" />
          </el-select>
        </el-form-item>
        <!-- 选择武器 -->
        <el-form-item :label="$t('buildview.weapon')">
          <el-select v-model="selectWeapon" :placeholder="$t('buildview.selectWeapon')">
            <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.displayName" :value="weapon.name"> </el-option>
            <el-option v-for="weapon in vistualWeapons" :key="weapon.name" :label="weapon.displayName" :value="weapon.name"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择ZAW组件 -->
        <el-form-item :label="$t('buildview.components')" v-if="riven.weapon.isZaw">
          <el-select style="width:140px" v-model="gripId" @change="zawPartChange" :placeholder="$t('zaw.selectGrip')">
            <el-option v-for="grip in gripList" :key="grip.name" :label="$t(`messages.${grip.id}`)" :value="grip.name"> </el-option>
          </el-select>
          <el-select style="width:160px" v-model="linksId" @change="zawPartChange" :placeholder="$t('zaw.selectLinks')">
            <el-option v-for="links in linksList" :key="links.name" :label="$t(`messages.${links.id}`)" :value="links.name"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 选择比较类型 -->
        <el-form-item>
          <el-radio-group v-if="!isVirtualWeaponSelected" v-model="selectCompMethod" @change="debouncedRecalc">
            <el-radio-button :label="0">{{ $t("buildview.attackDamage") }}</el-radio-button>
            <el-radio-button :label="1">{{ $t("buildview.slideDamage") }}</el-radio-button>
            <el-radio-button :label="2">{{ $t("buildview.attackDamagePS") }}</el-radio-button>
            <el-radio-button :label="3">{{ $t("buildview.slideDamagePS") }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 限制MOD槽位 -->
        <el-form-item :label="$t('buildview.limitSlots')">
          <el-tooltip effect="dark" :content="$t('buildview.limitSlotsTip')" placement="bottom">
            <el-input-number v-model="slots" :min="4" :max="8"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <!-- 连击倍率 -->
        <el-form-item :label="$t('buildview.comboMul')">
          <el-tooltip effect="dark" :content="$t('buildview.comboMulTip')" placement="bottom">
            <el-input-number v-model="comboMul" @change="debouncedRecalc" :min="0" :max="12" :step="2"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <!-- 限制元素类型 -->
        <el-form-item :label="$t('buildview.limitElementsType')">
          <el-tooltip effect="dark" :content="$t('buildview.limitElementsTypeTip')" placement="bottom">
            <el-select v-model="selectDamageType" @change="selectDamageTypeChange()" :placeholder="$t('buildview.unlimited')" clearable style="width: 120px;">
              <el-option v-for="(value, name) in elementTypes" :key="name" :label="$t(`elements.${name}`)" :value="name"> </el-option>
            </el-select>
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
          <!-- 需求范围 -->
          <el-tooltip effect="dark" :content="$t('buildview.requireRangeTip')" placement="bottom">
            <el-checkbox v-model="requireRange" @change="debouncedRecalc">{{ $t("buildview.requireRange") }}</el-checkbox>
          </el-tooltip>
          <!-- 需求连击 -->
          <el-tooltip effect="dark" :content="$t('buildview.requireComboTip')" placement="bottom">
            <el-checkbox v-model="requireCombo" @change="debouncedRecalc">{{ $t("buildview.requireCombo") }}</el-checkbox>
          </el-tooltip>
          <!-- 异况量化 -->
          <el-tooltip effect="dark" :content="$t('buildview.condiOverTip')" placement="bottom">
            <el-checkbox v-model="calcCondiOver" @change="debouncedRecalc">{{ $t("buildview.condiOver") }}</el-checkbox>
          </el-tooltip>
        </el-form-item>
        <!-- 赋能 -->
        <el-form-item :label="$t('buildview.arcanes')">
          <el-checkbox-group v-model="arcanes">
            <el-checkbox v-for="arcane in availableArcanes" :key="arcane.id" :label="arcane" @change="debouncedRecalc">{{
              $t(`buff.${arcane.name}`)
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { debounce } from "lodash-es";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { BaseModBuildView } from "./BaseModBuildView";
import { MeleeModBuild, MeleeCompareMode } from "@/warframe/meleemodbuild";
import { ZawStrikeData, ZawGripData, ZawLinksData, ZawStrike, ZawGrip, ZawLinks, Zaw, RivenDatabase, Codex, WeaponDatabase, Weapon } from "@/warframe/codex";
import { RivenMod } from "@/warframe/rivenmod";
import "@/less/buildview.less";
import localStorage from "universal-localstorage";

@Component
export default class MeleeModBuildView extends BaseModBuildView {
  builds: [string, MeleeModBuild][] = [];
  /** 连击倍率 */
  comboMul = 4;
  /** 插槽使用数 */
  slots = 8;
  /** 基伤加成 */
  extraBaseDamage = 0;
  /** 总伤加成 */
  extraOverall = 0;
  /** 需求范围 */
  requireRange = true;
  /** 需求连击 */
  requireCombo = true;
  /** 异况量化 */
  calcCondiOver = false;

  strikeList = ZawStrikeData;
  gripList = ZawGripData;
  linksList = ZawLinksData;
  strike: ZawStrike = null;
  grip: ZawGrip = null;
  links: ZawLinks = null;
  gripId: string = null;
  linksId: string = null;

  vistualWeapons = WeaponDatabase.getProtosByTags(["Virtual", "Melee"]);

  get isVirtualWeaponSelected() {
    return this.weapon.tags.has("Virtual");
  }

  /** [overwrite] 武器 */
  get weapon() {
    if (this.riven.weapon.isZaw) return new Zaw(this.strike, this.grip, this.links);
    else return WeaponDatabase.getWeaponByName(this.selectWeapon);
  }

  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }

  // === 计算属性 ===
  get selectCompMethodText() {
    return this.$t("buildview." + ["attackDamage", "slideDamage", "attackDamagePS", "slideDamagePS"][this.selectCompMethod]).toString();
  }

  /**
   * 计算默认模式
   * if 类型 = 鞭子|长柄|杖 滑砍伤害
   * else 攻击伤害
   */
  get defalutMode() {
    let melee = this.weapon;
    let slideList = ["Whip", "Polearm", "Staff"];
    if (melee.tags.has(...slideList)) return MeleeCompareMode.SlideDamagePS;
    return MeleeCompareMode.TotalDamagePS;
  }

  // === 事件处理器 ===
  @Watch("extraBaseDamage")
  @Watch("extraOverall")
  @Watch("slots")
  debouncedRecalc() {
    this.builds = [];
    this._debouncedRecalc();
  }

  @Watch("riven")
  rivenChange(riven?: RivenMod, oldRiven?: RivenMod) {
    if (this.riven.weapon.isZaw) {
      this.strike = ZawStrikeData.find(v => v.name === this.riven.name);
      this.selectWeapon = this.riven.name;
    } else {
      let weapons = this.riven.weapon.variants;
      if (!weapons || weapons.length === 0) {
        console.warn("warn: weapons.length === 0");
        return;
      }
      this.selectWeapon = weapons[weapons.length - 1].name;
    }
    if (!oldRiven || (this.riven && oldRiven.name !== this.riven.name)) this.selectCompMethod = this.defalutMode;
    this.debouncedRecalc();
  }
  zawPartChange() {
    this.grip = this.gripList.find(v => v.name === this.gripId);
    this.links = this.linksList.find(v => v.name === this.linksId);
    this.debouncedRecalc();
  }
  // === 生命周期钩子 ===
  beforeMount() {
    this._debouncedRecalc = debounce(() => {
      this.recalc();
    }, 150);
    this.selectDamageType = localStorage.getItem("MeleeModBuildView.selectDamageType") || "Corrosive";
    this.rivenChange();
  }
  recalc() {
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    if (this.isVirtualWeaponSelected && this.selectCompMethod > 0) this.selectCompMethod = 0;
    let options = {
      compareMode: this.selectCompMethod,
      comboLevel: ~~((this.comboMul - 1) * 2),
      allowElementTypes: (this.selectDamageType && this.elementTypes[this.selectDamageType]) || null,
      extraBaseDamage: +this.extraBaseDamage,
      extraOverall: +this.extraOverall,
      calcCondiOver: this.calcCondiOver,
      requireRange: this.requireRange,
      requireCombo: this.requireCombo,
    };
    super.recalc(MeleeModBuild, options);
  }
  @Watch("weapon")
  weaponChange(weapon: Weapon) {
    this.modeIndex = -1;
    // 自动配卡优化
    this.requireCombo = !weapon.tags.has("Virtual");
    this.requireRange = true;
    this.debouncedRecalc();
  }
}
</script>
