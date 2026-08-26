<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="{value:0}" :required="required">
    <AbilityPropValueEditor v-model="bind[keyName]" />
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem, AbilityPropValueEditor } })
class NumberItem extends Vue  {
  @Prop() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

export default toNative(NumberItem);
</script>
