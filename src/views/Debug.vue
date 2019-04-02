<template>
  <div class="debug-container">
    <JSXTest v-model="text" color="#f00"/>
    <div class="show">
     Outside State: {{text}}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import JSXTest from "@/components/JSXTest.tsx";

@Component({ components: { JSXTest } })
export default class Debug extends Vue {
  text = "123";
}
</script>
<style lang="less">
</style>
