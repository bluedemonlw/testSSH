var express=require('express');
var app=express();
app.listen(4000);
//访问/请求,服务器生成cookie发送给浏览器
//浏览器保存cookie
app.get('/',function(req,res){
  //设置cookie
  //cookie第一个参数:属性名,第二个参数:属性值
  res.cookie('username','Jim');
  //可以设置多个cookie,但属性名不能一样
  //如果属性名一样,后面的设置会覆盖之前的值
  res.cookie('age','20');
  res.cookie('sex','male');
  res.send("访问/请求");
});