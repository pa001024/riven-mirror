import { Vue, Watch, Prop } from "vue-property-decorator";
import { RivenMod } from "@/warframe";
import { GunCompareMode } from "@/warframe/gunmodbuild";
import { ModBuild } from "@/warframe/modbuild";
import { ValuedRivenProperty } from "@/warframe/rivenmod";
import { RivenDataBase, Weapon } from "@/warframe/data";


export abstract class ModBuildView extends Vue {
  @Prop() riven: RivenMod
  selectWeapon = ""
  get weapon() {
    return (this.riven.weapons as Weapon[]).find(v => v.name === this.selectWeapon);
  }
  selectCompMethod: GunCompareMode = GunCompareMode.TotalDamage
  selectDamageType: string = null
  builds: [string, ModBuild][] = []

  /** 插槽使用数 */
  slots = 8
  /** 紫卡分数 */
  score = 0
  /** 紫卡评级 */
  scoreLevel = 0

  /** 元素类型 */
  elementTypes = {
    "物理": ["8", "9", "A"],
    "辐射": ["4", "7"],
    "腐蚀": ["7", "6"],
    "毒气": ["4", "6"],
    "病毒": ["5", "6"],
    "爆炸": ["4", "5"],
    "磁力": ["5", "7"],
  }
  activeNames: string[] = ["紫卡配置"]

  _debouncedRecalc: (() => void);
  abstract debouncedRecalc();

  @Watch("riven")
  rivenChange() {
    let weapons = this.riven.weapons;
    if (!weapons || weapons.length === 0) {
      console.log("warn: weapons.length === 0");
      return;
    }
    this.selectWeapon = weapons[weapons.length - 1].name;
    this.debouncedRecalc();
  }
  recalc(cls: any, options: any) {
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    let stand = new cls(this.riven, this.selectWeapon, options);
    let riven = new cls(this.riven, this.selectWeapon, options);
    let best = stand.findBestRiven();
    let bestRiven = new cls(best, this.selectWeapon, options);
    stand.fill(this.slots, 0);
    riven.fill(this.slots, 2);
    bestRiven.fill(this.slots, 2);
    this.builds = [];
    this.builds.push(["标准配置", stand]);
    this.builds.push(["紫卡配置", riven]);
    this.builds.push(["最佳紫卡配置", bestRiven]);
    this.score = Math.round(riven.compareDamage / stand.compareDamage * 100 - 100);
    this.scoreLevel = this.score * 100 / Math.round(bestRiven.compareDamage / stand.compareDamage * 100 - 100);
  }
  selectDamageTypeChange() {
    if (this.selectDamageType)
      localStorage.setItem(this.constructor.name + ".selectDamageType", this.selectDamageType);
    else
      localStorage.removeItem(this.constructor.name + ".selectDamageType");
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
      return vp.displayValue + " " + vp.name;
    }
    return prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }
}
