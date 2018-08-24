<template>
  <el-tabs class="timeline-tabs" v-model="visType">
    <el-tab-pane name="表格">
      <span slot="label" class="enemy-tablabel">表格</span>
      <div class="timeline-text">
        <div class="item">
          <div class="time">
            时间
          </div>
          <div class="hit">
            伤害
          </div>
          <div class="dot" v-if="hasDoT">
            DoT伤害
          </div>
          <div class="hp">
            剩余生命
          </div>
          <div class="ar" v-if="hasArmorChange">
            剩余护甲
          </div>
        </div>
        <div class="item" v-for="(text, sec) in timelineText" :key="sec">
          <div class="time">
            {{text.time / 1e3}}
          </div>
          <div class="hit">
            {{text.hit}}
          </div>
          <div class="dot" v-if="hasDoT">
            {{text.dot}}
          </div>
          <div class="hp">
            {{text.hp}}
          </div>
          <div class="ar" v-if="hasArmorChange">
            {{text.ar}}
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="图表">
      <span slot="label" class="enemy-tablabel">图表</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { EnemyTimelineState, Enemy } from "@/warframe";


@Component
export default class EnemyTimeline extends Vue {
  @Prop() timeline: EnemyTimelineState[];
  visType = "表格";
  hasDoT = false;
  hasArmorChange = false;

  get timelineText() {
    let rst = [];
    let lastHitHead = this.timeline[0];
    this.hasDoT = false;
    this.timeline.forEach((v, i) => {
      if (v.isDoT) {
        let hit = this.timeline[i - 1];
        let dot = ~~(hit.health - v.health)
        rst.push({
          time: v.ms,
          hit: ~~(lastHitHead.health - hit.health),
          dot,
          hp: ~~v.health,
          ar: ~~v.armor,
        });
        if (v.armor != this.timeline[0].armor) this.hasArmorChange = true;
        if (dot > 0) this.hasDoT = true;
        lastHitHead = v;
      } else if (i === this.timeline.length - 1) {
        rst.push({
          time: v.ms,
          hit: ~~(lastHitHead.health - v.health),
          dot: 0,
          hp: 0,
          ar: 0,
        });
      }
    });
    return rst;
  }
}

</script>

<style>
.timeline-text {
  display: flex;
  flex-wrap: wrap;
}
.timeline-text .item {
  flex: 1;
}
.timeline-text .item:first-child > * {
  background: #d9e6ff;
}
.timeline-text .item > * {
  height: 1.5em;
  padding: 4px;
  margin: 4px;
  font-size: 1em;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #89b2fd;
  border-radius: 2px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
