<template>
  <component :is="rWeapon.mod !== 'Melee' ? 'GunBuildEditor' : 'MeleeBuildEditor'" :weapon="weapon" :rWeapon="rWeapon"></component>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import GunBuildEditor from "@/views/build/GunBuildEditor.vue";
import MeleeBuildEditor from "@/views/build/MeleeBuildEditor.vue";
import { RivenDataBase, Weapon, RivenWeapon, Zaw } from "@/warframe";

@Component({
  components: { GunBuildEditor, MeleeBuildEditor }
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
    if (!this.id || this._lastid === this.id) return;
    this._lastid = this.id;
    // ZAW
    if (this.id.startsWith("ZAW-")) {
      let zaw = new Zaw(this.id);
      this._weapon = zaw;
      this._rWeapon = RivenDataBase.getRivenWeaponByName(zaw.strike.id);
    } else {
      // 普通武器
      this._weapon = RivenDataBase.getNormalWeaponsByName(this.id.replace(/_/g, " "));
      this._rWeapon = RivenDataBase.getRivenWeaponByName(this.weapon.rivenName || this.weapon.id);
    }
  }
  // === 生命周期钩子 ===
}
</script>
