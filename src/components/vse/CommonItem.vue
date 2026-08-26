<template>
  <el-form-item :label="$t('ability.props.'+keyName)" :required="required">
    <template v-if="typeof bind[keyName] !== 'undefined'">
      <div class="common-item-body">
        <slot></slot>
      </div>
      <el-button type="danger" @click="delete bind[keyName]"><i class="el-icon-delete"></i></el-button>
    </template>
    <el-button v-else type="primary" @click="bind[keyName] = defaultValue"><i class="el-icon-edit"></i>新增属性</el-button>
  </el-form-item>
</template>
<script lang="ts">
import { Vue, Component, Prop, toNative } from "vue-facing-decorator";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";

@Component({ components: { AbilityPropValueEditor } })
class CommonItem extends Vue  {
  @Prop() bind
  @Prop() keyName: string;
  @Prop() defaultValue: any;
  @Prop({ type: Boolean }) required: boolean;
}

export default toNative(CommonItem);
</script>
<style lang="less" scoped>
.common-item-body {
  display: inline-block;
  margin-right: 8px;
}
</style>
