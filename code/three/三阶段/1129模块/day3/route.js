// 路由文件 
// route 路由  
// 路由池  里面包含数据或者html 模板  只有通过对于的 匹配 和 认证 你才能获取 路由池里面的数据  
// module.exports = {
//     home:function(req,res){
//         console.log("home")
//         res.write(`<h2>home - home - home </h2>`);
//         res.end()
//     },
//     login(req,res){
//         res.write(`<h2>login - login - login </h2>`);
//         res.end()
//     },
//     register(req,res){
//         res.write(`<h2>register - register - register </h2>`);
//         res.end()
//     },
//     shopcar(){

//     },
//     notFound(req,res){
//         res.write(`<h2>Not Found 404 -  404 - 404 </h2>`);
//         res.end()
//     }
// }

var {readHtml,readImg,readHtmlPost} = require("./files");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
module.exports = {
    home:function(req,res){
        readHtml("./views/home.html",res);   //路径相对于 server2.js  
    },
    login(req,res){

        //  1. get 请求  获取路由参数  
        // console.log(req.url);
        // var query = url.parse(req.url,true).query;
        // console.log(query);
        // next ==> 获取参数  访问数据库  查询  是否匹配 返回登陆成功  否则  登陆失败 


        //  2. post请求  
        console.log(req.url);
        var postBody = "";  // 获取数据主体

        // 监听数据发送 
        req.on("data",d=>{
            postBody+=d;
        });
        req.on("end",()=>{
            postBody = querystring.parse(postBody)
            console.log(postBody);
            readHtmlPost('./views/login.html',res,postBody);
        });


        // readHtml("./views/login.html",res);
    },
    register(req,res){
        readHtml("./views/register.html",res);
    },
    notFound(req,res){
        res.writeHead(200,{"Content-Type":'text/html;charset=utf-8'});
        res.write(`<h2>Not Found 404 -  404 - 404 </h2>`);
        res.end()
    },
    imgs(req,res){
        var filename = url.parse(req.url).pathname.replace(/\/imgs\//,'');
        console.log(filename);
        fs.readdir("./imgs",'binary',(err,files)=>{
            if(err) throw err;
            files.forEach((item,index)=>{
                if(item==filename){
                    readImg(`./imgs/${item}`,res);
                }
            })
        })
        
    }
}