<template>
  <div class="editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 武器信息区域 -->
        <div v-if="weapon" class="weapon-display">
          <el-card class="weapon-box">
            <div slot="header" class="weapon-name">
              <span>{{weapon.name}}</span>
            </div>
            <table class="weapon-props">
              <tbody>
                <tr><td>暴击率</td><td>{{weapon.criticalChances}}%</td></tr>
                <tr><td>暴击伤害</td><td>{{weapon.criticalMultiplier}}x</td></tr>
                <tr><td>攻速</td><td>{{weapon.fireRate}}</td></tr>
                <tr><td>触发几率</td><td>{{weapon.status}}%</td></tr>
              </tbody>
            </table>
          </el-card>
        </div>
        <div v-else class="error">
          <el-alert title="错误" type="error" :closable="false">
          </el-alert>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="18">
        <el-row>
          <el-col :span="24">
            <!-- <gun-mod-build-view :riven="mod" v-if="isGun">
            </gun-mod-build-view>
            <melee-mod-build-view :riven="mod" v-else>
            </melee-mod-build-view> -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenWeapon, ModBuild, RivenDataBase } from "@/warframe";

@Component
export default class BuildEditor extends Vue {
  @Prop() id: string
  build: ModBuild = null
  get weapon() { return RivenDataBase.getNormalWeaponsByName(this.id.replace(/_/g, " ")); }
  beforeMount() {
    console.log(this.id.replace(/_/g, " "), this.weapon);
  }
}
</script>

<style>
.weapon-props {
  width: 100%;
}
</style>
