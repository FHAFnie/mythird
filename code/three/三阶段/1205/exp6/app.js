var createError = require('http-errors');  // http 异常 
var express = require('express'); 
var path = require('path');   // Node 模块 
var cookieParser = require('cookie-parser');  // 处理 cookies  getCookies setCookies 
var logger = require('morgan');  // 打印日志  

var indexRouter = require('./routes/index');    // 路由文件 
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment')
var app = express();   // app 集成 express 所有的方法和功能  {}  app.set app.use app.next app.send 

var session = require("express-session");

// view engine setup

// __dirname 根目录  
app.set('views', path.join(__dirname, 'views'));  // views/error.ejs  ===>  __dirname/error.ejs ===> /error.ejs
app.set('view engine', 'ejs');  // 设置模板引擎 ejs 

app.use(logger('dev'));   // logger 打印日志  
app.use(express.json());  // post 请求  post 参数   form 提交 method="POST" 提交的数据体  req.body   
app.use(express.urlencoded({ extended: false })); // post 参数   ajax  $.post 发送的数据体 
app.use(cookieParser());  // 处理 cookies  
app.use(express.static(path.join(__dirname, 'public')));// 设置静态文件  public == / 


// 注意顺序之分  
app.use(session({
  secret:"test",
  name:"appTest",
  cookie:{maxAge:20*60*1000},
  resave:false,
  saveUninitialized:true
}));

// 设置路由别名  防止路由命名冲突
app.use('/', indexRouter);   // 配置路由  父路由地址 /   /login ==> /login
app.use('/users', usersRouter);// 拼接    /users    /login ==> /users/login
app.use('/comment',commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);  // 100 200 300 301 302 400 403 404 500 503
  res.render('./error.ejs');  // 渲染模板  res.render('error');
});

module.exports = app;
