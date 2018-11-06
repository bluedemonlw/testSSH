// 这是模块B
// 引入moduleA.js
import * as obj from './moduleA.js';
console.log(a);
let sum=fun(30);
console.log(sum);
obj.fun1();
// 注意:在模块B中不要随意修改模块A中的接口