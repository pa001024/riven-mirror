declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// iview 全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any
  }
}
