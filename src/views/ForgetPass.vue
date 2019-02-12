<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <el-form :rules="rules" ref="loginForm" :model="user" class="login-box">
      <el-form-item prop="login">
        <el-input :placeholder="$t('app.loginHint')" type="email" v-model="user.login">
          <WfIcon slot="prefix" type="mail" class="input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item>
        <input type="submit" class="block btn-login" :value="$t('app.sendreset')">
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import anime from "animejs";
import "@/less/login.less";

@Component({ components: {} })
export default class ForgetPass extends Vue {
  user = {
    login: "",
  }

  isLogin = true
  @Getter("loginLoading") loading: boolean;
  @Action("resetpassword") resetpassword: (user: { login: string }) => void;

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
          anime({
            targets: ".login-box",
            keyframes: [
              { translateX: -8 },
              { translateX: 8 },
              { translateX: 0 },
            ],
            loop: 5,
            duration: 40,
            direction: "alternate",
            easing: "easeInOutSine"
          })
          // console.error('error submit', this.user);
        }
      });
      return false;
    }
  }
}
</script>
