var gm=require('gm');
gm('./e.jpg')
//.flip()//翻转180°
// .magnify()//扩大1倍尺寸
// .rotate('green',45)//旋转多少度,填充色
// .blur(7,3)//模糊效果
// .crop(300,300,150,130)//剪切图片
// .edge(3)
// .drawCircle(100,100,90,90)//圆心坐标x,y,偏离图片原点距离x,y
.write('./2.jpg',function(err){
  if(!err)
    console.log('crazytom has arrived');
})