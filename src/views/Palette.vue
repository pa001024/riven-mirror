<template>
  <div class="palette-container" @paste="handlePaste">
    <el-row :gutter="20">
      <!-- RGB输入 -->
      <el-col :md="12" :lg="8">
        <el-card>
          <div slot="header" class="title">{{$t("palette.title")}}</div>
          <el-upload class="upload-refimage" drag :show-file-list="false" :style="{'background-image': `url(${refImageURL})`}" action="never" :before-upload="refImageUpload">
            <div class="upload-inner">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text" v-html="$t('palette.uploadtip')"></div>
              <div class="bgmask"></div>
            </div>
          </el-upload>
          <div class="color-box">
            <!-- 色板 -->
            <div class="color-palette">
              <div class="theme-color" :title="color.hex" :style="{'background-color': color.hex}">
              </div>
              <div class="palette-color-list">
                <div class="palette-color" v-for="(color, idx) in paletteColors" :style="{'background-color': color.toString()}" :key="idx" @click="setColor(color.toString())" :title="color.toString()"></div>
              </div>
            </div>
            <!-- 拾色器 -->
            <div class="color-picker">
              <ColorPicker v-model="color"></ColorPicker>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 色板信息输出 -->
      <el-col :md="12" :lg="16">
        <el-row class="palette-list" type="flex" :gutter="20">
          <el-col :md="12" :lg="6" :xl="4" v-for="palette in matchedPalettes" :key="palette.id">
            <el-card class="palette-box" :class="{dark: color.hsl.l < 0.5}">
              <div slot="header" class="palette-name">{{$t(`palette.name.${palette.id}`)}}</div>
              <div class="palette-show">
                <div class="palette-cell" v-for="(color, idx) in palette.colors" :key="idx" @click="setColor(color.toString())" :title="color.toString()" :style="{'background-color': color.toString()}">
                  <i v-if="palette.match.includes(idx)" class="el-icon-check"></i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Chrome as ColorPicker } from "vue-color";
import tinycolor from "tinycolor2";
import ColorThief from "color-thief-browser";
import { Color, PaletteData, ColorHelper } from "@/warframe/codex";

@Component({
  components: { ColorPicker }
})
export default class extends Vue {
  // 参考图
  refImage = null;
  refImageURL = null;
  paletteColors: Color[] = [
    "#bdaaad",
    "#472e25",
    "#cdbab8",
    "#584857",
    "#826c84",
    "#5e5668",
    "#84665c",
    "#928497"
  ].map(v => new Color(v));

  color: {
    hsl: { h: number; s: number; l: number; a: number };
    hex: string;
  } = { hsl: { h: 0.975, s: 0.13, l: 0.7, a: 1 }, hex: "#bdaaad" };
  get colorHEX() {
    return this.color.hex;
  }
  palettes = PaletteData;
  matchedColors = ColorHelper.searchColor(this.colorHEX);
  matchedPalettes = ColorHelper.searchPalette(this.colorHEX);
  @Watch("color")
  reload() {
    this.matchedColors = ColorHelper.searchColor(this.colorHEX);
    this.matchedPalettes = ColorHelper.searchPalette(this.colorHEX);
  }
  setColor(color: string) {
    let c = tinycolor(color);
    this.color = { hsl: c.toHsl(), hex: c.toHexString() };
  }
  refImageUpload(file: File) {
    let ur = URL.createObjectURL(file);
    if (!ur) return;
    let img = new Image();
    img.src = this.refImageURL = ur;
    img.onload = () => {
      let colorThief = new ColorThief();
      let color = new Color(colorThief.getColor(img));
      let palette = [color].concat(
        colorThief.getPalette(img, 8).map(v => new Color(v))
      );
      this.paletteColors = palette;
      this.setColor(color.toString());
    };
    return false;
  }

  handlePaste(ev: ClipboardEvent) {
    let items = ev.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image")) {
        ev.preventDefault();
        let blob = item.getAsFile();
        this.refImageUpload(blob);
        console.log(blob, item);
        return;
      }
    }
  }

  // === 生命周期钩子 ===
  beforeMount() {
    let img = new Image();
    img.src = this.refImageURL = "/img/eidolon-day.jpg";
    img.onload = () => {
      let colorThief = new ColorThief();
      let color = new Color(colorThief.getColor(img));
      let palette = [color].concat(
        colorThief.getPalette(img, 8).map(v => new Color(v))
      );
      this.paletteColors = palette;
      this.setColor(color.toString());
      console.log(palette);
    };
  }
}
</script>
<style lang="less">
.palette-list {
  flex-wrap: wrap;
}
.color-picker {
  .vc-chrome {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
}
.color-box {
  display: flex;
  margin: 16px 0 0;
  .color-palette {
    flex: 1;
    margin-right: 12px;
  }
  .theme-color {
    height: 40px;
  }
  .palette-color {
    display: inline-block;
    width: calc(25% - 4px);
    min-width: 24px;
    height: 24px;
  }
  .palette-color-list {
    margin-top: 12px;
  }
  .palette-color,
  .theme-color {
    cursor: pointer;
    margin: 2px 4px 2px 0;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}
.upload-refimage {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  .el-upload {
    display: block;
  }
  .el-upload-dragger {
    background-color: unset;
    width: initial;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    .el-icon-upload {
      margin: 0 0 16px;
    }
  }
  .upload-inner {
    padding: 20px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0;
    transition: opacity 0.5s;
  }
  &:hover .upload-inner {
    opacity: 1;
  }
}
.palette-box {
  margin: 0 0 12px;
}
.palette-show {
  display: flex;
  flex-wrap: wrap;
}
.dark .palette-cell {
  color: #fff;
}
.palette-cell {
  width: calc(20% - 2px);
  height: 24px;
  margin: 1px;
  line-height: 24px;
  text-align: center;
  color: #000;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 1px #333;
    z-index: 0;
  }
}
</style>
