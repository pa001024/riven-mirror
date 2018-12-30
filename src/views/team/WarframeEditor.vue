<template>
  <div class="team-editor-main">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <!-- 基础信息区域 -->
        <div class="core-info" v-if="core">
          <el-card class="infobox">
            <!-- 二维码和名称 -->
            <div slot="header" class="core-name">
              <span class="title">{{core.name}}</span>
              <span class="forma">{{$t("build.formaCount", [build.formaCount])}}</span>
              <el-popover placement="bottom" trigger="click">
                <el-input :value="build.miniCodeURL" size="small" ref="miniCodeURL" @focus="$refs.miniCodeURL.select()"></el-input>
                <div style="text-align:center;">
                  <qrcode :value="build.miniCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                </div>
                <div style="text-align:center;">
                  {{$t("riven.sharetip")}}
                </div>
                <i slot="reference" class="el-icon-share share-icon"></i>
              </el-popover>
            </div>
            <table class="warframe-props">
              <tbody>
                <!-- 容量 -->
                <tr class="prop-diff cost-show">
                  <th>{{$t('build.cost')}}</th>
                  <td class="diff diff-ori diff-cost" :class="{error: build.maxCost < build.totalCost}">
                    {{build.maxCost - build.totalCost}}
                  </td>
                  <template v-if="build.totalCost > 0">
                    <td class="diff diff-arrow">/</td>
                    <td class="diff diff-val">
                      {{build.maxCost}}
                    </td>
                  </template>
                </tr>
                <PropDiff :name="$t('build.health')" :ori="coreBuild.health" :val="build.health"></PropDiff>
                <PropDiff :name="$t('build.shield')" :ori="coreBuild.shield" :val="build.shield"></PropDiff>
                <PropDiff :name="$t('build.armor')" :ori="coreBuild.armor" :val="build.armor"></PropDiff>
                <PropDiff :name="$t('build.energy')" :ori="coreBuild.energy" :val="build.energy"></PropDiff>
                <PropDiff :name="$t('build.sprint')" :ori="coreBuild.sprint" :val="build.sprint" :preci="2"></PropDiff>
                <PropDiff :name="$t('build.effectiveHealth')" :ori="coreBuild.effectiveHealth" :val="build.effectiveHealth" :preci="0"></PropDiff>
                <br>
                <PropDiff :name="$t('build.abilityStrength')" :ori="coreBuild.abilityStrength" :val="build.abilityStrength" percent :preci="0"></PropDiff>
                <PropDiff :name="$t('build.abilityDuration')" :ori="coreBuild.abilityDuration" :val="build.abilityDuration" percent :preci="0"></PropDiff>
                <PropDiff :name="$t('build.abilityEfficiency')" :ori="coreBuild.abilityEfficiency" :val="build.abilityEfficiency" percent :preci="0"></PropDiff>
                <PropDiff :name="$t('build.abilityRange')" :ori="coreBuild.abilityRange" :val="build.abilityRange" percent :preci="0"></PropDiff>
              </tbody>
            </table>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :xs="24" :sm="12" :lg="18">
        <!-- MOD区域 -->
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="index" v-for="(item, index) in tabs" :label="item.title" :name="item.name">
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <el-col class="list-complete-item" :sm="12" :md="12" :lg="6">
                <LeveledModSlot icon="aura" @level="refleshMods()" @change="slotClick(-2)" @remove="slotRemove(-2)" :mod="item.aura" :build="item.build" :polarization="item.build.auraPol"/>
              </el-col>
              <el-col class="list-complete-item" :sm="12" :md="12" :lg="6">
                <LeveledModSlot icon="exilus" @level="refleshMods()" @change="slotClick(-1)" @remove="slotRemove(-1)" :mod="item.exilus" :build="item.build" :polarization="item.build.exilusPol"/>
              </el-col>
            </el-row>
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <LeveledModSlot @level="refleshMods()" @change="slotClick(index)" @remove="slotRemove(index)" :mod="mod" :build="item.build" :polarization="item.build.polarizations[index]"/>
                </el-col>
              </draggable>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 技能区域 -->
        <el-tabs v-model="currentAbility">
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :title="$t('build.selectMod')" :visible.sync="modDialogVisible" width="600">
      <LeveledModSelector :type="selectModType" ref="selector" :build="build" @command="modSelect($event)" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { WarframeBuild } from "@/warframe/warframebuild";
import LeveledModSlot from "@/components/LeveledModSlot.vue";
import LeveledModSelector from "@/components/LeveledModSelector.vue";
import PropDiff from "@/components/PropDiff.vue";
import { NormalMod, Buff, Warframe, WarframeDataBase } from "@/warframe/codex";

interface BuildSelectorTab {
  title: string
  name: string
  build: WarframeBuild
  aura: NormalMod
  exilus: NormalMod
  mods: NormalMod[]
  buffs: Buff[]
}

@Component({ components: { PropDiff, LeveledModSlot, LeveledModSelector } })
export default class WarframeEditor extends Vue {
  modDialogVisible = false;

  get id() { return this.$route.params.id; }
  get code() { return this.$route.params.code; }

  tabs: BuildSelectorTab[] = [];
  tabValue = "SET A";
  currentAbility = "";
  private _lastid = "";
  private _core: Warframe = null;
  private selectModIndex: number = 0;
  get selectModType() { return this.selectModIndex === -2 ? "Aura" : this.selectModIndex === -1 ? "Exilus" : "Warframe" }

  get core() { if (this._lastid !== this.id) this.reload(); return this._core; }
  get coreBuild() { return new WarframeBuild(this.core); }

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
  get currentTab() { return this.tabs.find(v => v.name === this.tabValue); }
  get build() { return this.currentTab.build; }

  @Watch("id")
  @Watch("code")
  reload() {
    if ((this.$route.name !== "WarframeEditor" && this.$route.name !== "WarframeEditorWithCode")) return;
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
  refleshMods() {
    this.build.clear();
    let { mods, aura, exilus } = this.currentTab;
    let buffs = _.compact(this.currentTab.buffs);
    this.build.mods = mods;
    this.build.aura = aura;
    this.build.exilus = exilus;
    this.build.buffs = buffs;
    this.currentTab.mods = this.build.mods;
    this.$router.push({ name: 'WarframeEditorWithCode', params: { code: this.build.miniCode } });
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

  // === 事件处理 ===
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
      if (this.selectModIndex === -2)
        this.currentTab.aura = mod;
      if (this.selectModIndex === -1)
        this.currentTab.exilus = mod;
      else
        this.currentTab.mods[this.selectModIndex] = mod;
    }
    this.refleshMods();
    this.modDialogVisible = false;
  }
  handleTabsEdit(targetName, action: "add" | "remove") {
    if (action === 'add') {
      let newTabName = "SET " + (1 + (+this.tabs[this.tabs.length - 1].name.split(" ")[1] || 0));
      this.tabs.push({
        title: this.$t("zh") ? newTabName.replace("SET", "配置") : newTabName,
        name: newTabName,
        build: new WarframeBuild(this.core),
        aura: null,
        exilus: null,
        mods: Array(8),
        buffs: [null],
      });
      this.tabValue = newTabName;
    }
    if (action === 'remove') {
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
}
</script>

<style lang="less">
@import "../../less/common.less";

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
  .mod-slot-containor {
    justify-content: center;
  }
}
.diff-cost.error {
  color: @text_error;
}
</style>
