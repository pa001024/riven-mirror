<template>
  <el-tabs class="weapon-tabs" v-model="modType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="weapon-tablable">{{tab.name}}</span>
      <ul class="weapon-select">
        <li v-for="riven in tab.rivens" :key="riven.id" class="weapon-item" @click="handleClick(riven.id)">
          {{riven.name}}
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { GunWeapon, DamageType, DamageTypeDatabase, RivenDataBase, RivenWeapon, ModTypeTable, RivenWeaponDataBase } from "@/warframe/data";

declare interface WeaponSelectorTab {
  id: string
  name: string
  rivens: RivenWeapon[]
}

@Component
export default class WeaponSelector extends Vue {
  modType = "Rifle"
  tabs: WeaponSelectorTab[] = []
  beforeMount() {
    this.tabs = _.map(ModTypeTable, (name, id) => ({ id, name, rivens: RivenWeaponDataBase.filter(v => v.mod === id) }));
  }
  handleClick(id) {
    console.log(id);
  }
}
</script>

<style>
.weapon-tablable {
  font-size: 16px;
  padding: 0 8px;
}
.weapon-item {
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
.weapon-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>

