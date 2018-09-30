var express=require("express");
var app=express();
app.listen(4000);
app.set("view engine","ejs");
app.get("/",function(req,res){
  res.send("这是首页");
});
app.get("/info",function(req,res){
  var data={stus:['Jack','rose','mike','jerry']};
  res.render("04",data);
});