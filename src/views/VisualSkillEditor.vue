<template>
  <div class="visual-skill-editor">
    <div class="op">
      <div class="title">操作</div>
      <el-button type="primary" size="small" @click="save">导出</el-button>
    </div>
    <div class="skill-list">
      <div class="skill" :key="skill.id" v-for="(skill, index) in skills">
        <VisualSkill class="skill" v-model="skills[index]" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { AbilityProp, AbilityData, AbilityEnhance, AbilityFormData, AdvancedAbilityPropValue, AbilityType, WarframeProperty, AbilityPropTypes } from "@/warframe/codex";
import { _abilityData } from "@/warframe/codex/warframe.data";
import VisualSkill from "@/components/VisualSkill.vue";
import { i18n } from "@/i18n";

@Component({ components: { VisualSkill } })
export default class VisualSkillEditor extends Vue {
  skills: AbilityData[] = []

  // === 生命周期钩子 ===
  beforeMount() {
    this.skills = _abilityData.slice(0, 10).map(v => {
      let vs = _.cloneDeep(v)
      return vs
    })
  }
  save() {
    console.log(this.skills)
  }
}
</script>

<style lang="less" scoped>
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
