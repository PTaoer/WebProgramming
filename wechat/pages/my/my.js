//index.js
//获取应用实例
const app = getApp()

var flag=true;
Page({
  data: {
    motto: '零拾实验室',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  click: function () {
    console.log("点击了文字");
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  order: function () {
    wx.navigateTo({
      url: '../user/order/order'
    })
  },
  nopay:function(){
    wx.navigateTo({
      url: '../user/nopay/nopay'
    })
  },
  send: function () {
    wx.navigateTo({
      url: '../user/send/send'
    })
  },
  delivered: function () {
    wx.navigateTo({
      url: '../user/delivered/delivered'
    })
  },
  noevaluate: function () {
    wx.navigateTo({
      url: '../user/noevaluate/noevaluate'
    })
  },
  address: function () {
    wx.navigateTo({
      url: '../user/address/chooseAddre/chooseAddre'
    })
  },
  service: function () {
    wx.navigateTo({
      url: '../user/service/service'
    })
  },
  ticket: function () {
    wx.navigateTo({
      url: '../user/ticket/ticket'
    })
  }
})
