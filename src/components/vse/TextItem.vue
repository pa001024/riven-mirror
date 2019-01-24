<template>
  <CommonItem :bind="bind" :keyName="keyName" :defaultValue="''" :required="required">
    <el-input v-model="bind[keyName]" placeholder="请输入描述"></el-input>
  </CommonItem>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import CommonItem from "@/components/vse/CommonItem.vue";

@Component({ components: { CommonItem } })
export default class TextItem extends Vue {
  @Model() bind
  @Prop() keyName: string;
  @Prop({ type: Boolean }) required: boolean;
}

</script>
