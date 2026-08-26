<template>
  <el-popover placement="bottom" trigger="click">
    <CopyText :text="url" size="small" style="margin-bottom: 8px;"/>
    <div style="text-align:center;">
      <qrcode :value="url" :options="{ size: 150, foreground: '#333' }"></qrcode>
    </div>
    <div style="text-align:center;">
      {{$t("riven.sharetip")}}
    </div>
    <template #reference><i class="el-icon-share share-icon"></i></template>
  </el-popover>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import CopyText from "./CopyText.vue";

@Component({ components: { CopyText } })
class ShareQR extends Vue  {
  @Prop() url: string;
}

export default toNative(ShareQR);
</script>
