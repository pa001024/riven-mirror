
/**
 * 搜索结果
 *
 * @export
 * @interface SearchResult
 */
export interface SearchResult {
  /** 唯一资源链接 */
  id: string;
  /** 类型 i18n化 */
  type: string;
  /** 名称 i18n化 */
  name: string;
  /** 描述 i18n化 */
  desc?: string;
  /** 搜索关键词 */
  tags?: string[];
}

/**
 * 资源搜索引擎
 *
 * @export
 * @class SearchEngine
 */
export class SearchEngine {
  constructor() {
    this.init();
  }

  /**
   * 初始化搜索数据
   *
   * @memberof SearchEngine
   */
  init() {
    const searchData = [];
    // Weapon
    // searchData = searchData.concat((gunWeaponData as WeaponData[]).concat(meleeWeaponData).map(v => ({

    // })))
    // MOD
    // Warframe
    // Resource
    // Mission
    // 守护
    // Zaw
    // Kitgun
    // Amp
  }
  search(query: string): SearchResult[] {
    return [{ id: "xx", type: "MOD", name: "心志偏狭", desc: "减少技能范围增加持续" }];
  }
}
