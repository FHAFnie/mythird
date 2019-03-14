var express = require('express');
var router = express.Router(); // 只想得到express 里面的路由功能 

var url = require("url");

var { conn } = require("../utils/getDb");
var {waterfall} = require("async");



// console.log(conn);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册成功 接收路由参数 
router.post("/zhuce",(req,res)=>{
  console.log(req.body);
  // 数据操作  
  var body = req.body;
  conn((err,db)=>{
    if(err) throw err;
    console.log("数据库链接成功!");
    var user = db.collection("user");
    waterfall([
      // 先判断是否已经被注册  
      (callback)=>{
        user.findOne({username:body.username},{},(err,result)=>{
          if(err){
            callback(err,null);
          }else{
            console.log(result)
            if(result){
              callback(null,true);  // 注册过
            }else{
              callback(null,false);  // 未注册
            }
          }
        })
      },
      (args,callback)=>{
           if(!args){
            // 插入数据 
            body.enterTime = new Date();
            user.insert(body,(err,result)=>{
              if(err){
                callback(err,null)
              }else{
                callback(null,{code:200,msg:"注册成功",type:"1"})
              }
            })
           }else{
            callback(null,{code:200,msg:"用户名已经被注册过,请重新注册",type:"0"})
           }
      }
    ],(err,result)=>{
        if(err) throw err;
        if(result.type=="1"){
          // 注册成功
          // res.send(result.msg) 
          res.send(`<script>alert('恭喜你,注册成功!直接前往登陆!');location.href='/login?username=${body.username}' </script>`)
        }else{
          // 注册失败
          // res.send(result.msg) 
          res.send(`<script>alert('${result.msg}');location.href='/register' </script>`)
        }
    })
  })
  // Can't set headers after they are sent.
  // res.send("注册成功!!!")   
})


// 判断 是否登录成功 
router.post("/login",(req,res)=>{
  var body = req.body;
  console.log(body);

  conn((err,db)=>{
    if(err) throw err;
    console.log('success ...');
    var user = db.collection("user");
    user.find({username:body.username,password:body.password},{}).toArray((err,result)=>{
      if(err) throw err;
      console.log(result);
      if(result.length>0){
        // 登录成功
         res.send("登陆成功!---successful");
      }else{
        //登录失败 
         res.send("用户名或者密码错误!")

      }
    })
  })

  


  // res.send("登陆成功!");
})

























// router.get("/login",(req,res)=>{
//   res.send("这是 express users / login 模块")
// })

// router.get("/demo",(req,res)=>{
//   console.log(req.url);   
//   res.send("这是 demo- demo - demo ")
// })

// router.get("/message",(req,res)=>{
//   // res.writeHead();
//   // res.write();
//   console.log(req.url);
//   console.log(url.parse(req.url,true).query)
//   console.log(req.query);  // 获取 search 参数
//   res.send("express 是基于 node 的二次封装  ")
// })

// router.get("/json/:id",(req,res)=>{
//   console.log(req.params);   //  :id params 
//   res.json({
//     code:200,
//     msg:"登陆成功  "+req.params.id,
//     type:"login-succ"
//   })
// })

// //  post 请求  无法再浏览器直接打开   form  / ajax 
// router.post("/submit",(req,res)=>{
//   res.send("提交成功 post post post ")
// })


// router.all("/all",(req,res)=>{
//   res.send("这是一个 post 或者  get  请求 ");
// })


module.exports = router;
