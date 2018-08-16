<template>
  <GunBuildEditor v-if="rWeapon.mod !== 'Melee'" ref="editor" :weapon="weapon" :rWeapon="rWeapon"></GunBuildEditor>
  <MeleeBuildEditor v-else ref="editor" :weapon="weapon" :rWeapon="rWeapon"></MeleeBuildEditor>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import GunBuildEditor from "@/components/GunBuildEditor.vue";
import MeleeBuildEditor from "@/components/MeleeBuildEditor.vue";
import { RivenDataBase, Weapon, RivenWeapon } from "@/warframe";

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
    this._weapon = RivenDataBase.getNormalWeaponsByName(this.id.replace(/_/g, " "));
    this._rWeapon = RivenDataBase.getRivenWeaponByName(this.weapon.rivenName || this.weapon.id);
  }
  // === 生命周期钩子 ===
}
</script>
