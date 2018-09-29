var http=require("http");
var fs=require("fs");
var url=require("url");
var server=http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return;
  }
  res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
  // 转换req.url字符串
  var urlObj=url.parse(req.url,true);
  var pathname=urlObj.pathname;//获取请求路径
  var query=urlObj.query;//获取请求参数对象
  if(pathname=="/"){
    fs.readFile("./form.html",function(err,data){
      if(err){
        console.log(err);
        res.end("页面出错");//返回响应
        return;
      }
      res.end(data);
    }) 
  }else if(pathname=="/form"){
    //console.log(req.url);
    //res.end("成功接收到请求数据");
    var username=query.username;
    var password=query.password;
    // 返回响应
    res.end("用户名:"+username+",密码:"+password);
    console.log(username,password);
  }else{
    // 其它情况,不处理并返回
    res.end("请求地址出错");
  }
});
server.listen(4000,"localhost");