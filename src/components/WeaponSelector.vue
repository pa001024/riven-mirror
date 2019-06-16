<template>
  <el-tabs class="weapon-tabs" v-model="modType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="weapon-tablabel">{{$t(`weaponselector.${tab.name}`)}}</span>
      <div class="weapon-select">
        <template v-for="(weapon, index) in tab.weapons">
          <div class="weapon-group-header" v-if="!tab.weapons[index-1] || tab.weapons[index-1].star != weapon.star" :key="weapon.star">
            {{weapon.starText}}
          </div>
          <div class="weapon-item-container" :key="weapon.name">
            <el-dropdown v-if="weapon.variants.length > 1" trigger="click" @command="handleCommand" placement="bottom-start">
              <div class="weapon-item">
                {{$t(weapon.id)}} {{weapon.disposition}}
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="weapon in weapon.variants" :key="weapon.name" :command="weapon.name">{{weapon.displayName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-else class="weapon-item el-dropdown" @click="handleClick(weapon.name)">
              {{$t(weapon.id)}} {{weapon.disposition}}
            </div>
          </div>
        </template>
      </div>
    </el-tab-pane>
    <el-tab-pane name="KITGUN" lazy>
      <span slot="label" class="weapon-tablabel">{{$t('kitgun.title')}}</span>
      <KitgunBuilder @finish="newKITGUN">
      </KitgunBuilder>
    </el-tab-pane>
    <el-tab-pane name="ZAW" lazy>
      <span slot="label" class="weapon-tablabel">{{$t('zaw.title')}}</span>
      <ZawBuilder @finish="newZAW">
      </ZawBuilder>
    </el-tab-pane>
    <el-tab-pane name="AMP" lazy>
      <span slot="label" class="weapon-tablabel">{{$t('amp.title')}}</span>
      <AmpBuilder @finish="newAMP">
      </AmpBuilder>
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

declare interface WeaponSelectorTab {
  id: string;
  name: string;
  weapons: Weapon[];
}

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
  tabs: WeaponSelectorTab[] = [];
  beforeMount() {
    this.tabs = _.map(ModTypeTable, ({ name, include }, id) => ({
      id,
      name,
      // 筛选
      weapons: WeaponDatabase.getProtosByMultiTags(include)
        .filter(v => v.modes) // 给ZAW KITGUN加个链接
        .sort((a, b) => b.disposition - a.disposition)
    }));
  }
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

