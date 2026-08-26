<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <el-form :rules="rules" ref="loginForm" :model="user" class="login-box">
      <el-form-item prop="login">
        <el-input :placeholder="$t('app.loginHint')" type="email" v-model="user.login">
          <template #prefix><WfIcon type="mail" class="input-icon"/></template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <input type="submit" class="block btn-login" :value="$t('app.sendreset')">
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, toNative } from "vue-facing-decorator";
import { animate } from "animejs";
import "@/less/login.less";

@Component({ components: {} })
class ForgetPass extends Vue  {
  user = {
    login: "",
  }

  isLogin = true
  get loading(): boolean {
    return this.$store.getters.loginLoading;
  }
  resetpassword(user: { login: string }): any {
    return this.$store.dispatch("resetpassword", user);
  }

  get rules() {
    return {
      login: [
        { type: 'email', message: this.$t("app.emailcheck"), trigger: 'blur' },
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
          this.resetpassword(this.user);
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

export default toNative(ForgetPass);
</script>
