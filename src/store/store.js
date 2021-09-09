import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },
};

export const store = new Vuex.Store({
    //상태변수
    state: {
        todoItems: storage.fetch()
    },
    //Setter 메서드
    mutations: {
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
