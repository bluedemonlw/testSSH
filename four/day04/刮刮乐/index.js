'use strict';
/**封装一个ggl对象 */
var ggl={
  c1:null,//获取画布元素
  ctx:null,//获取画布对象
  c1_width:376,
  c1_height:82,
  ismousedown:false,//判断当前鼠标是否按下
  is_ok:false,//判断面积是否刮去一半以上
  num:1,//当前刮的次数
  init:function(){
    // 初始化画布
    this.c1=document.getElementById('canvas1');
    this.ctx=this.c1.getContext('2d');
    this.c1.width=this.c1_width;
    this.c1.height=this.c1_height;
    // 绘制画布
    this.initCanvas();
    // 调用mouse事件的封装
    eventMouse.addMouse.call(this,this.c1,this.mouseDown,this.mouseMove,this.mouseUp);
    // 调用initNum
    this.initNum();
  },
  initCanvas:function(){
    // 此方法绘制画布矩形
    this.ctx.globalCompositeOperation='source-over';
    // 1.设置画布颜色 #797979
    this.ctx.fillStyle="#797979";
    // 2.绘制实心矩形
    this.ctx.fillRect(0,0,this.c1.width,this.c1.height);
    this.ctx.fill();
    // 3.绘制文字 30px bold #ddd '刮一刮' 居中对齐
    this.ctx.font="bold 30px Microsoft yahei";
    this.ctx.fillStyle="#ddd";
    this.ctx.textAlign="center";
    this.ctx.fillText("刮一刮",this.c1_width/2,this.c1_height/2+10);
    this.ctx.globalCompositeOperation='destination-out';
  },
  mouseDown:function(e){
    // ismousedown设为true
    this.ismousedown=true;
    // 把之前内存中的事件清除
    e.preventDefault();
  },
  mouseMove:function(e){
    e.preventDefault();
    // 判断鼠标是否按下
    if(!this.ismousedown){
      return;
    }
    // 绘制圆
    // 计算id为top的盒子的偏移值
    var left=document.getElementById('top').offsetLeft;
    var topY=document.getElementById('top').offsetTop;
    var x=e.points.dx-left;
    var y=e.points.dy-topY;
    this.ctx.beginPath();
    this.ctx.arc(x,y,15,0,Math.PI*2);
    this.ctx.fill();
    this.ctx.closePath();
  },
  mouseUp:function(e){
    e.preventDefault();
    // 得到canvas画布的整个像素数据ctx.getImageData()获取画布像素
    var a=this.ctx.getImageData(0,0,this.c1_width,this.c1_height);
    // 遍历a.data像素数据
    for(var i=0,j=0;i<a.data.length;i+=4){
      if(a.data[i]==0){
        j++;//记录像素为空的次数
      }
    }
    // 判断当被刮开的区域大于一半时,则可以处理结果
    if(j>a.data.length/8){
      this.is_ok=true;
      // 显示按钮
      $('.btn').css('zIndex',10);
    }
    // 判断is_ok
    if(this.is_ok){
      // 没刮完的自动去掉
      this.ctx.clearRect(0,0,this.c1_width,this.c1_height);
    }
    // 把ismousedown再设置回false
    this.ismousedown=false;
  },
  // 控制刮卡次数 中奖概率
  initNum:function(){
    // 把btn的zIndex设置为1
    $('.btn').css('zIndex',1);
    $('.btn').css('display','none');
    $('.num1').html(3-this.num);
    // 获取随机数
    var randNum=function(a,b){
      return Math.floor(Math.random()*(b-a)+a);
    }
    var r=randNum(0,100);
    // 控制中奖概率
    if(33*this.num>r){
      $('#ok').css('display','block');
      $('#prompt').html("恭喜你,中奖了!");
    }else{
      // 未中奖
      $('#no').css('display','block');
      $('#prompt').html("很遗憾,你没有中奖!");
      var self=this;
      $('#no').unbind();
      $('#no').bind('click',function(){
        self.onceAgain();
      });
    }
    // 初始化is_ok
    this.is_ok=false;
  },
  onceAgain:function(){
    if(this.num>=3){
      alert("你的次数用完了!");
    }else{
      this.num++;
      // 初始化按钮
      $('.btn').css('display','none');
      this.initCanvas();
      this.initNum();
    }
  }
};
// 当页面加载时
window.onload=function(){
  ggl.init();
}