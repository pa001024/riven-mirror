<template>
  <el-input class="copytext-input" :value="text" :size="size" ref="copytext" @focus="$refs.copytext.select()">
    <el-button slot="append" @click="doCopy">
      <WfIcon type="copy" />{{$t("app.copy")}}
    </el-button>
  </el-input>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import copy from "copy-text-to-clipboard";

@Component
export default class CopyText extends Vue {
  @Prop() text: string;
  @Prop() size: string;
  doCopy() {
    copy(this.text);
    (this.$refs.copytext as any).select();
    this.$message({
      showClose: true,
      message: this.$t("app.copySuccess") as string,
      type: "success"
    });
  }
}
</script>
<style lang="less">
.copytext-input {
  .el-input-group__append {
    padding: 0 8px;
  }
}
</style>
