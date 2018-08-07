<template>
  <el-input class="prop-picker" placeholder="请输入数值" size="small" v-model="value[1]">
    <el-popover slot="prepend" v-model="popoverVisable" placement="bottom" width="400" trigger="click">
      <el-button class="" v-for="prop in props" :key="prop.id" size="mini" @click="propClick(prop.id)">{{prop.name}}</el-button>
      <el-select slot="reference" placeholder="请选择">
      </el-select>
    </el-popover>
  </el-input>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenPropertyDataBase } from "@/warframe";

@Component
export default class RivenPropPicker extends Vue {
  @Prop() value: [string, number] = ["", 0]
  popoverVisable = false;
  @Prop() mod: string;
  get props() { return RivenPropertyDataBase[this.mod]; }
  // === 事件处理 ===
  propClick(id: string) {
    this.value[0] = id;
    this.$emit('input', this.value);
  }
  // === 生命周期钩子 ===
  beforeMount() {
  }
}
</script>

<style>
.prop-picker {
}
</style>
