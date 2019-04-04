<template>
  <div class="debug-container">
    <DamageSystem />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { DamageSystem } from "@/components/DamageSystem";

@Component({ components: { DamageSystem } })
export default class Debug extends Vue {
  text = "123";
}
</script>
<style lang="less">
</style>
