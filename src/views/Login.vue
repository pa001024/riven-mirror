<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <el-form v-loading="loading" :rules="rules" ref="loginForm" :model="user" class="login-box">
      <el-form-item prop="login">
        <el-input :placeholder="$t('app.loginHint')" type="text" v-model="user.login">
          <template #prefix><WfIcon type="mail" class="input-icon"/></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :placeholder="$t('app.passwordHint')" type="password" v-model="user.password">
          <template #prefix><WfIcon type="lock" class="input-icon"/></template>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: -14px">
        <input :style="'margin-top:'+(isLogin ? 18 : 8)+'px'" type="submit" class="block btn-login" :class="{'is-disabled': !canLogin}" :disabled="!canLogin" :value="isLogin ? $t('app.loginbtn') : $t('app.registerbtn')">
        <el-button style="margin-right: 12px;" link @click="isLogin=!isLogin">{{isLogin ? $t('app.registerbtn') : $t('app.loginbtn')}}</el-button>
        <router-link class="link-btn" to="/forgetpass" v-t="'app.loginforget'"></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, toNative } from "vue-facing-decorator";
import { animate } from "animejs";
import "@/less/login.less";

@Component({ components: {} })
class Login extends Vue  {
  user = {
    login: "",
    password: ""
  }

  isLogin = true
  get canLogin() { return false }

  get loading(): boolean {
    return this.$store.getters.loginLoading;
  }
  login(user: { login: string, password: string }): any {
    return this.$store.dispatch("login", user);
  }

  get rules() {
    return {
      login: [
        { type: "email", message: this.$t("app.emailcheck"), trigger: "blur" },
      ],
      password: [
        { required: true, message: this.$t("app.passmiss"), trigger: "blur" },
        { min: 6, max: 32, message: this.$t("app.passcheck"), trigger: "blur" }
      ],
    }
  }

  mounted() {
    if (this.$refs.loginForm)
      (this.$refs.loginForm as any).$el.onsubmit = this.onSubmit
  }

  onSubmit(e: MouseEvent) {
    e.preventDefault();
    if (this.$refs.loginForm) {
      (this.$refs.loginForm as any).validate((valid) => {
        if (valid) {
          this.login(this.user);
        } else {
          animate(".login-box", {
            keyframes: [
              { translateX: -8 },
              { translateX: 8 },
              { translateX: 0 },
            ],
            loop: 5,
            duration: 40,
            alternate: true,
            ease: "inOutSine"
          })
          // console.error('error submit', this.user);
        }
      });
      return false;
    }
  }
}

export default toNative(Login);
</script>
