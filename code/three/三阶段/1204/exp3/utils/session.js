
function setSession(req,res,callback){
    console.log(req.session);
    var username = req.session.username;

    if(username){
        callback();
    }else{
        res.send("<script>alert('session已经过期,请重新登录!');location.href='/login'</script>")
    }
}


exports.setSession = setSession;
