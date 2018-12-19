<template>
  <div class="team-editor-main">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 基础信息区域 -->
        <div class="core-info" v-if="core">
          <el-card class="infobox">
            <!-- 二维码和名称 -->
            <div slot="header" class="core-name">
              <span>{{core.name}}</span>
              <!-- <el-popover placement="bottom" trigger="click">
                <el-input :value="build.miniCodeURL" size="small" ref="miniCodeURL" @focus="$refs.miniCodeURL.select()"></el-input>
                <div style="text-align:center;">
                  <qrcode :value="build.miniCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                </div>
                <div style="text-align:center;">
                  {{$t("riven.sharetip")}}
                </div>
                <i slot="reference" class="el-icon-share share-icon"></i>
              </el-popover> -->
            </div>
            <table class="warframe-props">
              <tbody>
                <tr class="prop-diff cost-show">
                  <th>{{$t('build.cost')}}</th>
                  <td class="diff diff-ori">
                    {{build.totalCost}}
                  </td>
                  <template v-if="build.totalCost > 0">
                    <td class="diff diff-arrow">/</td>
                    <td class="diff diff-val">
                      {{build.maxCost}}
                    </td>
                  </template>
                </tr>
                <PropDiff :name="$t('build.health')" :ori="core.health" :val="build.health"></PropDiff>
                <PropDiff :name="$t('build.shield')" :ori="core.shield" :val="build.shield"></PropDiff>
                <PropDiff :name="$t('build.armor')" :ori="core.armor" :val="build.armor"></PropDiff>
                <PropDiff :name="$t('build.energy')" :ori="core.energy" :val="build.energy"></PropDiff>
                <PropDiff :name="$t('build.sprint')" :ori="core.sprint" :val="build.sprint" :preci="2"></PropDiff>
                <br>
                <PropDiff :name="$t('build.abilityStrength')" :ori="core.abilityStrength" :val="build.abilityStrength" subfix="%"></PropDiff>
                <PropDiff :name="$t('build.abilityDuration')" :ori="core.abilityDuration" :val="build.abilityDuration" subfix="%"></PropDiff>
                <PropDiff :name="$t('build.abilityEfficiency')" :ori="core.abilityEfficiency" :val="build.abilityEfficiency" subfix="%"></PropDiff>
                <PropDiff :name="$t('build.abilityRange')" :ori="core.abilityRange" :val="build.abilityRange" subfix="%"></PropDiff>
              </tbody>
            </table>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Warframe, WarframeDataBase } from "@/warframe";
import { WarframeBuild } from "@/warframe/warframebuild";
import PropDiff from "@/components/PropDiff.vue";

@Component({ components: { PropDiff } })
export default class extends Vue {
  get id() { return this.$route.params.id; }
  get code() { return this.$route.params.code; }

  private _lastid = "";
  private _core: Warframe = null;
  private _build: WarframeBuild = null;

  get core() { if (this.id !== this._lastid) this.reload(); return this._core; }
  get build() { if (this.id !== this._lastid) this.reload(); return this._build; }

  @Watch("$route")
  reload() {
    if (!this.id || this._lastid === this.id) return;
    this._lastid = this.id;
    this._core = WarframeDataBase.getWarframeById(this.id.replace(/_/g, " "));
    this._build = new WarframeBuild(this.core);
  }

}
</script>

<style lang="less">
@text_grey : #606266;

.team-editor-main {
  .warframe-props {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
    font-size: 1em;
    th {
      color: @text_grey;
      font-weight: inherit;
      text-align: left;
    }
  }
}
</style>
