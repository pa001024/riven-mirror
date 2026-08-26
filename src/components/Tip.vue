<template>
  <el-tooltip effect="dark" :content="content" placement="top">
    <i class="el-icon-question"></i>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
@Component({})
class Tip extends Vue  {
  @Prop() content;
}

export default toNative(Tip);
</script>
