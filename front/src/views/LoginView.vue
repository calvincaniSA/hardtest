<template>
  <div class="page" id="loginPage">
    <div class="pageWrap pp2">
      <h1 class="center">Log In</h1>
      <v-container max-width="30%">
        <form>
          <v-text-field label="Email address" v-model="email"></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            label="Enter your password"
            @click:append-inner="visible = !visible"
            v-model="password"
          ></v-text-field>
          <v-btn class="mb-8" color="red" size="large" variant="tonal" block @click="loginUser"> Log In </v-btn>
          <v-card-text class="text-center">
            <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer">
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </form>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSevenstore } from "@/stores/sevenstore";
import axios from "axios";

// store
const store = useSevenstore();

// router
const router = useRouter();

// data
const email = ref("");
const password = ref("");

// functions
const loginUser = async () => {
  let data = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post("/api/login", data);

    if (response.status === 200) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("loggedIn", "true");
      store.loggedIn = true;
      router.push("/");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
