/*
音符编码即不同位操作

弦1 = 1
弦2 = 2
弦3 = 4
天 = 8
地 = 16
水 = 32

如 弦1+天 = 1|8 = 9 = J

英语名词对照表
http://www.sohu.com/a/234009955_100172496
*/

const _BASE64_ST = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const _BASE64_RST = [].reduce.call(_BASE64_ST, (r: { [x: string]: number }, v: string, i: number) => ((r[v] = i), r), {});

function ibase64(src: number): string {
  return _BASE64_ST[src >> 6] + _BASE64_ST[src & 63];
}

function deibase64(src: string): number {
  return (_BASE64_RST[src[0]] << 6) | _BASE64_RST[src[1]];
}

export enum Mode {
  PentatonicMinor = 1, // 五声小调 C-bE-F-G-bB
  PentatonicMajor, // 五声大调 C-D-E-G-A
  Chromatic, // 半音 bC-bD-bE-bF-bG-bA
  Hexatonic, // 六式音阶, C-D-E-G-A-B
  Major, // 大调 C-D-E-F-G-A-B
  Minor, // 小调 C-D-bE-F-G-bA-bB
  Hirajoshi, // 平调子 C-bD-bE-F-G-bA
  Phrygian, // 弗吉利亚调式 C-D-bE-F-G-A-bB
}

export interface KeyNoteMap {
  B: string;
  C: string;
  E: string;
  J: string;
  K: string;
  M: string;
  R: string;
  S: string;
  U: string;
  h: string;
  i: string;
  k: string;
}

export const ModeMaps: { [key: number]: KeyNoteMap } = {
  [Mode.PentatonicMinor]: {
    B: "C3",
    C: "bE3",
    E: "F3",
    J: "G3",
    K: "bB3",
    M: "C4",
    R: "bE4",
    S: "F4",
    U: "G4",
    h: "bB4",
    i: "C5",
    k: "bE5",
  },
  [Mode.PentatonicMajor]: {
    B: "C3",
    C: "D3",
    E: "E3",
    J: "G3",
    K: "A3",
    M: "C4",
    R: "D4",
    S: "E4",
    U: "G4",
    h: "A4",
    i: "C5",
    k: "D5",
  },
  [Mode.Chromatic]: {
    B: "C3",
    C: "bD3",
    E: "D3",
    J: "bE3",
    K: "E3",
    M: "F3",
    R: "bG3",
    S: "G3",
    U: "bA3",
    h: "A3",
    i: "bB3",
    k: "B3",
  },
  [Mode.Hexatonic]: {
    B: "C3",
    C: "bE3",
    E: "F3",
    J: "bG3",
    K: "G3",
    M: "bB3",
    R: "C4",
    S: "bE4",
    U: "F4",
    h: "bG4",
    i: "G4",
    k: "bB4",
  },
  [Mode.Major]: {
    B: "C3",
    C: "D3",
    E: "E3",
    J: "F3",
    K: "G3",
    M: "A3",
    R: "B3",
    S: "C4",
    U: "D4",
    h: "E4",
    i: "F4",
    k: "G4",
  },
  [Mode.Minor]: {
    B: "C3",
    C: "D3",
    E: "bE3",
    J: "F3",
    K: "G3",
    M: "bA3",
    R: "bB3",
    S: "C4",
    U: "D4",
    h: "bE4",
    i: "F4",
    k: "G4",
  },
  [Mode.Hirajoshi]: {
    B: "C3",
    C: "bD3",
    E: "F3",
    J: "bG3",
    K: "bA3",
    M: "C4",
    R: "bD4",
    S: "F4",
    U: "bG4",
    h: "bA4",
    i: "C5",
    k: "bD5",
  },
  [Mode.Phrygian]: {
    B: "C3",
    C: "bD3",
    E: "E3",
    J: "F3",
    K: "G3",
    M: "bA3",
    R: "bB3",
    S: "C4",
    U: "bD4",
    h: "E4",
    i: "F4",
    k: "G4",
  },
};
const noteNames = "CDEFGABC";

/** 音符 */
export class Note {
  private _code: string;
  /** 游戏中音符代码 */
  get code(): string {
    return this._code;
  }
  set code(value: string) {
    this._code = value;
    this.recalc();
  }
  private _modeMap: KeyNoteMap;
  /** 调式谱 */
  get modeMap(): KeyNoteMap {
    return this._modeMap;
  }
  set modeMap(value: KeyNoteMap) {
    this._modeMap = value;
    this.recalc();
  }
  /** 音名 */
  name: string;
  /** 简谱 */
  number: string;
  /** 简谱高低音符号数 */
  tone: number;
  /** 四分音符 = 1 二分音符 = 2 以此类推 */
  duration: number;
  /** 半音 */
  isSemi: boolean;
  /** 音 */
  note: string;
  /** 高 */
  domain: number;
  /** 升调表示音名 */
  get sharpName() {
    if (this.code === "0") return "0";
    const preNode = noteNames[noteNames.lastIndexOf(this.note) - 1];
    return this.isSemi ? `${preNode}#${this.domain}` : this.name;
  }
  /** 简谱升调 */
  get sharpNumber() {
    if (this.code === "0") return "0";
    const preNumber = noteNames.lastIndexOf(this.note);
    return this.isSemi ? `${preNumber}#` : this.number;
  }
  /** tone.js格式的降调 */
  get toneName() {
    if (this.code === "0") return "0";
    return this.isSemi ? `${this.note}b${this.domain}` : this.name;
  }

  /** midi数字形式 */
  get midi() {
    if (this.code === "0") return 0;
    const isSemi = this.name.startsWith("b");
    const SEMITONES = [0, 2, 4, 5, 7, 9, 11];
    return SEMITONES[(this.note.charCodeAt(0) + 3) % 7] - (isSemi ? 1 : 0) + (this.domain + 2) * 12;
  }

  get seqNumber() {
    const SEQ = "BCEJKMRSUhik";
    return SEQ.indexOf(this.code);
  }

  constructor(code: string, modeMap: KeyNoteMap, duration = 1) {
    this._code = code;
    this._modeMap = modeMap;
    this.duration = duration;
    this.recalc();
  }

  recalc() {
    if (this.code === "0") {
      this.name = this.note = this.number = "0";
      return;
    }
    if (!this.modeMap) return;
    const name = this.modeMap[this.code];
    this.name = name;
    const isSemi = name.startsWith("b");
    const [note, domain] = name.substr(name.length - 2, 2).split("");
    this.isSemi = isSemi;
    this.note = note;
    this.domain = +domain;
    this.number = (isSemi ? "b" : "") + (noteNames.indexOf(note) + 1);
    this.tone = +domain - 4;
  }
}

/** 时域音符(播放用) */
export class MusicNote extends Note {
  /** 位置 12bit */
  position: number;
  constructor(note: Note) {
    super(note.code, note.modeMap);
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
  bpm: number = 240;
  /** 调式 */
  private _mode: Mode = Mode.Major;
  get mode(): Mode {
    return this._mode;
  }
  set mode(value: Mode) {
    this._mode = value;
    if (this.notes)
      this.notes.forEach(note => {
        note.modeMap = ModeMaps[value];
      });
  }
  /** 音符 */
  notes: Note[] = [];

  constructor() {}

  play() {}

  get space() {
    return ~~(960 / this.bpm);
  }

  get musicNotes() {
    const space = this.space;
    let pos = 0;
    let dst: MusicNote[] = [];
    let zeroNoteCache: MusicNote[] = [];
    for (let i = 0; i < this.notes.length; i++) {
      let note = this.notes[i];
      while (note.code === "0") {
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
    // console.log(dst.map(v => `${v.code}:${v.bar}:${v.position}`));
    return dst;
  }

  get code() {
    const notesBin = this.musicNotes.map(v => `${v.code}${ibase64(v.position)}`).join("");
    return `${this.mode}${notesBin}`;
  }
  set code(value) {
    this._mode = +value[0];
    const notes = value.substr(1);
    let seqs: [string, number][] = [];
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
      seqs.push([code, t / space]);
      i += 3;
    }
    this.setSeqs(seqs);
  }

  setSeqs(seqs: [string, number][]) {
    const notes: Note[] = [];
    let lastDuration = 1;
    const addPadding = (d: number) => {
      if (!d) return;
      const b4 = ~~(d / 4);
      const b2 = ~~((d % 4) / 2);
      const b1 = d % 2;
      const s = (d: number) => new Note("0", null, d);
      for (let i = 0; i < b4; i++) notes.push(s(4));
      if (b2) notes.push(s(2));
      if (b1) notes.push(s(1));
    };
    for (let i = 0; i < seqs.length; i++) {
      const [k, t] = seqs[i];
      const next = seqs[i + 1];
      const n = new Note(k, ModeMaps[this.mode]);
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
    const t = new Note(note ? note.code : "0", ModeMaps[this.mode]);
    t.duration = duration;
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
