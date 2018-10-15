var express=require('express');
var session=require('express-session');
var app=express();
app.listen(4000);
app.set('view engine','ejs');
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true
}));
app.get('/',function(req,res){
  if(req.session.username){
    res.send("欢迎你"+'<a href="/logout">退出登录</a>');
  }else{
    res.render('login');
  }
});
app.get('/login',function(req,res){
  if(req.query.username=='za'&&req.query.password=='aa'){
    req.session.username=req.query.username;
    req.session.password=req.query.password;
    res.send("欢迎你"+req.query.username+'<a href="/logout">退出登录</a>');
    res.end();
  }else{
    res.send("用户名或密码错误");
  }
});
//退出登录/logout请求
app.get('/logout',function(req,res){
  //删除session
  req.session.destroy(function(err){
    if(err){
      res.send("退出失败");
    }else{
      res.send("退出登录成功");
    }
  })
});