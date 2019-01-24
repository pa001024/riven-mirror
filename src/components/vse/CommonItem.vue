<template>
  <el-form-item :label="$t('ability.props.'+keyName)" :required="required">
    <template v-if="typeof bind[keyName] !== 'undefined'">
      <div class="common-item-body">
        <slot></slot>
      </div>
      <el-button type="danger" icon="el-icon-delete" @click="$delete(bind, keyName)"></el-button>
    </template>
    <el-button v-else type="primary" icon="el-icon-edit" @click="$set(bind, keyName, defaultValue)">新增属性</el-button>
  </el-form-item>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";

@Component({ components: { AbilityPropValueEditor } })
export default class CommonItem extends Vue {
  @Model() bind
  @Prop() keyName: string;
  @Prop() defaultValue: any;
  @Prop({ type: Boolean }) required: boolean;
}

</script>
<style lang="less" scoped>
.common-item-body {
  display: inline-block;
  margin-right: 8px;
}
</style>
