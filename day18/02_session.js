var express=require('express');
var session=require('express-session');
var app=express();
app.listen(4000);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.get('/',function(req,res){
  res.send('index');
});
//设置session
app.get('/setSession',function(req,res){
  //session是通过req.session设置
  req.session.username='zs';
  res.end();
});
//获取session
app.get('/getSession',function(req,res){
  //session是通过req来获取
  var username=req.session.username;
  console.log(username);
  res.end();
});