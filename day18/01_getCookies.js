var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
app.listen(4000);
//设置cookie解析方式
app.use(cookieParser());
app.get('/',function(req,res){
  res.send("这是首页");
});
//设置cookie
app.get('/setCookie',function(req,res){
  //设置2个cookie,username&password
  res.cookie('username','za');
  res.cookie('password','aaa');
  res.send("设置成功");
});
//获取cookie
app.get('/getCookie',function(req,res){
  console.log(req.cookies);
  res.send("获取成功");
});