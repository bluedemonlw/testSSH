var http = require('http');
var fs=require("fs");
var ejs=require("ejs");//引入ejs模块
var server = http.createServer(function (req, res) {
  if (req.url == '/favicon.ico') {
    return;
  }
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  fs.readFile("./02_ejs_3.html",function(err,data){
    if(err){
      console.log(err);
      res.end("加载页面出错");
      return;
    }
    // res.end(data);
    // 模拟一个数据(string类型)
    // var info={msg:[1,2,3,4,5]};
    // var info={msg:"来自服务器的信息"};
    // var info={msg:{id:101,name:'Jack'}};
    // 对象数组
    var info={msg:[{id:101,name:'Jack'},{id:102,name:"rose"}]};
    // 将数据填充到模板中
    var html=ejs.render(data.toString(),info);
    res.end(html);
  })
});
server.listen(4000, 'localhost');