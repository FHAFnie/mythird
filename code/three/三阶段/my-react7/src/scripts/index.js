

import React, {Component}  from "react";  // React.Component

import ReactDOM, {render} from "react-dom";   // ReactDOM.render


var rootElement = document.getElementById("app");

import Layout from "./views";

const hotRender = (IndexCpt)=>{
    render(
        <IndexCpt>
        </IndexCpt>,
        rootElement
    )
}

// hotRender(Layout)



// import "./route"

import "./redux";
