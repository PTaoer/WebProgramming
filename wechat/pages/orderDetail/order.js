Page({

  data: {
    prolist: [],
    address: {},
    total: 0,
    sign:0
  },

  onLoad: function(options) {
    var flag = false;
    this.data.prolist = [],
      this.data.total = 0
    this.data.address = {}
    this.setData({
      prolist: JSON.parse(options.list),
      address: JSON.parse(options.address),
      total: options.count,
    })
  },

  todelete: function() {
    var that = this;
    this.setData({
      prolist: [],
      address: {},
      total: 0
    })
    wx.switchTab({
      url: '../shopping/shopping',
    })
    wx.showToast({
      title: "取消成功",
      icon: 'success',
      duration: 3000,
      mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false  
      success: function() {}, //接口调用成功的回调函数  
      fail: function() {}, //接口调用失败的回调函数  
      complete: function() {} //接口调用结束的回调函数
    });
  },
  toChooseAddress: function() {
    wx.redirectTo({
      url: '../Address/chooseAddre/chooseAddre?myurl=' + '../../orderDetail/order' + '&list=' + JSON.stringify(this.data.prolist) + '&count=' + this.data.total + '&sign=3'
    });
  }
})