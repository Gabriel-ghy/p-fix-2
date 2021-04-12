import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/home.vue'
import Index from '../components/Logged/index.vue'
import Login from '../components/login.vue'
import Appointment from '../components/Logged/appointment'
import FixManagement from '../components/Logged/fixmanagement'
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children:
            [
                {
                    path: '/',
                    name: 'Index',
                    component: Index,
                    meta: {requireAuth: true,title:"主页-先锋网络中心"}
                },
                {
                    path: '/Appointment',
                    name: 'Appointment',
                    component: Appointment,
                    meta: {requireAuth: true,title: "预约维修-先锋网络中心"}
                },
                {
                    path: '/FixManagement',
                    name: 'FixManagement',
                    component: FixManagement,
                    meta: {requireAuth: true,title: "维修管理-先锋网络中心"}
                }
            ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {requireAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/Login') {    //若要跳转的页面是登录界面
        next();     //直接跳转
    }
    else{   //若要跳转的页面是个人界面  if (to.path === '/')
        let token = localStorage.getItem('token');    //获取本地存储的token值
        if (token===null||token===''){    //若token为空则验证不成功，跳转到登录页面
            next('/Login');
            ElMessage("请先登录！")
        }
        else{           //不为空则验证成功
            next();
        }
    }
    // else{
    //     next();
    // }
});

export default router;