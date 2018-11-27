import { Damage2_0, DamageType, ModBuild, NormalMod, RivenDataBase, RivenWeapon, ValuedRivenProperty, Weapon, RivenMod, Buff, BuffData } from "@/warframe";
import _ from "lodash";
import { Vue, Watch } from "vue-property-decorator";

declare interface BuildSelectorTab {
  title: string
  name: string
  build: ModBuild
  mods: NormalMod[]
  buffs: Buff[]
}
export abstract class BaseBuildEditor extends Vue {
  get code() { return this.$route.params.code; }

  abstract get weapon(): Weapon;
  abstract get rWeapon(): RivenWeapon;
  tabs: BuildSelectorTab[] = [];
  tabValue = "SET A";
  selectModIndex = 0;
  selectBuffIndex = 0;
  dialogVisible = false;
  buffDialogVisible = false;
  abstract newBuild(...parms): ModBuild;

  @Watch("code")
  reload() {
    if (this.weapon) {
      this.tabs = "ABC".split("").map(v => ({
        title: this.$t("zh") ? `配置${v}` : `SET ${v}`,
        name: `SET ${v}`,
        build: this.newBuild(this.weapon),
        mods: Array(8),
        buffs: [null],
      }));
      this.tabValue = "SET A";
      if (this.code) {
        this.build.miniCode = this.code;
        let mods = this.build.mods;
        while (mods.length < 8) mods.push(null);
        this.currentTab.mods = mods;
      }
    }
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
      if (rst[vn]) rst[vn][1] = vv;
      else rst[vn] = [0, vv];
    });
    let emp = _.map(rst, (v, i) => [i, ...v]) as [string, number, number][];
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
    let rivenIdx = this.currentTab.mods.findIndex(v => v.rarity === "x"), riven = this.currentTab.mods[rivenIdx];
    this.currentTab.mods = Array(8);
    // 不清除紫卡
    if (riven) this.currentTab.mods[rivenIdx] = riven;
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
    return (prop[1] > 0 ? "+" : "") + (prop[1] * 100).toFixed() + "%" + " " + prop[0];
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

  @Watch("tabValue")
  refleshMods() {
    this.build.clear();
    let mods = _.compact(this.currentTab.mods);
    let buffs = _.compact(this.currentTab.buffs);
    this.build.mods = mods;
    this.build.buffs = buffs;
    this.$router.push({ name: 'BuildEditorWithCode', params: { code: this.build.miniCode } });
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
      if (mod.key === "01") {
        if (this.currentTab.mods.some((v, i) => i != this.selectModIndex && v && v.key === "01")) {
          this.$message.error(this.$t("modselector.rivenexists") as string);
          return;
        }
        this.build.riven = new RivenMod(mod.riven);
      }
      this.currentTab.mods[this.selectModIndex] = mod;
    }
    this.refleshMods();
    this.dialogVisible = false;
  }
  buffSelect(buff: BuffData) {
    this.currentTab.buffs[this.selectBuffIndex] = new Buff(buff);
    this.currentTab.buffs = _.compact(this.currentTab.buffs).concat([null]);
    this.refleshMods();
    this.buffDialogVisible = false;
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
  buffClick(buffIndex: number) {
    this.selectBuffIndex = buffIndex;
    this.buffDialogVisible = true;
  }
  buffRemove(buffIndex: number) {
    this.currentTab.buffs[buffIndex] = null;
    this.currentTab.buffs = _.compact(this.currentTab.buffs).concat([null]);
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
        mods: Array(8),
        buffs: [null],
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
