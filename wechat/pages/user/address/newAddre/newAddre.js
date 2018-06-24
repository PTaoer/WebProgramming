var index = 0;
Page({
  data: {
    name: "请填写您的姓名",
    tel: "请填写您的联系方式",
    addreValue: 0,
    addreRange: ['　　　　　　　　　　', '杭州市余杭区', '杭州市江干区', '杭州市滨江区', '杭州市西湖区', '杭州市上城区', '杭州市下城区', '杭州市拱墅区', '杭州市萧山区'],
    door: "街道门牌信息",
    select: 'circle'
  },

  addrePickerBindchange: function(e) {
    this.setData({
      addreValue: e.detail.value
    })
  },
  formSubmit: function(e) {
    var warn = "";
    var that = this;
    var flag = false;
    var select = "circle";
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
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      wx.redirectTo({
        url: '../chooseAddre/chooseAddre?flag=' + flag
        //？后面跟的是需要传递到下一个页面的参数
      });
      console.log("传过去的地址下标是多少？" + e.detail.value.addre)
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
    var add = {};
    add.name = e.detail.value.name;
    add.tel = e.detail.value.tel;
    add.addre = that.data.addreRange[e.detail.value.addre];
    add.door = e.detail.value.door;
    add.select = "circle";
    var app = getApp();
    console.log('data', add);
    app.globalData.address.push(add);
    console.log('app:', app.globalData.address);
  }
})