

// 每个Action都是一个对象，包含一个actionType属性（说明动作的类型）和一些其他属性（用来传递数据）。

import AppDispather from "../dispatchers";

export const  countDesc = (payload) => {

}


export const addNewItem = (payload)=>{
    console.log("002 actions");
    AppDispather.dispatch({     // AppDispather 派发器  发送action
        actionType:"addNewItem",
        payload
    })  
}


export function removeItem(){
    console.log("002 actions ")
    AppDispather.dispatch({
        actionType:"removeItem",

    })
}

export function countAdd(payload){
    AppDispather.dispatch({
        actionType:"countAdd",
        payload
    })
}