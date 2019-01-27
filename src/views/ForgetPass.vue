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
import "@/less/login.less";

@Component({ components: { } })
export default class ForgetPass extends Vue {
  user = {
    login: "",
  }

  get rules() {
    return {
      login: [
        { type: 'email', message: this.$t("app.emailcheck"), trigger: 'blur' },
      ],
    }

  }
  mounted() {
    // console.log(this.$refs.loginForm);
    if (this.$refs.loginForm)
      (this.$refs.loginForm as any).$el.onsubmit = this.onSubmit
  }

  onSubmit(e: MouseEvent) {
    e.preventDefault();
    (this.$refs.loginForm as any).validate((valid) => {
      if (valid) {
        console.log(this.user)
      } else {
        console.log('error submit!!');
      }
    });
    return false;
  }
}
</script>
