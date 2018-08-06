<template>
  <div class="mod-container" @paste="handlePaste" v-loading="ocrLoading">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 识别区域 -->
        <el-row>
          <el-col :span="24">
            <el-switch class="mode-select" v-model="useText" active-text="剪贴板识别" inactive-text="文件识别">
            </el-switch>
          </el-col>
          <el-col :span="24">
            <el-input v-if="useText" v-model="modText" @focus="handleFocus" placeholder="在此处粘贴紫卡截图或二维码识别" type="textarea" rows="1"></el-input>
            <el-upload v-else class="upload-pic" ref="upload" drag :before-upload="onUploadStart" :on-success="onUploadSuccess" :on-error="onUploadError" :show-file-list="false" action="http://api.0-0.at/ocr">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
        <!-- 紫卡显示区域 -->
        <el-row>
          <el-col :span="24">
            <div v-show="mod.name" class="mod-display">
              <el-card class="mod-props-box">
                <div slot="header" class="mod-name">
                  <span>{{mod.name}} {{mod.subfix}}</span>
                </div>
                <div v-for="prop in mod.properties" :key="prop.name" class="mod-prop" :class="{'negative-prop':prop.isNegative}">
                  {{prop.displayValue}} {{prop.name}}
                  <el-tag size="small" class="mod-dis" :type="prop.deviation > 1 ^ prop.isNegative ? 'success' : 'danger'"> {{ prop.deviation > 1 ? '高于平均' : '低于平均'}} {{prop.displayDeviation}}</el-tag>
                </div>
                <div class="mod-extra">
                  <el-tag size="medium" class="mod-rank">段位: {{mod.rank}}</el-tag>
                  <el-tag size="medium" class="mod-recycleTimes">循环: {{mod.recycleTimes}}</el-tag>
                  <el-tag size="medium" class="mod-level">等级: {{mod.level}}</el-tag>
                </div>
                <div class="mod-qrcode">
                  <el-popover placement="bottom" trigger="hover">
                    <div style="text-align:center;">
                      <qrcode :value="mod.qrCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                    </div>
                    <div style="text-align:center;">
                      手机扫描或直接粘贴
                    </div>
                    <el-button slot="reference" icon="el-icon-share">分享</el-button>
                  </el-popover>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <!-- 历史记录区域 -->
        <el-row>
          <el-col :span="24">
            <div class="mod-history">
              <el-card class="mod-history-box">
                <div slot="header" class="mod-history-title">
                  历史记录
                </div>
                <ul class="mod-history-list">
                  <li v-for="(hiRiven, index) in modHistoty" :key="index" @click="newBase64Text(hiRiven.qrCodeBase64)" class="mod-history-item">
                    {{hiRiven.fullName}}
                  </li>
                </ul>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- BuildView区域 -->
      <el-col :sm="24" :md="12" :lg="18">
        <el-row>
          <el-col :span="24">
            <gun-mod-build-view :riven="mod" v-if="isGun">
            </gun-mod-build-view>
            <melee-mod-build-view :riven="mod" v-else>
            </melee-mod-build-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import axios from 'axios';
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { RivenMod } from "../warframe";
import GunModBuildView from "@/components/GunModBuildView.vue";
import MeleeModBuildView from "@/components/MeleeModBuildView.vue";
import qrcode from "@/components/QRCode";
import { Getter, Action } from 'vuex-class'
import jsQR from "jsqr";
import { RivenDataBase } from "@/warframe/data";

interface OCRResult {
  result: string[]
  success: number
}
@Component({
  components: { GunModBuildView, MeleeModBuildView, qrcode }
})
export default class Mod extends Vue {
  // prop
  @Prop() source: string;

  // 使用剪贴板识别
  useText = true;
  modText = "";
  ocrLoading = false;
  debouncedmodTextChange: (() => void);
  @Getter("mod") mod: RivenMod;
  @Getter("modHistoty") modHistoty: RivenMod[];
  @Action("newBase64Text") newBase64Text: (text: string) => void
  @Action("newModTextInput") newModTextInput: (text: string) => void
  get isGun() {
    let vp = RivenDataBase.getRivenWeaponByName(this.mod.name);
    return vp && vp.mod != "Melee";
  }
  readQRCode(file: File) {
    return new Promise((resolve: (msg: string) => void, reject) => {
      let ur = URL.createObjectURL(file);
      let cvs = document.createElement("canvas");
      let ctx = cvs.getContext("2d");
      let img = new Image();
      img.onload = () => {
        cvs.height = img.height;
        cvs.width = img.width;
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        let imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code)
          resolve(code.data);
        else
          reject("no code");
      };
      img.src = ur;
    });
  }
  readOCR(file: File) {
    let formData = new FormData();
    formData.append('file', file);
    this.ocrLoading = true;
    axios.post("http://api.0-0.at/ocr", formData, { timeout: 3000, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        this.ocrLoading = false;
        let rst = response.data as OCRResult;
        if (rst) {
          this.modText = rst.result.map(v => v.trim()).join("\n");
        }
      })
      .catch(error => {
        this.ocrLoading = false;
        console.log("[ocrLoading] FAIL", error);
      });
  }
  handlePaste(ev: ClipboardEvent) {
    let items = ev.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image")) {
        ev.preventDefault();
        let blob = item.getAsFile();
        this.readQRCode(blob).then(msg => {
          if (msg) {
            console.log("readQRCode=>", msg);
            this.newBase64Text(msg.replace("http://rm.0-0.at/riven/", ""));
          } else this.readOCR(blob);
        }).catch(err => {
          console.log(err);
          this.readOCR(blob);
        });
        return;
      }
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
      this.newModTextInput(this.modText);
      if (this.mod.name) {
        localStorage.setItem("modText", this.modText);
        console.log("状态更新:", this.modText);
        this.modText = "";
      }
    }, 100);
    if (this.source) {
      console.log("read source:", this.source);
      this.newBase64Text(this.source);
    }
  }
  @Watch("mod")
  modChange() {
    this.$router.push({ name: 'ModWithSource', params: { source: this.mod.qrCodeBase64 } });
  }
  mounted() { }
}
</script>

<style>
.mod-history-item {
  cursor: pointer;
}
.mod-history-item:hover {
  text-decoration: underline;
}
.mod-qrcode button.el-popover__reference {
  display: block;
  width: 100%;
}
.mod-qrcode {
  margin: 16px 0 0;
  text-align: center;
}
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
.mod-props-box,
.mod-history-box {
  margin: 16px 0 0;
}
.negative-prop {
  color: #f56c6c;
}
.upload-pic .el-upload {
  display: block;
}
.upload-pic .el-upload-dragger {
  width: initial;
}
</style>
