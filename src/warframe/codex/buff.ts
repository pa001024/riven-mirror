/**
 * 赋能
 */
export interface Buff {
  id: string;
  name: string;
  /** 属性 */
  props: [string, number][];
  /** 生效目标 */
  type: string;
}

// 牛/龙/易融/电盾/主教/猫叫/踩线/各种集团1附加元素/女枪1技能/DJ
// 还有技能武器吃强度 武器外观
export const BuffList: Buff[] = [{
  id: "V",
  name: "电盾",
  props: [["1", 1]],
  type: "",
}];
