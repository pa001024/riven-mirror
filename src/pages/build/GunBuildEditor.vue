<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{$t("zh") ? weapon.name : weapon.id.toUpperCase()}}</span>
            </div>
            <table class="weapon-props">
              <tbody>
                <PropDiff :name="$t('build.magazine')" :ori="weapon.magazine" :val="build.magazineSize"></PropDiff>
                <PropDiff :name="$t('build.fireRate')" :ori="weapon.fireRate" :val="build.fireRate" :preci="2"></PropDiff>
                <PropDiff :name="$t('build.critMul')" :ori="weapon.critMul" :val="build.critMul" subfix="x"></PropDiff>
                <PropDiff :name="$t('build.critChance')" :ori="weapon.critChance" :val="build.critChance" percent></PropDiff>
                <PropDiff :name="$t('build.bullets')" v-if="weapon.bullets != 1 || build.bullets != 1" :ori="weapon.bullets" :val="build.bullets"></PropDiff>
                <PropDiff :name="$t('build.ratio')" :ori="rWeapon.ratio" :val="rWeapon.ratio"></PropDiff>
                <PropDiff :name="$t('build.reload')" :ori="weapon.reload" :val="build.reloadTime" :preci="2" negative></PropDiff>
                <PropDiff :name="$t('build.status')" :ori="weapon.status" :val="build.procChance" percent></PropDiff>
                <br>
                <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :name="mapDname(dname)" :ori="ori" :val="val"></PropDiff>
                <br>
                <PropDiff :name="$t('build.panelDamage')" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
                <PropDiff :name="$t('build.totalDamage')" :ori="build.oriTotalDamage" :val="build.totalDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
                <PropDiff :name="$t('build.burstDamage')" :ori="build.oriBurstDamage" :val="build.burstDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 1}" @click="changeMode(1)"></PropDiff>
                <PropDiff :name="$t('build.sustainedDamage')" :ori="build.oriSustainedDamage" :val="build.sustainedDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 2}" @click="changeMode(2)"></PropDiff>
              </tbody>
            </table>
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
              <el-form-item :label="$t('buildview.handshotChance')">
                <el-tooltip effect="dark" :content="$t('buildview.handshotChanceTip')" placement="bottom">
                  <el-slider class="right-side" v-model="handShotChance" size="small" :format-tooltip="v=>v+'%'" @change="optionChange"></el-slider>
                </el-tooltip>
              </el-form-item>
              <!-- 基伤加成 -->
              <el-form-item :label="$t('buildview.extraBaseDamage')">
                <el-tooltip effect="dark" placement="bottom">
                  <div slot="content">
                    <div v-html="$t('buildview.extraBaseDamageTip')"></div>
                  </div>
                  <el-input size="small" class="right-side chroma-dmg" v-model="extraBaseDamage">
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
                  <el-input size="small" class="right-side chroma-dmg" v-model="extraOverall">
                    <template slot="append">%</template>
                  </el-input>
                </el-tooltip>
              </el-form-item>
              <!-- 赋能 -->
              <el-form-item :label="$t('buildview.arcanes')">
                <el-checkbox-group v-model="arcanes">
                  <el-checkbox v-for="arcane in availableArcanes" :key="arcane.id" :label="arcane" @change="optionChange">{{$t("zh") ? arcane.name : arcane.id}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :sm="24" :md="12" :lg="18">
        <!-- MOD区域 -->
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="index" v-for="(item, index) in tabs" :label="item.title" :name="item.name">
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <div class="mod-slot" :class="[mod && mod.rarity, { active: !mod }]" @click="slotClick(index)">
                    <template v-if="mod">
                      <div class="mod-title" @click.stop="slotClick(index)">{{$t("zh") ? mod.name : mod.id}}</div>
                      <div class="mod-detail" @click.stop="slotRemove(index)">
                        <div class="mod-stat">
                          <div class="mod-prop" v-for="prop in mod.props" :key="prop[0]">{{convertToPropName(prop)}}</div>
                          <div class="mod-sum">{{PNNum(100 * item.build.modValue(mod.id))}}% {{$t("build.total")}}</div>
                        </div>
                        <div class="mod-action">
                          <button type="button" class="mod-slot-remove">
                            <i class="el-icon-close"></i>
                          </button>
                        </div>
                      </div>
                    </template>
                    <i v-else class="el-icon-plus"></i>
                  </div>
                </el-col>
              </draggable>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 幻影装置区域 -->
        <el-card class="enemy-sim">
          <div slot="header" class="enemy-sim-header">{{$t("build.simulacrum")}}</div>
          <keep-alive>
            <div v-if="enemy" class="enemy-main">
              <!-- 敌人信息区域 -->
              <ul class="enemy-info">
                <li class="enemy-name">
                  <div class="key">{{$t("enemy.name")}}</div>
                  <div class="value">{{$t("zh") ? enemy.name : enemy.id}}</div>
                </li>
                <li class="enemy-faction">
                  <div class="key">{{$t("enemy.faction")}}</div>
                  <div class="value">{{enemy.factionName}}</div>
                </li>
                <li class="enemy-level">
                  <div class="key">{{$t("enemy.level")}}</div>
                  <div class="value control"><el-input size="small" class="enemy-level-edit" v-model="enemyLevel" style="widdiv: 80px"></el-input></div>
                </li>
                <li class="enemy-health">
                  <div class="key">{{$t(`enemy.fleshType.${enemy.fleshType}`)}}</div>
                  <div class="value">{{enemy.health.toFixed()}}</div>
                </li>
                <li v-if="enemy.sheild > 0" class="enemy-shield">
                  <div class="key">{{$t(`enemy.sheildType.${enemy.sheildType}`)}}</div>
                  <div class="value">{{enemy.sheild.toFixed()}}</div>
                </li>
                <li v-if="enemy.armor > 0" class="enemy-armor">
                  <div class="key">{{$t(`enemy.armorType.${enemy.armorType}`)}}</div>
                  <div class="value">{{enemy.armor.toFixed()}}</div>
                </li>
                <li v-if="enemy.resistence > 0" class="enemy-level">
                  <div class="key">{{$t("enemy.resistence")}}</div>
                  <div class="value">{{enemy.resistenceText}}</div>
                </li>
                <li class="enemy-level">
                  <div class="key">{{$t("enemy.action")}}</div>
                  <div class="value control"><el-button size="small" @click="selectEnemy(null)">{{$t("enemy.reselect")}}</el-button></div>
                </li>
              </ul>
              <!-- 伤害显示区域 -->
              <EnemyTimeline :timeline="build.getTimeline()"></EnemyTimeline>
            </div>
            <EnemySelector v-else @select="selectEnemy"></EnemySelector>
          </keep-alive>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="$t('build.selectMod')" :visible.sync="dialogVisible" width="600">
      <ModSelector ref="selector" :build="build" @command="modSelect($event)"></ModSelector>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { EnemyFaction, RivenWeapon, ModBuild, RivenDataBase, GunWeapon, GunModBuild, NormalMod, Damage2_0, DamageType, ValuedRivenProperty, EnemyData, Enemy, Codex } from "@/warframe";
import ModSelector from "@/components/ModSelector.vue";
import PropDiff from "@/components/PropDiff.vue";
import EnemySelector from "@/components/EnemySelector.vue";
import EnemyTimeline from "@/components/EnemyTimeline.vue";
import { BaseBuildEditor } from "./BaseBuildEditor";

@Component({
  components: { ModSelector, PropDiff, EnemySelector, EnemyTimeline }
})
export default class GunBuildEditor extends BaseBuildEditor {
  @Prop() weapon: GunWeapon;
  @Prop() rWeapon: RivenWeapon;
  handShotChance = 0;
  extraBaseDamage = 0;
  extraOverall = 0;
  /** 赋能 */
  arcanes = [];
  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }
  enemyData: EnemyData = null;
  enemy: Enemy = null;
  enemyLevel = 155;

  @Watch("weapon")
  reload() { super.reload(); this.enemyData = this.enemy = null; }
  // [overwrite]
  reloadSelector() { this.$refs.selector && (this.$refs.selector as any).reload(); }

  get options() {
    return {
      handShotChance: this.handShotChance / 100,
      extraBaseDamage: this.extraBaseDamage / 100,
      extraOverall: this.extraOverall / 100,
      arcanes: this.arcanes,
    };
  }
  newBuild(weapon: GunWeapon) {
    return new GunModBuild(weapon, null, this.options);
  }
  // === 事件处理 ===
  @Watch("extraBaseDamage")
  @Watch("extraOverall")
  optionChange() {
    this.build.options = this.options;
    this.build.calcMods();
    this.reloadSelector();
  }
  spawnLevels = {
    "Eidolon Teralyst": 50,
    "Eidolon Gantulyst": 55,
    "Eidolon Hydrolyst": 60,
    "Teralyst Synovia": 50,
    "Tusk Firbolg": 55,
    "Tusk Bolkor": 55,
  };
  selectEnemy(enemyData: EnemyData) {
    this.enemyData = enemyData;
    if (!enemyData) {
      this.build.target = this.enemy = null;
      return;
    }
    if (this.spawnLevels[enemyData.id]) this.enemyLevel = this.spawnLevels[enemyData.id];
    this.build.target = this.enemy = new Enemy(enemyData, this.enemyLevel);
  }
  @Watch("enemyLevel")
  enemyLevelChange() {
    if (this.enemy) this.enemy.level = this.enemyLevel;
  }
  // 子类不实现会报错
  handleTabsEdit(targetName, action: "add" | "remove") { super.handleTabsEdit(targetName, action); }
  // === 生命周期钩子 ===
  beforeMount() { this.reload(); }
}
</script>

<style>
.right-side {
  width: 50%;
  float: right;
}
.enemy-info {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  max-width: 100%;
  font-size: 14px;
  color: #606266;
}
@media only screen and (min-width: 1200px) {
}
.enemy-info li {
  display: inline-block;
}
.enemy-info li div {
  display: inline-block;
  padding: 4px 8px;
  margin-right: 8px;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.enemy-info .control {
  padding: 0 8px;
  width: 120px;
}
.enemy-info .control .el-input__inner {
  padding: 0 12px;
}
.enemy-info .key {
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  color: #6199ff;
  font-weight: 500;
  border-left: 3px solid;
  padding-left: 8px;
}

.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
.enemy-sim-body > .el-form-item {
  margin: 0;
}
.enemy-sim {
  margin-top: 8px;
}
.build-form-editor .el-form-item {
  margin-bottom: 8px;
}
.build-form-editor .el-form-item:last-child {
  margin-bottom: 0;
}
.mod-stat .mod-prop {
  font-size: 9pt;
  color: #777;
}
.mod-sum {
  font-size: 11pt;
  color: #67c23a;
}
.mod-title,
.mod-detail {
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
.mod-title {
  cursor: move;
}
.mod-detail {
  cursor: pointer;
}
.mod-detail:hover {
  background: #ffd6d6;
}
.mod-stat {
  display: initial;
}
.mod-detail:hover .mod-stat {
  display: none;
}
.mod-action {
  display: none;
}
.mod-detail:hover .mod-action {
  display: initial;
}
.mod-title {
  font-size: 20px;
  border-radius: 4px 0 0 4px;
}
.mod-title:hover {
  background: #e8f0ff;
}
.mod-title,
.mod-detail {
  flex: 1;
}
.mod-slot-remove {
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 36px;
}
.build-tools {
  margin-top: 16px;
}
.build-tools .el-form-item__label,
.build-tools .el-form-item__content,
.build-tools .el-checkbox__label {
  font-size: 1rem;
  line-height: 2.8rem;
}
.build-tools-action {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.build-tools-action > * {
  flex: 1;
}
.weapon-name {
  font-size: 1.1rem;
}
.weapon-props {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  font-size: 1em;
}
.weapon-props th {
  color: #606266;
  font-weight: inherit;
  text-align: left;
}
.select-cpmode {
  cursor: pointer;
}
.select-cpmode:hover {
  background: #ebf2ff;
}
.select-cpmode.active {
  background: #89b2fd;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
}
.select-cpmode.active th {
  color: #fff;
}
.select-cpmode.active > * {
  border-top: 4px solid #d9e6ff;
  border-bottom: 4px solid #d9e6ff;
  border-left: 0;
  border-right: 0;
}
.select-cpmode.active > *:first-child {
  border-left: 4px solid #d9e6ff;
  border-radius: 4px 0 0 4px;
}
.select-cpmode.active > *:last-child {
  border-right: 4px solid #d9e6ff;
  border-radius: 0 4px 4px 0;
}
.editor-main > .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 1366px) {
  .editor-main > .el-dialog__wrapper > .el-dialog {
    width: 70%;
    margin: 0 !important;
  }
}
@media only screen and (max-width: 992px) {
  .editor-main > .el-dialog__wrapper > .el-dialog {
    width: 90%;
    margin: 0 !important;
  }
}
.mod-slot-containor {
  flex-wrap: wrap;
}
.mod-slot {
  border-left: 4px solid transparent;
  text-align: center;
  margin: 8px 0;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 1200px) {
  .mod-slot {
    margin: 4px 0;
  }
}
.mod-slot.n {
  border-left-color: #865e37;
}
.mod-slot.c {
  border-left-color: #a7a7a7;
}
.mod-slot.r {
  border-left-color: #f5e583;
}
.mod-slot.l {
  border-left-color: #eaeaea;
}
.mod-slot.x {
  border-left-color: #a072ce;
}
.mod-slot.active {
  cursor: pointer;
}
.mod-slot .el-icon-plus {
  font-size: 40px;
  padding: 20px;
  color: #89b2fd;
}
.mod-slot:hover i {
  color: #6199ff;
}
.mod-select {
  max-height: 64vh;
  overflow: auto;
}
</style>
