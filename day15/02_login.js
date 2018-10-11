var express=require('express');
var bdparser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;
var app=express();
app.listen(4000);
app.set('view engine','ejs');
app.use(bdparser.urlencoded({extended:true}));
app.get('/',function(req,res){
  res.render('login');
});
app.post('/login',function(req,res){
  var params=req.body;
  var username=params.username;
  var password=params.password;
  var json={name:username,password:password};
  var url="mongodb://localhost:27017";
  mongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      res.send("连接服务器失败");
      return;
    }
    var coll=client.db("web1807").collection("student");
    coll.find(json).toArray(function(err,docs){
      if(err){
        console.log(err);
        res.send("登录失败");
      }else{
        if(docs.length>0){
          res.send("登录成功");
        }else{
          res.send("登录失败,用户名或密码错误");
        }
      }
      client.close();
    });
  });
});