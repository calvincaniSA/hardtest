<template>
  <div class="component" id="header">
    <ul id="mainMenu" class="flex justC p20 w40 between auto">
      <router-link to="/"><li>Home</li></router-link>
      <router-link to="/about"><li>About</li></router-link>
      <router-link to="/blogs"><li>Blogs</li></router-link>
      <router-link to="/register" v-if="!store.loggedIn"><li>Register</li></router-link>
      <router-link to="/login" v-if="!store.loggedIn"><li>Login</li></router-link>
      <router-link to="/logout" v-if="store.loggedIn" @click="logout"><li>Logout</li></router-link>
    </ul>
  </div>
</template>

<script setup>
import { useSevenstore } from "@/stores/sevenstore";
import { useRouter } from "vue-router";
import axios from "axios";

// router
const router = useRouter();

// store
const store = useSevenstore();

// functions
const logout = async () => {
  store.loggedIn = false;
  try {
    const response = await axios.post("/api/logout");
    if (response.status === 200 || response.status === 204) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user");
      router.push("/");
    }
  } catch (error) {
    console.error("Logout failed:", error.response ? error.response.data : error.message);
  }
};
</script>
