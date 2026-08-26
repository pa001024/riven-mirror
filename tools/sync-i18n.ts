/**
 * 从 data/dist/ 同步中文翻译到 src/i18n/lang/
 *
 * 用法：
 *   bun run sync:i18n            # 同步 zh-Hans.json(武器/MOD 中文名) + weaponmode.json(武器模式)
 *   bun run sync:i18n --hant     # 额外把 messages 简转繁补入 zh-Hant（只补缺失，不覆盖现有繁体）
 *
 * 数据流：
 *   data/ bun run build
 *     ├─ dist/zh-Hans.json   = 应用 messages 快照 + 灰机新增（.merge(oldcn.messages, cnNames)）
 *     └─ dist/weaponmode.json = 武器模式翻译（en 取自数据，cn 查 src/patch/weaponmode.json）
 *   本工具把它们写回 src/i18n/lang/*.json，幂等（重复运行无变化）。
 *   data build 读应用语言文件作 base，所以「先 data build 再 sync」是收敛的闭环。
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LANG_DIR = path.join(ROOT, "src", "i18n", "lang");
const DATA_DIR = path.join(ROOT, "data", "dist");

const read = (p: string) => JSON.parse(fs.readFileSync(p, "utf-8"));
// 语言文件由脚本生成：JSON.stringify(,2) 展开格式，保持原文件换行风格（CRLF/LF），不做 prettier 重排
const write = (p: string, obj: unknown) => {
  const src = fs.readFileSync(p, "utf-8");
  const eol = src.includes("\r\n") ? "\r\n" : "\n";
  fs.writeFileSync(p, JSON.stringify(obj, null, 2).replace(/\n/g, eol) + eol, "utf-8");
};

// ---- 简转繁（覆盖武器名 / 武器模式翻译中出现的常用简体字） ----
const S2T: Record<string, string> = {
  伤: "傷", 决: "決", 冻: "凍", 准: "準", 击: "擊", 动: "動", 发: "發", 团: "團", 围: "圍", 圆: "圓", 场: "場",
  块: "塊", 头: "頭", 处: "處", 悬: "懸", 怜: "憐", 悯: "憫", 气: "氣", 触: "觸", 弹: "彈", 径: "徑", 态: "態",
  续: "續", 缩: "縮", 蚀: "蝕", 灵: "靈", 纵: "縱", 横: "橫", 独: "獨", 环: "環", 盘: "盤", 踪: "蹤", 远: "遠",
  转: "轉", 锁: "鎖", 须: "須", 电: "電", 标: "標", 战: "戰", 掷: "擲", 换: "換", 开: "開", 并: "並", 单: "單",
  剧: "劇", 体: "體", 云: "雲", 仓: "倉", 台: "臺", 时: "時", 热: "熱", 点: "點", 认: "認", 长: "長", 间: "間",
  铲: "鏟", 风: "風", 预: "預", 鱼: "魚", 范: "範", 离: "離", 础: "礎", 农: "農", 观: "觀", 卫: "衛", 飞: "飛",
  门: "門", 华: "華", 结: "結", 组: "組", 织: "織", 终: "終", 纪: "紀", 红: "紅", 绿: "綠", 蓝: "藍", 线: "線",
  维: "維", 纲: "綱", 约: "約", 经: "經", 级: "級", 纸: "紙", 纳: "納", 网: "網", 际: "際", 阶: "階", 随: "隨",
  险: "險", 队: "隊", 阴: "陰", 阳: "陽", 防: "防", 阵: "陣", 灭: "滅", 敌: "敵", 链: "鏈", 节: "節", 罗: "羅",
  张: "張", 紧: "緊", 缠: "纏", 绕: "繞", 绊: "絆", 缆: "纜", 绳: "繩", 练: "練", 缓: "緩", 迟: "遲", 延: "延",
  担: "擔", 负: "負", 变: "變", 仅: "僅", 价: "價", 众: "眾", 优: "優", 传: "傳", 伟: "偉", 伪: "偽", 侧: "側",
  侦: "偵", 侨: "僑", 俭: "儉", 储: "儲", 兽: "獸", 兴: "興", 写: "寫", 军: "軍", 冲: "衝", 况: "況", 减: "減",
  凑: "湊", 凛: "凜", 几: "幾", 凤: "鳳", 凯: "凱", 凿: "鑿", 刘: "劉", 则: "則", 刚: "剛", 创: "創", 删: "刪",
  别: "別", 剑: "劍", 剂: "劑", 划: "劃", 劲: "勁", 务: "務", 势: "勢", 勋: "勳", 协: "協", 卖: "賣", 压: "壓",
  厌: "厭", 县: "縣", 参: "參", 双: "雙", 叙: "敘", 叠: "疊", 叶: "葉", 号: "號", 叹: "嘆", 听: "聽", 启: "啟",
  吴: "吳", 呕: "嘔", 园: "園", 国: "國", 图: "圖", 圣: "聖", 坏: "壞", 坚: "堅", 坛: "壇", 坝: "壩", 坟: "墳",
  壮: "壯", 声: "聲", 壳: "殼", 备: "備", 复: "複", 夺: "奪", 奋: "奮", 奖: "獎", 奥: "奧", 妇: "婦", 妈: "媽",
  妆: "妝", 宁: "寧", 实: "實", 宠: "寵", 审: "審", 宪: "憲", 宫: "宮", 宽: "寬", 宾: "賓", 对: "對", 导: "導",
  寻: "尋", 寿: "壽", 将: "將", 尘: "塵", 尝: "嘗", 层: "層", 属: "屬", 屿: "嶼", 岁: "歲", 岂: "豈", 岗: "崗",
  岛: "島", 岭: "嶺", 币: "幣", 帅: "帥", 师: "師", 带: "帶", 帧: "幀", 帮: "幫", 干: "幹", 广: "廣", 归: "歸",
  当: "當", 录: "錄", 彦: "彥", 彻: "徹", 后: "後", 护: "護", 报: "報", 挂: "掛", 拦: "攔", 拟: "擬", 择: "擇",
  拧: "擰", 摄: "攝", 摆: "擺", 摇: "搖", 携: "攜", 败: "敗", 数: "數", 断: "斷", 无: "無", 旧: "舊", 显: "顯",
  晒: "曬", 晕: "暈", 书: "書", 会: "會", 条: "條", 来: "來", 极: "極", 构: "構", 样: "樣", 树: "樹", 档: "檔",
  检: "檢", 欢: "歡", 欧: "歐", 歼: "殲", 残: "殘", 毙: "斃", 汉: "漢", 汤: "湯", 沟: "溝", 沪: "滬", 沉: "沉",
  浅: "淺", 测: "測", 济: "濟", 浑: "渾", 浓: "濃", 浙: "浙", 浊: "濁", 浏: "瀏", 浇: "澆", 澜: "瀾", 灯: "燈",
  灿: "燦", 炉: "爐", 烂: "爛", 炼: "煉", 烧: "燒", 烦: "煩", 烫: "燙", 爱: "愛", 牺: "犧", 猎: "獵", 猪: "豬",
  献: "獻", 现: "現", 玺: "璽", 画: "畫", 畅: "暢", 疗: "療", 疯: "瘋", 痒: "癢", 盗: "盜", 盖: "蓋", 监: "監",
  矫: "矯", 码: "碼", 矿: "礦", 砖: "磚", 碍: "礙", 礼: "禮", 祸: "禍", 祷: "禱", 税: "稅", 稳: "穩", 穷: "窮",
  窃: "竊", 窍: "竅", 竞: "競", 笔: "筆", 笋: "筍", 筑: "築", 简: "簡", 类: "類", 粮: "糧", 纠: "糾", 纤: "纖",
  纷: "紛", 纶: "綸", 纱: "紗", 纹: "紋", 纺: "紡", 纽: "紐", 绀: "紺", 绅: "紳", 细: "細", 给: "給", 绚: "絢",
  绛: "絳", 络: "絡", 绝: "絕", 绞: "絞", 统: "統", 继: "繼", 绩: "績", 绪: "緒", 绰: "綽", 绵: "綿", 绷: "繃",
  绸: "綢", 综: "綜", 缀: "綴", 缄: "緘", 缅: "緬", 缉: "緝", 缘: "緣", 编: "編", 缔: "締", 缕: "縷", 缝: "縫",
  缴: "繳", 缰: "韁", 缱: "繾", 缵: "纘", 鸡: "雞", 鸭: "鴨", 鹅: "鵝", 鹏: "鵬", 丽: "麗", 麦: "麥", 黄: "黃",
  黑: "黑", 齐: "齊", 齿: "齒", 龄: "齡", 龙: "龍", 龟: "龜", 盐: "鹽", 碱: "鹼", 醋: "醋", 酱: "醬", 酿: "釀",
  酸: "酸", 甜: "甜", 苦: "苦", 辣: "辣", 咸: "鹹", 鲜: "鮮", 钢: "鋼", 铁: "鐵", 铜: "銅", 银: "銀", 锡: "錫",
  铅: "鉛", 锌: "鋅", 铝: "鋁", 镁: "鎂", 钙: "鈣", 钾: "鉀", 钠: "鈉", 锂: "鋰", 铍: "鈹", 硼: "硼", 碳: "碳",
  氮: "氮", 氧: "氧", 氟: "氟", 氖: "氖", 氩: "氬", 氪: "氪", 氙: "氙", 氡: "氡", 氦: "氦", 氢: "氫", 钴: "鈷",
  镍: "鎳", 锰: "錳", 铬: "鉻", 钒: "釩", 钛: "鈦", 铀: "鈾", 镭: "鐳", 钚: "鈈", 汞: "汞", 铂: "鉑", 钯: "鈀",
  银: "銀", 镉: "鎘", 铟: "銦", 铋: "鉍", 锑: "銻", 碲: "碲", 碘: "碘", 氙: "氙", 铯: "銫", 钡: "鋇", 镧: "鑭",
  铈: "鈰", 镨: "鐠", 钕: "釹", 钷: "鉕", 钐: "釤", 铕: "銪", 钆: "釓", 铽: "鋱", 镝: "鏑", 钬: "鈥", 铒: "鉺",
  铥: "銩", 镱: "鐿", 镥: "鑥", 铪: "鉿", 钽: "鉭", 钨: "鎢", 铼: "錸", 锇: "鋨", 铱: "銥", 铂: "鉑", 金: "金",
};

const s2t = (s: string) => [...s].map(ch => S2T[ch] || ch).join("");

const log = (msg: string) => console.log(`[sync-i18n] ${msg}`);

async function main() {
  const withHant = process.argv.includes("--hant");
  const zhsFile = path.join(LANG_DIR, "zh-Hans.json");

  // ---- 1) data/dist/zh-Hans.json -> zh-Hans.json 的 messages 块（武器/MOD 中文名） ----
  // 只补缺失：应用 messages 是长期维护的基准（含空格等规范），灰机词典仅在应用没有该词条时补入，
  // 不覆盖已有值（灰机原始值可能有格式退化，如 "侍刃Prime" 无空格）。
  const cnSrc = read(path.join(DATA_DIR, "zh-Hans.json"));
  const zhs = read(zhsFile);
  if (!zhs.messages || typeof zhs.messages !== "object") throw new Error("src/i18n/lang/zh-Hans.json 缺少 messages 块");
  let added = 0;
  for (const [k, v] of Object.entries(cnSrc)) {
    if (typeof v !== "string") continue;
    if (k in zhs.messages) continue;
    zhs.messages[k] = v;
    added++;
  }
  write(zhsFile, zhs);
  log(`zh-Hans.json messages: +${added} 新增 (共 ${Object.keys(zhs.messages).length})`);

  // ---- 1b) --hant: 补 zh-Hant.json 的 messages（只补缺失，简转繁，不覆盖现有繁体） ----
  if (withHant) {
    const zhtFile = path.join(LANG_DIR, "zh-Hant.json");
    const zht = read(zhtFile);
    if (!zht.messages || typeof zht.messages !== "object") throw new Error("zh-Hant.json 缺少 messages 块");
    let hAdded = 0;
    for (const [k, v] of Object.entries(cnSrc)) {
      if (typeof v !== "string") continue;
      if (k in zht.messages) continue;
      zht.messages[k] = s2t(v);
      hAdded++;
    }
    write(zhtFile, zht);
    log(`zh-Hant.json messages: +${hAdded} 新增 (简转繁, 共 ${Object.keys(zht.messages).length})`);
  }

  // ---- 2) data/dist/weaponmode.json -> en/zh-Hans/zh-Hant 的 weaponmode 块 ----
  const wmFile = path.join(DATA_DIR, "weaponmode.json");
  if (!fs.existsSync(wmFile)) {
    log(`跳过 weaponmode（${wmFile} 不存在，先 cd data && bun run build）`);
  } else {
    const wm = read(wmFile) as Record<string, { en: string; cn: string }>;
    const langs: Record<string, (v: { en: string; cn: string }) => string> = {
      en: v => v.en,
      "zh-Hans": v => v.cn,
      "zh-Hant": v => s2t(v.cn),
    };
    for (const [lang, pick] of Object.entries(langs)) {
      const file = path.join(LANG_DIR, `${lang}.json`);
      const j = read(file);
      if (!j.weaponmode || typeof j.weaponmode !== "object") j.weaponmode = {};
      let wmAdded = 0;
      let wmUpdated = 0;
      for (const [key, v] of Object.entries(wm)) {
        if (key === "default") continue; // default 保留各语言现有译法（Default/默认/預設）
        const existed = key in j.weaponmode;
        const value = pick(v);
        if (existed && j.weaponmode[key] === value) continue; // 值相同不计数（幂等）
        j.weaponmode[key] = value;
        if (existed) wmUpdated++;
        else wmAdded++;
      }
      write(file, j);
      log(`${lang}.json weaponmode: +${wmAdded} 新增, ${wmUpdated} 覆盖 (共 ${Object.keys(j.weaponmode).length})`);
    }
  }

  log("完成（重复运行幂等：新增/更新应为 0）");
}

main().catch(e => {
  console.error("[sync-i18n] 失败:", e);
  process.exit(1);
});