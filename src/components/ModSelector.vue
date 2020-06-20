<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <!-- 快速选择 -->
    <el-tab-pane name="fast" v-if="fast">
      <span slot="label" class="mod-tablabel">{{ $t("modselector.fastSelect") }}</span>
      <div class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in fast" :key="index">
          <div class="mod-item" @click="handleClick(mod.id)">
            {{ $t(`modselector.fast.${mod.name}`) }}
          </div>
        </div>
      </div>
    </el-tab-pane>
    <!-- 普通MOD -->
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="mod-tablabel">{{ tab.name }}</span>
      <div class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in tab.mods" :key="index">
          <div class="mod-item" :class="[mod.rarity]" @click="handleClick(mod.id)">
            <WfIcon v-if="mod.elemType" :type="mod.elemType.toLowerCase()" />
            {{ mod.name }}
          </div>
        </div>
      </div>
    </el-tab-pane>
    <!-- 紫卡 -->
    <el-tab-pane name="riven" v-if="isWeaponBuild && !isCompanion && (isVirtual || !isExalted)">
      <span slot="label" class="mod-tablabel">{{ $t("modselector.rivenMod") }}</span>
      <div class="mod-select">
        <div class="mod-item-container" v-for="(hiRiven, index) in modHistoty" :key="index">
          <div class="mod-item" @click="newRiven(hiRiven.qrCodeBase64)">
            {{ hiRiven.fullLocName }}
          </div>
        </div>
      </div>
      <div style="margin: 8px;">{{ $t("modselector.createRiven") }}</div>
      <RivenEditor style="margin: 8px;" v-model="editorRivenCode" :weapon="!isVirtual && isWeaponBuild"></RivenEditor>
      <div style="text-align: right; margin: 0">
        <el-button type="primary" size="medium" @click="newRiven()">{{ $t("modselector.ok") }}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { compact, map } from "lodash-es";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import RivenEditor from "@/components/RivenEditor.vue";
import { Getter } from "vuex-class";
import { NormalMod, NormalModDatabase, VirtualMeleeMods, Codex, AcolyteModsList, MainTag } from "@/warframe/codex";
import { RivenMod } from "@/warframe/rivenmod";
import { CommonBuild } from "@/warframe/commonbuild";

declare interface ModSelectorTab {
  id: string;
  name: string;
  mods: NormalMod[];
}

@Component({ components: { RivenEditor } })
export default class ModSelector extends Vue {
  @Getter("modHistoty") modHistoty: RivenMod[];
  @Prop({ type: String, default: "Warframe" }) type: "Warframe" | "Aura" | "Exilus" | "Companion" | "Weapon" | "Archwing";

  @Prop() build: CommonBuild;
  tabs: ModSelectorTab[] = [];
  selectTab = "fast";
  editorRivenCode = "";
  get isWeaponBuild() {
    return this.build["weapon"];
  }

  get isCompanion() {
    return this.build.tags.includes("Companion");
  }
  get isExalted() {
    return this.build["weapon"].isExalted;
  }
  get isVirtual() {
    return this.build["weapon"].isVirtual;
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
      allElem: ["Primed Cryo Rounds", "Hellfire", "Stormbringer", "Infected Clip"],
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
      allElem: ["Primed Charged Shell", "Contagious Spread", "Incendiary Coat", "Chilling Grasp"],
    },
    Secondary: {
      baseDmg: ["Hornet Strike", "Barrel Diffusion", "Lethal Torrent"],
      crit: ["Primed Pistol Gambit", "Primed Target Cracker"],
      aimCrit: ["Hydraulic Crosshairs", "Sharpened Bullets"],
      sliverCorrosive: ["Convulsion", "Pathogen Rounds"],
      silverRadiation: ["Primed Heated Charge", "Convulsion"],
      silverViral: ["Deep Freeze", "Pathogen Rounds"],
      goldCorrosive: ["Jolt", "Pistol Pestilence"],
      gas: ["Pistol Pestilence", "Scorch", "Pathogen Rounds"],
      allStatus: ["Jolt", "Pistol Pestilence", "Scorch", "Frostbite"],
      allElem: ["Primed Heated Charge", "Deep Freeze", "Convulsion", "Pathogen Rounds"],
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
      allElem: ["Primed Fever Strike", "Shocking Touch", "Molten Impact", "North Wind"],
    },
    "Arch-Gun": {
      baseDmg: ["Primed Rubedo Lined Barrel", "Dual Rounds"],
      crit: ["Parallax Scope", "Hollowed Bullets"],
      aimCrit: ["Critical Focus"],
      sliverCorrosive: ["Electrified Barrel", "Venomous Clip"],
      silverRadiation: ["Electrified Barrel", "Combustion Rounds"],
      silverViral: ["Polar Magazine", "Venomous Clip"],
      goldCorrosive: ["Charged Bullets", "Contamination Casing"],
      gas: ["Venomous Clip", "Magma Chamber", "Contamination Casing"],
      allStatus: ["Contamination Casing", "Magma Chamber", "Charged Bullets", "Hypothermic Shell"],
      allElem: ["Electrified Barrel", "Venomous Clip", "Combustion Rounds", "Polar Magazine"],
    },
    Archwing: {
      skill: ["Primed Morphic Transformer", "Efficient Transferral", "System Reroute", "Energy Amplifier", "Auxiliary Power"],
      survive: ["Enhanced Durability", "Energy Inversion", "Argon Plating", "Hyperion Thrusters", "Superior Defenses"],
    },
    Warframe: {
      maxStrength: [
        "Transient Fortitude",
        "Blind Rage",
        "Umbral Intensify",
        "Augur Secrets",
        "Energy Conversion",
        "Power Drift",
        "Umbral Vitality@5",
        "Umbral Fiber@5",
      ],
      maxDuration: ["Primed Continuity", "Narrow Minded", "Augur Message", "Constitution"],
      maxEfficiency: ["Streamline", "Fleeting Expertise"],
      maxRange: ["Stretch", "Overextended", "Augur Reach", "Cunning Drift"],
      umbralSet: ["Umbral Vitality", "Umbral Intensify", "Umbral Fiber"],
    },
  };
  get fast() {
    let mod = this.type === "Weapon" ? this.build.type : this.type;
    if (mod === "Zaw") mod = "Melee";
    return this.fastSelect[mod] && map(this.fastSelect[mod], (v, i) => ({ name: i, id: v }));
  }
  get allowedTypes() {
    if (this.build.tags.includes("Warframe")) {
      return this.type === "Warframe"
        ? ["Warframe", `${this.build.baseId}`, "Exilus", `${this.build.baseId},Exilus`]
        : [this.type, `${this.build.baseId},${this.type}`];
    }
    return this.build.tags;
  }

  newRiven(code?: string) {
    let riven = new RivenMod();
    riven.qrCodeBase64 = code || this.editorRivenCode;
    if (!this.isVirtual && riven.name !== this.build.baseId)
      this.$confirm(this.$t("modselector.weaponWarnTip") as string, this.$t("modselector.weaponWarn") as string, { type: "warning" }).then(() => {
        this.$emit("command", riven.normalMod(this.build["weapon"]));
      });
    else this.$emit("command", riven.normalMod(this.build["weapon"]));
  }

  @Watch("build")
  @Watch("build.damageModel")
  @Watch("type")
  reload() {
    console.log("fast", this.build.type, (this.build as any).weapon);

    let selected = compact(this.build.allMods || this.build.mods);
    let mods = [];
    if (this.type === "Weapon") {
      const { isVirtual, isExalted } = this;
      const AcolyteMods = AcolyteModsList.slice(0, 5); // 近战追随者MOD
      // 是否虚拟技能武器
      mods = NormalModDatabase.filter(
        v =>
          (isVirtual && VirtualMeleeMods.includes(v.key)) || // 虚拟技能武器接受所有mod
          (this.build.tags.concat([this.build.id, this.build.baseId]).includes(v.type) &&
            this.build.isValidMod(v) &&
            (!(!isVirtual && isExalted) || !AcolyteMods.includes(v.id))) // 近战显赫武器不接受追随者MOD
      );
    } else {
      mods = NormalModDatabase.filter(v => this.allowedTypes.includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id));
    }
    switch (this.type) {
      case "Companion":
        {
          const cat_tank = "hsaz".split("").concat(["hl", "sl", "al", "bl"]);
          this.tabs = [
            {
              id: "tank",
              name: this.$t("modselector.tank") as string,
              mods: mods.filter(v => v.props.some(k => cat_tank.includes(k[0]))),
            },
            {
              id: "other",
              name: this.$t("modselector.other") as string,
              mods: mods.filter(v => v.props.every(k => !cat_tank.includes(k[0]))),
            },
          ];
          if (!"tank,other".split(",").includes(this.selectTab)) this.selectTab = "tank";
        }
        break;
      case "Aura":
        {
          const commonAura = ["G0", "G3", "G4", "G5", "GG", "GJ", "GN", "GO"];
          this.tabs = [
            {
              id: "common",
              name: this.$t("modselector.common") as string,
              mods: mods.filter(v => commonAura.includes(v.key)),
            },
            { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => !commonAura.includes(v.key)) },
          ];
          if (!"common,other".split(",").includes(this.selectTab)) this.selectTab = "common";
        }
        break;
      case "Weapon":
        {
          const cat_damage = "01DSKEGICO".split("").concat(["oad", "co", "od"]),
            cat_elements = "456789A".split(""),
            cat_speed = "RLFJ".split("").concat(["bsk"]),
            cat_benefit = [...cat_damage, ...cat_elements, ...cat_speed];
          this.tabs = [
            {
              id: "benefit",
              name: this.$t("modselector.sorted") as string,
              mods: mods
                .filter(v => v.props.some(k => cat_benefit.includes(k[0])))
                .map(v => [v, this.build.testMod(v)] as [NormalMod, number])
                .sort((a, b) => b[1] - a[1])
                .map(([v]) => v),
            },
            {
              id: "damage",
              name: this.$t("modselector.damage") as string,
              mods: mods.filter(v => v.props.some(k => cat_damage.includes(k[0]))),
            },
            { id: "elements", name: this.$t("modselector.element") as string, mods: mods.filter(v => v.props.some(k => "456789A".indexOf(k[0]) >= 0)) },
            {
              id: "speed",
              name: this.$t("modselector.speed") as string,
              mods: mods.filter(v => v.props.some(k => cat_speed.includes(k[0]))),
            },
            {
              id: "other",
              name: this.$t("modselector.other") as string,
              mods: mods.filter(v => v.props.every(k => !cat_benefit.includes(k[0]))),
            },
          ];
          if (!"benefit,damage,speed,other".split(",").includes(this.selectTab)) this.selectTab = "fast";
        }
        break;
      default:
      case "Warframe":
        {
          const cat_ability = "tuxge".split("").concat(["ec"]),
            cat_tank = "hsaz".split("").concat(["res", "hc"]),
            cat_speed = "fcliv".split("").concat(["fl"]),
            cat_all = [...cat_ability, ...cat_tank, ...cat_speed];
          this.tabs = [
            {
              id: "ability",
              name: this.$t("modselector.ability") as string,
              mods: mods.filter(v => v.props.some(k => cat_ability.includes(k[0]))),
            },
            {
              id: "tank",
              name: this.$t("modselector.tank") as string,
              mods: mods.filter(v => v.props.some(k => cat_tank.includes(k[0]))),
            },
            {
              id: "speed",
              name: this.$t("modselector.speed") as string,
              mods: mods.filter(v => v.props.some(k => cat_speed.includes(k[0]))),
            },
            {
              id: "other",
              name: this.$t("modselector.other") as string,
              mods: mods.filter(v => v.props.every(k => !cat_all.includes(k[0]))),
            },
          ];
          if (!"ability,tank,speed,other".split(",").includes(this.selectTab)) this.selectTab = this.type === "Warframe" ? "fast" : "ability";
        }
        break;
    }
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string | string[]) {
    if (typeof id === "string") this.$emit("command", Codex.getNormalMod(id));
    else {
      let selected = compact(this.build.allMods || this.build.mods);
      let mods =
        this.type === "Weapon"
          ? NormalModDatabase.filter(
              v =>
                this.build.tags.concat([this.build.id, this.build.baseId]).includes(v.type) &&
                !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id)
            )
          : NormalModDatabase.filter(v => this.allowedTypes.includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id));
      let found = id
        .map(v => {
          let name = v.split("@")[0],
            level = v.split("@")[1];
          let mod = mods.find(k => k.id === name);
          if (mod) return level ? mod.scaleLevel(+level) : mod;
        })
        .filter(Boolean);
      this.$emit("command", found);
    }
    this.reload();
  }
}
</script>
<style lang="less">
@import "../less/common.less";
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
  .mod-rarity();
}
.mod-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>
