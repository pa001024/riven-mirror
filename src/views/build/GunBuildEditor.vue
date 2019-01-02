<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{weapon.displayName}}</span>
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
            <div class="weapon-capacity"></div>
            <table class="weapon-props">
              <tbody>
                <tr class="prop-diff cost-show">
                  <th>{{$t('build.cost')}}</th>
                  <td class="diff diff-ori">
                    {{build.maxCost - build.totalCost}}
                  </td>
                  <template v-if="build.totalCost > 0">
                    <td class="diff diff-arrow">/</td>
                    <td class="diff diff-val">
                      {{build.maxCost}}
                    </td>
                  </template>
                </tr>
                <PropDiff :name="$t('build.magazine')" :ori="weapon.magazine" :val="build.magazineSize"></PropDiff>
                <PropDiff :name="$t('build.prjSpeed')" v-if="weapon.prjSpeed" :ori="weapon.prjSpeed" :val="build.prjSpeed" subfix=" m/s" :preci="1"></PropDiff>
                <PropDiff :name="$t('build.fireRate')" :ori="weapon.fireRate" :val="build.fireRate" :preci="3"></PropDiff>
                <PropDiff :name="$t('build.critMul')" :ori="weapon.critMul" :val="build.critMul" subfix="x"></PropDiff>
                <PropDiff :name="$t('build.critChance')" :ori="weapon.critChance" :val="build.critChance" percent></PropDiff>
                <PropDiff :name="$t('build.bullets')" v-if="weapon.bullets != 1 || build.bullets != 1" :ori="weapon.bullets" :val="build.bullets"></PropDiff>
                <PropDiff :name="$t('build.ratio')" :ori="rWeapon.ratio" :val="rWeapon.ratio"></PropDiff>
                <PropDiff :name="$t('build.reload')" :ori="weapon.reload" :val="build.reloadTime" :preci="2" negative></PropDiff>
                <PropDiff :name="$t('build.status')" :ori="weapon.status" :val="build.procChancePerHit" percent></PropDiff>
                <br>
                <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :name="$t(`elements.${dname}`).toUpperCase()" :ori="ori" :val="val"></PropDiff>
                <br>
                <PropDiff :name="$t('build.panelDamage')" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
                <PropDiff :name="$t('build.totalDamage')" :ori="build.oriTotalDamage" :val="build.totalDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
                <PropDiff v-if="weapon.tags.includes('Sniper')" :name="$t('build.firstAmmoDamage')" :ori="build.oriTotalDamage" :val="build.firstAmmoDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 3}" @click="changeMode(3)"></PropDiff>
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
              <el-form-item :label="$t('buildview.headshotChance')">
                <el-tooltip effect="dark" :content="$t('buildview.headshotChanceTip')" placement="bottom">
                  <el-slider class="right-side" v-model="headShotChance" size="small" :format-tooltip="v=>v+'%'" @change="optionChange"></el-slider>
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
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <ModSlot @change="slotClick(index)" @remove="slotRemove(index)" :mod="mod" :build="item.build" :polarization="item.build.polarizations[index]"/>
                </el-col>
              </draggable>
            </el-row>
            <div class="buff-head">{{$t('build.buff')}}</div>
            <!-- Buff区域 -->
            <el-row type="flex" class="buff-slot-containor" :gutter="12">
              <div class="block">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(buff, index) in item.buffs" :key="index">
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
        <el-tabs value="statusinfo" class="external-area">
          <!-- 触发计算 -->
          <el-tab-pane class="statusinfo" :label="$t('build.statusinfo')" name="statusinfo">
            <StatusInfoDisplay :info="build.statusInfo" :common="build.commonStatusInfo" />
          </el-tab-pane>
          <!-- 幻影装置-->
          <el-tab-pane class="enemy-sim" :label="$t('build.simulacrum')" name="simulacrum">
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
                    <div class="value control"><el-input-number size="small" class="enemy-level-edit" controls-position="right" v-model="enemyLevel"></el-input-number></div>
                  </li>
                  <li class="enemy-health">
                    <div class="key">{{$t(`enemy.fleshType.${enemy.fleshType}`)}}</div>
                    <div class="value">{{enemy.health.toFixed()}}</div>
                  </li>
                  <li v-if="enemy.shield > 0" class="enemy-shield">
                    <div class="key">{{$t(`enemy.shieldType.${enemy.shieldType}`)}}</div>
                    <div class="value">{{enemy.shield.toFixed()}}</div>
                  </li>
                  <li v-if="enemy.armor > 0" class="enemy-armor">
                    <div class="key">{{$t(`enemy.armorType.${enemy.armorType}`)}}</div>
                    <div class="value">{{enemy.armor.toFixed()}}</div>
                  </li>
                  <li v-if="enemy.resistence > 0" class="enemy-resistence">
                    <div class="key">{{$t("enemy.resistence")}}</div>
                    <div class="value">{{enemy.resistenceText}}</div>
                  </li>
                  <li class="enemy-amrorreduce">
                    <div class="key">{{$t("enemy.amrorReduce")}}</div>
                    <div class="value control"><el-input size="small" class="enemy-amrorreduce-edit" v-model="amrorReduce"></el-input></div>
                  </li>
                  <li class="enemy-action">
                    <div class="key">{{$t("enemy.action")}}</div>
                    <div class="value control"><el-button size="small" @click="selectEnemy(null)">{{$t("enemy.reselect")}}</el-button></div>
                  </li>
                </ul>
                <!-- 伤害显示区域 -->
                <EnemyTimeline :timeline="build.getTimeline()"></EnemyTimeline>
              </div>
              <EnemySelector v-else @select="selectEnemy"></EnemySelector>
            </keep-alive>
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
import ModSlot from "@/components/ModSlot.vue";
import { BaseBuildEditor } from "./BaseBuildEditor";
import { GunWeapon, RivenWeapon, EnemyData, Codex, Enemy } from "@/warframe/codex";
import { GunModBuild } from "@/warframe/gunmodbuild";

@Component({
  components: { ModSelector, BuffSelector, PropDiff, EnemySelector, EnemyTimeline, StatusInfoDisplay, ModSlot }
})
export default class GunBuildEditor extends BaseBuildEditor {
  @Prop() weapon: GunWeapon;
  @Prop() rWeapon: RivenWeapon;

  headShotChance = 0;
  extraBaseDamage = 0;
  extraOverall = 0;
  amrorReduce = 0;
  /** 赋能 */
  arcanes = [];
  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }
  enemyData: EnemyData = null;
  enemy: Enemy = null;
  enemyLevel = 160;

  @Watch("weapon")
  reload() {
    super.reload();
    this.build.target = this.enemy;
  }
  // [overwrite]
  reloadSelector() {
    this.$refs.selector && (this.$refs.selector as any).reload();
    this.$refs.buffselector && (this.$refs.buffselector as any).reload();
  }

  get options() {
    return {
      headShotChance: this.headShotChance / 100,
      extraBaseDamage: this.extraBaseDamage,
      extraOverall: this.extraOverall,
      arcanes: this.arcanes,
      amrorReduce: this.amrorReduce / 100,
    };
  }
  newBuild(weapon: GunWeapon) {
    let b = new GunModBuild(weapon, null, this.options);
    b.fastMode = false;
    return b;
  }
  // === 事件处理 ===
  @Watch("extraBaseDamage")
  @Watch("extraOverall")
  @Watch("amrorReduce")
  optionChange() {
    if (!this.weapon) return;
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

<style lang="less">
@text_grey : #606266;
@theme_main: #6199ff;
@theme_back: #fff;
@theme_leaf: #89b2fd;
@half_grey : #777;
@text_info : #67c23a;

.weapon-display {
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
  color: @text_grey;
  li {
    display: inline-block;
    & > div {
      display: inline-block;
      padding: 4px 8px;
      margin-right: 8px;
      min-width: 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
    }
  }
  .control {
    padding: 0 8px;
    width: 110px;
    margin: 0;
    .el-input__inner {
      padding: 0 12px;
    }
    .el-input-number--small {
      width: fit-content;
    }
  }
  .key {
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    color: @theme_main;
    font-weight: 500;
    border-left: 3px solid;
    padding-left: 8px;
  }
}
.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter {
  opacity: 0;
}
.list-complete-leave-active {
  opacity: 0;
}
.enemy-sim-body {
  > .el-form-item {
    margin: 0;
  }
}
.enemy-sim {
  margin-top: 8px;
}
.build-form-editor {
  .el-form-item {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.build-tools {
  margin-top: 16px;
  .el-form-item__label,
  .el-form-item__content,
  .el-checkbox__label {
    font-size: 1rem;
    line-height: 2.8rem;
  }
  .build-tools-action {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 12px;
    > * {
      flex: 1;
    }
  }
}
.weapon-name {
  font-size: 1.1rem;
}
.weapon-props {
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
.select-cpmode {
  cursor: pointer;
  &:hover {
    background: #ebf2ff;
  }
}
.select-cpmode.active {
  background: #89b2fd;
  color: @theme_back;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  th {
    color: @theme_back;
  }
  > * {
    border-top: 4px solid #d9e6ff;
    border-bottom: 4px solid #d9e6ff;
    border-left: 0;
    border-right: 0;
    &:first-child {
      border-left: 4px solid #d9e6ff;
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-right: 4px solid #d9e6ff;
      border-radius: 0 4px 4px 0;
    }
  }
}
.editor-main > .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mod-slot-containor {
  flex-wrap: wrap;
}

.mod-select {
  max-height: 64vh;
  overflow: auto;
}
// BUFF
.buff-head {
  color: #6199ff;
  margin: 8px 0;
}
.buff-slot {
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
  border-left-color: #ffd6d6;
  > .el-icon-plus {
    font-size: 40px;
    color: @theme_leaf;
    padding: 20px;
  }
  &:hover > .el-icon-plus,
  .el-icon-close {
    color: @theme_main;
  }
  &.active {
    cursor: pointer;
  }
}

.buff-title {
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: 0.3s;
  font-size: 20px;
  border-radius: 4px 0 0 4px;
  flex: 1;
  position: relative;
  flex-wrap: wrap;
  &:hover {
    background: #e8f0ff;
  }
  .mod-polarity {
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 1rem;
  }
  &.layers,
  &.powers {
    font-size: 14px;
  }
}
.buff-detail {
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  flex: 1;
  &:hover {
    background: #ffd6d6;
    .buff-stat {
      display: none;
    }
    .buff-action {
      display: initial;
    }
  }
}
.buff-action {
  display: none;
}
.buff-slot-remove {
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 36px;
}
.buff-stat {
  .buff-prop {
    font-size: 9pt;
    color: @half_grey;
  }
  display: initial;
}
.buff-sum {
  font-size: 11pt;
  color: @text_info;
}
.buff-parm {
  .el-input-number {
    .el-input-number__decrease,
    .el-input-number__increase,
    .el-input > input {
      background: none;
      border: 0;
    }
  }
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
@media only screen and (max-width: 1200px) {
  .mod-slot {
    margin: 4px 0;
  }
}
</style>
