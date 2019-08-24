import { NormalMod } from "./codex";

export interface CommonBuild {
  id: string;
  baseId: string;
  tags: string[];
  type: string;
  testMod(mod: NormalMod): number;
  isValidMod(mod: NormalMod): boolean;
  mods: NormalMod[];
  allMods?: NormalMod[];
}
