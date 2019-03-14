
function setSession(req,res,callback){
  var username=req.session.username;


  if(username){//已经登录
    callback();
  }else{
    res.send(`<script>alert("session已过期，请重新登录");location.href='/users/login'</script>`)
  }
}
exports.setSession=setSession;

