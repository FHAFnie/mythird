
import React, {Component}  from "react";


import store from "../store"
import {Button,Badge } from "antd-mobile"
import { countDesc, increment, changeInpByOne, changeTitle, changeData, changeMv } from "../actions";

import axios from "axios";

export default class CounterDemo extends Component{

    changeInp=()=>{
        store.dispatch(changeInpByOne(this.refs.one.value))
    }

    getTitle = ()=>{
        axios.get("http://47.94.208.182:3000/getdata/123")
        .then(res=>{
            console.log(res);
            store.dispatch(changeTitle({
                title:res.data,
                callback:()=>{
                    alert("数据修改成功")
                }
            }))
        })
    }

    componentWillMount(){
        store.dispatch(changeMv({url:"http://47.94.208.182:3000/movie"}))
    }

    render(){
        let count1 = store.getState().count;
        console.log(this.props);
        let {state,count,city,changeLoveCity,msg,title,mv} = this.props;

        return(
            <div>
                <h1>redux - 架构  - 数据管理 </h1>
                <h3>counter  计数器 </h3>
                <h2>count1 == {count1}</h2>
                <h2>count  == {count}</h2>
                <h2>count2  == {state.count}</h2>
                <Badge text={city} hot style={{ marginLeft: 12 }} />
                <Badge text={msg} hot style={{ marginLeft: 12 }} />
                <Badge text={title} hot style={{ marginLeft: 12 }} />
                <hr/>
                <Button type="primary" onClick={ ()=>store.dispatch({type:"COUNT_ADD",payload:10}) } >修改count ++</Button>
                <Button type="warning" onClick={ ()=>store.dispatch(countDesc) } >修改count -- 20</Button>
                <Button type="warning" onClick={ ()=>store.dispatch(increment(200))  } >修改count ++  200</Button>
                <Button type="warning" onClick={ ()=> changeLoveCity('深圳-sz') } >change city 深圳 </Button>
                <p>
                    <input type="text" ref="one" onChange={this.changeInp}/>
                </p>

                <Button type="warning"  onClick={ this.getTitle } > ajax 修改数据  </Button>
                <Button type="warning"  onClick={ ()=>store.dispatch(changeData({url:"http://47.94.208.182:3000/getdata/123"})) } >  修改数据 redux-thunk  </Button>

                {
                    mv.map((m,i)=>{
                        return (
                            <p key={i}>
                                {m.title} -- {m.year}
                            </p>
                        )
                    })
                }
            </div>
        )
    }
}

