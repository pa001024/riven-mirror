<template>
  <el-tabs class="warframe-tabs" v-model="classType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="warframe-tablabel">{{$t(`warframeselector.${tab.name}`)}}</span>
      <ul class="warframe-select">
        <div v-for="wfClass in tab.warframes" class="warframe-item-container" :key="wfClass.id">
          <el-dropdown v-if="wfClass.warframes.length > 1" trigger="click" @command="handleCommand" placement="bottom-start">
            <li class="warframe-item">
              {{wfClass.name}}
            </li>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="warframe in wfClass.warframes" :key="warframe.id" :command="warframe.id">{{warframe.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <li v-else class="warframe-item el-dropdown" @click="handleClick(wfClass.id)">
            {{wfClass.name}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { WarframeDataBase, Warframe } from "@/warframe";

declare interface WarframeSelectorTab {
  id: string
  name: string
  warframes: Warframe[]
}

const AllTabs = {
  All: "all",
  DPS: "dps", // 输出
  Tactics: "tactics", // 战术
  Tank: "tank", // 坦克
  Support: "support", // 辅助
  Control: "control", // 控制
};

@Component({ components: {} })
export default class extends Vue {
  // classType = "All";
  get classType() {
    let val = location.hash && location.hash.split("#")[1].trim();
    return val in AllTabs ? val : "All";
  }
  set classType(value) { location.hash = value; }
  tabs: WarframeSelectorTab[] = [];
  beforeMount() {
    this.tabs = _.map(AllTabs, (name, id) => ({ id, name, warframes: WarframeDataBase[id] }));
  }
  handleCommand(id: string) {
    console.log("WarframeEditor->", id);
    this.$router.push({ name: 'WarframeEditor', params: { id: id.replace(/ /g, "_") } });
  }
  handleClick(id: string) {
    let warframes = WarframeDataBase.getWarframeByClassName(id);
    if (warframes.length === 0) {
      this.$message.error(this.$t("warframeselector.notfound") as string);
    } else if (warframes.length === 1) {
      this.handleCommand(id);
    }
  }
}
</script>

<style>
.warframe-item-container {
  margin: 4px;
  display: inline-block;
}
.warframe-tablabel {
  font-size: 16px;
  padding: 0 8px;
}
.warframe-item {
  display: inline-block;
  margin: 4px;
  padding: 8px 20px;
  border: 1px solid #ccc;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
  box-sizing: content-box;
  transition: 0.3s;
}
.warframe-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>

