<template>
  <div class="arcane-selector">

  </div>
</template>
<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Arcane } from "@/warframe";

declare interface ArcaneSelectorTab {
  id: string
  name: string
  arcane: Arcane[]
}

@Component
export default class extends Vue {}
</script>

<style lang="less">

</style>
