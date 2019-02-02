<template>
  <div class="other-info">
    <section class="weapon">
      <header>{{$t(`messages.${build.weapon.name}`)}}</header>
      <div class="links">
        <a :href="weaponWiki" target="_blank" rel="noopener noreferrer">
          <el-button size="mini" type="info" icon="el-icon-location">
            {{$t("otherinfo.wiki")}}
          </el-button>
        </a>
        <a :href="weaponWM" target="_blank" rel="noopener noreferrer">
          <el-button size="mini" type="info" icon="el-icon-goods">
            {{$t("otherinfo.wm")}}
          </el-button>
        </a>
        <code>{{`\{\{Weapon|${build.weapon.id}\}\}`}}</code>
      </div>
    </section>
    <section class="mod" v-for="(mod, i) in mods" :key="i">
      <header>{{mod.name}}</header>
      <div class="links">
        <a :href="mod.wiki" target="_blank" rel="noopener noreferrer">
          <el-button size="mini" type="info" icon="el-icon-location">
            {{$t("otherinfo.wiki")}}
          </el-button>
        </a>
        <a :href="mod.wm" target="_blank" rel="noopener noreferrer">
          <el-button size="mini" type="info" icon="el-icon-goods">
            {{$t("otherinfo.wm")}}
          </el-button>
        </a>
        <code>{{`\{\{M|${mod.id}\}\}`}}</code>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ModBuild } from "@/warframe/modbuild";

@Component
export default class OtherInfoDisplay extends Vue {
  @Prop() build: ModBuild;

  get weaponWiki() {
    return this.$t("otherinfo.wikiurl", [this.build.weapon.id.replace(/ /g, "_")])
  }
  get weaponWM() {
    return this.$t("otherinfo.wmurl", [_.kebabCase(this.build.weapon.id).replace(/-/g, "_")])
  }

  get mods() {
    return this.build.mods.filter(Boolean).map(v => ({
      id: v.id,
      name: v.name,
      wiki: this.$t("otherinfo.wikiurl", [v.id.replace(/ /g, "_")]),
      wm: this.$t("otherinfo.wmurl", [_.kebabCase(v.id).replace(/-/g, "_")])
    }))
  }
}
</script>
<style lang="less">
@import "../less/common.less";
.other-info {
  a {
    color: @theme_main;
  }
  section > header {
    line-height: 2;
    font-size: 1.2rem;
  }
  .links > *:not(:last-child) {
    margin-right: 8px;
  }
}
</style>
