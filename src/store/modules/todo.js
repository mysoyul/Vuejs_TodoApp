import axios from 'axios';

const api_url = process.env.VUE_APP_APIURL;
const todo_url = `${api_url}/api/todos`;
    //'http://localhost:4500/api/todos';

//상태변수
const state = {
    todoItems: []
};
//Getters 메서드
const getters = {
    getTodoItems(state) {
        return state.todoItems;
    }
};
//actions 메서드
const actions =  {
    loadTodoItems(context) {
        axios.get(`${todo_url}`)
            .then(res => res.data)
            .then(items => context.commit('setTodoItems', items))
            .catch(err => console.log('Error : ' + err));
    },
    removeTodo(context, payload) {
        axios.delete(`${todo_url}/${payload.id}`)
            .then(res => res.data)
            .then(items => context.commit('setTodoItems', items))
            .catch(err => console.log('Error : ' + err));
    },
    addTodo(context, payload) {
        axios.post(`${todo_url}`, payload)
            .then(res => res.data)
            .then(items => context.commit('setTodoItems', items))
            .catch(err => console.log('Error : ' + err));
    },
    toggleTodo(context, payload) {
        axios.put(`${todo_url}/${payload.id}`, payload)
            .then(res => res.data)
            .then(items => context.commit('setTodoItems', items))
            .catch(err => console.log('Error : ' + err));
    },
    clearTodo(context) {
        axios.delete(`${todo_url}`)
            .then(res => res.data)
            .then(items => context.commit('setTodoItems', items))
            .catch(err => console.log('Error : ' + err));
    }
};  
//Setters 메서드
const mutations = {
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
};
export default {
    state, getters, actions, mutations
}