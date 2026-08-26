<template>
  <component :is="weapon.isGun ? 'GunBuildEditor' : 'MeleeBuildEditor'" :weapon="weapon" :modeIndex="modeIndex" />
</template>

<script lang="ts">
import { Vue, Component, Watch, toNative } from "vue-facing-decorator";
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
  // vue-facing-decorator 的路由守卫要放进 options 才会合并进组件选项
  options: {
    beforeRouteEnter(to, from, next) {
      const weapon = loadWeapon(String(to.params.id));
      if (weapon) {
        document.title = i18n.t("title.sub", [i18n.t("title.weapon", [weapon.displayName])]);
        next();
      } else next("/WeaponNotFound");
    },
  },
})
class BuildEditor extends Vue {
  get id() {
    const id = this.$route.params.id;
    return (Array.isArray(id) ? id[0] : id) || "";
  }
  get modeIndex() {
    const mode = this.$route.params.mode || "0";
    return +mode;
  }

  private _weapon: Weapon;
  private _lastid = "";

  get weapon() {
    if (this.id !== this._lastid) this.reload();
    return this._weapon;
  }

  @Watch("id")
  reload() {
    if (!this.id || this._lastid === this.id) return;
    this._lastid = this.id;
    this._weapon = loadWeapon(this.id);
  }
  // === 生命周期钩子 ===
}

export default toNative(BuildEditor);
</script>
