<template>
  <el-popover placement="bottom" trigger="click">
    <el-input class="shareqr-input" :value="url" size="mini" ref="miniCodeURL" @focus="$refs.miniCodeURL.select()" style="margin-bottom: 8px;">
      <el-button slot="append" @click="doCopy">
        <WfIcon type="copy" />{{$t("app.copy")}}
      </el-button>
    </el-input>
    <div style="text-align:center;">
      <qrcode :value="url" :options="{ size: 150, foreground: '#333' }"></qrcode>
    </div>
    <div style="text-align:center;">
      {{$t("riven.sharetip")}}
    </div>
    <i slot="reference" class="el-icon-share share-icon"></i>
  </el-popover>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import copy from "copy-text-to-clipboard";

@Component
export default class ShareQR extends Vue {
  @Prop() url: string;
  doCopy() {
    copy(this.url);
    (this.$refs.miniCodeURL as any).select();
    this.$notify.success(this.$t("app.copySuccess") as string);
  }
}
</script>
<style lang="less">
.shareqr-input {
  .el-input-group__append {
    padding: 0 8px;
  }
}
</style>
