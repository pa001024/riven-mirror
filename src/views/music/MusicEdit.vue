<template>
  <div class="music-edit" tabindex="0" @keydown="keyDown" @keyup="keyUp" @mousemove="selectMove" @mouseup="selectEnd">
    <div class="edit-header setting">
      <el-button size="small" type="primary" @click="showHelp = true">{{$t('shawzin.help')}}</el-button>
      <el-select style="width:90px" v-model="music.mode" size="small">
        <el-option :key="mode.name" v-for="mode in modes" :label="$t(`shawzin.${mode.name}`)" :value="mode.val" :disabled="!modeMaps[mode.val]" />
      </el-select>
      <el-select style="width:120px" v-model="instrument" size="small">
        <el-option :label="$t('shawzin.piano')" value="piano"/>
        <el-option :label="$t('shawzin.shawzin')" value="shawzin"/>
        <el-option :label="$t('shawzin.lotus')" value="lotus"/>
      </el-select>
      <i v-if="!isLoaded" class="el-icon-loading"></i>
      <!-- 额外设置 -->
      <el-popover
        placement="top"
        v-model="settingVisible">
        <!-- BPM -->
        <div class="setting-line">
          <label>BPM: </label>
          <el-select style="width:80px" size="small" v-model="music.bpm">
            <el-option v-for="item in bpms" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
        <!-- 简谱 -->
        <div class="setting-line">
          <el-switch class="mode-select" v-model="useNumber" :active-text="$t('shawzin.number')" :inactive-text="$t('shawzin.name')"/>
        </div>
        <!-- 升降符号 -->
        <div class="setting-line">
          <el-switch class="mode-select" v-model="useSharp" :active-text="$t('shawzin.upshift')" :inactive-text="$t('shawzin.downshift')"/>
        </div>
        <!-- 五线谱 -->
        <div class="setting-line">
          <el-switch class="mode-select" v-model="showStaff" :active-text="$t('shawzin.staff')"/>
        </div>
        <!-- 调号 -->
        <div class="setting-line">
          {{$t('shawzin.transpose')}}
          <el-select style="width:80px" v-model="music.numberShift" size="mini">
            <el-option label="C" :value="0"/>
            <el-option label="bD" :value="1"/>
            <el-option label="D" :value="2"/>
            <el-option label="bE" :value="3"/>
            <el-option label="E" :value="4"/>
            <el-option label="F" :value="5"/>
            <el-option label="bG" :value="6"/>
            <el-option label="G" :value="7"/>
            <el-option label="bA" :value="8"/>
            <el-option label="A" :value="9"/>
            <el-option label="bB" :value="10"/>
            <el-option label="B" :value="11"/>
          </el-select>
        </div>
        <!-- 简谱导入导出 -->
        <div class="setting-line">
          <el-button-group>
            <el-tooltip effect="dark" :content="$t('shawzin.importNumberSeqs')" placement="bottom">
              <el-button size="small" @click="importNumberSeqs" icon="el-icon-download"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" :content="$t('shawzin.copyNumberSeqs')" placement="bottom">
              <el-button size="small" @click="copyNumberSeqs" icon="el-icon-copy-document"></el-button>
            </el-tooltip>
            <!-- MIDI导入 -->
            <el-tooltip effect="dark" :content="$t('shawzin.importMidi')" placement="bottom">
              <el-button size="small" @click="importMidi">MIDI</el-button>
            </el-tooltip>
            <input type="file" ref="midiFile" class="el-upload__input" @change="midiFileChange">
          </el-button-group>
        </div>
        <el-button slot="reference" size="small" icon="el-icon-setting"></el-button>
      </el-popover>
      <!-- 工具选择 -->
      <el-radio-group size="small" v-model="editMode">
        <el-radio-button label="move"><i class="el-icon-rank"></i></el-radio-button>
        <el-radio-button label="add"><i class="el-icon-edit"></i></el-radio-button>
        <el-radio-button label="delete"><i class="el-icon-delete"></i></el-radio-button>
      </el-radio-group>
      <!-- 长度选择 -->
      <el-radio-group size="small" v-model="duration">
        <el-radio-button :label="1">{{$t('shawzin.quarter')}}(J)</el-radio-button>
        <el-radio-button :label="2">{{$t('shawzin.half')}}(K)</el-radio-button>
        <el-radio-button :label="4">{{$t('shawzin.full')}}(L)</el-radio-button>
      </el-radio-group>
      <!-- 操作 -->
      <el-button-group>
        <el-button size="small" type="danger" :disabled="isRecording" icon="el-icon-video-camera" @click="recordSeq"></el-button>
        <el-button size="small" type="primary" v-if="!isPlaying" :disabled="isRecording" icon="el-icon-video-play" @click="playSeq"></el-button>
        <el-button size="small" type="primary" v-else icon="el-icon-video-pause" @click="stopSeq(true)"></el-button>
        <el-button size="small" :disabled="!isPlaying && !isRecording && !isShowStop" @click="stopSeq()"><WfIcon type="stop" /></el-button>
        <el-button size="small" v-model="loop" :type="loop ? 'primary' : 'normal'" @click="loop = !loop"><WfIcon type="loop" /></el-button>
        <el-button size="small" @click="backspace" icon="el-icon-back"></el-button>
        <el-tooltip effect="dark" :content="$t('shawzin.importCode')" placement="bottom">
          <el-button size="small" @click="importCode" icon="el-icon-download"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('shawzin.copyCode')" placement="bottom">
          <el-button size="small" @click="copyCode" icon="el-icon-copy-document"></el-button>
        </el-tooltip>
      </el-button-group>
      <!-- 清空 -->
      <el-popover
        placement="top"
        v-model="clearConfirmVisible">
        <p>{{$t('shawzin.clearConfirm')}}</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="clearConfirmVisible = false">{{$t('riven.cancel')}}</el-button>
          <el-button type="primary" size="mini" @click="clearConfirmVisible = false;clearNotes()">{{$t('riven.confirm')}}</el-button>
        </div>
        <el-button-group slot="reference">
          <el-tooltip effect="dark" :content="$t('shawzin.empty')" placement="bottom">
            <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </el-button-group>
      </el-popover>
    </div>
    <div class="view-area">
      <div class="input-box">
        <div class="notation-header">
          <Notation v-if="showStaff" :showTrebleClef="true" :showBassClef="false">
            <Staff :notes="[0]" :duration="4" />
          </Notation>
          <div class="note-count">
            {{blocks.length}} {{$t("shawzin.note")}}
          </div>
        </div>
        <div class="piano">
          <div class="piano-header"></div>
          <div class="input-area">
            <div class="piano-key" @click="music.addNote(null, duration)">
              <div class="note">0</div>
              <div class="key">S</div>
            </div>
            <div class="piano-key" @click="playAndAddNote(note.code, duration)" v-for="note in notes" :key="note.name">
              <div class="note" :class="[ useNumber && note.tone && ('tone' + note.tone) ]">{{useNumber ? (useSharp ? note.sharpNumber : note.number) : (useSharp ? note.sharpName : note.name)}}</div>
              <div class="key">{{keyMaps[note.code]}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 钢琴窗 -->
      <div class="piano-window" @mousedown="onCanvasDragStart" :class="{drag: isDragCanvas, draging: draggingCanvas}" ref="pianoWindow">
        <div class="preview-area">
          <div class="staff" v-if="showStaff">
            <Notation :showTrebleClef="true" :showBassClef="false">
              <Staff v-for="(note, i) in music.notes" :key="i" :notes="[note.shiftMidi]" :type="calcNoteType(i)" :duration="note.duration" />
            </Notation>
          </div>
          <div class="number">
            <div class="number-note note" v-for="(note, i) in music.notes" :key="i"
              :class="[ note.tone && ('tone' + note.tone), 'du' + note.duration ]">{{useSharp ? note.sharpNumber : note.number}}</div>
          </div>
        </div>
        <div class="timelines" @mousedown="moveCursor">
          <div class="time-anchor" ref="timeAnchor"></div>
          <div class="timeline" v-for="line in (maxLines/4)" :key="line">
            <span>#{{line}}</span>
            <span>{{lineToTime(line)}}</span>
          </div>
        </div>
        <div class="piano-canvas" ref="pCanvas" @mousedown="selectStart" :class="{ addmode: editMode === 'add' }">
          <div class="lines">
            <div class="line" v-for="line in maxLines" :key="line"></div>
          </div>
          <div class="block" :class="{noevent:isSelect, selected: block.selected}" v-for="(block, index) in blocks" :key="index"
            :style="{top:block.y+'px',left:block.x+'px',width:block.width+'px'}"
            @mousedown.stop="singleSelectStart($event,{block, index})"
          >{{toNote(block.y)}}<!--
       --></div>
          <div class="select-border" v-show="isSelect" ref="selectBorder" />
        </div>
        <!-- <Spectrogram ref="spectrogram" :height="400" :timeScale="timeToPixelRatio" /> -->
      </div>
    </div>
    <el-dialog
      class="update-dialog"
      :title="$t('shawzin.help')"
      :visible.sync="showHelp">
      <div class="help-item">
        <article class="md markdown-body" v-html="userGuide"></article>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="showHelp = false">{{$t('update.confirm')}}</el-button>
      </span>
    </el-dialog>
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
import copy from "copy-text-to-clipboard";
import { ModeMaps, Mode, Note, Music } from "./music";
import { Timer } from "./timer";
import help from "./help";
import { Midi } from "@tonejs/midi";
import markdown from "markdown-it";
const md = markdown();

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
const NumsToNote = {
  [Mode.PentatonicMinor]: {
    1: "B",
    2: "C",
    4: "E",
    5: "J",
    6: "K",
    "+!": "M",
    "+@": "R",
    "+$": "S",
    "+%": "U",
    "+^": "h",
    "!1": "i",
    "!2": "k",
  },
  [Mode.PentatonicMajor]: {
    1: "B",
    2: "C",
    3: "E",
    5: "J",
    6: "K",
    "+!": "M",
    "+@": "R",
    "+#": "S",
    "+%": "U",
    "+^": "h",
    "!1": "i",
    "!2": "k",
  },
  [Mode.Chromatic]: {
    1: "B",
    2: "E",
    3: "K",
    4: "M",
    5: "S",
    6: "h",
    7: "k",
  },
  [Mode.Hexatonic]: {
    1: "B",
    2: "C",
    4: "E",
    5: "K",
    6: "M",
    "+!": "R",
    "+@": "S",
    "+$": "U",
    "+%": "i",
    "+^": "k",
  },
  [Mode.Major]: {
    1: "B",
    2: "C",
    3: "E",
    4: "J",
    5: "K",
    6: "M",
    7: "R",
    "+!": "S",
    "+@": "U",
    "+#": "h",
    "+$": "i",
    "+%": "k",
  },
  [Mode.Minor]: {
    1: "B",
    2: "C",
    3: "E",
    4: "J",
    5: "K",
    6: "M",
    7: "R",
    "+!": "S",
    "+@": "U",
    "+#": "h",
    "+$": "i",
    "+%": "k",
  },
  [Mode.Hirajoshi]: {
    1: "B",
    2: "C",
    4: "E",
    5: "K",
    6: "M",
    "+!": "R",
    "+@": "S",
    "+$": "U",
    "+%": "i",
    "+^": "k",
  },
  [Mode.Phrygian]: {
    1: "B",
    2: "C",
    3: "E",
    4: "J",
    5: "K",
    6: "M",
    7: "R",
    "+!": "S",
    "+@": "U",
    "+#": "h",
    "+$": "i",
    "+%": "k",
  },
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

const Keys = _.reverse("BCEJKMRSUhik".split(""));

interface MusicBlock {
  x: number;
  y: number;
  width: number;
  selected: boolean;
}

const instrumentResource = {
  piano: {
    path: "https://cdn.riven.im/instruments/piano/",
    keys: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
  },
  shawzin: {
    path: "https://cdn.riven.im/instruments/shawzin/",
    keys: [
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "A3",
      "B3",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "C5",
      "D5",

      "Db3",
      "Eb3",
      "Gb3",
      "Ab3",
      "Bb3",
      "Db4",
      "Eb4",
      "Gb4",
      "Ab4",
      "Bb4",
      "Db5",
      "Eb5",
    ],
  },
  lotus: {
    path: "https://cdn.riven.im/instruments/lotus/",
    keys: [
      "C3",
      "D3",
      "E3",
      "F3",
      "G3",
      "A3",
      "B3",
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "C5",
      "D5",

      "Db3",
      "Eb3",
      "Gb3",
      "Ab3",
      "Bb3",
      "Db4",
      "Eb4",
      "Gb4",
      "Ab4",
      "Bb4",
      "Db5",
      "Eb5",
    ],
  },
};

const ROW_WIDTH = 20,
  COL_HEIGHT = 32;
/* Shawzin */
@Component({ components: { CopyText, Staff, Notation } })
export default class MusicEdit extends Vue {
  editMode = "move";
  /** 乐器 */
  instrument = "lotus";
  /** 显示音名或简谱 */
  useNumber = true;
  /** 显示升调或降调 */
  useSharp = true;
  modeMaps = ModeMaps;
  modes = [
    { name: "pentatonicMinor", val: 1 },
    { name: "pentatonicMajor", val: 2 },
    { name: "chromatic", val: 3 },
    { name: "hexatonic", val: 4 },
    { name: "major", val: 5 },
    { name: "minor", val: 6 },
    { name: "hirajoshi", val: 7 },
    { name: "phrygian", val: 8 },
    { name: "yo", val: 9 },
  ];

  get userGuide() {
    const locale = this.$i18n.locale;
    let helpText: string;
    switch (locale) {
      case "zh-CN":
      case "zh-CY":
        helpText = help.cn;
        break;
      default:
        helpText = this.$t("zh") ? help.zh : help.en;
    }
    return this.renderMD(helpText);
  }

  /** 1节4秒 64个音符 一拍(2秒)最多16个音符 即BPM最高960 */
  bpms = [64, 80, 96, 120, 160, 192, 240, 320, 480, 960];
  timeSignatures = [1, 2, 3, 4, 5, 6, 8, 16];
  keyMaps = KeyMapRev;
  sampler: Sampler = null;
  isLoaded = false;
  duration = 1;

  music: Music = new Music();
  isDragCanvas = false;
  draggingCanvas = false;
  showHelp = false;
  clearConfirmVisible = false;
  settingVisible = false;
  loop = false;
  showStaff = document.body.clientWidth > 760;

  history = [];
  historyIndex = 0;
  /** url code */
  @Prop() code: string;

  /// 函数

  renderMD(text: string) {
    return md.render(text);
  }

  lineToTime(line: number) {
    const ratio = 6e4 / this.music.bpm; // 1音符毫秒数
    let sec = (line * 4 * ratio) / 1e3; // 4音符秒数
    if (sec % 1 != 0) return "";
    let min = ~~(sec / 60);
    min = min % 60;
    sec = sec % 60;
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }

  get timeToPixelRatio() {
    return (this.music.bpm / 60) * ROW_WIDTH;
  }

  get midiFile() {
    return this.$refs.midiFile as HTMLInputElement;
  }

  get pianoWindow() {
    return this.$refs.pianoWindow as HTMLDivElement;
  }

  get notes() {
    return _.keyBy(Keys.map(v => new Note(v, this.music)), "code");
  }

  get maxLines() {
    return 4 * this.music.bpm;
  }

  toNote(y: number) {
    const note = this.notes[Keys[~~(y / COL_HEIGHT)]];
    return this.useNumber ? (this.useSharp ? note.sharpNumber : note.number) : this.useSharp ? note.sharpName : note.name;
  }

  calcNoteType(i: number) {
    const note = this.music.notes[i];
    let dur = note.duration;
    for (let j = i; j < this.music.notes.length; j++) {
      const next = this.music.notes[j];
      if (next.duration != 0) {
        dur = next.duration;
        break;
      }
    }
    return dur === 1 ? "quard" : dur === 2 ? "half" : "full";
  }

  playNote(note?: number | string | string[], duration = 1) {
    let tone: string | string[];
    if (typeof note === "undefined") {
      note = this.blocks.filter(b => b.x === ROW_WIDTH * (this.currentLine - 1)).map(b => Keys[~~(b.y / COL_HEIGHT)]);
      if (!note.length) return;
    }
    if (typeof note === "number") {
      note = Keys[~~(note / COL_HEIGHT)];
    }
    if (Array.isArray(note)) {
      tone = note.map(v => this.notes[v].toneName);
    } else {
      tone = this.notes[note].toneName;
    }
    try {
      this.sampler.triggerAttack(tone);
    } catch {}
  }

  playAndAddNote(note: string, duration = 1) {
    this.playNote(note, duration);
    if (this.currentLine !== -1) {
      const y = Keys.indexOf(note) * COL_HEIGHT;
      this.blocks.push({
        x: (this.currentLine - 1) * ROW_WIDTH,
        y,
        width: ROW_WIDTH,
        selected: false,
      });
      this.commitBlocks();
    } else {
      this.music.addNote(this.notes[note], duration);
      this.reload();
      this.pushState();
    }
  }

  analysis() {
    (this.$refs.spectrogram as any).upload();
  }

  /** 移动 */
  move(x: number, y: number) {
    const selected = this.blocks.filter(b => b.selected);
    const max = this.maxLines;
    if (!selected.length) return;
    selected.forEach(b => {
      b.x = Math.min(Math.max(0, b.x + x * ROW_WIDTH), max * ROW_WIDTH);
      b.y = Math.min(Math.max(0, b.y + y * COL_HEIGHT), 11 * COL_HEIGHT);
    });
    if (selected.length === 1) {
      this.playNote(selected[0].y);
    }
    return this;
  }
  /** 移动选区 */
  moveSelect(x: number, y: number) {
    const selected = this.blocks.findIndex(b => b.selected);
    this.selectAll(false);
    if (this.blocks[selected + x]) {
      this.blocks[selected + x].selected = true;
    }
    return this;
  }
  /** 选择到 */
  selectTo(dir: 1 | -1) {
    if (dir > 0) {
      this.blocks.reduce((r, b) => (r = b.selected = r || b.selected), false);
    } else {
      this.blocks.reduceRight((r, b) => (r = b.selected = r || b.selected), false);
    }
    return this;
  }
  /** 时值缩放 */
  scale(to: 1 | -1) {
    let selected = this.blocks.filter(b => b.selected);
    if (!selected.length) selected = [this.blocks[this.blocks.length - 1]];
    if (to > 0) {
      selected.forEach(b => {
        b.width = Math.max(ROW_WIDTH, b.width + ROW_WIDTH);
      });
    } else {
      selected.forEach(b => {
        b.width = Math.max(ROW_WIDTH, b.width - ROW_WIDTH);
      });
    }
    return this;
  }
  /** 时轴缩放 */
  scaleAndMove(to: 1 | -1) {
    let selected = this.blocks.find(b => b.selected);
    this.scale(to)
      .selectTo(1)
      .move(to, 0)
      .selectAll(false);
    selected.selected = true;
    selected.x -= to * ROW_WIDTH;
    return this;
  }
  /** 插入空白 */
  insert(space = 1) {
    const selected = this.blocks.find(b => b.selected);
    this.selectTo(1)
      .move(space, 0)
      .selectAll(false);
    selected.selected = true;
    return this;
  }
  /** 撤销 */
  undo() {
    const last = this.history[this.historyIndex - 1];
    if (last) {
      this.music.code = last;
      this.reload();
      if (this.history[this.historyIndex - 1]) --this.historyIndex;
    }
    // console.log(this.history.map((v, i) => (i === this.historyIndex ? "[!]>" : "") + v).join("\n"));
    return this;
  }
  /** 重做 */
  redo() {
    const last = this.history[this.historyIndex + 1];
    if (last) {
      this.music.code = last;
      this.reload();
      if (this.history[this.historyIndex + 1]) ++this.historyIndex;
    }
    return this;
  }
  /** 滚动到 */
  scrollTo(index: number) {
    if (index < 0) index = ~~(this.blocks[this.blocks.length - 1].x / ROW_WIDTH);
    this.pianoWindow.scrollTo(index * ROW_WIDTH - this.pianoWindow.clientWidth / 2, 0);
    return this;
  }
  /** 软性滚动 */
  scrollToSoft(index: number) {
    if (index < 0) index = ~~(this.blocks[this.blocks.length - 1].x / ROW_WIDTH);
    const pw = this.pianoWindow;
    if (index === 0) pw.scrollLeft = 0;
    else {
      if (pw.scrollLeft < index * ROW_WIDTH - pw.clientWidth * 2 + 120) pw.scrollLeft = index * ROW_WIDTH - 40;
      else if (pw.scrollLeft < index * ROW_WIDTH - pw.clientWidth + 40) pw.scrollLeft += pw.clientWidth - 80;
    }
    return this;
  }

  copyCache = [];

  /** 全选 */
  selectAll(val = true) {
    this.blocks.forEach(v => (v.selected = val));
    return this;
  }
  /** 删除 */
  delete() {
    this.blocks = this.blocks.filter(v => !v.selected);
    return this;
  }
  /** 波纹删除 */
  rippleDelete() {
    const toDelete = this.blocks.filter(v => v.selected);
    const min = toDelete[0].x;
    const max = toDelete[toDelete.length - 1].x + toDelete[toDelete.length - 1].width;
    const offset = max - min;
    this.blocks = this.blocks
      .filter(v => !v.selected)
      .map(b => {
        if (b.x >= max) {
          b.x -= offset;
        }
        return b;
      });
    return this;
  }
  /** 剪切 */
  cut() {
    this.copyCache = this.blocks.filter(b => b.selected);
    this.delete();
    this.$message({
      showClose: true,
      message: this.$t("shawzin.blockCopied") as string,
      type: "success",
    });
    return this;
  }
  /** 复制 */
  copy() {
    this.copyCache = this.blocks.filter(b => b.selected);
    this.$message({
      showClose: true,
      message: this.$t("shawzin.blockCopied") as string,
      type: "success",
    });
    return this;
  }
  /** 粘贴 */
  paste() {
    if (!this.copyCache.length) return;
    let target: number;
    if (this.currentLine != -1) target = (this.currentLine - 1) * ROW_WIDTH;
    else {
      const last = this.blocks[this.blocks.length - 1];
      target = last.x + last.width;
    }
    const source = _.cloneDeep(this.copyCache);
    this.blocks.forEach(b => (b.selected = false));
    const min = source.reduce((r, v) => Math.min(r, v.x), Infinity);
    const offset = target - min;
    if (isNaN(offset)) return;
    const toPaste = source.map(b => {
      b.x += offset;
      b.selected = true;
      return b;
    });
    this.blocks = this.blocks.concat(toPaste);
    return this;
  }
  /** 退格 */
  backspace() {
    this.music.removeNote();
    this.reload();
    this.pushState();
  }
  /** 撤销重做记录历史 */
  pushState(init = false) {
    if (this.historyIndex < this.history.length - 1) this.history.splice(0, this.historyIndex + 1);
    const code = this.music.code;
    this.history.push(code);
    if (!init) localStorage.setItem("lastMusic", code);
    this.historyIndex = this.history.length - 1;
    if (this.history.length > 100) {
      this.history.shift();
    }
  }

  blocks: MusicBlock[] = [];

  reload() {
    const space = this.music.space;
    const blocks: MusicBlock[] = [];
    const notes = this.music.musicNotes;
    let zeroNoteCache: Note[] = [];
    for (let i = 0; i < notes.length; i++) {
      const mn = notes[i];
      if (mn.duration === 0) {
        zeroNoteCache.push(mn);
      } else {
        zeroNoteCache.forEach(v => (v.duration = mn.duration));
        zeroNoteCache = [];
      }
      blocks.push({
        x: (mn.position / space) * ROW_WIDTH,
        y: (11 - mn.seq) * COL_HEIGHT,
        width: mn.duration * ROW_WIDTH,
        selected: false,
      });
    }

    this.blocks = blocks;
  }

  /// 生命周期

  created() {
    this.reloadInstrumentResource();
    const code = this.code || localStorage.getItem("lastMusic") || "5MAAEAQKAUMAcSAgRAoMAwEA0MA8EBMKBQMBYSBcUBgMBo";
    if (!localStorage.getItem("lastMusic")) this.showHelp = true;
    this.music.code = code;
    this.reload();
    this.pushState(true);
  }
  @Watch("instrument")
  reloadInstrumentResource() {
    if (this.sampler) this.sampler.dispose();
    this.isLoaded = false;
    const res = instrumentResource[this.instrument];
    const noteResource = res.keys
      .map(v => {
        return [v, `${res.path}${v}.mp3`];
      })
      .reduce((r, v) => ((r[v[0]] = v[1]), r), {});

    this.sampler = new Sampler(noteResource, () => {
      this.isLoaded = true;
    }).toDestination();
  }
  mounted() {
    this.currentLine = -1;
    this.updateAnchorPosition();

    const pw = this.$refs.pianoWindow as HTMLDivElement;
    // IE9, Chrome, Safari, Opera
    pw.addEventListener("mousewheel", this.scrollHorizontally, false);
    // Firefox
    pw.addEventListener("DOMMouseScroll", this.scrollHorizontally, false);
  }
  destroyed() {
    this.stopSeq();
  }

  scrollHorizontally(e: MouseWheelEvent) {
    e.preventDefault();
    var delta = Math.max(-1, Math.min(1, e["wheelDelta"] || -e.detail));
    this.pianoWindow.scrollLeft -= delta * 40;
  }
  /// 事件
  @bind
  keyDown(e: KeyboardEvent) {
    const key = (e.ctrlKey ? "^" : "") + (e.shiftKey ? "+" : "") + (e.altKey ? "!" : "") + e.key.toUpperCase();

    if (NumsToNote[this.music.mode] && NumsToNote[this.music.mode][key]) {
      if (this.isPlaying) return;
      e.preventDefault();
      this.playAndAddNote(NumsToNote[this.music.mode][key], this.duration);
      return;
    }
    if (KeyMaps[key]) {
      if (this.isPlaying) return;
      e.preventDefault();
      this.playAndAddNote(KeyMaps[key], this.duration);
      return;
    }
    switch (key) {
      case " ":
        this.isDragCanvas = true;
        break;
      case "BACKSPACE":
        this.backspace();
        break;
      case "DELETE":
        this.delete().commitBlocks();
        break;
      case "^DELETE":
      case "+DELETE":
        this.rippleDelete().commitBlocks();
        break;
      case "J":
        this.duration = 1;
        break;
      case "K":
        this.duration = 2;
        break;
      case "L":
        this.duration = 4;
        break;
      case "S":
      case "0":
        this.music.addNote(null, this.duration);
        break;
      case "^Z":
        this.undo().commitBlocks(false);
        break;
      case "^+Z":
        this.redo().commitBlocks(false);
        break;
      case "^A":
        e.preventDefault();
        this.selectAll();
        break;
      case "^X":
        this.cut().commitBlocks();
        break;
      case "^C":
        this.copy();
        break;
      case "^V":
        this.paste().commitBlocks();
        break;
      // 移动
      case "^ARROWDOWN":
        this.move(0, 1).commitBlocks();
        break;
      case "^ARROWUP":
        this.move(0, -1).commitBlocks();
        break;
      case "^ARROWLEFT":
        this.move(-1, 0).commitBlocks();
        break;
      case "^ARROWRIGHT":
        this.move(1, 0).commitBlocks();
        break;
      // 选择到开头/末尾
      case "+ARROWLEFT":
      case "+HOME":
        this.selectTo(-1);
        break;
      case "+ARROWRIGHT":
      case "+END":
        this.selectTo(1);
        break;
      // 移动选择
      case "ARROWLEFT":
        e.preventDefault();
        this.currentLine = Math.max(this.currentLine - 1, -1);
        this.updateAnchorPosition();
        break;
      case "ARROWRIGHT":
        e.preventDefault();
        this.currentLine = Math.min(this.currentLine + 1, this.maxLines);
        this.updateAnchorPosition();
        break;
      case "ARROWUP":
        e.preventDefault();
        this.moveSelect(-1, 0);
        break;
      case "ARROWDOWN":
        e.preventDefault();
        this.moveSelect(1, 0);
        break;
      // 缩放音符
      case "+ARROWUP":
        e.preventDefault();
        this.scale(1);
        break;
      case "+ARROWDOWN":
        e.preventDefault();
        this.scale(-1);
        break;
      // 缩放并移动音符
      case "^+ARROWUP":
        e.preventDefault();
        this.scaleAndMove(1).commitBlocks();
        break;
      case "^+ARROWDOWN":
        e.preventDefault();
        this.scaleAndMove(-1).commitBlocks();
        break;
      // 插入空白
      case "INSERT":
        e.preventDefault();
        this.insert().commitBlocks();
        break;
      case "+INSERT":
        e.preventDefault();
        this.insert(2).commitBlocks();
        break;
      case "^INSERT":
        e.preventDefault();
        this.insert(4).commitBlocks();
        break;
      case "!INSERT":
        e.preventDefault();
        this.insert(-1).commitBlocks();
        break;
      case "END":
        e.preventDefault();
        this.scrollTo(-1);
        break;
      case "HOME":
        e.preventDefault();
        this.scrollTo(0);
        break;
      default:
      // console.debug(key);
      case "^CONTROL":
      case "+SHIFT":
    }
  }
  @bind
  keyUp(e: KeyboardEvent) {
    const key = e.key.toUpperCase();
    switch (key) {
      case " ":
        this.isDragCanvas = false;
        break;
    }
  }
  @bind
  onCanvasDragStart(e: MouseEvent) {
    if (this.isDragCanvas) {
      this.draggingCanvas = true;
      document.addEventListener("mousemove", this.onCanvasDragging);
      document.addEventListener("mouseup", this.onCanvasDragEnd);
      // 全局屏蔽选择文本
      document["onselectstart"] = () => false;
    }
  }
  @bind
  onCanvasDragging(e: MouseEvent) {
    if (this.draggingCanvas) {
      e.preventDefault();
      this.$refs.pianoWindow["scrollBy"](-e.movementX, -e.movementY);
    }
  }
  @bind
  onCanvasDragEnd(e: MouseEvent) {
    this.draggingCanvas = false;
    document.removeEventListener("mousemove", this.onCanvasDragging);
    document.removeEventListener("mouseup", this.onCanvasDragEnd);
    document["onselectstart"] = null;
  }

  isSelect = false;
  isMoveCursor = false;
  selectBorder = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    x1: 0,
    y1: 0,
  };
  // 音符选择
  selectStart(e: MouseEvent) {
    if (e.button != 0 || this.isDragCanvas) return;
    const pv = this.$refs.pCanvas as HTMLDivElement;
    const rect = pv.getBoundingClientRect();
    const eX = e.clientX - rect.left;
    const eY = e.clientY - rect.top;

    switch (this.editMode) {
      case "add":
        this.blocks.push({
          x: ~~(eX / ROW_WIDTH) * ROW_WIDTH,
          y: ~~(eY / COL_HEIGHT) * COL_HEIGHT,
          width: this.duration * ROW_WIDTH,
          selected: false,
        });
        this.playNote(eY);
        this.commitBlocks();
        break;
      case "move":
        this.isSelect = true;
        this.selectBorder.x = this.selectBorder.x1 = eX;
        this.selectBorder.y = this.selectBorder.y1 = eY;
        this.selectBorder.w = 0;
        this.selectBorder.h = 0;
        this.updateSelectBorder();
        break;
    }
  }
  isShowStop = false;
  moveCursor(e: MouseEvent) {
    if (e.button != 0 || this.isDragCanvas) return;
    this.isMoveCursor = true;
    this.isShowStop = true;
    const pv = this.$refs.pCanvas as HTMLDivElement;
    const rect = pv.getBoundingClientRect();
    const eX = e.clientX - rect.left;
    const eY = e.clientY - rect.top;
    this.currentLine = ~~(eX / ROW_WIDTH) + 1;
    this.updateAnchorPosition();
    if (this.isPlaying) this.playTimer.seekStep(this.currentLine);
  }

  updateAnchorPosition() {
    const ac = this.$refs.timeAnchor as HTMLDivElement;
    ac.style.transform = `translate(${this.currentLine * 20 - 21}px)`;
  }

  isBlockMoving = false;
  isBlockMoved = false;
  movingIndex: number;
  movingOffsetX: number;
  movingOffsetY: number;
  /** 单个音符选择 */
  singleSelectStart(e: MouseEvent, { block, index }: { block: MusicBlock; index: number }) {
    if (e.button != 0) return;
    const pv = this.$refs.pCanvas as HTMLDivElement;
    const rect = pv.getBoundingClientRect();
    const eX = e.clientX - rect.left;
    const eY = e.clientY - rect.top;
    switch (this.editMode) {
      case "add":
      case "move":
        this.isBlockMoving = true;
        this.isBlockMoved = false;
        this.movingOffsetX = eX - block.x;
        this.movingOffsetY = eY - block.y;

        this.movingIndex = index;
        // ctrl 多选
        if (e.ctrlKey) {
          block.selected = !block.selected;
        } else if (!block.selected) {
          // shift范围选
          if (e.shiftKey) {
            const selected = this.blocks.filter(b => b.selected);
            if (selected.length) {
              const s = selected[0].x;
              const min = Math.min(s, block.x),
                max = Math.max(s, block.x);
              this.blocks.forEach(b => {
                if (b.x >= min && b.x <= max) {
                  b.selected = true;
                }
              });
            }
          } else {
            this.blocks.forEach(b => (b.selected = false));
            block.selected = true;
          }
        }
      default:
        this.playNote(block.y);
        break;
      case "delete":
        this.blocks.splice(index, 1);
        this.commitBlocks();
        break;
    }
  }

  updateSelectBorder() {
    const b = this.$refs.selectBorder as HTMLDivElement;
    b.style.left = this.selectBorder.x + "px";
    b.style.top = this.selectBorder.y + "px";
    b.style.width = this.selectBorder.w + "px";
    b.style.height = this.selectBorder.h + "px";
  }

  // 音符移动
  selectMove(e: MouseEvent) {
    const pv = this.$refs.pCanvas as HTMLDivElement;
    const rect = pv.getBoundingClientRect();
    const eX = e.clientX - rect.left;
    const eY = e.clientY - rect.top;
    if (this.isMoveCursor) {
      const n = ~~(eX / ROW_WIDTH) + 1;
      if (this.currentLine !== n) {
        this.currentLine = n;
        this.updateAnchorPosition();
        if (this.isPlaying) this.playTimer.seekStep(this.currentLine);
        else this.playNote();
      }
    }
    if (this.isSelect) {
      this.selectBorder.x = Math.min(this.selectBorder.x1, eX);
      this.selectBorder.y = Math.min(this.selectBorder.y1, eY);
      this.selectBorder.w = Math.abs(this.selectBorder.x1 - eX);
      this.selectBorder.h = Math.abs(this.selectBorder.y1 - eY);
      this.updateSelectBorder();
    }
    if (this.isBlockMoving) {
      const box = this.selectBorder;
      const block = this.blocks[this.movingIndex];
      const offsetX = Math.floor((eX - block.x + ROW_WIDTH / 2 - this.movingOffsetX) / ROW_WIDTH);
      const offsetY = Math.floor((eY - block.y + COL_HEIGHT / 2 - this.movingOffsetY) / COL_HEIGHT);
      const selected = this.blocks.filter(v => v.selected);
      const max = this.maxLines;
      if (offsetX || offsetY) {
        selected.forEach(b => {
          b.x = Math.min(Math.max(0, b.x + offsetX * ROW_WIDTH), max * ROW_WIDTH);
          b.y = Math.min(Math.max(0, b.y + offsetY * COL_HEIGHT), 11 * COL_HEIGHT);
        });
        this.isBlockMoved = true;
      }
    }
  }
  // 音符选择结束
  selectEnd(e: MouseEvent) {
    const space = this.music.space;
    if (this.isSelect) {
      this.isSelect = false;
      const box = this.selectBorder;
      this.blocks.forEach(block => {
        if (
          Math.abs(block.x + block.width / 2 - (box.x + box.w / 2)) <= (block.width + box.w) / 2 &&
          Math.abs(block.y + COL_HEIGHT / 2 - (box.y + box.h / 2)) <= (COL_HEIGHT + box.h) / 2
        ) {
          block.selected = true;
          if (this.editMode != "move") this.editMode = "move";
        } else if (!e.ctrlKey) {
          block.selected = false;
        }
      });
    }
    if (this.isBlockMoving) {
      this.isBlockMoving = false;
      if (this.isBlockMoved) this.commitBlocks();
    }
    if (this.isMoveCursor) {
      this.isMoveCursor = false;
    }
  }

  /** 将blocks的修改写入 */
  commitBlocks(write = true) {
    const seqs = this.blocks
      .sort((a, b) => {
        return a.x - b.x || a.y - b.y;
      })
      .map(b => {
        const k = 11 - ((b.y / COL_HEIGHT) | 0);
        const t = (b.x / ROW_WIDTH) | 0;
        return [k, t] as [number, number];
      });
    this.music.setSeqs(seqs);
    if (write) this.pushState();
  }

  importCode() {
    const code = prompt(this.$t("shawzin.importCode") as any, "");
    if (!code) return;
    this.music.code = code;
    this.reload();
    this.pushState();
  }

  copyCode() {
    copy(this.music.code);

    this.$message({
      showClose: true,
      message: this.$t("shawzin.codeCopied") as string,
      type: "success",
    });
  }

  importNumberSeqs() {
    const code = prompt(this.$t("shawzin.importNumberSeqs") as any, "");
    if (!code) return;
    this.music.numberSeqs = code;
    this.reload();
    this.pushState();
  }

  copyNumberSeqs() {
    copy(this.music.numberSeqs);

    this.$message({
      showClose: true,
      message: this.$t("shawzin.numCopied") as string,
      type: "success",
    });
  }

  importMidi() {
    this.midiFile.click();
  }

  midiFileChange(e: any) {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const midi = new Midi(e.target.result as ArrayBuffer);
        this.loadMidi(midi);
        this.midiFile.value = null;
      };
      reader.readAsArrayBuffer(file);
    }
  }

  loadMidi(midi: Midi) {
    const bpm = midi.header.tempos[0].bpm;
    const notes = midi.tracks[0].notes;
    const seqs = notes.map(v => {
      // console.log(v.midi, v.time, (v.time / bpm) * 120 * 4);
      return [this.music.getNoteByMidi(v.midi + 24 - this.music.numberShift).seq, ((v.time / 120) * bpm * 4) | 0] as [number, number];
    });
    this.music.setSeqs(seqs);
    console.log(seqs);
    this.reload();
    this.pushState();
  }
  // 存在超大性能问题 不能作为data使用
  currentLine: number;
  isPlaying = false;
  isRecording = false;
  playTimer: Timer = null;
  // 播放
  playSeq() {
    this.isPlaying = true;
    const seq = [];
    let fullLength = 0;
    this.blocks.forEach(b => {
      const index = ~~(b.x / ROW_WIDTH);
      const key = Keys[~~(b.y / COL_HEIGHT)];
      fullLength = Math.max(fullLength, index);
      if (seq[index]) {
        seq[index].push(key);
      } else {
        seq[index] = [key];
      }
    });
    fullLength++;
    if (this.currentLine != -1) this.currentLine--;
    let startLine = this.currentLine;
    this.playTimer = new Timer(t => {
      this.currentLine = t + startLine;
      this.updateAnchorPosition();
      this.scrollToSoft(this.currentLine);
      if (seq[this.currentLine]) {
        this.playNote(seq[this.currentLine]);
      }
      if (this.currentLine > fullLength) {
        if (this.loop) {
          startLine = -1;
          this.playTimer.seek(-1e3);
        } else this.stopSeq();
      }
    }, 6e4 / this.music.bpm).start();
  }
  // 停止
  stopSeq(pause = false) {
    if (!pause) {
      this.currentLine = -1;
      this.updateAnchorPosition();
    }
    if (this.playTimer) this.playTimer.stop();
    this.isPlaying = false;
    this.isRecording = false;
    this.isShowStop = false;
  }
  // 录制
  recordSeq() {
    this.isRecording = true;
    const pw = this.$refs.pianoWindow as HTMLDivElement;
    const offset = this.currentLine;
    this.playTimer = new Timer(t => {
      this.currentLine = t + offset;
      this.updateAnchorPosition();
      pw.scrollTo(this.currentLine * 20 - pw.clientWidth / 2, 0);
    }, 6e4 / this.music.bpm).start();
  }

  clearNotes() {
    this.music.clear();
    this.reload();
    this.pushState();
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
  background-color: var(--theme_mainback);
  min-height: 100%;
  overflow: hidden;
  &:focus {
    outline: none;
  }
  .setting {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    & > * {
      margin: 3px;
    }
  }
  .view-area {
    width: 100%;
    flex: 1;
    display: flex;
    margin: 8px 0;
    align-items: flex-start;
  }

  .piano {
    display: flex;
  }
  .piano-header {
    user-select: none;
    width: 20px;
    background: #000;
    box-shadow: inset 0 -1px 2px hsla(0, 0%, 100%, 0.4), 0 2px 3px rgba(0, 0, 0, 0.4);
    border-width: 3px 2px 2px;
    border-style: solid;
    border-color: #555 #222 #111 #777;
  }
  .piano-window {
    flex: 1;
    overflow: scroll hidden;
    &.drag {
      cursor: grab !important;
    }
    &.draging {
      cursor: grabbing !important;
    }
  }
  .noevent {
    pointer-events: none;
  }
  .timelines {
    width: max-content;
    cursor: pointer;
    user-select: none;
    position: relative;
  }
  .timeline {
    display: inline-flex;
    justify-content: space-between;
    width: 80px;
    height: 32px;
    align-items: center;
    padding: 4px;
    border-right: 1px solid #6199ff;
  }
  .time-anchor {
    position: absolute;
    width: 2px;
    background: #6199ff;
    height: 384px;
    top: 32px;
    z-index: 1;
    will-change: transform;
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: -9px;
      left: -4px;
      border: 5px solid transparent;
      border-top: 10px solid #6199ff;
    }
  }
  .piano-canvas {
    width: max-content;
    position: relative;
    user-select: none;
    &.addmode {
      cursor: crosshair;
    }
    .line {
      display: inline-block;
      height: 384px;
      width: 20px;
      &:nth-child(odd) {
        background: #dee9fd;
      }
      &:nth-child(4n) {
        border-right: 1px solid #6199ff;
      }
    }
    .block {
      display: flex;
      align-items: center;
      padding: 0 2px;
      color: #fff;
      position: absolute;
      height: 32px;
      background-color: #6199ff;
      cursor: move;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.25);
      border-radius: 3px;
      &.selected {
        background-color: #3d5afe;
      }
      :active {
        background-color: #b0ffca;
      }
    }
    .select-border {
      display: inline-block;
      position: absolute;
      border: 1px dashed #082846;
      user-select: none;
      pointer-events: none;
      will-change: top, left, width, height;
    }
  }
  .input-area {
    display: flex;
    flex-direction: column;
  }
  .preview-area {
    margin-left: 4px;
    width: max-content;
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
    &.tone-1::before {
      content: "·";
      position: absolute;
      bottom: -0.57em;
      left: 0;
      margin-left: 0.13em;
    }
    &.tone1::before {
      content: "·";
      position: absolute;
      top: -0.57em;
      left: 0;
      margin-left: 0.13em;
    }
    &.tone2::before {
      content: "··";
      position: absolute;
      top: -0.57em;
      left: 0;
      margin-left: 0.13em;
      transform: rotate(90deg);
    }
    &.du0 {
      width: 0;
      transform: translateY(-20px);
    }
    &.du2 {
      width: 40px;
    }
    &.du4 {
      width: 80px;
    }
    &.du1::after {
      content: "";
      position: absolute;
      width: 20px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      bottom: 0;
      height: 4px;
      left: 0;
      margin-left: -5px;
      box-sizing: border-box;
    }
    &.du2::after {
      content: "";
      position: absolute;
      width: 20px;
      border-top: 1px solid #000;
      bottom: 0;
      height: 4px;
      left: 0;
      margin-left: -5px;
      box-sizing: border-box;
    }
  }
  .number {
    margin-bottom: 16px;
    height: 24px;
  }
  .number-note {
    display: inline-block;
    width: 20px;
    font-size: 20px;
    font-family: "Calibri";
    font-weight: bold;
  }
  .staff {
    margin-left: -48px;
  }
  .notation-header {
    > .container {
      margin-left: 32px;
    }
    width: 110px;
    overflow: hidden;
    white-space: nowrap;
  }
  .note-count {
    font-size: 18px;
    text-align: center;
    height: 24px;
    margin-bottom: 16px;
  }
}
.setting-line {
  margin: 8px;
}
</style>
