import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
//순서가 바뀌면 않됩니다
Vue.use(VueAxios, axios);

// const storage = {
//     fetch() {
//         const arr = [];
//         if (localStorage.length > 0) {
//             for (let i = 0; i < localStorage.length; i++) {
//                 if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
//                     arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
//                 }
//             }
//         }
//         return arr;
//     },
// };

const api_url = 'http://localhost:4500/api/todos';

export const store = new Vuex.Store({
    //상태변수
    state: {
        todoItems: []
    },
    //Getters 메서드
    getters: {
        getTodoItems(state) {
            return state.todoItems;
        }
    },
    //actions 메서드
    actions: {
        loadTodoItems(context) {
            axios.get(`${api_url}`)
                .then(res => res.data)
                .then(items => context.commit('setTodoItems', items))
                .catch(err => console.log('Error : ' + err));
        },
        removeTodo(context, payload) {
            axios.delete(`${api_url}/${payload.id}`)
                .then(res => res.data)
                .then(items => context.commit('setTodoItems', items))
                .catch(err => console.log('Error : ' + err));
        },
        addTodo(context, payload) {
            axios.post(`${api_url}`, payload)
                .then(res => res.data)
                .then(items => context.commit('setTodoItems', items))
                .catch(err => console.log('Error : ' + err));
        },
        toggleTodo(context, payload) {
            axios.put(`${api_url}/${payload.id}`, payload)
                .then(res => res.data)
                .then(items => context.commit('setTodoItems', items))
                .catch(err => console.log('Error : ' + err));
        },
        clearTodo(context) {
            axios.delete(`${api_url}`)
                .then(res => res.data)
                .then(items => context.commit('setTodoItems', items))
                .catch(err => console.log('Error : ' + err));
    }
    },    
    //Setters 메서드
    mutations: {
        setTodoItems(state, items){
            state.todoItems = items;
        },
        addTodo(state, todoItem) {
            const obj = { completed: false, item: todoItem };
            //JSON.stringify는 object를 json string 으로 변환
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state, payload) {
            const {todoItem, index} = payload;
            localStorage.removeItem(todoItem.item);
            state.todoItems.splice(index, 1);
        },
        toggleTodo(state, payload) {
            //destructuring assignment
            const {todoItem, index} = payload;
            const {item, completed} = todoItem;

            state.todoItems[index].completed = !completed;
            //localStorage에 updateItem 메서드가 없어서 removeItem 하고 setItem 한다.
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(todoItem));
          },
          clearTodo(state) {
            localStorage.clear();
            state.todoItems = [];
          }
    },
});
