<template>
  <div
    class="container"
  >
    <Staff
      :showTrebleClef="showTrebleClef"
      :showBassClef="showBassClef"
      :showBrace="true"
      :showEnd="true"
    />
    <slot />
    <Staff
      :showEnd="true"
    />
  </div>
</template>

<script>
import Staff from './Staff';
export default {
  props: {
    showTrebleClef: {
      default: true,
    },
    showBassClef: {
      default: true,
    },
  },
  components: {
    Staff,
  },
  provide() {
    return {
      showTrebleClef: this.showTrebleClef,
      showBassClef: this.showBassClef,
    };
  }
}
</script>

<style scoped>
.container {
  font-size: 0;
}
</style>
