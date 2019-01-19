<template>
  <div class="visual-skill-editor">
    <div class="op">
      <div class="title">操作</div>
      <el-button type="primary" size="small" @click="save">导出</el-button>
    </div>
    <div class="warframe-list">
      <div class="title">选择战甲</div>
      <el-radio-group v-model="wfClass" size="small">
        <el-radio class="wfid" :key="id" v-for="id in wfClasses" :label="id" border/>
      </el-radio-group>
    </div>
    <div class="skill-list">
      <div class="skill-box" :key="skill.id" v-for="skill in showSkills">
        <VisualSkill class="skill" v-model="skills[skillNameMap[skill.id]]" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { AbilityProp, AbilityData, AbilityEnhance, AbilityFormData, AdvancedAbilityPropValue, AbilityType, WarframeProperty, AbilityPropTypes } from "@/warframe/codex";
import { _abilityData, _warframeData } from "@/warframe/codex/warframe.data";
import VisualSkill from "@/components/VisualSkill.vue";
import { i18n } from "@/i18n";

@Component({ components: { VisualSkill } })
export default class VisualSkillEditor extends Vue {
  skills: AbilityData[] = null
  skillNameMap: { [name: string]: number } = null
  wfClass = "Ash"
  get wfClasses() {
    return _.uniq(_warframeData.map(v => v.className || v.id))
  }
  get showSkills() {
    let wf = _warframeData.find(v => v.id === this.wfClass)
    let skills = this.skills.filter(v => wf.abilities.includes(v.id))
    // console.log(this.wfClass, skills)
    return skills
  }
  save() {
    console.log(this.skills)
  }
  // === 生命周期钩子 ===
  beforeMount() {
    this.skills = _abilityData.map(v => {
      let a = _.cloneDeep(v);
      a.props = _.mapValues(a.props, prop => {
        return _.mapValues(prop, (pv: any) => {
          if (Array.isArray(pv))
            return pv.map(([vn, vv]) => typeof vv === "number" ? [vn, { value: vv }] : [vn, vv])
          return typeof pv === "number" ? { value: pv } : pv
        })
      })
      return a
    })
    this.skillNameMap = this.skills.reduce((a, b, i) => (a[b.id] = i, a), {})
  }
}
</script>

<style lang="less" scoped>
.warframe-list {
  .title {
    font-size: 20px;
    margin: 8px 12px;
    font-weight: bold;
  }
  .el-radio-group .wfid {
    margin: 4px 2px;
    background: #fff;
  }
}
.skill-list {
  .skill-box {
    border: 1px solid #dcdfe6;
    margin-top: 14px;
    padding: 8px;
    border-radius: 4px;
    background: #fff;
    transition: border-color 0.4s;
    &:hover {
      border-color: #6199ff;
    }
  }
}
.op {
  .title {
    display: inline-block;
    padding: 0 12px;
  }
  background: #fff;
  padding: 8px;
  border-radius: 4px;
}
</style>
