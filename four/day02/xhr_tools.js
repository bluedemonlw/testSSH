// 封装get请求
function xhr_get(url,data){
  var xhr=new XMLHttpRequest();
  xhr.open('get',url+'?'+data?data:null);
  xhr.send(null);
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      console.log(xhr.responseText);
    }
  }
}
// 封装post请求
function xhr_post(url,data){
  var xhr=new XMLHttpRequest();
  if(data){
    xhr.send(data);
  }else{
    xhr.send(null)
  }
  xhr.open('post',url);
  xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      console.log(xhr.responseText);
    }
  }
}
/**
 * 将get和post请求封装到一起
 * 参数:
 * url:请求地址
 * data:请求参数
 * methods:请求方式 get/post
 * success:数据获取成功的回调函数
 */
function xhr(obj){
  var xhr=new XMLHttpRequest();
  // 判断methods
  if(obj.methods.toLowerCase()=='get'){
    if(obj.data){
      obj.url+="?"+setData(obj.data);
    }
    xhr.open(obj.methods,obj.url);
    xhr.send();
  }else if(obj.methods.toLowerCase()=='post'){
    xhr.open(obj.methods,obj.url);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    if(obj.data){
      // 调用一次setData
      xhr.send(setData(obj.data));
    }else{
      xhr.send();
    }
  } 
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      obj.success(xhr.responseText);
    }
  }
}
//处理data,变成字符串键值对
function setData(data){
  var urlData="";
  // 遍历data
  for(var key in data){
    urlData+="&"+key+"="+data[key];
  }
  return urlData.slice(1);
}