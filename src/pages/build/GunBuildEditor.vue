<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{weapon.name}} - {{weapon.id}}</span>
            </div>
            <table class="weapon-props">
              <tbody>
                <PropDiff name="弹匣" :ori="weapon.magazine" :val="build.magazineSize"></PropDiff>
                <PropDiff name="攻击速度" :ori="weapon.fireRate" :val="build.fireRate" :preci="2"></PropDiff>
                <PropDiff name="暴击倍率" :ori="weapon.critMul" :val="build.critMul" subfix="x"></PropDiff>
                <PropDiff name="暴击几率" :ori="weapon.critChances" :val="build.critChance" percent></PropDiff>
                <PropDiff v-if="weapon.bullets != 1 || build.bullets != 1" name="弹片数" :ori="weapon.bullets" :val="build.bullets"></PropDiff>
                <PropDiff name="裂罅倾向性" :ori="rWeapon.ratio" :val="rWeapon.ratio"></PropDiff>
                <PropDiff name="装填" :ori="weapon.reload" :val="build.reloadTime" :preci="2" negative></PropDiff>
                <PropDiff name="触发几率" :ori="weapon.status" :val="build.procChance" percent></PropDiff>
                <br>
                <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :name="mapDname(dname)" :ori="ori" :val="val"></PropDiff>
                <PropDiff name="面板伤害" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
                <PropDiff name="单发伤害" :ori="build.oriTotalDamage" :val="build.totalDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
                <PropDiff name="爆发伤害" :ori="build.oriBurstDamage" :val="build.burstDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 1}" @click="changeMode(1)"></PropDiff>
                <PropDiff name="持续伤害" :ori="build.oriSustainedDamage" :val="build.sustainedDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 2}" @click="changeMode(2)"></PropDiff>
              </tbody>
            </table>
          </el-card>
          <!-- 选项区域 -->
          <el-card class="build-tools">
            <el-button-group class="build-tools-action">
              <el-button type="primary" size="small" @click="fill()">自动配置</el-button>
              <el-button type="primary" size="small" @click="fillEmpty()">填充空白</el-button>
              <el-button type="primary" size="small" @click="clear()">清空</el-button>
            </el-button-group>
            <el-form class="build-form-editor">
              <el-form-item label="爆头率">
                <el-tooltip effect="dark" content="更高的爆头率会提高暴击的收益" placement="bottom">
                  <el-slider v-model="handShotChance" size="small" :format-tooltip="v=>v+'%'" @change="optionChange" style="margin-left: 64px;"></el-slider>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="基伤加成">
                <el-tooltip style="width: calc(100% - 68px);" effect="dark" placement="bottom">
                  <div slot="content">
                    <div>Chroma的"怨怒护甲"和Mirage的"黯然失色"等技能可对武器基伤进行大量加成，</div>
                    <div>步枪增幅、死亡之眼等光环MOD也属于这个加成</div>
                  </div>
                  <el-input size="small" class="chroma-dmg" v-model="extraBaseDamage" style="width:120px">
                    <template slot="append">%</template>
                  </el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="赋能" v-if="is('sniper') || is('pistol')">
                <el-checkbox v-model="isUseMomentum" v-if="is('sniper')" @change="optionChange">动量</el-checkbox>
                <el-checkbox v-model="isUseVelocity" v-if="is('pistol')" @change="optionChange">迅速</el-checkbox>
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
                      <div class="mod-title" @click.stop="slotClick(index)">{{mod.name}}</div>
                      <div class="mod-detail" @click.stop="slotRemove(index)">
                        <div class="mod-stat">
                          <div class="mod-prop" v-for="prop in mod.props" :key="prop[0]">{{convertToPropName(prop)}}</div>
                          <div class="mod-sum">{{PNNum(100 * item.build.modValue(mod.id))}}% 总收益</div>
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
          <div slot="header" class="enemy-sim-header">幻影装置</div>
          <keep-alive>
            <div v-if="enemy" class="enemy-main">
              <!-- 敌人信息区域 -->
              <table class="enemy-info">
                <tr class="enemy-name">
                  <th>敌人</th>
                  <td>{{enemy.name}}</td>
                </tr>
                <tr class="enemy-faction">
                  <th>派系</th>
                  <td>{{enemy.factionName}}</td>
                </tr>
                <tr label="等级" class="enemy-level">
                  <th>等级</th>
                  <td class="control"><el-input size="small" class="enemy-level-edit" v-model="enemyLevel" style="width: 80px"></el-input></td>
                </tr>
                <tr class="enemy-health">
                  <th>{{enemy.fleshTypeName}}</th>
                  <td>{{enemy.health.toFixed()}}</td>
                </tr>
                <tr v-if="enemy.sheild > 0" class="enemy-shield">
                  <th>{{enemy.sheildTypeName}}</th>
                  <td>{{enemy.sheild.toFixed()}}</td>
                </tr>
                <tr v-if="enemy.armor > 0" class="enemy-armor">
                  <th>{{enemy.armorTypeName}}</th>
                  <td>{{enemy.armor.toFixed()}}</td>
                </tr>
                <tr v-if="enemy.resistence > 0" class="enemy-level">
                  <th>伤害抗性</th>
                  <td>{{enemy.resistenceText}}</td>
                </tr>
                <tr label="操作" class="enemy-level">
                  <th>操作</th>
                  <td class="control"><el-button size="small" @click="selectEnemy(null)">重新选择</el-button></td>
                  <!-- <el-button type="primary" size="small" @click="simStart()">开始模拟</el-button> -->
                </tr>
              </table>
              <!-- 伤害显示区域 -->
              <EnemyTimeline :timeline="build.getTimeline()"></EnemyTimeline>
            </div>
            <EnemySelector v-else @select="selectEnemy"></EnemySelector>
          </keep-alive>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="选择MOD" :visible.sync="dialogVisible" width="600">
      <ModSelector ref="selector" :build="build" @command="modSelect($event)"></ModSelector>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { EnemyFaction, RivenWeapon, ModBuild, RivenDataBase, GunWeapon, GunModBuild, NormalMod, Damage2_0, DamageType, ValuedRivenProperty, EnemyData, Enemy } from "@/warframe";
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
  isUseMomentum = false;
  isUseVelocity = false;
  enemyData: EnemyData = null;
  enemy: Enemy = null;
  enemyLevel = 155;

  @Watch("weapon")
  reload() { super.reload(); this.enemyData = this.enemy = null; }
  // [overwrite]
  reloadSelector() { this.$refs.selector && (this.$refs.selector as any).reload(); }
  newBuild(weapon: GunWeapon) {
    return new GunModBuild(weapon, null, {
      handShotChance: this.handShotChance / 100,
      extraBaseDamage: this.extraBaseDamage / 100,
      isUseMomentum: this.isUseMomentum,
      isUseVelocity: this.isUseVelocity,
    });
  }
  // === 事件处理 ===
  @Watch("extraBaseDamage")
  optionChange() {
    this.build.options = {
      handShotChance: this.handShotChance / 100,
      extraBaseDamage: this.extraBaseDamage / 100,
      isUseMomentum: this.isUseMomentum,
      isUseVelocity: this.isUseVelocity,
    };
    this.build.calcMods();
    this.reloadSelector();
  }
  spawnLevels = {
    "Eidolon Teralyst": 50,
    "Eidolon Gantulyst": 55,
    "Eidolon Hydrolyst": 60,
    "Teralyst Synovia": 50,
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
.enemy-main {
  display: flex;
}
.enemy-main .timeline-tabs {
  flex: 1;
}
.enemy-info {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 200px;
  max-width: 100%;
  font-size: 14px;
  color: #606266;
}
@media only screen and (min-width: 1200px) {
}
.enemy-info td,
.enemy-info th {
  padding: 8px 16px;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.enemy-info td.control {
  padding: 0 8px;
}
.enemy-info td.control .el-input__inner {
  padding: 0 12px;
}
.enemy-info th {
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  background: #89b2fd;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
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
.weapon-props {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  font-size: 14px;
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
