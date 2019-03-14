

var express = require("express");

var router = express.Router();

var {setSession} = require("../utils/session");

var {conn} = require("../utils/getDb")

var {setError} = require("../utils");  // index.js 特指
var {waterfall} = require("async")

router.get("/",(req,res)=>{
    res.send("这是  我的 评论模块 ")
})


router.get('/index',(req,res)=>{
    var mid = req.query.mid;
    console.log(mid);

    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("movie").findOne({id:mid},{},(err,result)=>{
                setError(err,res,db);
                console.log(result)
                res.render("comment",{result});
            })
        })
    })
})

router.post("/submit",(req,res)=>{
    var body = req.body;
    var mid = req.query.mid;
    var username = req.session.username;
    console.log(body);
    console.log(req.session)

    var insertData = (db,callback)=>{
        var ids = db.collection("ids");
        var comments = db.collection("comments");
        waterfall([
            // 操作ids
            (callback)=>{

                ids.findAndModify(
                    {name:'comments'},   // query
                    [['_id','desc']],   // 降序 sort
                    {$inc:{uid:1}},   // uid+ 1
                    (err,result)=>{
                        if(err){
                            callback(err,null)
                        }else{
                            console.log(result);
                            callback(null,result.value.uid)
                        }
                    }
                )
            },
            (uid,callback)=>{
                // var data = {uid,mid,username,time:new Date(),...{body}}
                // var data = {uid,mid,username,time:new Date(), body   }
                var data = {uid,mid,username,time:new Date(),...body};
                // var data = {uid,mid,username,time:new Date(),title:body.title,content:body.content}
                comments.insert(data,(err,result)=>{
                    if(err){
                        callback(err,null)
                    }else{
                        callback(null,result)
                    }
                })
            }
            // 插入 comments
        ],(err,result)=>{
            callback(err,result)
        })
    }

    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            // 数据库操作
            insertData(db,(err,result)=>{
                setError(err,res,db);
                console.log(result);
                // res.send("评论提交成功");
                req.session.mid = mid;
                res.redirect("/comment/mlist");
                db.close();
            })
        })
    })
})


router.get("/mlist",(req,res)=>{

    setSession(req,res,()=>{
        res.render("mlist");
    })

})

module.exports = router;
