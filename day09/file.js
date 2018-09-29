var fs=require("fs");
fs.readdir("./a",function(err,data){
  if(err){
    console.log(err);
    return;
  }else{
    console.log(data);
    /*for(key in data){
      console.log(data[key]);
      fs.stat("./a/"+data[key],function(err,stats){
        if(stats.isFile()){
          console.log(data[key]+"是文件");
        }else{
          console.log(data[key]+"是文件夹");
        }
      })
    }
    */
  }
  console.log("文件有:");
  (function a(i){
    // 先判断递归结束的条件
    // 当i等于文件长度时,遍历结束
    if(i==data.length){
      return;
    }
    // 遍历没有结束,检查判断每个元素的状态
    fs.stat("./a/"+data[i],function(err,stats){
      if(err){
        console.log(err);
        return;
      }else{
        if(stats.isFile()){
          console.log(data[i]);
        }else{
          console.log("文件夹有:");
          console.log(data[i]);
        }
      }
      // 自调
      a(++i);
    }); 
  })(0)
});