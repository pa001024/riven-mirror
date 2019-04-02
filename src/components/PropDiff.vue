<template>
  <div @click="handleClick">
    <el-row :gutter="4" class="prop-diff">
      <el-col :span="8" class="title">
        <WfIcon v-if="icon" :type="icon"></WfIcon>
        {{name}}
      </el-col>
      <el-col :span="7" class="diff diff-ori" :class="activeClass">
        {{displayValue(ori)}}
      </el-col>
      <template v-if="Num(percent ? ori * 100 : ori, preci) !== Num(percent ? val * 100 : val, preci)">
        <el-col :span="2" class="diff-arrow" :class="activeClass"><i class="el-icon-arrow-right"></i></el-col>
        <el-col :span="7" class="diff diff-val" :class="activeClass">
          {{displayValue(val)}}
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WfIcon from "@/components/WfIcon.vue";

@Component({
  components: { WfIcon }
})
export default class extends Vue {
  @Prop() name: string;
  @Prop() icon: string;
  @Prop() subfix: string;
  @Prop({ type: Number }) ori: number;
  @Prop({ type: Number }) val: number;
  @Prop({ type: Boolean, default: false }) percent: boolean;
  @Prop({ type: Boolean, default: false }) negative: boolean;
  @Prop({ type: Number, default: 1 }) preci: number;

  /** 类切换 */
  get activeClass() {
    return { negative: this.negative != this.ori > this.val, positive: this.negative != this.ori < this.val };
  }

  /** 格式化输出 */
  displayValue(value) {
    return `${this.percent ? this.Num(value * 100, this.preci) + "%" : this.Num(value, this.preci)}${this.subfix || ""}`;
  }

  /** 返回固定精确度数值 */
  Num(num: number, preci = 1) {
    return +num.toFixed(preci);
  }
  handleClick(e) {
    this.$emit("click", e);
  }
}
</script>
<style lang="less">
@import "../less/common.less";

.prop-diff {
  margin: 0;
  padding: 4px 0;
  border: 4px solid transparent;
  transition: 0.4s;
  padding: 4px;
  border-radius: 4px;
  .title {
    padding-left: 4px;
  }
  > .diff:last-child {
    padding-right: 4px;
  }
  &:hover {
    background: @theme_mainback;
  }
  .diff-val.positive {
    color: #67c23a;
    text-shadow: 1px 1px 1px rgba(70, 255, 70, 0.1);
  }
  .diff-val.negative {
    color: #f56c6c;
    text-shadow: 1px 1px 1px rgba(255, 70, 70, 0.1);
  }
  .diff-arrow {
    text-align: center;
  }
  .diff-ori,
  .diff-val {
    text-align: right;
  }
  .diff.error {
    color: @text_error;
  }
}

.select-cpmode {
  cursor: pointer;
  &.active .prop-diff {
    background: @theme_leaf;
    color: @text_light;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    border: 3px solid @light;
    .title {
      color: @text_light;
    }
    .diff-val.positive {
      color: @text_light;
      text-shadow: 1px 1px 1px rgba(70, 255, 70, 0.4);
    }
    .diff-val.negative {
      color: @text_light;
      text-shadow: 1px 1px 1px rgba(255, 70, 70, 0.4);
    }
  }
}
</style>
