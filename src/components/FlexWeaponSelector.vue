<template>
  <el-tabs class="weapon-tabs" v-model="modType">
    <el-tab-pane name="NORMAL">
      <span slot="label" class="weapon-tablabel">{{$t(`weaponselector.normal`)}}</span>
      <div class="weapon-select">
        <div class="sort-option">
          <!-- 名称 -->
          <div class="name"></div>
          <!-- 倾向度 -->
          <div class="disposition"></div>
        </div>

      </div>
    </el-tab-pane>
    <el-tab-pane name="KITGUN" lazy>
      <span slot="label" class="weapon-tablabel">{{$t('kitgun.title')}}</span>
      <KitgunBuilder @finish="newKITGUN"/>
    </el-tab-pane>
    <el-tab-pane name="ZAW" lazy>
      <span slot="label" class="weapon-tablabel">{{$t('zaw.title')}}</span>
      <ZawBuilder @finish="newZAW"/>
    </el-tab-pane>
    <el-tab-pane name="AMP" lazy>
      <span slot="label" class="weapon-tablabel">{{$t('amp.title')}}</span>
      <AmpBuilder @finish="newAMP"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import ZawBuilder from "@/components/ZawBuilder.vue";
import KitgunBuilder from "@/components/KitgunBuilder.vue";
import AmpBuilder from "@/components/AmpBuilder.vue";
import { ModTypeTable, RivenDatabase, Zaw, Kitgun, Amp, Weapon, WeaponDatabase } from "@/warframe/codex";

const AllTabs = Object.assign({}, ModTypeTable, { KITGUN: "KITGUN", ZAW: "ZAW", AMP: "AMP" });

@Component({ components: { ZawBuilder, KitgunBuilder, AmpBuilder } })
export default class WeaponSelector extends Vue {
  // modType = "Rifle";
  get modType() {
    let val = location.hash && location.hash.split("#")[1].trim();
    return val in AllTabs ? val : "Rifle";
  }
  set modType(value) {
    location.hash = value;
  }
  beforeMount() {}
  handleCommand(id: string) {
    console.log("BuildEditor->", id);
    this.$router.push({ name: "BuildEditor", params: { id: id.replace(/ /g, "_") } });
  }
  handleClick(id: string) {
    let weapon = WeaponDatabase.getWeaponByName(id);
    weapon.variants;
    let weapons = weapon.variants;
    if (weapons.length === 0) {
      this.$message.error(this.$t("weaponselector.notfound") as string);
    } else if (weapons.length === 1) {
      this.handleCommand(id);
    }
  }
  newZAW(zaw: Zaw) {
    console.log("newZAW->", zaw.url);
    this.$router.push({ name: "BuildEditor", params: { id: zaw.url } });
  }
  newKITGUN(kitgun: Kitgun) {
    console.log("newKITGUN->", kitgun.url);
    this.$router.push({ name: "BuildEditor", params: { id: kitgun.url } });
  }
  newAMP(amp: Amp) {
    console.log("newAMP->", amp.url);
    this.$router.push({ name: "BuildEditor", params: { id: amp.url } });
  }
}
</script>

<style lang="less">
@import "../less/common.less";

.weapon-item-container {
  margin: 4px;
  display: inline-block;
}
.weapon-tablabel {
  font-size: 1.1rem;
}
.weapon-item {
  display: inline-block;
  margin: 4px;
  padding: 8px 20px;
  border: 1px solid #ccc;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
  box-sizing: content-box;
  transition: 0.3s;
  &:hover {
    background: #6199ff;
    color: white;
    box-shadow: 0 0 0 4px #a8c7ff80;
    border-color: transparent;
  }
}

.weapon-group-header {
  font-size: 1.6em;
  margin: 0 12px;
  color: @theme_main;
}
</style>

