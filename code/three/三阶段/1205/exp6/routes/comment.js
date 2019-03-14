

var express = require("express");

var router = express.Router();

var {setSession} = require("../utils/session");

var {conn} = require("../utils/getDb")

var {setError,dateFormat} = require("../utils");  // index.js 特指
var {waterfall,series} = require("async")

var {ObjectID} = require("mongodb")

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
                    if(count<pageSize){
                        comments.find(queryObj,{}).sort({_id:-1}).toArray((err,result)=>{
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
                    }else{
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

// 电影评论详情
router.get("/detail",(req,res)=>{
    var mid = req.query.mid;
    var uid = req.query.uid * 1;
    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            // 先查 评论  mid
            // 再查 电影
            var comments = db.collection("comments");
            var movie = db.collection("movie")
            waterfall([
                (cb)=>{
                    comments.findOne({uid},{},(err,result)=>{
                        if(err){
                            cb(err,null);
                        }else{
                            cb(null,result);
                        }
                    })
                },
                (comment,cb)=>{
                    movie.findOne({id:comment.mid},{},(err,result)=>{
                        if(err){
                            cb(err,null);
                        }else{
                            cb(null,[comment,result]);
                        }
                    })
                }
            ],(err,result)=>{
                setError(err,res,db);
                console.log(result);
                result[0].time = dateFormat(result[0].time);
                res.render("detail",
                    {
                        result:result[1],
                        comment:result[0]
                    }
                );
                db.close();
            })
        })
    })
})

router.get("/mv-detail",(req,res)=>{
    var mid = req.query.mid;
    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            var movie = db.collection("movie");
            var comments = db.collection("comments");
            series([
                cb=>{
                    movie.findOne({id:mid},{},(err,result)=>{
                        if(err){
                            cb(err,null)
                        }else{
                            cb(null,result); // movie
                        }
                    })
                },
                cb=>{
                    comments.find({mid},{}).sort({_id:-1}).toArray((err,result)=>{
                        if(err){
                            cb(err,null)
                        }else{
                            cb(null,result); // comments
                        }
                    })
                }
            ],(err,result)=>{
                setError(err,res,db);
                console.log(result);
                res.render("mv-detail",{
                    movie:result[0],
                    comments:result[1]
                });
            })
        })

    })
})

router.get("/deleteById",(req,res)=>{
    var uid = req.query.uid * 1;
    console.log(uid);
    // ajax 请求 实现局部刷新
    // res.render("head")  error

    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            if(uid==-1){
                db.collection("comments").remove({},(err,result)=>{
                    setError(err,res,db);
                    console.log(result);
                    res.json({code:200,msg:"删除数据成功",type:1});
                    db.close()
                })
            }else{
                db.collection("comments").remove({uid},1,(err,result)=>{
                    setError(err,res,db);
                    console.log(result);
                    res.json({code:200,msg:"删除数据成功",type:1});
                    db.close()
                })
            }

        })
    })
})

router.get("/updateById",(req,res)=>{
    var _id = req.query._id;
    console.log(_id);
    var title =  req.query.title;
    var content = req.query.content

    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("comments").update(
                {
                    _id:ObjectID(_id)
                },
                {
                    $set:{
                        title,
                        content,
                        time:new Date()
                    }
                },
                (err,result)=>{
                    setError(err,res,db);
                    console.log(result)
                    res.json({code:200,msg:"修改数据成功",type:1});
                    db.close();
                }
            )
        })

    })
})


router.get("/update",(req,res)=>{
    var uid = req.query.uid *1;

    var findData = (db,cb)=>{
        waterfall([
            callback=>{
                db.collection("comments").findOne({uid},{},(err,result)=>{
                    if(err){
                        callback(err,null);
                    }else{
                        callback(null,result);
                    }
                })
            },
            (comment,callback)=>{
                db.collection("movie").findOne({id:comment.mid},{},(err,result)=>{
                    if(err){
                        callback(err,null);
                    }else{
                        callback(null,[comment,result]);
                    }
                })
            }
        ],(err,result)=>{
            cb(err,result);
        })
    }

    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            findData(db,(err,result)=>{
                setError(err,res,db);
                res.render("update",{
                    movie:result[1],
                    comment:result[0]
                });
                db.close();
            })
        })

    })
})

router.post("/updatesubmit",(req,res)=>{
    var body = req.body;
    console.log(body);
    var mid = req.query.mid
    console.log(mid);
    setSession(req,res,()=>{
        conn((err,db)=>{
            setError(err,res,db);
            db.collection("comments").update(
                {
                    uid:req.query.uid*1
                },
                {
                    $set:{
                        title:body.title,
                        content:body.content,
                        time:new Date()
                    }
                },
                (err,result)=>{
                    setError(err,res,db);
                    req.session.mid = mid;
                    res.redirect("/comment/mlist")
                }
            )
        })
    })
})

module.exports = router;
