


import React , {Component} from "react";

import {Child} from './child'

import {listStore} from "../store"

import {Button} from "antd-mobile";
import { countAdd } from "../actions";


export  class Parent extends Component{

    state = {
        items:["new-item","new-item","new-item","new-item"],
        newItem:listStore.getItems(),
        count:listStore.count
    }

    addItem = ()=>{
        this.state.items.push("New-Item");
        this.setState({
            items:this.state.items
        })
    }

    addMyItem=()=>{
        console.log("006 view 接收事件 修改数据  ")
        console.log(listStore.getItems())
        this.setState({
            newItem:listStore.getItems()
        })
    }

    componentWillUnmount(){
        listStore.removeMyItemListener(this.addMyItem)
    }

    componentWillMount(){
        listStore.addMyItemListener(this.addMyItem)
        listStore.addCountChangeListener(()=>{
            this.setState({
                count:listStore.count
            })
        })
    }

    render(){
        return (
            <div>
                <h1> parent - component </h1>
                <h1> Flux Demo </h1>
                {
                    this.state.newItem.map((item,index)=>{
                        return (
                            <div key={index}>
                                {item} -- {index}
                            </div>
                        )
                    })
                }
                <Button onClick={()=>countAdd(100)} type="primary">count add = {this.state.count}  </Button>
                <Button onClick={()=>countAdd(100)} type="warning">count desc = {this.state.count}  </Button>
                <hr/>
                <Child addItem={this.addItem}/>
            </div>
        )
    }
}