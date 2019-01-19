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
      <el-checkbox border size="large" class="prop-header" v-model="hasDamage" :label="$t('ability.effects.damage')"/>
      <el-form v-if="hasDamage" class="prop damage" label-width="80px" size="small">
        <el-form-item :label="$t('ability.props.damage')">
          <DamageEditor v-model="damage.damage" />
        </el-form-item>
        <el-form-item :label="$t('ability.props.rangeDamage')">
          <template v-if="typeof damage.rangeDamage !== 'undefined'">
            <DamageEditor v-if="damage.rangeDamage" v-model="damage.rangeDamage" />
            <el-button type="danger" icon="el-icon-delete" @click="$delete(damage, 'rangeDamage')">删除属性</el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'rangeDamage', [])">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.duration')">
          <template v-if="typeof damage.duration !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.duration" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'duration')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'duration', {value:0})">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.tick')">
          <template v-if="typeof damage.tick !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.tick" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'tick')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'tick', {value:0})">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.amount')">
          <template v-if="typeof damage.amount !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.amount" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'amount')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'amount', {value:0})">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.angel')">
          <template v-if="typeof damage.angel !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.angel" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'angel')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'angel', {value:0})">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.distance')">
          <template v-if="typeof damage.distance !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.distance" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'distance')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'distance', {value:0})">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.prjSpeed')">
          <template v-if="typeof damage.prjSpeed !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.prjSpeed" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'prjSpeed')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'prjSpeed', {value:0})">新增属性</el-button>
        </el-form-item>
        <el-form-item :label="$t('ability.props.affectBy')">
          <template v-if="typeof damage.affectBy !== 'undefined'">
            <AbilityPropValueEditor v-model="damage.affectBy" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(damage, 'affectBy')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(damage, 'affectBy', {value:0})">新增属性</el-button>
        </el-form-item>
      </el-form>
      <el-checkbox border size="large" class="prop-header" v-model="hasBuff" :label="$t('ability.effects.buff')"/>
      <el-form v-if="hasBuff" class="prop buff" label-width="80px" size="small">
        <!-- target -->
        <el-form-item :label="$t('ability.props.target')">
          <template v-if="typeof buff.target !== 'undefined'">
            <el-input v-model="buff.target" placeholder="请输入描述"></el-input>
            <el-button type="danger" icon="el-icon-delete" @click="$delete(buff, 'target')">删除属性</el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'target', 'all')">新增属性</el-button>
        </el-form-item>
        <!-- desc -->
        <el-form-item :label="$t('ability.props.desc')">
          <template v-if="typeof buff.desc !== 'undefined'">
            <el-input v-model="buff.desc" placeholder="请输入描述"></el-input>
            <el-button type="danger" icon="el-icon-delete" @click="$delete(buff, 'desc')">删除属性</el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'desc', '')">新增属性</el-button>
        </el-form-item>
        <!-- effect -->
        <el-form-item :label="$t('ability.props.effect')">
          <template v-if="typeof buff.effect !== 'undefined'">
            <EffectEditor v-if="buff.effect" v-model="buff.effect" />
            <el-button type="danger" icon="el-icon-delete" @click="$delete(buff, 'effect')">删除属性</el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'effect', [])">新增属性</el-button>
        </el-form-item>
        <!-- duration -->
        <el-form-item :label="$t('ability.props.duration')">
          <template v-if="typeof buff.duration !== 'undefined'">
            <AbilityPropValueEditor v-model="buff.duration" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(buff, 'duration')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'duration', {value:0})">新增属性</el-button>
        </el-form-item>
        <!-- angel -->
        <el-form-item :label="$t('ability.props.angel')">
          <template v-if="typeof buff.angel !== 'undefined'">
            <AbilityPropValueEditor v-model="buff.angel" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(buff, 'angel')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'angel', {value:0})">新增属性</el-button>
        </el-form-item>
        <!-- range -->
        <el-form-item :label="$t('ability.props.range')">
          <template v-if="typeof buff.range !== 'undefined'">
            <AbilityPropValueEditor v-model="buff.range" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(buff, 'range')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'range', {value:0})">新增属性</el-button>
        </el-form-item>
        <!-- distance -->
        <el-form-item :label="$t('ability.props.distance')">
          <template v-if="typeof buff.distance !== 'undefined'">
            <AbilityPropValueEditor v-model="buff.distance" />
            <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="$delete(buff, 'distance')"></el-button>
          </template>
          <el-button v-else type="primary" icon="el-icon-edit" @click="$set(buff, 'distance', {value:0})">新增属性</el-button>
        </el-form-item>
      </el-form>
      <el-checkbox border size="large" class="prop-header" v-model="hasDebuff" :label="$t('ability.effects.debuff')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasSummon" :label="$t('ability.effects.summon')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasDamageReduce" :label="$t('ability.effects.damageReduce')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasDamageReflect" :label="$t('ability.effects.damageReflect')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasControl" :label="$t('ability.effects.control')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasSpecial" :label="$t('ability.effects.special')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasMove" :label="$t('ability.effects.move')"/>
      <el-checkbox border size="large" class="prop-header" v-model="hasExaltedWeapon" :label="$t('ability.effects.exaltedWeapon')"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { AbilityProp, AbilityData, AbilityEnhance, AbilityFormData, AdvancedAbilityPropValue, AbilityType, WarframeProperty, AbilityPropTypes } from "@/warframe/codex";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";
import DamageEditor from "@/components/vse/DamageEditor.vue";
import EffectEditor from "@/components/vse/EffectEditor.vue";
import { i18n } from "@/i18n";

@Component({ components: { AbilityPropValueEditor, DamageEditor, EffectEditor } })
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

  get hasDamageReflect() {
    return this.abilityData.props && !!this.abilityData.props.DamageReflect;
  }
  set hasDamageReflect(value) {
    if (!this.abilityData.props)
      this.abilityData.props = {};
    if (!value)
      Vue.delete(this.abilityData.props, "DamageReflect");
    else if (!this.abilityData.props.DamageReflect)
      Vue.set(this.abilityData.props, "DamageReflect", {})
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
  get damageReflect() {
    return this.abilityData.props.DamageReflect;
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
