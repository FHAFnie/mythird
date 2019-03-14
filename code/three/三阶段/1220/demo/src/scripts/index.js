

console.log("走秀 项目")




import Vue from "vue"
import VueResource from "vue-resource";
Vue.use(VueResource);  //全局声明

import ElementUI from "element-ui";
Vue.use(ElementUI)

import router from "./router"
import Swiper from "./components/swiper.vue"

Vue.component("app-swiper",Swiper);


const vm = new Vue({
    el:"#app",
    router,   // 4 挂载到根实例
    data:{
        title:"走秀 project"
    }
})
