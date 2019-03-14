

// 服务端 socket 
// 监听 客户端 链接  
// 监听 客户端发来的消息
// 监听 客户端 关闭
// 监听 error 

var ws = require("ws");
console.log(ws);

var WebSocketServer = ws.Server;
var port = 3000;
var wss = new WebSocketServer({port});  // 服务socket 端口号3000

console.log("服务端 socket 已经创建 成功  监听 3000 端口 ")

var clientUser = {};
var count = 0;
var info = "武汉1807____";

var querystring = require("querystring")

// 监听 客户端 链接  
wss.on("connection",(ws)=>{

    console.log(querystring.stringify(ws));
    console.log("客户端上线了...")

    count++;
    ws.name = info + count;
    clientUser[ws.name] = ws;

    //2 监听 客户端发来的消息
    ws.on("message",(msg)=>{
        console.log(msg); 
        // 转发消息给其他的用户 
        broadcast(msg,ws); 
    })

    // 监听 error 
    ws.on("error",(err)=>{
        console.log(err);
    })

    // 监听 客户端 close
    ws.on("close",()=>{
        console.log(`${ws.name} 下线了...`);
        delete clientUser[ws.name]   // 把下线对象删除
        broadcast("我下线了,886...",ws); 
    })


    setTimeout(() => {
       var time = new Date();
       var min = time.getMinutes();
       
       var sec = time.getSeconds();

       broadcast("系统推送信息: 1807 写作业了吗?"+sec,ws);
    }, 1000*10);

})

// {a:b} = obj  obj['a']
// 转发消息  
function broadcast(msg,ws){
    for(var key in clientUser){
        clientUser[key].send(` ${ws.name} 说 : ${msg}`)
    }
}