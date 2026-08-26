<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="0" :required="required">
    <el-select v-model="bind[keyName]" placeholder="请选择">
      <el-option label="所有" :value="0"/>
      <el-option label="远程攻击" :value="1"/>
      <el-option label="近战" :value="2"/>
      <el-option label="抛射物" :value="3"/>
    </el-select>
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem } })
class TargetItem extends Vue  {
  @Prop() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

export default toNative(TargetItem);
</script>
