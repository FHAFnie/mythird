


let http = require("http");
let hostname = "0.0.0.0";
let port = 4000;

var url = require("url");
var route = require("./route");

const server = http.createServer((req,res)=>{

    if(req.url!=="/favicon.ico"){
        console.log(req.url);
        res.writeHead(200,{"Content-Type":'text/html;charset=utf-8'});
        var pathname = url.parse(req.url).pathname.replace(/\//,'')
        console.log(pathname);

        try{
            route[pathname](req,res);
        }catch(err){
            console.log(err+'路由匹配失败');
            route['notFound'](req,res);
        }

        
        // if(pathname=='home'){
        //     // route.pathname
        //     // route['home'](req,res);
        //     // route.home(req,res);
        //     route[pathname](req,res);
        // }else if(pathname=='login'){
        //     route['login'](req,res);
        // }

        // res.write(`<h2> wh1807 daydayup</h2>`);
        // res.end();
    }

}).listen(port,hostname,()=>{
    console.log(` route server is  running at http://${hostname}:${port}`);
})