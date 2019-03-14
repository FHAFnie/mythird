

import "./index.scss";
import React, {Component}  from "react";
import {NavLink} from "react-router-dom";

export default class MyFoot extends Component{
    state = {
        foots:[
            {txt:"首页",path:"/app/home",name:"home",icon:"icon-home"},
            {txt:"商品",path:"/app/goods",name:"goods",icon:"icon-goodsfill"},
            {txt:"购物车",path:"/app/car",name:"car",icon:"icon-shop_car"},
            {txt:"我",path:"/app/my",name:"mine",icon:"icon-my"},
        ]
    }
    render(){

        return (
            <footer>
                {
                    this.state.foots.map((foot,index)=>{
                        return (
                            <div key={index} >
                                <NavLink to={foot.path} activeClassName="nav-active" >
                                    <i className={"iconfont "+foot.icon }></i>
                                    <span>{foot.txt}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </footer>
        )
    }
}
