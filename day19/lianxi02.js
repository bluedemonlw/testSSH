var express=require('express');
var app=express();
var session=require('express-session');
app.listen(4000);
//配置session
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:60000}
}));
//处理/search请求,每一次都将用户搜索的结果全部显示在页面上
app.get('/search',function(req,res){
  //获取搜索的参数
  var name=req.query.name;
  //获取session中曾经保存的history
  var history=req.session.history||[];
  //判断输入的参数是不是undefined和空字符串
  //如果是,就不操作
  //如果不是,就将其添加到history数组中
  if(!(name==undefined||name.trim()=="")){
    history.push(name);
  }
  //将history保存进session
  req.session.history=history;
  //将历史记录显示在页面上
  res.send(history);
});