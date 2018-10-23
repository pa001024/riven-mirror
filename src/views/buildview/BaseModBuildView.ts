import { Vue, Watch, Prop } from "vue-property-decorator";
import { RivenMod, GunModBuild, ModBuild, ValuedRivenProperty, RivenDataBase, Weapon } from "@/warframe";
import { i18n } from "@/i18n";

export abstract class BaseModBuildView extends Vue {
  @Prop() riven: RivenMod;
  selectWeapon = "";
  get weapon() {
    return (this.riven.weapons as Weapon[]).find(v => v.id === this.selectWeapon);
  }
  selectCompMethod: number = 0;
  selectDamageType: string = "Corrosive";
  builds: [string, ModBuild][] = [];

  /** 插槽使用数 */
  slots = 8;
  /** 紫卡分数 */
  score = 0;
  /** 紫卡评级 */
  scoreLevel = 0;

  /** 元素类型 */
  elementTypes = {
    "Physical": ["8", "9", "A"],
    "Radiation": ["4", "7"],
    "Corrosive": ["7", "6"],
    "Gas": ["4", "6"],
    "Viral": ["5", "6"],
    "Blast": ["4", "5"],
    "Magnetic": ["5", "7"],
  }
  activeNames: string[] = [i18n.t("buildview.yourriven").toString()];

  _debouncedRecalc: (() => void);
  abstract debouncedRecalc();
  abstract get defalutMode(): number;

  @Watch("riven")
  rivenChange(riven?: RivenMod, oldRiven?: RivenMod) {
    let weapons = this.riven.weapons;
    if (!weapons || weapons.length === 0) {
      console.warn("warn: weapons.length === 0");
      return;
    }
    this.selectWeapon = weapons[weapons.length - 1].id;
    if (!oldRiven || this.riven && oldRiven.id !== this.riven.id)
      this.selectCompMethod = this.defalutMode;
    this.debouncedRecalc();
  }
  recalc(cls: any = GunModBuild, options = {}) {
    let startTime = Date.now();
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    let weapon = RivenDataBase.getNormalWeaponsByName(this.selectWeapon);
    let stand = new cls(weapon, this.riven, options);
    let riven = new cls(weapon, this.riven, options);
    let best = stand.findBestRiven();
    let bestRiven = new cls(weapon, best, options);
    stand.fill(this.slots, 0);
    riven.fill(this.slots, 2);
    bestRiven.fill(this.slots, 2);
    this.builds = [];
    this.builds.push([i18n.t("buildview.normal").toString(), stand]);
    this.builds.push([i18n.t("buildview.yourriven").toString(), riven]);
    this.builds.push([i18n.t("buildview.bestriven").toString(), bestRiven]);
    this.score = Math.round(riven.compareDamage / stand.compareDamage * 100 - 100);
    this.scoreLevel = this.score * 100 / Math.round(bestRiven.compareDamage / stand.compareDamage * 100 - 100);
    console.log(`recalc: ${Date.now() - startTime}ms`);
  }
  selectDamageTypeChange() {
    if (this.selectDamageType)
      localStorage.setItem(this.constructor.name + ".selectDamageType", this.selectDamageType);
    else
      localStorage.removeItem(this.constructor.name + ".selectDamageType");
    this.debouncedRecalc();
  }

  get scoreLevelText() {
    if (this.scoreLevel < 20)
      return "F";
    if (this.scoreLevel < 30)
      return "E";
    if (this.scoreLevel < 40)
      return "D";
    if (this.scoreLevel < 50)
      return "C";
    if (this.scoreLevel < 60)
      return "B";
    if (this.scoreLevel < 70)
      return "A";
    if (this.scoreLevel < 80)
      return "S";
    if (this.scoreLevel < 90)
      return "S+";
    return "EX";
  }
  convertToPropName(prop: [string, number]) {
    let rp = RivenDataBase.getPropByName(prop[0]);
    if (rp) {
      let vp = new ValuedRivenProperty(rp, prop[1] * 100);
      return this.$t("prop.fullName." + vp.id, [vp.displayValue]);
    }
    return prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }

  toBuild(build: ModBuild) {
    this.$router.push({ name: 'BuildEditorWithCode', params: { id: this.selectWeapon, code: build.miniCode } });
  }
}
