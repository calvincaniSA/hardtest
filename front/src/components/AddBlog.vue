<template>
  <div class="component fixed z3" id="addBlog">
    <v-btn icon small color="red" @click="closeForm">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-container>
      <v-form v-model="valid" ref="blogForm">
        <v-text-field v-model="blog.title" label="Blog Title" :rules="[rules.required]" required></v-text-field>

        <v-textarea
          v-model="blog.content"
          label="Blog Content"
          :rules="[rules.required]"
          rows="10"
          required
        ></v-textarea>

        <v-btn @click="submitForm" color="primary" v-if="props.action == 'add'">Create Blog</v-btn>
        <v-btn @click="saveBlog" color="primary" v-if="props.action == 'edit'">Save Blog</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useSevenstore } from "@/stores/sevenstore";
import axios from "axios";

// store
const store = useSevenstore();

// emits
const emit = defineEmits(["close", "save", "update"]);

// data
const blog = ref({
  id: 0,
  title: "",
  content: "",
});
const valid = ref(false);
const router = useRouter();
const rules = {
  required: (value) => !!value || "This field is required",
};

const props = defineProps({
  blog: {
    id: 0,
    title: "",
    content: "",
  },
  action: "",
});

// functions
const closeForm = () => {
  emit("close");
};

const saveForm = (data) => {
  emit("save", data);
};

const updateForm = (data) => {
  emit("update", data);
};

const submitForm = async () => {
  const data = {
    title: blog.value.title,
    content: blog.value.content,
  };
  try {
    const response = await axios.post("/api/blogs", data);
    if (response.status === 201) {
      saveForm(response.data.blog);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const saveBlog = async () => {
  let data = {
    title: blog.value.title,
    content: blog.value.content,
  };
  try {
    const response = await axios.put(`/api/blogs/${blog.value.id}`, data);
    if (response.status == 200) {
      if (props.action == "add") {
        saveForm(response.data);
      } else {
        updateForm(response.data);
      }
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

onBeforeMount(() => {
  if (props.action == "edit") {
    blog.value = props.blog;
  } else {
    blog.value = {
      id: 0,
      title: "",
      content: "",
    };
  }
});
</script>
