

function setError(err,res,db){
    if(err){
        throw err;
        res.send({code:500,msg:"数据库错误",type:"0"})
        db.close();
    }  
}

exports.setError = setError;