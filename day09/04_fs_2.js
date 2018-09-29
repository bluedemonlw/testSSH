var fs=require("fs");
fs.mkdir("./a",function(err){
  if(err){
    console.log("创建失败");
    console.log(err);
  }else{
    console.log("创建成功");
  }
});