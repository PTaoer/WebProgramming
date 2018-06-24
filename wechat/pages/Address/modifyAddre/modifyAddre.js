var flag = false;
Page({
  data: {
    name: "请填写您的姓名",
    tel: "请填写您的联系方式",
    addreValue: 2,
    addreRange: ['　　　　　　　　　　', '杭州市余杭区', '杭州市江干区', '杭州市滨江区', '杭州市西湖区', '杭州市上城区', '杭州市下城区', '杭州市拱墅区', '杭州市萧山区'],
    door: "街道门牌信息",
    index: "0",
    address: '',
    modify: {},
    backurl: '',
    sign: 1
  },
  onLoad: function(options) {
    var app = getApp();
    var addr = app.globalData.address[options.index];
    this.setData({
      name: addr.name,
      tel: addr.tel,
      address: addr.addre,
      door: addr.door,
      index: options.index,
      backurl: options.myurl,
      sign: options.sign
    })
    console.log("传过来的myurl" + options.myurl);
    console.log("接收到的index" + this.data.index);
    console.log("接收到的sign" + options.sign);
  },

  addrePickerBindchange: function(e) {
    this.setData({
      addreValue: e.detail.value
    })
  },
  //点击删除
  delete: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该地址信息吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var app = getApp();
          app.globalData.address.splice(that.data.index, 1)
          wx.redirectTo({
            url: '../chooseAddre/chooseAddre?index=' + that.data.index + "&sign=" + that.data.sign
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击取消，返回上个页面
  cancel: function() {
    wx.redirectTo({
      url: '../chooseAddre/chooseAddre'
    });
  },
  //点击保存
  formSubmit: function(e) {
    var warn = "";
    var that = this;
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.tel == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
      warn = "手机号格式不正确";
    } else if (e.detail.value.addre == '0') {
      warn = "请选择您的所在区域";
    } else if (e.detail.value.door == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      var newadd = that.data.modify;
      newadd.name = e.detail.value.name;
      newadd.tel = e.detail.value.tel;
      var newadd = that.data.modify;
      newadd.name = e.detail.value.name;
      newadd.tel = e.detail.value.tel;
      newadd.addre = that.data.address;
      newadd.door = e.detail.value.door;
      newadd.sign = e.detail.value.sign;
      newadd.select = 'circle';
      that.setData({
        modify: newadd
      })
      var app = getApp();
      app.globalData.address[that.data.index] = that.data.modify;
      console.log(app.globalData.address[that.data.index])
      wx.redirectTo({
        url: '../chooseAddre/chooseAddre?flag=true' + '&myurl=' + that.data.backurl + '&sign=' + that.data.sign
        //？后面跟的是需要传递到下一个页面的参数
      });
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },
})