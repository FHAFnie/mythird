
import React, {Component} from "react";
import store from "../store";
import {Button} from "antd-mobile"
// export default
// export 
export default class ReactReduxDemoUI extends Component{

    change=()=>{
        let {changeCity} = this.props;
        changeCity(this.refs.one.value);
    }

    render(){
        // let {count} = store.getState();
        console.log(this.props);
        let {count1,count,city,add,desc} = this.props;
        return (
            <div>
                <h2>react-redux demo  demo</h2>
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