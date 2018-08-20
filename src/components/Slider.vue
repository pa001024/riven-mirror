<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { Vue, Component, Prop } from "vue-property-decorator";
import BScroll from 'better-scroll';

@Component
export default class extends Vue {
  @Prop({
    type: Boolean,
    default: true
  }) loop;
  @Prop({
    type: Boolean,
    default: true
  }) autoPlay;
  @Prop({
    type: Number,
    default: 4000
  }) interval;
  currentPageIndex = 0;
  slider: BScroll;
  children: HTMLCollection;
  timer: number;

  _setSliderWidth(isResize?: boolean) {
    this.children = (this.$refs.sliderGroup as HTMLElement).children;
    //
    let width = 0;
    let sliderWidth = (this.$refs.slider as HTMLElement).clientWidth;
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i] as HTMLElement;
      child.className += 'slider-item';
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    }
    //
    if (this.loop && !isResize) {
      width += 2 * sliderWidth
    }
    (this.$refs.sliderGroup as HTMLElement).style.width = width + 'px'
  }
  _initSlider() {
    this.slider = new BScroll(this.$refs.slider as Element, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop,
        threshold: 0.3,
        speed: 400
      },
      click: true
    })

    this.slider.on('scrollEnd', () => {
      let pageIndex = this.slider.getCurrentPage().pageX
      // console.log("pageIndex:" + pageIndex)
      // console.log("currentPageIndex:" + this.currentPageIndex)
      // console.log(this.loop)

      if (this.loop) {
        pageIndex -= 1
      }
      // console.log("pageIndex:" + pageIndex);
      this.currentPageIndex = pageIndex

      if (this.autoPlay) {

        clearTimeout(this.timer)
        this._play()
      }
    })
  }
  _play() {
    // console.log("currentPageIndex:" + this.currentPageIndex);
    let pageIndex = this.currentPageIndex + 1
    // console.log("pageIndex:" + pageIndex)

    if (this.loop) {
      pageIndex += 1
    }
    // console.log("pageIndex:" + pageIndex);

    this.timer = setTimeout(() => {
      this.slider.goToPage(pageIndex, 0, 400)
    }, this.interval);
  }

  // 生命周期钩子
  mounted() {
    this.$nextTick(() => {
      this._setSliderWidth()
      this._initSlider()
    });
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh
    })

    if (this.autoPlay) {
      this._play()
    }
  }
}

</script>
