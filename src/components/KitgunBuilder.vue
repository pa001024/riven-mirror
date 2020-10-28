<template>
  <div class="modularbuilder kitgun">
    <el-steps :active="part" finish-status="success">
      <el-step :title="$t('kitgun.selectChamber')"></el-step>
      <el-step :title="$t('kitgun.selectGrip')"></el-step>
      <el-step :title="$t('kitgun.selectLoader')"></el-step>
    </el-steps>
    <!-- 枪膛 -->
    <div class="partlist" v-if="part === 0">
      <div class="part-box" v-for="item in chamberList" :key="item.id">
        <el-radio class="part" v-model="chamber" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/kitgunChamber${item.name}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="type">
            {{$t(`kitgun.type.${item.id}`)}}
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 握把 -->
    <div class="partlist" v-if="part === 1">
      <div class="part-box" v-for="item in gripList" :key="item.id">
        <el-radio class="part" v-model="grip" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/kitgunGrip${item.name}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="prop">
            <span>{{$t(`tags.${loadGrip(item).type.toLowerCase()}`)}}</span>
            <span>{{+(loadGrip(item).fireRate/60).toFixed(3)}} {{$t(`modular.fireRate`)}}</span>
            <span>{{loadGrip(item).dmgAdd >= 0 ? "+" : ""}}{{loadGrip(item).dmgAdd}} {{$t(`modular.damage`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 填弹器 -->
    <div class="partlist" v-if="part === 2">
      <div class="part-box" v-for="item in loaderList" :key="item.id">
        <el-radio class="part" v-model="loader" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/kitgunLoader${item.name}.m.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.id}`)}}
          </div>
          <div class="prop">
            <span>{{loadLoader(item).critDamage+2}}x {{$t(`modular.critDamage`)}}</span>
            <span>{{loadLoader(item).critChance >= 0 ? "+" : ""}}{{(loadLoader(item).critChance*100).toFixed()}}% {{$t(`modular.critChance`)}}</span>
            <span>{{loadLoader(item).procChance >= 0 ? "+" : ""}}{{(loadLoader(item).procChance*100).toFixed()}}% {{$t(`modular.status`)}}</span>
            <span>{{loadLoader(item).reload >= 0 ? "+" : ""}}{{loadLoader(item).reload}}s {{$t(`modular.reload`)}}</span>
            <span>{{loadLoader(item).magazine}} {{$t(`modular.magazine`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 部件 -->
    <div class="parts">
      <div class="part" v-if="chamber">{{$t("kitgun.chamber")}}: {{$t(`messages.${chamber.id}`)}}</div><!--
   --><div class="part" v-if="grip">{{$t("kitgun.grip")}}: {{$t(`messages.${grip.id}`)}}</div><!--
   --><div class="part" v-if="loader">{{$t("kitgun.loader")}}: {{$t(`messages.${loader.id}`)}}</div>
    </div>
    <!-- 预览 -->
    <div class="preview" v-if="chamber">
      <div class="prop">{{$t("modular.damage")}}: {{+kitgun.defaultMode.panelDamage.toFixed(1)}}</div><!--
   --><div class="prop">{{$t("build.ratio")}}: {{+kitgun.disposition}}</div><!--
   --><div class="prop" v-for="dmg in kitgun.defaultMode.damage" :key="dmg[0]"><WfIcon :type="dmg[0].toLowerCase()"/> {{$t(`elements.${dmg[0]}`)}}: {{dmg[1]}}</div><!--
   --><div class="prop" v-if="kitgun.defaultMode.range">{{$t("modular.rangeLimit")}}: {{kitgun.defaultMode.range}} m</div><!--
   --><div class="prop">{{$t("modular.fireRate")}}: {{+(kitgun.defaultMode.fireRate/60).toFixed(3)}}</div><!--
   --><div class="prop">{{$t("modular.status")}}: {{(kitgun.defaultMode.procChance*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("modular.critDamage")}}: {{kitgun.defaultMode.critMul}}x</div><!--
   --><div class="prop">{{$t("modular.critChance")}}: {{(kitgun.defaultMode.critChance*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("modular.magazine")}}: {{kitgun.defaultMode.magazine}}</div><!--
   --><div class="prop">{{$t("modular.reload")}}: {{kitgun.defaultMode.reload}}</div>
    </div>
    <el-button class="stepctl" :disabled="part === 0" @click="part = part > 0 ? part - 1 : 0">{{$t("modular.lastStep")}}</el-button>
    <el-button class="stepctl" :disabled="part === 0 && !chamber || part === 1 && !grip || part === 2 && !loader" @click="part = part < 2 ? part + 1 : (finish(),2)">{{part === 2 ? $t("modular.finish") : $t("modular.nextStep")}}</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { KitgunChamberData, KitgunGripData, KitgunLoaderData, KitgunChamber, KitgunGrip, KitgunLoader, Kitgun, MainTag } from "@/warframe/codex";
import "@/less/modular.less";

@Component
export default class extends Vue {
  part = 0;
  chamberList = KitgunChamberData;
  gripList = KitgunGripData;
  loaderList = KitgunLoaderData;
  chamber: KitgunChamber = null;
  grip: KitgunGrip = null;
  loader: KitgunLoader = null;

  get kitgun() { return new Kitgun(this.chamber, this.grip, this.loader); }
  get type() { return MainTag[this.kitgun.tags.mainTag]; }

  loadGrip(grip: KitgunGrip) { return Kitgun.loadGrip(this.chamber, grip); }
  loadLoader(loader: KitgunLoader) { return Kitgun.loadLoader(this.chamber, loader); }

  finish() {
    this.$emit("finish", this.kitgun);
  }
}
</script>
