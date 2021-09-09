import axios from "axios";

const api_url = process.env.VUE_APP_APIURL;
const post_url = `${api_url}/api/posts`;

const state = {
  posts: [],
  post: {},
};
const getters = {
  getPosts(state) {
    return state.posts;
  },
  getPost(state) {
    return state.post;
  },
};
const actions = {
  loadPosts(context) {
    axios
      .get(`${post_url}`)
      .then((res) => res.data)
      .then((items) => context.commit("setPosts", items))
      .catch((err) => console.error(err));
  },
  loadPost(context, payload) {
    axios
      .get(`${post_url}/${payload.id}`)
      .then((res) => res.data)
      .then((item) => context.commit("setPost", item))
      .catch((err) => console.error(err));
  },
  removePost(context, id) {
    axios
      .delete(`${post_url}/${id}`)
      .then((res) => res.data)
      .then((items) => context.commit("setPosts", items))
      .catch((err) => console.error(err));
  },
  addPost(context, payload) {
    axios
      .post(`${post_url}`, payload)
      .then((res) => res.data)
      .then((items) => context.commit("setPosts", items))
      .catch((err) => console.error(err));
  },
};
const mutations = {
  setPosts(state, items) {
    state.posts = items;
  },
  setPost(state, item) {
    state.post = item;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
