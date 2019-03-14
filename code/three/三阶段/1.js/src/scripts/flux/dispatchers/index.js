

// Dispatcher 的作用是将 Action 派发到 Store
// 发送action  看作一个路由器，  注册各种actionType 

import {Dispatcher} from "flux";   // 对象 解构 取值 
import { listStore } from "../store";

var AppDispather = new Dispatcher();



// AppDispatcher.register()方法用来登记各种Action的回调函数。
AppDispather.register((action)=>{
    console.log(action);
    switch(action.actionType){

        case "addNewItem":
        console.log("003   Dispatcher");
        listStore.addMyItems(action.payload);  // 通知 store 修改数据 
        listStore.emitMyItemChange();   // 发出信号  
        break;

        case "removeItem":
        console.log("003   Dispatcher");
        listStore.removeMyItems();  
        listStore.emitMyItemChange();   // 发出信号 
        break;

        case "countAdd":
        listStore.countAdd(action.payload);
        listStore.emitCountChange();
        break;


        default:
        return 
        break;
    }
})

export default AppDispather;

