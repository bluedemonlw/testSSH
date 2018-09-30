var express=require("express");
var app=express();
// 监听端口
app.listen(4000);
// 设置视图模板引擎
// 默认引擎是jade,但jade语法不习惯
app.set("view engine","ejs");
// 展示03.ejs视图模板的内容
app.get("/show",function(req,res){
  // 模拟数据
  var data={msg:"来自服务器的信息"};
  // 将数据发送给视图
  res.render("03",data);
});
// 处理具体的请求
app.get("/",function(req,res){
  res.end("message from app");
});