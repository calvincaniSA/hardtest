<template>
  <div class="page" id="blogsView">
    <div class="pageWrap pp2">
      <h1 class="center mb30">Blogs</h1>
      <div class="wrap center">
        <v-btn color="primary" @click="addBlog" v-if="store.loggedIn"> Add Blog </v-btn>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="blog in blogs" :key="blog.id">
            <v-card>
              <v-card-title @click="viewBlog(blog.id)">{{ blog.title }}</v-card-title>
              <v-card-text>{{ blog.content }}</v-card-text>
              <v-card-actions v-if="store.loggedIn">
                <v-btn color="purple" @click="viewBlog(blog.id)">View</v-btn>
                <v-btn color="primary" @click="editBlog(blog.id)">Edit</v-btn>
                <v-btn color="red" @click="deleteBlog(blog.id)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <AddBlog
        v-if="adding"
        :blog="blogToEdit"
        :action="action"
        @close="closeForm"
        @update="updateBlogs"
        @save="saveBlog"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import AddBlog from "@/components/AddBlog.vue";
import { useSevenstore } from "@/stores/sevenstore";
import { useRouter } from "vue-router";
import axios from "axios";

// store
const store = useSevenstore();

// router
const router = useRouter();

// state
const adding = ref(false);

// data
const blogs = ref([]);
const blogToEdit = ref({});
const action = ref("");

// functions
const closeForm = () => {
  adding.value = false;
  store.overlay = false;
};

const addBlog = () => {
  adding.value = true;
  store.overlay = true;
  action.value = "add";
};

const viewBlog = (id) => {
  router.push(`/blogs/blog/${id}`);
  const blog = blogs.value.find((e) => e.id == id);
  store.blog = blog;
};

const editBlog = (id) => {
  blogToEdit.value = blogs.value.find((e) => e.id == id);
  adding.value = true;
  store.overlay = true;
  action.value = "edit";
};

const saveBlog = (data) => {
  blogs.value.push(data);
  store.overlay = false;
  adding.value = false;
};

const updateBlogs = (data) => {
  adding.value = false;
  store.overlay = false;
  const blog = blogs.value.find((e) => e.id == data.id);
  if (blog) {
    blog.title = data.title;
    blog.content = data.content;
  }
};

const getBlogs = async () => {
  try {
    const response = await axios.get("/api/blogs");
    if (response.status == 200) {
      blogs.value = response.data;
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
        blogs.value = blogs.value.filter((e) => e.id != id);
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
  getBlogs();
});
</script>
