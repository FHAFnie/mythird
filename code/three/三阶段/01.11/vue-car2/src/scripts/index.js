

console.log("走秀 项目")


import Vue from "vue"
import VueResource from "vue-resource";
Vue.use(VueResource);  //全局声明 

import ElementUI from "element-ui";
Vue.use(ElementUI)  // 全局声明 

import router from "./router"
import Swiper from "./components/swiper.vue"

Vue.component("app-swiper",Swiper);

import store from "./vuex/store";

const vm = new Vue({
    el:"#app",
    router,   // 4 挂载到根实例 
    store,   // 挂载到根实例  this.$store  
    data:{
        title:"走秀 project"
    }
})