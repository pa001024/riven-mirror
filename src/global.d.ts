import "lodash";

declare interface HMTStatic {
  id: string
  cmd: { [key: string]: { push: Function } }
  push: (param: any[]) => void
}
declare global {
  const _: _.LoDashStatic;
  const _hmt: HMTStatic;
}
declare module 'vue/types/vue' {
  interface Vue {
  /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
    $tours: any
  }
}
