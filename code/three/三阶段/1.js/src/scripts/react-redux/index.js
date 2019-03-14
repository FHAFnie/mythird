

import React, {Component} from "react";
import ReactDOM ,{render} from "react-dom";
import ReactReduxDemoUI from "./views"  // UI 组件 
import Counter from "./views/counter"   // 容器  组件 

import  store from "./store"
import {Provider} from "react-redux" // 负责传递store 

import CounterBox from "./views/counterBox"
const hotRender = ()=>{
    render(
        <Provider store={store}>
             <CounterBox/>
        </Provider>,
        document.getElementById("app")
    )
}

hotRender()