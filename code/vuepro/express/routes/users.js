var express = require('express');
var router = express.Router();
var {conn}=require("../utils/getDb");
var {setError}=require("../utils/setErr");
var {dateFormat}=require("../utils/dateFormat");
var {waterfall,series}=require("async");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//登录
router.post("/login",(req,res,next)=>{
  var body=req.body;
  console.log(1111);
  console.log(body);
  conn((err,db)=>{
    var user=db.collection("user");
    user.find(body,{}).toArray((err,result)=>{
      setError(err,res,db);
      console.log(result);
      if(result.length>0){//如果存在
        res.json({code:200,msg:"登录成功"});
      }else{
        res.json({code:1,msg:"登录失败"});
      }
    })
  })
})
//注册
router.post("/register",(req,res,next)=>{
  console.log(2222);
  console.log(req.body);
  var body=req.body;
  var username=body.username;
  conn((err,db)=>{
    setError(err,res,db);
    var user=db.collection("user");
    waterfall([
      (callback)=>{
        user.findOne({username},{},(err,result)=>{
          setError(err,res,db);
          if(result){//如果有，说明用户名已经存在
            callback(null,false);
          }else{
            callback(null,true);
          }
        })
      },
      (arg,callback)=>{
        if(arg){//没有注册,可以注册
          user.insert(body,{},(err,result)=>{
            setError(err,res,db);
            callback({code:200,msg:"注册成功"});
          })
        }else{//用户名已经存在
          callback({code:1,msg:"用户名已存在"})
        }
      }
    ],(err,result)=>{
      console.log(result);
      res.json(result);
    })
  })
})
module.exports = router;
