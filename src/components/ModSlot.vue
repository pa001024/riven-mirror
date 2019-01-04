<template>
  <div class="mod-slot" :class="[mod && mod.rarity, { active: !mod }]" @click="$emit('change')">
    <template v-if="mod">
      <div class="mod-title">
        <div class="mod-polarity" :class="costClass"><WfIcon :type="mod.polarity"/>{{cost}}</div>
        {{mod.name}}
      </div>
      <div class="mod-detail" @click.stop="$emit('remove')">
        <div class="mod-stat">
          <div class="mod-prop" v-for="prop in mod.vProps" :key="prop.id">{{prop.fullName}}</div>
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
import { NormalMod } from "@/warframe/codex";
import { ModBuild } from "@/warframe/modbuild";

@Component
export default class ModSlot extends Vue {
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
    return { 'np': this.mod.polarity === this.polarization, 'wp': this.polarization && this.mod.polarity !== this.polarization };
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
  position: relative;
  > .el-icon-plus {
    font-size: 40px;
    color: @theme_leaf;
    padding: 20px;
  }
  &:hover > .el-icon-plus,
  > .el-icon-close {
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
  .mod-title {
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    transition: 0.3s;
    cursor: move;
    font-size: 20px;
    border-radius: 4px 0 0 4px;
    flex: 1;
    position: relative;
    flex-wrap: wrap;
    &:hover {
      background: #e8f0ff;
    }
    .mod-name {
      width: 100%;
    }
    .mod-polarity {
      position: absolute;
      left: 10px;
      top: 2px;
      font-size: 1rem;
      &.np {
        color: #67c23a;
      }
      &.wp {
        color: #f73c3c;
      }
    }
  }

  .mod-stat {
    .mod-prop {
      font-size: 9pt;
      color: @half_grey;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }
    width: 100%;
  }
  .mod-sum {
    font-size: 11pt;
    color: @text_info;
  }
  .mod-detail {
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    flex: 1;
    width: 50%;
    &:hover {
      background: #ffd6d6;
      .mod-stat {
        display: none;
      }
      .mod-action {
        display: initial;
      }
    }
  }
  .mod-action {
    display: none;
  }
  .mod-slot-remove {
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 36px;
  }
}
</style>
