<template>
  <svg :class="[`wf-icon-`+name, { shadow }]">
    <use :xlink:href="`/fonts/wf.svg#wf-icon-`+name"></use>
  </svg>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

const AliasTrans = {
  "o": "koneksi",
  "r": "madurai",
  "-": "naramon",
  "f": "penjaga",
  "t": "unairu",
  "d": "vazarin",
  "=": "zenurik",
  "w": "umbra",
  "infestation": "infested",
  "corrupted": "orokin",
}

@Component
export default class WfIcon extends Vue {
  @Prop() type: string
  @Prop({ type: Boolean }) shadow: string
  get name() {
    if (this.type in AliasTrans) return AliasTrans[this.type];
    return this.type;
  }
}
</script>

<style lang="less">
[class^="wf-icon-"],
[class*=" wf-icon-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  transform: translateY(2px);
  &.shadow {
    filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.2));
  }
}
</style>
