<template>
  <div class="rivenedit">
    <el-row :gutter="20">
      <el-col>
        <el-cascader expand-trigger="hover" size="medium" placeholder="请选择武器" :options="nameOptions" :show-all-levels="false" v-model="value.name" @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod, ModTypeTable, RivenWeaponDataBase } from "@/warframe";

@Component
export default class RivenEditor extends Vue {
  value = new RivenMod();
  nameOptions = [];
  // === 事件处理 ===
  // === 生命周期钩子 ===
  beforeMount() {
    _.forEach(ModTypeTable, (name, id) => {
      let rWeapons = RivenWeaponDataBase.filter(v => v.mod === id).map(v => ({ value: v.id, label: v.name }));
      this.nameOptions.push({ value: id, label: name, children: rWeapons });
    });
  }
}
</script>
