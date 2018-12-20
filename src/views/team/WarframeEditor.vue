<template>
  <div class="team-editor-main">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <!-- 基础信息区域 -->
        <div class="core-info" v-if="core">
          <el-card class="infobox">
            <!-- 二维码和名称 -->
            <div slot="header" class="core-name">
              <span>{{core.name}}</span>
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
                <tr class="prop-diff cost-show">
                  <th>{{$t('build.cost')}}</th>
                  <td class="diff diff-ori">
                    {{build.totalCost}}
                  </td>
                  <template v-if="build.totalCost > 0">
                    <td class="diff diff-arrow">/</td>
                    <td class="diff diff-val">
                      {{build.maxCost}}
                    </td>
                  </template>
                </tr>
                <PropDiff :name="$t('build.health')" :ori="core.health" :val="build.health"></PropDiff>
                <PropDiff :name="$t('build.shield')" :ori="core.shield" :val="build.shield"></PropDiff>
                <PropDiff :name="$t('build.armor')" :ori="core.armor" :val="build.armor"></PropDiff>
                <PropDiff :name="$t('build.energy')" :ori="core.energy" :val="build.energy"></PropDiff>
                <PropDiff :name="$t('build.sprint')" :ori="core.sprint" :val="build.sprint" :preci="2"></PropDiff>
                <PropDiff :name="$t('build.effectiveHealth')" :ori="core.effectiveHealth" :val="build.effectiveHealth" :preci="0"></PropDiff>
                <br>
                <PropDiff :name="$t('build.abilityStrength')" :ori="core.abilityStrength" :val="build.abilityStrength" percent :preci="0"></PropDiff>
                <PropDiff :name="$t('build.abilityDuration')" :ori="core.abilityDuration" :val="build.abilityDuration" percent :preci="0"></PropDiff>
                <PropDiff :name="$t('build.abilityEfficiency')" :ori="core.abilityEfficiency" :val="build.abilityEfficiency" percent :preci="0"></PropDiff>
                <PropDiff :name="$t('build.abilityRange')" :ori="core.abilityRange" :val="build.abilityRange" percent :preci="0"></PropDiff>
              </tbody>
            </table>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :xs="24" :sm="12" :lg="18">
        <!-- MOD区域 -->
        <el-row type="flex" class="mod-slot-containor" :gutter="12">
          <el-col class="list-complete-item" :sm="12" :md="12" :lg="6">
            <ModSlot @change="slotClick(-2)" @remove="slotRemove(-2)" :mod="build.aura" :build="build" :polarization="build.auraPor"/>
          </el-col>
          <el-col class="list-complete-item" :sm="12" :md="12" :lg="6">
            <ModSlot @change="slotClick(-1)" @remove="slotRemove(-1)" :mod="build.exilus" :build="build" :polarization="build.exilusPor"/>
          </el-col>
        </el-row>
        <el-row type="flex" class="mod-slot-containor" :gutter="12">
          <draggable class="block" v-model="build.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
            <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(mod, index) in build.mods" :key="index">
              <ModSlot @change="slotClick(index)" @remove="slotRemove(index)" :mod="mod" :build="build" :polarization="build.polarizations[index]"/>
            </el-col>
          </draggable>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog :title="$t('build.selectMod')" :visible.sync="modDialogVisible" width="600">
      <LeveledModSelector ref="selector" :build="build" @command="modSelect($event)" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Warframe, WarframeDataBase } from "@/warframe";
import { WarframeBuild } from "@/warframe/warframebuild";
import ModSlot from "@/components/ModSlot.vue";
import LeveledModSelector from "@/components/LeveledModSelector.vue";
import PropDiff from "@/components/PropDiff.vue";

@Component({ components: { PropDiff, ModSlot, LeveledModSelector } })
export default class extends Vue {
  modDialogVisible = false;

  get id() { return this.$route.params.id; }
  get code() { return this.$route.params.code; }

  private _lastid = "";
  private _core: Warframe = null;
  private _build: WarframeBuild = null;

  get core() { if (this.id !== this._lastid) this.reload(); return this._core; }
  get build() { if (this.id !== this._lastid) this.reload(); return this._build; }

  @Watch("$route")
  reload() {
    if (!this.id || this._lastid === this.id) return;
    this._lastid = this.id;
    this._core = WarframeDataBase.getWarframeById(this.id.replace(/_/g, " "));
    this._build = new WarframeBuild(this.core);
  }

  /** 返回固定精确度数值 */
  Num(num: number, preci = 1) {
    return +num.toFixed(preci);
  }
  /** 返回固定精确度数值并带正负号 */
  PNNum(num: number, preci = 1) {
    let n = +num.toFixed(preci);
    return n < 0 ? n.toString() : "+" + n;
  }
  refleshMods() {
    this.$router.push({ name: 'BuildEditorWithCode', params: { code: this.build.miniCode } });
  }

  slotClick(modIndex: number) {
    // this.selectModIndex = modIndex;
    this.modDialogVisible = true;
  }
  slotRemove(modIndex: number) {
    this.build.mods[modIndex] = null;
    this.refleshMods();
  }
}
</script>

<style lang="less">
@text_grey : #606266;

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
}
</style>
