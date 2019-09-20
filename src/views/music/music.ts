/*
音符编码即不同位操作

弦1 = 1
弦2 = 2
弦3 = 4
天品 = 8
地品 = 16
水品 = 32

i & 7 得到弦位
i >> 3 得到品位
弦有
1     = 1 表示第x个音
2     = 2 表示第x+1个音
12    = 3 表示第x个音+第x+1个音
3     = 4 表示第x+2个音
23    = 5 表示第x+1个音+第x+2个音
13    = 6 表示第x个音+第x+2个音
123   = 7 表示第x个音+第x+1个音+第x+2个音

品有
天     = 1 表示从第4个音开始的单音
地     = 2 表示从第7个音开始的单音
天地   = 3 表示从第1,3,5个音开始的和弦
水     = 4 表示从第10个音开始的单音
地水   = 6 表示从第4,6,8个音开始的和弦
天水   = 5 表示从第1,2,4个音开始的和弦
天地水 = 7 表示从第4,5,7个音开始的和弦

如 弦1+天 = 1|8 = 9 = J

英语名词对照表
http://www.sohu.com/a/234009955_100172496
*/

import _ from "lodash";

const BASESEQ = "BCEJKMRSUhik";
const _BASE64_ST = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const _BASE64_RST = [].reduce.call(_BASE64_ST, (r: { [x: string]: number }, v: string, i: number) => ((r[v] = i), r), {}) as { [x: string]: number };

function sbase64(src: number): string {
  return _BASE64_ST[src & 63];
}

function desbase64(src: string): number {
  return _BASE64_RST[src[0]];
}

function ibase64(src: number): string {
  return _BASE64_ST[src >> 6] + _BASE64_ST[src & 63];
}

function deibase64(src: string): number {
  return (_BASE64_RST[src[0]] << 6) | _BASE64_RST[src[1]];
}

/** 弦 */
const StringMap = [[], [0], [1], [0, 1], [2], [1, 2], [0, 2], [0, 1, 2]];

/** 品 */
const FretMap = [[0], [3], [6], [0, 2, 4], [9], [3, 5, 7], [0, 1, 3], [3, 4, 6]];

/** 代码映射 */
const CodeMap = (function() {
  let r = {};
  for (let i = 1; i < _BASE64_ST.length; i++) {
    if ((i & 7) === 0) continue;
    const str = StringMap[i & 7]; // 得到弦位
    const fre = FretMap[i >> 3]; // 得到品位
    const c = _BASE64_ST[i];
    let dst = [];
    str.forEach(str => {
      fre.forEach(fre => {
        dst.push(str + fre);
      });
    });
    if (dst.length) r[c] = _.uniq(dst).sort();
  }
  return r as { [x: string]: number[] };
})();

const CodeMapRev = Object.keys(CodeMap).reduce((r, v) => ((r[CodeMap[v].join("_")] = v), r), {}) as { [x: string]: string };

export enum Mode {
  PentatonicMinor = 1, // 五声小调 C-bE-F-G-bB
  PentatonicMajor, // 五声大调 C-D-E-G-A
  Chromatic, // 半音 C-bD-D-bE-E-F-bG-G-bA-A-bB-B
  Hexatonic, // 六式音阶, C-D-E-G-A-B
  Major, // 大调 C-D-E-F-G-A-B
  Minor, // 小调 C-D-bE-F-G-bA-bB
  Hirajoshi, // 平调子 C-bD-bE-F-G-bA
  Phrygian, // 弗吉利亚调式 C-D-bE-F-G-A-bB
  Yo, // Yo调式 bD-bE-bG-bA-bB
}

export const ModeMaps: { [key: number]: string[] } = {
  [Mode.PentatonicMinor]: ["C3", "bE3", "F3", "G3", "bB3", "C4", "bE4", "F4", "G4", "bB4", "C5", "bE5"],
  [Mode.PentatonicMajor]: ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5"],
  [Mode.Chromatic]: ["C3", "bD3", "D3", "bE3", "E3", "F3", "bG3", "G3", "bA3", "A3", "bB3", "B3"],
  [Mode.Hexatonic]: ["C3", "bE3", "F3", "bG3", "G3", "bB3", "C4", "bE4", "F4", "bG4", "G4", "bB4"],
  [Mode.Major]: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4"],
  [Mode.Minor]: ["C3", "D3", "bE3", "F3", "G3", "bA3", "bB3", "C4", "D4", "bE4", "F4", "G4"],
  [Mode.Hirajoshi]: ["C3", "bD3", "F3", "bG3", "bA3", "C4", "bD4", "F4", "bG4", "bA4", "C5", "bD5"],
  [Mode.Phrygian]: ["C3", "bD3", "E3", "F3", "G3", "bA3", "bB3", "C4", "bD4", "E4", "F4", "G4"],
  [Mode.Yo]: ["bD3", "bE3", "bG3", "bA3", "bB3", "bD4", "bE4", "bG4", "bA4", "bB4", "bD5", "bE5"],
};

const SEQ = "BCEJKMRSUhik";
const SEQ_REV = [].reduce.call(SEQ, (r: { [x: string]: number }, v: string, i: number) => ((r[v] = i), r), {}) as { [x: string]: number };
const SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const NOTE12S = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// const NOTE12B = ["C", "bD", "D", "bE", "E", "F", "bG", "G", "bA", "A", "bB", "B"];
const NOTE12T = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NUM12S = ["1", "1#", "2", "2#", "3", "4", "4#", "5", "5#", "6", "6#", "7"];
const NUM12B = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];

/** 音符 */
export class Note {
  /** 位 */
  seq = 0;
  /** 音名 */
  name: string;
  /** 四分音符 = 1 二分音符 = 2 以此类推 */
  duration: number;
  /** 系 */
  parent: Music;
  /** midi */
  midi = 0;

  get shiftMidi() {
    return this.midi + this.parent.numberShift;
  }

  get code() {
    return SEQ[this.seq];
  }

  /** 简谱 */
  get number() {
    if (this.seq < 0) return "0";
    return NUM12B[this.shiftMidi % 12];
  }
  /** 简谱升调 */
  get sharpNumber() {
    if (this.seq < 0) return "0";
    return NUM12S[this.shiftMidi % 12];
  }
  /** 简谱音高 */
  get tone() {
    return ((this.shiftMidi / 12) | 0) - 6;
  }
  /** 升调表示音名 */
  get sharpName() {
    if (this.seq < 0) return "0";
    return NOTE12S[this.midi % 12] + (((this.midi / 12) | 0) - 2);
  }
  /** tone.js格式的降调 */
  get toneName() {
    if (this.seq < 0) return "0";
    return NOTE12T[this.midi % 12] + (((this.midi / 12) | 0) - 2);
  }

  constructor(seq: string | number, parent: Music, duration = 1) {
    if (typeof seq === "string") seq = SEQ_REV[seq];
    this.seq = seq;
    this.parent = parent;
    this.duration = duration;
    this.recalc();
  }

  recalc() {
    if (this.seq < 0) {
      this.name = "0";
      return;
    }
    if (!this.parent.modeMap) return;
    const name = this.parent.modeMap[this.seq];
    this.name = name;
    const isSemi = name.startsWith("b");
    const [note, domain] = name.substr(name.length - 2, 2).split("");
    this.midi = SEMITONES[(note.charCodeAt(0) + 3) % 7] - (isSemi ? 1 : 0) + (+domain + 2) * 12;
  }
}

/** 时域音符(播放用) */
export class MusicNote extends Note {
  /** 位置 12bit */
  position: number;
  constructor(note: Note) {
    super(note.seq, note.parent);
  }
}

/** 歌曲 */
export class Music {
  /** 曲名 */
  name: string;
  /** 原曲 */
  original?: string;
  /** 作曲 */
  composer: string;
  /** 编曲 */
  arranger: string;
  /** 拍号 [小节拍数, 几分音符为一拍] */
  timeSignature: [number, number] = [4, 4];
  /** 速度 */
  bpm = 240;
  /** 简谱转调 */
  numberShift = 0;
  modeMap = ModeMaps[Mode.Major];
  /** 调式 */
  private _mode: Mode = Mode.Major;
  get mode(): Mode {
    return this._mode;
  }
  set mode(value: Mode) {
    this._mode = value;
    this.modeMap = ModeMaps[value];
    if (this.notes)
      this.notes.forEach(note => {
        note.recalc();
      });
  }
  /** 音符 */
  notes: Note[] = [];

  get space() {
    return (960 / this.bpm) | 0;
  }

  get musicNotes() {
    const space = this.space;
    let pos = 0;
    let dst: MusicNote[] = [];
    let zeroNoteCache: MusicNote[] = [];
    for (let i = 0; i < this.notes.length; i++) {
      let note = this.notes[i];
      while (note.seq < 0) {
        pos += space * note.duration;
        note = this.notes[++i];
        if (!note) return dst;
      }

      let mn = new MusicNote(note);
      mn.position = pos;
      mn.duration = note.duration;
      pos += space * note.duration;
      if (note.duration === 0) {
        zeroNoteCache.push(mn);
      } else {
        zeroNoteCache.forEach(v => (v.duration = note.duration));
        zeroNoteCache = [];
      }
      dst.push(mn);
    }
    // console.log(dst.map(v => `${v.code}:${v.position}`));
    return dst;
  }

  get code() {
    // 同时出现多音符按照对照表进行合并
    const mn = this.musicNotes;
    let stack = [],
      sections = [];
    for (let i = 0; i < mn.length; i++) {
      const note = mn[i];
      const next = mn[i + 1];
      if (next && note.position === next.position) {
        stack.push(note.seq);
        continue;
      }
      if (stack.length) {
        const key = _.uniq(stack.concat(note.seq))
          .sort()
          .join("_");
        const code = CodeMapRev[key] || BASESEQ[note.seq];
        sections.push(`${code}${ibase64(note.position)}`);
        stack.length = 0;
      } else {
        sections.push(`${BASESEQ[note.seq]}${ibase64(note.position)}`);
      }
    }
    return `${this.mode}${sections.join("")}`;
  }
  set code(value) {
    this._mode = +value[0];
    this.modeMap = ModeMaps[this._mode];
    const notes = value.substr(1);
    let seqs: [number, number][] = [];
    let space = this.space;
    for (let i = 0; i < notes.length - 2; ) {
      const [code, pos] = [notes[i], notes.substr(i + 1, 2)];
      const t = deibase64(pos);
      // 自动判定BPM
      if (t % space != 0) {
        for (let j = space - 1; j > 0; --j) {
          if (t % j === 0) {
            this.bpm = 960 / j;
            space = j;
            break;
          }
        }
        seqs = [];
        i = 0;
        continue;
      }
      const cs = CodeMap[code];
      if (cs) {
        cs.forEach(c => {
          seqs.push([c, t / space]);
        });
      }
      i += 3;
    }
    this.setSeqs(seqs);
  }

  setSeqs(seqs: [number, number][]) {
    const notes: Note[] = [];
    let lastDuration = 1;
    const addPadding = (d: number) => {
      if (!d) return;
      const b4 = ~~(d / 4);
      const b2 = ~~((d % 4) / 2);
      const b1 = d % 2;
      const s = (d: number) => new Note(-1, this, d);
      for (let i = 0; i < b4; i++) notes.push(s(4));
      if (b2) notes.push(s(2));
      if (b1) notes.push(s(1));
    };
    if (seqs[0][1] !== 0) {
      addPadding(seqs[0][1]);
    }
    for (let i = 0; i < seqs.length; i++) {
      const [k, t] = seqs[i];
      const next = seqs[i + 1];
      const n = new Note(k, this);
      let padding = 0;
      if (next) {
        const nt = next[1];
        const deltaT = nt - t;
        if (deltaT > 4) {
          n.duration = 4;
          padding = deltaT - 4;
        } else if (deltaT === 3) {
          n.duration = 2;
          padding = 1;
        } else {
          // 0 1 2 4
          n.duration = deltaT;
        }
        lastDuration = n.duration || lastDuration;
      } else n.duration = lastDuration;
      notes.push(n);
      if (padding) addPadding(padding);
    }
    this.notes = notes;
  }

  /** 清除所有音符 */
  clear() {
    this.notes = [];
  }
  /** 添加音符 */
  addNote(note: Note, duration = 1) {
    const t = new Note(note ? note.seq : -1, this, duration);
    this.notes.push(t);
  }
  removeNote(at: number = -1) {
    if (at === -1) {
      this.notes.pop();
    } else {
      this.notes.splice(at);
    }
  }

  get totalDuration() {
    let totalTime = 0;
    this.musicNotes.forEach(note => {
      totalTime += note.duration;
    });
    return totalTime;
  }
}
