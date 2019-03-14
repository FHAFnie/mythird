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

var mysql = require("mysql");



var {waterfall} = require("async");
var {getconn} = require("./mysqnbin");
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
            
            if(postBody.username&&postBody.password){
                getconn((err,conn)=>{
                    if(err) throw err;
                    // 增删改查
                    var selectSql = "select * from user1807 where username = ? and password = ?";
                    var selectParams = [postBody.username,postBody.password] ;
                    conn.query(selectSql,selectParams,(err,result)=>{
                        if(err) throw err;
                        console.log(result);
                        if(result.length>0){
                            console.log({msg:"登录成功!",code:200,result:"login-sueecss"})
                        }else{
                            console.log({msg:"登录失败!",code:300,result:"用户名或者密码错误!"})
                        }
                        conn.end();
                        readHtmlPost('./views/login.html',res,postBody);
                    })
                })
               
            }else{
                readHtml('./views/login.html',res,postBody);
            }
            
        });


        // readHtml("./views/login.html",res);
    },
    register(req,res){
        
        var postData = "";
        req.on("data",(d)=>{
            postData+=d;
        })

        req.on("end",()=>{
            postData = querystring.parse(postData);
            console.log(postData);
            if(postData.username&&postData.password){
                // 创建链接  这里才是真正的链接
                var conn = mysql.createConnection({
                    host:"localhost",
                    port:3306,
                    user:'root',
                    password:'root',
                    database:"wh1807"
                })
                // 访问数据库 
                conn.connect((err)=>{
                    if(err) throw err;
                    console.log("数据库链接成功");
                })

                waterfall([
                    // 先判断是否已经注册
                    (callback)=>{
                        var selectSql = "select * from user1807 where username = ?";
                        conn.query(selectSql,postData.username,(err,result)=>{
                            if(err) throw err;
                            console.log(result);
                            if(result.length>0){
                                // 已经注册
                                callback(null,true);
                            }else{
                                // 没有注册
                                callback(null,false);
                            }
                        })
                    },
                    (arg,callback)=>{
                        console.log(arg);
                        if(!arg){
                            // 插入数据
                            var insertSql = "insert into user1807 (username,nickname,password,enterTime) values (?,?,?,?)";
                            var insertParams = [postData.username,postData.nickname,postData.password,'2018-11-30'];
                            conn.query(insertSql,insertParams,(err,result)=>{
                                if(err){
                                    callback(err,null)
                                }else{
                                    callback(null,{msg:"注册成功!",code:200,result:"success-register"})
                                }
                            })
                        }else{
                            callback(null,{msg:"注册失败!",code:200,result:"用户名已经存在!"})
                        }
                    }

                ],(err,result)=>{
                    if(err) throw err;
                    console.log(result);
                    conn.end(()=>{
                        console.log("mysql 数据库关闭")
                    });
                })

                readHtml("./views/register.html",res);
            }else{
                readHtml("./views/register.html",res);
            }
        })

       
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