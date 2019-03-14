

import "./index.scss";
import React, {Component}  from "react";
import Head from "../../components/head"

import {Badge,Button} from "antd-mobile";

import store from "../../store"
import { countAdd, changeCity } from "../../actions";
import {connect} from "react-redux"

@connect(
    state=>(
        {
            city:state.city,
            count:state.count
        }
    )
)
export default class Car extends Component{

    change=()=>{
        let {dispatch} = this.props;
        dispatch(changeCity(this.refs.one.value)) 
    }

    render(){
        // let {count,city} = store.getState();
        let {count,city,dispatch} = this.props;
        return (
            <div className="box">
                <Head title="购物车"></Head>
                <div>
                    <Badge text={count} hot style={{ marginLeft: 12 }} />
                    <h2>{count}</h2>
                    <h1>{city}</h1>
                    <hr/>
                <Button onClick={()=>dispatch(countAdd(10))} type="primary"  >修改count ++</Button>
                <input type="text" placeholder="请输入" onChange={this.change} ref="one"/>
                </div>
            </div>
        )
    }
}