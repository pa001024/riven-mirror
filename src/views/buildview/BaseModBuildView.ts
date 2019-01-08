import { Vue, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { RivenMod } from "@/warframe/rivenmod";
import { RivenDataBase } from "@/warframe/codex";
import { ModBuild } from "@/warframe/modbuild";
import { GunModBuild } from "@/warframe/gunmodbuild";

export abstract class BaseModBuildView extends Vue {
  @Prop() riven: RivenMod;
  selectWeapon = "";
  get weapon() { return RivenDataBase.getNormalWeaponsByName(this.selectWeapon); }
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
  activeNames: string[] = ["buildview.yourriven"];

  _debouncedRecalc: (() => void);
  abstract debouncedRecalc();
  abstract get defalutMode(): number;

  recalc(cls: any = GunModBuild, options = {}) {
    let startTime = Date.now();
    if (!this.riven || !this.riven.name || this.riven.properties.length < 2) return;
    let weapon = this.weapon;
    let stand = new cls(weapon, this.riven, options);
    let riven = new cls(weapon, this.riven, options);
    console.log(this.riven.normalMod)
    let best = stand.findBestRiven();
    let bestRiven = new cls(weapon, best, options);
    stand.fill(this.slots, 0);
    riven.fill(this.slots, 2);
    bestRiven.fill(this.slots, 2);
    this.builds = [];
    this.builds.push(["buildview.normal", stand]);
    this.builds.push(["buildview.yourriven", riven]);
    this.builds.push(["buildview.bestriven", bestRiven]);
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
  toBuild(build: ModBuild) {
    this.$router.push({ name: 'BuildEditorWithCode', params: { id: this.weapon.url, code: build.miniCode } });
  }
}
