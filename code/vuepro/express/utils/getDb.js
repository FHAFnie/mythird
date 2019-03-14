


var mongodb=require("mongodb");

module.exports={
  conn:(callback)=>{
    var mongoClient=mongodb.MongoClient
    var CONN_DB_STR="mongodb://112.74.49.124:27017/vue1807";
    mongoClient.connect(CONN_DB_STR,(err,db)=>{
      if(err) throw err;
      console.log("连接数据库成功");
      callback(err,db);
    })
  }
}




