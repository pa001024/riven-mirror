<template>
  <div class="mod-redirect-container"></div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { RivenMod } from "@/warframe/rivenmod";

@Component({ components: {} })
export default class ModRedirect extends Vue {
  // prop
  @Prop() source: string;
  @Getter("mod") mod: RivenMod;
  @Action("newBase64TextV1") newBase64TextV1: (text: string) => void;

  // === 生命周期钩子 ===
  beforeMount() {
    if (this.source) {
      console.log("read source:", this.source);
      this.newBase64TextV1(this.source);
      this.$router.replace({ name: "ModWithSource", params: { source: this.mod.qrCodeBase64 } });
    }
  }
}
</script>
<style lang="less"></style>
