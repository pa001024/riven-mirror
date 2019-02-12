<template>
  <el-popover placement="bottom" trigger="click">
    <CopyText :text="url" size="mini" style="margin-bottom: 8px;"/>
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
import CopyText from "./CopyText.vue";

@Component({ components: { CopyText } })
export default class ShareQR extends Vue {
  @Prop() url: string;
}
</script>
