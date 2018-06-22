Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        icon:'icon-binggan:before',
        cate_name: "糕点饼干",
        title: "糕点饼干",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '提子夹心蛋糕',
            image: "http://47.100.44.255/images/classify/提子夹心蛋糕.jpg",
            url:'../display/display-tizijiaxin/display',
          },
      
          {
            child_id: 2,
            name: '桂花糕',
            image: "http://47.100.44.255/images/classify/桂花糕.jpg",
            url: '../display/display-guihuagao/display',
          },
          {
            child_id: 3,
            name: '凤梨酥',
            image: "http://47.100.44.255/images/classify/凤梨酥.jpg",
            url: '../display/display-fenglisu/display',
          }
        ]
      },
      {
        cate_id: 2,
        icon: 'icon-rou:before',
        cate_name: "肉类即食",
        title: "肉类即食",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '午餐肉',
            image: "http://47.100.44.255/images/classify/午餐肉.jpg",
            url: '../display/display-wucanrou/display',
          },
          {
            child_id: 2,
            name: '香肠',
            image: "http://47.100.44.255/images/classify/香肠.jpg",
            url: '../display/display-xiangchang/display',
          }
        ]
      },
      {
        cate_id: 3,
        icon: 'icon-jianguo:before',
        cate_name: "坚果炒货",
        title: "坚果炒货",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '腰果',
            image: "http://47.100.44.255/images/classify/腰果.jpg",
            url: '../display/display-yaoguo/display',
            
          },
          {
            child_id: 2,
            name: '碧根果',
            image: "http://47.100.44.255/images/classify/碧根果.jpg" ,
            url: '../display/display-bigenguo/display',
          }
        ]
      }, 
      {
        cate_id: 4,
        icon: 'icon-tangguo:before',
        cate_name: "糖果果冻",
        title: "糖果果冻",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '软糖',
            image: "http://47.100.44.255/images/classify/软糖.jpg",
            url: '../display/display-ruantang/display',
          },
          {
            child_id: 2,
            name: '大白兔',
            image: "http://47.100.44.255/images/classify/大白兔.jpg",
            url: '../display/display-dabaitu/display',
          }
        ]
      },
      {
        cate_id: 5,
        icon: 'icon-shutiao:before',
        cate_name: "膨化食品",
        title: "膨化食品",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '薯片',
            image: "http://47.100.44.255/images/classify/薯片.jpg",
            url: '../display/display-shupian/display',
          }
        ]
      },
      {
        cate_id: 6,
        icon: 'icon-miantiao:before',
        cate_name: "方便食品",
        title: "方便食品",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '方便面',
            image: "http://47.100.44.255/images/classify/方便面.jpg",
            url: '../display/display-fangbianmian/display',
          },
        
          {
            child_id: 2,
            name: '螺蛳粉',
            image: "http://47.100.44.255/images/classify/螺蛳粉.jpg",
            url: '../display/display-luoshifen/display',
          }
        ]
      },
      {
        cate_id: 7,
        icon: 'icon-bingqilin:before',
        cate_name: "冷冻食品",
        title: "冷冻食品",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '马迭尔',
            image: "http://47.100.44.255/images/classify/马迭尔.jpg",
            url: '../display/display-binggun/display',
          }
        ]
      }, 
      {
        cate_id: 8,
        icon: 'icon-baicai:before',
        cate_name: "果蔬干货",
        title: "果蔬干货",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '芒果干',
            image: "http://47.100.44.255/images/classify/芒果干.jpg",
            url: '../display/display-mangguogan/display',
          }
        ]
      },
      {
        cate_id: 9,
        icon: 'icon-jinkoushuiyinliao:before',
        cate_name: "酒水饮料",
        title: "酒水饮料",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '蜂蜜柚子茶',
            image: "http://47.100.44.255/images/classify/蜂蜜柚子茶.jpg",
            url: '../display/display-youzicha/display',
          },
          {
            child_id: 2,
            name: '纯牛奶',
            image: "http://47.100.44.255/images/classify/纯牛奶.jpg",
            url: '../display/display-niunai/display',
          }
        ]
      }
    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }

})  