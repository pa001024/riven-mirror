<template>
  <div class="riven-price" v-if="enable">
    <el-collapse>
      <el-collapse-item :title="$t(`riven.viewprice`)" name="1">
        <RivenPriceView :weapon="mod.weapon" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import { RivenMod } from "@/warframe/rivenmod";
import { WeeklyRivenInfo } from "@/warframe/weeklyriven";
import { MainTag } from "@/warframe/codex";
import RivenPriceView from "@/components/RivenPriceView.vue";

@Component({ components: { RivenPriceView } })
class RivenPrice extends Vue  {
  @Prop() mod: RivenMod;
  get priceData(): WeeklyRivenInfo[] {
    return this.$store.getters.priceData;
  }

  get enable() {
    return this.priceData;
  }
}

export default toNative(RivenPrice);
</script>
