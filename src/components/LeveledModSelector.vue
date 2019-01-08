<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <!-- 快速选择 -->
    <el-tab-pane name="fast" v-if="type === 'Warframe'">
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
  </el-tabs>
</template>

<script lang="ts">

import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { WarframeBuild } from "@/warframe/warframebuild";
import { NormalMod, NormalModDatabase, Codex } from "@/warframe/codex";

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
    maxStrength: ["Transient Fortitude", "Blind Rage", "Umbral Intensify", "Augur Secrets", "Power Drift", "Umbral Vitality@5", "Umbral Fiber@5"],
    maxDuration: ["Primed Continuity", "Narrow Minded", "Augur Message", "Constitution"]​​​​,
    maxEfficiency: ["Streamline", "Fleeting Expertise"],
    maxRange: ["Stretch", "Overextended", "Augur Reach", "Cunning Drift"],
  };
  get fast() { return _.map(this.fastSelect, (v, i) => ({ name: i, id: v } as any)) }
  get allowedTypes() { return this.type === "Warframe" ? ["Warframe", `${this.build.baseId}`, "Exilus", `${this.build.baseId},Exilus`] : [this.type, `${this.build.baseId},${this.type}`] }
  @Watch("build")
  @Watch("type")
  reload() {
    let selected = _.compact(this.build.allMods);
    let mods = NormalModDatabase.filter(v =>
      this.allowedTypes.includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id));
    if (this.type === "Aura") {
      const commonAura = ["G0", "G3", "G4", "G5", "GG", "GJ", "GN", "GO"];
      this.tabs = [
        { id: "common", name: this.$t("modselector.common") as string, mods: mods.filter(v => commonAura.includes(v.key)) },
        { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => !commonAura.includes(v.key)) },
      ];
      this.selectTab = "common";
    } else {
      this.tabs = [
        { id: "ability", name: this.$t("modselector.ability") as string, mods: mods.filter(v => v.props.some(k => "tuxge".indexOf(k[0]) >= 0 || ["ec"].includes(k[0]))) },
        { id: "tank", name: this.$t("modselector.tank") as string, mods: mods.filter(v => v.props.some(k => "hsaz".indexOf(k[0]) >= 0 || ["hc"].includes(k[0]))) },
        { id: "speed", name: this.$t("modselector.speed") as string, mods: mods.filter(v => v.props.some(k => "fcliv".indexOf(k[0]) >= 0)) },
        { id: "other", name: this.$t("modselector.other") as string, mods: mods.filter(v => v.props.every(k => "tuxgehsazefcliv".indexOf(k[0]) < 0)) },
      ];
      this.selectTab = this.type === "Warframe" ? "fast" : "ability";
    }
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string | string[]) {
    if (typeof id === "string")
      this.$emit("command", Codex.getNormalMod(id));
    else {
      let selected = _.compact(this.build.allMods);
      let mods = NormalModDatabase.filter(v => this.allowedTypes.includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id || v.primed === k.id));
      let found = id.map(v => {
        let name = v.split("@")[0], level = v.split("@")[1];
        let mod = mods.find(k => k.id === name);
        return level ? mod.scaleLevel(+level) : mod;
      }).filter(Boolean);
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
