// 获取当前时间
/*var now=new Date();
var year=now.getFullYear();
var month=now.getMonth()+1;
var day=now.getDate();
var hour=now.getHours();
var minute=now.getMinutes();
var second=now.getSeconds();
console.log(year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second);
*/
var sd=require('silly-datetime');
var now=new Date();
var str=sd.format(now,"YYYY-MM-DD HH:mm:ss");
console.log(str);