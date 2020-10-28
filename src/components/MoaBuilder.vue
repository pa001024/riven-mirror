<template>
  <div class="modularbuilder moa">
    <el-steps :active="part" finish-status="success">
      <el-step :title="$t('moa.selectModel')"></el-step>
      <el-step :title="$t('moa.selectCore')"></el-step>
      <el-step :title="$t('moa.selectGyro')"></el-step>
      <el-step :title="$t('moa.selectBracket')"></el-step>
    </el-steps>
    <!-- 型号 -->
    <div class="partlist" v-if="part === 0">
      <div class="part-box" v-for="item in modelList" :key="item.name">
        <el-radio class="part" v-model="model" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/${item.id}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="prop">
            <span v-for="mod in item.mods" :key="mod">{{translateMod(mod)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 核心 -->
    <div class="partlist" v-if="part === 1">
      <div class="part-box" v-for="item in coreList" :key="item.name">
        <el-radio class="part" v-model="core" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/${item.id}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="prop">
            <span>{{renderProp(item.health)}} {{$t(`modular.health`)}}</span>
            <span>{{renderProp(item.shield)}} {{$t(`modular.shield`)}}</span>
            <span>{{renderProp(item.armor)}} {{$t(`modular.armor`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 握柄部 -->
    <div class="partlist" v-if="part === 2">
      <div class="part-box" v-for="item in gyroList" :key="item.name">
        <el-radio class="part" v-model="gyro" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/${item.id}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="prop">
            <span>{{renderProp(item.health)}} {{$t(`modular.health`)}}</span>
            <span>{{renderProp(item.shield)}} {{$t(`modular.shield`)}}</span>
            <span>{{renderProp(item.armor)}} {{$t(`modular.armor`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 环接部 -->
    <div class="partlist" v-if="part === 3">
      <div class="part-box" v-for="item in bracketList" :key="item.name">
        <el-radio class="part" v-model="bracket" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/${item.id}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="prop">
            <span>
              <WfIcon v-for="(pol,i) in item.polarities.split('')" :key="i" :type="pol"/>
            </span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 部件 -->
    <div class="parts">
      <div class="part" v-if="model">{{$t("moa.model")}}: {{$t(`messages.${model.id}`)}}</div><!--
   --><div class="part" v-if="core">{{$t("moa.core")}}: {{$t(`messages.${core.id}`)}}</div><!--
   --><div class="part" v-if="gyro">{{$t("moa.gyro")}}: {{$t(`messages.${gyro.id}`)}}</div><!--
   --><div class="part" v-if="bracket">{{$t("moa.bracket")}}: {{$t(`messages.${bracket.id}`)}}</div>
    </div>
    <!-- 预览 -->
    <div class="preview" v-if="model"><!--
   --><div class="prop">{{$t("modular.health")}}: {{moa.health}}</div><!--
   --><div class="prop">{{$t("modular.shield")}}: {{moa.shield}}</div><!--
   --><div class="prop">{{$t("modular.armor")}}: {{moa.armor}}</div><!--
 --></div>
    <el-button class="stepctl" :disabled="part === 0" @click="part = part > 0 ? part - 1 : 0">{{$t("modular.lastStep")}}</el-button>
    <el-button class="stepctl" :disabled="part === 0 && !model || part === 1 && !core || part === 2 && !gyro || part === 3 && !bracket" @click="part = part < 3 ? part + 1 : (finish(),3)">{{part === 3 ? $t("modular.finish") : $t("modular.nextStep")}}</el-button>
  </div>
</template>
<script lang="ts">
import { camelCase } from "lodash-es";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import "@/less/modular.less";
import { Moa, MoaModel, MoaCore, MoaGyro, MoaBracket, MoaModelData, MoaCoreData, MoaGyroData, MoaBracketData } from "@/warframe/codex/moa";

@Component
export default class extends Vue {
  part = 0;

  modelList = MoaModelData;
  coreList = MoaCoreData;
  gyroList = MoaGyroData;
  bracketList = MoaBracketData;
  model: MoaModel = null;
  core: MoaCore = null;
  gyro: MoaGyro = null;
  bracket: MoaBracket = null;

  get moa() {
    return new Moa(this.model, this.core, this.gyro, this.bracket);
  }

  finish() {
    this.$emit("finish", this.moa);
  }

  translateMod(mod: string) {
    return this.$t(`messages.${camelCase(mod)}`);
  }
  renderProp(prop: number) {
    return (prop >= 0 ? "+" : "") + prop * 2.5 + "%";
  }
}
</script>
