

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


server.listen(port,hostname,()=>{
    console.log(`socketIo server is running at http://${hostname}:${port}`)
})
