/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

/**
 * 注意：本文件必须是「脚本」文件（末尾不能有 import/export），
 * 否则 `declare module "*.xxx"` 会从全局环境声明退化成模块增强而失效。
 * 需要在模块上下文里做的 `declare module "vue"` 增强请放 src/global.d.ts。
 */

/** data/dist/*.data —— 二进制数据文件，import 得到资源 URL */
declare module "*.data" {
  const url: string;
  export default url;
}

/** data/src/proto/*.proto —— 由 vite.config.ts 的 protoPlugin 处理，运行时解析为 protobufjs Root */
declare module "*.proto" {
  import type { Root } from "protobufjs";
  const root: Root & { [key: string]: any };
  export default root;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/** v3-tour 未提供类型声明 */
declare module "v3-tour" {
  import type { Plugin } from "vue";
  const plugin: Plugin;
  export default plugin;
}