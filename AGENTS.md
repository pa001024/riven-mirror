# AGENTS.md

面向 AI coding agent 的项目说明。人类读者请看 [README.md](./README.md) / [README.zhCN.md](./README.zhCN.md)。

## 1. 项目是什么

**Riven Mirror（极镜）** —— Warframe 的裂罅 MOD（Riven Mod）分析与配装计算器。

核心价值不在 UI，而在 `src/warframe/` 下那套**游戏伤害数学模型**：识别玄卡词条、计算加成、穷举最优 MOD 组合、模拟对敌伤害曲线。UI 只是这套模型的展示层。

改动业务逻辑前请先理解 `src/warframe/modbuild.ts` 与 `src/warframe/codex/`，不要凭直觉改公式。

## 2. 技术栈

| 领域 | 选型 |
| --- | --- |
| 框架 | Vue 3（`<script lang="ts">` + **类组件**） |
| 类组件 | `vue-facing-decorator`（不是 vue-property-decorator） |
| 构建 | Vite + `@vitejs/plugin-vue` + `@vitejs/plugin-vue-jsx` |
| 语言 | TypeScript（`strict: false`，legacy 装饰器） |
| UI 库 | Element Plus（全量注册） |
| 状态 | Vuex 4 |
| 路由 | Vue Router（history 模式） |
| i18n | vue-i18n（**legacy 模式**，模板里用 `$t` / `$d`） |
| 样式 | Less |
| 图表 | ECharts 6（按需 `use()` 注册） |
| 桌面端 | Electron + electron-builder（`vite-plugin-electron`） |
| PWA | `vite-plugin-pwa`（injectManifest，自定义 `sw.js`） |

## 3. 命令

包管理器是 **bun**（锁文件 `bun.lock`），不要用 npm/yarn：

```bash
bun install          # 装依赖（含 data 子模块请先 git submodule update --init）
bun run dev          # 开发服务器
bun run build        # 生产构建 -> dist/
bun run type-check   # vue-tsc 类型检查（构建不做类型检查，改完请手动跑）
bun run electron:dev # Electron 开发
bun run electron:build
```

数据子模块（`data/`，独立 git 仓库 `riven-mirror-data`，同样用 bun）：

```bash
cd data
bun install
bun run fetch      # 从 DE 官方 API + Wiki 抓原始数据 -> tmp/（需要外网）
bun run build      # 生成 dist/*.json 与 dist/weapons.data（protobuf 二进制）
bun run build:all  # clean + fetch + build
```

注意：`data` 的 `build` 在缺少 `tmp/` 抓取数据时会跳过依赖原始数据的步骤（STEP2/STEP3），只重新编码 protobuf。

## 4. 目录地图

```
src/
├── warframe/            ★ 领域核心，纯 TS，不依赖 Vue
│   ├── codex/           静态游戏数据 + 数据类（武器/战甲/MOD/敌人/词条…）
│   │   ├── *.data.ts    手工维护的数据表（体积大，改动请谨慎）
│   │   ├── weapon.ts    WeaponDatabase：加载 protobuf 武器数据
│   │   └── index.ts     Codex 门面 + 统一 re-export
│   ├── modbuild.ts      ★ 配装计算基类（加成叠加、面板计算）
│   ├── gunmodbuild.ts / meleemodbuild.ts / warframebuild.ts / companionbuild.ts
│   │                    各类型配装的具体实现
│   ├── rivenmod.ts      ★ 裂罅 MOD 解析 / 评分 / 生成
│   ├── status.ts        异常状态（触发/叠层）
│   ├── translate.ts     游戏术语本地化（Translator）
│   └── worldstat.ts     世界状态（警报/裂缝）
├── components/          通用组件（33 个）+ vse/（技能编辑器子组件）
├── views/               页面级组件
│   ├── build/           配装编辑器（BaseBuildEditor.ts 是共享基类）
│   ├── buildview/       配装只读展示
│   └── music/           Shawzin 乐器编辑器（Tone.js）
├── store/               Vuex：modules/{mod,user,theme,build}.ts（class 形式的 Module）
├── i18n/                lang/*.json + plugin.ts（动态加载语言包）
├── search/              全局搜索 + 拼音首字母匹配
├── service/             外部服务（HMT 统计、wiki 抓取、user API）
├── less/                全局样式，ele/ 下是 Element 主题覆写
├── main.ts              应用装配入口
└── background.ts        Electron 主进程

data/                    git submodule：数据抓取与构建流水线
└── dist/                产物，被 src 直接 import
```

## 5. 关键约定（必须遵守）

### 5.1 组件一律写成类组件

```vue
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-facing-decorator";
import Child from "@/components/Child.vue";

@Component({ components: { Child } })
export default class MyView extends Vue {
  @Prop() value: string;        // props
  count = 0;                    // data
  get double() { return this.count * 2; }   // computed
  @Watch("value") onChange() {} // watch
  mounted() {}                  // 生命周期
}
</script>
```

- **不要**改写成 `defineComponent` / `<script setup>` / Composition API。全项目 73 个组件风格统一，混用会让维护成本爆炸。
- 一个方法上**不要**叠多个 `@Watch`，`vue-facing-decorator` 不支持；写 `@Watch("a", ...)` 分开或在方法里合并逻辑。
- 基类（如 `BaseBuildEditor`）必须用 `@Component` 装饰，子类通过 `extends` 继承。

### 5.2 Vuex 通过 `this.$store` 访问

本项目**不用** `vuex-class`（它不兼容 Vue 3）。写法：

```ts
get bigScreen(): boolean { return this.$store.getters.bigScreen; }
setBuild(build: ModBuild) { return this.$store.dispatch("setBuild", build); }
```

### 5.3 i18n

- 模板里用 `$t("key")`、`$d(date, "short")`。
- TS 里用 `import { i18n } from "@/i18n"` 这个 **Proxy 单例**（`i18n.t()` / `i18n.te()`），它包了 vue-i18n 实例，游戏术语翻译走 `Translator`。
- 语言包在 `src/i18n/lang/`，切换语言走 `changeLocale()` 动态 import。

### 5.4 特殊 import（Vite 插件支撑）

```ts
import data from "../../../data/dist/weapons.data";   // -> 资源 URL（assetsInclude）
import proto from "../../../data/src/proto/weapon.proto"; // -> protobufjs Root（自定义插件）
```

`.proto` 由 `vite.config.ts` 里的 `protoPlugin()` 在编译期内联源码、运行时 `protobuf.parse()`，产出的默认导出可直接 `proto.Weapons.decode(...)`。

### 5.5 Element Plus 注意点

- `el-dialog` 用 `v-model`（不是 `:visible.sync`）。
- 具名插槽用 `<template #footer>`（不是 `slot="footer"`）。
- `el-radio` / `el-option` 的选项值用 `value`（不是 `label`）。
- 文字按钮是 `link`（不是 `type="text"`）。
- `this.$message` / `this.$confirm` / `this.$notify` 仍可用（全量安装注册了 globalProperties）。

### 5.6 代码风格

Prettier：`printWidth: 160`、双引号、分号、`arrowParens: "avoid"`。缩进 2 空格，LF，UTF-8。

改完代码跑 `npx prettier --write <file>`，不要手动对齐。

## 6. 数据流

```
DE 官方 MobileExport API ─┐
Warframe Wiki (fandom)  ─┼─> data/ bun run fetch ─> data/tmp/*.json
灰机 Wiki（中文词条）    ─┘
                              │
                              ├─ bun run build ─> data/dist/weapons.data (protobuf)
                              │                   data/dist/{mods,weapons,disposition,zh-*}.json
                              ▼
        src/warframe/codex/weapon.ts  WeaponDatabase.loadDataOnline()
                              │  本地构建资产 URL 优先，CDN 兜底，再回落 localStorage 缓存
                              ▼
                     Weapon / NormalMod 等领域对象
                              ▼
                  ModBuild 子类（配装计算）→ 视图层
```

**注意**：`weapons.data` 走「本地构建资产 URL → CDN → localStorage」三通道，CDN（`api.riven.im`）已失效（返回域名停靠页或网络失败），实际正常路径是本地资产。改数据格式必须同步改 `weapon.proto` 与 `weapon.i.ts`。

**weaponmode 翻译**：`data/src/build.ts` 的 `wikia-Weapons.json` case 会额外导出 `data/dist/weaponmode.json`——从武器数据收集全部 mode 名（lodash `camelCase` 生成 key，与应用 `weapon.ts:129` / `kitgun.ts:296` 的 locKey 完全一致），英文取自数据原始 mode 名，中文查 `data/src/patch/weaponmode.json`（按 lodash key 维护），缺失回退英文。

**翻译同步工具 `scripts/sync-i18n.ts`**（`bun run sync:i18n`，幂等）：把 `data/dist/` 的中文翻译同步进 `src/i18n/lang/*.json`——
- `data/dist/zh-Hans.json`（应用 messages 快照 + 灰机新增武器名）→ 只**补缺失**进 `zh-Hans.json` 的 `messages` 块（应用 messages 是维护基准，已有值不覆盖；`--hant` 时同样补进 `zh-Hant.json`，简转繁）；
- `data/dist/weaponmode.json` → 覆盖合并 `en/zh-Hans/zh-Hant` 的 `weaponmode` 块（`default` 保留各语言现有译法）。
- 语言文件由脚本生成：`JSON.stringify(,2)` 展开格式 + CRLF，工具保持原文件换行，不做 prettier 重排。
- 常规流程：`cd data && bun run build`（若抓到了新武器名）→ `bun run sync:i18n`。不要在语言文件里手写新 mode 翻译（会被覆盖）。

**fetch 机制**：`data/src/fetch.ts` 双通道——先试普通 HTTP raw（居民网络最快），失败的用 **Bun.WebView 无头浏览器**（Windows 走 Chrome）过 Cloudflare 挑战再抓；WebView 每次运行用独立 profile（避免残留 Chrome 锁），navigate/evaluate 都带超时防挂死。判定成败按 **body 内容**而非 HTTP 状态码（fandom 概率性 403 但 body 可能是真实数据）。`Module:Weapons/data` 是分发器，真实武器数据在 `Module:Weapons/data/{primary,secondary,melee,archwing,companion,railjack,modular,misc}` 8 个分区里，`build.ts` 的 `wikia-Weapons.json` case 会合并它们。灰机（huijiwiki）对数据中心 IP 有 Cloudflare「Under Attack Mode」全站拦截（`api.php` 也 403），抓不到时 `zh-Hans` 保持旧值、构建照样通过（应用不 import 这些文件）；`Data:DictCY.tab` 已 404，`zh-CY.json` 不再更新。

## 6.1 静态图片 / 音频资源（本地化，不走 OSS）

部件图标、星球背景、乐器采样已**全部下载到 `public/`**，运行时不再依赖任何外链 OSS：

```
public/img/<name>.m.png              部件图标 + 星球背景（<planet>-<day|night>.m.jpg）
public/instruments/<inst>/<note>.mp3 乐器采样（piano / shawzin / lotus）
```

引用一律用**公共根路径** `/img/...`、`/instruments/...`（与 `app.less` / `ErrorPage` 既有写法一致）。涉及文件：

| 文件 | 用途 |
| --- | --- |
| `src/components/{Amp,Moa,Kitgun,Zaw}Builder.vue` | 部件图标，按数据表 `name`/`id` 拼 URL |
| `src/less/alert.less`、`src/components/MiniClock.vue` | 星球背景 / 通知图标 |
| `src/views/music/MusicEdit.vue` | `instrumentResource` 的采样目录 |

**文件名拼接规则**（改数据表时要注意，拼错就 404）：

- Amp / Moa：`/img/${lodash camelCase(name)}.m.png`（如 `Raplak Prism` → `raplakPrism`）
- Kitgun / Zaw：`/img/<前缀>${name 去空格}.m.png`，前缀分别是
  `kitgunChamber|kitgunGrip|kitgunLoader`、`zawStrike|zawGrip|zawLink`
- Zaw 环接部第二处替换：`name.replace(/II/g, "2")`（`Jai II` → `zawLinkJai2`）

配套脚本（新增/刷新/校验资源时用）：

```bash
bun scripts/download-oss-assets.mjs   # 从原 OSS 重新拉取全部资源到 public/
bun scripts/verify-local-assets.mjs   # 从 src 数据表独立推导文件名，比对 public/ 是否齐
```

`verify-local-assets.mjs` 是防回归的关键：它不读模板，而是**从 `amp.ts`/`moa.ts`/`kitgun.ts`/`zaw.ts` 的 name 字段重新推导**期望文件名，因此能抓住拼接规则写错的情况。改动 builder 模板的 URL 规则后请同步更新它。

## 7. 常见坑

1. **`data/` 是 git submodule**，clone 后要 `git submodule update --init --recursive`，否则 `src/warframe/codex/weapon.ts` 的 import 直接挂。
2. **`data/` 的 fetch 依赖外网**（`content.warframe.com`、`warframe.fandom.com`、`warframe.huijiwiki.com`）。抓取失败先确认网络，别急着改代码。
3. **`*.data.ts` 文件动辄上千行**，全文读取很烧 context，用 Grep 定位再局部 Read。
4. **两个 HTML 入口**：`index.html`（国际）与 `index.cn.html`（国服），改 meta / 统计脚本要同时改。
5. **类型检查不在构建链上**。`bun run build` 不做类型检查，光构建通过不代表类型没问题，改完跑 `bun run type-check`。
6. **`strict: false`**，大量隐式 any。不要为了"修类型"顺手打开 strict，会炸出上千个错误。
7. **Node 内置模块会被 Vite externalize**：像 `sha.js` 这类 CJS 依赖在顶层 `require('buffer')`，浏览器里得到空 stub 导致 `Buffer.from` 直接崩，模块图求值失败、应用永远停在 loading 转圈（连 console 错误都不一定打出来）。已在 `vite.config.ts` 里 alias `buffer: "buffer/"` + `define: { global: "globalThis" }` 修掉。新加依赖若仍 import `fs`/`buffer`/`path` 等内置模块，启动时若报 "has been externalized" 警告要按同样思路处理（装对应 polyfill 或换浏览器版实现）。
8. **`bun run build` 通过 ≠ 应用能跑**。构建不做类型检查（见第 5 条），也不验证运行时挂载。迁移类改动后建议用 `bun run dev` + 无头浏览器（Bun.WebView）实际加载页面确认 `#app` 不再停留在 `cssloading`。
9. **模板里的表达式写错，构建一样通过**。Vite 不校验模板内的 JS 表达式/变量是否存在。批量改 `<img :src="...">` 这类字符串模板时，若残留未定义变量（如 `${base}`），`bun run build` 照样成功，但运行时 URL 会变成 `undefinedimg/...`、图片静默全挂。**改完必须 grep 复查模板 + 实跑资源 URL**（见 6.1 的 `verify-local-assets.mjs`）。
10. **本机 shell 的 `sed` 匹配不了含 `${...}` 的模式**（`${base}`、`\${base}`、`[$]{base}` 全部不生效，而单独匹配 `img` 正常，疑似 Bash 包装层对 `${}` 做了处理）。**批量文本替换改用 Python 脚本**（`io.open(path, newline="")` 保持原换行），别跟 sed 较劲。
11. **别对从未格式化过的文件跑 prettier**。部分老组件（如 `MiniClock.vue`）历史上没走过 prettier，直接 `prettier --write` 会引入上百行无关 churn（`{{$t()}}` → `{{ $t() }}`、加尾逗号等）。这类文件只手工改目标行；仅对已是 prettier 风格的文件跑格式化。

## 8. 修改边界

| 想做的事 | 该动哪里 |
| --- | --- |
| 加/改武器、MOD、战甲数据 | `data/`（子模块）或 `src/warframe/codex/*.data.ts` |
| 改配装算法、伤害公式 | `src/warframe/modbuild.ts` 及其子类 |
| 改裂罅识别 / 评分 | `src/warframe/rivenmod.ts` |
| 加页面 | `src/views/` + `src/router/index.ts` |
| 加翻译 | `src/i18n/lang/*.json`（四个文件都要加） |
| 改主题/暗色模式 | `src/less/` + `src/store/modules/theme.ts` |
