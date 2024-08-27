<template>
  <div class="page" id="registerPage">
    <div class="pageWrap pp2">
      <h1 class="center">Register</h1>
      <v-container max-width="30%">
        <form>
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-text-field label="Email address" v-model="email"></v-text-field>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            label="Enter your password"
            @click:append-inner="visible = !visible"
            v-model="password"
          ></v-text-field>
          <v-btn class="mb-8" color="red" size="large" variant="tonal" block @click="registerUser"> Register </v-btn>
          <v-card-text class="text-center"
            >Already registered?
            <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
              Login now <v-icon icon="mdi-chevron-right"></v-icon>
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
import axios from "axios";

// router
const router = useRouter();

// data
const name = ref("");
const email = ref("");
const password = ref("");
const visible = ref("");

// functions
const registerUser = async () => {
  let data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post("/api/register", data);
    if (response.status == 201) {
      router.push("/login");
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};
</script>
