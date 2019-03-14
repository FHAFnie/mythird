var express = require("express");
var router = express.Router();

var {conn} = require("./utils/getDb")
var {setError} = require("./utils");
var {series,waterfall}  = require("async");
var {ObjectID} = require("mongodb");

router.get("/",(req,res)=>{
    res.json({
        msg:"这是 react-project 的 接口地址",
        type:200
    })
})

router.get("/allComments",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("comments").find({},{}).sort({_id:1}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                type:200,
                msg:"请求comment-success",
                result,
            })
        })
    })
})

router.get("/addComment",(req,res)=>{
    var query = req.query || {};
    console.log(query);
    conn((err,db)=>{
        setError(err,res,db);
        var comments = db.collection("comments");
        series([
            (cb)=>{
                comments.insert(query,(err,result)=>{
                    if(err){
                        cb(err,null);
                    }else{
                        cb(null,result);
                    }
                }) 
            },
            (cb)=>{
                comments.find({},{}).sort({_id:1}).toArray((err,result)=>{
                    if(err){
                        cb(err,null);
                    }else{
                        cb(null,result);
                    }
                })
            }
        ],function(err,result){
            setError(err,res,db);
            res.json({
                type:200,
                msg:"添加 comment-success",
                result:result[1],
            })
        })
    })
})


router.get("/delComment",(req,res)=>{
    var _id = req.query._id || "";
    conn((err,db)=>{
        setError(err,res,db);
        var comments = db.collection("comments");
        comments.remove({
            _id:ObjectID(_id),
         },(err,result)=>{
            setError(err,res,db);
            res.json({
                type:200,
                msg:"删除 comment-success",
                result:result
            })
         })
    })
})


router.get("/addCarList",(req,res)=>{
    var query = req.query || {};
    
    var goods = query.goods;     // query 得到字符串  
    goods = JSON.parse(goods);  // 转对象   
    var mobile = query.mobile;
    var count = query.count * 1 ;    
    var goodsId = goods._id;    // _id 
    
     
    console.log(goodsId);
    // 查询 goodsId 是否 存在  
    // 自增长 的序号  
    // goodsId  
    // 查询所有的数据  

    conn((err,db)=>{
        setError(err,res,db);
        var shoppingcar = db.collection("shoppingcar");
        waterfall([
            (cb)=>{
                shoppingcar.findOne({goodsId,mobile},{},(err,result)=>{
                    if(err){
                        cb(err,null)
                    }else{
                        console.log("xxxxxxxxxxx");
                        console.log(result);
                        if(result){
                            cb(null,true);  // 数据存在
                        }else{
                            cb(null,false);  // 默认直接插入 
                        }
                    }
                })
            },
            (args,cb)=>{
                if(!args){
                    // insert
                    // let data = Object.assign({mobile,...goods,count})
                    let data = {mobile,goodsId:goods._id,name:goods.name,price:goods.price,discount:goods.discount,img:goods.img,type:goods.type,count};
                    shoppingcar.insert(data,(err,result)=>{
                        if(err){
                            cb(err,null);
                        }else{
                            cb(null,result);
                        }
                    })
                }else{
                    // update
                    shoppingcar.update({goodsId,mobile},{
                        $inc:{   // 在原来的基础 + count 
                           count:count
                        }
                    },(err,result)=>{
                        if(err){
                            cb(err,null)
                        }else{
                            cb(null,result);
                        }
                    })
                }
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json({
                msg:"插入购物车 -success",
                type:200,
                result
            })
        })
    })
})


router.get("/getCarList",(req,res)=>{
    var mobile = req.query.mobile;  
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("shoppingcar").find({mobile},{}).sort({_id:1}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                type:200,
                msg:"请求购物车 -success",
                result,
            })
        })
    })
})


router.get("/setCarListCount",(req,res)=>{
    var mobile = req.query.mobile; 
    var goodsId  = req.query.goodsId;
    var count = req.query.count *  1;

    conn((err,db)=>{
        setError(err,res,db);
        
        db.collection("shoppingcar").update(
            {mobile,goodsId},
            {
                $set:{
                    count
                }
            },
            (err,result)=>{
                setError(err,res,db);
                res.json({
                    type:200,
                    msg:"修改数量成功!",
                    result
                })
            }
        )
    })
})

router.get("/delCarList",(req,res)=>{
    var list = JSON.parse(req.query.list);
    
    list = list.map((item)=>{
        return ObjectID(item);
    })
    console.log(list);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("shoppingcar").remove(    
            {
                // mobile:req.query.mobile, 
                _id:{
                    $in:list
                }
            },
            (err,result)=>{
                setError(err,res,db);
                res.json({
                    type:200,
                    msg:"删除成功",
                    result
                });
            }
        )
    })
})

router.get("/delCarListById",(req,res)=>{
    var _id = req.query._id
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("shoppingcar").remove(    
            {
               _id:ObjectID(_id)
            },
            (err,result)=>{
                setError(err,res,db);
                res.json({
                    type:200,
                    msg:"删除成功 - one",
                    result
                });
            }
        )
    })
})

module.exports =  router;