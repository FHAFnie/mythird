

var express = require("express");

var router = express.Router();

var {setSession} = require("../utils/session");

var {conn} = require("../utils/getDb")

var {setError,dateFormat} = require("../utils");  // index.js 特指 
var {waterfall,series} = require("async")

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
                db.collection("movie").findOne({id:mid},{},(err,result)=>{
                    if(err){
                        callback(err,null)
                    }else{
                        callback(null,uid,result.title)
                    }
                })
            },
            (uid,mTitle,callback)=>{
                // var data = {uid,mid,username,time:new Date(),...{body}}
                // var data = {uid,mid,username,time:new Date(), body   }

                var data = {uid,mTitle,mid,username,time:new Date(),...body};
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


    // 分页  
    // var mid = req.session.mid;
    // var username = req.session.username;

    var mid = req.query.mid;
    var username = req.query.username;

    var queryObj = {}   
    if(username){
        queryObj['username']=username
    }
    if(mid){
        queryObj['mid'] = mid;
    }



    setSession(req,res,()=>{
       
        var count = 0;   // 总条数
        var totalPage = 0;  // 总页数
        var pageSize = 10;  // 每页显示 10条
        var pageNo =  parseInt(req.query.pageNo) || 0  ;   // 当前页码 


        const findData = (db,callback)=>{
            db.collection("comments").find(queryObj,{}).sort({_id:-1}).toArray((err,result)=>{
                result = result.map((item)=>{
                    item.time = dateFormat(item.time);
                    return item;
                })
                callback(err,result)
            })
        }

        const findComments = (db,callback)=>{
            var comments = db.collection("comments");
            series([
                (callback)=>{
                    // 查出总条数 计算出总页数  
                    comments.find(queryObj,{}).toArray((err,result)=>{
                        if(err){
                            callback(err,null);
                        }else{
                            count = result.length;
                            if(count>0){
                                totalPage = Math.ceil(count/pageSize);
                                pageNo = pageNo <=1 ? 1 :pageNo;
                                pageNo = pageNo >=totalPage ?totalPage:pageNo
                                callback(null,true);
                            }else{
                                callback(null,false);
                            }
                        }
                    })
                },
                (callback)=>{
                    comments.find(queryObj,{}).sort({_id:-1}).skip((pageNo-1)*pageSize).limit(pageSize).toArray((err,result)=>{
                        if(err){
                            callback(err,null)
                        }else{
                            result = result.map((item)=>{
                                item.time = dateFormat(item.time);
                                return item;
                            })
                            callback(null,result)
                        }
                    })
                }
            ],(err,result)=>{
                callback(err,result);
            })
        }

        conn((err,db)=>{
            setError(err,res,db);
            findComments(db,(err,result)=>{
                setError(err,res,db);
                console.log(result)
                res.render("mlist",{
                    result:result[1],
                    noData:result[0],
                    count,
                    totalPage,
                    pageNo,
                    mid:req.session.mid,
                    username:req.session.username
                });
                db.close();
            })

        })
    })
})

module.exports = router;