var express=require('express');
var db=require('./db/db.js');
var sd=require('silly-datetime');
var app=express();
app.listen(4000);
app.set('view engine','ejs');
app.get('/',function(req,res){
  db.find('message',function(err,docs){
    if(err){
      console.log(err);
    }else{
      console.log(docs);
      res.render('index',{docs:docs});
    }
  });
});
app.get('/tijiao',function(req,res){
  var time=sd.format(new Date(),"YYYY-MM-DD hh:mm:ss");
  req.query.time=time;
  db.add('message',req.query,function(err,result){
    console.log(err);
    console.log(result);
  });
  res.redirect('/');
  res.end();
});