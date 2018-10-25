'use strict';
// 创建对象
var eventMouse={
  /** 
   * 添加方法
   * 绑定事件:addEventListener(事件名,处理函数,bool)
   * bool-true:冒泡,false:捕获
   * 参数:
   * elem:绑定事件的DOM对象
  */
  addMouse:function(elem,mDown,mMove,mUp){
    if(!elem || typeof elem!='object'){
      return;
    }
    var self=this;
    // 绑定mousedown
    elem.addEventListener('mousedown',function(e){
      // 调用getPoint,获取坐标值
      e.points=getPoint(e);
      if(mDown){
        // 内部调用mDown方法
        mDown.call(self,e);
      }
    });
    // 绑定mousemove
    elem.addEventListener('mousemove',function(e){
      e.points=getPoint(e);
      if(mMove){
        mMove.call(self,e);
      } 
    });
    // 绑定mouseup
    elem.addEventListener('mouseup',function(e){
      e.points=getPoint(e);
      if(mUp){
        mUp.call(self,e);
      }   
    });
    // 获取鼠标的x,y轴的坐标
    function getPoint(e){
    /** event对象记录坐标值pageX,pageY
     * 参数:
     * e:event对象
     * elem:DOM元素
    */
      var x=e.pageX-elem.offsetLeft;
      var y=e.pageY-elem.offsetTop;
      return {
        dx:x,
        dy:y
      }
    }
  } 
};