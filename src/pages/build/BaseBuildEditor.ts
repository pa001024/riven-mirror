import { Damage2_0, DamageType, ModBuild, NormalMod, RivenDataBase, RivenWeapon, ValuedRivenProperty, Weapon } from "@/warframe";
import _ from "lodash";
import { Vue } from "vue-property-decorator";

declare interface BuildSelectorTab {
  title: string
  name: string
  build: ModBuild
  mods: NormalMod[]
}
export abstract class BaseBuildEditor extends Vue {
  abstract get weapon(): Weapon;
  abstract get rWeapon(): RivenWeapon;
  tabs: BuildSelectorTab[] = [];
  tabValue = "SET A";
  selectModIndex = 0;
  dialogVisible = false;
  abstract newBuild(...parms): ModBuild;

  reload() {
    this.tabs = "ABC".split("").map(v => ({
      title: this.$t("zh") ? `配置${v}` : `SET ${v}`,
      name: `SET ${v}`,
      build: this.newBuild(this.weapon),
      mods: Array(8)
    }));
    this.tabValue = "SET A";
  }

  get currentTab() { return this.tabs.find(v => v.name === this.tabValue); }
  get build() { return this.currentTab.build; }
  get mergedDmg() {
    let lD = this.weapon.dmg;
    let nD = this.build.dmg;
    let rst: { [v: string]: [number, number] } = {};
    lD.forEach(([vn, vv]) => {
      rst[vn] = [vv, 0];
    });
    nD.forEach(([vn, vv]) => {
      console.log("vn", vn, nD);
      if (rst[vn]) rst[vn][1] = vv;
      else rst[vn] = [0, vv];
    });
    let emp = _.map(rst, (v, i) => [i, ...v]) as [string, number, number][];
    console.log("mergedDmg", this.build.combElementsOrder, emp);
    return emp;
  }
  fill() {
    this.build.fill(8, 0);
    this.currentTab.mods = this.build.mods;
    this.reloadSelector();
  }
  fillEmpty() {
    this.build.fillEmpty(8, 0);
    this.currentTab.mods = this.build.mods;
    this.reloadSelector();
  }
  clear() {
    this.currentTab.mods = Array(8);
    this.refleshMods();
    this.reloadSelector();
  }
  changeMode(mode: number) {
    this.build.compareMode = mode;
    this.reloadSelector();
  }
  abstract reloadSelector();
  convertToPropName(prop: [string, number]) {
    let rp = RivenDataBase.getPropByName(prop[0]);
    if (rp) {
      let vp = new ValuedRivenProperty(rp, prop[1] * 100);
      return this.$t("prop.fullName." + vp.id, [vp.displayValue]);
    }
    return prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }
  /** 返回固定精确度数值 */
  Num(num: number, preci = 1) {
    return +num.toFixed(preci);
  }
  /** 返回固定精确度数值并带正负号 */
  PNNum(num: number, preci = 1) {
    let n = +num.toFixed(preci);
    return n < 0 ? n.toString() : "+" + n;
  }
  refleshMods() {
    this.build.clear();
    let mods = _.compact(this.currentTab.mods);
    mods.forEach(mod => this.build.applyMod(mod));
  }
  mapDname(id: string) {
    let dtype = Damage2_0.getDamageType(id as DamageType);
    return dtype && (this.$t("zh") ? dtype.name : dtype.id.toUpperCase()) || "";
  }
  // === 事件处理 ===
  modSelect(mod: NormalMod | NormalMod[]) {
    if (_.isArray(mod)) {
      if (mod.length > 0 && mod[0]) {
        this.currentTab.mods[this.selectModIndex] = null;
        mod.forEach(v => {
          let index = this.currentTab.mods.findIndex(v => !v);
          this.currentTab.mods[index] = v;
        });
      }
    } else {
      this.currentTab.mods[this.selectModIndex] = mod;
    }
    this.refleshMods();
    this.dialogVisible = false;
  }
  slotClick(modIndex: number) {
    this.selectModIndex = modIndex;
    this.dialogVisible = true;
  }
  slotRemove(modIndex: number) {
    this.currentTab.mods[modIndex] = null;
    this.refleshMods();
    this.reloadSelector();
  }
  handleTabsEdit(targetName, action: "add" | "remove") {
    if (action === 'add') {
      let newTabName = "SET " + (1 + (+this.tabs[this.tabs.length - 1].name.split(" ")[1] || 0));
      this.tabs.push({
        title: newTabName.replace("SET", "配置"),
        name: newTabName,
        build: this.newBuild(this.weapon),
        mods: Array(8)
      });
      this.tabValue = newTabName;
    }
    if (action === 'remove') {
      let tabs = this.tabs;
      let activeName = this.tabValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.tabValue = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
