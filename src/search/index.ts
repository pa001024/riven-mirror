import Fuse from "fuse.js";
import { WeaponDatabase, NormalModDatabase, WarframeDataBase } from "@/warframe/codex";
import { i18n } from "@/i18n";
import pinyin from "./pinyin";
import _ from "lodash";

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
  /** 拼音首字母 */
  pinyin?: string;
  /** 其他昵称 */
  alias?: string[];
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

  engine: Fuse<SearchResult>;
  /**
   * 初始化搜索数据
   *
   * @memberof SearchEngine
   */
  init() {
    let searchData = [];
    // Weapon
    const tagSet = new Set<string>();
    searchData = searchData.concat(
      WeaponDatabase.weapons.map(weapon => {
        const entity = {
          id: weapon.name,
          name: i18n.t(weapon.id),
          type: "search.weapon",
          // decs:"",
          tags: weapon.tags.toArray().map(v => {
            tagSet.add(v);
            return i18n.t(`tags.${_.camelCase(v)}`);
          })
        } as SearchResult;
        // 中文优化
        if (i18n.locale.startsWith("zh")) {
          entity.pinyin = pinyin.getCamelChars(entity.name);
        }
        return entity;
      })
    );
    // console.log(
    //   Array.from(tagSet)
    //     .map(v => `"${_.camelCase(v)}":"${v}",`)
    //     .join("\n")
    // );
    // MOD
    const propSet = new Set<string>();
    searchData = searchData.concat(
      NormalModDatabase.map(mod => {
        const entity = {
          id: mod.id,
          name: mod.name,
          type: "search.mod",
          // decs: ""
          tags: mod.vProps.map(v => {
            if (v.id === v.shortName && v.id.length < 10) propSet.add(v.id);
            return (v.value > 0 ? "+" : v.value < 0 ? "-" : "") + v.shortName;
          })
        } as SearchResult;
        // 中文优化
        if (i18n.locale.startsWith("zh")) {
          entity.pinyin = pinyin.getCamelChars(entity.name);
        }
        return entity;
      })
    );
    // console.log(
    //   Array.from(propSet)
    //     .map(v => `"${_.camelCase(v)}":"${v}",`)
    //     .join("\n")
    // );
    // Warframe
    searchData = searchData.concat(
      WarframeDataBase.All.map(wf => {
        const entity = {
          id: wf.id,
          name: wf.name,
          type: "search.wf",
          // decs: ""
          tags: wf.tags.map(v => v)
        } as SearchResult;
        // 黑话
        if (i18n.locale.startsWith("zh") && i18n.te(`alias.${_.camelCase(wf.id)}`)) {
          entity.alias = i18n.t(`alias.${_.camelCase(wf.id)}`).split(",");
        }
        return entity;
      })
    );
    // Resource
    // Mission
    // 守护
    // Zaw
    // Kitgun
    // Amp

    // fuse init

    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["id", "name", "pinyin", "tags", "alias"]
    };
    this.engine = new Fuse(searchData, options); // "list" is the item array
  }
  search(query: string): SearchResult[] {
    const raw = this.engine.search(query);
    return raw;
  }
}
