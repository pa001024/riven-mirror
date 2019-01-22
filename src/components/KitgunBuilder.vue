<template>
  <div class="kitgunbuilder">
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
            <img :src="`https://cdn.riven.im/img/kitgunChamber${$t(`messages.${item.name}`, 'en')}.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.name}`)}}
          </div>
          <div class="type">
            {{$t(`kitgun.type.${item.name}`)}}
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 握把 -->
    <div class="partlist" v-if="part === 1">
      <div class="part-box" v-for="item in gripList" :key="item.id">
        <el-radio class="part" v-model="grip" :label="item" border>
          <div class="snapshot">
            <img :src="`https://cdn.riven.im/img/kitgunGrip${$t(`messages.${item.name}`, 'en')}.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.name}`)}}
          </div>
          <div class="prop">
            <span>{{loadGrip(item).fireRate}} {{$t(`modular.fireRate`)}}</span>
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
            <img :src="`https://cdn.riven.im/img/kitgunLoader${$t(`messages.${item.name}`, 'en')}.png`" :alt="item.name" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.name}`)}}
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
      <div class="part" v-if="chamber">{{$t("kitgun.chamber")}}: {{$t(`messages.${chamber.name}`)}}</div><!--
   --><div class="part" v-if="grip">{{$t("kitgun.grip")}}: {{$t(`messages.${grip.name}`)}}</div><!--
   --><div class="part" v-if="loader">{{$t("kitgun.loader")}}: {{$t(`messages.${loader.name}`)}}</div>
    </div>
    <!-- 预览 -->
    <div class="preview" v-if="chamber">
      <div class="prop">{{$t("modular.damage")}}: {{+kitgun.panelDamage.toFixed(1)}}</div><!--
   --><div class="prop" v-for="dmg in kitgun.dmg" :key="dmg[0]"><WfIcon :type="dmg[0].toLowerCase()"/> {{$t(`elements.${dmg[0]}`)}}: {{dmg[1]}}</div><!--
   --><div class="prop" v-if="kitgun.rangeLimit">{{$t("modular.rangeLimit")}}: {{kitgun.rangeLimit}} m</div><!--
   --><div class="prop">{{$t("modular.fireRate")}}: {{kitgun.fireRate}}</div><!--
   --><div class="prop">{{$t("modular.status")}}: {{(kitgun.status*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("modular.critDamage")}}: {{kitgun.critMul}}x</div><!--
   --><div class="prop">{{$t("modular.critChance")}}: {{(kitgun.critChance*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("modular.magazine")}}: {{kitgun.magazine}}</div><!--
   --><div class="prop">{{$t("modular.reload")}}: {{kitgun.reload}}</div>
    </div>
    <el-button class="stepctl" :disabled="part === 0" @click="part = part > 0 ? part - 1 : 0">{{$t("modular.lastStep")}}</el-button>
    <el-button class="stepctl" :disabled="part === 0 && !chamber || part === 1 && !grip || part === 2 && !loader" @click="part = part < 2 ? part + 1 : (finish(),2)">{{part === 2 ? $t("modular.finish") : $t("modular.nextStep")}}</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { KitgunChamberData, KitgunGripData, KitgunLoaderData, KitgunChamber, KitgunGrip, KitgunLoader, Kitgun } from "@/warframe/codex";

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

  loadGrip(grip: KitgunGrip) { return Kitgun.loadGrip(this.chamber, grip); }
  loadLoader(loader: KitgunLoader) { return Kitgun.loadLoader(this.chamber, loader); }

  finish() {
    this.$emit("finish", this.kitgun);
  }
}

</script>

<style lang="less">
.preview .prop,
.parts .part {
  display: inline-block;
  margin: 8px 4px 4px;
  padding: 4px 8px;
  border: 1px solid #6199ff;
  border-radius: 4px;
  color: #6199ff;
  font-size: 0.9em;
}
.kitgunbuilder {
  .el-steps.el-steps--horizontal {
    margin: 8px 16px;
  }
  .stepctl {
    margin-top: 12px;
  }
  .partlist {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .part-box {
      margin: 4px 2px;
    }
    .part {
      padding: 8px 16px;
    }
    .el-radio {
      height: auto;
    }
    .el-radio__label {
      padding: 0;
    }
    .snapshot {
      width: 110px;
      height: 80px;
    }
    .name {
      font-size: 1.1em;
    }
    .type {
      margin-top: 8px;
      color: #aaa;
    }
    .prop {
      margin-top: 8px;
      span {
        display: block;
        margin-top: 4px;
      }
    }
    .is-checked .type {
      color: #9cbfff;
    }
  }
}
</style>
