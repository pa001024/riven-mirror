<template>
  <el-tabs class="buff-tabs" v-model="buffType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.name">
      <span slot="label" class="buff-tablabel">{{tab.name}}</span>
      <ul class="buff-select">
        <div class="buff-item-container" v-for="buff in tab.buffs" :key="buff.id">
          <li class="buff-item el-dropdown" @click="handleClick(buff.id)">
            {{$t(`buff.${buff.name}`)}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Codex, BuffType, Buff, BuffList } from "@/warframe";

declare interface BuffSelectorTab {
  id: BuffType
  name: string
  buffs: Buff[]
}

@Component
export default class buffSelector extends Vue {
  buffType = 0
  tabs: BuffSelectorTab[] = []
  beforeMount() {
    this.tabs = _.map(BuffType, (v, n) => ({ id: BuffType[n], name: n, buffs: BuffList.filter(k => k.type === v) }))
      .filter(v => v.buffs.length > 0);
  }
  handleClick(id: string) {
    let buff = Codex.getBuff(id);
    this.$emit("select", buff);
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

