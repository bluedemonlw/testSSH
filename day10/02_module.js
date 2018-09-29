// 引用a.js文件
var a=require("./a.js");
// 调用属性
console.log("module中调用a.js中的属性:"+a.a);
// 调用方法
console.log("module中调用a.js中的方法:");
a.b();