<template>
  <div class="mod-redirect-container"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import { RivenMod } from "@/warframe/rivenmod";

@Component({ components: {} })
class ModRedirect extends Vue  {
  // prop
  @Prop() source: string;
  get mod(): RivenMod {
    return this.$store.getters.mod;
  }
  newBase64TextV1(text: string): any {
    return this.$store.dispatch("newBase64TextV1", text);
  }

  // === 生命周期钩子 ===
  beforeMount() {
    if (this.source) {
      console.log("read source:", this.source);
      this.newBase64TextV1(this.source);
      this.$router.replace({ name: "ModWithSource", params: { source: this.mod.qrCodeBase64 } });
    }
  }
}

export default toNative(ModRedirect);
</script>
<style lang="less"></style>
