<template>
  <div class="login-containor">
    <div class="login-bg"></div>
    <el-form :rules="rules" ref="loginForm" :model="user" class="login-box">
      <el-form-item prop="login">
        <el-input :placeholder="$t('app.loginHint')" type="email" v-model="user.login">
          <WfIcon slot="prefix" type="mail" class="input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input :placeholder="$t('app.passwordHint')" type="password" v-model="user.pass">
          <WfIcon slot="prefix" type="lock" class="input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="block btn-login" size="large" @click="onSubmit">{{$t("app.loginbtn")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import WfIcon from "@/components/WfIcon.vue";

@Component({ components: { WfIcon } })
export default class Login extends Vue {
  user = {
    login: "",
    pass: ""
  }

  get rules() {
    return {
      login: [
        { type: 'email', message: this.$t("app.emailcheck"), trigger: 'blur' },
      ],
      pass: [
        { required: true, message: this.$t("app.passmiss"), trigger: 'change' },
        { min: 6, max: 32, message: this.$t("app.passcheck"), trigger: 'change' }
      ],
    }

  }
  onSubmit(formName) {
    (this.$refs[formName] as any).validate((valid) => {
      if (valid) {
        alert(JSON.stringify(this.user))
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
</script>
<style lang="less">
@import "../less/common.less";

.login-containor {
  margin: 0 !important;
  .login-bg {
    height: calc(50vh - 160px);
    background: #7084f9;
    background-image: linear-gradient(135deg, #7084f9 0%, #3d5afe 100%);
  }
  .login-box {
    width: 440px;
    margin: -50px auto 0;
    background: #fff;
    padding: 55px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 5px 5px 20px 8px rgba(61, 90, 254, 0.11);
    .el-input {
      margin: 4px auto;
      .el-input__inner {
        border: none;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 0;
        padding-left: 40px;
        &:focus {
          border-color: @theme_main;
        }
      }
    }
  }
  .btn-login {
    background-color: #7a94ff;
    background-image: linear-gradient(90deg, #7090ff 0%, #5d8bff 100%);
    color: #fff;
    border-radius: 100px;
    border: 0;
    box-shadow: 1px 1px 4px rgba(61, 90, 254, 0.15);
    margin-top: 18px;
  }
}
.input-icon {
  height: 100%;
  text-align: center;
  transition: all 0.3s;
  line-height: 40px;
  font-size: 16px;
  padding: 0 4px;
}

@media only screen and (max-width: 767px) {
  .login-containor .login-box {
    width: calc(100vw - 40px);
  }
}
</style>
