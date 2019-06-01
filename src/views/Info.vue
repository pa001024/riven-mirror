<template>
  <div class="weapon-info">
    <div class="has-error" v-if="!weapon">找不到该武器</div>
    <template v-else>
      <header class="info-header">
        {{$t(`messages.${weapon.name}`)}}
      </header>
      <div class="info-radar">
        <InfoRadar style="height:300px;" :val="[['暴击',12],['触发',33],['基伤',66],['射速',12]]"/>
      </div>

    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { Zaw, Kitgun, Amp, RivenDatabase, Weapon, WeaponDatabase } from "@/warframe/codex";
import InfoRadar from "@/components/InfoRadar.vue";

function loadWeapon(id: string) {
  if (id.startsWith("ZAW-")) {
    return new Zaw(id);
  } else if (id.startsWith("KITGUN-")) {
    return new Kitgun(id);
  } else if (id.startsWith("AMP-")) {
    return new Amp(id);
  } else {
    return WeaponDatabase.getWeaponByName(id.replace(/_/g, " "));
  }
}
@Component({ components: { InfoRadar } })
export default class WeaponInfo extends Vue {
  @Prop() id: string;
  private _weapon: Weapon;
  private _lastid = "";

  get weapon() {
    if (this.id !== this._lastid) this.reload();
    return this._weapon;
  }

  @Watch("id")
  reload() {
    if (!this.id || this._lastid === this.id || this.$route.name !== "Info") return;
    this._lastid = this.id;
    this._weapon = loadWeapon(this.id);
  }
}
</script>
