<template>
  <div class="mod-container" @paste="handlePaste" v-loading="ocrLoading">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
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
              <el-button slot="reference" class="block btn-addriven" size="medium" icon="el-icon-plus">{{$t("riven.addriven")}}</el-button>
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
                  <span>{{mod.name}} {{mod.subfix}}</span>
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
                    <el-tooltip effect="dark" :content="$t('riven.range', prop.range)" placement="right">
                      <el-tag v-if="prop.displayDeviation" size="small" class="mod-dis" :type="prop.deviation > 1 ^ prop.isNegative ? 'success' : 'danger'"> {{ prop.deviation > 1 ? $t("riven.higher") : $t("riven.lower")}} {{prop.displayDeviation}}</el-tag>
                      <el-tag v-else size="small" class="mod-dis" type="success">{{$t("riven.average")}}</el-tag>
                    </el-tooltip>
                  </div>
                  <div class="mod-extra">
                    <div class="extra-tag mod-rank">{{$t("riven.rank")}}{{mod.rank}}</div>
                    <div class="extra-tag mod-recycleTimes">{{$t("riven.recycle")}}{{mod.recycleTimes}}</div>
                    <div class="extra-tag mod-level">{{$t("riven.level")}}{{mod.level}}</div>
                    <el-tooltip effect="dark" :content="$t('riven.star', [mod.starText])" placement="right">
                      <div class="extra-tag mod-ratio">{{$t("riven.ratio")}}{{mod.ratio}}</div>
                    </el-tooltip>
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
              <div class="mod-history-list">
                <div v-for="(hiRiven, index) in modHistoty" :key="index" @click="newBase64Text(hiRiven.qrCodeBase64)" class="mod-history-item">
                  {{hiRiven.fullName}}
                  <span class="history-delete" @click.stop="removeHistory(hiRiven.qrCode)"><i class="el-icon-close"></i></span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!-- BuildView区域 -->
      <el-col :xs="24" :sm="12" :md="16" :lg="18">
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
import axios from 'axios';
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import GunModBuildView from "@/views/buildview/GunModBuildView.vue";
import MeleeModBuildView from "@/views/buildview/MeleeModBuildView.vue";
import { Getter, Action } from "vuex-class";
import "../less/mod.less";

// import jsQR from "jsqr";
import RivenEditor from "@/components/RivenEditor.vue";
import { RivenMod } from '@/warframe/rivenmod';
import { RivenDataBase } from '@/warframe/codex';

interface OCRResult {
  result: string[]
  success: number
}
@Component({
  components: { GunModBuildView, MeleeModBuildView, RivenEditor }
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
    let vp = RivenDataBase.getRivenWeaponByName(this.mod.id);
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
        const code = null//jsQR(imageData.data, imageData.width, imageData.height);
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
            this.newBase64Text(msg.replace("https://riven.im/riven/", ""));
          } else this.readOCR(blob);
        }).catch(err => {
          console.log("[handlePaste]", err);
          this.readOCR(blob);
        });
        return;
      } else {
        if (item.type === "text/plain")
          item.getAsString(v => {
            console.log("readClipboard=>", v);
            this.modText = v;
          });
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
