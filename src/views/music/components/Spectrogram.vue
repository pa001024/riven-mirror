<template>
  <div class="fft-visualizer">
    <input type="file" name="file">
    <canvas ref="canvas" :width="width" :height="height">Your browser does not support Canvas tag.</canvas>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class MusicEdit extends Vue {
  audioContext: AudioContext;
  @Prop() fftSamples: number;
  @Prop() pixelRatio: number;
  @Prop() windowFunc: string;
  @Prop() width: number;
  @Prop() height: number;
  duration: number;
  colorMap: [number, number, number, number][];

  created() {
    this.colorMap = [];
    for (let i = 0; i < 256; i++) {
      const val = (255 - i) / 256;
      this.colorMap.push([val, val, val, 1]);
    }
  }

  mounted() {
    this.audioContext = new AudioContext();
  }

  decode(data: ArrayBuffer) {
    const ctx = new AudioContext();
    ctx
      .decodeAudioData(data)
      .then(audioBuffer => this.setPeaks(audioBuffer))
      .catch(err => {
        console.error("Failed to decode audio data.");
        console.log(err);
      });
  }

  setPeaks(buffer: AudioBuffer) {
    const peaks = [];
    let min = 0;
    let max = 0;
    let top = 0;
    let bottom = 0;
    const segSize = Math.ceil(buffer.length / this.width);
    const width = this.width;
    const height = this.height;
    this.duration = buffer.duration; // while we have buffer why we don't use it ?

    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const data = buffer.getChannelData(c);
      for (let s = 0; s < width; s++) {
        const start = ~~(s * segSize);
        const end = ~~(start + segSize);
        min = 0;
        max = 0;
        for (let i = start; i < end; i++) {
          min = data[i] < min ? data[i] : min;
          max = data[i] > max ? data[i] : max;
        }
        // merge multi channel data
        if (peaks[s]) {
          peaks[s][0] = peaks[s][0] < max ? max : peaks[s][0];
          peaks[s][1] = peaks[s][1] > min ? min : peaks[s][1];
        }
        peaks[s] = [max, min];
      }
    }
    // set peaks relativelly to canvas dimensions
    for (let i = 0; i < peaks.length; i++) {
      max = peaks[i][0];
      min = peaks[i][1];
      top = height / 2 - (max * height) / 2;
      bottom = height / 2 - (min * height) / 2;
      peaks[i] = [top, bottom === top ? top + 1 : bottom];
    }
    // this.peaks = peaks;

    // if (this.playtimeClickable) {
    //   this.ctxWrapper.addEventListener("click", e => this.updateTime(e));
    // }
    // this.waveform();
  }

  resample(oldMatrix: number[][]) {
    const columnsNumber = this.width;
    const newMatrix = [];

    const oldPiece = 1 / oldMatrix.length;
    const newPiece = 1 / columnsNumber;
    let i;

    for (i = 0; i < columnsNumber; i++) {
      const column = new Array(oldMatrix[0].length);
      let j;

      for (j = 0; j < oldMatrix.length; j++) {
        const oldStart = j * oldPiece;
        const oldEnd = oldStart + oldPiece;
        const newStart = i * newPiece;
        const newEnd = newStart + newPiece;

        const overlap =
          oldEnd <= newStart || newEnd <= oldStart
            ? 0
            : Math.min(Math.max(oldEnd, newStart), Math.max(newEnd, oldStart)) - Math.max(Math.min(oldEnd, newStart), Math.min(newEnd, oldStart));
        let k;
        /* eslint-disable max-depth */
        if (overlap > 0) {
          for (k = 0; k < oldMatrix[0].length; k++) {
            if (column[k] == null) {
              column[k] = 0;
            }
            column[k] += (overlap / newPiece) * oldMatrix[j][k];
          }
        }
        /* eslint-enable max-depth */
      }

      const intColumn = new Uint8Array(oldMatrix[0].length);
      let m;

      for (m = 0; m < oldMatrix[0].length; m++) {
        intColumn[m] = column[m];
      }

      newMatrix.push(intColumn);
    }

    return newMatrix;
  }
}
</script>
