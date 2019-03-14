

import "./index.scss";
import React, {Component}  from "react";
import Head from "../../components/head"

import {Badge,Button} from "antd-mobile";

import store from "../../store"
import { countAdd, changeCity } from "../../actions";

export default class Car extends Component{

    change=()=>{
       store.dispatch(changeCity(this.refs.one.value)) 
    }

    render(){
        let {count,city} = store.getState();
        return (
            <div className="box">
                <Head title="购物车"></Head>
                <div>
                    <Badge text={count} hot style={{ marginLeft: 12 }} />
                    <h2>{count}</h2>
                    <h1>{city}</h1>
                    <hr/>
                <Button onClick={()=>store.dispatch(countAdd(10))} type="primary"  >修改count ++</Button>
                <input type="text" placeholder="请输入" onChange={this.change} ref="one"/>
                </div>
            </div>
        )
    }
}