var http=require("http");
//引入fs模块
var fs=require("fs");
var server=http.createServer(function(request,response){
  /*
  因为NodeJs中无根目录,因此无法用localhost:4000/02_root.html访问内容
  可以使用fs模块实现功能
  */
 //使用fs读取02_root.html里的内容,并将读取到的数据作为响应内容返回给页面
 fs.readFile("./02_root.html",function(err,data){
   if(err){
    //读取文件出错的情况
     console.log(err);
     response.end("read file error!");//返回的信息
   }else{
    //读取文件成功的情况
    console.log(data);
    response.end(data);
   }
 });
});
server.listen(3000,"localhost");