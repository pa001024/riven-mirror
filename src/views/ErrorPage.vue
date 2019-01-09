<template>
  <div class="error" v-once>
    <div class="notfoud-container">
      <div class="img-404">
      </div>
      <p class="notfound-p">哎呀迷路了...</p>
      <div class="notfound-reason">
        <p>可能的原因：</p>
        <ul>
          <li>原来的页面不存在了</li>
          <li>我们的服务器被外星人劫持了</li>
        </ul>
      </div>
      <div class="notfound-btn-container">
        <a class="notfound-btn" href="/" @click="goBack">返回首页</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class ErrorPage extends Vue {
  goBack(e: MouseEvent) {
    e.preventDefault()
    this.$router.replace('/')
  }
}
</script>


<style lang="less" scoped>
@import "../less/common.less";

a {
  text-decoration: none;
}
ul{
  padding: 0;
}
.notfoud-container .img-404 {
  height: 155px;
  background: url(/img/page-404.png) center center no-repeat;
  background-size: 150px auto;
  margin-top: 40px;
  margin-bottom: 20px;
}
.notfoud-container .notfound-p {
  line-height: 22px;
  font-size: 17px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  color: #262b31;
}
.notfoud-container .notfound-reason {
  color: #9ca4ac;
  font-size: 13px;
  line-height: 13px;
  text-align: left;
  width: 210px;
  margin: 0 auto;
}
.notfoud-container .notfound-reason p {
  margin-top: 13px;
}
.notfoud-container .notfound-reason ul li {
  margin-top: 10px;
  margin-left: 36px;
}
.notfoud-container .notfound-btn-container {
  margin: 40px auto 0;
  text-align: center;
}
.notfoud-container .notfound-btn-container .notfound-btn {
  display: inline-block;
  border: 1px solid #ebedef;
  background-color: @theme_main;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  line-height: 16px;
  white-space: nowrap;
}
</style>
