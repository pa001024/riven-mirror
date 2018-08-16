<template>
  <el-tabs class="weapon-tabs" v-model="modType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="weapon-tablabel">{{tab.name}}</span>
      <ul class="weapon-select">
        <div class="weapon-item-container" v-for="riven in tab.rivens" :key="riven.id">
          <el-dropdown v-if="riven.weapons.length > 1" trigger="click" @command="handleCommand">
            <li class="weapon-item">
              {{riven.name}}
            </li>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="weapon in riven.weapons" :key="weapon.id" :command="weapon.id">{{weapon.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <li v-else class="weapon-item el-dropdown" @click="handleClick(riven.id)">
            {{riven.name}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenDataBase, RivenWeapon, ModTypeTable, RivenWeaponDataBase } from "@/warframe";

declare interface WeaponSelectorTab {
  id: string
  name: string
  rivens: RivenWeapon[]
  weapons: string[][]
}

@Component
export default class WeaponSelector extends Vue {
  modType = "Rifle"
  tabs: WeaponSelectorTab[] = []
  beforeMount() {
    this.tabs = _.map(ModTypeTable, (name, id) => ({ id, name, rivens: RivenWeaponDataBase.filter(v => v.mod === id && v.weapons.length > 0), weapons: [] }));
  }
  handleCommand(id: string) {
    console.log("BuildEditor->", id);
    this.$router.push({ name: 'BuildEditor', params: { id: id.replace(/ /g, "_") } });
  }
  handleClick(id: string) {
    let weapon = RivenDataBase.getRivenWeaponByName(id);
    let weapons = weapon.weapons;
    if (weapons.length === 0) {
      this.$message.error("暂无该武器资料");
    } else if (weapons.length === 1) {
      this.handleCommand(id);
    }
  }
}
</script>

<style>
.weapon-item-container {
  display: inline-block;
}
.weapon-tablabel {
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

