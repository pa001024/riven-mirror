<template>
  <div class="fft-visualizer">
    <input class="el-upload__input" type="file" ref="uploader" @change="fileChange" />
    <canvas ref="canvas" :width="width" :height="height">Your browser does not support Canvas tag.</canvas>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { FFT } from "../fft";

@Component({ components: {} })
export default class Spectrogram extends Vue {
  audioContext: AudioContext;
  @Prop({ default: 1024 }) fftSamples: number;
  @Prop() pixelRatio: number;
  @Prop() windowFunc: string;
  @Prop() alpha: number;
  @Prop() height: number;
  @Prop() timeScale: number;
  /** Size of the overlapping window. Must be < fftSamples. Auto deduced from canvas size by default. */
  @Prop() noverlap: number;
  duration: number;
  colorMap: [number, number, number, number][];
  audioData: ArrayBuffer;
  buffer: AudioBuffer;
  spectrCc: CanvasRenderingContext2D;
  width = 400;

  get canvas() {
    return this.$refs.canvas as HTMLCanvasElement;
  }

  created() {
    this.colorMap = [];
    for (let i = 0; i < 256; i++) {
      const val = (255 - i) / 256;
      this.colorMap.push([val, val, val, 1]);
    }
  }

  upload() {
    (this.$refs.uploader as any).click();
  }

  fileChange(e: any) {
    const files = e.target.files as FileList;
    if (!files) return;
    const file = files[0];
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = rst => {
      this.audioData = fr.result as ArrayBuffer;
      this.decode(this.audioData);
    };
  }
  mounted() {
    this.audioContext = new AudioContext();
    this.spectrCc = this.canvas.getContext("2d");
  }

  decode(data: ArrayBuffer) {
    const ctx = new AudioContext();
    ctx
      .decodeAudioData(data)
      .then(audioBuffer => {
        this.buffer = audioBuffer;
        this.width = this.buffer.duration * this.timeScale;
        this.$nextTick(() => {
          const feqs = this.getFrequencies();
          this.drawSpectrogram(feqs);
        });
      })
      .catch(err => {
        console.error("Failed to decode audio data.");
        console.log(err);
      });
  }

  drawSpectrogram(frequenciesData: Uint8Array[]) {
    const spectrCc = this.spectrCc;
    const length = this.buffer.duration;
    const height = this.height;
    const pixels = this.resample(frequenciesData);
    const heightFactor = this.buffer ? 2 / this.buffer.numberOfChannels : 1;
    let i;
    let j;

    for (i = 0; i < pixels.length; i++) {
      for (j = 0; j < pixels[i].length; j++) {
        const colorMap = this.colorMap[pixels[i][j]];
        this.spectrCc.fillStyle = "rgba(" + colorMap[0] * 256 + ", " + colorMap[1] * 256 + ", " + colorMap[2] * 256 + "," + colorMap[3] + ")";
        this.spectrCc.fillRect(i, height - j * heightFactor, 1, heightFactor);
      }
    }
  }

  getFrequencies() {
    const fftSamples = this.fftSamples;
    const buffer = this.buffer;
    const channelOne = buffer.getChannelData(0);
    const bufferLength = buffer.length;
    const sampleRate = buffer.sampleRate;
    const frequencies: Uint8Array[] = [];

    if (!buffer) {
      console.error("Web Audio buffer is not available");
      return;
    }

    let noverlap = this.noverlap;
    if (!noverlap) {
      const uniqueSamplesPerPx = buffer.length / this.width;
      noverlap = Math.max(0, Math.round(fftSamples - uniqueSamplesPerPx));
    }

    const fft = new FFT(fftSamples, sampleRate, this.windowFunc, this.alpha);
    const maxSlicesCount = Math.floor(bufferLength / (fftSamples - noverlap));
    let currentOffset = 0;

    while (currentOffset + fftSamples < channelOne.length) {
      const segment = channelOne.slice(currentOffset, currentOffset + fftSamples);
      const spectrum = fft.calculateSpectrum(segment);
      const array = new Uint8Array(fftSamples / 2);
      let j;
      for (j = 0; j < fftSamples / 2; j++) {
        array[j] = Math.max(-255, Math.log10(spectrum[j]) * 45);
      }
      frequencies.push(array);
      currentOffset += fftSamples - noverlap;
    }
    return frequencies;
  }

  resample(oldMatrix: Uint8Array[]) {
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
