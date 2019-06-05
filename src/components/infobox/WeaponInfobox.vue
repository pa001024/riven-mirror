<template>
  <div class="weapon-infobox">
    <div class="pic"><img :src="weaponimg" alt="Loading..."></div>
    <div class="name">{{$t(weapon.id)}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { Weapon } from "@/warframe/codex";
// import InfoRadar from "@/components/InfoRadar.vue";

@Component({
  components: {}
})
export default class WeaponInfobox extends Vue {
  @Prop() weapon: Weapon;
  weaponimg = "/img/LOGO@4x.png";

  @Watch("weapon")
  loadImgFromOnline() {
    // this.weaponimg=
  }
}
</script>

<style lang="less" >
@import "../../less/common.less";
.weapon-infobox {
  .pic {
    width: 300px;
    height: 200px;
    border: 2px solid @theme_main;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    img {
      max-width: 300px;
      max-height: 200px;
    }
    img:after {
      content: attr(alt);
      line-height: 200px;
      text-align: center;
      font-family: SAOUI;
      font-size: 16px;
      color: rgb(100, 100, 100);
      display: block;
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>

