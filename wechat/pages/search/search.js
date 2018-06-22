//index.js
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
  data: {},

  // 搜索栏
  onLoad: function() {
    var that = this;
    WxSearch.init(
      that, // 本页面一个引用
      ['蛋黄酥', '薯片', '午餐肉', '桂花糕'], // 热点搜索推荐，[]表示不使用
      ['蛋黄酥', '薯片', '午餐肉', '桂花糕', '碧根果', '马迭尔', '冰淇淋', '大白兔', '方便面', '凤梨酥', '螺蛳粉', '芒果干', '牛奶', '软糖', '提子夹心蛋糕', '香肠', '香干'], // 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput, // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap, // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm, // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear, // 清空函数

  // 搜索回调函数  
  mySearchFunction: function(value) {
    if (value == "蛋黄酥") {
      wx.navigateTo({
        url: '../display/display-danhuangsu/display',
      })
    }
    if (value == "薯片") {
      wx.navigateTo({
        url: '../display/display-shupian/display',
      })
    }
    if (value == "午餐肉") {
      wx.navigateTo({
        url: '../display/display-wucanrou/display',
      })
    }
    if (value == "桂花糕") {
      wx.navigateTo({
        url: '../display/display-guihuagao/display',
      })
    }
    if (value == "提子夹心蛋糕") {
      wx.navigateTo({
        url: '../display/display-tizijiaxin/display',
      })
    }
    if (value == "螺蛳粉") {
      wx.navigateTo({
        url: '../display/display-luoshifen/display',
      })
    }
    if (value == "豆腐干") {
      wx.navigateTo({
        url: '../display/display-xianggan/display',
      })
    }
    if (value == "凤梨酥") {
      wx.navigateTo({
        url: '../display/display-fenglisu/display',
      })
    }
    if (value == "腰果") {
      wx.navigateTo({
        url: '../display/display-yaoguo/display',
      })
    }
    if (value == "软糖") {
      wx.navigateTo({
        url: '../display/display-ruantang/display',
      })
    }
    if (value == "大白兔") {
      wx.navigateTo({
        url: '../display/display-dabaitu/display',
      })
    }
    if (value == "柚子茶") {
      wx.navigateTo({
        url: '../display/display-youzicha/display',
      })
    }
    if (value == "香肠") {
      wx.navigateTo({
        url: '../display/display-xiangchang/display',
      })
    }
    if (value == "碧根果") {
      wx.navigateTo({
        url: '../display/display-bigenguo/display',
      })
    }
    if (value == "方便面") {
      wx.navigateTo({
        url: '../display/display-fangbianmian/display',
      })
    } 
    else {
      wx.navigateTo({
        url: '../null/null',
      })
    }
  },

  // 返回回调函数
  myGobackFunction: function() {
    // do your job here
    // 跳转
    wx.switchTab({
      url: '../index/index'
    })
  }

})