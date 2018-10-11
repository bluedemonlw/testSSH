var db=require('./db.js');
//测试查询所有数据
/*db.findAll("student",function(err,docs){
  if(err){
    console.log(err);
  }else{
    console.log(docs);
  }
});
*/
//测试添加数据
/*var data={id:105,name:"xy",age:14};
db.add("student",data,function(err,result){
  console.log(err);
  console.log(result);
});
*/
//删除数据
var filter={id:105};
db.del("student",filter,function(err,result){
  if(err){
    console.log(err);
  }else{
    console.log(result);
  }
});
//测试修改数据
/*var filter={id:105};
var data={age:28};
db.modify("student",filter,data,function(err,result){
  if(err){
    console.log(err);
  }else{
    console.log(result);
  }
});
*/