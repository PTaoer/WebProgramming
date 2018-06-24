var app = getApp();
var list = app.globalData.list;
var num = app.globalData.num;
var allSelect = app.globalData.allSelect;
var count = app.globalData.count;
Page({
  data: {
    list: [],
    allSelect: 'circle',
    orderlist: [],
    count: 0
  },
  onLoad: function() {
    var app = getApp();
    this.setData({
      list: app.globalData.list
    })
    console.log(app.globalData.list);
  },
  //改变选框状态
  change: function(e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到选中状态
    var select = e.currentTarget.dataset.select

    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }
    //把新的值给新的数组
    var newList = app.globalData.list
    newList[index].select = stype
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //加法
  addtion: function(e) {
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //默认99件最多
    if (num < 100) {
      num++
    }
    //把新的值给新的数组
    var newList = app.globalData.list
    newList[index].num = num

    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //减法
  subtraction: function(e) {
    var app = getApp();
    var that = this
    //得到下标
    var index = e.currentTarget.dataset.index
    //得到点击的值
    var num = e.currentTarget.dataset.num
    //把新的值给新的数组
    var newList = app.globalData.list
    //当1件时，点击移除
    if (num == 1) {
      newList.splice(index, 1)
    } else {
      num--
      newList[index].num = num
    }

    //把新的数组传给前台
    that.setData({
      list: newList
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //全选
  allSelect: function(e) {
    var app = getApp();
    //先判断现在选中没
    var allSelect = e.currentTarget.dataset.select
    var newList = app.globalData.list;
    if (allSelect == "circle") {
      //先把数组遍历一遍，然后改掉select值
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    var that = this
    that.setData({
      list: newList,
      allSelect: select
    })
    //调用计算数目方法
    that.countNum()
    //计算金额
    that.count()
  },
  //计算数量
  countNum: function() {
    var that = this
    //遍历数组，把既选中的num加起来
    var newList = app.globalData.list;
    var allNum = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        allNum += parseInt(newList[i].num)
      }
    }
    parseInt
    console.log(allNum)
    that.setData({
      num: allNum
    })
  },
  onShow: function() {
    var app = getApp();
    this.setData({
      list: app.globalData.list,
    })
  },

  //计算金额方法
  count: function() {
    var that = this
    //思路和上面一致
    //选中的订单，数量*价格加起来
    var newList = app.globalData.list;
    var newCount = 0
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].select == "success") {
        newCount += newList[i].num * newList[i].price
      }
    }
    that.setData({
      count: newCount.toFixed(2)
    })
  },
  onHide: function(e) {
    this.setData({
      prolist: []
    })

  },
  order: function(e) {
    var that = this;
    var newlist = app.globalData.list
    for (var i = 0; i < newlist.length; i++) {
      if (newlist[i].select == "success") {
        that.data.orderlist.push(newlist[i]);
      }
    }

    that.setData({
      orderlist: that.data.orderlist
    })
    console.log('list:', that.data.orderlist)
    console.log('addr:', app.globalData.address['0'])
    wx.navigateTo({
      url: '../orderDetail/order?list=' + JSON.stringify(that.data.orderlist) + '&count=' + that.data.count + '&address=' + JSON.stringify(app.globalData.address['0']),
      success: function(res) {
        that.setData({
          orderlist: []
        })
      }


    })

  }

})