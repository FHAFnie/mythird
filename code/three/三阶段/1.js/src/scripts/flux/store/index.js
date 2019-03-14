

// Store 保存整个应用的状态 state 

import {EventEmitter} from "events";  

// EventEmitter.prototype = {
//     emit,
//     on,
//     remove,
//     off
// }

// Object.assign 对象合并  ES6 语法  
export const listStore = Object.assign({},EventEmitter.prototype,{

    items:['my-items','my-items','my-items','my-items','my-items'],

    getItems(){
        return this.items;
    },

    count:1807,

    countAdd(payload){
        
        this.count+=payload;
        console.log(this.count);
    },

    emitCountChange(){
        this.emit("count");
    },
    addCountChangeListener(cb){
        this.on("count",cb)
    },

    addMyItems(payload){
        console.log("004  store ---"+payload)
        this.items.push(payload);
    },
    removeMyItems(){
        this.items.pop();  // unshift 前面 插入   
    },

    emitMyItemChange(){
        console.log("005  emit event")
        this.emit('myItemChange');  // 发出事件   
    },

    addMyItemListener(callback){
        this.on('myItemChange',callback)
    },
    removeMyItemListener(callback){
        this.removeListener("myItemChange",callback)
    }

})


// export const listStore = {

//     items:['my-items','my-items','my-items','my-items','my-items'],

//     getItems(){
//         return this.items;
//     },

//     addMyItems(payload){
//         console.log("004  store ---"+payload)
//         this.items.push(payload);
//     }

// }