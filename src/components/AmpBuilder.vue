<template>
  <div class="modularbuilder amp">
    <!-- 棱镜 -->
    <div class="parthead">{{$t("amp.selectPrism")}}</div>
    <div class="partlist">
      <div class="part-box" v-for="item in prismList" :key="item.index">
        <el-radio class="part" v-model="prism" :label="item" border @change="scaffold = null">
          <div class="snapshot">
            <img :src="`https://rm-img.oss-accelerate.aliyuncs.com/img/${item.id}.m.png`" :alt="item.id" height="100%">
          </div>
          <div class="name">{{$t(`messages.${item.id}`)}}</div>
          <div class="type">{{$t(`amp.type.${item.id}`)}}</div>
        </el-radio>
      </div>
    </div>
    <!-- 支架 -->
    <div class="parthead">{{$t("amp.selectScaffold")}}</div>
    <div class="partlist">
      <div class="part-box" v-for="item in scaffoldList" :key="item.index">
        <el-radio class="part" v-model="scaffold" :label="item" border @change="prism = null">
          <div class="snapshot">
            <img :src="`https://rm-img.oss-accelerate.aliyuncs.com/img/${item.id}.m.png`" :alt="item.id" height="100%">
          </div>
          <div class="name">{{$t(`messages.${item.id}`)}}</div>
          <div class="type">{{$t(`amp.type.${item.id}`)}}</div>
        </el-radio>
      </div>
    </div>
    <!-- 曲柄 -->
    <div class="parthead">{{$t("amp.selectBrace")}}</div>
    <div class="partlist">
      <div class="part-box" v-for="item in braceList" :key="item.index">
        <el-radio class="part" v-model="brace" :label="item" border>
          <div class="snapshot">
            <img :src="`https://rm-img.oss-accelerate.aliyuncs.com/img/${item.id}.m.png`" :alt="item.id" height="100%">
          </div>
          <div class="name">{{$t(`messages.${item.id}`)}}</div>
          <div class="prop">
            <span v-if="item.critChance">{{item.critChance >= 0 ? "+" : ""}}{{(item.critChance*100).toFixed()}}% {{$t(`modular.critChance`)}}</span>
            <span v-if="item.procChance">{{item.procChance >= 0 ? "+" : ""}}{{(item.procChance*100).toFixed()}}% {{$t(`modular.status`)}}</span>
            <span v-if="item.magazine">{{item.magazine >= 0 ? "+" : ""}}{{item.magazine}} {{$t(`modular.magazine`)}}</span>
            <span v-if="item.reloadDelay">{{item.reloadDelay >= 0 ? "+" : ""}}{{item.reloadDelay}}s {{$t(`modular.reloadDelay`)}}</span>
            <span v-if="item.reloadSpeed">{{item.reloadSpeed >= 0 ? "+" : ""}}{{item.reloadSpeed}} {{$t(`modular.reloadSpeed`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 部件 -->
    <div class="parts">
      <div class="part" v-if="finished">{{$t("amp.buildName")}}: {{amp.buildName}}</div><!--
   --><div class="part" v-if="prism">{{$t("amp.prism")}}: {{$t(`messages.${prism.id}`)}}</div><!--
   --><div class="part" v-if="scaffold">{{$t("amp.scaffold")}}: {{$t(`messages.${scaffold.id}`)}}</div><!--
   --><div class="part" v-if="brace">{{$t("amp.brace")}}: {{$t(`messages.${brace.id}`)}}</div>
    </div>
    <!-- 预览 -->
    <div class="preview" v-if="prism || scaffold">
      <div class="prop" v-for="dmg in amp.defaultMode.damage" :key="dmg[0]"><WfIcon :type="dmg[0].toLowerCase()"/> {{$t(`elements.${dmg[0]}`)}}: {{dmg[1]}}</div><!--
   --><div class="prop">{{$t("modular.fireRate")}}: {{+(amp.defaultMode.fireRate/60).toFixed(3)}}</div><!--
   --><div class="prop">{{$t("modular.critDamage")}}: {{amp.defaultMode.critMul}}x</div><!--
   --><div class="prop">{{$t("modular.critChance")}}: {{(amp.defaultMode.critChance*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("modular.status")}}: {{(amp.defaultMode.procChance*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("modular.magazine")}}: {{amp.defaultMode.magazine}}</div><!--
   --><div class="prop">{{$t("modular.reloadSpeed")}}: {{amp.reloadSpeed}}</div><!--
   --><div class="prop">{{$t("modular.reloadDelay")}}: {{amp.reloadDelay}}</div><!--
   --><div class="prop" v-if="amp.defaultMode.range">{{$t("modular.rangeLimit")}}: {{amp.defaultMode.range}}m</div>
    </div>
    <el-button class="stepctl" :disabled="!(finished)" @click="finish">{{$t("modular.finish")}}</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { AmpPrismData, AmpScaffoldData, AmpBraceData, AmpPrism, AmpScaffold, AmpBrace, Amp } from "@/warframe/codex";
import "@/less/modular.less";

@Component
export default class extends Vue {
  get prismList() { return AmpPrismData }
  get scaffoldList() { return AmpScaffoldData }
  get braceList() { return AmpBraceData }
  prism: AmpPrism = null;
  scaffold: AmpScaffold = null;
  brace: AmpBrace = null;

  get amp() { return new Amp(this.prism, this.scaffold, this.brace); }
  get finished() { return (this.prism || this.scaffold) && this.brace }
  finish() {
    this.$emit("finish", this.amp);
  }
}

</script>
