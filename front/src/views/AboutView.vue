<template>
  <div class="page" id="homePage">
    <div class="pageWrap pp2 w60 auto">
      <h1 class="center mb30">Level Seven Hard Test</h1>
      <v-app>
        <v-card class="pa-4">{{ msg }}</v-card>
      </v-app>
    </div>
  </div>
</template>

<script setup>
document.title = "Home";
import { ref } from "vue";

const msg = ref("This is the level seven hard test");
</script>
