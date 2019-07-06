<template>
  <div class="riven-price" v-if="enable">
    <el-collapse>
      <el-collapse-item :title="$t(`riven.viewprice`)" name="1">
        <RivenPriceView :weapon="mod.weapon"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { RivenMod } from "@/warframe/rivenmod";
import { WeeklyRivenInfo } from "@/warframe/weeklyriven";
import { Getter, Action } from "vuex-class";
import { MainTag } from "@/warframe/codex";
import RivenPriceView from "@/components/RivenPriceView.vue";

@Component({ components: { RivenPriceView } })
export default class RivenPrice extends Vue {
  @Prop() mod: RivenMod;
  @Getter("priceData") priceData: WeeklyRivenInfo[];

  get enable() {
    return this.priceData;
  }
}
</script>
