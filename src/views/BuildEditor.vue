<template>
  <component :is="rWeapon.mod !== 'Melee' ? 'GunBuildEditor' : 'MeleeBuildEditor'" :weapon="weapon" :rWeapon="rWeapon"/>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import GunBuildEditor from "@/views/build/GunBuildEditor.vue";
import MeleeBuildEditor from "@/views/build/MeleeBuildEditor.vue";
import { Weapon, RivenWeapon, RivenDataBase, Zaw, Kitgun } from "@/warframe/codex";
import { i18n } from "@/i18n";


function loadWeapon(id: string) {
  if (id.startsWith("ZAW-")) {
    let zaw = new Zaw(id);
    return zaw;
  } else if (id.startsWith("KITGUN-")) {
    let kitgun = new Kitgun(id);
    return kitgun;
  } else {
    return RivenDataBase.getNormalWeaponsByName(id.replace(/_/g, " "));
  }
}
@Component({
  components: { GunBuildEditor, MeleeBuildEditor },
  beforeRouteEnter(to, from, next) {
    const weapon = loadWeapon(to.params.id)
    if (weapon) {
      document.title = i18n.t("title.sub", [i18n.t("title.weapon", [weapon.displayName])]);
      next();
    }
    else next("/WeaponNotFound")
  }
})
export default class BuildEditor extends Vue {
  get id() { return this.$route.params.id; }

  private _weapon: Weapon;
  private _rWeapon: RivenWeapon;
  private _lastid = "";

  get weapon() { if (this.id !== this._lastid) this.reload(); return this._weapon; }
  get rWeapon() { if (this.id !== this._lastid) this.reload(); return this._rWeapon; }

  @Watch("id")
  reload() {
    if (!this.id || this._lastid === this.id || (this.$route.name !== "BuildEditorWithCode" && this.$route.name !== "BuildEditor")) return;
    this._lastid = this.id;
    // ZAW
    if (this.id.startsWith("ZAW-")) {
      let zaw = new Zaw(this.id);
      this._weapon = zaw;
      this._rWeapon = RivenDataBase.getRivenWeaponByName(zaw.strike.id);
    } else if (this.id.startsWith("KITGUN-")) {
      let kitgun = new Kitgun(this.id);
      this._weapon = kitgun;
      this._rWeapon = RivenDataBase.getRivenWeaponByName(_.startCase(kitgun.chamber.name));
    } else {
      // 普通武器
      this._weapon = RivenDataBase.getNormalWeaponsByName(this.id.replace(/_/g, " "));
      this._rWeapon = RivenDataBase.getRivenWeaponByName(this.weapon.rivenName || this.weapon.id);
    }
  }
  // === 生命周期钩子 ===
}
</script>
