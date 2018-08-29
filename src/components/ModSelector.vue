<template>
  <el-tabs class="mod-tabs" v-model="selectTab">
    <!-- 快速选择 -->
    <el-tab-pane name="fast">
      <span slot="label" class="mod-tablabel">{{$t("modselector.fastSelect")}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in fast" :key="index">
          <li class="mod-item el-dropdown" @click="handleClick(mod.id)">
            {{$t(`modselector.fast.${mod.name}`)}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
    <!-- 普通MOD -->
    <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
      <span slot="label" class="mod-tablabel">{{tab.name}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="(mod, index) in tab.mods" :key="index">
          <li class="mod-item el-dropdown" @click="handleClick(mod.id)">
            {{$t("zh") ? mod.name : mod.id}}
          </li>
        </div>
      </ul>
    </el-tab-pane>
    <!-- 紫卡 -->
    <el-tab-pane name="riven">
      <span slot="label" class="mod-tablabel">{{$t("modselector.rivenMod")}}</span>
      <ul class="mod-select">
        <div class="mod-item-container" v-for="(hiRiven, index) in modHistoty" :key="index">
          <li class="mod-item el-dropdown" @click="newRiven(hiRiven.qrCodeBase64)">
            {{$t("zh") ? hiRiven.fullName : hiRiven.fullId}}
          </li>
        </div>
      </ul>
      <div style="margin: 8px;">{{$t("modselector.createRiven")}}</div>
      <RivenEditor style="margin: 8px;" v-model="editorRivenCode" :weapon="build.rivenWeapon"></RivenEditor>
      <div style="text-align: right; margin: 0">
        <el-button type="primary" size="medium" @click="newRiven()">{{$t("modselector.ok")}}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { NormalMod, NormalModDatabase, Codex, ModBuild, RivenMod } from "@/warframe";
import RivenEditor from "@/components/RivenEditor.vue";
import { Getter } from "vuex-class";

declare interface ModSelectorTab {
  id: string
  name: string
  mods: NormalMod[]
}

@Component({ components: { RivenEditor } })
export default class ModSelector extends Vue {
  @Getter("modHistoty") modHistoty: RivenMod[];

  @Prop() build: ModBuild;
  tabs: ModSelectorTab[] = [];
  selectTab = "fast";
  editorRivenCode = "";

  /** MOD快速选择 */
  fastSelect = {
    "Rifle": {
      baseDmg: ["膛线", "分裂膛室", "重口径"],
      crit: ["致命一击", "弱点感应"],
      aimCrit: ["氩晶瞄具", "尖刃弹头"],
      sliverCorrosive: ["污染弹匣", "暴风使者"],
      silverRadiation: ["地狱火", "暴风使者"],
      silverViral: ["低温弹头 Prime", "污染弹匣"],
      goldCorrosive: ["致命火力", "高压电流"],
      gas: ["致命火力", "铝热焊弹", "污染弹匣"],
    },
    "Shotgun": {
      baseDmg: ["抵近射击 Prime", "地狱弹膛"],
      crit: ["破灭 Prime", "雷筒"],
      aimCrit: ["雷射瞄具", "破片射击"],
      sliverCorrosive: ["充电弹头", "传染蔓延"],
      silverRadiation: ["燃烧外壳", "充电弹头"],
      silverViral: ["急冻控场", "传染蔓延"],
      goldCorrosive: ["电冲弹药", "毒素弹幕"],
      gas: ["毒素弹幕", "炼狱轰击", "传染蔓延"],
    },
    "Pistol": {
      baseDmg: ["黄蜂蛰刺", "弹头扩散"],
      crit: ["手枪精通 Prime", "弱点专精 Prime"],
      aimCrit: ["液压准心", "尖锐子弹"],
      sliverCorrosive: ["痉挛", "病原弹头"],
      silverRadiation: ["火焰装填 Prime", "痉挛"],
      silverViral: ["深层冷冻", "病原弹头"],
      goldCorrosive: ["电流震击", "瘟疫手枪"],
      gas: ["瘟疫手枪", "灼痕焦点", "病原弹头"],
    },
    "Melee": {
      baseDmg: ["压迫点 Prime"],
      crit: ["急进猛突", "肢解", "牺牲 斩铁"],
      slideCrit: ["致残突击", "急进猛突", "肢解"],
      sliverCorrosive: ["热病打击 Prime", "电击触点"],
      silverRadiation: ["熔岩冲击", "电击触点"],
      silverViral: ["热病打击 Prime", "北风"],
      goldCorrosive: ["伏打电能", "剧毒灾害"],
      gas: ["热病打击 Prime", "爆裂刀刃", "剧毒灾害"],
    }
  };
  get fast() { return _.map(this.fastSelect[this.build.rivenWeapon.mod], (v, i) => ({ name: i, id: v } as any)); }

  newRiven(code?: string) {
    let riven = new RivenMod();
    riven.qrCodeBase64 = code || this.editorRivenCode;
    this.$emit("command", riven.normalMod);
  }
  @Watch("build")
  reload() {
    let selected = this.build.mods;
    let mods = NormalModDatabase.filter(v => this.build.weapon.tags.concat([this.build.rivenWeapon.name]).includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id));
    let benefits = mods.filter(v => v.props.some(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) >= 0))
      .map(v => [v, this.build.testMod(v)] as [NormalMod, number]).sort((a, b) => b[1] - a[1]).map(([v]) => v);
    this.tabs = [
      // { id: "Fast", name: this.$t("modselector.fastSelect") as string, mods: _.map(this.fastSelect[this.build.rivenWeapon.mod], (v, i) => ({ name: i, id: v } as any)) },
      { id: "Benefit", name: this.$t("modselector.sorted") as string, mods: benefits },
      { id: "Damage", name: this.$t("modselector.damage") as string, mods: mods.filter(v => v.props.some(k => k[1] > 0 && "01DSKEGICO".indexOf(k[0]) >= 0)) },
      { id: "Elements", name: this.$t("modselector.element") as string, mods: mods.filter(v => v.props.some(k => "456789A".indexOf(k[0]) >= 0)) },
      { id: "Speed", name: this.$t("modselector.speed") as string, mods: mods.filter(v => v.props.some(k => "RLFJ".indexOf(k[0]) >= 0)) },
      { id: "Other", name: this.$t("modselector.other") as string, mods: mods.filter(v => v.props.every(k => "01DSKEGICO456789ARLFJ".indexOf(k[0]) < 0)) },
    ];
  }
  beforeMount() {
    this.reload();
  }
  handleClick(id: string | string[]) {
    if (typeof id === "string")
      this.$emit("command", Codex.getNormalMod(id));
    else {
      let selected = this.build.mods;
      let mods = NormalModDatabase.filter(v => this.build.weapon.tags.concat([this.build.rivenWeapon.name]).includes(v.type) && !selected.some(k => k.id === v.id || k.primed === v.id));
      let found = id.map(v => mods.find(k => k.name === v)).filter(Boolean);
      this.$emit("command", found);
    }
    this.reload();
  }
}
</script>

<style>
.mod-item-container {
  display: inline-block;
}
.mod-tablabel {
  font-size: 16px;
  padding: 0 8px;
}
.mod-item {
  display: inline-block;
  margin: 8px;
  padding: 8px 20px;
  border: 1px solid #ccc;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
  box-sizing: content-box;
  transition: 0.3s;
}
.mod-item:hover {
  background: #6199ff;
  color: white;
  box-shadow: 0 0 0 4px #a8c7ff80;
  border-color: transparent;
}
</style>
