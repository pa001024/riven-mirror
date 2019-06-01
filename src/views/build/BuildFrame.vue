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
              <PropDiff :name="$t('build.magazine')" :ori="weapon.magazine" :val="build.magazineSize"></PropDiff>
              <PropDiff :name="$t('build.prjSpeed')" v-if="weapon.prjSpeed" :ori="weapon.prjSpeed" :val="build.prjSpeed" subfix=" m/s" :preci="1"></PropDiff>
              <PropDiff :name="$t('build.rangeLimit')" v-if="weapon.rangeLimit" :ori="weapon.rangeLimit" :val="build.rangeLimit" subfix=" m" :preci="1"></PropDiff>
              <PropDiff :name="$t('build.fireRate')" :ori="weapon.fireRate" :val="build.fireRate" :preci="3"></PropDiff>
              <PropDiff :name="$t('build.critMul')" :ori="weapon.critMul" :val="build.critMul" subfix="x"></PropDiff>
              <PropDiff :name="$t('build.critChance')" :ori="weapon.critChance" :val="build.critChance" percent></PropDiff>
              <PropDiff :name="$t('build.pellets')" v-if="weapon.pellets != 1 || build.pellets != 1" :ori="weapon.pellets" :val="build.pellets"></PropDiff>
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
              <PropDiff :name="$t('build.reload')" :ori="weapon.reload" :val="build.reloadTime" :preci="2" negative></PropDiff>
              <PropDiff data-v-step="1" :name="$t('build.status')" :ori="mode.procChance" :val="build.procChancePerHit" percent></PropDiff>
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
              <PropDiff :name="$t('build.totalDamage')" :ori="build.oriTotalDamage" :val="build.totalDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
              <PropDiff v-if="weapon.tags.has('Sniper')" :name="$t('build.firstAmmoDamage')" :ori="build.oriTotalDamage" :val="build.firstAmmoDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 3}" @click="changeMode(3)"></PropDiff>
              <PropDiff data-v-step="2" :name="$t('build.burstDamage')" :ori="build.oriBurstDamage" :val="build.burstDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 1}" @click="changeMode(1)"></PropDiff>
              <PropDiff :name="$t('build.sustainedDamage')" :ori="build.oriSustainedDamage" :val="build.sustainedDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 2}" @click="changeMode(2)"></PropDiff>
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
              <!-- 爆头几率 -->
              <el-form-item :label="$t('buildview.headshotChance')">
                <el-tooltip effect="dark" :content="$t('buildview.headshotChanceTip')" placement="bottom">
                  <el-slider class="right-side fill" v-model="headShotChance" size="small" :format-tooltip="v=>v+'%'" @change="optionChange"></el-slider>
                </el-tooltip>
              </el-form-item>
              <!-- 等级调整 -->
              <el-form-item :label="$t('buildview.levelSetting')">
                <el-switch class="right-side" size="small" v-model="levelSetting"></el-switch>
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
            <el-row type="flex" class="mod-slot-container autozoom" :gutter="12" v-if="!isAMP">
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
          <el-tab-pane class="statusinfo" :label="$t('build.statusinfo')" name="statusinfo">
            <StatusInfoDisplay :info="build.statusInfo" :common="build.commonStatusInfo" />
          </el-tab-pane>
          <!-- 幻影装置-->
          <el-tab-pane class="enemy-sim" :label="$t('build.simulacrum')" name="simulacrum">
            <Simulacrum>
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
import ModSelector from "@/components/ModSelector.vue";
import BuffSelector from "@/components/BuffSelector.vue";
import PropDiff from "@/components/PropDiff.vue";
import EnemySelector from "@/components/EnemySelector.vue";
import EnemyTimeline from "@/components/EnemyTimeline.vue";
import StatusInfoDisplay from "@/components/StatusInfoDisplay.vue";
import ProbabilityVisualization from "@/components/ProbabilityVisualization";
import OtherInfoDisplay from "@/components/OtherInfoDisplay.vue";
import BuildMinimap from "@/components/BuildMinimap.vue";
import ShareQR from "@/components/ShareQR.vue";
import ModSlot from "@/components/ModSlot.vue";
import LeveledModSlot from "@/components/LeveledModSlot.vue";
import { BaseBuildEditor } from "./BaseBuildEditor";
import { Weapon, EnemyData, Codex, Enemy } from "@/warframe/codex";
import { GunModBuild, GunCompareMode } from "@/warframe/gunmodbuild";
import { ModBuild } from "@/warframe/modbuild";
import "@/less/builder.less";

@Component({
  components: { ModSelector, BuffSelector, PropDiff, EnemySelector, EnemyTimeline, StatusInfoDisplay, ModSlot, LeveledModSlot, ProbabilityVisualization, OtherInfoDisplay, ShareQR, BuildMinimap }
})
export default class BuildFrame extends Vue {
  @Prop() weapon: Weapon;
  @Prop() build: ModBuild;
}

</script>
