var ejs=require("ejs");
var str='这是一个数组:<%= stus[0].name %>';
var data={names:['Jack','rose','lily']};
var stus={stus:[{name:"zs"},{name:"lisi"},{name:"wangwu"}]};
var html=ejs.render(str,stus);
console.log(html);