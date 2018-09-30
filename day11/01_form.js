var http = require('http');
var fs=require("fs");
// 引用formidable模块
var fd=require("formidable");
var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  if(req.url=="/"){
    fs.readFile("./01_form.html",function(err,data){
      if(err){
        console.log(err);
        res.end("页面加载失败");
        return;
      }
      res.end(data);
    })
  }else if(req.url=="/tijiao"&&req.method.toUpperCase()=="POST"){
    // post的/tijiao请求
    // 使用formidable模块处理请求
    // 创建表单对象
    var form=new fd.IncomingForm();
    // 解析请求对象
    // fields:解析得到的文本域的参数值
    form.parse(req,function(err,fields,files){
      if(err){
        console.log(err);
        res.end("请求失败");
        return;
      }
      console.log('fields:');
      console.log(fields);
      console.log('files');
      console.log(files);
      res.end("请求成功");
    })
  }else{
    res.end("地址错误");
  }
});
server.listen(4000, 'localhost');