//var Temp = require('../../template/contract.js');
/*const requestTask = wx.request({
  url: 'http://119.29.18.249:8081/production', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  },
  success: function (res) {
    console.log(res.data)
  }
})*/

Page({

  data: {
    isAllSelect: false,
    totalMoney: 0,
    // 商品详情介绍
    check: {

      pic: "1",
      name: "1",
      id: 1,
      price: 5,
      isSelect: false,
      isshow: false,
      count: {
        quantity: 1,
        min: 1,
        max: 20
      },
    },

    carts: [
      {
        pic: "http://47.100.44.255/images/product/detail-xiangchang/01.JPG",
        name: "双汇Q趣火腿肠大号 85g*20",
        id: '16',
        price: 37.90,
        isSelect: false,
        isshow: false,
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },
      {
        pic: "http://47.100.44.255/images/product/detail-shupian/01.JPG",
        name: "澳洲 Natural Chip薯片175g",
        id: 13,
        price: 29.00,
        isSelect: false,
        isshow: false,
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },


      {
        pic: "http://47.100.44.255/images/product/detail-xianggan/01.JPG",
        name: "香菇豆干小包装麻辣",
        id: 17,
        price: 19.80,
        isSelect: false,
        isshow: false,
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },


      {
        pic: "http://47.100.44.255/images/product/detail-bingjilin/01.JPG",
        name: "法式香草冰淇淋大桶装",
        id: 3,
        price: 19.80,
        isSelect: false,
        isshow: false,
        count: {
          quantity: 1,
          min: 1,
          max: 20
        },
      },


    ],
  },

  onLoad: function () {
    this.getdata();
  },

  getdata: function () {
    var that = this;
    wx.request({
      url: 'http://119.29.18.249:8080/production',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        /*  var length = res.data.length;
          if (length == 0) {
            url = './s-empty';
          }
          for (var index in res.data) {
            that.data.check.id = res.data[index].production_id;
            that.data.check.name = res.data[index].production_name;
            that.data.check.price = res.data[index].production_pricenow;
            that.data.check.pic = res.data[index].production_imgurls01;
            that.data.carts = that.data.carts +','+ that.data.check;
     
            console.log(that.data.check);
          }
        
          console.log(that.data.carts);*/
      }
    })
  },


  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + this.data.carts[index].price;
    }
    else {
      this.data.totalMoney = this.data.totalMoney - this.data.carts[index].price;
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + this.data.carts[i].price;
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + this.data.carts[i].price;
      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  // 去结算
  toBuy() {
    wx.showToast({
      title: '去结算',
      icon: 'success',
      duration: 3000
    });
    var chose = new Array(20);
    var count = 0;
    let i = 0;
    for (i = 0; i < this.data.carts.length; i++) {
      if (true == this.data.carts[i].isSelect) {
        count++;
        chose[i] = this.data.carts[i].id;
      }
    }

    wx.request({
      url: "http://119.29.18.249:8080/postorder",
      data: {
        userid: 1,
        chose: chose,
        length: count
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
      },
    })
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  }
});
