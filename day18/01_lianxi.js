var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
app.listen(4000);
app.set('view engine','ejs');
app.use(cookieParser());
app.get('/',function(req,res){
  // var cookies=req.cookies;
  if(req.cookies.username==undefined){
    res.render('login');
  }else{
    res.send("欢迎你,登录成功");
  }
});
app.get('/login',function(req,res){
  if(req.query.username=='zs'&&req.query.password=='aa'){
    res.cookie('username',"zs");
    res.cookie('password','aa');
    res.send("登录成功");
  }else{
    res.send("用户名或密码错误");
  }
});