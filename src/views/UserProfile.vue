<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="12" :sm="24">

    </el-col>
    <el-col :span="12" :sm="24">

    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { i18n } from "@/i18n";
import { UserMeta } from "@/service/user";

@Component
export default class UserProfile extends Vue {
  @Prop() user: string;
  userMeta: UserMeta = null;

  @Watch("user")
  onUserChange() {

  }
}
</script>
<style lang="less">
</style>
