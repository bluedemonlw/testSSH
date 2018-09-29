var http=require("http");
var fs=require("fs");
var url=require("url");
var server=http.createServer(function(req,res){
  if(req.url=="./favicon.ico"){
    return;
  }
  var pathname=url.parse(req.url).pathname;
  if(pathname=="/"){
    pathname="/index.html";
  }
  // 根据pathname读取project文件夹下的内容
  fs.readFile("./project"+pathname,function(err,data){
    if(err){
      console.log(err);
      return;
    }
    res.end(data);
  })
});
server.listen(4000,"localhost");