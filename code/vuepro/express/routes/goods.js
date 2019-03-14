var express = require('express');
var router = express.Router();

var mongodb=require("mongodb");
var {conn}=require("../utils/getDb");
var async=require("async");

var {setError}=require("../utils/setErr");
var {setSession}=require("../utils/setSession");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/getIndexGoods",(req,res,next)=>{
  // console.log(req.query);
  // var limit=req.query.limit*1;
  // var skip=req.query.skip*1;
  conn((err,db)=>{
    setError(err,res,db);
    var goods=db.collection("goods");
    // console.log(goods);
    goods.find({},{}).sort({_id:-1}).toArray((err,data)=>{
      setError(err,res,db);
      res.json({code:200,result:data});
    })
  })
})


//加入购物车
router.get("/addGoodscar",(req,res,next)=>{
  console.log(req.query);
  var query=req.query;
  const username=req.query.username;
  // req.goodscount=req.goodscount*1;
  // console.log(req.query.goodscount);
  const gid=req.query.gid;
  const goodsinfo={
    username:query.username,
    gid:query.gid,
    check:true,
    goodspic:query.goodspic,
    goodscount:query.goodscount,
    goodstitle:query.goodstitle,
    goodsprice:query.goodsprice,
    goodscount:query.num,
  }
  //先查看有没有，如果没有，就添加，有就，增加，没有，就插入
  var num=req.query.num || 1;
  // console.log(query);
  conn((err,db)=>{
    setError(err,res,db);
    var goodscar=db.collection("goodscar");
    async.waterfall([
      (callback)=>{
          goodscar.findOne({username,gid},{},(err,result)=>{
            setError(err,res,db);
            if(result){//商品存在
              console.log(11111);
                callback(null,result);
            }else{
              callback(null,false);
            }
          })
      },
      (arg,callback)=>{
        if(arg){//存在
          var count=arg.goodscount*1+num*1;
          console.log(count)
          goodscar.update(
            {
              username,
              gid
            },
            {
              $set:{
                goodscount:count
              }
            },(err,result)=>{
              setError(err,res,db);
              callback(null,{code:1,msg:"添加成功"});
            })
        }else{
          //不存在，直接添加
          query.goodsnum=query.num;
          goodscar.insert(goodsinfo,{},(err,result)=>{
              setError(err,res,db);
              callback(null,{code:1,msg:"加入成功"});
          })
        }
      },
      (arg1,callback)=>{
        goodscar.find({username},{}).toArray((err,result)=>{
          setError(err,res,db);
          callback(null,result);
        })
      },
    ],(err,result)=>{
      setError(err,res,db);
      res.json(result);
      db.close();
    })
  })
})

//获取用户购物车信息
router.get("/getusergoodscar",(req,res,next)=>{
  console.log(8989898989);
  console.log(req.query);
  const username=req.query.username;
  conn((err,db)=>{
    setError(err,res,db);
    var goodscar=db.collection("goodscar");
    goodscar.find({username},{}).toArray((err,result)=>{
      setError(err,res,db);
      if(result.length>0){//有数据
        console.log(result);
        res.json({code:1,result});
      }else{
        res.json({code:0,msg:"购物车空空如也。。。"})
      }
    })
  })
})

//修改购物车
router.post("/updateData",(req,res,next)=>{
  console.log(888811111)
  console.log(req.body);
  const gid=req.body.gid;
  const check=req.body.check;
  const count=req.body.goodscount;
  const username=req.body.username;
  console.log(22222);
  console.log(username,gid,count,check);
  conn((err,db)=>{
    var goodscar=db.collection("goodscar");
    async.waterfall([
      (callback)=>{
        goodscar.update({
          username,gid
        },
        {
          $set:{
            goodscount:count,
            check,
          }
        },(err,result)=>{
          setError(err,res,db);
          if(result){//成功
            // res.json({code:200,msg:"修改成功"})
            callback(null,true);
          }else{

            callback(null,false);
          }
        })
      },
      (arg,callback)=>{
          if(arg){//修改成功
            goodscar.find({username},{}).toArray((err,data)=>{
              setError(err,res,db);
              callback(null,{code:200,data});
            })
          }else{
            callback(null,{code:1,msg:"修改失败"})
          }
      }
    ],(err,result)=>{
      console.log(111111)
      console.log(result);
      if(result.code!=1){//修改成功
        res.json(result);
      }else{
        res.json({code:200,msg:"修改失败"})
      }
    })
  })
})


//删除购物车数据

router.post("/removeData",(req,res,next)=>{
  console.log(33333);
  console.log(req.body);
  const username=req.body.username;
  conn((err,db)=>{
    var goodscar=db.collection("goodscar");
    async.series([
      (callback)=>{
        //先删除
        goodscar.remove(req.body,(result)=>{
          setError(err,res,db);
          callback(null,true);
        })
      },
      (callback)=>{
          goodscar.find({username},{}).toArray((err,result)=>{
            setError(err,res,db);
            if(result.length>0){//有数据
              callback(null,result);
            }else{
              callback(null,{code:0,msg:"查询失败"})
            }
          })
      }
    ],(err,result)=>{
      console.log(result);
    })
  })
})


//导航切换...放弃
router.post("/changetype",(req,res,next)=>{
  console.log(req.query);
  console.log(6666);
  // console.log(req.query.type);
  const type=req.query.type;
  const arr=[];
  const reg="/"+type+"/";
  arr.push(reg);
  // console.log(type);
  console.log(arr);
  console.log(type);
  conn((err,db)=>{
    setError(err,res,db);
    db.collection("goods").find({"subtitle":{$in:[/男/]}}).toArray((err,result)=>{
        setError(err,res,db);
        console.log(1111);
        // console.log(result);
        res.json(result);
    })
  })
})
module.exports = router;
