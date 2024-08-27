<template>
  <div class="center">
    <div class="pageWrap pp2">
      <v-app>
        <v-card class="custom-card pa-4"><h1>Page Not Found</h1></v-card>
      </v-app>
    </div>
  </div>
</template>

<script setup>
document.title = "Page you are looking for does not exist";
</script>
<style scoped>
.custom-card {
  width: 400px;
  margin: 0 auto;
}
</style>
