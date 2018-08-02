import { Vue, Watch, Prop } from "vue-property-decorator";
import { RivenMod } from "@/warframe";
import { GunCompareMode, GunModBuild, GunModBuildOptions } from "@/warframe/gunmodbuild";
import { ModBuild } from "@/warframe/modbuild";
import { ValuedRivenProperty } from "@/warframe/rivenmod";
import { RivenDataBase } from "@/warframe/data";
import { MeleeModBuildOptions } from "@/warframe/meleemodbuild";

declare interface VueWorker {
  postMessage(msg: string, parms: any[]): Promise<any>
  create([...actions]): VueWorker
  run(fun: Function, [...args]): Promise<any>
}

export abstract class ModBuildView extends Vue {
  @Prop() riven: RivenMod
  selectWeapon = ""
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

  @Watch("riven")
  rivenChange() {
    let weapons = this.riven.weapons;
    if (!weapons || weapons.length === 0) {
      console.log("warn: weapons.length === 0");
      return;
    }
    this.selectWeapon = weapons[weapons.length - 1].name;
    this._debouncedRecalc();
  }

  selectDamageTypeChange() {
    this._debouncedRecalc();
    if (this.selectDamageType)
      localStorage.setItem("selectDamageType." + this.constructor.name, this.selectDamageType);
    else
      localStorage.removeItem("selectDamageType." + this.constructor.name);
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
    if (this.scoreLevel < 85)
      return "SS";
    if (this.scoreLevel < 90)
      return "SSS";
    if (this.scoreLevel < 95)
      return "EX";
    return "EX+";
  }
  convertToPropName(prop: [string, number]) {
    let rp = RivenDataBase.getPropByName(prop[0]);
    if (rp) {
      let vp = new ValuedRivenProperty(rp, prop[1] * 100);
      return vp.name + " " + vp.displayValue;
    }
    return prop[0] + " " + (prop[1] * 100).toFixed() + "%";
  }
}
