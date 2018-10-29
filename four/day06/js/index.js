/* 1.移动端轮播图
    1)自动轮播(定时器+C3的位移+过渡技术,无缝衔接[利用过渡结束+定位实现])
    2)点要跟随轮播改变样式
    3)可以手动滑动轮播图(touch事件)
*/
// 自动轮播
window.onload = function () {
  mySwiper();
  search();
}

function mySwiper() {
  // 获取轮播图的盒子
  var banner = document.querySelector('.jd_banner');
  // 获取轮播图的宽度
  var bannerWidth = banner.offsetWidth;
  // 获取图片的盒子
  var imgBox = banner.children[0];
  // 获取点
  var point = banner.children[1];
  // 获取所有的点
  var points = point.querySelectorAll('li');
  // 定义过渡方法
  var addTransition = function () {
    imgBox.style.transition = 'all .3s ease-out';
    // 兼容写法
    imgBox.style.webkitTransition = 'all .3s ease-out';
  }
  // 定义位移方法
  var addTranslate = function (x) {
    imgBox.style.transform = 'translateX(' + x + 'px)';
    imgBox.style.webkitTransform = 'translateX(' + x + 'px)';
  }
  // 定义清除过渡方法
  var clearTransition = function () {
    imgBox.style.transition = 'none';
    imgBox.style.webkitTransition = 'none';
  }
  var index = 1;
  // 定义定时器,实现自动轮播 setInterval()
  var timer = setInterval(function () {
    index++;
    // 调用定位+过渡方法
    addTransition();
    addTranslate(-bannerWidth * index);
  }, 3000);
  // 绑定过渡结束事件,重新定位到第一张图片
  imgBox.addEventListener('webkitTransitionEnd', function () {
    // 处理过渡事件结束
    if (index >= 9) {
      index = 1;
      clearTransition();
      addTranslate(-bannerWidth * index);
    } else if (index <= 0) {
      index = 8;
      clearTransition();
      addTranslate(-index * bannerWidth);
    }
    // 调用setPoint方法
    setPoint();
  })
  // 点需要跟随滚动 改变当前li样式
  function setPoint() {
    for (var i = 0; i < points.length; i++) {
      points[i].className = '';
    }
    points[index - 1].className = 'now';
  }
  // 绑定touch事件,能够手动滑动轮播图
  // 初始化变量startX,moveX,distanceX,ISMOVE
  var startX = 0,
    moveX = 0,
    distanceX = 0,
    ISMOVE = false;
  // 绑定touchstart事件
  imgBox.addEventListener('touchstart', function (e) {
    e.preventDefault();
    // 停止轮播图(关闭定时器)
    clearInterval(timer);
    timer = null; //定时器设置为null
    // 记录startX
    startX = e.touches[0].pageX;
    console.log(startX);
  })
  // 绑定touchmove事件
  imgBox.addEventListener('touchmove', function (e) {
    e.preventDefault();
    ISMOVE = true;
    moveX = e.touches[0].pageX;
    distanceX = moveX - startX;
    // 重新定位
    clearTransition();
    addTranslate(-index * bannerWidth + distanceX);
  })
  // 绑定touchend事件
  // 当滑动距离不超过图片的三分之一时,当前滑动无效,重新定位,当滑动距离超过三分之一时,当前滑动生效,切换下一张或上一张
  imgBox.addEventListener('touchend', function (e) {
    e.preventDefault();
    if (!ISMOVE) {
      return;
    }
    if (Math.abs(distanceX) > bannerWidth / 3) { //表示滑动有效
      // 判断向右滑动(上一张)还是向左滑动(下一张)
      if (distanceX > 0) { //切换到上一张
        index--;
      } else { //切换到下一张
        index++;
      }
      addTransition();
      addTranslate(-index * bannerWidth);
    } else { //滑动无效
      addTransition();
      addTranslate(-index * bannerWidth);
    }
    // 重新初始化全局参数,防止下一次滑动有影响
    startX = 0, moveX = 0, distanceX = 0, ISMOVE = false;
    // 再次开启定时器
    timer = setInterval(function () {
      index++;
      addTransition();
      addTranslate(-index * bannerWidth);
    }, 3000);
  });
}
// 搜索区域滚动效果
function search() {
  /** 
   * 1.颜色随着页面滚动,逐渐加深(变得不透明)
   * 2.当滚动的距离超过轮播图的高度时,颜色保持不变
   * 浏览器的滚动事件window.onscroll
   * 监听滚动高度document.body.scrollTop
   */
  //  获取搜索盒子
  var searchBox = document.querySelector('.jd_header_box');
  // 获取轮播图的高度
  var banerHeight = document.querySelector('.jd_banner').offsetHeight;
  // 监听scroll滚动事件
  window.onscroll = function () {
    var top = document.body.scrollTop;
    var opacity = 0;
    if (top < banerHeight) {
      // 设置透明度
      opacity = top / banerHeight;
    }else{
      opacity=1;
    }
    searchBox.style.background='rgba(201,21,35,'+opacity+')';
  }
}