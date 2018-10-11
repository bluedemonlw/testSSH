var express=require('express');
var bdparser=require('body-parser');
var mongoClient=require('mongodb').MongoClient;
var app=express();
app.listen(4000);
app.set('view engine','ejs');
app.use(bdparser.urlencoded({extended:true}));
app.get('/',function(req,res){
  var url="mongodb://localhost:27017";
  mongoClient.connect(url,function(err,client){
    if(err){
      console.log(err);
      res.send("连接服务器失败");
      return;
    }
    var coll=client.db("web1807").collection("student");
    coll.find({}).toArray(function(err,docs){
      if(err){
        console.log(err);
        res.send("查询失败");
      }else{
        res.render('show',{docs:docs});
      }
      client.close();
    });
  });
});