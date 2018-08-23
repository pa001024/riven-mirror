<template>
  <el-tabs class="timeline-tabs">
    <el-tab-pane name="文字">
      <span slot="label" class="enemy-tablabel">文字</span>
    </el-tab-pane>
    <el-tab-pane name="表格">
      <span slot="label" class="enemy-tablabel">表格</span>
    </el-tab-pane>
    <el-tab-pane name="图表">
      <span slot="label" class="enemy-tablabel">图表</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";


@Component
export default class EnemyTimeline extends Vue {

}

</script>
