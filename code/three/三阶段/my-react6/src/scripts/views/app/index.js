

import "./index.scss";
import React, {Component}  from "react";

import {Route, Switch,Redirect} from "react-router-dom";

import Home from "../home"
import Goods from "../goods"
import Car from "../car"
import My from "../my"

import MyFoot from "../../components/myfoot"
import Foot from "../../components/foot"


export default class App extends Component{
    render(){
        return (
            <div className="box">
                <Switch>
                    <Route path="/app/home" component={Home}/>
                    <Route path="/app/goods" component={Goods}/>
                    <Route path="/app/car" component={Car}/>
                    <Route path="/app/my" component={My}    />
                    <Route render={
                        ()=>{
                            return <Redirect to="/app/home"/>
                        }
                    } />
                    <Route  component={Home}/>
                </Switch>

                <MyFoot history={this.props.history} location={this.props.location}  {...this.props} ></MyFoot>

            </div>
        )
    }
}
