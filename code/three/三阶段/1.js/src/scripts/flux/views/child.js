



import React , {Component} from "react";

import {Button} from "antd-mobile";
import { addNewItem, removeItem } from "../actions";


export  class Child extends Component{

    add(){
        console.log("001   views");
        addNewItem('my=items');
    }

    render(){
        let {addItem} = this.props;
        return (
            <div>
                <h1> child - component - 子组件  </h1>
                <Button onClick={addItem} type="primary">add New Item</Button>
                <Button onClick={this.add} type="warning">add New Item By Flux</Button>
                <Button onClick={removeItem} type="warning">remove New Item Flux</Button>
            </div>
        )
    }
}