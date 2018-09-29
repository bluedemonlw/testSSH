var fs=require("fs");
var start=new Date();
// console.log(1);
/*fs.readFile("./day09.txt","utf-8",function(err,data){
  console.log(2);
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});
console.log(3);
var end=new Date();
*/
var result=fs.readFileSync("./day09.txt");
var end=new Date();
console.log("程序一共花了"+(end-start)+"毫秒");
