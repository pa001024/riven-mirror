/// <reference types="element-plus/global" />

import { WeaponDatabase } from "./warframe/codex";
import type { Store } from "vuex";
import type RootState from "@/store/state";

declare interface HMTStatic {
  id: string;
  cmd: { [key: string]: { push: Function } };
  push: (param: any[]) => void;
}

declare global {
  // const _: _.LoDashStatic;
  const _hmt: HMTStatic;
  // const WeaponDatabase: WeaponDatabase;
}

/**
 * 全局属性增强（Vue 3 的 ComponentCustomProperties 会被
 * ComponentPublicInstance / vue-facing-decorator 的 Vue 基类拾取）。
 * $message/$confirm 等由上面 element-plus/global 提供；
 * $route/$router 由 vue-router 类型提供；$t/$d 由 vue-i18n 类型提供。
 */
declare module "vue" {
  interface ComponentCustomProperties {
    /** Vuex 4 需要在 4.1+ 才自带增强，这里显式声明 */
    $store: Store<RootState>;
    /** v3-tour 注入 */
    $tours: Record<string, { start: (step?: string) => void; stop: () => void; nextStep: () => void; previousStep: () => void }>;
  }
}

/** TSX 里用 vShow 属性表示 v-show 指令（@vue/babel-plugin-jsx 支持），补上类型 */
declare module "@vue/runtime-dom" {
  interface HTMLAttributes {
    vShow?: boolean;
  }
}

export {};