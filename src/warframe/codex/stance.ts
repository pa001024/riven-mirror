// import { i18n } from "@/i18n";

export interface StanceData {
  id: string;
  attacks: StanceAttack[];
}

export interface StanceAttack {
  // 位移
  move: number;
  // 伤害倍率
  damage: number;
  // 强制触发
  status: string[];
  // 处决
  execute: boolean;
}

export interface Stance {
  A: StanceData;
  F: StanceData;
  B: StanceData;
  R: StanceData;
  FR: StanceData;
}
