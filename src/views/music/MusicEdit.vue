<template>
  <div class="music-edit">
    <el-alert
      title="技术验证中, 可使用下方按键或键盘快捷键输入"
      type="warning">
    </el-alert>
    <div class="edit-header setting">
      <el-select style="width:80px" v-model="music.mode" size="small">
        <el-option class="mode" :key="mode.name" v-for="mode in modes" :label="mode.name" :value="mode.val" :disabled="!modeMaps[mode.val]">
        </el-option>
      </el-select>
      <label>设置: </label>
      <el-switch class="mode-select" v-model="useNumber" :active-text="'简谱'" :inactive-text="'音名'"/>
      <el-switch class="mode-select" v-model="useSharp" :active-text="'升调'" :inactive-text="'降调'"/>
      <!-- <label style="margin:0 8px;">拍号: </label>
      <el-select style="width:80px" size="small" v-model="music.timeSignature[0]">
        <el-option v-for="item in timeSignatures" :key="item" :label="item" :value="item" />
      </el-select>
      /
      <el-select style="width:80px" size="small" v-model="music.timeSignature[1]">
        <el-option v-for="item in timeSignatures" :key="item" :label="item" :value="item" />
      </el-select> -->
      <label>BPM: </label>
      <el-select style="width:80px" size="small" v-model="music.bpm">
        <el-option v-for="item in bpms" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div class="preview-header setting">
      代码:
      <div style="display:inline-block;margin:0 8px">
        <CopyText size="small" :text="music.code" message="代码已复制" />
      </div>
      <el-radio-group size="small" v-model="editMode">
        <el-radio-button label="add"><i class="el-icon-edit"></i></el-radio-button>
        <el-radio-button label="delete"><i class="el-icon-delete"></i></el-radio-button>
      </el-radio-group>
      <el-radio-group size="small" v-model="duration">
        <el-radio-button :label="1">四分(J)</el-radio-button>
        <el-radio-button :label="2">二分(K)</el-radio-button>
        <el-radio-button :label="4">全音(L)</el-radio-button>
      </el-radio-group>
      <el-button style="margin: 0 8px" size="small" @click="music.removeNote()">删除</el-button>
      <el-button style="margin: 0 8px" size="small" type="danger" @click="clearNotes">清空</el-button>
    </div>
    <div class="view-area">
      <div class="piano-header"></div>
      <div class="input-area">
        <div class="piano-key" @click="playNote(note.code, duration)" v-for="note in notes" :key="note.name">
          <div class="note" :class="[ useNumber && note.tone && ('tone' + note.tone) ]">
            {{useNumber ? (useSharp ? note.sharpNumber : note.number) : (useSharp ? note.sharpName : note.name)}}
          </div>
          <div class="key">
            {{keyMaps[note.code]}}
          </div>
        </div>
      </div>
      <div class="preview-area">
        <div class="staff">
          <Notation :showTrebleClef="true" :showBassClef="false">
            <Staff v-for="(note, i) in music.notes" :key="i" :notes="[note.midi]" :type="note.duration === 1 ? 'quard' : (note.duration === 2 ? 'half' : 'full')" />
          </Notation>
        </div>
        <div class="number">
          <div class="number-note note" v-for="(note, i) in music.notes" :key="i"
            :class="[ note.tone && ('tone' + note.tone), note.isSemi && 'semi', 'du' + note.duration ]">
            {{useSharp ? note.sharpNumber : note.number}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import CopyText from "@/components/CopyText.vue";
import Staff from "./components/Staff.vue";
import Notation from "./components/Notation.vue";

import { Sampler } from "tone";
import { bind } from "decko";
import { ModeMaps, Mode, Note, Music } from "./music";

const KeyMaps = {
  Q: "B",
  W: "C",
  E: "E",
  R: "J",
  T: "K",
  Y: "M",
  U: "R",
  I: "S",
  O: "U",
  P: "h",
  "[": "i",
  "]": "k",
};
const KeyMapRev = {
  B: "Q",
  C: "W",
  E: "E",
  J: "R",
  K: "T",
  M: "Y",
  R: "U",
  S: "I",
  U: "O",
  h: "P",
  i: "[",
  k: "]",
};

/* Shawzin */
@Component({ components: { CopyText, Staff, Notation } })
export default class MusicEdit extends Vue {
  editMode = "add";
  /** 显示音名或简谱 */
  useNumber = true;
  /** 显示升调或降调 */
  useSharp = true;
  modeMaps = ModeMaps;
  modes = [
    { name: "五声小调", val: 1 },
    { name: "五声大调", val: 2 },
    { name: "半音", val: 3 },
    { name: "六式音阶", val: 4 },
    { name: "大调", val: 5 },
    { name: "小调", val: 6 },
    { name: "平调子", val: 7 },
    { name: "弗吉利亚调式", val: 8 },
  ];

  /** 1节4秒 64个音符 1秒最多8个音符 即BPM最高480 */
  bpms = [60, 80, 96, 120, 160, 240, 480];
  timeSignatures = [1, 2, 3, 4, 5, 6, 8, 16];
  keyMaps = KeyMapRev;
  sampler: Sampler = null;
  isLoaded = false;
  duration = 1;

  music: Music = new Music();

  /// 函数

  get notes() {
    return _.keyBy(_.reverse("BCEJKMRSUhik".split("")).map(v => new Note(v, ModeMaps[this.music.mode])), "code");
  }

  playNote(note: string, duration = 1) {
    const tone = this.notes[note].toneName;
    this.sampler.triggerAttackRelease(tone, duration);
    this.music.addNote(this.notes[note], duration);
  }

  /// 生命周期

  created() {
    const noteResource = "C4,D4,E4,F4,G4,A4,B4,C5,D5,E5,F5,G5,A5,B5,C6,D6,E6"
      .split(",")
      .map(v => {
        return [v, `/notes/${v}.mp3`];
      })
      .reduce((r, v) => ((r[v[0]] = v[1]), r), {});

    this.sampler = new Sampler(noteResource, () => {
      this.isLoaded = true;
    }).toDestination();
  }
  mounted() {
    document.addEventListener("keydown", this.keyDown);
  }
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyDown);
  }

  /// 事件
  @bind
  keyDown(e: KeyboardEvent) {
    const key = e.key.toUpperCase();

    if (KeyMaps[key]) {
      this.playNote(KeyMaps[key], this.duration);
    } else if (key === "BACKSPACE") {
      this.music.removeNote();
    } else {
      switch (key) {
        case "J":
          this.duration = 1;
          break;
        case "K":
          this.duration = 2;
          break;
        case "L":
          this.duration = 4;
          break;
        default:
        // console.log(key);
      }
    }
  }
  clearNotes() {
    this.music.clear();
  }
}
</script>

<style lang="less">
.music-edit {
  margin: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  .setting {
    padding: 8px 0;
    & > * {
      margin: 0 4px;
    }
  }
  .view-area {
    width: 100%;
    flex: 1;
    display: flex;
    margin: 8px 0;
  }

  .input-area {
    display: flex;
    flex-direction: column;
  }
  .preview-area {
    margin-left: 4px;
    flex: 1;
  }
  .piano-header {
    width: 20px;
    height: fill-content;
    background: #000;
    box-shadow: inset 0 -1px 2px hsla(0, 0%, 100%, 0.4), 0 2px 3px rgba(0, 0, 0, 0.4);
    border-width: 3px 2px 2px;
    border-style: solid;
    border-color: #555 #222 #111 #777;
    position: relative;
  }
  .piano-key {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #555;
    cursor: pointer;
    user-select: none;

    width: 90px;
    height: 32px;
    background: linear-gradient(30deg, #f5f5f5, #fff);
    box-shadow: inset 0 1px 0 #fff, inset 0 -1px 0 #fff, inset 1px 0 0 #fff, inset -1px 0 0 #fff, 0 4px 3px rgba(0, 0, 0, 0.3);
    border: solid 1px #ccc;
    border-radius: 0 0 3px 3px;
    position: relative;

    &:active {
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
      background: #efefef;
    }
  }
  .mode-select {
    margin-right: 8px;
  }

  .el-radio-group .mode {
    margin: 4px 2px;
    background: #fff;
  }
  .key {
    text-align: center;
  }
  .note {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    &.tone1::before {
      content: "·";
      position: absolute;
      top: -0.57em;
      left: 50%;
      margin-left: -0.16em;
    }
    &.tone2::before {
      content: "··";
      position: absolute;
      top: -0.57em;
      left: 50%;
      margin-left: -0.16em;
      transform: rotate(90deg);
    }
    &.du1::after {
      content: "";
      position: absolute;
      width: 14px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      bottom: 0;
      left: 50%;
      height: 2px;
      margin-left: -7px;
    }
    &.du2::after {
      content: "";
      position: absolute;
      width: 14px;
      border-top: 1px solid #000;
      bottom: 0;
      left: 50%;
      height: 2px;
      margin-left: -7px;
    }
  }
  .number {
    margin-bottom: 16px;
  }
  .number-note {
    display: inline-block;
    width: 20px;
    font-size: 20px;
    font-family: "Calibri";
    font-weight: bold;
    text-align: center;
    &:first-child {
      margin-left: 45px;
    }
    &.semi {
      width: 34px;
    }
  }
}
</style>
