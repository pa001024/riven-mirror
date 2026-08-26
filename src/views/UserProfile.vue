<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="12" :sm="24">

    </el-col>
    <el-col :span="12" :sm="24">

    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, toNative } from "vue-facing-decorator";
import { i18n } from "@/i18n";
import { UserMeta } from "@/service/user";

@Component
class UserProfile extends Vue  {
  @Prop() user: string;
  userMeta: UserMeta = null;

  @Watch("user")
  onUserChange() {

  }
}

export default toNative(UserProfile);
</script>
<style lang="less">
</style>
