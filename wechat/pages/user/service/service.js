let toast = require('../../../utils/toast.js');
let chatInput = require('../../../modules/chat-input/chat-input');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendHeadUrl: '',
    textMessage: '',
    chatItems: [],
    scrollTopTimeStamp: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },
  
  initData: function () {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,//秒，最小录音时长，小于该值则弹出‘说话时间太短’
      maxVoiceTime: 60,////秒，最大录音时长，大于该值则按60秒处理
      startTimeDown: 56,////秒，开始倒计时时间，录音时长达到该值时弹窗界面更新为倒计时弹窗
      extraArr: [{
        picName: 'choose_picture',
        description: '照片'
      }, {
        picName: 'take_photos',
        description: '拍摄'
      }, {
        picName: 'close_chat',
        description: '自定义功能'
      }],
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
    });
    wx.setNavigationBarTitle({
      title: '客服'
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  textButton: function () {
    chatInput.setTextMessageListener(function (e) {
      let content = e.detail.value;////输入的文本信息
      console.log(content)
    });
  },
  voiceButton: function () {
    chatInput.recordVoiceListener(function (res, duration) {
      let tempFilePath = res.tempFilePath;//语音临时文件的路径
      let vDuration = duration;//录音时长
      console.log(tempFilePath, vDuration);
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
      switch (status) {
        case chatInput.VRStatus.START://开始录音

          break;
        case chatInput.VRStatus.SUCCESS://录音成功

          break;
        case chatInput.VRStatus.CANCEL://取消录音

          break;
        case chatInput.VRStatus.SHORT://录音时长太短

          break;
        case chatInput.VRStatus.UNAUTH://未授权录音功能

          break;
        case chatInput.VRStatus.FAIL://录音失败(已经授权了)

          break;
      }
    })
  },
  extraButton: function () {
    let that = this;
    chatInput.clickExtraListener(function (e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index);
      if (itemIndex === 2) {
        that.myFun(); //其他的自定义功能
        return;
      }
      //选择图片或拍照
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function (res) {
          let tempFilePath = res.tempFilePaths[0];
        }
      });
    });
  },
  myFun: function () {
    wx.showModal({
      title: '小贴士',
      content: '这是用于拓展的自定义功能！',
      confirmText: '确认',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          toast.show('success', '自定义功能')
        }
      }
    })
  },

  resetInputStatus: function () {
    chatInput.closeExtraView();
  },
});