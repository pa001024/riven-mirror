<template>
  <div class="zawbuilder">
    <el-steps :active="part" finish-status="success">
      <el-step :title="$t('zaw.selectStrike')"></el-step>
      <el-step :title="$t('zaw.selectGrip')"></el-step>
      <el-step :title="$t('zaw.selectLinks')"></el-step>
    </el-steps>
    <!-- 击打部 -->
    <div class="partlist" v-if="part === 0">
      <div class="part-box" v-for="item in strikeList" :key="item.id">
        <el-radio class="part" v-model="strike" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/zawStrike${item.id.replace(/ /g, '')}.png`" :alt="item.id" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.name}`)}}
          </div>
          <div class="type">
            {{$t(`zaw.${item.oneHand.type}`)}} / {{$t(`zaw.${item.twoHand.type}`)}}
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 握柄部 -->
    <div class="partlist" v-if="part === 1">
      <div class="part-box" v-for="item in gripList" :key="item.id">
        <el-radio class="part" v-model="grip" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/zawGrip${item.id.replace(/ /g, '')}.png`" :alt="item.id" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.name}`)}}
          </div>
          <div class="type">
            {{$t(`zaw.${strike[item.twoHand ? 'twoHand' : 'oneHand'].type}`)}}
          </div>
          <div class="prop">
            <span>{{item.speed >= 1 ? "+" : ""}}{{+(item.speed - 1).toFixed(3)}} {{$t(`build.fireRate`)}}</span>
            <span>{{item.dmg >= 0 ? "+" : ""}}{{item.dmg}} {{$t(`build.damage`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 环接部 -->
    <div class="partlist" v-if="part === 2">
      <div class="part-box" v-for="item in linksList" :key="item.id">
        <el-radio class="part" v-model="links" :label="item" border>
          <div class="snapshot">
            <img :src="`/img/zawLink${item.id.replace(/II/g, '2').replace(/ /g, '')}.png`" :alt="item.id" width="100%">
          </div>
          <div class="name">
            {{$t(`messages.${item.name}`)}}
          </div>
          <div class="prop">
            <span>{{item.speed >= 0 ? "+" : ""}}{{item.speed}} {{$t(`build.fireRate`)}}</span>
            <span>{{item.dmg >= 0 ? "+" : ""}}{{item.dmg}} {{$t(`build.damage`)}}</span>
            <span>{{item.crit >= 0 ? "+" : ""}}{{(item.crit*100).toFixed()}}% {{$t(`build.critChance`)}}</span>
            <span>{{item.status >= 0 ? "+" : ""}}{{(item.status*100).toFixed()}}% {{$t(`build.status`)}}</span>
          </div>
        </el-radio>
      </div>
    </div>
    <!-- 部件 -->
    <div class="parts">
      <div class="part" v-if="strike">{{$t("zaw.strike")}}: {{$t(`messages.${strike.name}`)}}</div><!--
   --><div class="part" v-if="grip">{{$t("zaw.grip")}}: {{$t(`messages.${grip.name}`)}}</div><!--
   --><div class="part" v-if="links">{{$t("zaw.links")}}: {{$t(`messages.${links.name}`)}}</div>
    </div>
    <!-- 预览 -->
    <div class="preview" v-if="strike">
      <div class="prop">{{$t("build.damage")}}: {{+zaw.panelDamage.toFixed(1)}}</div><!--
   --><div class="prop">{{$t("build.slideDamage")}}: {{+zaw.slideDmg.toFixed(1)}}</div><!--
   --><div class="prop" v-for="dmg in zaw.dmg" :key="dmg[0]"><WfIcon :type="dmg[0].toLowerCase()"/> {{$t(`elements.${dmg[0]}`)}}: {{dmg[1]}}</div><!--
   --><div class="prop">{{$t("build.fireRate")}}: {{zaw.fireRate}}</div><!--
   --><div class="prop">{{$t("build.critMul")}}: {{zaw.critMul}}x</div><!--
   --><div class="prop">{{$t("build.critChance")}}: {{(zaw.critChance*100).toFixed()}}%</div><!--
   --><div class="prop">{{$t("build.status")}}: {{(zaw.status*100).toFixed()}}%</div>
    </div>
    <el-button class="stepctl" :disabled="part === 0" @click="part = part > 0 ? part - 1 : 0">{{$t("zaw.lastStep")}}</el-button>
    <el-button class="stepctl" :disabled="part === 0 && !strike || part === 1 && !grip || part === 2 && !links" @click="part = part < 2 ? part + 1 : (finish(),2)">{{part === 2 ? $t("zaw.finish") : $t("zaw.nextStep")}}</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { ZawStrikeData, ZawGripData, ZawLinksData, ZawStrike, ZawGrip, ZawLinks, Zaw } from "@/warframe/codex";

@Component
export default class extends Vue {
  part = 0;
  strikeList = ZawStrikeData;
  gripList = ZawGripData;
  linksList = ZawLinksData;
  strike: ZawStrike = null;
  grip: ZawGrip = null;
  links: ZawLinks = null;

  get zaw() { return new Zaw(this.strike, this.grip, this.links); }

  finish() {
    this.$emit("finish", this.zaw);
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
.zawbuilder {
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
