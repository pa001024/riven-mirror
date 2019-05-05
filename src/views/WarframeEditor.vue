<template>
  <div class="editor-main team-editor-main">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <!-- 基础信息区域 -->
        <div class="core-info" v-if="core">
          <el-card class="infobox">
            <!-- 二维码和名称 -->
            <div slot="header" class="core-name">
              <span class="title">{{core.name}}</span>
              [
              <span class="forma"> {{$t("build.formaCount", [build.formaCount])}} </span>
              <span class="umbra" v-if="build.umbraCount"> + {{build.umbraCount}}U </span>
              ]
              <ShareQR :url="build.miniCodeURL"/>
            </div>
            <div class="warframe-props">
              <!-- 容量 -->
              <el-row :gutter="4" class="prop-diff cost-show">
                <el-col :span="8" class="title">{{$t('build.cost')}}</el-col>
                <el-col :span="7" class="diff diff-ori" :class="{error: build.maxCost < build.totalCost}">
                  {{build.maxCost - build.totalCost}}
                </el-col>
                <template v-if="build.totalCost > 0">
                  <el-col :span="2" class="diff-arrow">/</el-col>
                  <el-col :span="7" class="diff diff-val">
                    {{build.maxCost}}
                  </el-col>
                </template>
              </el-row>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 1}" @click="changeMode(1)"
                :name="$t('build.health')" :ori="coreBuild.health" :val="build.health"></PropDiff>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 3}" @click="changeMode(3)"
                :name="$t('build.shield')" :ori="coreBuild.shield" :val="build.shield"></PropDiff>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 2}" @click="changeMode(2)"
                :name="$t('build.armor')" :ori="coreBuild.armor" :val="build.armor"></PropDiff>
              <PropDiff :name="$t('build.energy')" :ori="coreBuild.energy" :val="build.energy"></PropDiff>
              <PropDiff :name="$t('build.sprint')" :ori="coreBuild.sprint" :val="build.sprint" :preci="2"></PropDiff>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"
                :name="$t('build.effectiveHealth')" :ori="coreBuild.effectiveHealth" :val="build.effectiveHealth" :preci="0"></PropDiff>
              <br>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 4}" @click="changeMode(4)"
                :name="$t('build.abilityStrength')" :ori="coreBuild.abilityStrength" :val="build.abilityStrength" percent :preci="0"></PropDiff>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 5}" @click="changeMode(5)"
                :name="$t('build.abilityDuration')" :ori="coreBuild.abilityDuration" :val="build.abilityDuration" percent :preci="0"></PropDiff>
              <PropDiff :name="$t('build.abilityEfficiency')" :ori="coreBuild.abilityEfficiency" :val="build.abilityEfficiency" percent :preci="0"></PropDiff>
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 6}" @click="changeMode(6)"
                :name="$t('build.abilityRange')" :ori="coreBuild.abilityRange" :val="build.abilityRange" percent :preci="0"></PropDiff>
            </div>
          </el-card>
          <!-- 选项区域 -->
          <el-card class="build-tools">
            <el-button-group class="build-tools-action">
              <el-button type="primary" size="small" @click="fill()">{{$t("build.fill")}}</el-button>
              <el-button type="primary" size="small" @click="fillEmpty()">{{$t("build.fillEmpty")}}</el-button>
              <el-button type="primary" size="small" @click="clear()">{{$t("build.clear")}}</el-button>
            </el-button-group>
            <el-form class="build-form-editor">
              <!-- 生命球 -->
              <el-form-item :label="$t('build.healthBall')" v-if="currentTab.mods.some(v=>v&&v.id==='Health Conversion')">
                <el-input-number class="right-side" size="small" v-model="healthBall" @change="optionChange" :min="0" :max="3"/>
              </el-form-item>
              <!-- 能量球 -->
              <el-form-item :label="$t('build.energyBall')" v-if="currentTab.mods.some(v=>v&&v.id==='Energy Conversion')">
                <el-switch class="right-side" size="small" v-model="energyBall" @change="optionChange"/>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :xs="24" :sm="12" :lg="18">
        <!-- MOD区域 -->
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="index" v-for="(item, index) in tabs" :label="item.title" :name="item.name">
            <el-row type="flex" class="mod-slot-container autozoom" :gutter="12">
              <el-col class="list-complete-item" :span="bigScreen ? 12 : 24" :sm="12" :md="12" :lg="6">
                <LeveledModSlot icon="aura" @level="refleshMods()" @change="slotClick(-2)" @remove="slotRemove(-2)" :mod="item.aura" :build="item.build" :polarization="item.build.auraPol"/>
              </el-col>
              <el-col class="list-complete-item" :span="bigScreen ? 12 : 24" :sm="12" :md="12" :lg="6">
                <LeveledModSlot icon="exilus" @level="refleshMods()" @change="slotClick(-1)" @remove="slotRemove(-1)" :mod="item.exilus" :build="item.build" :polarization="item.build.exilusPol"/>
              </el-col>
            </el-row>
            <el-row type="flex" class="mod-slot-container autozoom" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :span="bigScreen ? 12 : 24" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <LeveledModSlot @level="refleshMods()" @change="slotClick(index)" @remove="slotRemove(index)" :mod="mod" :build="item.build" :polarization="item.build.polarizations[index]"/>
                </el-col>
              </draggable>
            </el-row>
            <div class="buff-head">{{$t('build.buff')}}</div>
            <!-- Buff区域 -->
            <el-row type="flex" class="buff-slot-container autozoom" :gutter="12">
              <div class="block">
                <el-col class="list-complete-item" :span="bigScreen ? 12 : 24" :sm="12" :md="12" :lg="6" v-for="(buff, index) in item.buffs" :key="index">
                  <div class="buff-slot" :class="[{ active: !buff }]" @click="!buff && buffClick(index)">
                    <template v-if="buff">
                      <div class="buff-title" :class="{layers: buff.layerEnable, powers: buff.powerEnable}">
                        <div class="buff-name">{{$t(`buff.${buff.name}`)}}</div>
                        <div class="buff-parm layer" v-if="buff.layerEnable"><el-input-number @change="refleshMods()" size="mini" v-model="buff.layer" :min="1" :max="buff.data.multiLayer.maxStack"></el-input-number></div>
                        <div class="buff-parm power" v-if="buff.powerEnable"><el-input-number @change="refleshMods()" :step="0.5" size="mini" v-model="buff.power"></el-input-number></div>
                      </div>
                      <div class="buff-detail" @click.stop="buffRemove(index)">
                        <div class="buff-stat">
                          <div class="buff-prop" v-for="prop in buff.vProps" :key="prop.id">{{prop.fullName}}</div>
                          <div class="buff-sum" v-show="item.build.buffValue(index)">{{PNNum(100 * item.build.buffValue(index))}}% {{$t("build.total")}}</div>
                        </div>
                        <div class="buff-action">
                          <button type="button" class="buff-slot-remove">
                            <i class="el-icon-close"></i>
                          </button>
                        </div>
                      </div>
                    </template>
                    <i v-else class="el-icon-plus"></i>
                  </div>
                </el-col>
              </div>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 技能区域 -->
        <el-tabs v-model="currentAbility">
          <el-tab-pane :key="index" v-for="(abi, index) in build.Abilities" :label="abi.name" :name="String(index)">
            <el-card class="skill-container">
              <div slot="header">
                <el-row type="flex" justify="space-between">
                  <el-col>
                    <el-row>
                      <el-col class="skill-name">
                        <a class="skill-wiki" target="_blank" :href="$t('zh') ? `https://warframe.huijiwiki.com/wiki/${abi.name}` : `https://warframe.fandom.com/wiki/${abi.name}`">{{abi.name}}</a>
                      </el-col>
                      <el-col class="skill-tags">
                        <div class="skill-tag" :key="index" v-for="(tag, index) in abi.tags">{{tag}}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col class="skill-costs">
                    <div class="skill-cost">
                      {{$t("ability.energyCost", [+abi.energyCost.toFixed(2)])}}
                    </div>
                    <div class="skill-cost" v-if="abi.energyCostPS">
                      {{$t("ability.energyCostPS", [+abi.energyCostPS.toFixed(2)])}}
                    </div>
                    <div class="skill-cost" v-if="abi.energyCostN">
                      {{$t("ability.energyCostN", [+abi.energyCostN.toFixed(2)])}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-row :gutter="12">
                <el-col class="skill-effects" :span="24">
                  <div class="skill-effect" :key="index" v-for="([name, effect], index) in abi.props">
                    <div class="effect-name">{{$t(`ability.effects.${name}`)}}</div>
                    <div class="effect-detail">
                      <!-- special -->
                      <template v-if="effect[0]">
                        <div class="effect-prop special" :key="vn" v-for="(vv, vn) in effect">
                          <div class="prop-name">{{$t(`ability.props.${vv.desc}`)}}</div>
                          <div class="prop-value normal">{{vv.val}}</div>
                        </div>
                      </template>
                      <!-- normal -->
                      <template v-else>
                        <div class="effect-prop" :key="vn" v-for="(vv, vn) in effect">
                          <div class="prop-name">{{$t(`ability.props.${vn}`)}}</div>
                          <div class="prop-value damage" v-if="Array.isArray(vv)">
                            <template v-if="vn === 'damage' || vn === 'rangeDamage'">
                              <div class="dmg" :key="dname" v-for="([dname, dvalue]) in vv">
                                <WfIcon :type="dname.toLowerCase()"/>
                                <span class="value">{{dvalue}}</span>
                              </div>
                            </template>
                            <template v-else>
                              <div class="prop" :key="pname" v-for="([pname, pvalue]) in vv">
                                {{renderProps([pname, pvalue]).fullString}}
                              </div>
                            </template>
                          </div>
                          <!-- Exalted Weapon -->
                          <div class="prop-value weapon" v-else-if="vn==='weaponName'">
                            <a class="link-btn" :href="`/weapon/${vv}/${renderWeaponProps(abi)}`">{{renderWeapon(vv)}}</a>
                          </div>
                          <div class="prop-value normal" v-else>
                            {{vv}}
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :title="$t('build.selectMod')" :visible.sync="modDialogVisible" width="600">
      <LeveledModSelector :type="selectModType" ref="selector" :build="build" @command="modSelect($event)" />
    </el-dialog>
    <el-dialog :title="$t('build.selectBuff')" :visible.sync="buffDialogVisible" width="600">
      <BuffSelector ref="buffselector" :build="build" @command="buffSelect($event)"></BuffSelector>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { WarframeBuild } from "@/warframe/warframebuild";
import LeveledModSlot from "@/components/LeveledModSlot.vue";
import LeveledModSelector from "@/components/LeveledModSelector.vue";
import BuffSelector from "@/components/BuffSelector.vue";
import PropDiff from "@/components/PropDiff.vue";
import ShareQR from "@/components/ShareQR.vue";
import { NormalMod, Buff, Warframe, WarframeDataBase, ValuedProperty, BuffData, RivenDataBase, AbilityPropTypes } from "@/warframe/codex";
import "@/less/builder.less";
import { i18n } from "@/i18n";
import { Getter, Action } from "vuex-class";
import { base62 } from "../warframe/lib/base62";

interface BuildSelectorTab {
  title: string;
  name: string;
  build: WarframeBuild;
  aura: NormalMod;
  exilus: NormalMod;
  mods: NormalMod[];
  buffs: Buff[];
}

@Component({
  components: { PropDiff, LeveledModSlot, LeveledModSelector, ShareQR, BuffSelector },
  beforeRouteEnter(to, from, next) {
    const core = WarframeDataBase.getWarframeById(to.params.id.replace(/_/g, " "));
    if (core) {
      document.title = i18n.t("title.sub", [i18n.t("title.weapon", [core.name])]);
      next();
    } else next("/WarframeNotFound");
  }
})
export default class WarframeEditor extends Vue {
  @Getter("bigScreen") bigScreen: boolean;
  modDialogVisible = false;
  buffDialogVisible = false;
  @Getter("savedBuilds") savedBuilds: { [key: string]: string };
  @Action("setBuild") setBuild: (build: WarframeBuild) => void;

  get id() {
    return this.$route.params.id;
  }
  get code() {
    return this.$route.params.code || this.savedBuilds[this.core.id];
  }

  tabs: BuildSelectorTab[] = [];
  tabValue = "SET A";
  currentAbility = "0";
  private _lastid = "";
  private _core: Warframe = null;
  selectModIndex = 0;
  selectBuffIndex = 0;

  healthBall = 3;
  energyBall = true;

  get selectModType() {
    return this.selectModIndex === -2 ? "Aura" : this.selectModIndex === -1 ? "Exilus" : "Warframe";
  }

  get core() {
    if (this._lastid !== this.id) this.reload();
    return this._core;
  }
  get coreBuild() {
    return new WarframeBuild(this.core);
  }

  renderProps([vn, vv]: [string, number]) {
    return ValuedProperty.parse([vn, vv]);
  }
  renderWeapon(name: string) {
    return RivenDataBase.getNormalWeaponsByName(name).displayName;
  }
  renderWeaponProps(abi: WarframeBuild["Abilities"][number]) {
    const p = this.build.abilityStrength * 1e3;
    if (abi.name === "Peacemaker") return `_z:${base62(p)}`;
    return `_Z:${base62(p)}`;
  }
  changeMode(mode: number) {
    this.build.compareMode = mode;
    this.reloadSelector();
  }
  onCodeChange() {
    if (this.code && this.build.miniCode != this.code) {
      this.build.miniCode = this.code;
      let { mods, buffs, aura, exilus } = this.build;
      while (mods.length < 8) mods.push(null);
      buffs.push(null);
      this.currentTab.mods = mods;
      this.currentTab.buffs = buffs;
      this.currentTab.aura = aura;
      this.currentTab.exilus = exilus;
    }
  }
  get currentTab() {
    return this.tabs.find(v => v.name === this.tabValue);
  }
  get build() {
    return this.currentTab.build;
  }

  @Watch("id")
  @Watch("code")
  reload() {
    if (this.$route.name !== "WarframeEditor" && this.$route.name !== "WarframeEditorWithCode") return;
    if (this.id && this._lastid !== this.id) {
      this._lastid = this.id;
      this._core = WarframeDataBase.getWarframeById(this.id.replace(/_/g, " "));
      if (this.core) {
        this.tabs = "ABC".split("").map(v => ({
          title: this.$t("zh") ? `配置${v}` : `SET ${v}`,
          name: `SET ${v}`,
          build: new WarframeBuild(this.core),
          aura: null,
          exilus: null,
          mods: Array(8),
          buffs: [null]
        }));
        this.tabValue = "SET A";
      }
    }
    if (this.code) {
      this.onCodeChange();
    }
  }
  reloadSelector() {
    this.$refs.selector && (this.$refs.selector as any).reload();
  }
  /** 返回固定精确度数值并带正负号 */
  PNNum(num: number, preci = 1) {
    let n = +num.toFixed(preci);
    return n < 0 ? n.toString() : "+" + n;
  }
  refleshMods() {
    this.build.clear();
    let { mods, aura, exilus } = this.currentTab;
    let buffs = _.compact(this.currentTab.buffs);
    this.build.mods = mods;
    this.build.aura = aura;
    this.build.exilus = exilus;
    this.build.buffs = buffs;
    this.currentTab.mods = this.build.mods;
    this.build.recalcPolarizations();
    this.pushState();
  }

  pushState() {
    let code = this.build.miniCode;
    if (code) {
      this.$router.push({ name: "WarframeEditorWithCode", params: { code } });
      this.setBuild(this.build);
    } else this.$router.push({ name: "WarframeEditor" });
  }

  slotClick(modIndex: number) {
    this.selectModIndex = modIndex;
    this.modDialogVisible = true;
  }
  slotRemove(modIndex: number) {
    if (modIndex === -2) this.currentTab.aura = null;
    else if (modIndex === -1) this.currentTab.exilus = null;
    else this.currentTab.mods[modIndex] = null;
    this.refleshMods();
    this.reloadSelector();
  }
  buffClick(buffIndex: number) {
    this.selectBuffIndex = buffIndex;
    this.buffDialogVisible = true;
  }
  buffRemove(buffIndex: number) {
    this.currentTab.buffs[buffIndex] = null;
    this.currentTab.buffs = _.compact(this.currentTab.buffs).concat([null]);
    this.refleshMods();
    this.reloadSelector();
  }
  get options() {
    return {
      healthBall: ~~this.healthBall,
      energyBall: this.energyBall
    };
  }

  // === 事件处理 ===
  optionChange() {
    if (!this.build) return;
    this.build.options = this.options;
    this.build.calcMods();
    this.reloadSelector();
  }
  modSelect(mod: NormalMod | NormalMod[]) {
    if (Array.isArray(mod)) {
      if (mod.length > 0 && mod[0]) {
        this.currentTab.mods[this.selectModIndex] = null;
        mod.forEach(v => {
          let index = this.currentTab.mods.findIndex(v => !v);
          this.currentTab.mods[index] = v;
        });
      }
    } else {
      if (this.selectModIndex === -2) this.currentTab.aura = mod;
      if (this.selectModIndex === -1) this.currentTab.exilus = mod;
      else this.currentTab.mods[this.selectModIndex] = mod;
    }
    this.modDialogVisible = false;
    this.refleshMods();
  }
  buffSelect(buff: BuffData) {
    this.currentTab.buffs[this.selectBuffIndex] = new Buff(buff);
    this.currentTab.buffs = _.compact(this.currentTab.buffs).concat([null]);
    this.refleshMods();
    this.buffDialogVisible = false;
  }
  handleTabsEdit(targetName, action: "add" | "remove") {
    if (action === "add") {
      let newTabName = "SET " + (1 + (+this.tabs[this.tabs.length - 1].name.split(" ")[1] || 0));
      this.tabs.push({
        title: this.$t("zh") ? newTabName.replace("SET", "配置") : newTabName,
        name: newTabName,
        build: new WarframeBuild(this.core),
        aura: this.currentTab.aura,
        exilus: this.currentTab.exilus,
        mods: this.currentTab.mods,
        buffs: this.currentTab.buffs
      });
      this.tabValue = newTabName;
      this.refleshMods();
    }
    if (action === "remove") {
      let tabs = this.tabs;
      let activeName = this.tabValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.tabValue = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
  fill() {
    this.build.fill(8, 0);
    this.currentTab.mods = this.build.mods;
    this.reloadSelector();
    this.pushState();
  }
  fillEmpty() {
    this.build.fillEmpty(8, 0);
    this.currentTab.mods = this.build.mods;
    this.reloadSelector();
    this.pushState();
  }
  clear() {
    let rivenIdx = this.currentTab.mods.findIndex(v => v && v.rarity === "x"),
      riven = this.currentTab.mods[rivenIdx];
    this.currentTab.mods = Array(8);
    // 不清除紫卡
    if (riven) this.currentTab.mods[rivenIdx] = riven;
    this.refleshMods();
    this.reloadSelector();
  }
}
</script>

<style lang="less">
@import "../less/common.less";

.team-editor-main {
  .warframe-props {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    font-size: 1em;
    th {
      color: @text_grey;
      font-weight: inherit;
      text-align: left;
    }
  }
  .core-info {
    margin-bottom: 8px;
  }
  .core-name {
    font-size: 1.1rem;
  }
  .share-icon {
    float: right;
    line-height: 23px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      opacity: 0.7;
    }
  }
  .mod-slot-container {
    justify-content: center;
  }
}

.skill-container {
  .skill-name {
    font-size: 1.4em;
    a {
      color: unset;
      text-decoration: unset;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .skill-costs {
    text-align: right;
    white-space: nowrap;
    .skill-cost {
      background: @theme_main;
      color: @theme_back;
      font-size: 1.2em;
      padding: 8px 16px;
      display: inline-block;
      & + .skill-cost {
        border-left: 1px solid @theme_back;
      }
    }
    .skill-cost:first-child {
      border-radius: 4px 0 0 4px;
    }
    .skill-cost:last-child {
      margin-right: -20px;
    }
  }
  .skill-tags {
    .skill-tag {
      display: inline-block;
      margin: 4px 4px 0 0;
      padding: 2px 10px;
      border: 1px solid #e3e4ea;
      border-radius: 2px;
      box-shadow: 2px 4px 4px @shadow;
    }
  }
}

.skill-effects {
  .effect-name {
    font-size: 1.2em;
    margin: 4px 8px;
    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 24px;
      background: @theme_main;
      vertical-align: bottom;
      border-radius: 4px;
      margin-right: 8px;
    }
  }
  .effect-detail {
    .effect-prop {
      display: inline-block;
      padding: 8px 16px;
      margin: 4px;
      background: @theme_back;
      border-radius: 4px;
      .prop-name {
        height: 17px;
        line-height: 17px;
        color: @half_greyblue;
        font-size: 12px;
      }
      .prop-value {
        height: 22px;
        line-height: 22px;
        color: @text_darkerblue;
        font-size: 16px;
      }
    }
  }
}
</style>
