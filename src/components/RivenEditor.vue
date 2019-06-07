<template>
  <div class="rivenedit">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-cascader v-if="!weapon" filterable class="weapon-picker"
          :props="{ expandTrigger: 'hover' }" size="small" :placeholder="$t('rivenedit.selectWeapon')"
          :options="nameOptions" :show-all-levels="false" v-model="selectWeapon" @change="handleChange"/>
        <template v-if="mod">
          <div class="prop-picker" v-for="(prop, index) in props" :key="index">
            <el-popover v-model="prop.visable" @blur="prop.visable = false" placement="bottom" width="400" trigger="click">
              <div>
                <div class="prop-button" @click.stop="is21Negative=!is21Negative" v-if="index === 2">
                  <el-checkbox style="pointer-events: none;" :value="is21Negative">{{$t("rivenedit.isNegative")}}</el-checkbox>
                </div>
                <div class="prop-button" v-for="vprop in (index === 3 || is21Negative && index === 2 ? allProps.filter(v => !v.onlyPositive) : allProps)" :key="vprop.id" size="small" @click="propClick(index, vprop.id)">
                  {{$t("prop.shortName." + vprop.id)}} ({{index === 0 ? vprop.prefix : (index === 1 ? vprop.prefix + " / " + vprop.subfix : vprop.subfix)}})
                </div>
              </div>
              <el-button class="prop-select" size="small" slot="reference">
                {{prop.id && $t("prop.shortName." + prop.id) || $t("rivenedit.selectProp")}}
                <span class="prop-arrow">
                  <i class="el-icon-arrow-up" :class="{'is-reverse': prop.visable}"></i>
                </span>
              </el-button>
            </el-popover>
            <el-input-number v-if="legacyRivenEditor"
              class="prop-number" v-model="prop.value" :disabled="!prop.id" @input="handleInput"
              controls-position="right" :placeholder="$t('rivenedit.inputValue')"
              :precision="1" :step="0.1" size="small"/>
            <div class="prop-slider" v-else>
              <label :style="[prop.value < (prop.max + prop.min)/2 && { right: 0 }, prop.value === 0 && { display: 'none' }]">
                {{+prop.value.toFixed(1)}}
              </label>
              <el-slider
                class="slider" v-model="prop.value" :disabled="!prop.id" @change="handleInput"
                :precision="1" :step="0.1" :min="prop.min" :max="prop.max" size="small" :format-tooltip="v=>v+'%'"/>
            </div>
            <button class="prop-remove" @click="removeProp(index)">
              <i class="el-icon-remove"></i>
            </button>
          </div>
          <div class="mode-swtich">
            <el-switch size="small" v-model="legacyRivenEditor"/>
            <Tip style="margin-left: 6px;" :content="$t('setting.legacyrivenTip')"/>
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { RivenProperty, RivenPropertyDataBase, RivenDatabase, ModTypeTable, MainTag, Weapon, WeaponDatabase, RivenTypes } from "@/warframe/codex";
import { RivenMod, toNegaUpLevel, toUpLevel } from "@/warframe/rivenmod";
import { Getter, Action } from "vuex-class";

interface CascaderValue {
  value: string;
  label: string;
  children?: CascaderValue[];
}

interface EditorProp {
  id: string;
  prop: RivenProperty;
  value: number;
  visable: boolean;
  min: number;
  max: number;
}

const defalutEditorProp = () => ({ id: "", prop: null, value: 0, visable: false, min: -1, max: 1 } as EditorProp);

@Component
export default class RivenEditor extends Vue {
  // Vuex
  @Getter("legacyRivenEditor") _legacyRivenEditor: boolean;
  @Action("setLegacyRivenEditor") setLegacyRivenEditor: (value: boolean) => void;
  // 老版本紫卡编辑器
  get legacyRivenEditor() {
    return this._legacyRivenEditor;
  }
  set legacyRivenEditor(val: boolean) {
    this.setLegacyRivenEditor(val);
  }

  @Model("change") value;
  @Prop() weapon: Weapon;
  riven: RivenMod = null;
  nameOptions: CascaderValue[] = [];
  selectWeapon = [];
  mod = "";
  props: EditorProp[] = [];
  is21Negative = false;
  get allProps() {
    return RivenPropertyDataBase[this.mod].filter(v => !this.props.some(k => k.id === v.id));
  }

  // === 事件处理 ===
  /** 武器变更 */
  @Watch("weapon")
  handleChange() {
    const weapon = this.weapon || WeaponDatabase.getWeaponByName(_.last(this.selectWeapon));
    this.riven = new RivenMod();
    [this.riven.name, this.riven.mod] = [weapon.name, MainTag[weapon.mod] as RivenTypes];
    this.mod = MainTag[weapon.mod];
    this.is21Negative = false;
    this.props = [defalutEditorProp()];
    this.updateRiven();
  }
  handleInput() {
    this.updateRiven();
  }
  /** 选择属性 */
  propClick(index: number, id: string) {
    const weapon = this.weapon || WeaponDatabase.getWeaponByName(_.last(this.selectWeapon));
    this.props[index].id = id;
    this.props[index].prop = RivenDatabase.getPropByName(id);
    this.props[index].visable = false;

    let props = this.props.filter(v => v.prop);
    let lastProp = _.last(props),
      hasNegative = !lastProp.prop.negative !== lastProp.value >= 0;
    let pUpLevel = toUpLevel(props.length, hasNegative),
      nUpLevel = toNegaUpLevel(props.length, hasNegative);
    let mid = (hasNegative && index === props.length - 1 ? -nUpLevel : pUpLevel) * weapon.getPropBaseValue(id);
    if (this.props[index].min != +((mid > 0 ? 0.89 : 1.11) * mid).toFixed(1)) {
      this.props[index].min = +((mid > 0 ? 0.89 : 1.11) * mid).toFixed(1);
      this.props[index].max = +((mid > 0 ? 1.11 : 0.89) * mid).toFixed(1);
      this.props[index].value = +mid.toFixed(1);
    }
    if (this.props.length < 4 && !this.props.filter(v => !v.id).length) this.props.push(defalutEditorProp());
    if (index >= props.length - 1) this.refill();
    this.updateRiven();
  }
  /** 删除属性 */
  removeProp(index: number) {
    if (this.props.length === 1) this.props = [defalutEditorProp()];
    else {
      this.props.splice(index, 1);
      if (this.props.length < 4 && !this.props.filter(v => !v.id).length) this.props.push(defalutEditorProp());
    }
    this.refill();
    this.updateRiven();
  }
  /** 重新自动填充数值 */
  refill() {
    const weapon = this.weapon || WeaponDatabase.getWeaponByName(_.last(this.selectWeapon));
    let props = this.props.filter(v => v.prop);
    if (props.length > 1) {
      let lastProp = _.last(props),
        hasNegative = this.is21Negative || !lastProp.prop.negative !== lastProp.value >= 0 || props.length > 3;
      this.is21Negative = false;
      // 正面属性增幅, 负面属性增幅
      let pUpLevel = toUpLevel(props.length, hasNegative),
        nUpLevel = toNegaUpLevel(props.length, hasNegative);
      props.forEach((v, i) => {
        let base = weapon.getPropBaseValue(v.id);
        let mid = base * (hasNegative && i === props.length - 1 ? -nUpLevel : pUpLevel);
        this.props[i].value = +mid.toFixed(1);
        this.props[i].min = +((mid > 0 ? 0.89 : 1.11) * mid).toFixed(1);
        this.props[i].max = +((mid > 0 ? 1.11 : 0.89) * mid).toFixed(1);
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
    _.forEach(ModTypeTable, ({ name, include }, id) => {
      let protos = WeaponDatabase.protos
        .filter(v => include.includes(v.mod) && v.disposition > 0.1)
        .map(v => ({
          value: v.name,
          label: this.$t(v.id) as string
        }));
      if (protos.length > 0)
        this.nameOptions.push({
          value: id,
          label: this.$t(`weaponselector.${name}`) as string,
          children: protos
        });
    });
    if (this.weapon) this.handleChange();
  }
}
</script>

<style lang="less">
@import "../less/common.less";

.rivenedit {
  .mode-swtich {
    position: absolute;
    margin-top: 8px;
  }
}

.weapon-picker {
  width: 100%;
  margin: 8px 0;
}
.prop-picker {
  display: flex;
  & + & {
    margin-top: 8px;
  }
  .prop-number {
    flex: 1;
    margin-left: 8px;
  }
  .prop-slider {
    flex: 1;
    margin-left: 12px;
    margin-right: 4px;
    display: flex;
    position: relative;
    label {
      position: absolute;
      font-size: x-small;
    }
    .slider {
      flex: 1;
      height: 32px;
      .el-slider__runway {
        margin: 12px 0;
      }
    }
  }
  .el-popover {
    max-width: calc(100vw - 35px);
  }
}
.prop-button {
  display: inline-block;
  cursor: pointer;
  margin: 4px 4px;
  padding: 7px 0;
  border: 1px solid @theme_border;
  border-radius: 999px;
  width: calc(50% - 8px);
  text-align: center;
  background: @theme_mainback;
  user-select: none;
  box-sizing: border-box;
  transition: 0.3s;
}
.prop-button:hover {
  color: @theme_main;
  border-color: @theme_main;
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
  color: @text_error;
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
</style>
