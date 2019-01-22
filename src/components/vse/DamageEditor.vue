<template>
  <div class="damage-editor">
    <div class="damage-item" :key="index" v-for="(dmg, index) in dmgs">
      <el-select class="damage-type" v-model="dmgs[index][0]" placeholder="请选择">
        <el-option
          :key="DT_TYPE" v-for="DT_TYPE in DT_TYPES"
          :label="$t(`elements.${DT_TYPE}`)"
          :value="DT_TYPE">
          <WfIcon :type="DT_TYPE.toLowerCase()" />
          <span>{{ $t(`elements.${DT_TYPE}`) }}</span>
        </el-option>
      </el-select>
      <AbilityPropValueEditor v-model="dmgs[index][1]" />
      <el-button type="danger" icon="el-icon-delete" circle @click="dmgs.splice(index, 1)"></el-button>
    </div>
    <div class="new-damage-item">
      <el-button type="primary" icon="el-icon-plus" @click="addnewdamage">添加新伤害类型</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { AbilityPropValue } from "@/warframe/codex";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";

@Component({ components: { AbilityPropValueEditor } })
export default class DamageEditor extends Vue {
  @Model() dmgs: [string, AbilityPropValue][]
  get DT_TYPES() {
    return ["Impact", "Puncture", "Slash", "Cold", "Electricity", "Heat", "Toxin", "Blast", "Corrosive", "Gas", "Magnetic", "Radiation", "Viral", "True", "Void",]
  }
  addnewdamage() {
    this.dmgs.push(["Impact", { value: 0 }])
  }
}

</script>

<style lang="less" scoped>
.damage-item {
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 12px;
  .damage-type,
  .ability-prop-value-editor {
    margin-right: 8px;
  }
}
.new-damage-item {
  display: inline-block;
}
</style>

