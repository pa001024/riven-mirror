<template>
  <el-tabs class="buff-tabs" v-model="selectTab">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="buff-tablabel">{{tab.name}}</span>
      <div class="buff-select">
        <div class="buff-item-container" v-for="buff in tab.buffs" :key="buff.id">
          <div class="buff-item el-dropdown" @click="handleClick(buff.id)">
            {{$t(`buff.${buff.name}`)}}
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { BuffData, Codex, BuffList, BuffType } from "@/warframe/codex";
import { ModBuild } from "@/warframe/modbuild";

declare interface BuffSelectorTab {
  id: string;
  name: string;
  buffs: BuffData[];
}

@Component
export default class extends Vue {
  @Prop() build: ModBuild;

  selectTab = "";
  tabs: BuffSelectorTab[] = [];

  beforeMount() {
    this.reload();
  }
  handleClick(id: string) {
    let buff = Codex.getBuff(id);
    this.$emit("command", buff);
  }

  @Watch("build.weapon")
  reload() {
    if (this.build.weapon) {
      const isAmp = this.build.weapon.tags.includes("Amp");
      let buffList = BuffList.filter(v =>
        v.target === "Ranged"
          ? !this.build.weapon.tags.includes("Melee") //
          : v.target === "All" || (!isAmp && ["Weapon", "Weapon+"].includes(v.target)) || this.build.weapon.tags.includes(v.target)
      );
      this.tabs = [
        { id: "arcane", name: this.$t("buff.types.arcane") as string, buffs: buffList.filter(k => k.type === BuffType.Arcane) }, //
        { id: "baseDamage", name: this.$t("buff.types.baseDamage") as string, buffs: buffList.filter(k => k.type === BuffType.BaseDamage) }, //
        { id: "totalDamage", name: this.$t("buff.types.totalDamage") as string, buffs: buffList.filter(k => k.type === BuffType.TotalDamage) }, //
        { id: "elementDamage", name: this.$t("buff.types.elementDamage") as string, buffs: buffList.filter(k => k.type === BuffType.ElementDamage) }, //
        { id: "critDamage", name: this.$t("buff.types.critDamage") as string, buffs: buffList.filter(k => k.type === BuffType.CritDamage) }, //
        { id: "speed", name: this.$t("buff.types.speed") as string, buffs: buffList.filter(k => k.type === BuffType.Speed) }, //
        { id: "other", name: this.$t("buff.types.other") as string, buffs: buffList.filter(k => k.type === BuffType.Other) } //
      ].filter(v => v.buffs.length > 0);
      if (this.tabs.every(v => v.id !== this.selectTab)) this.selectTab = isAmp ? "arcane" : "baseDamage";
    } else {
      let buffList = BuffList.filter(v => ["Warframe", "All", "Weapon+", this.build.id, this.build.baseId].includes(v.target));
      this.tabs = [
        { id: "arcane", name: this.$t("buff.types.arcane") as string, buffs: buffList.filter(k => k.type === BuffType.Arcane) }, //
        { id: "team", name: this.$t("buff.types.team") as string, buffs: buffList.filter(k => k.type === BuffType.Team || k.type === BuffType.TotalDamage) }, //
        { id: "other", name: this.$t("buff.types.other") as string, buffs: buffList.filter(k => k.type === BuffType.Other) } //
      ].filter(v => v.buffs.length > 0);
      if (this.tabs.every(v => v.id !== this.selectTab)) this.selectTab = "arcane";
    }
  }
}
</script>


<style>
.buff-item-container {
  display: inline-block;
}
.buff-item {
  display: inline-block;
  margin: 4px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
  box-sizing: content-box;
  transition: 0.3s;
}
.buff-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>

