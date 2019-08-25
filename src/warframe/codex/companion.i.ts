import { Damage } from "./weapon.i";

/** 同伴信息 */
export interface CompanionData {
  id: string;
  className?: string;
  tags: string[];
  health: number;
  shield: number;
  armor: number;
  polarities?: string;
  damage?: Damage;
  critChance?: number;
  critMul?: number;
  procChance?: number;
}
