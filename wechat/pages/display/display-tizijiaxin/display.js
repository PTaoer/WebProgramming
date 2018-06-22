//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    imgUrls: [
      'http://47.100.44.255/images/product/detail-tizijiaxin/01.jpg',
      'http://47.100.44.255/images/product/detail-tizijiaxin/02.jpg',
      'http://47.100.44.255/images/product/detail-tizijiaxin/03.jpg'
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
  //事件处理函数
  bindCommentTap: function() {
    wx.navigateTo({
      url: '../../comment/comment'
    })
  },
  bindAddressTap: function () {
    wx.navigateTo({
      url: '../../user/address/chooseAddre/chooseAddre'
    })
  },
  //收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
    wx.showToast({
      title: '喜欢哦',
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
  toCar() {
    wx.switchTab({
      url: '../../shopping/shopping'
    })
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
    wx.showToast({
      title: '购物车',
      icon: 'success',
      duration: 3000
    });
    wx.request({
      url: "http://119.29.18.249:8080/postcart",
      data: {
        pro_id: 14,
        num: num
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
      },
    })
  }
})
