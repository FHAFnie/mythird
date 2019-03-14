

//  服务端socket 

var express = require("express");

var app = express();  // app 集成 express 大对象  app.use app.set  app>=Router

var server = require("http").Server(app);

var hostname = "0.0.0.0";

var port = 3000;

// app >= Router()
app.get("/wh1807",(req,res)=>{
    res.send("<h2>wuhan1807 daydayup 好好写NODE项目</h2>")
})


app.get("/index",(req,res)=>{
    res.json({
        username:"zuozuomu",
        word:req.query.word,
        age:28,
    })
})

// app.get
// app.set
// app.use
// app.all
// app.post

var fs = require("fs");
app.get("/gethtml",(req,res)=>{
    fs.readFile("./socketIo.html","utf-8",(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

// 设置静态文件 
app.use("/",express.static(__dirname+"/"));


var io = require("socket.io").listen(server);  // io socket 绑定到 app 上 监听端口3000  

// server  socket
// 1. 监听 client 的 连接上线
// 2. 监听 clinet  发来的消息
// 3. 监听 clinet 的关闭 
// 4. 监听 clinet 的 error  

// node 事件机制  emit on 
var querystring = require("querystring");

var count = 0;
var usersMap = {};

// 1. 监听 client 的 连接上线
io.on("connection",(socket)=>{
    console.log("xxx 上线了....");
    console.log(querystring.stringify(socket));

    socket.on("login",(nickname)=>{
        console.log(nickname);
        socket.name = nickname;
        usersMap[socket.name] = socket;
        count++;
        socket.emit("loginSuccess"); // 只能发送给自己  
        io.sockets.emit("setOnlineUserCount",count)  // 发送给所有在线人数 

        io.sockets.emit("system",nickname)
    })


    socket.on("sendMsg",msg=>{
        console.log(msg);
        io.sockets.emit("showMsg",msg,socket.name)
    });


    // 3. 监听 clinet 的关闭 
    socket.on("disconnect",()=>{
        console.log("客户端下线了...");
        count--;
        io.sockets.emit("setOnlineUserCount",count)  // 发送给所有在线人数
        socket.broadcast.emit("closed",socket.name,'886 我下线了...'); // 发送给 除了自己  的在线人数  
    })


    
})

server.listen(port,hostname,()=>{
    console.log(`socketIo server is running at http://${hostname}:${port}`)
})
