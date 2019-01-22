<template>
  <div class="visual-skill-container">
    <div class="name">
      <a :href="id !== name ? huijiURL : wikiaURL" target="_blank" rel="noopener noreferrer">{{name}}</a>
    </div>
    <div class="id">
      <a :href="wikiaURL" target="_blank" rel="noopener noreferrer">{{id}}</a>
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
      <!-- damage -->
      <el-checkbox border size="large" class="prop-header" v-model="hasDamage" :label="$t('ability.effects.damage')"/>
      <el-form v-if="hasDamage" class="prop damage" label-width="80px" size="small">
        <DamageItem :bind="damage" keyName="damage"/>
        <DamageItem :bind="damage" keyName="rangeDamage"/>
        <NumberItem :bind="damage" keyName="duration"/>
        <NumberItem :bind="damage" keyName="tick"/>
        <NumberItem :bind="damage" keyName="amount"/>
        <NumberItem :bind="damage" keyName="angel"/>
        <NumberItem :bind="damage" keyName="distance"/>
        <NumberItem :bind="damage" keyName="prjSpeed"/>
        <NumberItem :bind="damage" keyName="affectBy"/>
      </el-form>
      <!-- buff -->
      <el-checkbox border size="large" class="prop-header" v-model="hasBuff" :label="$t('ability.effects.buff')"/>
      <el-form v-if="hasBuff" class="prop buff" label-width="80px" size="small">
        <TargetItem :bind="buff" keyName="target"/>
        <TextItem   :bind="buff" keyName="desc"/>
        <EffectItem :bind="buff" keyName="effect"/>
        <NumberItem :bind="buff" keyName="duration"/>
        <NumberItem :bind="buff" keyName="angel"/>
        <NumberItem :bind="buff" keyName="range"/>
        <NumberItem :bind="buff" keyName="distance"/>
      </el-form>
      <!-- debuff -->
      <el-checkbox border size="large" class="prop-header" v-model="hasDebuff" :label="$t('ability.effects.debuff')"/>
      <el-form v-if="hasDebuff" class="prop debuff" label-width="80px" size="small">
        <TargetItem :bind="debuff" keyName="target"/>
        <TextItem   :bind="debuff" keyName="desc"/>
        <EffectItem :bind="debuff" keyName="effect"/>
        <NumberItem :bind="debuff" keyName="duration"/>
        <NumberItem :bind="debuff" keyName="angel"/>
        <NumberItem :bind="debuff" keyName="range"/>
        <NumberItem :bind="debuff" keyName="distance"/>
      </el-form>
      <!-- summon -->
      <el-checkbox border size="large" class="prop-header" v-model="hasSummon" :label="$t('ability.effects.summon')"/>
      <el-form v-if="hasSummon" class="prop summon" label-width="80px" size="small">
        <NumberItem :bind="summon" keyName="health"/>
        <NumberItem :bind="summon" keyName="duration"/>
        <NumberItem :bind="summon" keyName="distance"/>
        <NumberItem :bind="summon" keyName="range"/>
        <DamageItem :bind="summon" keyName="damage"/>
        <DamageItem :bind="summon" keyName="rangeDamage"/>
      </el-form>
      <!-- damageReduce -->
      <el-checkbox border size="large" class="prop-header" v-model="hasDamageReduce" :label="$t('ability.effects.damageReduce')"/>
      <el-form v-if="hasDamageReduce" class="prop damageReduce" label-width="80px" size="small">
        <NumberItem :bind="damageReduce" keyName="durability"/>
        <NumberItem :bind="damageReduce" keyName="rate"/>
        <TargetItem :bind="damageReduce" keyName="target"/>
      </el-form>
      <!-- control -->
      <el-checkbox border size="large" class="prop-header" v-model="hasControl" :label="$t('ability.effects.control')"/>
      <el-form v-if="hasControl" class="prop control" label-width="80px" size="small">
        <NumberItem :bind="control" keyName="duration"/>
        <NumberItem :bind="control" keyName="angel"/>
        <NumberItem :bind="control" keyName="range"/>
        <NumberItem :bind="control" keyName="distance"/>
      </el-form>
      <el-checkbox border size="large" class="prop-header" v-model="hasSpecial" :label="$t('ability.effects.special')"/>
      <el-form v-if="hasSpecial" class="prop special" label-width="80px" size="small">
        <TextItem   :bind="special" keyName="desc"/>
        <NumberItem :bind="special" keyName="value"/>
      </el-form>
      <el-checkbox border size="large" class="prop-header" v-model="hasMove" :label="$t('ability.effects.move')"/>
      <el-form v-if="hasMove" class="prop move" label-width="80px" size="small">
        <CommonItem :bind="move" keyName="directive">
          <el-select v-model="move.directive" placeholder="请选择">
            <el-option label="非指向性" :value="0"/>
            <el-option label="非强制指向" :value="1"/>
            <el-option label="强制指向" :value="2"/>
          </el-select>
        </CommonItem>
        <NumberItem :bind="move" keyName="distance"/>
      </el-form>
      <el-checkbox border size="large" class="prop-header" v-model="hasExaltedWeapon" :label="$t('ability.effects.exaltedWeapon')"/>
      <el-form v-if="hasExaltedWeapon" class="prop exaltedWeapon" label-width="80px" size="small">
        <TextItem   :bind="exaltedWeapon" keyName="weaponName"/>
        <EffectItem :bind="exaltedWeapon" keyName="effect"/>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { AbilityProp, AbilityData, AbilityEnhance, AbilityFormData, AdvancedAbilityPropValue, AbilityType, WarframeProperty, AbilityPropTypes } from "@/warframe/codex";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";
import DamageEditor from "@/components/vse/DamageEditor.vue";
import EffectEditor from "@/components/vse/EffectEditor.vue";
import CommonItem from "@/components/vse/CommonItem.vue";
import NumberItem from "@/components/vse/NumberItem.vue";
import DamageItem from "@/components/vse/DamageItem.vue";
import EffectItem from "@/components/vse/EffectItem.vue";
import TargetItem from "@/components/vse/TargetItem.vue";
import TextItem from "@/components/vse/TextItem.vue";
import { i18n } from "@/i18n";

@Component({ components: { AbilityPropValueEditor, DamageEditor, EffectEditor, CommonItem, NumberItem, DamageItem, EffectItem, TargetItem, TextItem } })
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
  set energyCost(value) {
    if (value) {
      if (!this.abilityData.energyCost)
        Vue.set(this.abilityData, "energyCost", value)
      else
        this.abilityData.energyCost = value;
    } else if (this.abilityData.energyCost) {
      Vue.delete(this.abilityData, "energyCost")
    }
  }
  get energyCostPS() { return this.abilityData.energyCostPS }
  set energyCostPS(value) {
    if (value) {
      if (!this.abilityData.energyCostPS)
        Vue.set(this.abilityData, "energyCostPS", value)
      else
        this.abilityData.energyCostPS = value;
    } else if (this.abilityData.energyCostPS) {
      Vue.delete(this.abilityData, "energyCostPS")
    }
  }
  get energyCostN() { return this.abilityData.energyCostN }
  set energyCostN(value) {
    if (value) {
      if (!this.abilityData.energyCostN)
        Vue.set(this.abilityData, "energyCostN", value)
      else
        this.abilityData.energyCostN = value;
    } else if (this.abilityData.energyCostN) {
      Vue.delete(this.abilityData, "energyCostN")
    }
  }

  enhance?: AbilityEnhance;
  forms?: AbilityFormData[];

  get hasDamage() {
    return this.abilityData.props && !!this.abilityData.props.Damage;
  }
  set hasDamage(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Damage");
    else if (!this.abilityData.props.Damage) {
      Vue.set(this.abilityData.props, "Damage", {});
      Vue.set(this.damage, 'damage', []);
    }
  }

  get hasBuff() {
    return this.abilityData.props && !!this.abilityData.props.Buff;
  }
  set hasBuff(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Buff");
    else if (!this.abilityData.props.Buff)
      Vue.set(this.abilityData.props, "Buff", {})
  }

  get hasDebuff() {
    return this.abilityData.props && !!this.abilityData.props.Debuff;
  }
  set hasDebuff(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Debuff");
    else if (!this.abilityData.props.Debuff)
      Vue.set(this.abilityData.props, "Debuff", {})
  }

  get hasSummon() {
    return this.abilityData.props && !!this.abilityData.props.Summon;
  }
  set hasSummon(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Summon");
    else if (!this.abilityData.props.Summon)
      Vue.set(this.abilityData.props, "Summon", {})
  }

  get hasDamageReduce() {
    return this.abilityData.props && !!this.abilityData.props.DamageReduce;
  }
  set hasDamageReduce(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "DamageReduce");
    else if (!this.abilityData.props.DamageReduce)
      Vue.set(this.abilityData.props, "DamageReduce", {})
  }

  get hasControl() {
    return this.abilityData.props && !!this.abilityData.props.Control;
  }
  set hasControl(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Control");
    else if (!this.abilityData.props.Control)
      Vue.set(this.abilityData.props, "Control", {})
  }

  get hasSpecial() {
    return this.abilityData.props && !!this.abilityData.props.Special;
  }
  set hasSpecial(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Special");
    else if (!this.abilityData.props.Special)
      Vue.set(this.abilityData.props, "Special", {})
  }

  get hasMove() {
    return this.abilityData.props && !!this.abilityData.props.Move;
  }
  set hasMove(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "Move");
    else if (!this.abilityData.props.Move)
      Vue.set(this.abilityData.props, "Move", {})
  }

  get hasExaltedWeapon() {
    return this.abilityData.props && !!this.abilityData.props.ExaltedWeapon;
  }
  set hasExaltedWeapon(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "ExaltedWeapon");
    else if (!this.abilityData.props.ExaltedWeapon)
      Vue.set(this.abilityData.props, "ExaltedWeapon", {})
  }


  get damage() {
    return this.abilityData.props.Damage;
  }
  get buff() {
    return this.abilityData.props.Buff;
  }
  get debuff() {
    return this.abilityData.props.Debuff;
  }
  get summon() {
    return this.abilityData.props.Summon;
  }
  get damageReduce() {
    return this.abilityData.props.DamageReduce;
  }
  get control() {
    return this.abilityData.props.Control;
  }
  get special() {
    return this.abilityData.props.Special;
  }
  get move() {
    return this.abilityData.props.Move;
  }
  get exaltedWeapon() {
    return this.abilityData.props.ExaltedWeapon;
  }
}
</script>

<style lang="less" scoped>
.visual-skill-container {
  padding: 8px 0;
  .name {
    font-size: 18px;
    margin: 8px 20px;
    font-weight: bold;
  }
  .id {
    height: 17px;
    color: #808080;
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
  .props {
    .prop-header {
      display: block;
      margin-left: 0;
    }
    .prop {
      margin-top: 20px;
    }
  }
}
</style>
