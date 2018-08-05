<template>
  <div class="simulator">
    开发中
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod } from "@/warframe";

@Component
export default class Simulator extends Vue {
  riven: RivenMod
  beforeMount() {

  }
}
</script>
