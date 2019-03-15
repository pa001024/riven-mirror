<template>
  <div class="build-minimap">
    <header>
      <img class="weapon-img" :src="imgSrc" :alt="build.id">
      {{$t(`messages.${build.weapon.name}`)}}
    </header>
    <section class="mods">
      <header v-t="`minimap.mods`"></header>
      <div class="minimod" :class="[mod.rarity]" v-for="(mod, i) in mods" :key="i">
        <a :href="mod.wiki" target="_blank" rel="noopener noreferrer">
          {{mod.name}}
        </a>
      </div>
    </section>
    <section class="data">
      <header v-t="`minimap.data`"></header>
      <div class="minidata">
        <div class="title">{{$t(`build.${dmgName}`)}}</div>
        <div class="value">{{dmgVal}}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ModBuild } from "@/warframe/modbuild";
import { CachedWikiApi } from "@/service/wiki";
import { RivenMod } from "@/warframe/rivenmod";

@Component({ components: {} })
export default class BuildMinimap extends Vue {
  @Prop() build: ModBuild;

  get isMelee() {
    return this.build.weapon.tags.includes("Melee");
  }

  get dmgName() {
    let nameTable = this.isMelee
      ? [
          // Melee
          "attackDamage",
          "slideDamage",
          "attackDamagePS",
          "slideDamagePS"
        ]
      : [
          // Gun
          "totalDamage",
          "burstDamage",
          "sustainedDamage",
          "firstAmmoDamage"
        ];
    return nameTable[this.build.compareMode];
  }

  get dmgVal() {
    return this.build.compareDamage.toFixed(1);
  }

  get mods() {
    return this.build.mods.filter(Boolean).map(v => {
      if (v.key === "01") {
        let subfix = new RivenMod(v.riven).readableSubfix;

        return {
          id: v.id,
          name: subfix + " " + v.shortName,
          wiki: this.$t("otherinfo.wikiurl", ["Riven Mod"]),
          rarity: v.rarity
        };
      }
      return {
        id: v.id,
        name: v.shortName,
        wiki: this.$t("otherinfo.wikiurl", [v.id.replace(/ /g, "_")]),
        rarity: v.rarity
      };
    });
  }

  imgSrc = "";

  @Watch("build.pureId")
  async onIdChange(o: string, n: string) {
    this.imgSrc = await CachedWikiApi.instance.getMainImage(n);
    console.log("fetched", n, this.imgSrc);
  }

  mounted() {
    this.onIdChange(null, this.build.pureId);
  }
}
</script>
<style lang="less">
@import "../less/common.less";

.build-minimap {
  box-shadow: 5px 6px 16px -10px rgba(0, 0, 0, 0.44);
  padding: 16px;
  margin: 7px;
  border-radius: 8px;
  background: #fff;
  position: relative;
  .weapon-img {
    height: 44px;
    opacity: 0.7;
    vertical-align: middle;
    transition: all 0.7s;
    &:hover {
      opacity: 1;
    }
  }
  header {
    display: inline-block;
  }
  & > header {
    font-size: 1.2rem;
    line-height: 44px;
    vertical-align: middle;
  }
  section > header {
    font-size: 0.8rem;
    margin: 8px;
    color: @text_sliver;
  }
  .minimod {
    display: inline-block;
    border-left: 2px solid;
    padding: 1px 4px;
    background: white;
    border-radius: 2px;
    margin: 4px;
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
    &.n {
      border-left-color: @mod_n;
    }
    &.c {
      border-left-color: @mod_c;
    }
    &.r {
      border-left-color: @mod_r;
    }
    &.l {
      border-left-color: @mod_l;
    }
    &.g {
      border-left-color: @mod_g;
    }
    &.x {
      border-left-color: @mod_x;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  .minidata {
    display: inline-block;
    margin: 4px;
    background: @theme_back;
    border-radius: 4px;
    .title {
      display: inline-block;
      color: @text_grey;
      margin-right: 8px;
    }
    .value {
      display: inline-block;
      color: #202d40;
    }
  }
}
</style>
