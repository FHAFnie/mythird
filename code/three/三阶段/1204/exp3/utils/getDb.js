

// 获取 db 对象   才能操作数据库里面的 集合  collections 

var {MongoClient} = require("mongodb");  // mongodb 客户端对象 

var CONN_DB_STR = "mongodb://localhost:27017/wh1807";

module.exports = {
    conn:function(callback){
        MongoClient.connect(CONN_DB_STR,(err,db)=>{
            if(err){
                callback(err,null);
                // res.send({code:500,msg:"数据库错误",type:"database-error"})
            }else{
                callback(null,db);
            }
            
        })
    }
}