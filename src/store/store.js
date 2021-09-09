import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import todo from './modules/todo';

Vue.use(Vuex);
//순서가 바뀌면 않됩니다
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
    modules: {
        todo
    }
});
