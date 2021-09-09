<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="loading">Loading...</div>
    <div v-for="post in getPosts" :key="post.id">
      <router-link :to="{ name: 'post', params: { id: post.id } }">
        [ID: {{ post.id }}] {{ post.text | summary }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return { loading: true };
  },
  //lifecycle method
  created() {
    this.fetchData();
  },
  filters: {
    summary(val) {
      return val.substring(0, 20) + "...";
    },
  },
  computed: {
    ...mapGetters(['getPosts'])
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$store.dispatch('loadPosts').then(() => {
        this.loading = false;
      });
    },
  },
};
</script>