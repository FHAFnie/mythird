

import React, {Component}  from "react";
import ReactDOM, {render} from "react-dom";

import CounterDemo from "./views/counter"

import store from "./store";
import { changeCity } from "./actions";



const hotRender = ()=>{
    const state = store.getState();  // 初始化执行
    render(
        <CounterDemo
        state={state}
        {...state}
        changeLoveCity = { city=>store.dispatch(changeCity(city))  }
        />,
        document.getElementById("app")
    )
}

hotRender();
store.subscribe(hotRender)   // state change  会触发视图刷新
