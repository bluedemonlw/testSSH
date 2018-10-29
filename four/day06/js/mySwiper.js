// 面向对象的方式重构代码
// 单例模式
var mySwiper = {
  banner: null,
  bannerWidth: null,
  imgBox: null,
  point: null,
  points: null,
  index: 1,
  startX: 0,
  moveX: 0,
  distanceX: 0,
  ISMOVE: false,
  timer: null,
  initSwiper: function () {
    this.banner = document.querySelector('.jd_banner');
    this.bannerWidth = this.banner.offsetWidth;
    this.imgBox = this.banner.children[0];
    this.point = this.banner.children[1];
    this.points = this.point.querySelectorAll('li');
    // 调用setTimer启动定时器
    this.setTimer();
    // 添加页面可见事件visibilitychange
    document.addEventListener('visibilitychange', function (e) {
      if (document.hidden) {
        clearInterval(self.timer);
        self.timer = null;
      } else {
        self.setTimer();
      }
    });
    var self = this;
    // 绑定过渡结束事件,重新定位到第一张图片
    this.imgBox.addEventListener('webkitTransitionEnd', function () {
      // 处理过渡事件结束
      if (self.index >= 9) {
        self.index = 1;
        self.clearTransition();
        self.addTranslate(-self.bannerWidth * self.index);
      } else if (self.index <= 0) {
        self.index = 8;
        self.clearTransition();
        self.addTranslate(-self.index * self.bannerWidth);
      }
      // 调用setPoint方法
      self.setPoint();
    });
    // 绑定touchstart事件
    this.imgBox.addEventListener('touchstart', function (e) {
      e.preventDefault();
      // 停止轮播图(关闭定时器)
      clearInterval(self.timer);
      self.timer = null; //定时器设置为null
      // 记录startX
      self.startX = e.touches[0].pageX;
    });
    // 绑定touchmove事件
    this.imgBox.addEventListener('touchmove', function (e) {
      e.preventDefault();
      self.ISMOVE = true;
      self.moveX = e.touches[0].pageX;
      self.distanceX = self.moveX - self.startX;
      // 重新定位
      self.clearTransition();
      self.addTranslate(-self.index * self.bannerWidth + self.distanceX);
    });
    this.imgBox.addEventListener('touchend', function (e) {
      e.preventDefault();
      if (!self.ISMOVE) {
        return;
      }
      if (Math.abs(self.distanceX) > self.bannerWidth / 3) { //表示滑动有效
        // 判断向右滑动(上一张)还是向左滑动(下一张)
        if (self.distanceX > 0) { //切换到上一张
          self.index--;
        } else { //切换到下一张
          self.index++;
        }
        self.addTransition();
        self.addTranslate(-self.index * self.bannerWidth);
      } else { //滑动无效
        self.addTransition();
        self.addTranslate(-self.index * self.bannerWidth);
      }
      // 重新初始化全局参数,防止下一次滑动有影响
      self.startX = 0, self.moveX = 0, self.distanceX = 0, self.ISMOVE = false;
      // 再次开启定时器
      self.setTimer();
    });
  },
  addTransition: function () {
    this.imgBox.style.transition = 'all .3s ease-out';
    this.imgBox.style.webkitTransition = 'all .3s ease-out';
  },
  addTranslate: function (x) {
    this.imgBox.style.transform = 'translateX(' + x + 'px)';
    this.imgBox.style.webkitTransform = 'translateX(' + x + 'px)';
  },
  clearTransition: function () {
    this.imgBox.style.transition = 'none';
    this.imgBox.style.webkitTransition = 'none';
  },
  setTimer: function () {
    var self = this;
    this.timer = setInterval(function () {
      self.index++;
      self.addTransition();
      self.addTranslate(-self.bannerWidth * self.index);
    }, 3000);
  },
  setPoint: function () {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].className = '';
    }
    this.points[this.index - 1].className = 'now';
  }
};

window.onload = function () {
  mySwiper.initSwiper();
}