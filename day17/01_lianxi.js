var express=require('express');
var app=express();
app.listen(4000);
app.set('view engine','ejs');
app.get('/',function(req,res){
  res.render('login');
  res.end();
});
app.get('/tijiao',function(req,res){
  var query=req.query;
  console.log(query);
  if(query.username=='zhangsan'&&query.password==123){
    res.cookie('username',query.username);
    res.send("登录成功");
  }else{
    res.send("登录失败");
  }
});