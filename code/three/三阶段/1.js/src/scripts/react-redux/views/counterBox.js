
import React, {Component} from "react";

import {Button} from "antd-mobile"

import {connect} from "react-redux"

import { increment, changeCity } from "../actions";

// ES7 语法    @connect 类装饰器  修饰 class 
// 把元数据 装载到 class  里面 
@connect( 
    state=>{    // mapStateToProps
        console.log(state);
        return {
            ...state,
            count1:state.count+2000
        }
    },
    dispatch=>(   // mapDispatchToProps
        {
            add:(payload)=>{
                dispatch({
                    type:"ADD",
                    payload
                })
            },
            desc:()=>dispatch(increment(50)),
            changeCity:city=>dispatch(changeCity(city))
        }
    )
)
export default class CounterBox extends Component{

    change=()=>{
        let {changeCity} = this.props;
        changeCity(this.refs.one.value);
    }

    render(){
       
        console.log(this.props);
        let {count1,count,city,add,desc} = this.props;
        return (
            <div>
                <h2>react-redux demo  demo  ES7 </h2>
                <h1>UI 组件 </h1>
                <h1>容器组件 </h1>
                <h1>count = = {count } count1==={count1}  city == {city}</h1>
                <Button type="primary" onClick={ ()=>add(100) }>count add 100 </Button>
                <Button type="warning" onClick={ desc }>count desc 50 </Button>
                <input type="text"  ref="one" onChange={this.change}/>

            </div>
        )
    }
}