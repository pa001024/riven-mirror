<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <!-- 快速选择 -->
    <el-tab-pane name="fast" v-if="type === 'Warframe'">
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
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { NormalMod, NormalModDatabase, Codex, ModBuild, RivenMod, RivenDataBase, VisualMeleeMods } from "@/warframe";
import { WarframeBuild } from "@/warframe/warframebuild";

interface ModSelectorTab {
  id: string
  name: string
  mods: NormalMod[]
}

@Component({ components: {} })
export default class extends Vue {
  @Prop() build: WarframeBuild;
  @Prop({ type: String, default: "Warframe" }) type: "Warframe" | "Aura" | "Exilus";

  tabs: ModSelectorTab[] = [];
  selectTab = "fast";
  editorRivenCode = "";

  /** MOD快速选择 */
  fastSelect = {
    maxStrength: ["transientFortitude", "blindRage", "umbralIntensify", "augurSecrets", "powerDrift", "umbralVitality", "umbralFiber"],
    maxDuration: [​​​​​"primedContinuity", "narrowMinded", "augurMessage", "constitution"]​​​​,
    maxEfficiency: [​​​​"streamline", "fleetingExpertise"]​​​​​,
    maxRange: ["stretch", "overextended", "augurReach", "cunningDrift"]​​​​​,
  };
  get fast() { return _.map(this.fastSelect, (v, i) => ({ name: i, id: v } as any)) }

  @Watch("build")
  @Watch("type")
  reload() {
    let selected = _.compact(this.build.mods);
    let mods = NormalModDatabase.filter(v =>
      v.type.split(",").some(vv => [this.type, this.build.baseId].includes(vv)) && !selected.some(k => k.id === v.id || k.primed === v.id));
    if (this.type === "Aura") {
      const commonAura = ["G0", "G3", "G4", "G5", "GG", "GJ", "GN", "GO"];
      this.tabs = [
        { id: "common", name: this.$t("modselector.common") as string, mods: mods.filter(v => commonAura.includes(v.key)) },
        { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => !commonAura.includes(v.key)) },
      ];
      this.selectTab = "common";
    } else {
      this.tabs = [
        { id: "ability", name: this.$t("modselector.ability") as string, mods: mods.filter(v => v.props.some(k => k[1] > 0 && "tuxg".indexOf(k[0]) >= 0)) },
        { id: "tank", name: this.$t("modselector.tank") as string, mods: mods.filter(v => v.props.some(k => "hsae".indexOf(k[0]) >= 0)) },
        { id: "speed", name: this.$t("modselector.speed") as string, mods: mods.filter(v => v.props.some(k => "fcliv".indexOf(k[0]) >= 0)) },
        { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => v.props.every(k => "tuxghsaefcliv".indexOf(k[0]) < 0)) },
      ];
      if (this.type === "Warframe")
        this.selectTab = "fast";
      else this.selectTab = "ability";
    }
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string | string[]) {
    if (typeof id === "string")
      this.$emit("command", Codex.getNormalMod(id));
    else {
      let selected = _.compact(this.build.mods);
      let mods = NormalModDatabase.filter(v => this.build.tags.includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id));
      let found = id.map(v => mods.find(k => k.id === v)).filter(Boolean);
      this.$emit("command", found);
    }
    this.reload();
  }
}
</script>

<style>
/* .mod-item-container
.mod-tablabel
.mod-item
.mod-item:hover  */
</style>
