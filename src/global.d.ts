import { WeaponDatabase } from "./warframe/codex";

declare interface HMTStatic {
  id: string;
  cmd: { [key: string]: { push: Function } };
  push: (param: any[]) => void;
}
declare global {
  // const _: _.LoDashStatic;
  const _hmt: HMTStatic;
  // const WeaponDatabase: WeaponDatabase;
}
