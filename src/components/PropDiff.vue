<template>
  <tr class="prop-diff" @click="handleClick">
    <th>{{name}}</th>
    <td class="diff diff-ori" :class="{negative: negative != ori > val, positive: negative != ori < val}">{{percent ? Num(ori * 100, preci) + "%" : Num(ori, preci)}}{{subfix}}</td>
    <template v-if="Num(ori, preci) !== Num(val, preci)">
      <td class="diff diff-arrow" :class="{negative: negative != ori > val, positive: negative != ori < val}"><i class="el-icon-arrow-right"></i></td>
      <td class="diff diff-val" :class="{negative: negative != ori > val, positive: negative != ori < val}">
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
  @Prop({ type: Boolean, default: false }) percent: boolean;
  @Prop({ type: Boolean, default: false }) negative: boolean;
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
.prop-diff > th,
.prop-diff > td {
  margin: 0;
  padding: 4px 0;
  border: 4px solid transparent;
}
.prop-diff > th {
  padding-left: 4px;
}
.prop-diff > td:last-child {
  padding-right: 4px;
}
.prop-diff {
  transition: 0.4s;
  padding: 4px;
  border-radius: 4px;
}
.prop-diff:hover {
  background: #fafafa;
}
.prop-diff > .diff-val.positive {
  color: #67c23a;
  text-shadow: 1px 1px 1px rgba(70, 255, 70, 0.1);
}
.prop-diff.active > .diff-val.positive {
  color: #fff;
  text-shadow: 1px 1px 1px rgba(70, 255, 70, 0.4);
}
.prop-diff > .diff-val.negative {
  color: #f56c6c;
  text-shadow: 1px 1px 1px rgba(255, 70, 70, 0.1);
}
.prop-diff.active > .diff-val.negative {
  color: #fff;
  text-shadow: 1px 1px 1px rgba(255, 70, 70, 0.4);
}
.diff-arrow {
  text-align: center;
}
.diff-ori,
.diff-val {
  text-align: right;
}
</style>
