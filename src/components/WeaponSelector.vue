<template>
  <el-tabs class="weapon-tabs" v-model="modType">
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="weapon-tablabel">{{$t(`weaponselector.${tab.name}`)}}</span>
      <div class="weapon-select">
        <template v-for="(riven, index) in tab.rivens">
          <div class="weapon-group-header" v-if="!tab.rivens[index-1] || tab.rivens[index-1].star != riven.star" :key="riven.star">
            {{riven.starText}}
          </div>
          <div class="weapon-item-container" :key="riven.id">
            <el-dropdown v-if="riven.weapons.length > 1" trigger="click" @command="handleCommand" placement="bottom-start">
              <div class="weapon-item">
                {{riven.name}} {{riven.ratio}}
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="weapon in riven.weapons" :key="weapon.id" :command="weapon.id">{{weapon.displayName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-else class="weapon-item el-dropdown" @click="handleClick(riven.id)">
              {{riven.name}} {{riven.ratio}}
            </div>
          </div>
        </template>
      </div>
    </el-tab-pane>
    <el-tab-pane name="KITGUN">
      <span slot="label" class="weapon-tablabel">{{$t('kitgun.title')}}</span>
      <KitgunBuilder @finish="newKITGUN">
      </KitgunBuilder>
    </el-tab-pane>
    <el-tab-pane name="ZAW">
      <span slot="label" class="weapon-tablabel">{{$t('zaw.title')}}</span>
      <ZawBuilder @finish="newZAW">
      </ZawBuilder>
    </el-tab-pane>
    <el-tab-pane name="AMP">
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
import { ModTypeTable, RivenWeapon, RivenDataBase, Zaw, Kitgun, Amp } from "@/warframe/codex";

declare interface WeaponSelectorTab {
  id: string;
  name: string;
  rivens: RivenWeapon[];
  weapons: string[][];
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
      rivens: RivenDataBase.Weapons.filter(v => include.includes(v.mod) && v.weapons.length > 0),
      weapons: []
    }));
  }
  handleCommand(id: string) {
    console.log("BuildEditor->", id);
    this.$router.push({ name: "BuildEditor", params: { id: id.replace(/ /g, "_") } });
  }
  handleClick(id: string) {
    let weapon = RivenDataBase.getRivenWeaponByName(id);
    let weapons = weapon.weapons;
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

