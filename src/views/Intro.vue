<template>
  <div class="intro-container">
    <div class="hidden-xs-only section">
      <div class="container">
        <div class="intro">
          <h1 v-t="'intro.ti1'"></h1>
          <p v-t="'intro.ti2'"></p>
        </div>
        <div class="action">
          <a class="btn" href="https://warframe.huijiwiki.com/wiki/blog:RivenMirror" target="_blank" v-t="'intro.a1'"></a>
          <router-link class="btn solid" to="/alerts" v-t="'intro.a2'"></router-link>
        </div>
      </div>
    </div>
    <div class="section tool white-bg">
      <div class="container">
        <el-row :gutter="8">
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/alerts" tag="div" class="tool-button">
              <router-link to="/alerts">
                <WfIcon type="world"/>
                <div class="name">{{$t("navigate.index")}}</div>
                <div class="desc" v-t="'intro.d1'"></div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/riven" tag="div" class="tool-button">
              <router-link to="/riven">
                <WfIcon type="motion"/>
                <div class="name">{{$t("navigate.riven")}}</div>
                <div class="desc" v-t="'intro.d2'"></div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/weapon" tag="div" class="tool-button">
              <router-link to="/weapon">
                <WfIcon type="extension"/>
                <div class="name">{{$t("navigate.weapon")}}</div>
                <div class="desc" v-t="'intro.d3'"></div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/warframe" tag="div" class="tool-button">
              <router-link to="/warframe">
                <WfIcon type="people"/>
                <div class="name">{{$t("navigate.warframe")}}</div>
                <div class="desc" v-t="'intro.d4'"></div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/sim" tag="div" class="tool-button">
              <router-link to="/sim">
                <WfIcon type="renew"/>
                <div class="name">{{$t("navigate.simulator")}}</div>
                <div class="desc" v-t="'intro.d5'"></div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/palette" tag="div" class="tool-button">
              <router-link to="/palette">
                <WfIcon type="palette"/>
                <div class="name">{{$t("navigate.palette")}}</div>
                <div class="desc" v-t="'intro.d6'"></div>
              </router-link>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="section why">
      <div class="container">
        <h1 class="title" v-t="'intro.why'"></h1>
        <el-row>
          <el-col :sm="24" :md="8" class="why-section">
            <h2 v-t="'intro.wh1'"></h2>
            <ul>
              <li v-html="$t('intro.w11')"></li>
              <li v-html="$t('intro.w12')"></li>
              <li v-html="$t('intro.w13')"></li>
            </ul>
          </el-col>
          <el-col :sm="24" :md="8" class="why-section">
            <h2 v-t="'intro.wh2'"></h2>
            <ul>
              <li v-html="$t('intro.w21')"></li>
              <li v-html="$t('intro.w22')"></li>
              <li v-html="$t('intro.w23')"></li>
            </ul>
          </el-col>
          <el-col :sm="24" :md="8" class="why-section">
            <h2 v-t="'intro.wh3'"></h2>
            <ul>
              <li v-html="$t('intro.w31')"></li>
              <li v-html="$t('intro.w32')"></li>
              <li v-html="$t('intro.w33')"></li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="section footer white-bg">
      <div class="container">
        <div class="line">
          <h3 v-t="'intro.fh1'"></h3>
          <ul class="clear">
            <li>
              <a href="https://github.com/pa001024/riven-mirror" target="_blank">GitHub</a>
            </li>
            <li>
              <a href="https://warframe.huijiwiki.com/wiki/blog:RivenMirror" target="_blank" v-t="'intro.fw1'"></a>
            </li>
            <li>
              <a href="https://www.bilibili.com/video/av31311040/" target="_blank" v-t="'intro.fw2'"></a>
            </li>
            <li>
              <a href="https://jq.qq.com/?_wv=1027&k=5ErGtmX" target="_blank" v-t="'intro.fw3'"></a>
            </li>
            <li>
              <a href="https://discord.gg/m8pGvfP" target="_blank" v-t="'intro.fw4'"></a>
            </li>
            <li>
              <a href="https://github.com/pa001024/riven-mirror/issues/new/choose" target="_blank" v-t="'setting.bugreport'"></a>
            </li>
            <li>
              <a href="https://afdian.net/@rivenmirror" target="_blank" v-t="'intro.fw6'"></a>
            </li>
          </ul>
        </div>
        <div class="line">
          <h3 v-t="'intro.fav'"></h3>
          <ul class="clear">
            <li><a href="https://www.warframe.com/" target="_blank" v-t="'intro.fav1'"></a></li>
            <li><a href="https://warframe.huijiwiki.com/" target="_blank" v-t="'intro.fav2'"></a></li>
            <li><a href="https://warframe.love/" target="_blank" v-t="'intro.fav3'"></a></li>
            <li><a href="https://warframe.fandom.com/" target="_blank" v-t="'intro.fav4'"></a></li>
            <li><a href="https://wfa.richasy.cn/" target="_blank" v-t="'intro.fav5'"></a></li>
          </ul>
        </div>
        <div class="line copyright">
          <p>
            <span>Created by pa001024 &nbsp; 2018 ~ 2019</span>&nbsp;
            <s>上海アリス幻樂団</s>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import localStorage from "universal-localstorage";

@Component({ components: {} })
export default class extends Vue {
  touse(e: MouseEvent) {
    e.preventDefault();
    this.$router.push("/alerts");
  }

  mounted() {
    localStorage.setItem("0w0", "yes");
  }
}
</script>
<style lang="less">
.intro-container {
  .tool-section {
    cursor: pointer;
    text-align: center;
    margin-bottom: 24px;
    display: block;
    text-decoration: none;
    .tool-button {
      border: 1px solid #eee;
      padding: 42px 0 24px;
      border-radius: 4px;
      &:hover {
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
      }
      a {
        text-decoration: none;
      }
      .name {
        font-size: 1.5rem;
        margin: 24px 0 12px;
        color: #282828;
      }
      .desc {
        color: #666;
        font-size: 1rem;
        margin: 12px 0;
        height: 2rem;
        word-break: keep-all;
      }
      .icon {
        color: #3a88fd;
        display: block;
        font-size: 3rem;
        margin: 0 auto 12px;
      }
    }
  }
  .footer {
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        display: inline-block;
        padding-right: 30px;
      }
    }
    a {
      color: inherit;
      text-decoration: none;
      transition: 0.3s all;
      font-size: 16px;
      &:hover {
        color: #3a88fd;
      }
    }
    .line {
      padding: 16px 0;
      h3 {
        padding-bottom: 10px;
        font-weight: normal;
        font-size: 14px;
      }
    }
    .copyright {
      color: #aaa;
      font-size: 12px;
      padding-bottom: 0;
    }
  }
  margin: 0 !important;
  .section {
    width: 100%;
    padding: 40px 0;
    background: #f6f9fc;
    .container {
      width: 1012px;
      margin: 0 auto;
    }
    &.white-bg {
      background: #fff;
    }
  }
  .action {
    .btn {
      position: relative;
      cursor: pointer;
      line-height: 1.4;
      display: inline-block;
      padding: 6px 10px;
      white-space: nowrap;
      border-radius: 4px;
      font-size: 18px;
      padding: 10px 26px;
      margin-right: 24px;
      touch-action: manipulation;
      font-weight: 700;
      text-decoration: none;
      border: 2px solid #4893ff;
      background-color: transparent;
      color: #4893ff;
      transition: all 0.3s;
      &.solid {
        border: 2px solid #4893ff;
        background-color: #4893ff;
        color: #fff;
      }
    }
  }
  strong {
    color: #35affb;
  }
  .intro {
    h1 {
      font-size: 2.8rem;
      margin: 0.67em 0;
    }
    p {
      font-size: 1.4rem;
      line-height: 28px;
      color: #444;
    }
  }
  .why {
    .title {
      font-size: 24px;
      margin-bottom: 40px;
    }
    ul {
      padding-left: 14px;
      li {
        list-style: none;
        position: relative;
        padding: 0.5em 0;
        font-size: 16px;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: -14px;
          display: block;
          width: 4px;
          height: 4px;
          margin-top: -2px;
          border-radius: 100%;
          background-color: #35affb;
        }
      }
    }
  }
}
@media screen and (max-width: 1080px) {
  .intro-container {
    .section {
      padding: 20px 0;
      .container {
        width: 92%;
      }
    }
    .footer ul li {
      display: block;
      margin-top: 12px;
    }
  }
}
</style>
