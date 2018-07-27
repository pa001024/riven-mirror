<template>
  <div class="mod-container" @paste="handlePaste" v-loading="ocrLoading">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <el-row>
          <el-col :span="24">
            <el-switch class="mode-select" v-model="useText" active-text="剪贴板识别" inactive-text="文件识别">
            </el-switch>
          </el-col>
          <el-col :span="24">
            <el-input v-if="useText" v-model="modText" @focus="handleFocus" placeholder="在此处粘贴紫卡截图或文本进行识别" type="textarea" rows="1"></el-input>
            <el-upload v-else class="upload-pic" ref="upload" drag :before-upload="onUploadStart" :on-success="onUploadSuccess" :on-error="onUploadError" :show-file-list="false" action="http://api.0-0.at/ocr">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div v-show="mod.name" class="mod-display">
              <el-card class="mod-props-box">
                <div slot="header" class="mod-name">
                  <span>{{mod.name}} {{mod.subfix}}</span>
                </div>
                <div v-for="prop in mod.properties" :key="prop.name" :class="{'negative-prop':prop.isNegative}">
                  {{prop.displayValue}} {{prop.name}}
                  <el-tag size="small" class="mod-dis" :type="prop.deviation > 1 ^ prop.isNegative ? 'success' : 'danger'"> {{ prop.deviation > 1 ? '高于平均' : '低于平均'}} {{prop.displayDeviation}}</el-tag>
                </div>
                <div class="mod-extra">
                  <el-tag size="medium" class="mod-rank">段位: {{mod.rank}}</el-tag>
                  <el-tag size="medium" class="mod-recycleTimes">循环: {{mod.recycleTimes}}</el-tag>
                  <el-tag size="medium" class="mod-level">等级: {{mod.level}}</el-tag>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="24" :md="12" :lg="18">
        <el-row>
          <el-col :span="24">
            <gun-mod-build-view :riven="mod" v-if="isGun">
            </gun-mod-build-view>
            <el-alert v-else title="暂不支持近战自动分析" type="error" :closable="false">
            </el-alert>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import axios from 'axios';
import { Vue, Component, Watch } from "vue-property-decorator";
import { RivenMod } from "../warframe";
import GunModBuildView from "@/components/GunModBuildView.vue";
import store from "../store";


interface OCRResult {
  result: string[]
  success: number
}
@Component({
  components: { GunModBuildView }
})
export default class Mod extends Vue {
  // 使用剪贴板识别
  useText = true;
  modText = "";
  ocrLoading = false;
  debouncedmodTextChange: (() => void);
  get mod(): RivenMod { return store.getters.mod; }
  get isGun() {
    let vp = this.mod.db.getRivenWeaponByName(this.mod.name);
    return vp && vp.mod != "Melee";
  }

  handlePaste(ev: ClipboardEvent) {
    let vm = this;
    let items = ev.clipboardData.items;
    if (items && items[0].type.startsWith("image")) {
      ev.preventDefault();
      let blob = items[0].getAsFile();
      let formData = new FormData();
      formData.append('file', blob);
      vm.ocrLoading = true;
      axios.post("http://api.0-0.at/ocr", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
          vm.ocrLoading = false;
          let rst = response.data as OCRResult;
          if (rst) {
            vm.modText = rst.result.map(v => v.trim()).join("\n");
          }
        })
        .catch(function (error) {
          vm.ocrLoading = false;
          console.log(error);
        });;
    }
  }
  handleFocus() {
    this.modText = "";
  }
  onUploadStart(file) {
    this.ocrLoading = true;
  }
  onUploadSuccess(response, file, fileList) {
    this.ocrLoading = false;
    let rst = response as OCRResult;
    if (rst) {
      this.modText = rst.result.map(v => v.trim()).join("\n");
    }
  }
  onUploadError(err, file, fileList) {
    this.ocrLoading = false;
  }
  @Watch("modText")
  modTextChange(newVal, oldVal) {
    if (this.modText !== "") {
      this.debouncedmodTextChange();
    }
  }
  beforeMount() {
    this.debouncedmodTextChange = _.debounce(() => {
      this.mod.parseString(this.modText);
      store.commit('newModTextInput', this.modText);
      if (this.mod.name)
        localStorage.setItem("modText", this.modText);
      this.modText = "";
    }, 200);
    // TEST DATA
    let sto = localStorage.getItem("modText");
    if (sto) {
      store.commit('newModTextInput', sto);
    } else
      store.commit('newModTextInput', `光谱切割器Visi-armatis
+241%伤害
+96.5%暴击伤害
+54.2%弹匣容量
段位8`);
  }
  mounted() {
  }
}
</script>

<style scoped>
.mode-select {
  margin: 8px;
}
.mod-name {
  font-size: 18pt;
  font-weight: bold;
}
.mod-extra {
  margin-top: 8px;
}
.mod-props-box {
  margin: 16px 0;
}
.negative-prop {
  color: #f56c6c;
}
.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin: 20px 0;
  line-height: 24px;
}
</style>
