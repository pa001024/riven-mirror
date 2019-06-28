<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <p>test.............................</p>
        {{ counter }}
        <v-btn @click="addCounter">addCounter</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

@Component
export default class Index extends Vue {
  @Getter('counter') counter!: number;
  @Action('addCounter') addCounter!: () => void;
}
</script>
