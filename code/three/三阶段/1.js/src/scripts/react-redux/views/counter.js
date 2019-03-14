
// 通过 UI 组件 生成 容器组件 

import {  connect } from "react-redux";
import ReactReduxDemoUI from "./index";
import { increment, changeCity } from "../actions";

// 建立 容器 组件  state  到 UI 组件的 props 的映射 
// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，
// 重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
const mapStateToProps = (state) => {   // state ==> store.getState() 
    console.log(state);
    return {
       count1:state.count+100,
       ...state     
    }
}

// mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射
const mapDispatchToProps = (dispatch)=>{   // store.dispatch 
    return {
        add:(payload)=>{
            dispatch({
                type:"ADD",
                payload
            })
        },
        desc:()=>dispatch(increment(50)),
        changeCity:city=>dispatch(changeCity(city))
    }
}

export default connect(
    // params
    mapStateToProps,
    mapDispatchToProps
)(ReactReduxDemoUI) 