<template>
  <div class="master-main">
    <div class="master" v-if="questions.length">
      <div class="master-header">
        <div class="title">
          <span style="font-size:40px"><WfIcon type="tenno"/></span>
Warframe知识程度测验
2019年 - A卷
        </div>
        <div class="desc">
          <!-- 联办: 极镜、Warframe中文维基 -->
        </div>
      </div>
      <div class="master-stat">
        <div class="progress">
          答题进度: <span>第{{showIndex+1}} / {{this.questions.length}}</span> 题
          <el-progress :percentage="progress" />
        </div>
        <div class="time" v-if="started">此题答题时间剩余: {{time}}秒</div>
      </div>
      <div class="master-body">
        <!-- 问题 -->
        <div class="questions">
          <div class="question">
            <div class="title">
              {{showIndex+1}}.
              {{questions[showIndex].text}}
            </div>
            <div class="options">
              <el-radio-group v-model="answers[showIndex]" v-if="questions[showIndex].type === 2">
                <el-radio :label="1">正确</el-radio>
                <el-radio :label="0">错误</el-radio>
              </el-radio-group>
              <el-checkbox-group v-model="answers[showIndex]" v-else-if="questions[showIndex].type === 1">
                <el-checkbox :label="i" v-for="(o,i) in questions[showIndex].options" :key="i">{{o}}</el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-model="answers[i]" v-else>
                <el-radio :label="i" v-for="(o,i) in questions[showIndex].options" :key="i">{{o}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="steps">
          <div class="step next" v-if="hasNext">
            <el-button type="primary" @click="nextQuestion">下一题</el-button>
          </div>
          <div class="step finish" v-else>
            <el-button type="primary" @click="nextQuestion">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import axios from "axios";

enum QuestionType {
  Select,
  Multi,
  Check,
  Image,
  Text
}

interface Question {
  type?: QuestionType;
  text: string;
  options?: string[];
  images?: string[];
}

@Component({ components: {} })
export default class Master extends Vue {
  questions: Question[] = [];
  countDown: number;
  answers: (number | number[])[] = null;
  showIndex = 0;
  time = 30;
  get progress() {
    const p = (this.showIndex / this.questions.length) * 100;
    return +p.toFixed(0);
  }
  timer: number = 0;
  get started() {
    return this.timer !== 0;
  }
  set started(val: boolean) {
    if (val) {
      if (!this.timer)
        this.timer = setInterval(() => {
          if (--this.time <= 0) {
            this.nextQuestion();
          }
        }, 1e3);
    } else {
      if (this.timer) clearInterval(this.timer);
      this.timer = 0;
    }
  }
  get hasNext() {
    return this.showIndex < this.questions.length;
  }

  nextQuestion() {
    this.showIndex++;
    this.time = 30;
    this.started = true;
  }

  async loadDataOnline() {
    const rst = await axios.get("https://api.riven.im/master/questions");
    this.questions = rst.data;
  }
  mounted() {
    this.loadDataOnline();
  }
}
</script>
<style lang="less">
.master-header {
  width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.33;
  font-weight: 500;
  font-size: 18px;
  color: #363b3e;
  text-align: center;
  .title {
    font-size: 18px;
  }
  .desc {
    font-size: 12px;
    color: #999;
  }
}

.master-stat {
  font-size: 14px;
  text-align: center;
  .time {
    color: #f56c6c;
  }
}

.master-main {
  width: 720px;
  max-width: 100vw;
  margin: 16px auto;
  background: white;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
  .questions {
    padding: 20px 0;
  }
  .question {
    margin: 12px 0;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #494949;
      margin-right: 4px;
      line-height: 1.5;
      word-break: break-all;
      position: relative;
    }
    .options {
      display: flex;
      align-items: center;
      word-break: break-all;
      font-size: 14px;
      line-height: 1.5;
      color: #41464b;
      margin: 6px 0 7px 8px;
      cursor: pointer;
      label {
        display: block;
        margin: 8px 0;
      }
    }
  }
}
</style>
