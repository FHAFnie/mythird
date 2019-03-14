

function setError(err,res,db){
    if(err){
        throw err;
        res.send({code:500,msg:"数据库错误",type:"0"})
        db.close();
    }  
}

exports.setError = setError;


exports.dateFormat = function(date,str){
    var time = new Date(date);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconde = time.getSeconds();
    str = str || "-";
    return `${year}${str}${month}${str}${day} ${hour}:${minutes}:${seconde}`;
}