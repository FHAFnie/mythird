

import React, {Component}  from "react";  // React.Component

import ReactDOM, {render} from "react-dom";   // ReactDOM.render


var rootElement = document.getElementById("app");

import Layout from "./views";

import store from "./store"

import {Provider} from "react-redux"

const hotRender = ()=>{
    render(
        <Provider store={store} >
            <Layout/>
        </Provider>,
        rootElement
    )
}

// hotRender()
// store.subscribe(hotRender);  //  监听state 改变


// import "./route"

// import "./redux";

// import "./react-redux"

import "./flux"