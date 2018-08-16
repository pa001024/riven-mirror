<template>
  <tr class="prop-diff" @click="handleClick"><td>{{name}}</td>
    <td class="diff diff-ori" :class="{negative: ori > val, positive: ori < val}">{{percent ? Num(ori * 100, preci) + "%" : Num(ori, preci)}}{{subfix}}</td>
    <template v-if="ori!=val">
      <td class="diff diff-arrow" :class="{negative: ori > val, positive: ori < val}"><i class="el-icon-arrow-right"></i></td>
      <td class="diff diff-val" :class="{negative: ori > val, positive: ori < val}">
        {{percent ? Num(val * 100, preci)+"%":Num(val, preci)}}{{subfix}}
      </td>
    </template>
  </tr>

</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() name: string;
  @Prop() subfix: string;
  @Prop({ type: Number }) ori: number;
  @Prop({ type: Number }) val: number;
  @Prop({ type: Boolean }) percent: boolean;
  @Prop({ type: Number, default: 1 }) preci: Number;

  /** 返回固定精确度数值 */
  Num(num: number, preci = 1) {
    return +num.toFixed(preci);
  }
  handleClick(e) {
    this.$emit("click", e);
  }
}
</script>
<style>
.prop-diff > * {
  margin: 0;
  padding: 4px 4px;
  border: 4px solid transparent;
}
.prop-diff {
  transition: 0.4s;
  padding: 4px;
}
.prop-diff:hover {
  box-shadow: 0px 0px 0px 4px #b3ceff inset;
}
.diff-val.positive {
  color: #67c23a;
}
.diff-val.negative {
  color: #f56c6c;
}
.diff-arrow {
  color: #333;
  text-align: center;
}
.diff-ori,
.diff-val {
  text-align: right;
}
</style>
