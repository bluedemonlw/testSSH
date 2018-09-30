// 1.引入ejs模块
var ejs=require("ejs");
// 2.创建模板
var str="今天开始学习<%= msg %>";
// 3.模拟填充数据
// 数据必须是key:value的json对象
// key:在模板中被调用
var data={msg:"ejs"};
// 4.将数据填充到模板中
// 返回值为一个完整的视图
var html=ejs.render(str,data);
console.log(html);