import $ from "axios";
// import _ from "lodash";
const _ = require("lodash") as typeof import("lodash")
import { _abilityData } from "../../../src/warframe/codex/warframe.data";

const debug = !!1;
const data = require("./trans.cache.json")

const wiki = debug ?
  () => new Promise<any>((r, j) => r({ data })) :
  () => $.get(`https://warframe.huijiwiki.com/index.php?title=UserDict&action=raw`);

wiki().then(({ data }) => {
  const trans = data.Text as { [name: string]: string }
  let td = _abilityData.reduce((a, b) => (a[_.camelCase(b.id)] = trans[b.id], a), {})
  console.log(JSON.stringify(td))
});
