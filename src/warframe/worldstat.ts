
/**
 * Warframe World Stat from https://api.warframestat.us/
 *
 * @export
 * @class WorldStat
 */
export class WorldStat {
  platform = "pc";
  get APIBase() { return "https://api.warframestat.us/" + this.platform; }

}
