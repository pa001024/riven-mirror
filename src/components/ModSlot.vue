<template>
  <div class="mod-slot" :class="[mod && mod.rarity, { active: !mod }]" @click="$emit('change')">
    <template v-if="mod">
      <div class="mod-title">
        <div class="mod-polarity" :class="costClass"><i :class="`wf-icon-${mod.polarity}`"></i>{{cost}}</div>
        {{mod.name}}
      </div>
      <div class="mod-detail" @click.stop="$emit('remove')">
        <div class="mod-stat">
          <div class="mod-prop" v-for="prop in mod.props" :key="prop[0]">{{convertToPropName(prop)}}</div>
          <div class="mod-sum" v-if="modValue">{{modValue}}% {{$t("build.total")}}</div>
        </div>
        <div class="mod-action">
          <button type="button" class="mod-slot-remove">
            <i class="el-icon-close"></i>
          </button>
        </div>
      </div>
    </template>
    <i v-else class="el-icon-plus"></i>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { NormalMod, ModBuild, RivenDataBase, ValuedRivenProperty, ValuedProperty } from "@/warframe";

@Component
export default class extends Vue {
  @Prop() mod: NormalMod
  @Prop() build: ModBuild
  @Prop() polarization: string

  get modValue() {
    if (!this.build.modValue) return 0;
    let mval = this.build.modValue(this.mod.id) * 100;
    let n = +mval.toFixed(1);
    return n < 0 ? n.toString() : "+" + n;
  }

  get cost() {
    if (this.mod) return this.mod.calcCost(this.polarization);
    return 0;
  }

  get costClass() {
    return { 'np': this.mod.polarity === this.polarization };
  }

  convertToPropName(prop: [string, number]) {
    let vp = ValuedProperty.parse(prop);
    return vp && vp.fullString() || prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }
}

</script>

<style lang="less">
@import "../less/common.less";

.mod-slot {
  border-left: 4px solid transparent;
  text-align: center;
  margin: 0 0 10px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-icon-plus {
    font-size: 40px;
    color: @theme_leaf;
    padding: 20px;
  }
  &:hover .el-icon-plus,
  .el-icon-close {
    color: @theme_main;
  }
  &.active {
    cursor: pointer;
  }
  &.n {
    border-left-color: @mod_n;
  }
  &.c {
    border-left-color: @mod_c;
  }
  &.r {
    border-left-color: @mod_r;
  }
  &.l {
    border-left-color: @mod_l;
  }
  &.x {
    border-left-color: @mod_x;
  }
}
</style>
