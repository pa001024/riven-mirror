<template>
  <div class="simulator">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 面板 -->
        <el-row>
          <el-col :span="24">
            <el-button class="simulator-new" type="primary" size="medium" icon="el-icon-plus" @click="simulatorNew">新裂罅MOD</el-button>
            <el-button class="simulator-roll" type="primary" size="medium" icon="el-icon-refresh" @click="simulatorRoll">循环</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod } from "@/warframe";

/** 倒计时 */
function countDown(sec = 5, tickCallback: (sec: number) => void) {
  return new Promise<void>((resolve, reject) => {
    let count = sec;
    let timer = setInterval(() => {
      tickCallback(count);
      if (--count <= 0) {
        clearInterval(timer);
        resolve();
      }
    }, 1e3);
    return
  })
}

@Component
export default class Simulator extends Vue {
  riven: RivenMod
  // === 事件处理 ===
  simulatorNew() {

  }
  simulatorRoll() {

  }
  // === 生命周期钩子 ===
  beforeMount() {

  }
}
</script>
<style>
</style>
