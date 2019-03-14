

import React, {Component}  from "react";  // React.Component

import ReactDOM, {render} from "react-dom";   // ReactDOM.render


var rootElement = document.getElementById("app");

import Layout from "./views";

import store from "./store"

const hotRender = ()=>{
    render(
        <Layout>
        </Layout>,
        rootElement
    )
}

// hotRender()
// store.subscribe(hotRender);  //  监听state 改变


// import "./route"

// import "./redux";

import "./react-redux"