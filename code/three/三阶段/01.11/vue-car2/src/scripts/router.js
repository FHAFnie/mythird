

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
import Box from "./views/box.vue"
import Man from "./views/man.vue"
import Woman from "./views/woman.vue"
import Brand from "./views/brand.vue"
import GoodDetail from "./views/good-detail.vue"
import ShopCar from "./views/shopcar.vue"

// 2. 配置 routes

const routes = [
    {path:"",redirect:{name:'home'}},
    {path:"/register",name:"register",component:Register},
    {path:"/login",name:"login",component:Login},
    {
        path:"/app",
        name:'app',
        component:App,
        children:[
            {   
                path:"box",
                name:'box',
                component:Box,
                children:[
                    {path:'home',name:'home',component:Home},
                    {path:'newgoods',name:'newgoods',component:newGoods},
                    {path:'man',name:'man',component:Man},
                    {path:'woman',name:'woman',component:Woman},
                    {path:'brand',name:'brand',component:Brand}
                ]
            },
            {
                path:'good-detail/:id',
                name:'gooddetail',
                component:GoodDetail
            },
            {
                path:"shopcar",
                name:'shopcar',
                component:ShopCar
            }
        ]
    },
    {path:"*",redirect:{name:'home'}},
]

// 3. 创建路由
const router = new VueRouter({
    routes,
    mode:"hash"
})

// 暴露

export  default router;
