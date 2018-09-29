var http=require("http");
var server=http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    // 直接返回不处理
    return;
  }
  // console.log(req);
  /*
    可获取请求路径和参数,锚点获取不了
    获取到的值是一个url格式的字符串
  */
  console.log(req.url);
  // 结束请求,不需要向页面发送数据,用于调试
  res.end();
});
server.listen(4000,"localhost");