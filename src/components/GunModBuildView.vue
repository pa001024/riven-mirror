<template>
  <div class="build-container">
    <header class="build-header">MOD自动配置</header>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="限制MOD槽位">
        <el-input-number size="small" v-model="slots" :min="4" :max="8" label="使用MOD槽位"></el-input-number>
      </el-form-item>
      <el-form-item label="武器">
        <el-select size="medium" v-model="selectWeapon" placeholder="请选择">
          <el-option v-for="weapon in riven.weapons" :key="weapon.name" :label="weapon.name" :value="weapon.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group size="medium" v-model="selectCompMethod">
          <el-radio-button label="单发伤害"></el-radio-button>
          <el-radio-button label="爆发伤害"></el-radio-button>
          <el-radio-button label="持续伤害"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="使用MOD">
        <el-checkbox v-model="useHeavyCaliber">重口径</el-checkbox>
      </el-form-item> -->
    </el-form>
    <div class="build-list">
      <el-row type="flex" :gutter="12" class="build-item" v-for="build in builds" :key="build[0]">
        <el-col :span="24" class="build-title">
          {{build[0]}} - {{build[1].compareDamage.toFixed(1)}}
        </el-col>
        <el-col :sm="12" :lg="3" v-for="mod in build[1].mods" :key="mod.name">
          <el-card shadow="hover" class="build-card-box">
            <div slot="header" class="build-card-name">{{mod.name}}</div>
            <div class="build-card-prop" v-for="prop in mod.props" :key="prop[0]">
              {{convertToPropName(prop)}}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="build-result">
        这张紫卡一共提升了
        <span class="score-text">{{score}}%</span>
        的{{selectCompMethod}}
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod, GunModBuild } from "@/warframe";
import { ValuedRivenProperty } from "@/warframe/rivenmod";
import { CompareMode } from "@/warframe/modbuild";

@Component
export default class GunModBuildView extends Vue {
  @Prop() riven: RivenMod
  selectWeapon = ""
  selectCompMethod = "单发伤害"
  builds: [string, GunModBuild][] = []
  /** 插槽使用数 */
  slots = 8
  /** 紫卡分数 */
  score = 0
  @Watch("selectCompMethod")
  compMethodChange(val: string) {
    console.log(this.selectCompMethod);
    this.recalc();
  }
  @Watch("riven")
  rivenChange() {
    this.selectWeapon = this.riven.weapons[0].name;
    this.recalc();
  }
  mounted() { }
  beforeMount() {
    this.selectWeapon = this.riven.weapons[0].name;
    this.recalc();
  }
  recalc() {
    this.builds = [];
    let compMode: CompareMode;
    switch (this.selectCompMethod) {
      case "单发伤害": compMode = CompareMode.TotalDamage; break;
      case "爆发伤害": compMode = CompareMode.BurstDamage; break;
      case "持续伤害": compMode = CompareMode.SustainedDamage; break;
    }
    let stand = new GunModBuild(this.riven, this.selectWeapon);
    let riven = new GunModBuild(this.riven, this.selectWeapon);
    stand.compareMode = riven.compareMode = compMode;
    stand.fill(this.slots, 0);
    riven.fill(this.slots, 1);
    this.builds.push(["标准配置", stand]);
    this.builds.push(["紫卡配置", riven]);
    this.score = Math.round(riven.compareDamage / stand.compareDamage * 100 - 100);
  }
  convertToPropName(prop: [string, number]) {
    let rp = this.riven.db.getPropByName(prop[0]);
    if (rp) {
      let vp = new ValuedRivenProperty(rp, prop[1] * 100);
      return vp.name + " " + vp.displayValue;
    }
    return prop[0] + " " + prop[1];
  }
}
</script>

<style scoped>
.score-text {
  color: #f56c6c;
}
.build-result {
  font-size: 24pt;
  margin-top: 30px;
}
.build-title {
  font-size: 16pt;
  margin: 8px 0;
}
.build-card-box {
  max-height: 56px;
  margin-bottom: 8px;
}
.build-card-box:hover {
  max-height: 200px;
}

.build-item {
  flex-wrap: wrap;
  margin: 8px 0;
}
.build-container {
  padding: 8px;
}
.build-header {
  font-size: 16pt;
  padding: 8px 0;
}
.build-card-name {
  font-size: 11pt;
}
.build-card-prop {
  font-size: 9pt;
}
</style>
