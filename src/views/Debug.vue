<template>
  <div class="debug-container">
    <DamageSystem />
  </div>
</template>
<script lang="ts">
import { Vue, Component, toNative } from "vue-facing-decorator";
import { DamageSystem } from "@/components/DamageSystem";

@Component({ components: { DamageSystem } })
class Debug extends Vue  {
  text = "123";
}

export default toNative(Debug);
</script>
<style lang="less">
</style>
