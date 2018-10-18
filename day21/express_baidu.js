var app=require('express')();
var request=require('request');
app.listen(4000);
app.get('/',function(req,res){
  // res.send('测试数据');
  var url="https://www.baidu.com";
  request(url,function(err,response,body){
    res.send(body);
  });
});