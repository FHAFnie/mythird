import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Guid from "./views/Guid.vue";

import Goods from "./views/Goods.vue";
import Car from "./views/Car.vue";
import My from "./views/My.vue";
import Goodsdetail from "./views/goodsdetail.vue";
import Goodslist from "./views/goodslist.vue";
import Login from "./views/login.vue";
import Register from "./views/register.vue";

Vue.use(Router)
import Layout from "./views/Layout.vue";
export default new Router({
  routes: [
    {
      path:"/",
      component:Guid
    },
    {
      path: '/app',
      name: 'app',
      component:Layout,
      children:[
        // 重定向
        {path:"/",redirect:{name:"home"}},
        {path:"home",component:Home,name:"home"},
        {
          path:"goods",
          component:Goods,
          name:"goods",
          children:[
            {path:"/",redirect:{name:"goodslist"}},
            // {path:"",name:"goodslist",component:Goodslist},
            {path:"goodslist",component:Goodslist,name:"goodslist"},
            {path:"goodsdetail",component:Goodsdetail,name:"goodsdetail"},
            {path:"*",redirect:{name:"goodslit"}},
          ]
        },
        {path:"car",component:Car,name:"car"},
        {path:"my",component:My,name:"my"},
        {path:"goodslist",component:Goodslist,name:"goodslist"},
        {path:'login',component:Login,name:'login'},
        {path:'register',component:Register,name:'register'},
        {path:"*",redirect:{name:"home"}},

      ]
    },

    {
      path:"*",
      redirect:{name:"home"}
    }

  ],
  mode:"hash"
})
