<template>
  <el-input class="copytext-input" :value="text" :size="size as any" ref="copytext" @focus="($refs.copytext as any).select()">
    <template #append
      ><el-button @click="doCopy"> <WfIcon type="copy" />{{ $t("app.copy") }} </el-button></template
    >
  </el-input>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import copy from "copy-text-to-clipboard";

@Component
class CopyText extends Vue {
  @Prop() text: string;
  @Prop() size: string;
  @Prop() message: string;
  doCopy() {
    copy(this.text);
    (this.$refs.copytext as any).select();
    this.$message({
      showClose: true,
      message: this.message || (this.$t("app.copySuccess") as string),
      type: "success",
    });
  }
}

export default toNative(CopyText);
</script>
<style lang="less">
.copytext-input {
  .el-input-group__append {
    padding: 0 8px;
  }
}
</style>
