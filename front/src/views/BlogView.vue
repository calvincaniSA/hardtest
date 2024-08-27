<template>
  <div class="page" id="viewBlog">
    <div class="pageWrap pp2">
      <v-card class="blogView">
        <v-card-title
          ><h1>{{ blog.title }}</h1></v-card-title
        >
        <v-card-text>{{ blog.content }}</v-card-text>
        <v-card-actions v-if="store.loggedIn">
          <v-btn color="primary" @click="editBlog(blog.id)">Edit</v-btn>
          <v-btn color="red" @click="deleteBlog(blog.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- COMPONENTS -->
    <AddBlog v-if="adding" :blog="blog" :action="action" @close="closeForm" @update="saveBlog" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import AddBlog from "@/components/AddBlog.vue";
import { useSevenstore } from "@/stores/sevenstore";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const blogId = route.params.id;

// store
const store = useSevenstore();

// router
const router = useRouter();

// state
const adding = ref(false);

// data
const blog = ref({
  id: 0,
  title: "",
  content: "",
});
const action = ref("");

// functions
const closeForm = () => {
  adding.value = false;
  store.overlay = false;
};

const editBlog = (id) => {
  adding.value = true;
  store.overlay = true;
  action.value = "edit";
};

const saveBlog = (data) => {
  console.log(data);
  blog.value = data.blog;
  store.overlay = false;
  adding.value = false;
};

const getBlog = async () => {
  try {
    const response = await axios.get(`/api/blogs/${blogId}`);
    if (response.status == 200) {
      blog.value = response.data;
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

const deleteBlog = async (id) => {
  if (confirm("Are you sure you want to delete this blog? This cannot be undone!")) {
    try {
      const response = await axios.delete(`/api/blogs/${id}`);
      if (response.status == 200) {
        router.push("/");
      }
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  }
};

// hooks
onBeforeMount(() => {
  if (Object.keys(store.blog).length > 0) {
    blog.value = store.blog;
  } else {
    getBlog();
  }
});
</script>

<style scoped>
.blogView {
  width: 50%;
  margin: 0 auto;
}
</style>
