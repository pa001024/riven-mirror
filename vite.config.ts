import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { VitePWA } from "vite-plugin-pwa";
import autoprefixer from "autoprefixer";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

/**
 * 把 `.proto` 文件编译成一个运行时用 protobufjs 解析的模块。
 * 取代 webpack 时代的 protobuf-preloader。
 *
 * import proto from "xxx.proto"  ->  protobufjs Root（可直接 proto.Weapons.decode(...)）
 */
function protoPlugin(): Plugin {
  return {
    name: "riven:proto-loader",
    enforce: "pre",
    async load(id) {
      const file = id.split("?")[0];
      if (!file.endsWith(".proto")) return null;
      const source = await readFile(file, "utf-8");
      return [
        `import * as protobufNS from "protobufjs";`,
        `const protobuf = protobufNS.default ?? protobufNS;`,
        `const root = protobuf.parse(${JSON.stringify(source)}).root;`,
        `export default root;`,
      ].join("\n");
    },
  };
}

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig(({ command, mode }) => ({
  // web 部署用绝对路径（history 模式深链接需要 /assets/... 可解析）；
  // Electron 走 file:// 时相对 base 才有效，electron:build 用 --mode electron 触发
  base: mode === "electron" ? "./" : "/",
  resolve: {
    alias: {
      "@": r("./src"),
      // sha.js 等 CJS 依赖 require('buffer')，Vite 默认把 node 内置 externalize 成空 stub，
      // 导致浏览器里 Buffer.from 崩掉（模块图求值失败 -> 应用永远停在 loading）。
      // 用 feross/buffer 的浏览器版 polyfill 顶上。
      buffer: "buffer/",
    },
  },
  // data/dist/weapons.data 之类的二进制数据按静态资源处理，import 得到 URL
  assetsInclude: ["**/*.data"],
  plugins: [
    protoPlugin(),
    vue(),
    vueJsx({
      // .tsx 里的类组件用了 legacy 装饰器（vue-facing-decorator），
      // 而 vue-jsx 走 babel 管道，必须显式开启装饰器解析与转换
      babelPlugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-transform-class-properties", { loose: true }],
      ],
    }),
    VitePWA({
      strategies: "generateSW",
      registerType: "prompt",
      injectRegister: null,
      // 复用 public/manifest.json，不让插件再生成一份
      manifest: false,
      disable: command === "serve",
      workbox: {
        cacheId: "rm",
        globPatterns: ["**/*.{js,css,html,woff2,ttf,otf,png,svg,json}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:png|jpe?g|gif|webp|ttf|otf|woff2?)$/,
            handler: "CacheFirst",
            options: { cacheName: "rm-assets", expiration: { maxEntries: 400, maxAgeSeconds: 60 * 86400 } },
          },
          {
            urlPattern: /.*\.(?:svg|json)$/,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "rm-data" },
          },
          {
            urlPattern: /^https:\/\/cdn\.riven\.im\/.+/,
            handler: "CacheFirst",
            options: { cacheName: "rm-cdn", cacheableResponse: { statuses: [0, 200] }, expiration: { maxEntries: 200 } },
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    // element-plus / vue-i18n 会读这些标志
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
    // buffer polyfill 内部引用 `global`（Vite 会把 define 一并应用到预打包依赖）
    global: "globalThis",
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      input: {
        main: r("./index.html"),
        cn: r("./index.cn.html"),
      },
      output: {
        // Vite 8（rolldown）只接受函数形式的 manualChunks，对象形式已在 Rollup 4+ 废弃
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("element-plus")) return "element";
            if (id.includes("echarts")) return "echarts";
            if (id.includes("@tonejs/midi") || id.includes("node_modules/tone/")) return "tone";
            if (id.includes("vue-router") || id.includes("vuex") || id.includes("vue-i18n") || id.includes("/vue/") || id.includes("@vue/")) return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 8080,
  },
}));
