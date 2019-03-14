

//  Node 链接mongodb 数据库 

var mongodb = require("mongodb");
// console.log(mongodb);

var MongoClient = mongodb.MongoClient;

var CONN_DB_STR = "mongodb://localhost:27017/wh1807";

MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    console.log("数据库链接成功...");
    console.log(db);

    var movie = db.collection("movie");
    movie.find({},{title:1,year:1,genres:1,_id:0}).toArray((err,result)=>{
        if(err) throw err;
        console.log("查询成功++++++++++++++++++++++++++++");
        console.log(result);
    });

    // var collections = db.getCollectionNames();  error 
    // console.log(collections);

    db.collection("user").insert({username:"helloNode",password:"daydayup"},(err,result)=>{
        if(err) throw err;
        console.log("insert ++++++++++++++++++++++++++++");
        console.log(result);
    })

    db.collection("user").updateMany(
        {username:"helloNode"},
        {
            $set:{age:40,password:"666666"}
        },
        (err,result)=>{
        if(err) throw err;
        console.log("update ++++++++++++++++++++++++++++");
        console.log(result);
        }
    )

    db.collection('user').deleteOne({username:"helloNode"},(err,result)=>{
        if(err) throw err;
        console.log("deleteOne ++++++++++++++++++++++++++++");
        console.log(result);
    });


    
    db.close(); // 关闭数据库 
})