

// 每一个 Vuex 应用的核心就是 store（仓库）

// “store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)    

//1. Vuex 的状态存储是响应式的  store 中的状态发生变化，那么相应的组件也会相应地得到高效更新


//2. 你不能直接改变 store 中的状态  改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation


import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);

import axios from "axios";

// state 一个对象就包含了全部的应用层级状态

import state from "./state"
import actions from "./actions"
import mutations from "./mutations"

const store = new Vuex.Store({
    state,
    getters:{
        cars:function(state){
            let carNum = 0;
            state.carList.forEach((item)=>{
                carNum+=item.count * 1;
            })
            return "共" + carNum  + '件商品';
        }
    },
    actions,
    mutations
})

export default store;