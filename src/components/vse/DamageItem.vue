<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="[]" :required="required">
    <DamageEditor v-model="bind[keyName]" />
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import DamageEditor from "@/components/vse/DamageEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem, DamageEditor } })
class DamageItem extends Vue  {
  @Prop() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

export default toNative(DamageItem);
</script>
