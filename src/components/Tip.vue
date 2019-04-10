<template>
  <el-tooltip class="item" effect="dark" :content="content" placement="top">
    <i class="el-icon-question"></i>
  </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class Tip extends Vue {
  @Prop() content;
}
</script>
