var express=require('express');
var bdparser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;
var app=express();
app.listen(4000);
app.set('view engine','ejs');
// 设置请求解析方式 application/x-www-form-urlencoded
app.use(bdparser.urlencoded({extended:true}));
app.get('/',function(req,res){
  res.render('regist');
});
//处理post发送的请求:/regist
app.post('/regist',function(req,res){
  // 获取请求参数
  var params=req.body;
  // console.log(params);
  var username=params.username;
  var password=params.password;
  // 将需要保存进数据库的数据组合成一个新的json对象
  var json={name:username,password:password};
  // 连接数据库,保存数据
  var url="mongodb://localhost:27017";
  mongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      res.send("连接服务器失败");
      return;
    }
    var coll=client.db("web1807").collection("student");
    coll.insertOne(json,function(err,result){
      if(err){
        console.log(err);
        res.send("注册失败");
      }else{
        res.send("注册成功");
      }
      client.close();
    });
  });
});