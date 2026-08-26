/**
 * Electron 主进程独立构建配置。
 * 取代已停止维护的 vue-cli-plugin-electron-builder。
 *
 *   npm run electron:build  ->  先构建渲染进程(dist/)，再用本配置构建主进程(dist-electron/)
 */
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    outDir: "dist-electron",
    emptyOutDir: true,
    target: "node20",
    minify: false,
    lib: {
      entry: fileURLToPath(new URL("./src/background.ts", import.meta.url)),
      formats: ["cjs"],
      fileName: () => "background.js",
    },
    rollupOptions: {
      external: ["electron", "node:path", "node:url", "path", "url", "fs"],
    },
  },
});
