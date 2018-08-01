<template>
  <div class="build-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="武器" v-if="riven.weapons.length > 1">
        <el-select size="small" v-model="selectWeapon" placeholder="请选择">
          <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.name" :value="weapon.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group size="small" v-model="selectCompMethod">
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
        <el-tooltip effect="dark" content="给武器专属或后坐力等MOD预留位置" placement="bottom">
          <el-input-number size="small" v-model="slots" :min="4" :max="8" label="使用MOD槽位"></el-input-number>
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
      <el-form-item label="爆头率">
        <el-tooltip effect="dark" content="更高的爆头率会提高暴击的收益" placement="bottom">
          <el-slider v-model="handShotChance" :format-tooltip="v=>v+'%'" style="width:200px;margin-left: 8px;"></el-slider>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="使用MOD">
        <el-checkbox v-if="riven.type === 'Rifle'" v-model="useHeavyCaliber">重口径</el-checkbox>
        <el-tooltip v-if="riven.type === 'Rifle'" effect="dark" content="增伤很强大，但切割伤害不是立刻死亡，请自行选择" placement="bottom">
          <el-checkbox v-model="useHunterMunitions" :indeterminate="notMustUseHunterMunitions" @change="useHunterMunitionsChange">猎人战备</el-checkbox>
        </el-tooltip>
        <el-tooltip effect="dark" content="如尖刃弹头等需要瞄准的MOD" placement="bottom">
          <el-checkbox v-model="useAcolyteMods">追随者MOD</el-checkbox>
        </el-tooltip>
      </el-form-item>
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
          <el-tag style="margin-left: 8px;">射速: {{(build[1].fireRate).toFixed(1)}} </el-tag>
          <el-tag style="margin-left: 8px;">触发率(每个弹片): {{(build[1].procChancePerBullet*100).toFixed(1)}}% </el-tag>
          <el-tag v-if="build[1].slashDotDamage > 0" style="margin-left: 8px;">猎人战备切割伤害: {{(build[1].slashDotDamage).toFixed(1)}} </el-tag>
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
import { GunCompareMode } from "@/warframe/gunmodbuild";
import { GunWeapon, DamageType, DamageTypeDatabase } from "@/warframe/data";

@Component
export default class GunModBuildView extends Vue {
  @Prop() riven: RivenMod
  selectWeapon = ""
  selectCompMethod: GunCompareMode = GunCompareMode.TotalDamage
  selectDamageType: string = null
  builds: [string, GunModBuild][] = []
  /** 使用追随者MOD */
  useAcolyteMods = false
  /** 使用重口径 */
  useHeavyCaliber = true
  /** 使用猎人战备 */
  useHunterMunitions = false;
  notMustUseHunterMunitions = false;
  /** 插槽使用数 */
  slots = 8
  /** 紫卡分数 */
  score = 0
  /** 爆头几率 */
  handShotChance = 0
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
  get selectCompMethodText() {
    return ["单发伤害", "爆发伤害", "持续伤害"][this.selectCompMethod];
  }
  @Watch("riven")
  rivenChange() {
    let weapons = this.riven.weapons;
    this.selectWeapon = weapons[weapons.length - 1].name;
    if (this.selectCompMethod == GunCompareMode.TotalDamage && weapons[weapons.length - 1].tags.includes("射线"))
      this.selectCompMethod = GunCompareMode.BurstDamage;
    this.debouncedRecalc();
  }
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

  @Watch("handShotChance")
  @Watch("useHeavyCaliber")
  @Watch("selectCompMethod")
  @Watch("slots")
  @Watch("selectWeapon")
  debouncedRecalc() {
    this._debouncedRecalc();
  }
  @Watch("useAcolyteMods")
  useAcolyteModsChange() {
    this.debouncedRecalc();
    localStorage.setItem("useAcolyteMods", JSON.stringify(this.useAcolyteMods));
  }
  @Watch("selectDamageType")
  selectDamageTypeChange() {
    this.debouncedRecalc();
    if (this.selectDamageType)
      localStorage.setItem("selectDamageType", this.selectDamageType);
    else
      localStorage.removeItem("selectDamageType");
  }
  mounted() { }
  beforeMount() {
    this._debouncedRecalc = _.debounce(() => { this.recalc(); }, 10);
    this.selectDamageType = localStorage.getItem("selectDamageType") || null;
    this.useAcolyteMods = JSON.parse(localStorage.getItem("useAcolyteMods"));
    this.rivenChange();
  }

  recalc() {
    this.builds = [];
    let stand = new GunModBuild(this.riven, this.selectWeapon);
    let riven = new GunModBuild(this.riven, this.selectWeapon);
    stand.compareMode = riven.compareMode = this.selectCompMethod;
    stand.useAcolyteMods = riven.useAcolyteMods = this.useAcolyteMods;
    stand.useHeavyCaliber = riven.useHeavyCaliber = this.useHeavyCaliber;
    stand.useHunterMunitions = riven.useHunterMunitions = this.useHunterMunitions ? this.notMustUseHunterMunitions ? 1 : 2 : 0;
    stand.handShotChance = riven.handShotChance = this.handShotChance / 100;
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
  padding-bottom: 12px;
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
