<template>
  <svg
    :width="width"
    :height="height"
    :class="{ container: true, active: active }"
    :style="[ duration == 0 && {position: 'absolute'}]"
    @click="onClick"
  >
    <line
      :x1="line.x1"
      :y1="line.y1"
      :x2="line.x2"
      :y2="line.y2"
      v-for="line in lines"
      :key="line.y1 + line.width"
      :style="`stroke:black;stroke-width:${line.width}`"
    />
    <TrebleClef
      :y="trebleClefStart"
      :x="5"
      v-if="showBrace && showTrebleClef"
    />
    <BassClef
      :y="bassClefStart"
      :x="10"
      v-if="showBrace && showBassClef"
    />
    <Note
      :x="note.x"
      :y="note.y"
      v-for="note in notePositions"
      :key="`note_${note.x}_${note.y}`"
      :type="type"
    />
    <Sharp
      :x="sharp.x"
      :y="sharp.y"
      v-for="sharp in sharpPositions"
      :key="`sharp_${sharp.x}_${sharp.y}`"
    />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Inject } from "vue-property-decorator";

import TrebleClef from "./TrebleClef.vue";
import BassClef from "./BassClef.vue";
import Note from "./Note.vue";
import Sharp from "./Sharp.vue";

const LINE_HEIGHT = 10;
const TOP_OFFSET = 3;

const NOTE_OFFSETS = [
  { position: 0 }, // C
  { position: 0, sharp: 1 }, // C#
  { position: 1 }, // D
  { position: 1, sharp: 1 }, // D#
  { position: 2 }, // E
  { position: 3 }, // F
  { position: 3, sharp: 1 }, // F#
  { position: 4 }, // G
  { position: 4, sharp: 1 }, // G#
  { position: 5 }, // A
  { position: 5, sharp: 1 }, // A#
  { position: 6 }, // B
];

const buildStaffLines = (lines, start, lineHeight, width) => {
  const out = [];
  lines.forEach(line => {
    out.push({
      x1: 0,
      x2: width,
      y1: start - line * lineHeight,
      y2: start - line * lineHeight,
      width: 1,
    });
  });
  return out;
};

const getLine = note => NOTE_OFFSETS[note % 12].position - (5 - Math.floor(note / 12)) * 7;

const getNotesInfo = notes => {
  let hasSharp = false;
  let hasBassNotes = false;
  let hasEven = false;
  let hasOdd = false;
  if (notes) {
    notes.forEach(note => {
      const noteInOctave = note % 12;
      if (NOTE_OFFSETS[noteInOctave].sharp) {
        hasSharp = true;
      }
      if (note < 58) {
        hasBassNotes = true;
      }

      if (getLine(note) % 2 === 0) {
        hasEven = true;
      } else {
        hasOdd = true;
      }
    });
  }
  return {
    hasSharp,
    hasBassNotes,
    hasEven,
    hasOdd,
    bothSides: hasEven && hasOdd,
  };
};

interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  width: number;
}

interface Position {
  x: number;
  y: number;
}

/* 五线谱 */
@Component({ components: { TrebleClef, BassClef, Note, Sharp } })
export default class Staff extends Vue {
  @Inject({ default: false }) showTrebleClef: boolean;
  @Inject({ default: false }) showBassClef: boolean;

  @Prop({ default: false }) showBrace: boolean;
  @Prop({ default: false }) showEnd: boolean;
  @Prop({ default: null }) notes: any[];
  @Prop({ default: false }) active: boolean;
  @Prop({ default: "full" }) type: string;
  @Prop({ default: 1 }) duration: number;
  lines: Line[] = [];
  width: number = 0;
  height: number = 0;
  trebleClefStart: number = 0;
  bassClefStart: number = 0;
  notePositions: Position[] = [];
  sharpPositions: Position[] = [];

  mounted() {
    this.reload();
  }

  @Watch("notes")
  reload() {
    const height =
      (this.showTrebleClef ? LINE_HEIGHT * 6 : 0) +
      (this.showBassClef ? LINE_HEIGHT * 6 : 0) +
      (this.showBassClef || this.showTrebleClef ? LINE_HEIGHT * 6 : 0);

    const info = getNotesInfo(this.notes);

    let width = this.showBrace ? 45 : info.bothSides ? 31 : 20 * this.duration;
    if (this.showEnd && !this.showBrace && !this.notes) {
      width = 2;
    }

    if (info.hasSharp) {
      // width += 14;
    }

    const linePositions = {};
    if (this.showTrebleClef) {
      for (let i = 1; i < 6; i++) {
        linePositions[i] = 1;
      }
    }
    if (this.showBassClef) {
      for (let i = -3; i > -8; i--) {
        linePositions[i] = 1;
      }
    }

    let lines = [];
    let top = TOP_OFFSET;
    let trebleClefStart = 0;
    let bassClefStart = 0;
    let middleC = null;
    if (this.showTrebleClef) {
      trebleClefStart = LINE_HEIGHT * top - 11;
      if (this.showEnd) {
        lines.push({
          x1: 1,
          x2: 1,
          y1: top * LINE_HEIGHT,
          y2: (top + 4) * LINE_HEIGHT,
          width: 3,
        });
      }
      middleC = LINE_HEIGHT * top + LINE_HEIGHT * 4.5;
      top += 8;
    }
    if (this.showBassClef) {
      if (!middleC) {
        middleC = LINE_HEIGHT * top - LINE_HEIGHT * 3.5;
      }
      bassClefStart = LINE_HEIGHT * top;
      if (this.showEnd) {
        lines.push({
          x1: 1,
          x2: 1,
          y1: top * LINE_HEIGHT,
          y2: (top + 4) * LINE_HEIGHT,
          width: 3,
        });
      }
    }

    const notePositions = [];
    const sharpPositions = [];
    if (this.notes) {
      let evenNote = 0;
      let oddNote = 13;

      if (!info.bothSides) {
        evenNote = 2;
        oddNote = 2;
      }

      if (info.hasSharp) {
        // evenNote += 6;
        // oddNote += 6;
      }

      this.notes.forEach(note => {
        const line = getLine(note);
        notePositions.push({
          x: line % 2 === 0 ? evenNote : oddNote,
          y: middleC - line * (LINE_HEIGHT / 2),
        });
        if (NOTE_OFFSETS[note % 12].sharp) {
          sharpPositions.push({
            x: /* line % 2 === 0 ? evenNote - 6 : oddNote + */ evenNote + 16,
            y: middleC - line * (LINE_HEIGHT / 2) - 5,
          });
        }

        const drawnLine = Math.floor(line / 2);

        if (drawnLine <= -8) {
          for (let l = drawnLine; l <= -8; l += 1) {
            linePositions[l] = 1;
          }
        } else if (drawnLine > -3 && drawnLine < 0) {
          if (info.hasBassNotes) {
            for (let l = -3; l <= drawnLine; l += 1) {
              linePositions[l] = 1;
            }
          } else {
            for (let l = 0; l > drawnLine; l -= 1) {
              linePositions[l] = 1;
            }
          }
        } else if (drawnLine > 5) {
          for (let l = 5; l <= drawnLine; l += 1) {
            linePositions[l] = 1;
          }
        }
      });
    }

    lines = [...lines, ...buildStaffLines(Object.keys(linePositions).map(l => parseInt(l)), middleC + LINE_HEIGHT / 2, LINE_HEIGHT, width)];

    this.lines = lines;
    this.width = width;
    this.height = height;
    this.trebleClefStart = trebleClefStart;
    this.bassClefStart = bassClefStart;
    this.notePositions = notePositions;
    this.sharpPositions = sharpPositions;
  }

  onClick(e) {
    this.$emit("click", e);
  }
}
</script>

<style scoped>
.container {
  display: inline-block;
}
.active {
  background-color: lightblue;
}
</style>
