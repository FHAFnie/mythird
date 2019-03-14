

// 模块化编程 

console.log('模块化编程')
// import Vue from "../../node_modules/vue/dist/vue.js";  // node_modules
import Vue from "vue";  // node_modules

import word from "./demo"

import {msg,message} from "./msg"

import img from "../assets/imgs/3.jpg"

import App from "./components/app.vue";
import Foot from "./components/foot.vue"
Vue.component("app-root",App);
Vue.component("app-foot",Foot);

import ElementUI from "element-ui";
Vue.use(ElementUI)    // Vue.use 表示全局声明 

import VueResource from "vue-resource";
Vue.use(VueResource);    // this.$http.get Vue.http

const vm = new Vue({
    el:"#app",
    data:{
        title:"vue + webpack ",
        word,
        msg,
        message,
        img
    }
})
