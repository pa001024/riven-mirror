<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span class="title">{{weapon.displayName}}</span>
              [
              <span class="forma"> {{$t("build.formaCount", [build.formaCount])}} </span>
              <span class="umbra" v-if="build.umbraCount"> + {{build.umbraCount}}U </span>
              ]
              <ShareQR :url="build.miniCodeURL"/>
            </div>
            <div class="weapon-capacity"></div>
            <div class="weapon-props">
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
              <PropDiff :name="$t('build.range')" v-if="build.originalRange" :ori="build.originalRange" :val="build.range" subfix="m"></PropDiff>
              <PropDiff :name="$t('build.fireRate')" :ori="mode.fireRate/60" :val="build.fireRate" :preci="3"></PropDiff>
              <PropDiff :name="$t('build.critMul')" :ori="mode.critMul" :val="build.critMul" subfix="x"></PropDiff>
              <PropDiff :name="$t('build.critChance')" :ori="mode.critChance" :val="build.critChance" percent></PropDiff>
              <PropDiff :name="$t('build.slideDmg')" v-if="weapon.slideDmg" :ori="weapon.slideDmg" :val="build.panelSlideDamage"></PropDiff>
              <PropDiff :name="$t('build.pellets')" v-if="mode.pellets != 1 || build.pellets != 1" :ori="mode.pellets" :val="build.pellets"></PropDiff>
              <div v-if="weapon.disposition > 0">
                <el-row :gutter="4" class="prop-diff">
                  <el-col :span="8" class="title">
                    {{$t('build.ratio')}}
                  </el-col>
                  <el-col :span="7" class="diff diff-ori">
                    {{weapon.disposition}}
                  </el-col>
                    <el-col :span="2" class="diff-arrow">&nbsp;</el-col>
                    <el-col :span="7" class="diff diff-val">
                      {{weapon.starText}}
                    </el-col>
                </el-row>
              </div>
              <PropDiff :name="$t('build.status')" :ori="mode.procChance" :val="build.procChancePerHit" percent data-v-step="1"></PropDiff>
              <!-- 伤害模型 -->
              <el-row :gutter="4" class="prop-diff model-selector">
                <el-col :span="8" class="title" v-t="'build.damageModel'"></el-col>
                <el-col :span="16">
                  <el-select size="mini" class="model-name" v-model="selectDamageModel" clearable :placeholder="$t('build.damageModelTip')">
                    <el-option v-for="item in dmgModels" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-col>
              </el-row>
              <el-row :gutter="4" class="prop-diff model-selector model-selector-armor" v-if="isArmorDamageModel">
                <el-col :span="8" class="title" v-t="'build.damageModelArmor'"></el-col>
                <el-col :span="16">
                  <el-input size="mini" class="armor-value" v-model="modelArmor" clearable :placeholder="$t('build.armorValueTip')"/>
                </el-col>
              </el-row>
              <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :icon="dname.toLowerCase()" :name="$t(`elements.${dname}`)" :ori="ori" :val="val"></PropDiff>
              <br>
              <PropDiff :name="$t('build.panelDamage')" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
              <PropDiff :name="$t('build.attackDamage')" :ori="build.oriTotalDamage" :val="build.normalDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
              <PropDiff data-v-step="2" :name="$t('build.slideDamage')" v-if="weapon.slideDmg" :ori="build.oriSlideDamage" :val="build.slideDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 1}" @click="changeMode(1)"></PropDiff>
              <PropDiff :name="$t('build.attackDamagePS')" :ori="build.oriTotalDamagePS" :val="build.normalDamagePS"
                  class="select-cpmode" :class="{active: build.compareMode === 2}" @click="changeMode(2)"></PropDiff>
              <PropDiff :name="$t('build.slideDamagePS')" v-if="weapon.slideDmg" :ori="build.oriSlideDamagePS" :val="build.slideDamagePS"
                  class="select-cpmode" :class="{active: build.compareMode === 3}" @click="changeMode(3)"></PropDiff>
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
              <!-- 连击加成 -->
              <el-form-item :label="$t('buildview.comboMul')">
                <el-tooltip effect="dark" :content="$t('buildview.comboMulTip')" placement="bottom">
                  <el-input-number class="right-side" size="small" v-model="comboMul" @change="optionChange" :min="1" :max="6" :step="0.5"></el-input-number>
                </el-tooltip>
              </el-form-item>
              <!-- 异况数字化 -->
              <el-form-item :label="$t('buildview.condiOver')">
                <el-tooltip effect="dark" :content="$t('buildview.condiOverTip')" placement="bottom">
                  <el-switch class="right-side" size="small" v-model="calcCondiOver" @change="optionChange"></el-switch>
                </el-tooltip>
              </el-form-item>
              <!-- 等级调整 -->
              <el-form-item :label="$t('buildview.levelSetting')">
                <el-switch class="right-side" size="small" v-model="levelSetting"></el-switch>
              </el-form-item>
              <!-- 近战3.0 -->
              <el-form-item :label="$t('buildview.melee30')">
                <el-tooltip effect="dark" :content="$t('buildview.melee30Tip')" placement="bottom">
                  <el-switch class="right-side" size="small" v-model="melee30" @change="optionChange"></el-switch>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :sm="24" :md="12" :lg="18">
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="index" v-for="(item, index) in tabs" :label="item.title" :name="item.name">
            <!-- MOD区域 -->
            <el-row type="flex" class="mod-slot-container autozoom" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :span="bigScreen ? 12 : 24" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <component :is="levelSetting ? 'LeveledModSlot' : 'ModSlot'"  @level="refleshMods()" @change="slotClick(index)" @remove="slotRemove(index)" :mod="mod" :build="item.build" :polarization="item.build.polarizations[index]"/>
                </el-col>
              </draggable>
            </el-row>
            <div class="buff-head">{{$t('build.buff')}}</div>
            <!-- Buff区域 -->
            <el-row type="flex" class="buff-slot-container autozoom" :gutter="12">
              <div class="block">
                <el-col class="list-complete-item" :span="bigScreen ? 12 : 24" :sm="12" :md="12" :lg="6" v-for="(buff, index) in item.buffs" :key="index">
                  <div class="buff-slot" :class="[{ active: !buff }]" @click="!buff && buffClick(index)" :data-v-step="index===0&&'3'">
                    <template v-if="buff">
                      <div class="buff-title" :class="{layers: buff.layerEnable, powers: buff.powerEnable}">
                        <div class="buff-name">{{$t(`buff.${buff.name}`)}}</div>
                        <div class="buff-parm layer" v-if="buff.layerEnable"><el-input-number @change="refleshMods()" size="mini" v-model="buff.layer" :min="1" :max="buff.data.multiLayer.maxStack"></el-input-number></div>
                        <div class="buff-parm power" v-if="buff.powerEnable"><el-input-number @change="refleshMods()" :step="0.5" size="mini" v-model="buff.power"></el-input-number></div>
                      </div>
                      <div class="buff-detail" @click.stop="buffRemove(index)">
                        <div class="buff-stat">
                          <div class="buff-prop" v-for="prop in buff.vProps" :key="prop.id">{{prop.fullName}}</div>
                          <div class="buff-sum">{{PNNum(100 * item.build.buffValue(index))}}% {{$t("build.total")}}</div>
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
        <!-- 扩展功能区 -->
        <el-tabs value="minimap" class="external-area" data-v-step="4">
          <!-- 缩略图 -->
          <el-tab-pane class="minimap" :label="$t('build.minimap')" name="minimap">
            <BuildMinimap :build="build"/>
          </el-tab-pane>
          <!-- 触发计算 -->
          <el-tab-pane class="statusinfo" :label="$t('build.statusinfo')" name="statusinfo">
            <StatusInfoDisplay :info="build.statusInfo" :common="build.commonStatusInfo" />
          </el-tab-pane>
          <!-- 幻影装置-->
          <el-tab-pane class="enemy-sim" :label="$t('build.simulacrum')" name="simulacrum">
            <h2>melee is unsupport!</h2>
          </el-tab-pane>
          <!-- 概率可视化 -->
          <el-tab-pane class="provis" :label="$t('build.provis')" name="provis">
            <ProbabilityVisualization :criti="build.critChance" :critMul="build.critMul" :multi="build.pellets" :totalDamageFloor="build.totalDamageFloor" :totalDamageCeil="build.totalDamageCeil"/>
          </el-tab-pane>
          <!-- 其他信息 -->
          <el-tab-pane class="otherinfo" :label="$t('build.otherinfo')" name="otherinfo">
            <OtherInfoDisplay :build="build"/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :title="$t('build.selectMod')" :visible.sync="dialogVisible" width="600">
      <ModSelector ref="selector" :build="build" @command="modSelect($event)"></ModSelector>
    </el-dialog>
    <el-dialog :title="$t('build.selectBuff')" :visible.sync="buffDialogVisible" width="600">
      <BuffSelector ref="buffselector" :build="build" @command="buffSelect($event)"></BuffSelector>
    </el-dialog>
    <v-tour name="baseTour" :steps="steps" :options="{labels:$t('tour.labels')}" :callbacks="{onStop:onTourStop}"></v-tour>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import PropDiff from "@/components/PropDiff.vue";
import ModSelector from "@/components/ModSelector.vue";
import BuffSelector from "@/components/BuffSelector.vue";
import StatusInfoDisplay from "@/components/StatusInfoDisplay.vue";
import ProbabilityVisualization from "@/components/ProbabilityVisualization";
import OtherInfoDisplay from "@/components/OtherInfoDisplay.vue";
import BuildMinimap from "@/components/BuildMinimap.vue";
import ShareQR from "@/components/ShareQR.vue";
import ModSlot from "@/components/ModSlot.vue";
import LeveledModSlot from "@/components/LeveledModSlot.vue";
import { BaseBuildEditor } from "./BaseBuildEditor";
import { ModBuild } from "@/warframe/modbuild";
import { NormalMod, Weapon, Codex } from "@/warframe/codex";
import { MeleeModBuild, MeleeCompareMode } from "@/warframe/meleemodbuild";
import "@/less/builder.less";

declare interface BuildSelectorTab {
  title: string;
  name: string;
  build: ModBuild;
  mods: NormalMod[];
}

@Component({
  components: {
    ModSelector,
    LeveledModSlot,
    PropDiff,
    BuffSelector,
    StatusInfoDisplay,
    ModSlot,
    ProbabilityVisualization,
    OtherInfoDisplay,
    ShareQR,
    BuildMinimap
  }
})
export default class MeleeBuildEditor extends BaseBuildEditor {
  @Prop() weapon: Weapon;

  comboMul = 1.5;
  extraBaseDamage = 0;
  extraOverall = 0;
  calcCondiOver = true;
  melee30 = false;
  /** 赋能 */
  arcanes = [];
  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }

  @Watch("weapon")
  reload() {
    this.comboMul = this.weapon.tags.has("Virtual") ? 1 : 1.5;
    super.reload();
  }
  reloadSelector() {
    this.$refs.selector && (this.$refs.selector as any).reload();
    this.$refs.buffselector && (this.$refs.buffselector as any).reload();
  }

  get options() {
    return {
      comboLevel: ~~((this.comboMul - 1) * 2),
      extraBaseDamage: +this.extraBaseDamage,
      extraOverall: +this.extraOverall,
      calcCondiOver: this.calcCondiOver,
      melee30: this.melee30,
      arcanes: this.arcanes
    };
  }

  get defalutMode() {
    let melee = this.weapon;
    let slideList = ["Whip", "Polearm", "Staff"];
    if (melee.tags.has(...slideList)) return MeleeCompareMode.SlideDamagePS;
    return melee.tags.has("Virtual") ? MeleeCompareMode.TotalDamage : MeleeCompareMode.TotalDamagePS;
  }

  newBuild(weapon: Weapon) {
    if (weapon.tags.has("Virtual")) this.comboMul = 1;
    let b = new MeleeModBuild(weapon, null, this.options);
    b.fastMode = false;
    b.compareMode = this.defalutMode;
    return b;
  }
  // === 事件处理 ===
  @Watch("extraBaseDamage")
  @Watch("extraOverall")
  optionChange() {
    if (!this.weapon) return;
    this.build.options = this.options;
    this.build.calcMods();
    this.reloadSelector();
  }
  // 子类不实现会报错
  handleTabsEdit(targetName, action: "add" | "remove") {
    super.handleTabsEdit(targetName, action);
  }
  // === 生命周期钩子 ===
  beforeMount() {
    this.reload();
  }
  mounted() {
    super.onMounted();
  }
}
</script>
