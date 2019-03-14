

var mysql = require("mysql");

module.exports = {
    getconn(callback){
        // 创建链接  这里才是真正的链接
        var conn = mysql.createConnection({
            host:"localhost",
            port:3306,
            user:'root',
            password:'root',
            database:"wh1807"
        });

        conn.connect((err)=>{
            
            if(err){
                callback(err,null)
                if(err) throw err;
            }else{
                callback(null,conn);
            }
            console.log("数据库链接成功");
        })
    }
}