//var li=[];
var index = 0;
var li=[];

Page({
  data:{
    list:li,
},
addAddre:function(e){
  	wx.navigateTo({
       url: '../newAddre/newAddre'
    })
  },
toModifyAddre:function(e){
  console.log("选中的电话"+e.currentTarget.dataset.addrevalue);
  console.log("选中的index"+e.currentTarget.dataset.index)
  wx.navigateTo({
    url: '../modifyAddre/modifyAddre?name='+ e.currentTarget.dataset.name+"&tel="+e.currentTarget.dataset.tel+"&addrevalue="+e.currentTarget.dataset.addrevalue+"&areavalue="+e.currentTarget.dataset.areavalue+"&door="+e.currentTarget.dataset.door
  })
  },

/*toCleanOrder:function(e){
  for(var i = 0;i<this.data.list.length;i++){
    if(i==e.currentTarget.dataset.index){
      li[e.currentTarget.dataset.index].image = "../../../dhl/check.jpg"}
  else{
      li[i].image = "../../../dhl/uncheck.png"
  }
}
	wx.navigateTo({
        url: '../cleanOrder/cleanOrder?name='+ e.currentTarget.dataset.name+"&tel="+e.currentTarget.dataset.tel+"&addre="+e.currentTarget.dataset.addre+"&areavalue="+"&flag="+true
      });
     console.log("姓名为："+e.currentTarget.dataset.name+"，手机是："+e.currentTarget.dataset.tel+"，地址是："+e.currentTarget.dataset.addre+"，是否选择是："+e.currentTarget.dataset.index);
},*/



  onLoad: function(options) {
    var flag=false;//判断是从哪个页面跳转过来
    var sign = 0//判断从修改页面中的保存还是删除按钮过来，保存为1，删除为2
  	flag =options.flag;
    sign = options.sign;
    if (flag) {
    	 li.push({
      "index":index++,
    	"name":options.name,
    	"tel":options.tel,
    	"addre":options.addre+options.door,
      "image":"../../../../images/address/uncheck.png",
      "addrevalue":options.addrevalue,
      "door":options.door
    	})
        this.setData({
        	list:li
        })
    };
    if(sign=='1'){
      console.log("我是从修改页面过来的"+options.addrevalue)
      li[options.index].name=options.name;
      li[options.index].tel=options.tel;
      li[options.index].addre=options.addre+options.door;
      li[options.index].addrevalue=options.addrevalue;
      li[options.index].door=options.door;
      this.setData({
          list:li
        })
    };
    if(sign=='2'){
        li.splice(options.index, 1);
        this.setData({
          list:li
        })
      }
}
})