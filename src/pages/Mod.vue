<template>
  <div class="mod-container" @paste="handlePaste" v-loading="ocrLoading">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" :lg="6">
        <!-- 识别区域 -->
        <el-row>
          <el-col :span="24">
            <el-switch class="mode-select" v-model="useText" :active-text="$t('riven.manualinput')" :inactive-text="$t('riven.picupload')">
            </el-switch>
          </el-col>
          <el-col :span="24">
            <el-popover ref="addpop" v-if="useText" placement="bottom" :width="400" v-model="editorVisible">
              <RivenEditor v-model="editorRivenCode"></RivenEditor>
              <div style="text-align: right; margin: 0">
                <el-button size="medium" @click="editorVisible = false">{{$t("riven.cancel")}}</el-button>
                <el-button type="primary" size="medium" @click="newRiven">{{$t("riven.confirm")}}</el-button>
              </div>
              <el-button slot="reference" class="block btn-addriven" size="medium" v-model="modText" icon="el-icon-plus">{{$t("riven.addriven")}}</el-button>
            </el-popover>
            <el-upload v-else class="upload-pic" ref="upload" drag :before-upload="onUploadStart" :on-success="onUploadSuccess" :on-error="onUploadError" :show-file-list="false" action="https://api.0-0.at/api/ocr">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text" v-html="$t('riven.uploadtip')"></div>
              <div slot="tip" class="el-upload__tip">{{$t("riven.uploadlimit")}}</div>
            </el-upload>
          </el-col>
        </el-row>
        <!-- 紫卡显示区域 -->
        <el-row>
          <el-col :span="24">
            <div v-show="mod.name" class="mod-display">
              <div class="mod-props-box">
                <div class="mod-name">
                  <span>{{$t("zh") ? mod.name : mod.id}} {{mod.subfix}}</span>
                  <el-popover placement="bottom" trigger="hover">
                    <div style="text-align:center;">
                      <qrcode :value="mod.qrCodeURL" :options="{ size: 150, foreground: '#333' }"></qrcode>
                    </div>
                    <div style="text-align:center;">
                      {{$t("riven.sharetip")}}
                    </div>
                    <i slot="reference" class="el-icon-share share-icon"></i>
                  </el-popover>
                </div>
                <div class="mod-props">
                  <div v-for="prop in mod.properties" :key="prop.name" class="mod-prop" :class="{'negative-prop':prop.isNegative}">
                    {{$t("prop.fullName." + prop.id, [prop.displayValue])}}
                    <el-tag v-if="prop.displayDeviation" size="small" class="mod-dis" :type="prop.deviation > 1 ^ prop.isNegative ? 'success' : 'danger'"> {{ prop.deviation > 1 ? $t("riven.higher") : $t("riven.lower")}} {{prop.displayDeviation}}</el-tag>
                    <el-tag v-else size="small" class="mod-dis" type="success">{{$t("riven.average")}}</el-tag>
                  </div>
                  <div class="mod-extra">
                    <div class="extra-tag mod-rank">{{$t("riven.rank")}}{{mod.rank}}</div>
                    <div class="extra-tag mod-recycleTimes">{{$t("riven.recycle")}}{{mod.recycleTimes}}</div>
                    <div class="extra-tag mod-level">{{$t("riven.level")}}{{mod.level}}</div>
                    <div class="extra-tag mod-ratio">{{$t("riven.ratio")}}{{mod.ratio}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 历史记录区域 -->
        <el-row>
          <el-col :span="24">
            <div class="mod-history">
              <div class="mod-history-title">
                {{$t("riven.history")}}
              </div>
              <ul class="mod-history-list">
                <li v-for="(hiRiven, index) in modHistoty" :key="index" @click="newBase64Text(hiRiven.qrCodeBase64)" class="mod-history-item">
                  {{$t("zh") ? hiRiven.fullName : hiRiven.fullId}}
                  <span class="history-delete" @click.stop="removeHistory(hiRiven.qrCode)"><i class="el-icon-close"></i></span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- BuildView区域 -->
      <el-col :sm="24" :md="12" :lg="18">
        <el-row>
          <el-col :span="24">
            <component :riven="mod" :is="isGun ? 'GunModBuildView' : 'MeleeModBuildView'"></component>
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
import { RivenMod, RivenDataBase } from "../warframe";
import GunModBuildView from "@/pages/buildview/GunModBuildView.vue";
import MeleeModBuildView from "@/pages/buildview/MeleeModBuildView.vue";
import qrcode from "@/components/QRCode";
import { Getter, Action } from 'vuex-class'
import jsQR from "jsqr";
import RivenEditor from "@/components/RivenEditor.vue";

interface OCRResult {
  result: string[]
  success: number
}
@Component({
  components: { GunModBuildView, MeleeModBuildView, qrcode, RivenEditor }
})
export default class Mod extends Vue {
  // prop
  @Prop() source: string;

  // 使用剪贴板识别
  useText = true;
  modText = "";
  ocrLoading = false;
  debouncedmodTextChange: (() => void);
  editorVisible = false;
  editorRivenCode = "";
  @Getter("mod") mod: RivenMod;
  @Getter("modHistoty") modHistoty: RivenMod[];
  @Action("newBase64Text") newBase64Text: (text: string) => void;
  @Action("newModTextInput") newModTextInput: (text: string) => void;
  @Action("removeHistory") removeHistory: (qrcode: string) => void;
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
    axios.post("https://api.0-0.at/ocr", formData, { timeout: 6e3, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        this.ocrLoading = false;
        let rst = response.data as OCRResult;
        if (rst) {
          console.log("readOCR=>", rst);
          this.modText = rst.result.map(v => v.trim()).join("\n");
        }
      })
      .catch(error => {
        this.ocrLoading = false;
        console.log("[ocrLoading] FAIL", error);
      });
  }
  // === 事件处理 ===
  newRiven() {
    this.editorVisible = false;
    this.newBase64Text(this.editorRivenCode);
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
            this.newBase64Text(msg.replace("https://rm.0-0.at/riven/", ""));
          } else this.readOCR(blob);
        }).catch(err => {
          console.log("[handlePaste]", err);
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
  @Watch("mod")
  modChange() {
    this.$router.push({ name: 'ModWithSource', params: { source: this.mod.qrCodeBase64 } });
  }
  // === 生命周期钩子 ===
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
  mounted() {
    let popper = (this.$refs.addpop as Vue).$refs.popper as Element;
    popper.className += " rivenedit-popper";
  }
}
</script>

<style>
.mod-display .share-icon {
  float: right;
  line-height: 23px;
  cursor: pointer;
  transition: 0.5s;
}
.mod-display .share-icon:hover {
  opacity: 0.7;
}
.mod-history {
  background-color: #3d5afe;
  background-image: linear-gradient(90deg, #3d5afe 0%, #508aff 100%);
  color: #fff;
  margin: 12px 0;
  border-radius: 20px;
  padding: 16px;
}
.mod-history-title {
  padding: 8px 20px;
  background-color: #fff;
  color: #3d5afe;
  border-radius: 20px;
}
.mod-history-list {
  list-style-type: decimal;
  margin: 8px 24px 0 36px;
}
.mod-container .mod-display .mod-name {
  background-color: #3d5afe;
  background-image: linear-gradient(90deg, #3d5afe 0%, #508aff 100%);
  color: #fff;
  border-radius: 100px;
  padding: 8px 20px;
  margin: 12px 0 0;
  border: 0;
  box-shadow: 1px 1px 4px rgba(61, 90, 254, 0.15);
}
.mod-props {
  background: #fff;
  margin: 0 26px;
  border-left: 4px solid #3e5dfe;
  border-right: 4px solid #508aff;
  border-radius: 0 0 20px 20px;
  box-shadow: 1px 1px 4px rgba(61, 90, 254, 0.15);
}
.mod-props .mod-prop:first-child {
  padding-top: 12px;
}
.mod-props .mod-prop {
  line-height: 1.5em;
  padding: 4px 18px;
}
.mod-props .mod-prop .mod-dis {
  float: right;
  border: 0;
}
.mod-extra {
  margin: 0 8px;
  padding: 0 0 8px;
}
.extra-tag {
  display: inline-block;
  margin: 8px 4px 4px;
  padding: 4px 8px;
  border: 2px solid #508aff;
  border-radius: 20px;
  color: #508aff;
  font-size: 0.9em;
}
.mod-container .btn-addriven {
  background-color: #3d5afe;
  background-image: linear-gradient(90deg, #3d5afe 0%, #508aff 100%);
  color: #fff;
  border-radius: 100px;
  border: 0;
  box-shadow: 1px 1px 4px rgba(61, 90, 254, 0.15);
}
.mod-container .btn-addriven:focus,
.mod-container .btn-addriven:active,
.mod-container .btn-addriven:hover {
  color: #fff;
}

/* 以上是新样式 */

.history-delete {
  float: right;
}
.history-delete:hover {
  color: #f56c6c;
}
@media only screen and (max-width: 484px) {
  .rivenedit-popper {
    width: calc(100vw - 84px) !important;
  }
}
.mod-history-item {
  cursor: pointer;
  line-height: 1.5;
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
.mod-container .mod-name {
  font-size: 1.2em;
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
  height: 150px;
}
</style>
