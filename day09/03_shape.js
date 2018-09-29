var http=require("http");
var fs=require("fs");
var server=http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return;
  }else if(req.url=="/circle"){
    fs.readFile("./circle.html",function(err,data){
    if(err){
      console.log(err);
    }else{
      res.end(data);
    }
    });
  }else if(req.url=="/square"){
    fs.readFile("./square.html",function(err,data){
      if(err){
        console.log(err);
        return;
      }else{
        res.end(data);
      }
      });
  }else{
    res.end("地址错误");
  }
});
server.listen(4000,"localhost");