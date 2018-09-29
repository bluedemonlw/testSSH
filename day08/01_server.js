// 引入http模块
var http=require("http");
// 通过http创建服务器
var server=http.createServer(function(request,response){
  // 编写服务器内容
  // end方法的作用:结束请求,返回响应
  response.end("this is my first nodejs page");
});
// 开启服务,监听端口
server.listen(4000,"localhost");