<template>
  <div class="status-info">

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { StatusInfo } from "@/warframe";

@Component
export default class extends Vue {
  @Prop() info: StatusInfo;


}
</script>
