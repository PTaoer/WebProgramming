/*var app = getApp();
var chatListData = [];*/
let _page;
let inputObj = {};
let windowHeight, windowWidth;
// let voice$position = {toLeft: 0, toBottom: 0};
let singleVoiceTimeCount = 0;
let maxVoiceTime = 60, minVoiceTime = 1, startTimeDown = 54;
let timer;
let sendVoiceCbOk, sendVoiceCbError, startVoiceRecordCbOk, tabbarHeigth = 0;
let cancelLineYPosition = 0;
/*let sendButtDisable: true;
let askWord: '';
let userInfo: {};
let chatList: [];
let scrolltop: '';
let userLogoUrl: 'http://47.100.44.255/image/chat/user_default.png';*/
let status = {
  START: 1,
  SUCCESS: 2,
  CANCEL: 3,
  SHORT: 4,
  FAIL: 5,
  UNAUTH: 6
};

// let isRecordAuth = false;

function init(page, opt) {
  windowHeight = opt.systemInfo.windowHeight;
  windowWidth = opt.systemInfo.windowWidth;
  minVoiceTime = opt.minVoiceTime ? opt.minVoiceTime : 1;
  maxVoiceTime = opt.maxVoiceTime && opt.maxVoiceTime <= 60 ? opt.maxVoiceTime : 60;
  startTimeDown = opt.startTimeDown && opt.startTimeDown < maxVoiceTime && opt.startTimeDown > 0 ? opt.startTimeDown : 54;
  if (!isNaN(opt.tabbarHeigth)) {
    tabbarHeigth = opt.tabbarHeigth;
  }
  if (!windowHeight || !windowWidth) {
    console.error('没有获取到手机的屏幕尺寸：windowWidth', windowWidth, 'windowHeight', windowHeight);
    return;
  }
  _page = page;
  initData();
  initVoiceData();
  initExtraData(opt.extraArr);

  initChangeInputWayEvent();
  dealVoiceLongClickEvent();
  dealVoiceMoveEvent();
  dealVoiceMoveEndEvent();

  /*app.getUserInfo(function (userInfo) {
    var aUrl = userInfo.avatarUrl;
    if (aUrl != null) {
      that.setData({
        userLogoUrl: aUrl
      });
    }
  });*/
}

function clickExtraListener(cb) {
  _page.chatInputExtraItemClickEvent = typeof cb === "function" ? cb : null;
}

function sendVoiceListener(cbOk, cbError) {
  sendVoiceCbError = cbError;
  sendVoiceCbOk = cbOk;
}

function setVoiceRecordStatusListener() {
  startVoiceRecordCbOk = arguments[0];
}

function initChangeInputWayEvent() {
  _page.changeInputWayEvent = function () {
    _page.setData({
      'inputObj.inputStatus': _page.data.inputObj.inputStatus === 'text' ? 'voice' : 'text',
      'inputObj.extraObj.chatInputShowExtra': false
    });
  }
}

function initVoiceData() {
  let width = windowWidth / 2.6;
  _page.setData({
    'inputObj.inputStatus': 'text',
    'inputObj.windowHeight': windowHeight,
    'inputObj.windowWidth': windowWidth,
    'inputObj.voiceObj.status': 'end',
    'inputObj.voiceObj.startStatus': 0,
    'inputObj.voiceObj.voicePartWidth': width,
    'inputObj.voiceObj.moveToCancel': false,
    'inputObj.voiceObj.voicePartPositionToBottom': (windowHeight - width / 2.4) / 2,
    'inputObj.voiceObj.voicePartPositionToLeft': (windowWidth - width) / 2
  });
  cancelLineYPosition = windowHeight * 0.12;
}

function initExtraData(extra$arr) {
  _page.setData({
    'inputObj.extraObj.chatInputExtraArr': extra$arr
  });
  _page.chatInputExtraClickEvent = function () {
    _page.setData({
      'inputObj.extraObj.chatInputShowExtra': !_page.data.inputObj.extraObj.chatInputShowExtra
    })
  };
}


function dealVoiceLongClickEvent() {
  _page.long$click$voice$btn = function (e) {
    console.log('长按', e);
    if ('send$voice$btn' === e.currentTarget.id) {//长按时需要打开录音功能，开始录音
      singleVoiceTimeCount = 0;
      _page.setData({//调出取消弹窗
        'inputObj.voiceObj.showCancelSendVoicePart': true,
        'inputObj.voiceObj.timeDownNum': maxVoiceTime - singleVoiceTimeCount,
        'inputObj.voiceObj.status': 'start',
        'inputObj.voiceObj.startStatus': 1,
        'inputObj.voiceObj.moveToCancel': false
      });
      typeof startVoiceRecordCbOk === "function" && startVoiceRecordCbOk(status.START);
      checkRecordAuth(function () {
        wx.startRecord({
          success: function (res) {
            console.log(res, _page.data.inputObj.voiceObj.status);
            if (_page.data.inputObj.voiceObj.status === 'short') {//录音时间太短或者移动到了取消录音区域， 则取消录音
              typeof startVoiceRecordCbOk === "function" && startVoiceRecordCbOk(status.SHORT);
              return;
            } else if (_page.data.inputObj.voiceObj.moveToCancel) {
              typeof startVoiceRecordCbOk === "function" && startVoiceRecordCbOk(status.CANCEL);
              return;
            }
            console.log('录音成功');
            typeof startVoiceRecordCbOk === "function" && startVoiceRecordCbOk(status.SUCCESS);
            typeof sendVoiceCbOk === "function" && sendVoiceCbOk(res, singleVoiceTimeCount + '');
          },
          fail: res => {
            typeof startVoiceRecordCbOk === "function" && startVoiceRecordCbOk(status.FAIL);
            typeof sendVoiceCbError === "function" && sendVoiceCbError(res);
          }
        });
        //设置定时器计时60秒
        timer = setInterval(function () {
          singleVoiceTimeCount++;
          if (singleVoiceTimeCount >= startTimeDown && singleVoiceTimeCount < maxVoiceTime) {
            _page.setData({
              'inputObj.voiceObj.timeDownNum': maxVoiceTime - singleVoiceTimeCount,
              'inputObj.voiceObj.status': 'timeDown'
            })
          } else if (singleVoiceTimeCount >= maxVoiceTime) {
            _page.setData({
              'inputObj.voiceObj.status': 'timeout'
            });
            delayDismissCancelView();
            clearInterval(timer);
            //TODO 停止录音并生成IM语音信息 并将时长拼入到IM消息中
            endRecord();
          }
        }, 1000);
      }, function (res) {
        //录音失败
        console.error('录音拒绝授权');
        clearInterval(timer);
        endRecord();
        _page.setData({
          'inputObj.voiceObj.status': 'end',
          'inputObj.voiceObj.showCancelSendVoicePart': false
        });
        typeof startVoiceRecordCbOk === "function" && startVoiceRecordCbOk(status.UNAUTH);

        if (!sendVoiceCbError) {
          if (wx.openSetting) {
            wx.showModal({
              title: '您未授权语音功能',
              content: '暂时不能使用语音',
              confirmText: '去设置',
              success: res => {
                if (res.confirm) {
                  wx.openSetting({
                    success: res => {
                      if (res.authSetting['scope.record']) {
                        _page.setData({
                          'inputObj.extraObj.chatInputShowExtra': false
                        });
                      }
                    }
                  });
                } else {
                  _page.setData({
                    'inputObj.inputStatus': 'text',
                    'inputObj.extraObj.chatInputShowExtra': false
                  });
                }
              }
            });

          } else {
            wx.showModal({
              title: '无法使用语音',
              content: '请将微信升级至最新版本才可使用语音功能',
              success: res => {
                if (res.confirm) {

                }
              }
            })
          }
        } else {
          typeof sendVoiceCbError === "function" && sendVoiceCbError(res);
        }
      });
    }
  };
}

function dealVoiceMoveEvent() {
  _page.send$voice$move$event = function (e) {
    if ('send$voice$btn' === e.currentTarget.id) {
      let y = windowHeight + tabbarHeigth - e.touches[0].clientY;
      if (y > cancelLineYPosition) {
        if (!inputObj.voiceObj.moveToCancel) {
          _page.setData({
            'inputObj.voiceObj.moveToCancel': true
          });
        }
      } else {
        if (inputObj.voiceObj.moveToCancel) {//如果移出了该区域
          _page.setData({
            'inputObj.voiceObj.moveToCancel': false
          })
        }
      }

    }
  };
}

function dealVoiceMoveEndEvent() {
  _page.send$voice$move$end$event = function (e) {
    console.log('离开', e);
    if ('send$voice$btn' === e.currentTarget.id) {
      console.log('时间短', singleVoiceTimeCount, minVoiceTime);
      if (singleVoiceTimeCount < minVoiceTime) {//语音时间太短
        _page.setData({
          'inputObj.voiceObj.status': 'short'
        });
        delayDismissCancelView();
      } else {//语音时间正常
        _page.setData({
          'inputObj.voiceObj.showCancelSendVoicePart': false,
          'inputObj.voiceObj.status': 'end'
        });
      }
      if (timer) {//关闭定时器
        clearInterval(timer);
      }
      endRecord();
    }
  }
}

function checkRecordAuth(cbOk, cbError) {
  if (getApp().getNetworkConnected) {
    if (wx.getSetting) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success(res) {
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                console.log('同意', res);
              }, fail: res => {
                console.log('拒绝', res);
                cbError && cbError();
              }
            })
          } else {
            cbOk && cbOk();
          }
        }
      })
    } else {
      wx.showModal({
        title: '无法使用语音',
        content: '请将微信升级至最新版本才可使用语音功能',
        success: res => {
          if (res.confirm) {

          }
        }
      })
    }
  } else {
    cbOk && cbOk();
  }
}

function closeExtraView() {
  _page.setData({
    'inputObj.extraObj.chatInputShowExtra': false
  });
}

function delayDismissCancelView() {
  setTimeout(function () {
    if (inputObj.voiceObj.status !== 'start') {
      _page.setData({
        'inputObj.voiceObj.showCancelSendVoicePart': false,
        'inputObj.voiceObj.status': 'end'
      });
    }
  }, 1000)
}

function initData() {
  _page.data.inputObj = inputObj = { voiceObj: {} };
}

function endRecord() {
  _page.setData({
    'inputObj.voiceObj.startStatus': 0
  });
  wx.stopRecord();
}

function setTextMessageListener(cb) {
  if (_page) {
    _page.chatInputSendTextMessage = function (e) {
      _page.setData({
        textMessage: ''
      });
      typeof cb === "function" && cb(e);
    }
  }
}

module.exports = {
  init: init,
  clickExtraListener: clickExtraListener,
  closeExtraView: closeExtraView,
  recordVoiceListener: sendVoiceListener,
  setVoiceRecordStatusListener: setVoiceRecordStatusListener,
  setTextMessageListener: setTextMessageListener,
  VRStatus: status
};

// 监控输入框输入
function Typing() {
  var inputVal = e.detail.value;
  var buttDis = true;
  if (inputVal.length != 0) {
    var buttDis = false;
  }
  that.setData({
    sendButtDisable: buttDis,
  })
}

// 处理语义
/*function NLIProcess(res) {
  var nlires = JSON.parse(res);
  var nliArray = nlires.nli;
  if (nliArray == null || nliArray.length == 0) {
    wx.showToast({
      title: '返回数据有误！',
    })
    return;
  }
  var answer = nliArray[0].desc_obj.result;
  if (answer == null) {
    wx.showToast({
      title: '返回数据有误！',
    })
    return;
  }
  console.log("[Console log]:Add answer to chat list...");
  that.addChat(answer, 'l');
  var dataArray = nliArray[0].data_obj;
  if (dataArray != null && dataArray.length > 0) {
    var objType = nliArray[0].type;
    if (objType == 'selection' && dataArray.length > 1) {
      that.newsProcess(dataArray);
      return;
    }
    if (objType == 'news' && dataArray.length == 1) {
      console.log("[Console log]:Add news to chat list...");
      var title = dataArray[0].title;
      var detail = dataArray[0].detail;
      var news = title + "\n" + detail;
      that.addChat(news, 'l');
      return;
    }
    var content = dataArray[0].content;
    if (content != null && content != answer) {
      console.log("[Console log]:Add content to chat list...");
      that.addChat(content, 'l');
    }
  }
  return;
}

// 增加对话到显示界面（scrolltopFlag为True）
function addChat(word, orientation) {
  that.addChatWithFlag(word, orientation, true);
}
// 增加对话到显示界面（scrolltopFlag为是否滚动标志）
function addChatWithFlag(word, orientation, scrolltopFlag) {
  let ch = { 'text': word, 'time': new Date().getTime(), 'orientation': orientation };
  chatListData.push(ch);
  var charlenght = chatListData.length;
  console.log("[Console log]:Add message to chat list...");
  if (scrolltopFlag) {
    console.log("[Console log]:Rolling to the top...");
    that.setData({
      chatList: chatListData,
      scrolltop: "roll" + charlenght,
    });
  } else {
    console.log("[Console log]:Not rolling...");
    that.setData({
      chatList: chatListData,
    });
  }
}*/

