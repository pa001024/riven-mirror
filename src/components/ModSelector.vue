<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <!-- 快速选择 -->
    <el-tab-pane name="fast">
      <span slot="label" class="mod-tablabel">{{$t("modselector.fastSelect")}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in fast" :key="index">
          <li class="mod-item el-dropdown" @click="handleClick(mod.id)">
            {{$t(`modselector.fast.${mod.name}`)}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
    <!-- 普通MOD -->
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="mod-tablabel">{{tab.name}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in tab.mods" :key="index">
          <li class="mod-item el-dropdown" @click="handleClick(mod.id)">
            {{mod.name}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
    <!-- 紫卡 -->
    <el-tab-pane name="riven">
      <span slot="label" class="mod-tablabel">{{$t("modselector.rivenMod")}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="(hiRiven, index) in modHistoty" :key="index">
          <li class="mod-item el-dropdown" @click="newRiven(hiRiven.qrCodeBase64)">
            {{hiRiven.fullName}}
          </li>
        </div>
      </ul>
      <div style="margin: 8px;">{{$t("modselector.createRiven")}}</div>
      <RivenEditor style="margin: 8px;" v-model="editorRivenCode" :weapon="build.rivenWeapon"></RivenEditor>
      <div style="text-align: right; margin: 0">
        <el-button type="primary" size="medium" @click="newRiven()">{{$t("modselector.ok")}}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import RivenEditor from "@/components/RivenEditor.vue";
import { Getter } from "vuex-class";
import { NormalMod, NormalModDatabase, VisualMeleeMods, Codex } from "@/warframe/codex";
import { RivenMod } from "@/warframe/rivenmod";
import { ModBuild } from "@/warframe/modbuild";

declare interface ModSelectorTab {
  id: string
  name: string
  mods: NormalMod[]
}

@Component({ components: { RivenEditor } })
export default class ModSelector extends Vue {
  @Getter("modHistoty") modHistoty: RivenMod[];

  @Prop() build: ModBuild;
  tabs: ModSelectorTab[] = [];
  selectTab = "fast";
  editorRivenCode = "";

  /** MOD快速选择 */
  fastSelect = {
    Rifle: {
      baseDmg: ["serration", "splitChamber", "heavyCaliber"],
      crit: ["pointStrike", "vitalSense"],
      aimCrit: ["argonScope", "bladedRounds"],
      sliverCorrosive: ["infectedClip", "stormbringer"],
      silverRadiation: ["hellfire", "stormbringer"],
      silverViral: ["primedCryoRounds", "infectedClip"],
      goldCorrosive: ["malignantForce", "highVoltage"],
      gas: ["malignantForce", "thermiteRounds", "infectedClip"],
      allStatus: ["highVoltage", "malignantForce", "thermiteRounds", "rimeRounds"],
    },
    Shotgun: {
      baseDmg: ["primedPointBlank", "hellsChamber"],
      crit: ["primedRavage", "blunderbuss"],
      aimCrit: ["laserSight", "shrapnelShot"],
      sliverCorrosive: ["primedChargedShell", "contagiousSpread"],
      silverRadiation: ["primedChargedShell", "incendiaryCoat"],
      silverViral: ["chillingGrasp", "contagiousSpread"],
      goldCorrosive: ["shellShock", "toxicBarrage"],
      gas: ["toxicBarrage", "scatteringInferno", "contagiousSpread"],
      allStatus: ["shellShock", "toxicBarrage", "scatteringInferno", "frigidBlast"],
    },
    Pistol: {
      baseDmg: ["hornetStrike", "barrelDiffusion", "lethalTorrent"],
      crit: ["primedPistolGambit", "primedTargetCracker"],
      aimCrit: ["hydraulicCrosshairs", "sharpenedBullets"],
      sliverCorrosive: ["convulsion", "pathogenRounds"],
      silverRadiation: ["primedHeatedCharge", "convulsion"],
      silverViral: ["deepFreeze", "pathogenRounds"],
      goldCorrosive: ["jolt", "pistolPestilence"],
      gas: ["pistolPestilence", "scorch", "pathogenRounds"],
      allStatus: ["jolt", "pistolPestilence", "scorch", "frostbite"],
    },
    Melee: {
      baseDmgRange: ["primedPressurePoint", "primedReach"],
      crit: ["bloodRush", "organShatter", "sacrificialSteel"],
      slideCrit: ["maimingStrike", "bloodRush", "organShatter"],
      sliverCorrosive: ["primedFeverStrike", "shockingTouch"],
      silverRadiation: ["moltenImpact", "shockingTouch"],
      silverViral: ["primedFeverStrike", "northWind"],
      goldCorrosive: ["voltaicStrike", "virulentScourge"],
      gas: ["primedFeverStrike", "volcanicEdge", "virulentScourge"],
      allStatus: ["voltaicStrike", "virulentScourge", "volcanicEdge", "viciousFrost"],
    }
  };
  get fast() { return _.map(this.fastSelect[this.build.rivenWeapon.mod], (v, i) => ({ name: i, id: v } as any)); }

  newRiven(code?: string) {
    let riven = new RivenMod();
    riven.qrCodeBase64 = code || this.editorRivenCode;
    if (riven.id !== this.build.rivenWeapon.id)
      this.$confirm(this.$t("modselector.weaponWarnTip") as string, this.$t("modselector.weaponWarn") as string, { type: 'warning' }).then(() => {
        this.$emit("command", riven.normalMod);
      });
    else
      this.$emit("command", riven.normalMod);
  }
  @Watch("build")
  reload() {
    let selected = _.compact(this.build.mods);
    // 是否虚拟技能武器
    let isVisual = this.build.weapon.id === "Whipclaw" || this.build.weapon.id === "Shattered Lash";
    let mods = NormalModDatabase.filter(v =>
      (isVisual && VisualMeleeMods.includes(v.key)) || // 虚拟技能武器接受所有mod
      this.build.weapon.tags.concat([this.build.rivenWeapon.id]).includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id));
    let benefits = mods.filter(v => v.props.some(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) >= 0))
      .map(v => [v, this.build.testMod(v)] as [NormalMod, number]).sort((a, b) => b[1] - a[1]).map(([v]) => v);
    this.tabs = [
      // { id: "Fast", name: this.$t("modselector.fastSelect") as string, mods: _.map(this.fastSelect[this.build.rivenWeapon.mod], (v, i) => ({ name: i, id: v } as any)) },
      { id: "benefit", name: this.$t("modselector.sorted") as string, mods: benefits },
      { id: "damage", name: this.$t("modselector.damage") as string, mods: mods.filter(v => v.props.some(k => k[1] > 0 && "01DSKEGICO".indexOf(k[0]) >= 0)) },
      { id: "elements", name: this.$t("modselector.element") as string, mods: mods.filter(v => v.props.some(k => "456789A".indexOf(k[0]) >= 0)) },
      { id: "speed", name: this.$t("modselector.speed") as string, mods: mods.filter(v => v.id === "berserker" || v.props.some(k => "RLFJ".indexOf(k[0]) >= 0)) },
      { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => v.id !== "berserker" && v.props.every(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) < 0)) },
    ];
    this.selectTab = "fast";
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string | string[]) {
    if (typeof id === "string")
      this.$emit("command", Codex.getNormalMod(id));
    else {
      let selected = _.compact(this.build.mods);
      let mods = NormalModDatabase.filter(v => this.build.weapon.tags.concat([this.build.rivenWeapon.id]).includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id));
      let found = id.map(v => mods.find(k => k.id === v)).filter(Boolean);
      this.$emit("command", found);
    }
    this.reload();
  }
}
</script>

<style>
.mod-item-container {
  display: inline-block;
}
.mod-tablabel {
  font-size: 16px;
  padding: 0 8px;
}
.mod-item {
  display: inline-block;
  margin: 8px;
  padding: 8px 20px;
  border: 1px solid #ccc;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
  box-sizing: content-box;
  transition: 0.3s;
}
.mod-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>
