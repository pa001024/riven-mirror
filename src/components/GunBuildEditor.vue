<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{weapon.name}}</span>
            </div>
            <table class="weapon-props">
              <tbody>
                <PropDiff name="暴击率" :ori="weapon.criticalChances" :val="build.critChance" percent></PropDiff>
                <PropDiff name="暴击伤害" :ori="weapon.criticalMultiplier" :val="build.critMul" subfix="x"></PropDiff>
                <PropDiff name="攻速" :ori="weapon.fireRate" :val="build.fireRate" :preci="2"></PropDiff>
                <PropDiff name="触发几率" :ori="weapon.status" :val="build.procChance" percent></PropDiff>
                <PropDiff v-if="weapon.bullets!=1||build.bullets!=1" name="弹片数" :ori="weapon.bullets" :val="build.bullets"></PropDiff>
                <PropDiff name="弹匣容量" :ori="weapon.magazine" :val="build.magazineSize"></PropDiff>
                <PropDiff name="装填" :ori="weapon.reload" :val="build.reloadTime" :preci="2"></PropDiff>
                <tr v-for="[dname, oldvalue, newvalue] in mergedDmg" :key="dname"><td>{{mapDname(dname)}}</td>
                  <td>{{oldvalue}}</td>
                  <td v-if="newvalue!=oldvalue"><i class="el-icon-arrow-right"></i> {{Num(newvalue)}}</td>
                </tr>
                <tr><td>面板伤害</td>
                  <td>{{Num(build.originalDamage)}}</td>
                  <td v-if="build.originalDamage!=build.panelDamage"><i class="el-icon-arrow-right"></i> {{Num(build.panelDamage)}}</td>
                </tr>
                <tr><td class="select-cpmode" :class="{active: build.compareMode===0}" @click="changeMode(0)">单发伤害</td>
                  <td>{{Num(build.oriTotalDamage)}}</td>
                  <td v-if="build.oriTotalDamage!=build.totalDamage"><i class="el-icon-arrow-right"></i> {{Num(build.totalDamage)}}</td>
                </tr>
                <tr><td class="select-cpmode" :class="{active: build.compareMode===1}" @click="changeMode(1)">爆发伤害</td>
                  <td>{{Num(build.oriBurstDamage)}}</td>
                  <td v-if="build.oriBurstDamage!=build.burstDamage"><i class="el-icon-arrow-right"></i> {{Num(build.burstDamage)}}</td>
                </tr>
                <tr><td class="select-cpmode" :class="{active: build.compareMode===2}" @click="changeMode(2)">持续伤害</td>
                  <td>{{Num(build.oriSustainedDamage)}}</td>
                  <td v-if="build.oriSustainedDamage!=build.sustainedDamage"><i class="el-icon-arrow-right"></i> {{Num(build.sustainedDamage)}}</td>
                </tr>
              </tbody>
            </table>
          </el-card>
          <!-- 选项区域 -->
          <el-card class="build-tools">
            <el-button-group class="build-tools-action">
              <el-button type="primary" @click="fill()">自动配置</el-button>
              <el-button type="primary" @click="fillEmpty()">填充空白</el-button>
              <el-button type="primary" @click="clear()">清空</el-button>
            </el-button-group>
            <el-form class="build-form-editor">
              <el-form-item label="爆头率">
                <el-tooltip effect="dark" content="更高的爆头率会提高暴击的收益" placement="bottom">
                  <el-slider v-model="handShotChance" :format-tooltip="v=>v+'%'" @change="reload" style="margin-left: 64px;"></el-slider>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="基伤加成">
                <el-tooltip effect="dark" content="Chroma的怨怒护甲和Mirage的黯然失色可对武器基伤产生大量加成，步枪增幅、死亡之眼等光环MOD也属于这个加成" placement="bottom">
                  <el-input size="small" class="chroma-dmg" v-model="extraBaseDamage" @change="reload" style="width:120px">
                    <template slot="append">%</template>
                  </el-input>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="赋能" v-if="is('sniper') || is('pistol')">
                <el-checkbox v-model="isUseMomentum" v-if="is('sniper')" @change="reload">动量</el-checkbox>
                <el-checkbox v-model="isUseVelocity" v-if="is('pistol')" @change="reload">迅速</el-checkbox>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <!-- MOD编辑器区域 -->
      <el-col :sm="24" :md="12" :lg="18">
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="item.name" v-for="item in tabs" :label="item.title" :name="item.name">
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods">
                <el-col :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <div class="mod-slot" :class="[mod&&mod.rarity,{active:!mod}]" @click="!mod && slotClick(index)">
                    <template v-if="mod">
                      <div class="mod-title" @click="slotClick(index)">{{mod.name}}</div>
                      <div class="mod-detail" @click="slotRemove(index)">
                        <div class="mod-stat">
                          <div class="mod-prop" v-for="prop in mod.props" :key="prop[0]">{{convertToPropName(prop)}}</div>
                          <div class="mod-sum">{{PNNum(100*item.build.modValue(mod.id))}}% 总收益</div>
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
import { RivenWeapon, ModBuild, RivenDataBase, GunWeapon, GunModBuild, NormalMod, Damage2_0, DamageType, ValuedRivenProperty } from "@/warframe";
import ModSelector from "@/components/ModSelector.vue";
import PropDiff from "@/components/PropDiff.vue";
import { BaseBuildEditor } from "@/components/BaseBuildEditor";

@Component({
  components: { ModSelector, PropDiff }
})
export default class GunBuildEditor extends BaseBuildEditor {
  @Prop() weapon: GunWeapon;
  @Prop() rWeapon: RivenWeapon;
  handShotChance = 0;
  extraBaseDamage = 0;
  isUseMomentum = false;
  isUseVelocity = false;

  get options() {
    return {};
  }
  @Watch("weapon")
  reload() { super.reload(); }
  reloadSelector() { this.$refs.selector && (this.$refs.selector as ModSelector).reload(); }
  newBuild(...parms) { return new GunModBuild(...parms); }
  // === 事件处理 ===
  // === 生命周期钩子 ===
  beforeMount() { this.reload(); }
}
</script>

<style>
.build-form-editor .el-form-item {
  margin-bottom: 8px;
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
  cursor: pointer;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
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
.select-cpmode {
  cursor: pointer;
}
.select-cpmode.active {
  background: #6199ff;
  color: #fff;
  /* box-shadow: 0px 0px 0px 4px #b3ceff; */
}
.select-cpmode.active > * {
  border-top: 4px solid #b3ceff;
  border-bottom: 4px solid #b3ceff;
  border-left: 0;
  border-right: 0;
}
.select-cpmode.active > *:first-child {
  border-left: 4px solid #b3ceff;
}
.select-cpmode.active > *:last-child {
  border-right: 4px solid #b3ceff;
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
.weapon-props {
  width: 100%;
  border-spacing: 0;
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
