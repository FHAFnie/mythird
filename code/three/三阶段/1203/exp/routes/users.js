var express = require('express');
var router = express.Router(); // 只想得到express 里面的路由功能 

var url = require("url");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login",(req,res)=>{
  res.send("这是 express users / login 模块")
})

router.get("/demo",(req,res)=>{
  console.log(req.url);   
  res.send("这是 demo- demo - demo ")
})

router.get("/message",(req,res)=>{
  // res.writeHead();
  // res.write();
  console.log(req.url);
  console.log(url.parse(req.url,true).query)
  console.log(req.query);  // 获取 search 参数
  res.send("express 是基于 node 的二次封装  ")
})

router.get("/json/:id",(req,res)=>{
  console.log(req.params);   //  :id params 
  res.json({
    code:200,
    msg:"登陆成功  "+req.params.id,
    type:"login-succ"
  })
})

//  post 请求  无法再浏览器直接打开   form  / ajax 
router.post("/submit",(req,res)=>{
  res.send("提交成功 post post post ")
})


router.all("/all",(req,res)=>{
  res.send("这是一个 post 或者  get  请求 ");
})


module.exports = router;
