


import React , {Component} from "react"
// 事件命名驼峰命名
// onClick
// onChange
// onInput
// onMouseMove
// onMouseDown
// onMouseUp
// onTouchStart
// onTouchMove
// onTouchEnd
// onKeyPress
// onKeyDown
// onKeyUp

// 绑定事件
// 1. 全局变量 / 外部函数
// 2. 组件内部自定义函数
// 3. 原型链挂载

const action = {
    fnA(e){
        console.log(e);
        var e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation()
        }else{
            e.cancelBubble = false;
        }
        alert("这是 我封装的 全局函数 ");
    },
    fnB(e){
        alert("这也许是一个冒泡事件...")
    }
}

export default class EventDemo extends Component{

    change(e){
        if(e.stopPropagation){
            e.stopPropagation()
        }else{
            e.cancelBubble = false;
        }
        console.log(e.target.value);
    }

    handleClick(){
        // alert("这是 父元素 挂载的事件 ")
    }



    render(){
        return (
            <div onClick={ this.handleClick }>
                <h2 onClick= {action.fnA}  style={{ color :'yellow' ,fontSize:100 } }> react 事件机制 </h2>

                <h2 onClick= { ()=>{ action.fnB() } }  style={{ color :'blue' ,fontSize:100 } }> 事件冒泡 </h2>

                <div>每天都要进步 一点点 </div>

                <p> <input type="text" onChange={this.change }/></p>
            </div>
        )
    }
}


