<template>
  <div class="eula-container">
    <el-card class="eula">
      <span slot="header">最终用户许可协议</span>
      <div class="content">
        1. 用户可以以个人名义随意使用本软件，但不得商用<br>
        2. 本软件是开源软件，开源的目的，并不是做慈善，而是通过更多人的参与，完善软件的缺陷<br>
        3. 用户因滥用或错误应用导致的直接或间接损失本软件概不负责<br>
        4. 任何违反最终用户许可协议（EULA）的用户无权使用本软件<br>
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
