var mongoClient=require('mongodb').MongoClient;
//引入配置文件
var config=require('./config.js');
const url=config.url;
const dbName=config.dbName;
//定义连接数据库的方法
/**
 * @param {function} callback 回调,返回连接  
*/
function GetConn(callback){
  mongoClient.connect(url,{useNewUrlParser:true},function(err,client){
    //返回连接结果
    callback(err,client);
  });
}
//定义并暴露查询所有数据的方法
/** 
* @param {string} collection 集合名
* @param {function} callback 回调函数,查询所有数据后,通过回调函数返回数据
*/
exports.findAll=function(collection,callback){
  GetConn(function(err,client){
    if(err){
      console.log(err);
      throw new Error("连接数据库失败");
    }else{
      //获取数据库,获取集合,查询数据
      var coll=client.db(dbName).collection(collection);
      coll.find({}).toArray(function(err,docs){
        callback(err,docs);
        client.close();
      });
    }
  });
}
/** 
 * 增加数据
 * @param {string} collection 集合名
 * @param {JSON} data 将要添加进数据库的数据
 * @param {function} callback 回调函数
*/
exports.add=function(collection,data,callback){
  GetConn(function(err,client){
    if(err){
      console.log(err);
      throw new Error("连接数据库失败");
    }else{
      var coll=client.db(dbName).collection(collection);
      coll.insertOne(data,function(err,result){
        // console.log(result);
        callback(err,result.result);
        client.close();
      });
    }
  });
}
/** 
 * 修改数据
 * @param {string} collection 修改的集合名
 * @param {JSON} filter 修改的条件
 * @param {JSON} data 修改的数据
 * @param {function} callback 回调函数
*/
exports.modify=function(collection,filter,data,callback){
  GetConn(function(err,client){
    if(err){
      console.log(err);
      throw new Error("连接数据库失败");
    }else{
      var coll=client.db(dbName).collection(collection);
      coll.updateMany(filter,{$set:data},function(err,result){
        callback(err,result.result);
        client.close();
      });
    }
  });
};
/**
 *删除数据
 * @param {string} collection 集合名
 * @param {JSON} filter 删除的条件
 * @param {function} callback 回调函数
 */
exports.del=function(collection,filter,callback){
  GetConn(function(err,client){
    if(err){
      console.log(err);
      throw new Error("数据库连接失败");
    }else{
      var coll=client.db(dbName).collection(collection);
      //删除符合条件的数据
      coll.deleteMany(filter,function(err,result){
        callback(err,result.result);
        client.close();
      });
    }
  });
}
/** 
 * 查询指定条件的数据
 * @param {string} collection 集合名
 * @param {JSON} [filter] 查询的条件
 * @param {JSON} [option] 查询的选项
 * @param {number} [option.start] 查询开始的页数
 * @param {number} [option.size] 每页显示的条数
 * @param {object} [option.order] 排序的依据
 * @param {function} callback 回调函数
*/
exports.find=function(collection,filter,option,callback){
  // 判断参数的个数
  if(arguments.length==2){
    // 第一个:集合,第二个:回调
    // 将回调函数重新赋值给callback,并将filter设置为默认值
    callback=filter;
    filter={};
    // 设置option默认值,从第一页查询,每页显示5条,排序按时间降序排列
    option={start:1,size:5,order:{time:-1}};
  }else if(arguments.length==3){
    // 第一个:集合,第三个:回调
    callback=option;//将回调赋值给callback
    option={};//option重置
    //给option赋值,如果filter中是参数,就选值赋值
    option.start=filter.start||1;
    option.size=filter.size||5;
    option.order=filter.order||{time:-1};
    //判断重新赋值过后的option是否与默认值option一致
    //一致:filter中没取到对应的值,filter是查询条件
    //不一致:filter中取到了值,filter是查询参数
    //将查询条件设置为默认值{}
    //或者判断filter中是否含有start,size,order中的一个或多个属性
    //若一个都没有,说明filter是查询条件
    if(filter.start!=undefined||filter.size!=undefined||filter.order!=undefined){
      filter={};
    }
  }else if(arguments.length==4){
    //4个参数,参数一一对应
    //其他参数使用传递进来的值,option需要判断
    option.start=option.start||1;
    option.size=option.size||5;
    option.order=option.order||{time:-1};
  }
  console.log(collection);
  console.log(filter);
  console.log(option);
  console.log(callback);
  //option中的start需要处理
  //数据库中查询时,跳过的是具体数据的条数不是页数
  //获取跳过的条数
  var skip=(option.start-1)*option.size;
  //获取每页显示的条数
  var size=option.size;
  //获取每页的排序依据
  var order=option.order;
  //连接数据库
  GetConn(function(err,client){
    if(err){
      console.log(err);
      throw new Error("数据库连接失败");
    }else{
      //查询
      var coll=client.db(dbName).collection(collection);
      coll.find(filter).skip(skip).limit(size).sort(order).toArray(function(err,docs){
        callback(err,docs);
        client.close();
      });
    }
  });
}