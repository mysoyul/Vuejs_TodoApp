<template>
  <div>
    <h2>View Post</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="getPost">
      <h3>[ID: {{ getPost.id }}]</h3>
      <div>{{ getPost.text }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.fetchData();
  },
  watch: { $route: "fetchData" },
  computed: {
    ...mapGetters(['getPost'])
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$store.dispatch('loadPost', {id:this.$route.params.id} )
      this.loading = false;
    },
  },
};
</script>