


import React, {Component}  from "react";
import {HashRouter as Router ,Route,Switch,Redirect} from "react-router-dom";
import Guide from "./guide";
import App from "./app";
import SearchDemo from "./search";
import Login from "./login";
import GoodDetail from "./goodDetail";

export default class Layout extends Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/" exact  component={Guide} />
                    <Route path="/app" component={App} />
                    <Route path="/search/:keyword?" component={SearchDemo} />
                    <Route path="/login/:token?" component={Login} />
                    <Route path="/goods/detail/:id" component={GoodDetail} />
                    <Route render={
                        ()=>{
                            return <Redirect to="/app/home"/>
                        }
                    } />
                </Switch>
            </Router>
        )
    }
}
