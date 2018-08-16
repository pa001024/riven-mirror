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
                <PropDiff name="滑行攻击" :ori="weapon.slideDmg" :val="build.panelSlideDamage"></PropDiff>
                <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :name="mapDname(dname)" :ori="ori" :val="val"></PropDiff>
                <PropDiff name="面板伤害" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
                <PropDiff name="平砍伤害" :ori="build.oriTotalDamage" :val="build.totalDamage"
                   class="select-cpmode" :class="{active: build.compareMode===0}" @click="changeMode(0)"></PropDiff>
                <PropDiff name="滑砍伤害" :ori="build.oriSlideDamage" :val="build.slideDamage"
                   class="select-cpmode" :class="{active: build.compareMode===1}" @click="changeMode(1)"></PropDiff>
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
              <el-form-item label="连击倍率">
                <el-tooltip effect="dark" content="将会按照此连击倍率来进行计算 (爪子P会自动相应增加)" placement="bottom">
                  <el-input-number size="small" v-model="comboMul" @change="reload" :min="1" :max="6" :step="0.5" label="使用MOD槽位"></el-input-number>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="赋能">
                <el-checkbox v-model="isUseFury" @change="reload">狂怒</el-checkbox>
                <el-checkbox v-model="isUseStrike" @change="reload">速攻</el-checkbox>
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
import { RivenWeapon, ModBuild, RivenDataBase, GunWeapon, GunModBuild, NormalMod, Damage2_0, DamageType, ValuedRivenProperty, MeleeWeapon, MeleeModBuild } from "@/warframe";
import PropDiff from "@/components/PropDiff.vue";
import ModSelector from "@/components/ModSelector.vue";
import { BaseBuildEditor } from "@/components/BaseBuildEditor";

declare interface BuildSelectorTab {
  title: string
  name: string
  build: ModBuild
  mods: NormalMod[]
}

@Component({
  components: { ModSelector, PropDiff }
})
export default class MeleeBuildEditor extends BaseBuildEditor {
  @Prop() weapon: MeleeWeapon;
  @Prop() rWeapon: RivenWeapon;

  comboMul = 0;
  isUseFury = true;
  isUseStrike = true;

  @Watch("weapon")
  reload() { super.reload(); }
  reloadSelector() { this.$refs.selector && (this.$refs.selector as ModSelector).reload(); }
  newBuild(...parms) { return new MeleeModBuild(...parms); }
  // === 事件处理 ===
  // === 生命周期钩子 ===
  beforeMount() { this.reload(); }
}
</script>
