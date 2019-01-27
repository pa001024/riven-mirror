<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <el-form :rules="rules" ref="loginForm" :model="user" class="login-box">
      <el-form-item prop="login">
        <el-input :placeholder="$t('app.loginHint')" type="email" v-model="user.login">
          <WfIcon slot="prefix" type="mail" class="input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :placeholder="$t('app.passwordHint')" type="password" v-model="user.password">
          <WfIcon slot="prefix" type="lock" class="input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: -14px">
        <input type="submit" class="block btn-login" :value="isLogin ? $t('app.loginbtn') : $t('app.registerbtn')">
        <router-link class="link-btn" to="/forgetpass" v-t="'app.loginforget'"></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import anime from 'animejs';
import "@/less/login.less";

@Component({ components: {} })
export default class Login extends Vue {
  user = {
    login: "",
    password: ""
  }

  isLogin = true

  get rules() {
    return {
      login: [
        { type: 'email', message: this.$t("app.emailcheck"), trigger: 'blur' },
      ],
      password: [
        { required: true, message: this.$t("app.passmiss"), trigger: 'change' },
        { min: 6, max: 32, message: this.$t("app.passcheck"), trigger: 'change' }
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
      console.log(this.$refs.loginForm);

      (this.$refs.loginForm as any).validate((valid) => {
        if (valid) {
          console.log(this.user)
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
            direction: 'alternate',
            easing: 'easeInOutSine'
          })
          // console.error('error submit', this.user);
        }
      });
      return false;
    }
  }
}
</script>
