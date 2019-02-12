<template>
  <div class="eula-container">
    <el-card class="eula">
      <span slot="header">最终用户许可协议</span>
      <div class="content">
        使用该软件(网站)，即表明您同意接受本协议的全部条款。
        1. 用户可以以个人名义随意使用本软件(网站)，但不得用于商业用途<br>
        2. 用户因滥用或错误应用导致的直接或间接损失本软件(网站)概不负责<br>
        2. 用户不得对本软件(网站)代码进行反编译、修改、创建衍生作品或二次发布<br>
        4. 任何违反最终用户许可协议（EULA）的用户无权使用本软件(网站)<br>
      </div>
    </el-card>
    <br>
    <el-card class="eula">
      <span slot="header">隐私政策</span>
      <div class="content">
        若非必要，软件不会以任何形式读取或保存你的个人信息，以下是例外情况：<br>
        1. 用户主动授权<br>
        2. 用户在使用需要用户信息才能正常工作的功能时，视为用户已授权
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {

}
</script>
<style lang="less">

</style>
