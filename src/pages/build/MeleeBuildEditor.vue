<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{weapon.displayName}}</span>
            </div>
            <table class="weapon-props">
              <tbody>
                <PropDiff :name="$t('build.fireRate')" :ori="weapon.fireRate" :val="build.fireRate" :preci="2"></PropDiff>
                <PropDiff :name="$t('build.critMul')" :ori="weapon.critMul" :val="build.critMul" subfix="x"></PropDiff>
                <PropDiff :name="$t('build.critChance')" :ori="weapon.critChance" :val="build.critChance" percent></PropDiff>
                <PropDiff :name="$t('build.slideDmg')" :ori="weapon.slideDmg" :val="build.panelSlideDamage"></PropDiff>
                <PropDiff :name="$t('build.ratio')" :ori="rWeapon.ratio" :val="rWeapon.ratio"></PropDiff>
                <PropDiff :name="$t('build.status')" :ori="weapon.status" :val="build.procChance" percent></PropDiff>
                <br>
                <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :name="mapDname(dname)" :ori="ori" :val="val"></PropDiff>
                <br>
                <PropDiff :name="$t('build.panelDamage')" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
                <PropDiff :name="$t('build.attackDamage')" :ori="build.oriTotalDamage" :val="build.totalDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
                <PropDiff :name="$t('build.slideDamage')" :ori="build.oriSlideDamage" :val="build.slideDamage"
                   class="select-cpmode" :class="{active: build.compareMode === 1}" @click="changeMode(1)"></PropDiff>
                <PropDiff :name="$t('build.attackDamagePS')" :ori="build.oriTotalDamagePS" :val="build.totalDamagePS"
                   class="select-cpmode" :class="{active: build.compareMode === 2}" @click="changeMode(2)"></PropDiff>
                <PropDiff :name="$t('build.slideDamagePS')" :ori="build.oriSlideDamagePS" :val="build.slideDamagePS"
                   class="select-cpmode" :class="{active: build.compareMode === 3}" @click="changeMode(3)"></PropDiff>
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
              <!-- 连击加成 -->
              <el-form-item :label="$t('buildview.comboMul')">
                <el-tooltip effect="dark" :content="$t('buildview.comboMulTip')" placement="bottom">
                  <el-input-number class="right-side" size="small" v-model="comboMul" @change="optionChange" :min="1" :max="6" :step="0.5" label="使用MOD槽位"></el-input-number>
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
        <el-tabs v-model="tabValue" editable @edit="handleTabsEdit">
          <el-tab-pane :key="index" v-for="(item, index) in tabs" :label="item.title" :name="item.name">
            <!-- MOD区域 -->
            <el-row type="flex" class="mod-slot-containor" :gutter="12">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <div class="mod-slot" :class="[mod && mod.rarity, { active: !mod }]" @click="slotClick(index)">
                    <template v-if="mod">
                      <div class="mod-title">
                        <div class="mod-polarity"><i :class="`wf-icon-${mod.polarity}`"></i>{{mod.cost}}</div>
                        {{mod.name}}
                      </div>
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
                        <div class="buff-parm power" v-if="buff.powerEnable"><el-input-number @change="refleshMods()" size="mini" v-model="buff.power"></el-input-number></div>
                      </div>
                      <div class="buff-detail" @click.stop="buffRemove(index)">
                        <div class="buff-stat">
                          <div class="buff-prop" v-for="prop in buff.props" :key="prop[0]">{{convertToPropName(prop)}}</div>
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
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenWeapon, ModBuild, RivenDataBase, GunWeapon, GunModBuild, NormalMod, Damage2_0, DamageType, ValuedRivenProperty, MeleeWeapon, MeleeModBuild, Codex } from "@/warframe";
import PropDiff from "@/components/PropDiff.vue";
import ModSelector from "@/components/ModSelector.vue";
import BuffSelector from "@/components/BuffSelector.vue";
import { BaseBuildEditor } from "./BaseBuildEditor";

declare interface BuildSelectorTab {
  title: string
  name: string
  build: ModBuild
  mods: NormalMod[]
}

@Component({
  components: { ModSelector, PropDiff, BuffSelector }
})
export default class MeleeBuildEditor extends BaseBuildEditor {
  @Prop() weapon: MeleeWeapon;
  @Prop() rWeapon: RivenWeapon;

  comboMul = 1.5;
  extraBaseDamage = 0;
  extraOverall = 0;
  /** 赋能 */
  arcanes = [];
  get availableArcanes() {
    return Codex.getAvailableArcanes(this.weapon);
  }

  @Watch("weapon")
  reload() { super.reload(); }
  reloadSelector() { this.$refs.selector && (this.$refs.selector as any).reload(); }

  get options() {
    return {
      comboLevel: ~~((this.comboMul - 1) * 2),
      extraBaseDamage: this.extraBaseDamage / 100,
      extraOverall: this.extraOverall / 100,
      arcanes: this.arcanes,
    };
  }
  newBuild(weapon: MeleeWeapon) {
    return new MeleeModBuild(weapon, null, this.options);
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
  handleTabsEdit(targetName, action: "add" | "remove") { super.handleTabsEdit(targetName, action); }
  // === 生命周期钩子 ===
  beforeMount() { this.reload(); }
}
</script>
