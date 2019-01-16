<template>
  <div class="visual-skill-container">
    <template v-if="id !== name">
      <div class="name">
        <a :href="huijiURL" target="_blank" rel="noopener noreferrer">{{name}}</a>
      </div>
      <div class="id">
        <a :href="wikiaURL" target="_blank" rel="noopener noreferrer">{{id}}</a>
      </div>
    </template>
    <div v-else class="name">
      <a :href="wikiaURL" target="_blank" rel="noopener noreferrer">{{name}}</a>
    </div>
    <div class="common">
      <el-form label-width="60px" size="small">
        <el-form-item :label="$t('ability.base')">
          <el-checkbox v-model="oneHand" :label="$t('ability.oneHand')"/>
        </el-form-item>
        <el-form-item :label="$t('ability.type')">
          <el-checkbox-group v-model="tags">
            <el-checkbox :label="$t('ability.types.damage')"></el-checkbox>
            <el-checkbox :label="$t('ability.types.buffDebuff')"></el-checkbox>
            <el-checkbox :label="$t('ability.types.mobility')"></el-checkbox>
            <el-checkbox :label="$t('ability.types.perception')"></el-checkbox>
            <el-checkbox :label="$t('ability.types.control')"></el-checkbox>
            <el-checkbox :label="$t('ability.types.summon')"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="props">
      <div class="prop">

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { AbilityProp, AbilityData, AbilityEnhance, AbilityFormData, AdvancedAbilityPropValue, AbilityType, WarframeProperty, AbilityPropTypes } from "@/warframe/codex";
import { i18n } from "@/i18n";

@Component({})
export default class VisualSkill extends Vue {
  @Model() abilityData: AbilityData

  get id() { return this.abilityData.id }
  get name() {
    const key = `messages.${_.camelCase(this.id)}`;
    return i18n.te(key) ? i18n.t(key) : this.id;
  }
  get wikiaURL() { return "https://warframe.fandom.com/wiki/" + this.id.replace(/ /g, "_"); }
  get huijiURL() { return "https://warframe.huijiwiki.com/wiki/" + this.name; }

  get oneHand() { return this.abilityData.oneHand }
  set oneHand(value) {
    this.abilityData.oneHand = value || undefined
  }
  get tags() {
    return Array(6).fill(1)
      .map((_, i) => (this.abilityData.tags & 1 << i) && AbilityType[1 << i])
      .filter(Boolean)
      .map(v => i18n.t(`ability.types.${_.camelCase(v)}`))
  }
  set tags(value) {
    this.abilityData.tags = Array(6).fill(1)
      .map((_, i) => AbilityType[1 << i])
      .map((v, i) => value.includes(i18n.t(`ability.types.${_.camelCase(v)}`)) ? 1 << i : 0)
      .reduce((a, b) => a | b);
  }
  get energyCost() { return this.abilityData.energyCost }
  get energyCostPS() { return this.abilityData.energyCostPS }
  get energyCostN() { return this.abilityData.energyCostN }

  enhance?: AbilityEnhance;
  forms?: AbilityFormData[];
  _props?: AbilityProp;

  get props() {
    return []
  }
}
</script>

<style lang="less" scoped>
.visual-skill-container {
  padding: 8px 0;
  .name {
    font-size: 18px;
    margin: 8px 20px;
  }
  .id {
    height: 17px;
    color: #606c80;
    font-size: 12px;
    margin: 2px 20px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .common {
    padding: 8px 0;
  }
}
</style>
