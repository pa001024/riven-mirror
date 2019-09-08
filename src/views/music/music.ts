/*
音符编码表
B 第一根弦
C 第二根弦
E 第三根弦
J 第一根弦+天品
K 第二根弦+天品
M 第三根弦+天品
R 第一根弦+地品
S 第二根弦+地品
U 第三根弦+地品
h 第一根弦+水品
i 第二根弦+水品
k 第三根弦+水品
p 第一弦+天品+水品
q 第二弦+天品+水品
s 第三弦+天品+水品
Z 第一弦+天品+地品
a 第二弦+天品+地品
c 第三弦+天品+地品
x 第一弦+地品+水品
y 第二弦+地品+水品
0 第三弦+地品+水品
5 第一弦+天品+地品+水品
6 第二弦+天品+地品+水品
8 第三弦+天品+地品+水品

英语名词对照表
http://www.sohu.com/a/234009955_100172496
*/

const BIN_TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890+/";
function toBin(num: number) {
  if (!BIN_TABLE[num]) throw new Error(`out of range ${num}`);
  return BIN_TABLE[num];
}

function toNum(bin: string) {
  return BIN_TABLE.indexOf(bin);
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
    B: "C4",
    C: "bE4",
    E: "F4",
    J: "G4",
    K: "bB4",
    M: "C5",
    R: "bE5",
    S: "F5",
    U: "G5",
    h: "bB5",
    i: "C6",
    k: "bE6",
  },
  [Mode.PentatonicMajor]: {
    B: "C4",
    C: "D4",
    E: "E4",
    J: "G4",
    K: "A4",
    M: "C5",
    R: "D5",
    S: "E5",
    U: "G5",
    h: "A5",
    i: "C6",
    k: "D6",
  },
  [Mode.Chromatic]: {
    B: "C4",
    C: "bD4",
    E: "D4",
    J: "bE4",
    K: "E4",
    M: "F4",
    R: "bG4",
    S: "G4",
    U: "bA4",
    h: "A4",
    i: "bB4",
    k: "B4",
  },
  [Mode.Hexatonic]: {
    B: "C4",
    C: "bE4",
    E: "F4",
    J: "bG4",
    K: "G4",
    M: "bB4",
    R: "C5",
    S: "bE5",
    U: "F5",
    h: "bG5",
    i: "G5",
    k: "bB5",
  },
  [Mode.Major]: {
    B: "C4",
    C: "D4",
    E: "E4",
    J: "F4",
    K: "G4",
    M: "A4",
    R: "B4",
    S: "C5",
    U: "D5",
    h: "E5",
    i: "F5",
    k: "G5",
  },
  [Mode.Minor]: {
    B: "C4",
    C: "D4",
    E: "bE4",
    J: "F4",
    K: "G4",
    M: "bA4",
    R: "bB4",
    S: "C5",
    U: "D5",
    h: "bE5",
    i: "F5",
    k: "G5",
  },
  [Mode.Hirajoshi]: {
    B: "C4",
    C: "bD4",
    E: "F4",
    J: "bG4",
    K: "bA4",
    M: "C5",
    R: "bD5",
    S: "F5",
    U: "bG5",
    h: "bA5",
    i: "C6",
    k: "bD6",
  },
  [Mode.Phrygian]: {
    B: "C4",
    C: "bD4",
    E: "E4",
    J: "F4",
    K: "G4",
    M: "bA4",
    R: "bB4",
    S: "C5",
    U: "bD5",
    h: "E5",
    i: "F5",
    k: "G5",
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
    return SEMITONES[(this.note.charCodeAt(0) + 3) % 7] - (isSemi ? 1 : 0) + (this.domain + 1) * 12;
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
  /** 小节 0~63 */
  bar: number;
  /** 节内位置 0~63 */
  position: number;
  constructor(note: Note) {
    super(note.code, note.modeMap);
  }

  /** 序列中位置 */
  get seqPosition() {
    return this.bar * 64 + this.position;
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
    return 960 / this.bpm;
  }

  get musicNotes() {
    const space = this.space;
    let bar = 0,
      pos = 0;
    let dst: MusicNote[] = [];
    let zeroNoteCache: MusicNote[] = [];
    for (let i = 0; i < this.notes.length; i++) {
      let note = this.notes[i];
      while (note.code === "0") {
        pos += space * note.duration;
        if (pos >= 64) {
          bar += ~~(pos / 64);
          pos = pos % 64;
        }
        note = this.notes[++i];
        if (!note) return dst;
      }

      let mn = new MusicNote(note);
      mn.bar = bar;
      mn.position = pos;
      mn.duration = note.duration;
      pos += space * note.duration;
      if (pos >= 64) {
        bar += ~~(pos / 64);
        pos = pos % 64;
      }
      if (note.duration === 0) {
        zeroNoteCache.push(mn);
      } else {
        zeroNoteCache.forEach(v => (v.duration = note.duration));
        zeroNoteCache = [];
      }
      dst.push(mn);
    }
    return dst;
  }

  get code() {
    const notesBin = this.musicNotes.map(v => `${v.code}${toBin(v.bar)}${toBin(v.position)}`).join("");
    return `${this.mode}${notesBin}`;
  }
  set code(value) {
    const mode = +value[0];
    const notes = value.substr(1);
    const seqs: [string, number][] = [];
    for (let i = 0; i < notes.length - 2; i += 3) {
      const [code, bar, pos] = [notes[i], notes[i + 1], notes[i + 2]];
      const t = (toNum(bar) * 64 + toNum(pos)) / this.space;
      seqs.push([code, t]);
      console.log(toNum(bar), toNum(pos));
    }
    this._mode = mode;
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
