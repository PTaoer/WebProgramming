//index.js
Page({
  data: {
    searchValue:'',
    indicatorDots: false,
    imgUrls: [
      {
        url:'../display/display-danhuangsu/display',
        image: 'http://47.100.44.255/images/home/蛋黄酥.jpg'
      },
      {
        url: '../display/display-bingqilin/display',
        image: 'http://47.100.44.255/images/home/冰淇淋.jpg'
      },
       {
         url: '../display/display-shupian/display',
         image: 'http://47.100.44.255/images/home/薯片.jpg'
      }
    ],
    inputVal: "",
    //所有图片的高度  
    imgheights: [500],
    //图片宽度  
    imgwidth: 750,
    //默认  
    current: 0,
     news: [
       {
         url: '../display/display-bingqilin/display',
      title: '【冰淇淋】带着丝丝甜意的盛夏~'
      },
      {
        url: '../display/display-mangguogan/display',
         title: '【果蔬干】是停不下来的芒果干呀~'
         },
      {
        url: '../display/display-jiaxindangao/display',
        title: '【提子夹心蛋糕】超级甜的提子夹心蛋糕~'
      },
      {
        url: '../display/display-shupian/display',
        title: '【碧根果】休闲小零食，让你停不住嘴！'
      }
       ],
       goods:[
         {
           url:'../display/display-luoshifen/display',
           image:'http://47.100.44.255/images/home/螺蛳粉.jpg',
           pro:'正宗广州特产柳州风味螺蛳粉',
           price:'¥34.90'
         },
         {
           url: '../display/display-xianggan/display',
           image: 'http://47.100.44.255/images/home/豆干.jpg',
           pro: '选用新鲜香干，切丁制成',
           price: '¥19.80'
         },
         {
           url: '../display/display-wucanrou/display',
           image: 'http://47.100.44.255/images/home/午餐肉2.jpg',
           pro: '精制午餐肉，火锅必备',
           price: '¥68.90'
         },
         {
           url: '../display/display-fenglisu/display',
           image: 'http://47.100.44.255/images/home/凤梨酥2.jpg',
           pro: '台湾风味酥饼，酥甜美味',
           price: '¥178'
         },
         {
           url: '../display/display-mangguogan/display',
           image: 'http://47.100.44.255/images/home/芒果干.jpg',
           pro: '新鲜芒果，阳光晾晒',
           price: '¥27.90'
         }
         ,
         {
           url: '../display/display-guihuagao/display',
           image: 'http://47.100.44.255/images/home/桂花糕.jpg',
           pro: '传统手工桂花糕',
           price: '¥34.90'
         }
       ]
   
  },


  

  // 搜索页面跳回
  onLoad: function (options) {
    if (options && options.searchValue) {
      this.setData({
        searchValue: "搜索：" + options.searchValue
      });
    }
  },

  // 搜索入口  
  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  }  

})
