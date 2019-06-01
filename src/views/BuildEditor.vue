<template>
  <component :is="weapon.isGun ? 'GunBuildEditor' : 'MeleeBuildEditor'" :weapon="weapon"/>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import GunBuildEditor from "@/views/build/GunBuildEditor.vue";
import MeleeBuildEditor from "@/views/build/MeleeBuildEditor.vue";
import { Weapon, RivenDatabase, Zaw, Kitgun, Amp, WeaponDatabase } from "@/warframe/codex";
import { i18n } from "@/i18n";

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
@Component({
  components: { GunBuildEditor, MeleeBuildEditor },
  beforeRouteEnter(to, from, next) {
    const weapon = loadWeapon(to.params.id);
    if (weapon) {
      document.title = i18n.t("title.sub", [i18n.t("title.weapon", [weapon.displayName])]);
      next();
    } else next("/WeaponNotFound");
  }
})
export default class BuildEditor extends Vue {
  get id() {
    return this.$route.params.id;
  }

  private _weapon: Weapon;
  private _lastid = "";

  get weapon() {
    if (this.id !== this._lastid) this.reload();
    return this._weapon;
  }

  @Watch("id")
  reload() {
    if (!this.id || this._lastid === this.id || (this.$route.name !== "BuildEditorWithCode" && this.$route.name !== "BuildEditor")) return;
    this._lastid = this.id;
    this._weapon = loadWeapon(this.id);
  }
  // === 生命周期钩子 ===
}
</script>
