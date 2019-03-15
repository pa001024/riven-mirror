import axios from "axios";
// import localStorage from "universal-localstorage";
// import jsonpAdapter from "axios-jsonp";

class HttpApi {
  protected client = axios.create();
  protected async fetch(url: string) {
    try {
      return await this.client({
        url: url
        // adapter: jsonpAdapter
      });
    } catch (e) {
      return null;
    }
  }
}

class WikiApi extends HttpApi {
  protected async api(url: string) {
    let res = await this.fetch(url);
    if (res) {
      let pages = res.data.query.pages;
      let keys = Object.keys(pages);

      if (keys.length > 0 && keys[0] != "-1") {
        let page = pages[keys[0]];
        return page;
      }
      return;
    }
  }

  /**
   * 返回页面源代码
   *
   * @param {string} pagename
   * @returns
   * @memberof WikiApi
   */
  async getPageRaw(pagename: string) {
    const api = `https://warframe.huijiwiki.com/index.php?action=raw&title=${pagename}`;
    let rst = await this.fetch(api);
    return rst && (rst.data as string);
  }
  /**
   * 返回页面对应的图片
   *
   * @param {string} pagename
   * @returns
   * @memberof WikiApi
   */
  async getPageImageProp(pagename: string) {
    const api = `https://warframe.huijiwiki.com/api.php?action=query&titles=${pagename}&prop=pageprops&format=json`;
    let rst = await this.api(api);
    return rst && (rst.pageprops.page_image_free as string);
  }

  /**
   * 返回图片的真实地址
   *
   * @param {string} filename
   * @returns
   * @memberof WikiApi
   */
  async getImageInfo(filename: string) {
    let api = `https://warframe.huijiwiki.com/api.php?action=query&titles=File:${filename}&prop=imageinfo&&iiprop=url&format=json`;
    let rst = await this.api(api);
    return rst && (rst.imageinfo[0].url as string);
  }

  /**
   * [overwrite] 获取页面真实的图片地址
   *
   * @param {string} id
   * @returns
   * @memberof CachedWikiApi
   */
  async getMainImage(id: string) {
    let raw = await this.getPageRaw(id);
    if (raw) {
      let m = raw.match(/#重定向 \[\[(.+?)]]/);
      if (m && m[1]) id = m[1];
    }
    let imgname = await this.getPageImageProp(id);
    return await this.getImageInfo(imgname);
  }
}

const STORE_KEY = "wikicache";

export class CachedWikiApi extends WikiApi {
  static instance = new CachedWikiApi();
  private memoryCache: { [key: string]: string } = {};

  constructor() {
    super();
    if (localStorage.getItem(STORE_KEY)) {
      this.memoryCache = JSON.parse(localStorage.getItem(STORE_KEY));
    }
  }

  protected putCache(key: string, value: string) {
    this.memoryCache[key] = value;
    localStorage.setItem(STORE_KEY, JSON.stringify(this.memoryCache));
  }

  /**
   * [overwrite] 获取页面真实的图片地址
   *
   * @param {string} id
   * @returns
   * @memberof CachedWikiApi
   */
  async getMainImage(id: string) {
    if (this.memoryCache[id]) return this.memoryCache[id];
    let rst = await super.getMainImage(id);
    if (rst) {
      this.putCache(id, rst);
      return rst;
    }
    return null;
  }
}
