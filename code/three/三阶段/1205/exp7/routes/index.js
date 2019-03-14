var express = require('express');  
var router = express.Router();   //  fn => {set,use,next,router:fn}

var {conn} = require("../utils/getDb");

/* GET home page. */
// get get 请求
// req 请求信息 参数
// res 响应 返回数据
// next 下一个中间件 可以省略

var {keys,aesDecrypt} = require("../utils/aes")
router.get('/', function(req, res, next) {
    console.log(req.session)
    var username = req.session.username;
  res.render('./index.ejs', { 
    title: 'Express',
    msg:'wh1807',
    word:"1807 daydayup",
    names:'leson-leson',
    tag:"<h3>hello 努力的你们 1807</h3>",
    feel:"happy every day",
    flag:true,
    username:username,
    arr:['小露纯','小红英',"大雷雷",'胖左左']
    });  //相对于 app.js
});


// 登陆
router.get("/login",(req,res)=>{
    console.log(req.query);

    var username = req.query.username ? aesDecrypt(req.query.username,keys):"";
    res.render('login',{title:"do not sleep!!!",username})
})

// 注册
router.get("/register",(req,res)=>{
    res.render("register",{title:"zuozuomu"})
})

router.get("/logout",(req,res)=>{
    // 1. 
    // req.session.username = "";
    // res.redirect("/");
    // 2  destroy  销毁
    req.session.destroy(()=>{
        res.redirect("/");
    });
})


router.get("/movie",(req,res)=>{

    var query = req.query;

    

    console.log(query);
    var obj = {};
    var field = query.field;
    var type = query.type * 1;

    if(field&&type){
        //  field = year 
        // type = 1 
        // obj.year = 1;
        // obj.field = type;
        obj[field] = type;     // key filed 是变量    obj = {year:1}
    }
    
    var username = req.session.username;

    var findData = (db,callback)=>{
        db.collection("movie").find({},{}).sort(obj).toArray((err,result)=>{
            callback(err,result)
        })
    }

    if(username){
        conn((err,db)=>{
            if(err){
                throw err;
                res.send({code:500,msg:"数据库错误",type:"0"})
                db.close();
            }  // 只是后端 知晓  
            console.log("database - success");
            findData(db,(err,result)=>{
                if(err){
                    throw err;
                    res.send({code:500,msg:"数据库错误",type:"0"})
                    db.close();
                }
                // console.log(result);
                res.render("movie",{result:result});
                db.close();
            })
        })
    }else{
        res.send("<script>alert('session已经过期,请重新登录!');location.href='/login'</script>")
    }
   
})

// router.get("/demo",(req,res)=>{
//     res.render("login");
// })

module.exports = router;
