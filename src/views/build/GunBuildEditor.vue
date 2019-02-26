<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span class="title">{{weapon.displayName}}</span>
              <span class="forma">{{$t("build.formaCount", [build.formaCount])}}</span>
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
              <PropDiff :name="$t('build.bullets')" v-if="weapon.bullets != 1 || build.bullets != 1" :ori="weapon.bullets" :val="build.bullets"></PropDiff>
              <PropDiff :name="$t('build.ratio')" v-if="rWeapon.ratio" :ori="rWeapon.ratio" :val="rWeapon.ratio"></PropDiff>
              <PropDiff :name="$t('build.reload')" :ori="weapon.reload" :val="build.reloadTime" :preci="2" negative></PropDiff>
              <PropDiff data-v-step="1" :name="$t('build.status')" :ori="weapon.status" :val="build.procChancePerHit" percent></PropDiff>
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
              <PropDiff v-for="[dname, ori, val] in mergedDmg" :key="dname" :icon="dname.toLowerCase()" :name="$t(`elements.${dname}`).toUpperCase()" :ori="ori" :val="val"></PropDiff>
              <br>
              <PropDiff :name="$t('build.panelDamage')" :ori="build.originalDamage" :val="build.panelDamage"></PropDiff>
              <PropDiff :name="$t('build.totalDamage')" :ori="build.oriTotalDamage" :val="build.totalDamage"
                  class="select-cpmode" :class="{active: build.compareMode === 0}" @click="changeMode(0)"></PropDiff>
              <PropDiff v-if="weapon.tags.includes('Sniper')" :name="$t('build.firstAmmoDamage')" :ori="build.oriTotalDamage" :val="build.firstAmmoDamage"
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
            <el-row type="flex" class="mod-slot-container" :gutter="12" v-if="!isAMP">
              <draggable class="block" v-model="item.mods" @end="refleshMods()" :options="{ animation: 250, handle:'.mod-title' }">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(mod, index) in item.mods" :key="index">
                  <ModSlot @change="slotClick(index)" @remove="slotRemove(index)" :mod="mod" :build="item.build" :polarization="item.build.polarizations[index]"/>
                </el-col>
              </draggable>
            </el-row>
            <div class="buff-head">{{$t('build.buff')}}</div>
            <!-- Buff区域 -->
            <el-row type="flex" class="buff-slot-container" :gutter="12">
              <div class="block">
                <el-col class="list-complete-item" :sm="12" :md="12" :lg="6" v-for="(buff, index) in item.buffs" :key="index">
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
        <el-tabs value="statusinfo" class="external-area" data-v-step="4">
          <!-- 触发计算 -->
          <el-tab-pane class="statusinfo" :label="$t('build.statusinfo')" name="statusinfo">
            <StatusInfoDisplay :info="build.statusInfo" :common="build.commonStatusInfo" />
          </el-tab-pane>
          <!-- 幻影装置-->
          <el-tab-pane class="enemy-sim" :label="$t('build.simulacrum')" name="simulacrum">
            <keep-alive>
              <div v-if="enemy" class="enemy-main">
                <!-- 敌人信息区域 -->
                <div class="enemy-info">
                  <div class="item enemy-name">
                    <div class="key">{{$t("enemy.name")}}</div>
                    <div class="value">{{enemy.name}}</div>
                  </div>
                  <div class="item enemy-faction">
                    <div class="key">{{$t("enemy.faction")}}</div>
                    <div class="value">{{enemy.factionName}}</div>
                  </div>
                  <div class="item enemy-level">
                    <div class="key">{{$t("enemy.level")}}</div>
                    <div class="value control"><el-input-number size="small" class="enemy-level-edit" controls-position="right" v-model="enemyLevel"></el-input-number></div>
                  </div>
                  <div class="item enemy-health">
                    <div class="key">{{$t(`enemy.fleshType.${enemy.fleshType}`)}}</div>
                    <div class="value">{{enemy.health.toFixed()}}</div>
                  </div>
                  <div v-if="enemy.shield > 0" class="item enemy-shield">
                    <div class="key">{{$t(`enemy.shieldType.${enemy.shieldType}`)}}</div>
                    <div class="value">{{enemy.shield.toFixed()}}</div>
                  </div>
                  <div v-if="enemy.armor > 0" class="item enemy-armor">
                    <div class="key">{{$t(`enemy.armorType.${enemy.armorType}`)}}</div>
                    <div class="value">{{enemy.armor.toFixed()}}</div>
                  </div>
                  <div v-if="enemy.resistence > 0" class="item enemy-resistence">
                    <div class="key">{{$t("enemy.resistence")}}</div>
                    <div class="value">{{enemy.resistenceText}}</div>
                  </div>
                  <div class="item enemy-amrorreduce">
                    <div class="key">{{$t("enemy.amrorReduce")}}</div>
                    <div class="value control"><el-input size="small" class="enemy-amrorreduce-edit" v-model="amrorReduce"></el-input></div>
                  </div>
                  <div class="item enemy-action">
                    <div class="key">{{$t("enemy.action")}}</div>
                    <div class="value control">
                      <el-checkbox v-model="perBullet">{{$t('enemy.perBullet')}}</el-checkbox>
                    </div>
                    <div class="value control"><el-button size="small" @click="selectEnemy(null)">{{$t("enemy.reselect")}}</el-button></div>
                  </div>
                </div>
                <!-- 伤害显示区域 -->
                <EnemyTimeline :perBullet="perBullet" :timeline="build.getTimeline()"/>
              </div>
              <EnemySelector v-else @select="selectEnemy"/>
            </keep-alive>
          </el-tab-pane>
          <!-- 概率可视化 -->
          <el-tab-pane class="provis" :label="$t('build.provis')" name="provis">
            <ProbabilityVisualization :criti="build.critChance" :critMul="build.critMul" :multi="build.bullets" :totalDamageFloor="build.totalDamageFloor" :totalDamageCeil="build.totalDamageCeil"/>
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
import ProbabilityVisualization from "@/components/ProbabilityVisualization.vue";
import OtherInfoDisplay from "@/components/OtherInfoDisplay.vue";
import ShareQR from "@/components/ShareQR.vue";
import ModSlot from "@/components/ModSlot.vue";
import { BaseBuildEditor } from "./BaseBuildEditor";
import { GunWeapon, RivenWeapon, EnemyData, Codex, Enemy } from "@/warframe/codex";
import { GunModBuild, GunCompareMode } from "@/warframe/gunmodbuild";
import "@/less/builder.less";

@Component({
  components: { ModSelector, BuffSelector, PropDiff, EnemySelector, EnemyTimeline, StatusInfoDisplay, ModSlot, ProbabilityVisualization, OtherInfoDisplay, ShareQR }
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
  perBullet = false;

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

  get isAMP() {
    return this.weapon.tags.includes("Amp");
  }

  get options() {
    return {
      headShotChance: this.headShotChance / 100,
      extraBaseDamage: +this.extraBaseDamage,
      extraOverall: +this.extraOverall,
      arcanes: this.arcanes,
      amrorReduce: this.amrorReduce / 100,
    };
  }

  get defalutMode() {
    let gun = this.weapon as GunWeapon;
    if (gun.tags.includes("Sniper") && gun.magazine <= 2) return GunCompareMode.FirstAmmoDamage;
    if (gun.magazine / (gun.tags.includes("Secondary") ? gun.fireRate * 1.6 : gun.fireRate) < gun.reload * 1.8) return GunCompareMode.SustainedDamage;
    if (gun.fireRate > 2) return GunCompareMode.BurstDamage;
    return GunCompareMode.TotalDamage;
  }

  newBuild(weapon: GunWeapon) {
    let b = new GunModBuild(weapon, null, this.options);
    b.fastMode = false;
    b.compareMode = this.defalutMode;
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
  mounted() { super.onMounted() }
}
</script>
