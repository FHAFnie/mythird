var express = require('express');  
var router = express.Router();   //  fn => {set,use,next,router:fn}

/* GET home page. */
// get get 请求
// req 请求信息 参数
// res 响应 返回数据
// next 下一个中间件 可以省略

router.get('/', function(req, res, next) {
  res.render('./index.ejs', { 
    title: 'Express',
    msg:'wh1807',
    word:"1807 daydayup",
    names:'leson-leson',
    tag:"<h3>hello 努力的你们 1807</h3>",
    feel:"happy every day",
    flag:true,
    username:"zuozuomu",
    arr:['小露纯','小红英',"大雷雷",'胖左左']
    });  //相对于 app.js
});

router.get("/login",(req,res)=>{
    res.render('login',{title:"do not sleep!!!"})
})

router.get("/register",(req,res)=>{
    res.render("register",{title:"zuozuomu"})
})


module.exports = router;
