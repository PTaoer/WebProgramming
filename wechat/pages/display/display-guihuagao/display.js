//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    imgUrls: [
      'http://47.100.44.255/images/product/detail-guihuagao/01.JPG',
      'http://47.100.44.255/images/product/detail-guihuagao/02.JPG',
      'http://47.100.44.255/images/product/detail-guihuagao/03.JPG'
    ],
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "", 
    imgheights: [700],    //所有图片的高度 
    current: 0 ,
    showModalStatus: false,
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled'
  },
  onLoad: function (options) {
    flag = options.flag;
    console.log("..." + flag)
    if (!flag) {
      this.setData({
        display1: "flex",
        display2: "none",
      })

    } else {
      this.setData({
        display1: "none",
        display2: "flex",
        addre: options.address
      })
    }
  },

  toChooseAddre: function () {
    wx.redirectTo({
      url: '../../Address/chooseAddre/chooseAddre?myurl=' + '../../display/display-danhuangsu/display'
    });
  },
  //事件处理函数
  bindCommentTap: function() {
    wx.navigateTo({
      url: '../../comment/comment'
    })
  },
  //收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
    wx.showToast({
      title: this.data.isLike ? "喜欢哦" : "取消",
      icon: 'success',
      duration: 3000,
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
      success: function () { }, //接口调用成功的回调函数  
      fail: function () { },  //接口调用失败的回调函数  
      complete: function () { } //接口调用结束的回调函数
    });
  },
  //客服
  chatting() {
    wx.navigateTo({
      url: '../../user/service/service'
    })
  },
  //跳到购物车
  justToCar() {
    wx.switchTab({
      url: '../../shopping/shopping'
    })
  },
  toCar() {
    wx.switchTab({
      url: '../../shopping/shopping'
    })
    var num = this.data.num;
    var cargo = {
      code: '0008',
      num: num,
      name: '传统手工桂花糕',
      url: 'http://47.100.44.255/images/product/detail-guihuagao/01.JPG',
      price: '34.90',
      select: 'circle'
    };
    var app = getApp();
    app.globalData.list.push(cargo);
  },
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  bindSubmitNum: function (e) {
    var num = this.data.num;
    wx.showToast({
      title: '购物车',
      icon: 'success',
      duration: 3000
    });

    var cargo = {
      code: '0008',
      num: num,
      name: '传统手工桂花糕',
      url: 'http://47.100.44.255/images/product/detail-guihuagao/01.JPG',
      price: '34.90',
      select: 'circle'
    };
    var app = getApp();
    app.globalData.list.push(cargo);
  }
})
