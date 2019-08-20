<template>
  <keep-alive>
    <div v-if="enemy" class="enemy-main">
      <!-- 敌人信息区域 -->
      <div class="enemy-info">
        <div class="item enemy-name">
          <div class="key">{{$t("enemy.name")}}</div>
          <div class="value">{{enemy.name}}</div>
        </div>
        <div class="item enemy-faction">
          <div class="key">{{$t("enemy.faction")}}</div>
          <div class="value">{{enemy.factionName}}</div>
        </div>
        <div class="item enemy-level">
          <div class="key">{{$t("enemy.level")}}</div>
          <div class="value control"><el-input size="small" class="enemy-level-edit" v-model="fakeEnemyLevel" @input="$emit('update:enemyLevel', $event)"></el-input></div>
        </div>
        <div class="item enemy-health">
          <div class="key">{{$t(`enemy.fleshType.${enemy.fleshType}`)}}</div>
          <div class="value">{{enemy.health.toFixed()}}</div>
        </div>
        <div v-if="enemy.shield > 0" class="item enemy-shield">
          <div class="key">{{$t(`enemy.fleshType.${enemy.shieldType}`)}}</div>
          <div class="value">{{enemy.shield.toFixed()}}</div>
        </div>
        <div v-if="enemy.armor > 0" class="item enemy-armor">
          <div class="key">{{$t(`enemy.fleshType.${enemy.armorType}`)}}</div>
          <div class="value">{{enemy.armor.toFixed()}}</div>
        </div>
        <div v-if="enemy.resistence > 0" class="item enemy-resistence">
          <div class="key">{{$t("enemy.resistence")}}</div>
          <div class="value">{{enemy.resistenceText}}</div>
        </div>
        <div class="item enemy-amrorreduce">
          <div class="key">{{$t("enemy.amrorReduce")}}</div>
          <div class="value control"><el-input size="small" class="enemy-amrorreduce-edit" v-model="fakeAmrorReduce" @input="$emit('update:amrorReduce', $event)"></el-input></div>
        </div>
        <!-- <div class="item enemy-shieldreduce">
          <div class="key">{{$t("enemy.shieldReduce")}}</div>
          <div class="value control"><el-input size="small" class="enemy-shieldreduce-edit" v-model="shieldReduce"></el-input></div>
        </div> -->
        <div class="item enemy-action">
          <div class="key">{{$t("enemy.action")}}</div>
          <div class="value control">
            <el-checkbox :value="perBullet" @change="$emit('update:perBullet', $event)">{{$t('enemy.perBullet')}}</el-checkbox>
          </div>
          <div class="value control"><el-button size="small" @click="selectEnemy(null)">{{$t("enemy.reselect")}}</el-button></div>
        </div>
      </div>
      <!-- 伤害显示区域 -->
      <EnemyTimeline :perBullet="perBullet" :timeline="build.getTimeline()"/>
    </div>
    <EnemySelector v-else @select="selectEnemy"/>
  </keep-alive>
</template>


<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import EnemySelector from "@/components/EnemySelector.vue";
import EnemyTimeline from "@/components/EnemyTimeline.vue";
import { Enemy } from "@/warframe/codex";
import { ModBuild } from "@/warframe/modbuild";

@Component({
  components: { EnemySelector, EnemyTimeline },
})
export default class Simulacrum extends Vue {
  @Prop({ required: true }) build: ModBuild;
  @Prop({ required: true }) selectEnemy: Function;
  @Prop({ required: true }) enemy: Enemy;
  /** need .sync */
  @Prop() enemyLevel: number;
  /** need .sync */
  @Prop() amrorReduce: number;
  /** need .sync */
  @Prop() shieldReduce: number;
  /** need .sync */
  @Prop() perBullet: boolean;

  fakeAmrorReduce = this.amrorReduce;
  fakeEnemyLevel = this.enemyLevel;
}
</script>
