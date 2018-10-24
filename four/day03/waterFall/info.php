<?php
  /*随机获取data.json中10条数据*/
  header('Content-type:application/json');
  $data=file_get_contents('./info/data.json');
  // 把$data转化为php对象 json_decode();
  /*$dataArr=json_decode($data);
  // array_rand(arr,n)是从数组中随机取出n个元素并返回对应的下标的集合(数组)
  $randArr=array_rand($dataArr,10);
  // 根据随机生成的下标到总数组中取对应的内容
  $newArr=array();
  // 遍历下标数组$randArr
  for($i=0;$i<count($randArr);$i++){
    // 获取随机下标
    $key=$randArr[$i];
    // 获取每一个随机下标的对象
    $randObj=$dataArr[$key];
    // push到$newArr中 array_push(数组,值)
    array_push($newArr,$randObj);
  }
  // 输出结果
  echo json_encode($newArr);*/
  echo $data;
?>