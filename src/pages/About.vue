<template>
  <el-row type="flex" :gutter="20" justify="center">
    <el-card class="about">
      <h3 slot="header">版权声明</h3>
      <p><img src="/static/pic1.jpg">本网站（软件）目前是由本人（<a href="https://github.com/pa001024" target="_blank">pa001024</a>）独立开发完成的。</p>
      <p>如果对本项目有兴趣，</p>
      <p>欢迎发电: <a href="https://afdian.net/@rivenmirror" target="_blank">https://afdian.net/@rivenmirror</a></p>
      <p>欢迎入群: <a href="https://jq.qq.com/?_wv=1027&k=5G2T30X" target="_blank">165371868</a></p>
      <p>欢迎邮件: <a href="mailto:pa001024@qq.com">pa001024@qq.com</a></p>
      <div class="swtich-lang">
        <span class="lang" @click="setlang('en')">English</span>
        <span class="lang" @click="setlang('zh-CN')">简体中文</span>
        <span class="lang" @click="setlang('zh-TW')">台灣正體</span>
      </div>
      <div class="cssskin3d">
        <div class="cssskin3d-profile">
          <div class="m">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <div class="h">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <div class="lh">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <div class="rh">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <div class="d">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <div class="lf">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
          <div class="rf">
            <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
          </div>
        </div>
      </div>
    </el-card>
  </el-row>
</template>
<script lang="ts">
import _ from "lodash";
import { changeLocale } from "@/i18n";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  setlang(lang: string) {
    changeLocale(lang);
  }
}
</script>
<style lang="less">
.lang {
  margin: 5px;
  color: cornflowerblue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.about h3 {
  margin: 0;
}
@skin: url(~"data:image/png;base64,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");
// CSSSKIN3d
.size(@w,@h) {
  width: @w;
  height: @h;
}
@len: 16px;
// 整体动画
@keyframes r {
  0%,
  100% {
    transform: rotateX(-10deg) rotateY(-10deg);
  }
  50% {
    transform: rotateX(-10deg) rotateY(10deg);
  }
}
// 头部动画
@keyframes h-rise {
  0%,
  100% {
    transform: rotateX(2deg);
  }
  50% {
    transform: rotateX(-2deg);
  }
}
// 手部
@keyframes fa-rise {
  0%,
  100% {
    transform: rotateX(130deg);
  }
  50% {
    transform: rotateX(100deg);
  }
}
@keyframes fb-rise {
  0%,
  100% {
    transform: rotateZ(-8deg);
  }
  50% {
    transform: rotateZ(-4deg);
  }
}
// 身体
@keyframes b-rise {
  0%,
  100% {
    transform: rotateZ(-5deg);
  }
  50% {
    transform: rotateZ(-4deg);
  }
}

.cssskin3d {
  @var: 300px;
  perspective: @var;
  height: @len*13;
  width: @len*13;
  .border-radius(220px);
  // box-shadow: 0 0 45px #FAFAFA;
  // background: #FAFAFA;
  margin: 0 auto;
  padding: 1px;
  &:hover {
    .lh,
    .rh,
    .d,
    .lf,
    .rf {
      display: initial;
    }
  }
  .lh,
  .rh,
  .d,
  .lf,
  .rf {
    display: none;
  }
}

.cssskin3d-profile {
  //DEBUG
  .anime(r 12s linear infinite);
  margin: @len*6 auto;
  position: relative;
  .size(0,0);
  .ty;
  div,
  ul,
  li {
    display: block;
    position: absolute;
    margin: 0;
    padding: 0;
    .siz(0,0);
    .ty;
  }
  li {
    list-style: none;
    background: @skin;
    background-size: @len*16 @len*8;
    // border: 1px solid #faa;
  }
  //贴图
  .m {
    li:nth-child(6) {
      .ps(10,2);
    } //前
    li:nth-child(5) {
      .ps(14,2);
    } //后
    li:nth-child(4) {
      .ps(8,2);
    } //左
    li:nth-child(3) {
      .ps(12,2);
    } //右
    li:nth-child(2) {
      .ps(10,0);
    } //上
    li:nth-child(1) {
      .ps(12,0);
    } //下
  }
  .h {
    li:nth-child(6) {
      .ps(2,2);
    }
    li:nth-child(5) {
      .ps(6,2);
    }
    li:nth-child(4) {
      .ps(0,2);
    }
    li:nth-child(3) {
      .ps(4,2);
    }
    li:nth-child(2) {
      .ps(2,0);
    }
    li:nth-child(1) {
      .ps(4,0);
    }
  }
  .lh,
  .rh {
    li:nth-child(6) {
      .ps(11,5);
    }
    li:nth-child(5) {
      .ps(13,5);
    }
    li:nth-child(4) {
      .ps(10,5);
    }
    li:nth-child(3) {
      .ps(12,5);
    }
    li:nth-child(2) {
      .ps(11,4);
    }
    li:nth-child(1) {
      .ps(12,4);
    }
  }
  .d {
    li:nth-child(6) {
      .ps(6,5);
    }
    li:nth-child(5) {
      .ps(8,5);
    }
    li:nth-child(4) {
      .ps(5,5);
    }
    li:nth-child(3) {
      .ps(8,5);
    }
    li:nth-child(2) {
      .ps(5,4);
    }
    li:nth-child(1) {
      .ps(7,4);
    }
  }
  .lf,
  .rf {
    li:nth-child(6) {
      .ps(1,5);
    }
    li:nth-child(5) {
      .ps(3,5);
    }
    li:nth-child(4) {
      .ps(0,5);
    }
    li:nth-child(3) {
      .ps(2,5);
    }
    li:nth-child(2) {
      .ps(1,4);
    }
    li:nth-child(1) {
      .ps(2,4);
    }
  }
  //模型
  .m {
    .skin3d( 1, 2,2,2,  0,-2.5  );
    ul {
      .trans(scale3d(1.1,1.1,1.1));
    }
  }
  .h {
    .skin3d( 1, 2,2,2,  0,-2.5  );
  }
  .d {
    .skin3d( 1, 1,2,3           );
  }
  .lh {
    .skin3d( 1, 1,1,3,  -1.5,0,0,  0,1.25  );
  }
  .rh {
    .skin3d(-1, 1,1,3,   1.5,0,0,  0,1.25  );
  }
  .lf {
    .skin3d( 1, 1,1,3,  -0.5,3,0,  0,1.25  );
  }
  .rf {
    .skin3d(-1, 1,1,3,   0.5,3,0,  0,1.25  );
  }
  //动画
  .m,
  .h {
    .anime(h-rise 1s ease-out infinite);
  }
  .rf {
    //.anime(fc-rise 1s ease-out infinite);
    transform: translateX(2px) rotateZ(-3deg);
  }
  .lh {
    .anime(fa-rise 1s ease infinite);
  }
  .rh {
    .anime(fb-rise 1s ease-out infinite);
  }
  .lf {
    //.anime(fb 2s ease-out infinite);
    transform: translateX(2px);
  }
  .d {
    .anime(b-rise 1s ease-out infinite);
  }
}
// .size(@w,@h){
//   width:@w;
//   height:@h;
// }
.siz(@w,@h) {
  width: @len* @w;
  height: @len* @h;
  margin-left: -@len* @w / 2;
  margin-top: -@len* @h / 2;
}
.ps(@x,@y) {
  background-position: -@len* @x -@len* @y;
}
.trans(@style) {
  transform: @style;
}
.anime(@style) {
  animation: @style;
}
.border-radius(@style) {
  border-radius: @style;
}
.ty {
  @ty: ~"preserve-3d";
  transform-style: @ty;
}
.skin3d(@l:1,@d:2,@w:2,@h:2,@x:0,@y:0,@z:0,@ox:0,@oy:0,@oz:0) {
  left: @len* (@x - @ox);
  top: @len* (@y - @oy);
  @base: translate3d(@ox* @len, @oy* @len, @oz* @len);
  ul {
    .trans( @base );
  }
  li:nth-child(6) {
    .siz(@w,@h);
    .trans( translateZ(@len*@d/2) rotateY(90deg-@l*90deg) );
  }
  li:nth-child(5) {
    .siz(@w,@h);
    .trans( translateZ(-@len*@d/2) rotateY(90deg-@l*90deg) );
  }
  li:nth-child(4) {
    .siz(@d,@h);
    .trans( translateX(-@l*@len*@w/2) rotateY(@l*-90deg) );
  }
  li:nth-child(3) {
    .siz(@d,@h);
    .trans( translateX(@l*@len*@w/2) rotateY(@l*90deg) );
  }
  li:nth-child(2) {
    .siz(@w,@d);
    .trans( translateY(-@len*@h/2) rotateX(@l*90deg) );
  }
  li:nth-child(1) {
    .siz(@w,@d);
    .trans( translateY(@len*@h/2) rotateX(@l*90deg) );
  }
}
</style>
