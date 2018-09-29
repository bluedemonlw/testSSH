var fs=require("fs");
fs.readdir("./",function(err,files){
  if(err){
    console.log(err);
  }else{
    console.log(files);
  }
})
var result=fs.readdirSync("./");
console.log(result);