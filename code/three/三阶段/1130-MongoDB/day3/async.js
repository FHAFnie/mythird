
//  同步     所有事件 按照 先后顺序执行 
//  异步     所有事件同时马上执行  参考 ajax 

// 异步流程控制  Async 
// setTimeout setInterval
// promise 

// new Promise((resolve,reject)=>{
//     resolve(
//         new Promise()
//     )
// })

var async = require("async");


// series   串行   串行无关联  事件执行按照  书写的顺序 一个接一个去执行  如果有一个事件error 则终止执行
// parallel   并行   并行无关联  事件执行 都 同时执行  事件之间不会有任何影响和联系 
// waterfall   串行有关联   前一个事件的结果会作用到下一个事件去  
// whist     并行有关联  


// series  串行无关联   2个参数  tasks 事件任务   callback 最终的回调
// 任务task  一种是数组  一种是对象   
// 数组    得到的结果也是数组   谁在前面谁先执行先输出  

// console.time("wh1807")
// async.series([
//     function(callback){
//         setTimeout(()=>{
//             callback(null,"one");
//         },2000)
//     },
//     function(callback){
//         setTimeout(()=>{
//             callback(null,"two");
//         },1000)
//     }
// ],function(err,result){
//     if(err) throw err;
//     console.log(result);
//     console.timeEnd("wh1807")
// })


// 对象   
// 得到的结果也是 对象 
//  执行顺序跟书写顺序有关    输出的结果  也是按照顺序执行的结果  跟执行时间无关 
// console.time("wh1807")
// async.series({
//     one:function(callback){
//         setTimeout(()=>{
//             callback(null,"one");
//         },2000)
//     },
//     two(callback){
//         setTimeout(()=>{
//             callback(null,"two");
//         },1000)
//     }
// },function(err,result){
//     if(err) throw err;
//     console.log(result);
//     console.timeEnd("wh1807")
// })

// parallel  并行无关联
// 数组  返回的结果也是 数组 
// 对象  返回的结果也是 对象  

//  [ ]  所有事件同时执行   执行的总时间取决于最大的运行时间    输出的结果跟执行时间无关 谁书写在前谁先输出 
// console.time("wh1807")
// async.parallel([
//     (callback)=>{
//         setTimeout(()=>{
//             callback(null,"one")
//         },2000)
//     },
//     (callback)=>{
//         setTimeout(()=>{
//             callback(null,"two")
//         },1000)
//     }
// ],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     console.timeEnd("wh1807")
// })

//  {}  结果也是对象    
// 事件的输出的结果  跟顺序无关   先执行完毕先输出   
// 总时间  取决于  最大的执行时间的事件 



// console.time("wh1807")
// async.parallel({
//     one:(callback)=>{
//         setTimeout(()=>{
//             callback(null,"one")
//         },2000)
//     },
//     two:(callback)=>{
//         setTimeout(()=>{
//             callback(null,"two")
//         },1000)
//     }
// },(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     console.timeEnd("wh1807")
// })

// waterfall 串行有关联  
// 上一个事件的结果会传递给下一个事件  
// 最后的回调函数  (err,result)=>{ } 对比的是最后一个事件 传递过来的参数  
async.waterfall([
    function(callback){
        callback(null,"one","two");
    },
    function(arg1,arg2,callback){
        callback(null,arg1,arg2,"three");
    },
    function(arg1,arg2,arg3,callback){
        callback(null,[arg1,arg2,arg3,"four","done"]);
    }
],(err,result)=>{
    if(err) throw err;
    console.log(result);
})

// var count = 0;
// async.whilst(
//     function() { return count < 5; },
//     function(callback) {
//         count++;
//         setTimeout(function() {
//             callback(null, count);
//         }, 1000);
//     },
//     function (err, n) {
//         // 5 seconds have passed, n = 5
//     }
// );
