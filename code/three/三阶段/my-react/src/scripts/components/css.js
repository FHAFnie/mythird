

// react 组件书写样式

// 1. 基于class  但是 react 必须 className 代替class
// 2. 基于内联样式 style  style = {obj}   遵循 驼峰命名
// style = {backgroundColor:"red",fontSize:20}
// lineHeight:'20px'    必须带单位

import React , {Component} from "react"
import ImgUrl from "../../assets/imgs/4.jpg";

let obj = "b";
const myCss = {
    spanOne:{
        color:"blue",
        fontSize:200
    }
}
export default class CssDemo extends Component{
    render(){
        return (
            <div>
                <h2 style={ {color:'red',fontSize:100,lineHeight:'50px'} }> react  书写样式 </h2>
                <img className={"imgs "+obj} width='300' height='300' src={ImgUrl} alt=""/>
                <div>
                    <span style={myCss.spanOne}>  努力 才有  运气 </span>
                </div>
            </div>
        )
    }
}
