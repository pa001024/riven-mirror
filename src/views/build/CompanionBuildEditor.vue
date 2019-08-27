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
              <template v-if="build.formaCount">
                [
                <span class="forma"> {{$t("build.formaCount", [build.formaCount])}} </span>
                <span class="umbra" v-if="build.umbraCount"> + {{build.umbraCount}}U </span>
                ]
              </template>
              <ShareQR :url="'https://riven.im'+$route.path"/>
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
              <PropDiff class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"
                :name="$t('build.effectiveHealth')" :ori="coreBuild.effectiveHealth" :val="build.effectiveHealth" :preci="0"></PropDiff>
              <template v-if="build.attackBuild">
                <br>
                <PropDiff :name="$t('build.critMul')" :ori="build.attackBuild.mode.critMul" :val="build.attackBuild.critMul" subfix="x"></PropDiff>
                <PropDiff :name="$t('build.critChance')" :ori="build.attackBuild.mode.critChance" :val="build.attackBuild.critChance" percent></PropDiff>
                <PropDiff :name="$t('build.status')" :ori="build.attackBuild.mode.procChance" :val="build.attackBuild.procChancePerHit" percent data-v-step="1"></PropDiff>
                <br>
                <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :icon="dname.toLowerCase()" :name="$t(`elements.${dname}`)" :ori="ori" :val="val"></PropDiff>
                <br>
                <PropDiff :name="$t('build.panelDamage')" :ori="build.attackBuild.originalDamage" :val="build.attackBuild.panelDamage"></PropDiff>
                <PropDiff :name="$t('build.attackDamage')" :ori="build.attackBuild.oriTotalDamage" :val="build.attackBuild.normalDamage"
                    class="select-cpmode" :class="{active: build.compareMode === 4}" @click="changeMode(4)"></PropDiff>
              </template>
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
              <!-- 生命 -->
              <el-form-item :label="$t('buildview.healthLinkRef')" v-if="currentTab.mods.some(v=>v&&v.id==='Link Health')">
                <el-input-number class="right-side fill" size="small" v-model="healthLinkRef" @change="optionChange" />
              </el-form-item>
              <!-- 护盾 -->
              <el-form-item :label="$t('buildview.shieldLinkRef')" v-if="currentTab.mods.some(v=>v&&v.id==='Link Shields')">
                <el-input-number class="right-side fill" size="small" v-model="shieldLinkRef" @change="optionChange" />
              </el-form-item>
              <!-- 护甲 -->
              <el-form-item :label="$t('buildview.armorLinkRef')" v-if="currentTab.mods.some(v=>v&&v.id==='Link Armor')">
                <el-input-number class="right-side fill" size="small" v-model="armorLinkRef" @change="optionChange" />
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
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :animation="250" handle=".mod-title">
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
      </el-col>
    </el-row>
    <el-dialog :title="$t('build.selectMod')" :visible.sync="modDialogVisible" width="600">
      <ModSelector :type="selectModType" ref="selector" :build="build" @command="modSelect($event)" />
    </el-dialog>
    <el-dialog :title="$t('build.selectBuff')" :visible.sync="buffDialogVisible" width="600">
      <BuffSelector ref="buffselector" :build="build" @command="buffSelect($event)"></BuffSelector>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import LeveledModSlot from "@/components/LeveledModSlot.vue";
import ModSelector from "@/components/ModSelector.vue";
import BuffSelector from "@/components/BuffSelector.vue";
import PropDiff from "@/components/PropDiff.vue";
import ShareQR from "@/components/ShareQR.vue";
import { NormalMod, Buff, ValuedProperty, BuffData, RivenDatabase, AbilityPropTypes, WeaponDatabase } from "@/warframe/codex";
import "@/less/builder.less";
import { i18n } from "@/i18n";
import { Getter, Action } from "vuex-class";
import { base62 } from "@/warframe/lib/base62";
import { CompanionDataBase, CompanionBuild, Companion } from "@/warframe/companionbuild";
import { Moa } from "@/warframe/codex/moa";

interface BuildSelectorTab {
  title: string;
  name: string;
  build: CompanionBuild;
  mods: NormalMod[];
  buffs: Buff[];
}

@Component({
  components: { PropDiff, LeveledModSlot, ModSelector, ShareQR, BuffSelector },
  beforeRouteEnter(to, from, next) {
    const id = to.params.id.replace(/_/g, " ");
    if (id.startsWith("MOA-")) {
      const moa = new Moa(id);
      document.title = i18n.t("title.sub", [i18n.t("title.weapon", [moa.name])]);
      next();
    } else {
      const core = CompanionDataBase.getCompanionById(id);
      if (core) {
        document.title = i18n.t("title.sub", [i18n.t("title.weapon", [core.name])]);
        next();
      } else next("/CompanionNotFound");
    }
  },
})
export default class CompanionEditor extends Vue {
  @Getter("bigScreen") bigScreen: boolean;
  modDialogVisible = false;
  buffDialogVisible = false;
  @Getter("savedBuilds") savedBuilds: { [key: string]: string };
  @Action("setBuild") setBuild: (build: CompanionBuild) => void;

  get id() {
    return this.$route.params.id;
  }
  get code() {
    return this.$route.params.code || this.savedBuilds[this.core.id];
  }

  tabs: BuildSelectorTab[] = [];
  tabValue = "SET A";
  private _lastid = "";
  private _core: Companion = null;
  selectModIndex = 0;
  selectBuffIndex = 0;

  healthLinkRef = 740;
  shieldLinkRef = 300;
  armorLinkRef = 150;

  get selectModType() {
    return "Companion";
  }

  get core() {
    if (this._lastid !== this.id) this.reload();
    return this._core;
  }
  get coreBuild() {
    return new CompanionBuild(this.core);
  }

  renderProps([vn, vv]: [string, number]) {
    return ValuedProperty.parse([vn, vv]);
  }
  changeMode(mode: number) {
    this.build.compareMode = mode;
    this.reloadSelector();
  }
  onCodeChange() {
    if (this.code && this.build.miniCode != this.code) {
      this.build.miniCode = this.code;
      let { mods, buffs } = this.build;
      while (mods.length < 10) mods.push(null);
      buffs.push(null);
      this.currentTab.mods = mods;
      this.currentTab.buffs = buffs;
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
    if (this.$route.name !== "CompanionEditor" && this.$route.name !== "CompanionEditorWithCode") return;
    if (this.id && this._lastid !== this.id) {
      this._lastid = this.id;
      if (this.id.startsWith("MOA-")) {
        this._core = new Moa(this.id);
      } else {
        this._core = CompanionDataBase.getCompanionById(this.id.replace(/_/g, " "));
      }
      if (this.core) {
        this.tabs = "ABC".split("").map(v => ({
          title: this.$t("zh") ? `配置${v}` : `SET ${v}`,
          name: `SET ${v}`,
          build: new CompanionBuild(this.core),
          mods: Array(10),
          buffs: [null],
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
    let { mods } = this.currentTab;
    let buffs = _.compact(this.currentTab.buffs);
    this.build.mods = mods;
    this.build.buffs = buffs;
    this.currentTab.mods = this.build.mods;
    this.build.recalcPolarizations();
    this.pushState();
  }

  pushState() {
    let code = this.build.miniCode;
    if (code) {
      this.$router.push({ name: "CompanionEditorWithCode", params: { code } });
      this.setBuild(this.build);
    } else this.$router.push({ name: "CompanionEditor" });
  }

  slotClick(modIndex: number) {
    this.selectModIndex = modIndex;
    this.modDialogVisible = true;
  }
  slotRemove(modIndex: number) {
    this.currentTab.mods[modIndex] = null;
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
      healthLinkRef: this.healthLinkRef,
      shieldLinkRef: this.shieldLinkRef,
      armorLinkRef: this.armorLinkRef,
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
      this.currentTab.mods[this.selectModIndex] = mod;
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
        build: new CompanionBuild(this.core),
        mods: this.currentTab.mods,
        buffs: this.currentTab.buffs,
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
    this.build.fill(10, 0);
    this.currentTab.mods = this.build.mods;
    this.reloadSelector();
    this.pushState();
  }
  fillEmpty() {
    this.build.fillEmpty(10, 0);
    this.currentTab.mods = this.build.mods;
    this.reloadSelector();
    this.pushState();
  }
  clear() {
    this.currentTab.mods = Array(10);
    // 不清除紫卡
    this.refleshMods();
    this.reloadSelector();
  }

  get mergedDmg() {
    let lD = this.build.attackBuild.mode.damage;
    let nD = this.build.attackBuild.dmg;
    let rst: { [v: string]: [number, number] } = {};
    lD.forEach(([vn, vv]) => {
      rst[vn] = [vv, 0];
    });
    nD.forEach(([vn, vv]) => {
      if (rst[vn]) rst[vn][1] = vv;
      else rst[vn] = [0, vv];
    });
    let emp = _.map(rst, (v, i) => [i, ...v]) as [string, number, number][];
    return emp;
  }
}
</script>
