


//  node 链接 mysql 数据库  

// 增删改查 

var mysql = require("mysql");
console.log(mysql);

//  创建链接对象 
var conn = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:"root",
    password:'root',
    database:"wh1807"
})

// 链接数据库 
conn.connect((err)=>{
    if(err) throw err;
    console.log("数据库链接成功!")
});

var insertSql = "insert into user1807 (username,password) values (?,?)";
var insertParams = ['dazuozuo','daydayup'];
conn.query(insertSql,insertParams,(err,result)=>{
    if(err) throw err;
    console.log("insert  ++++++++++++++++++++++++++++++++");
    // response.write(result); 返回浏览器 
    console.log(result);
})


var selectSql = "select * from user1807 where id > ? ";  // ? 需要的参数  防止SQL注入 
conn.query(selectSql,2,(err,result)=>{
    if(err) throw err;
    console.log("select ++++++++++++++++++++++++++++++++");
    // response.write(result); 返回浏览器 
    console.log(result);
})

var updateSql = "update user1807 set password = ? where username = ? ";
var updateParams = ['wuhan180777777','dazuozuo' ];
conn.query(updateSql,updateParams,(err,result)=>{
    if(err) throw err;
    console.log("update ++++++++++++++++++++++++++++++++");
    // response.write(result); 返回浏览器 
    console.log(result);
});

var deleteSql = "delete from user1807 where username = ?";
conn.query(deleteSql,'dazuozuo',(err,result)=>{
    if(err) throw err;
    console.log("delete ++++++++++++++++++++++++++++++++");
    // response.write(result); 返回浏览器 
    console.log(result);
})




// 关闭数据库
conn.end(()=>{
    console.log("数据库已经关闭了....")
})