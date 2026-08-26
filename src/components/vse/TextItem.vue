<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="''" :required="required">
    <el-input v-model="bind[keyName]" placeholder="请输入描述"></el-input>
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem } })
class TextItem extends Vue  {
  @Prop() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

export default toNative(TextItem);
</script>
