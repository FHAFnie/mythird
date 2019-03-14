//这是配制路由组件的文件


// 1. 模块化编程书写
import Vue from "vue";//引入vue
import VueRouter from "vue-router";//引入vue-router模块
Vue.use(VueRouter);//全局化VueRouter，其他地方都可以使用

// 2.定义路由组件，在其他页面已经创建了一些,可以直接引入

import App from "./views/app.vue";
import Login from "./views/login.vue";
import Register from "./views/register.vue";
import User from "./views/user.vue";
import Goods from "./views/goods.vue"
import Goodslist from "./components/goodslist.vue";
import Goodsdetails from "./components/goodsdetails.vue";
import Singleshopcar from "./components/singleshopcar.vue";
import Shopcar from "./components/shopcar.vue";


// 3.配制路由组件
const routes=[
  {path:"/",component:App,name:"home"},
  {
    path:"/user",
    name:"user",
    component:User,
    children:[
      {path:"",name:"login",component:Login},
      {path:"login",name:"login",component:Login},
      {path:"register",name:"register",component:Register},
    ]
  },
  {
    path:"/goods",
    name:"goods",
    component:Goods,
    children:[
      {path:"",name:"goodslist",component:Goodslist},
      {path:"goodslist",name:"goodslist",component:Goodslist},
      {path:"goodsdetails",name:"goodsdetails",component:Goodsdetails},
      {path:"singleshopcar",name:"singleshopcar",component:Singleshopcar},
      {path:"shopcar",name:"shopcar",component:Shopcar},
    ]
  }
]
const router=new VueRouter({
  routes
})

export default router;









