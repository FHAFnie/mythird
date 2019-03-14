

import React, {Component}  from "react";  // React.Component

import ReactDOM, {render} from "react-dom";   // ReactDOM.render

import App from "./components/app";

class Index extends Component{
    render(){
        return(
            <div>
                <h2>react-demo - index</h2>
                <App></App>
            </div>
        )
    }
}

const root = document.getElementById("app")

render(
    <Index/>,
    root
)
