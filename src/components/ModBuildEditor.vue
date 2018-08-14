<template>
  <div class="build-editor">

  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenWeapon, ModBuild, RivenDataBase, Weapon, NormalMod } from "@/warframe";

@Component
export default class ModBuildEditor extends Vue {
  @Prop() mods: NormalMod[]
}
</script>
