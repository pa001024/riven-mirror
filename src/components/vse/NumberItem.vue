<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="{value:0}" :required="required">
    <AbilityPropValueEditor v-model="bind[keyName]" />
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem, AbilityPropValueEditor } })
export default class NumberItem extends Vue {
  @Model() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

</script>
