var index = 0;
var li = [];


Page({
  data: {
    list: li,
    backurl: '',
    sign: 0,
    order: {
      list: [],
      count: 0
    }
  },
  addAddre: function(e) {
    wx.redirectTo({
      url: '../newAddre/newAddre?myurl=' + this.data.backurl+'&sign'+this.data.sign
    })
  },
  toModifyAddre: function(e) {
    console.log("选中的地址" + e.currentTarget.dataset.addre);
    console.log("选中" + e.currentTarget.dataset.select);
    console.log("选中的index" + e.currentTarget.dataset.index);
    console.log("url:", this.data.backurl)
    wx.redirectTo({
      url: '../modifyAddre/modifyAddre?index=' + e.currentTarget.dataset.index + '&myurl=' + this.data.backurl + '&sign=' + this.data.sign
    })
    console.log("sign:"+this.data.sign);
  },
  choose: function(e) {
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
    var newList = that.data.list
    newList[index].select = stype
    //把新的数组传给前台
    that.setData({
      list: newList
    })
  },

  onLoad: function(options) {
    var that = this;
    console.log('opt', options);
    var app = getApp();
    if (options.sign == 3) {
      console.log('opt', options);
      var cc = {}
      cc.list = JSON.parse(options.list);
      cc.count = options.count;
      this.setData({
        order: cc
      })
      console.log(cc);
    }
    var length = app.globalData.address.length;
    var p = 0;
    for (p = 0; p < length; p++) {
      let theadd = {}
      theadd.name = app.globalData.address[p].name;
      theadd.tel = app.globalData.address[p].tel;
      theadd.addre = app.globalData.address[p].addre;
      theadd.door = app.globalData.address[p].door;
      theadd.address = app.globalData.address[p].addre + app.globalData.address[p].door;
      theadd.sign = app.globalData.address[p].sign;
      theadd.index = p;
      theadd.select = 'circle';
      console.log(theadd);
      that.data.list.push(theadd);
    }
    if (options.myurl) {
      this.setData({
        backurl: options.myurl,
        sign:options.sign
      })
    }

    this.setData({
      list: that.data.list
    })

    var flag = false; //判断是从哪个页面跳转过来
    var sign = 0 //判断从修改页面中的保存还是删除按钮过来，保存为1，删除为2
    flag = options.flag;
    this.setData({
      sign: options.sign
    })
    if (flag) {
      var app = getApp();
      that.data.list = app.globalData.address;
      // that.data.list.addre = app.globalData.address.addre + app.globalData.address.door;
      this.setData({
        list: that.data.list
      })
    };
  },

  address: function(e) {
    var that = this;
    console.log(that.data.backurl);
    console.log(e.currentTarget.dataset.addre);
    if (that.data.sign == 3) {
      wx: wx.redirectTo({
        url: that.data.backurl + '?flag=true&address=' + JSON.stringify(e.currentTarget.dataset) + '&count=' + that.data.order.count + '&list=' + JSON.stringify(that.data.order.list),
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      console.log('opt', that.data.order);
    }
    else {
      wx: wx.redirectTo({
        url: that.data.backurl + '?flag=true&address=' + e.currentTarget.dataset.addre,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }

})