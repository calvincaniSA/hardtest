<template>
  <div class="overlay" v-if="store.overlay"></div>
  <Header />
  <router-view />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useSevenstore } from "@/stores/sevenstore";
import Header from "@/components/Header.vue";
import axios from "axios";

const store = useSevenstore();

onBeforeMount(() => {
  const loggedInStatus = localStorage.getItem("loggedIn");
  store.loggedIn = loggedInStatus;
});
</script>
