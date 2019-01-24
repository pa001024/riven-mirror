<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="[]" :required="required">
    <DamageEditor v-model="bind[keyName]" />
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import DamageEditor from "@/components/vse/DamageEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem, DamageEditor } })
export default class DamageItem extends Vue {
  @Model() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

</script>
