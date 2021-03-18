import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
        //从本地获取token，没有则置空
    },
    mutations: {
        setToken (state,token) {
            state.token =token;
            localStorage.setItem("token",token.token);     //存储token
        },
        delToken (state) {
            state.token = '';
            localStorage.removeItem("token");    //删除token
        }
    }
})