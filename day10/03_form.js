var http = require('http');
var fs=require("fs");
var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  if(req.url=="/"){
    fs.readFile("./03_form.html",function(err,data){
      if(err){
        console.log(err);
        res.end("加载页面失败");
        return;
      }else{
        res.end(data);
      }
    })
  }
  if(req.url=="/tijiao"&&req.method.toLowerCase()=="post"){
    // 因为nodejs是单线程非I/O阻塞,追求效率,数据是慢慢上传
    // 产生两种状态:正在接收过程中,接收完成
    // data:正在接收的数据的状态
    // chunk:每次接收到的部分数据
    // 提前声明变量用于保存每次接收到的数据
    var allData="";
    req.addListener('data',function(chunk){
      // 拼接每次接收到的数据
      allData+=chunk;
    });
    // end:接收完成的状态,当数据全部接收完毕,进入该状态
    req.addListener('end',function(){
      // 进入接收完成状态,说明数据已经接收成功
      console.log(allData);
      res.end();//返回响应
    });
  }
});
server.listen(4000, 'localhost');