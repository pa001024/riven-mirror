<template>
  <div class="build-minimap">
    <header>
      <!-- <img class="weapon-img" :src="imgSrc"> -->
      {{$t(build.weapon.id)}}
    </header>
    <section class="mods">
      <header v-t="`minimap.mods`"></header>
      <div class="minimod" v-if="mods.length === 0">
        -
      </div>
      <div v-else class="minimod" :class="[mod.rarity]" v-for="(mod, i) in mods" :key="i">
        <a :href="mod.wiki" target="_blank" rel="noopener noreferrer">
          {{mod.name}}
        </a>
      </div>
    </section>
    <section class="buffs" v-if="buffs.length > 0">
      <header v-t="`minimap.buffs`"></header>
      <div class="minimod" v-for="(buff, i) in buffs" :key="i">
        {{buff.name}}: {{buff.value}}
      </div>
    </section>
    <section class="data">
      <header v-t="`minimap.data`"></header>
      <div class="minidata">
        <div class="title">{{$t(`build.${dmgName}`)}}</div>
        <div class="value">{{dmgVal}}</div>
      </div>
      <div class="minidata">
        <div class="title">{{$t(`build.fireRate`)}}</div>
        <div class="value">{{toFixed(build.fireRate, 2)}}</div>
      </div>
      <div class="minidata">
        <div class="title">{{$t(`build.crit`)}}</div>
        <div class="value">{{toPercent(build.critChance)}}% / {{toFixed(build.critMul, 1)}}x</div>
      </div>
      <div class="minidata">
        <div class="title">{{$t(`build.proc`)}}</div>
        <div class="value">{{toPercent(build.procChance)}}%{{build.pellets > 1 ? ` / ${toFixed(build.pellets, 1)}` : ''}}</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ModBuild } from "@/warframe/modbuild";
import { RivenMod } from "@/warframe/rivenmod";

@Component({ components: {} })
export default class BuildMinimap extends Vue {
  @Prop() build: ModBuild;

  get isMelee() {
    return this.build.weapon.tags.has("Melee");
  }

  toFixed(val: number, num: number) {
    return +val.toFixed(num);
  }

  toPercent(val: number) {
    return +(val * 100).toFixed(1);
  }

  get dmgName() {
    let nameTable = this.isMelee
      ? [
          // Melee
          "attackDamage",
          "slideDamage",
          "attackDamagePS",
          "slideDamagePS",
          "heavyAttack",
        ]
      : [
          // Gun
          "totalDamage",
          "burstDamage",
          "sustainedDamage",
          "firstAmmoDamage",
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
          rarity: v.rarity,
        };
      }
      return {
        id: v.id,
        name: v.shortName,
        wiki: this.$t("otherinfo.wikiurl", [v.id.replace(/ /g, "_")]),
        rarity: v.rarity,
      };
    });
  }

  get buffs() {
    return this.build.buffs.filter(Boolean).map(v => {
      return {
        id: v.data.id, //
        name: v.shortName,
        value: v.layerEnable ? v.layer : v.power,
      };
    });
  }

  imgSrc = "";
}
</script>
<style lang="less">
@import "../less/common.less";

.build-minimap {
  box-shadow: 5px 6px 16px -10px rgba(0, 0, 0, 0.44);
  padding: 16px;
  margin: 7px;
  border-radius: 8px;
  background: @theme_back;
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
    padding: 1px 6px;
    background: @theme_back;
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
      color: @text_darker;
    }
  }
}
</style>
