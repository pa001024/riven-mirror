<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="[]" :required="required">
    <EffectEditor v-model="bind[keyName]" />
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import EffectEditor from "@/components/vse/EffectEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem, EffectEditor } })
class DamageItem extends Vue  {
  @Prop() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

export default toNative(DamageItem);
</script>
