<template>
  <div class="music-edit" @mousemove="selectMove" @mouseup="selectEnd">
    <el-alert :title="$t('shawzin.tip')" type="warning" />
    <div class="edit-header setting">
      <el-select style="width:120px" v-model="music.mode" size="small">
        <el-option :key="mode.name" v-for="mode in modes" :label="$t(`shawzin.${mode.name}`)" :value="mode.val" :disabled="!modeMaps[mode.val]">
        </el-option>
      </el-select>
      <el-select style="width:120px" v-model="instrument" size="small">
        <el-option :label="$t('shawzin.piano')" value="piano"/>
        <el-option :label="$t('shawzin.shawzin')" value="shawzin"/>
        <el-option :label="$t('shawzin.lotus')" value="lotus"/>
      </el-select>
      <el-switch class="mode-select" v-model="useNumber" :active-text="$t('shawzin.number')" :inactive-text="$t('shawzin.name')"/>
      <el-switch class="mode-select" v-model="useSharp" :active-text="$t('shawzin.upshift')" :inactive-text="$t('shawzin.downshift')"/>
      <!-- <label style="margin:0 8px;">拍号: </label>
      <el-select style="width:80px" size="small" v-model="music.timeSignature[0]">
        <el-option v-for="item in timeSignatures" :key="item" :label="item" :value="item" />
      </el-select>
      /
      <el-select style="width:80px" size="small" v-model="music.timeSignature[1]">
        <el-option v-for="item in timeSignatures" :key="item" :label="item" :value="item" />
      </el-select> -->
      <label>(4/4) BPM: </label>
      <el-select style="width:80px" size="small" v-model="music.bpm">
        <el-option v-for="item in bpms" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div class="preview-header setting">
      <el-radio-group size="small" v-model="editMode">
        <el-radio-button label="cursor"><i class="el-icon-position"></i></el-radio-button>
        <el-radio-button label="move"><i class="el-icon-rank"></i></el-radio-button>
        <el-radio-button label="add"><i class="el-icon-edit"></i></el-radio-button>
        <el-radio-button label="delete"><i class="el-icon-delete"></i></el-radio-button>
      </el-radio-group>
      <el-radio-group size="small" v-model="duration">
        <el-radio-button :label="1">{{$t('shawzin.quarter')}}(J)</el-radio-button>
        <el-radio-button :label="2">{{$t('shawzin.half')}}(K)</el-radio-button>
        <el-radio-button :label="4">{{$t('shawzin.full')}}(L)</el-radio-button>
      </el-radio-group>
      <el-button size="small" type="danger" :disabled="isRecording" icon="el-icon-video-camera" @click="recordSeq"></el-button>
      <el-button size="small" type="primary" v-if="!isPlaying" :disabled="isRecording" icon="el-icon-video-play" @click="playSeq"></el-button>
      <el-button size="small" type="primary" v-else icon="el-icon-video-pause" @click="stopSeq(true)"></el-button>
      <el-button size="small" :disabled="!isPlaying && !isRecording" @click="stopSeq()">{{$t('shawzin.stop')}}</el-button>
      <el-button size="small" @click="music.removeNote()">{{$t('shawzin.delete')}}(←)</el-button>
      <el-button size="small" type="danger" @click="clearNotes">{{$t('shawzin.empty')}}</el-button>
      <el-button size="small" @click="importCode()">{{$t('shawzin.importCode')}}</el-button>
      <el-button size="small" @click="copyCode()">{{$t('shawzin.copyCode')}}</el-button>
    </div>
    <div class="view-area">
      <div class="input-box">
        <div class="notation-header">
          <Notation :showTrebleClef="true" :showBassClef="false">
            <Staff :notes="[0]" :duration="4" />
          </Notation>
        </div>
        <div class="piano">
          <div class="piano-header"></div>
          <div class="input-area">
            <div class="piano-key" @click="music.addNote(null, duration)">
              <div class="note">
                0
              </div>
              <div class="key">
                S
              </div>
            </div>
            <div class="piano-key" @click="playAndAddNote(note.code, duration)" v-for="note in notes" :key="note.name">
              <div class="note" :class="[ useNumber && note.tone && ('tone' + note.tone) ]">
                {{useNumber ? (useSharp ? note.sharpNumber : note.number) : (useSharp ? note.sharpName : note.name)}}
              </div>
              <div class="key">
                {{keyMaps[note.code]}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 钢琴窗 -->
      <div class="piano-window" @mousedown="onCanvasDragStart" :class="{drag: isDragCanvas, draging: draggingCanvas}" ref="pianoWindow">
        <div class="preview-area">
          <div class="staff">
            <Notation :showTrebleClef="true" :showBassClef="false">
              <Staff v-for="(note, i) in music.notes" :key="i" :notes="[note.midi]" :type="calcNoteType(i)" :duration="note.duration" />
            </Notation>
          </div>
          <div class="number">
            <div class="number-note note" v-for="(note, i) in music.notes" :key="i"
              :class="[ note.tone && ('tone' + note.tone), note.isSemi && 'semi', 'du' + note.duration ]">
              {{useSharp ? note.sharpNumber : note.number}}
            </div>
          </div>
        </div>
        <div class="timelines">
          <div class="timeline" v-for="line in 250" :key="line">#{{line}}</div>
        </div>
        <div class="piano-canvas" ref="pCanvas" @mousedown="selectStart" :class="{ addmode: editMode === 'add' }">
          <div class="lines">
            <div class="line" v-for="line in 1000" :key="line" :class="{playing: line === currentLine}"></div>
          </div>
          <div class="block" :class="{noevent:isSelect, selected: block.selected}" v-for="(block, index) in blocks" :key="index"
            :style="{top:block.y+'px',left:block.x+'px',width:block.width+'px'}"
            @mousedown.stop="singleSelectStart($event,{block, index})"
          >
            {{toNote(block.y)}}
          </div>
          <div class="select-border" v-show="isSelect" ref="selectBorder" />
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
import copy from "copy-text-to-clipboard";
import { ModeMaps, Mode, Note, Music } from "./music";
import { Timer } from "./timer";

const KeyMaps = {
  1: "B",
  2: "C",
  3: "E",
  4: "J",
  5: "K",
  6: "M",
  7: "R",
  8: "S",
  9: "U",
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

const Keys = _.reverse("BCEJKMRSUhik".split(""));

interface MusicBlock {
  x: number;
  y: number;
  width: number;
  selected: boolean;
}

const instrumentResource = {
  piano: {
    path: "/instruments/piano/",
    keys: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
  },
  shawzin: {
    path: "/instruments/shawzin/",
    keys: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4",  "C5", "D5"],
  },
  lotus: {
    path: "/instruments/lotus/",
    keys: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4",  "C5", "D5"],
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
  ];

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

  history = [];
  historyIndex = 0;

  /// 函数

  get notes() {
    return _.keyBy(Keys.map(v => new Note(v, ModeMaps[this.music.mode])), "code");
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

  copyCode() {
    this.commitBlocks();
    copy(this.music.code);

    this.$message({
      showClose: true,
      message: this.$t("shawzin.codeCopied") as string,
      type: "success",
    });
  }

  playNote(note: number | string | string[]) {
    try {
      let tone: string | string[];
      if (typeof note === "number") {
        note = Keys[~~(note / COL_HEIGHT)];
      }
      if (Array.isArray(note)) {
        tone = note.map(v => this.notes[v].toneName);
      } else {
        tone = this.notes[note].toneName;
      }
      this.sampler.triggerAttackRelease(tone, 1);
    } catch {}
  }

  playAndAddNote(note: string, duration = 1) {
    try {
      const tone = this.notes[note].toneName;
      this.sampler.triggerAttackRelease(tone, duration);
    } catch {}
    this.music.addNote(this.notes[note], duration);
  }

  /** 撤销 */
  undo() {
    if (this.historyIndex === this.history.length) {
      this.pushState();
      --this.historyIndex;
    }
    const last = this.history[this.historyIndex - 1];
    if (last) {
      this.music.code = last;
      if (this.history[this.historyIndex - 1]) --this.historyIndex;
    }
  }
  /** 重做 */
  redo() {
    const last = this.history[this.historyIndex + 1];
    if (last) {
      this.music.code = last;
      if (this.history[this.historyIndex + 1]) ++this.historyIndex;
    }
  }

  pushState() {
    if (this.historyIndex < this.history.length) this.history.splice(this.historyIndex);
    this.history.push(this.music.code);
    this.historyIndex = this.history.length;
    if (this.history.length > 30) {
      this.history.shift();
    }
  }

  blocks: MusicBlock[] = [];
  @Watch("music.notes")
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
        x: (mn.seqPosition / space) * ROW_WIDTH,
        y: (11 - mn.seqNumber) * COL_HEIGHT,
        width: mn.duration * ROW_WIDTH,
        selected: false,
      });
    }

    this.blocks = blocks;
  }

  /// 生命周期

  created() {
    this.reloadInstrumentResource();
    this.music.code = "5MAAEAQKAUMAcSAgRAoMAwEA0MA8EBMKBQMBYSBcUBgMBo";
  }
  @Watch("instrument")
  reloadInstrumentResource() {
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
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyDown);
    document.removeEventListener("keyup", this.keyUp);
    this.stopSeq();
  }

  /// 事件
  @bind
  keyDown(e: KeyboardEvent) {
    const key = e.key.toUpperCase();

    if (KeyMaps[key]) {
      if (this.isPlaying) return;
      this.playAndAddNote(KeyMaps[key], this.duration);
      if (this.currentLine !== -1) {
        const y = Keys.indexOf(KeyMaps[key]) * COL_HEIGHT;
        this.blocks.push({
          x: (this.currentLine - 1) * ROW_WIDTH,
          y,
          width: ROW_WIDTH,
          selected: false,
        });
        this.commitBlocks();
      }
    } else {
      switch (key) {
        case " ":
          this.isDragCanvas = true;
          break;
        case "BACKSPACE":
          this.music.removeNote();
          break;
        case "DELETE":
          this.blocks = this.blocks.filter(v => !v.selected);
          this.commitBlocks();
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
        case "Z":
          if (e.ctrlKey) {
            if (e.shiftKey) {
              this.redo();
            } else {
              this.undo();
            }
          }
        default:
        // console.log(key);
      }
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
      case "cursor":
        this.currentLine = ~~(eX / ROW_WIDTH) + 1;
        break;
    }
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
        if (e.ctrlKey) {
          block.selected = true;
        } else if (!block.selected) {
          this.blocks.forEach(b => (b.selected = false));
          block.selected = true;
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
      const offsetX = Math.floor((eX - block.x - this.movingOffsetX) / ROW_WIDTH);
      const offsetY = Math.floor((eY - block.y - this.movingOffsetY) / COL_HEIGHT);
      const selected = this.blocks.filter(v => v.selected);
      if (offsetX || offsetY) {
        selected.forEach(b => {
          b.x = Math.min(Math.max(0, b.x + offsetX * ROW_WIDTH), 1000 * ROW_WIDTH);
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
        } else {
          block.selected = false;
        }
      });
    }
    if (this.isBlockMoving) {
      this.isBlockMoving = false;
      if (this.isBlockMoved) this.commitBlocks();
    }
  }

  /** 将blocks的修改写入 */
  commitBlocks() {
    const seqs = this.blocks
      .sort((a, b) => {
        return a.x - b.x;
      })
      .map(b => {
        const k = Keys[~~(b.y / COL_HEIGHT)];
        const t = ~~(b.x / ROW_WIDTH);
        return [k, t] as [string, number];
      });
    this.pushState();
    this.music.setSeqs(seqs);
  }

  importCode() {
    const code = prompt(this.$t("shawzin.importCode") as any, "");
    this.music.code = code;
  }

  currentLine = -1;
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
    if (this.currentLine != -1) this.currentLine--;
    this.playTimer = new Timer(t => {
      if (seq[this.currentLine]) {
        this.playNote(seq[this.currentLine]);
      }
      if (this.currentLine++ > fullLength) this.stopSeq();
    }, 6e4 / this.music.bpm) as any;
    this.playTimer.start();
  }
  // 停止
  stopSeq(pause = false) {
    if (!pause) this.currentLine = -1;
    this.playTimer.stop();
    this.isPlaying = false;
    this.isRecording = false;
  }
  // 录制
  recordSeq() {
    this.isRecording = true;
    this.playTimer = setInterval(() => {
      this.currentLine++;
    }, 6e4 / this.music.bpm) as any;
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
    & > * {
      margin: 4px;
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
  }
  .timeline {
    display: inline-flex;
    width: 80px;
    height: 32px;
    align-items: center;
    padding: 2px;
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
      &.playing {
        background: #9ec0ff;
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
      position: absolute;
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
      width: 14px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      bottom: 0;
      height: 2px;
      left: 0;
      margin-left: -2px;
    }
    &.du2::after {
      content: "";
      position: absolute;
      width: 14px;
      border-top: 1px solid #000;
      bottom: 0;
      height: 2px;
      left: 0;
      margin-left: -2px;
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
    &.semi {
      width: 34px;
    }
  }
  .staff {
    margin-left: -48px;
  }
  .notation-header {
    padding-left: 32px;
    width: 110px;
    height: 160px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
