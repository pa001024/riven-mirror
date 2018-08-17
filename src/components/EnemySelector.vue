<template>
  <el-tabs class="enemy-tabs" v-model="enemyType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="enemy-tablabel">{{tab.name}}</span>
      <ul class="enemy-select">
        <div class="enemy-item-container" v-for="enemy in tab.enemys" :key="enemy.id">
          <li class="enemy-item el-dropdown" @click="handleClick(enemy.id)">
            {{enemy.name}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { EnemyFaction, EnemyList, EnemyData, Damage2_0 } from "@/warframe";

declare interface EnemySelectorTab {
  id: EnemyFaction
  name: string
  enemys: EnemyData[]
}

@Component
export default class EnemySelector extends Vue {
  enemyType = EnemyFaction.Grineer
  tabs: EnemySelectorTab[] = []
  beforeMount() {
    this.tabs = _.map(EnemyFaction, (v, n) => ({ id: EnemyFaction[n], name: n, enemys: EnemyList.filter(k => k.faction === v) }))
      .filter(v => v.enemys.length > 0);
  }
  handleClick(id: string) {
    let enemy = Damage2_0.getEnemy(id);
    this.$emit("select", enemy);
  }
}
</script>


<style>
.enemy-item-container {
  display: inline-block;
}
.enemy-item {
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
.enemy-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>

