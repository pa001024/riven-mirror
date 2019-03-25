<template>
  <svg class="icon" :class="[`wf-icon-`+name, { shadow }]" :viewBox="size" v-html="path">
  </svg>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { SVGData } from "../assets/svgicons";

const AliasTrans = {
  o: "koneksi",
  r: "madurai",
  "-": "naramon",
  f: "penjaga",
  t: "unairu",
  d: "vazarin",
  "=": "zenurik",
  w: "umbra",
  infestation: "infested",
  corrupted: "orokin",
  fissure: "void"
};

@Component
export default class WfIcon extends Vue {
  @Prop() type: string;
  @Prop({ type: Boolean }) shadow: boolean;
  get name() {
    if (this.type in AliasTrans) return AliasTrans[this.type];
    return this.type;
  }
  get raw() {
    return SVGData[this.name] || SVGData["true"];
  }
  get path() {
    return `<path d="${this.raw && this.raw.path}"></path>`;
  }
  get size() {
    let vs = (this.raw && this.raw.size) || 32;
    return `0 0 ${vs} ${vs}`;
  }
}
</script>

<style lang="less">
[class^="wf-icon-"],
[class*=" wf-icon-"] {
  display: inline-block;
  vertical-align: -0.15em;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
  // transform: translateY(2px);
  &.shadow {
    filter: drop-shadow(2px 3px 2px rgba(0, 0, 0, 0.2));
  }
}
</style>
