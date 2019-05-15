<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <!-- 快速选择 -->
    <el-tab-pane name="fast">
      <span slot="label" class="mod-tablabel">{{$t("modselector.fastSelect")}}</span>
      <div class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in fast" :key="index">
          <div class="mod-item el-dropdown" @click="handleClick(mod.id)">
            {{$t(`modselector.fast.${mod.name}`)}}
          </div>
        </div>
      </div>
    </el-tab-pane>
    <!-- 普通MOD -->
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="mod-tablabel">{{tab.name}}</span>
      <div class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in tab.mods" :key="index">
          <div class="mod-item el-dropdown" @click="handleClick(mod.id)">
            {{mod.name}}
          </div>
        </div>
      </div>
    </el-tab-pane>
    <!-- 紫卡 -->
    <el-tab-pane name="riven" v-if="isVirtual || !isExalted">
      <span slot="label" class="mod-tablabel">{{$t("modselector.rivenMod")}}</span>
      <div class="mod-select">
        <div class="mod-item-container" v-for="(hiRiven, index) in modHistoty" :key="index">
          <div class="mod-item el-dropdown" @click="newRiven(hiRiven.qrCodeBase64)">
            {{hiRiven.fullName}}
          </div>
        </div>
      </div>
      <div style="margin: 8px;">{{$t("modselector.createRiven")}}</div>
      <RivenEditor style="margin: 8px;" v-model="editorRivenCode" :weapon="!isVirtual && build.rivenWeapon"></RivenEditor>
      <div style="text-align: right; margin: 0">
        <el-button type="primary" size="medium" @click="newRiven()">{{$t("modselector.ok")}}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import RivenEditor from "@/components/RivenEditor.vue";
import { Getter } from "vuex-class";
import { NormalMod, NormalModDatabase, VirtualMeleeMods, Codex, AcolyteModsList } from "@/warframe/codex";
import { RivenMod } from "@/warframe/rivenmod";
import { ModBuild } from "@/warframe/modbuild";

declare interface ModSelectorTab {
  id: string;
  name: string;
  mods: NormalMod[];
}

@Component({ components: { RivenEditor } })
export default class ModSelector extends Vue {
  @Getter("modHistoty") modHistoty: RivenMod[];

  @Prop() build: ModBuild;
  tabs: ModSelectorTab[] = [];
  selectTab = "fast";
  editorRivenCode = "";
  get isExalted() {
    return this.build.weapon.tags.includes("Exalted");
  }
  get isVirtual() {
    return this.build.weapon.tags.includes("Virtual");
  }

  /** MOD快速选择 */
  fastSelect = {
    Rifle: {
      baseDmg: ["Serration", "Split Chamber", "Heavy Caliber"],
      crit: ["Point Strike", "Vital Sense"],
      aimCrit: ["Argon Scope", "Bladed Rounds"],
      sliverCorrosive: ["Infected Clip", "Stormbringer"],
      silverRadiation: ["Hellfire", "Stormbringer"],
      silverViral: ["Primed Cryo Rounds", "Infected Clip"],
      goldCorrosive: ["Malignant Force", "High Voltage"],
      gas: ["Malignant Force", "Thermite Rounds", "Infected Clip"],
      allStatus: ["High Voltage", "Malignant Force", "Thermite Rounds", "Rime Rounds"],
      allElem: ["Primed Cryo Rounds", "Hellfire", "Stormbringer", "Infected Clip"]
    },
    Shotgun: {
      baseDmg: ["Primed Point Blank", "Hell's Chamber"],
      crit: ["Primed Ravage", "Blunderbuss"],
      aimCrit: ["Laser Sight", "Shrapnel Shot"],
      sliverCorrosive: ["Primed Charged Shell", "Contagious Spread"],
      silverRadiation: ["Primed Charged Shell", "Incendiary Coat"],
      silverViral: ["Chilling Grasp", "Contagious Spread"],
      goldCorrosive: ["Shell Shock", "Toxic Barrage"],
      gas: ["Toxic Barrage", "Scattering Inferno", "Contagious Spread"],
      allStatus: ["Shell Shock", "Toxic Barrage", "Scattering Inferno", "Frigid Blast"],
      allElem: ["Primed Charged Shell", "Contagious Spread", "Incendiary Coat", "Chilling Grasp"]
    },
    Pistol: {
      baseDmg: ["Hornet Strike", "Barrel Diffusion", "Lethal Torrent"],
      crit: ["Primed Pistol Gambit", "Primed Target Cracker"],
      aimCrit: ["Hydraulic Crosshairs", "Sharpened Bullets"],
      sliverCorrosive: ["Convulsion", "Pathogen Rounds"],
      silverRadiation: ["Primed Heated Charge", "Convulsion"],
      silverViral: ["Deep Freeze", "Pathogen Rounds"],
      goldCorrosive: ["Jolt", "Pistol Pestilence"],
      gas: ["Pistol Pestilence", "Scorch", "Pathogen Rounds"],
      allStatus: ["Jolt", "Pistol Pestilence", "Scorch", "Frostbite"],
      allElem: ["Primed Heated Charge", "Deep Freeze", "Convulsion", "Pathogen Rounds"]
    },
    Melee: {
      baseDmgRange: ["Primed Pressure Point", "Primed Reach"],
      crit: ["Blood Rush", "Organ Shatter", "Sacrificial Steel"],
      slideCrit: ["Maiming Strike", "Blood Rush", "Organ Shatter"],
      sliverCorrosive: ["Primed Fever Strike", "Shocking Touch"],
      silverRadiation: ["Molten Impact", "Shocking Touch"],
      silverViral: ["Primed Fever Strike", "North Wind"],
      goldCorrosive: ["Voltaic Strike", "Virulent Scourge"],
      gas: ["Primed Fever Strike", "Volcanic Edge", "Virulent Scourge"],
      allStatus: ["Voltaic Strike", "Virulent Scourge", "Volcanic Edge", "Vicious Frost"],
      condiCombo: ["Drifting Contact", "Condition Overload"],
      allElem: ["Primed Fever Strike", "Shocking Touch", "Molten Impact", "Shocking Touch"]
    },
    Archgun: {
      baseDmg: ["Rubedo-Lined Barrel", "Dual Rounds"],
      crit: ["Parallax Scope", "Hollowed Bullets"],
      aimCrit: ["Critical Focus"],
      sliverCorrosive: ["Electrified Barrel", "Venomous Clip"],
      silverRadiation: ["Electrified Barrel", "Combustion Rounds"],
      silverViral: ["Polar Magazine", "Venomous Clip"],
      goldCorrosive: ["Charged Bullets", "Contamination Casing"],
      gas: ["Venomous Clip", "Magma Chamber", "Contamination Casing"],
      allStatus: ["Contamination Casing", "Magma Chamber", "Charged Bullets", "Hypothermic Shell"],
      allElem: ["Electrified Barrel", "Venomous Clip", "Combustion Rounds", "Polar Magazine"]
    }
  };
  get fast() {
    const mod = this.build.rivenWeapon.mod;
    return _.map(this.fastSelect[mod === "Zaw" ? "Melee" : mod === "Kitgun" ? "Pistol" : mod], (v, i) => ({ name: i, id: v } as any));
  }

  newRiven(code?: string) {
    let riven = new RivenMod();
    riven.qrCodeBase64 = code || this.editorRivenCode;
    if (!this.isVirtual && riven.id !== this.build.rivenWeapon.id)
      this.$confirm(this.$t("modselector.weaponWarnTip") as string, this.$t("modselector.weaponWarn") as string, { type: "warning" }).then(() => {
        this.$emit("command", riven.normalMod);
      });
    else this.$emit("command", riven.normalMod);
  }

  @Watch("build")
  @Watch("build.damageModel")
  reload() {
    let selected = _.compact(this.build.mods);
    const { isVirtual, isExalted } = this;
    const AcolyteMods = AcolyteModsList.slice(0, 5); // 近战追随者MOD
    // 是否虚拟技能武器
    let mods = NormalModDatabase.filter(
      v =>
        (isVirtual && VirtualMeleeMods.includes(v.key)) || // 虚拟技能武器接受所有mod
        (this.build.weapon.tags // 普通
          .concat([this.build.rivenWeapon.id])
          .includes(v.type) &&
          this.build.isValidMod(v) &&
          (!(!isVirtual && isExalted) || !AcolyteMods.includes(v.id))) // 近战显赫武器不接受追随者MOD
    );
    let benefits = mods
      .filter(v => v.props.some(k => v.id === "Berserker" || v.id === "Condition Overload" || "01DSKEGICO456789ARLFJ".indexOf(k[0]) >= 0))
      .map(v => [v, this.build.testMod(v)] as [NormalMod, number])
      .sort((a, b) => b[1] - a[1])
      .map(([v]) => v);
    this.tabs = [
      // { id: "Fast", name: this.$t("modselector.fastSelect") as string, mods: _.map(this.fastSelect[this.build.rivenWeapon.mod], (v, i) => ({ name: i, id: v } as any)) },
      { id: "benefit", name: this.$t("modselector.sorted") as string, mods: benefits },
      { id: "damage", name: this.$t("modselector.damage") as string, mods: mods.filter(v => v.id === "Condition Overload" || v.props.some(k => k[1] > 0 && "01DSKEGICO".indexOf(k[0]) >= 0)) },
      { id: "elements", name: this.$t("modselector.element") as string, mods: mods.filter(v => v.props.some(k => "456789A".indexOf(k[0]) >= 0)) },
      { id: "speed", name: this.$t("modselector.speed") as string, mods: mods.filter(v => v.id === "Berserker" || v.props.some(k => "RLFJ".indexOf(k[0]) >= 0)) },
      { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => v.id !== "Berserker" && v.props.every(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) < 0)) }
    ];
    this.selectTab = "fast";
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string | string[]) {
    if (typeof id === "string") this.$emit("command", Codex.getNormalMod(id));
    else {
      let selected = _.compact(this.build.mods);
      let mods = NormalModDatabase.filter(
        v => this.build.weapon.tags.concat([this.build.rivenWeapon.id]).includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id)
      );
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
