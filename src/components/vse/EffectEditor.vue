<template>
  <div class="effect-editor">
    <div class="effect-item" :key="index" v-for="(effect, index) in effects">
      <el-select class="effect-type" v-model="effects[index][0]" placeholder="请选择">
        <el-option
          :key="effectType" v-for="effectType in effectTypes"
          :label="$t(`prop.shortName.${effectType}`)"
          :value="effectType">
          <span>{{ $t(`prop.shortName.${effectType}`) }}</span>
        </el-option>
      </el-select>
      <AbilityPropValueEditor v-model="effects[index][1]" />
      <el-button type="danger" icon="el-icon-delete" style="margin-left: 8px" circle @click="effects.splice(index, 1)"></el-button>
    </div>
    <div class="new-effect-item">
      <el-button type="primary" icon="el-icon-plus" @click="addneweffect">添加新效果</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from "vue-property-decorator";
import { AbilityPropValue } from "@/warframe/codex";
import AbilityPropValueEditor from "@/components/vse/AbilityPropValueEditor.vue";

@Component({ components: { AbilityPropValueEditor } })
export default class EffectEditor extends Vue {
  @Model() effects: [string, AbilityPropValue][]
  get effectTypes() {
    return "0,1,2,3,4,5,6,7,8,9,A,G,I,C,D,S,R,L,F,M,P,H,V,Z,K,T,J,B,U,N,E,X,h,s,a,e,f,r,t,u,x,g,c,k,y,l,i,v,z,rg,hc,ec,tr,as,ae,at,er,lr,acc,range,stick,aimm,ckm,od,kb,brad,sp,hr,fsb,am,hm,i2,da,oad,lal,spr,slc,bnc,exp,ls,bL,bldr,sccm,ccws,bsk,co,gdr,hlr,exd,amr,par,msd,fs,ce,ac,ds,sd,e1,i0,smd,dmg,cwh,erd,ecd,eed,efd,aed,hps,ivb,ivc".split(",")
  }
  addneweffect() {
    this.effects.push(["ivb", { value: 1 }])
  }
}

</script>

<style lang="less" scoped>
.effect-item {
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 12px;
  .effect-type,
  .ability-prop-value-editor {
    margin-right: 8px;
  }
}
</style>

