<template>
  <div class="ability-prop-value-editor">
    <el-input-number class="value" v-model="bindValue" placeholder="请输入数值" :controls="false" />
    <el-checkbox class="binded" v-model="binded">{{binded ? "绑定到" : "固定值"}}</el-checkbox>
    <el-select v-if="binded" class="bindto" v-model="bindto" placeholder="请选择">
      <el-option :key="WP_TYPE" v-for="WP_TYPE in WP_TYPES" :label="$t(`prop.shortName.${WP_TYPE}`)" :value="WP_TYPE" />
    </el-select>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { AdvancedAbilityPropValue, WarframeProperty } from "@/warframe/codex";
import { i18n } from "@/i18n";

@Component({})
export default class AbilityPropValueEditor extends Vue {
  @Model() apv: AdvancedAbilityPropValue

  get binded() { return typeof this.apv.bind === "object"; }
  set binded(value) {
    if (value) {
      Vue.set(this.apv, "bind", [[WarframeProperty.AbilityStrength, 0]]);
    } else {
      Vue.delete(this.apv, "bind");
    }
  }

  get WP_TYPES() {
    return [
      WarframeProperty.Health,
      WarframeProperty.Armor,
      WarframeProperty.AbilityStrength,
      WarframeProperty.AbilityDuration,
      WarframeProperty.AbilityEfficiency,
      WarframeProperty.AbilityRange,
    ]
  }

  get bindto() {
    return this.apv.bind[0][0]
  }
  set bindto(value) {
    this.apv.bind = [[value, 0]];
  }

  get bindValue() {
    return this.apv.value;
  }
  set bindValue(value) {
    this.apv.value = value;
  }
}

</script>

<style lang="less" scoped>
.ability-prop-value-editor {
  display: inline-flex;
  .bindto,
  .binded {
    margin-left: 8px;
  }
}
</style>

