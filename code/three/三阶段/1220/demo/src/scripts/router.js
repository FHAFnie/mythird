

// 0.  模块化编程 
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

// 1. 定义路由组件 

import Register from "./views/register.vue";
import Login from "./views/login.vue";
import App from "./views/app.vue"
import Home from "./views/home.vue"
import newGoods from "./views/new-good.vue"
// 2. 配置 routes

const routes = [

    {path:"/",name:"register",component:Register},
    {path:"/login",name:"login",component:Login},
    {
        path:"/app",
        name:'app',
        component:App,
        children:[
            {path:'home',name:'home',component:Home},
            {path:'newgoods',name:'newgoods',component:newGoods},

        ]
    }
]

// 3. 创建路由
const router = new VueRouter({
    routes,
    mode:"hash"
})

// 暴露

export  default router;
