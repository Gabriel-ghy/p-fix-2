import {createApp} from 'vue';
import { createStore } from 'vuex'
import App from "@/App";

const app = createApp(App)

const store = createStore({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    },
    mutations: {
        setToken (state,tokens) {
            state.token =tokens.token;
            localStorage.setItem("token",tokens.token);     //存储token
            localStorage.setItem("userid",tokens.userid);     //存储token
            localStorage.setItem("username",tokens.username);     //存储token
        },
        delToken (state) {
            state.token = '';
            localStorage.removeItem("token");    //删除token
            localStorage.removeItem("userid");    //删除token
            localStorage.removeItem("username");    //删除token
        }
    }
})
app.use(store);
export default store;
