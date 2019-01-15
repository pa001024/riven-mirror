<template>
  <div class="mod-slot" :class="[mod && mod.rarity, { active: !mod , leveled }]" @click="mod || $emit('change')">
    <div v-if="icon" class="mod-header-icon">
      <WfIcon :type="icon"/>
    </div>
    <template v-if="mod">
      <div class="mod-title">
        <div class="mod-polarity" :class="costClass"><WfIcon :type="mod.polarity"/>{{cost}}</div>
        <div class="mod-name" @click="$emit('change')">{{mod.name}}</div>
        <div class="mod-level"><el-input-number size="mini" @change="$emit('level')" v-model="mod.level" :min="0" :max="mod.maxLevel"></el-input-number></div>
      </div>
      <div class="mod-detail" @click.stop="$emit('remove')">
        <div class="mod-stat">
          <div class="mod-prop" v-for="prop in mod.vProps" :key="prop.id">{{prop.fullName}}</div>
          <div class="mod-sum" v-if="modValue">{{modValue}}% {{$t("build.effectiveHealth")}}</div>
        </div>
        <div class="mod-action">
          <button type="button" class="mod-slot-remove">
            <i class="el-icon-close"></i>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <WfIcon v-if="polarization" class="icon-plus-btn" :type="polarization"/>
      <i v-else class="icon-plus-btn el-icon-plus"></i>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { WarframeBuild } from "@/warframe/warframebuild";
import "./ModSlot.vue";
import { NormalMod } from "@/warframe/codex";

@Component
export default class LeveledModSlot extends Vue {
  @Prop() mod: NormalMod
  @Prop() build: WarframeBuild
  @Prop() polarization: string
  @Prop({ type: Boolean }) leveled: boolean
  @Prop() icon: string

  get modValue() {
    if (!this.build.modValue) return 0;
    let mval = this.build.modValue(this.mod.id) * 100;
    if (mval <= 0) return 0;
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

.mod-header-icon {
  font-size: 1.3em;
  position: absolute;
  top: 0;
  color: @theme_main;
}

.mod-level {
  display: inline-block;
  .el-input-number {
    .el-input-number__decrease,
    .el-input-number__increase,
    .el-input > input {
      background: none;
      border: 0;
    }
  }
}

.mod-title {
  .mod-level {
    font-size: 14px;
    .el-input-number--mini {
      width: auto;
    }
  }
}

.mod-slot.leveled .mod-name {
  font-size: 16px;
}
</style>
