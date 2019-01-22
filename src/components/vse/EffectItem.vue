<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="[]">
    <EffectEditor v-model="bind[keyName]" />
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import EffectEditor from "@/components/vse/EffectEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem, EffectEditor } })
export default class DamageItem extends Vue {
  @Model() bind
  @Prop() keyName: string;
}

</script>
