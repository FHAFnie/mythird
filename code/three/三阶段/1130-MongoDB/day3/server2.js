


let http = require("http");
let hostname = "0.0.0.0";
let port = 4000;
var url = require("url");
var route = require("./route");

const server = http.createServer((req,res)=>{
    if(req.url!=="/favicon.ico"){
        var pathname = url.parse(req.url).pathname.replace(/\//,'')
        console.log(pathname);  //     /imgs/1.jpg 
        try{
            if(pathname.indexOf("imgs")!==-1){
                route['imgs'](req,res);
            }else{
                route[pathname](req,res);
            }
        }catch(err){
            console.log(err+'路由匹配失败');
            route['notFound'](req,res);
        }

    }

}).listen(port,hostname,()=>{
    console.log(` route server is  running at http://${hostname}:${port}`);
})