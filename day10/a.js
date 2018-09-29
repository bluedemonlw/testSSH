require('./b.js');
console.log("这是a.js的内容");
var a=12;
function b(){
  console.log("这是a.js的b方法");
}
// exports.暴露名=定义的名字
exports.a=a;
exports.b=b;