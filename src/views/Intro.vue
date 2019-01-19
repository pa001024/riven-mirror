<template>
  <div class="intro-container">
    <div class="section">
      <div class="container">
        <div class="intro">
          <h1>全新一站式工具应用</h1>
          <p>极镜(Riven.IM)是先进的Warframe工具应用，为紫卡分析，配卡模拟等提供技术解决方案。</p>
        </div>
        <div class="action">
          <a class="btn" href="https://warframe.huijiwiki.com/wiki/blog:RivenMirror" target="_blank">查看文档</a>
          <router-link class="btn solid" to="/alerts">立即使用</router-link>
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
                <div class="desc">突击 / 警报 / 裂缝 / 赏金</div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/riven" tag="div" class="tool-button">
              <router-link to="/riven">
                <WfIcon type="motion"/>
                <div class="name">{{$t("navigate.riven")}}</div>
                <div class="desc">紫卡评分 / 数值查询 / 配置计算</div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/weapon" tag="div" class="tool-button">
              <router-link to="/weapon">
                <WfIcon type="extension"/>
                <div class="name">{{$t("navigate.weapon")}}</div>
                <div class="desc">收益分析 / 配卡分享 / 幻影装置</div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/warframe" tag="div" class="tool-button">
              <router-link to="/warframe">
                <WfIcon type="people"/>
                <div class="name">{{$t("navigate.warframe")}}</div>
                <div class="desc">战甲配装 / 技能数值 / 属性计算</div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/sim" tag="div" class="tool-button">
              <router-link to="/sim">
                <WfIcon type="renew"/>
                <div class="name">{{$t("navigate.simulator")}}</div>
                <div class="desc">模拟开卡 / 模拟洗卡</div>
              </router-link>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="8" :md="4" class="tool-section">
            <router-link to="/palette" tag="div" class="tool-button">
              <router-link to="/palette">
                <WfIcon type="palette"/>
                <div class="name">{{$t("navigate.palette")}}</div>
                <div class="desc">图片取色 / 色板找色</div>
              </router-link>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="section why">
      <div class="container">
        <h1 class="title">
          为什么选择极镜
        </h1>
        <el-row>
          <el-col :sm="24" :md="8" class="why-section">
            <h2>更高效</h2>
            <ul>
              <li>支持OCR，快速识别<strong>紫卡截图</strong></li>
              <li>一键生成<strong>最佳配卡</strong>，根据情况自动适应</li>
              <li>根据与最佳紫卡对比快速计算<strong>紫卡评分</strong></li>
            </ul>
          </el-col>
          <el-col :sm="24" :md="8" class="why-section">
            <h2>更专业</h2>
            <ul>
              <li><strong>幻影装置</strong>对应真实伤害模型</li>
              <li><strong>夜灵</strong>独有算法完美支持</li>
              <li>各种<strong>加成效果</strong>高度集成</li>
            </ul>
          </el-col>
          <el-col :sm="24" :md="8" class="why-section">
            <h2>更丰富</h2>
            <ul>
              <li>平原时间警报通知一步到位</li>
              <li>数百种颜色百里挑一：<strong>选色工具</strong></li>
              <li><strong>配装分享</strong>收获更多粉丝</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="section footer white-bg">
      <div class="container">
        <!-- <div class="line">
          <h3>极镜应用</h3>
          <ul class="clear">
            <li><router-link to="/alerts" v-t="'navigate.index'"></router-link></li>
            <li><router-link to="/riven" v-t="'navigate.riven'"></router-link></li>
            <li><router-link to="/weapon" v-t="'navigate.weapon'"></router-link></li>
            <li><router-link to="/warframe" v-t="'navigate.warframe'"></router-link></li>
            <li><router-link to="/sim" v-t="'navigate.simulator'"></router-link></li>
            <li><router-link to="/huangli" v-t="'navigate.huangli'"></router-link></li>
            <li><router-link to="/palette" v-t="'navigate.palette'"></router-link></li>
          </ul>
        </div> -->
        <div class="line">
          <h3>关于和帮助</h3>
          <ul class="clear">
            <li>
              <a href="https://warframe.huijiwiki.com/wiki/blog:RivenMirror" target="_blank">使用文档</a>
            </li>
            <li>
              <a href="https://www.bilibili.com/video/av31311040/" target="_blank">视频教程</a>
            </li>
            <li>
              <a href="https://jq.qq.com/?_wv=1027&k=5ErGtmX" target="_blank">内测交流群 (165371868)</a>
            </li>
            <li>
              <a href="https://discord.gg/m8pGvfP" target="_blank">Discord</a>
            </li>
            <!-- <li>
              <router-link to="/eula">用户协议</router-link>
            </li>
            <li>
              <router-link to="/about">关于</router-link>
            </li> -->
            <li>
              <a href="https://afdian.net/@rivenmirror" target="_blank">打赏</a>
            </li>
          </ul>
        </div>
        <div class="line">
          <h3>友情链接</h3>
          <ul class="clear">
            <li><a href="https://www.warframe.com/">游戏官网</a></li>
            <li><a href="https://warframe.love/">中文论坛</a></li>
            <li><a href="https://warframe.huijiwiki.com/">中文维基</a></li>
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

@Component({ components: {} })
export default class extends Vue {
  touse(e: MouseEvent) {
    e.preventDefault();
    this.$router.push("/alerts")
  }

  mounted() {
    localStorage.setItem("0w0", "yes")
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
@media screen and (max-width: 1012px) {
  .intro-container .section {
    padding: 20px 0;
    .container {
      width: 92%;
      padding: 0 4%;
    }
  }
}
</style>
