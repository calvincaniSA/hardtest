import { defineStore } from "pinia";
import { ref } from "vue";

export const useSevenstore = defineStore("sevenstore", () => {
  const loggedIn = ref(false);
  const overlay = ref(false);
  const blog = ref({});

  return {
    loggedIn,
    overlay,
    blog,
  };
});
