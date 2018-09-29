var student=require("./Student.js");
var s1=new student("张三",23);
console.log("属性:"+s1.name+","+s1.age);
s1.study();
s1.sayInfo();