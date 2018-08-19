<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="mod-tablabel">{{tab.name}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="mod in tab.mods" :key="mod.id">
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
import { NormalMod, NormalModDatabase, Codex, ModBuild } from "@/warframe";

declare interface ModSelectorTab {
  id: string
  name: string
  mods: NormalMod[]
}

@Component
export default class ModSelector extends Vue {
  @Prop() build: ModBuild;
  tabs: ModSelectorTab[] = []
  selectTab = "Benefit"
  @Watch("build")
  reload() {
    let selected = this.build.mods;
    let mods = NormalModDatabase.filter(v => this.build.weapon.tags.includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id));
    let benefits = mods.filter(v => v.props.some(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) >= 0))
      .map(v => [v, this.build.testMod(v)] as [NormalMod, number]).sort((a, b) => b[1] - a[1]).map(([v]) => v);
    this.tabs = [
      { id: "Benefit", name: "收益排序", mods: benefits },
      { id: "Damage", name: "伤害", mods: mods.filter(v => v.props.some(k => k[1] > 0 && "01DSKEGICO".indexOf(k[0]) >= 0)) },
      { id: "Elements", name: "附加伤害", mods: mods.filter(v => v.props.some(k => "456789A".indexOf(k[0]) >= 0)) },
      { id: "Speed", name: "速度", mods: mods.filter(v => v.props.some(k => "RLFJ".indexOf(k[0]) >= 0)) },
      { id: "Other", name: "其他", mods: mods.filter(v => v.props.every(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) < 0)) },
    ];
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string) {
    this.$emit("command", Codex.getNormalMod(id));
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
