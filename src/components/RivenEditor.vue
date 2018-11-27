<template>
  <div class="rivenedit">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-cascader v-if="!weapon" filterable class="weapon-picker" expand-trigger="hover" size="medium" :placeholder="$t('rivenedit.selectWeapon')" :options="nameOptions" :show-all-levels="false" v-model="selectWeapon" @change="handleChange">
        </el-cascader>
        <div class="prop-picker" v-if="mod" v-for="(prop, index) in props" :key="index">
          <el-popover v-model="prop.visable" @blur="prop.visable = false" placement="bottom" width="400" trigger="click">
            <ul>
              <li class="prop-button" v-if="index === 2">
                <el-checkbox v-model="is21Negative">{{$t("rivenedit.isNegative")}}</el-checkbox>
              </li>
              <li class="prop-button" v-for="vprop in (index === 3 || is21Negative && index === 2 ? allProps.filter(v => !v.onlyPositive) : allProps)" :key="vprop.id" size="small" @click="propClick(index, vprop.id)">
                {{$t("prop.shortName." + vprop.id)}} ({{index === 0 ? vprop.prefix : (index === 1 ? vprop.prefix + " / " + vprop.subfix : vprop.subfix)}})
              </li>
            </ul>
            <el-button class="prop-select" size="medium" slot="reference">
              {{prop.id && $t("prop.shortName." + prop.id) || $t("rivenedit.selectProp")}}
              <span class="prop-arrow">
                <i class="el-icon-arrow-up" :class="{'is-reverse': prop.visable}"></i>
              </span>
            </el-button>
          </el-popover>
          <el-input-number class="prop-number" @input="handleInput" :disabled="!prop.id" controls-position="right" :placeholder="$t('rivenedit.inputValue')" :precision="1" :step="0.1" :min="-600" :max="600" size="medium" v-model="prop.value">
          </el-input-number>
          <button class="prop-remove" @click="removeProp(index)">
            <i class="el-icon-remove"></i>
          </button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { RivenMod, ModTypeTable, RivenWeaponDataBase, RivenDataBase, RivenProperty, RivenPropertyDataBase, Weapon, RivenWeapon, toUpLevel, toNegaUpLevel } from "@/warframe";

interface CascaderValue {
  value: string
  label: string
  children?: CascaderValue[];
}
@Component
export default class RivenEditor extends Vue {
  @Model("change") value;
  @Prop() weapon: RivenWeapon;
  riven: RivenMod = null
  nameOptions: CascaderValue[] = [];
  selectWeapon = [];
  mod = "";
  props: { id: string, prop: RivenProperty, value: number, visable: boolean }[] = [];
  is21Negative = false;
  get allProps() { return RivenPropertyDataBase[this.mod].filter(v => !this.props.some(k => k.id === v.id)); }
  // cnpyFilter(input: string) {
  //   let names = input.match(/^\w+$/) && CNPY_RivenWeapon.find(input) || [input];
  //   return this.nameOptions.filter(v => names.some(k => v.label.indexOf(k) >= 0));
  // }
  // === 事件处理 ===
  /** 武器变更 */
  @Watch("weapon")
  handleChange() {
    let rWeapon = RivenDataBase.getRivenWeaponByName(this.weapon ? this.weapon.id : _.last(this.selectWeapon));
    this.riven = new RivenMod();
    [this.riven.id, this.riven.name, this.riven.mod] = [rWeapon.id, rWeapon.name, rWeapon.mod];
    this.mod = rWeapon.mod;
    this.is21Negative = false;
    this.props = [{ id: "", prop: null, value: 0, visable: false }];
    this.updateRiven();
  }
  handleInput() {
    this.updateRiven();
  }
  /** 选择属性 */
  propClick(index: number, id: string) {
    this.props[index].id = id;
    this.props[index].prop = RivenDataBase.getPropByName(id);
    this.props[index].visable = false;

    let props = this.props.filter(v => v.prop);
    let lastProp = _.last(props), hasNegative = !lastProp.prop.negative !== lastProp.value >= 0;
    let pUpLevel = toUpLevel(props.length, hasNegative), nUpLevel = toNegaUpLevel(props.length, hasNegative);
    this.props[index].value = (hasNegative && index === props.length - 1 ? -nUpLevel : pUpLevel) * RivenDataBase.getPropBaseValue(this.riven.id, id);
    if (this.props.length < 4 && !this.props.filter(v => !v.id).length) this.props.push({ id: "", prop: null, value: 0, visable: false });
    if (index >= props.length - 1) this.refill();
    this.updateRiven();
  }
  /** 删除属性 */
  removeProp(index: number) {
    if (this.props.length === 1)
      this.props = [{ id: "", prop: null, value: 0, visable: false }];
    else {
      this.props.splice(index, 1);
      if (this.props.length < 4 && !this.props.filter(v => !v.id).length) this.props.push({ id: "", prop: null, value: 0, visable: false });
    }
    this.refill();
    this.updateRiven();
  }
  /** 重新自动填充数值 */
  refill() {
    let props = this.props.filter(v => v.prop);
    if (props.length > 1) {
      let lastProp = _.last(props), hasNegative = this.is21Negative || !lastProp.prop.negative !== lastProp.value >= 0;
      this.is21Negative = false;
      // 正面属性增幅, 负面属性增幅
      let pUpLevel = toUpLevel(props.length, hasNegative), nUpLevel = toNegaUpLevel(props.length, hasNegative);
      props.forEach((v, i) => {
        let base = RivenDataBase.getPropBaseValue(this.riven.id, v.id);
        this.props[i].value = base * (hasNegative && i === props.length - 1 ? -nUpLevel : pUpLevel);
      });
    }
  }
  updateRiven() {
    this.riven.subfix = "";
    this.riven.parseProps(this.props.filter(v => v.id).map(v => [v.id, v.value] as [string, number]));
    this.$emit("change", this.riven.qrCodeBase64);
  }
  // === 生命周期钩子 ===
  beforeMount() {
    let isZH = this.$i18n.locale.substr(0, 2) === "zh";
    _.forEach(ModTypeTable, (name, id) => {
      let rWeapons = RivenWeaponDataBase.filter(v => v.mod === id && v.ratio > 0.1).map(v => ({ value: v.id, label: isZH ? v.name : v.id }));
      this.nameOptions.push({ value: id, label: isZH ? name : id, children: rWeapons });
    });
    if (this.weapon) this.handleChange();
  }
}
</script>

<style>
.weapon-picker {
  width: 100%;
  margin: 8px 0;
}

.prop-picker {
  display: flex;
  margin-bottom: 8px;
}
.prop-picker .prop-number {
  flex: 1;
  margin-left: 8px;
}
.prop-button {
  display: inline-block;
  cursor: pointer;
  margin: 4px 4px;
  padding: 7px 0;
  border: 1px solid #ccc;
  border-radius: 999px;
  width: calc(50% - 8px);
  text-align: center;
  background: #fefefe;
  user-select: none;
  box-sizing: border-box;
  transition: 0.3s;
}
.prop-button:hover {
  color: #6199ff;
  border-color: #6199ff;
}
.prop-arrow .el-icon-arrow-up {
  transition: 0.3s;
  transform: rotateZ(180deg);
}
.prop-arrow .el-icon-arrow-up.is-reverse {
  transform: rotateZ(0deg);
}
.prop-remove {
  -webkit-appearance: none;
  color: #f56c6c;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}
.prop-remove:hover,
.prop-remove:active {
  color: #f08585;
}
.prop-remove:focus {
  box-shadow: none;
  outline: none;
}

.el-popover {
  max-width: calc(100vw - 35px);
}
</style>
