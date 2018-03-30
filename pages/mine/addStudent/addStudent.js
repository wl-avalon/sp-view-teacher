var SchoolAdminApi = require('/../../../apis/SchoolAdmin.js');
var LoginService = require("/../../../services/common/login.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classUuid: '',
    studentList: ['', ''],
    touchX: 0,
    touchY: 0,
    tempName: '',
    AnimatingName: '',
    deleteAnimation: '',
    initPage: true,
    className: '',
    classNowGrade: '',

  },
  onLoad: function (options) {
    LoginService.checkLogin();
    this.setData({
      classUuid: options.classUuid,
      className: options.className,
      classNowGrade: options.classNowGrade,
    });
  },
  onShow: function(){
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    var tempAniamtion = this.animation.left('0rpx').step();
    this.setData({
      deleteAnimation: tempAniamtion.export(),
    })
  },
  addStudentItem: function () {
    var studentList = this.data.studentList;
    studentList.push('');
    var tempAniamtion = this.animation.left('0rpx').step();
    this.setData({
      studentList: studentList,
      initPage: true,
      deleteAnimation: tempAniamtion.export(),
    });
  },
  moveEnd: function (e) {
    var X = e.changedTouches[0].clientX;
    var Y = e.changedTouches[0].clientY;
    var name = e.currentTarget.dataset.name;
    var data = null, tempAniamtion = null;
    if (this.data.touchX - X > 3 && Math.abs(this.data.touchY - Y) < 20) {
      if (this.data.AnimatingName) {
        tempAniamtion = this.animation.left('0rpx').step();
        this.setData({
          AnimatingName: '',
          deleteAnimation: tempAniamtion.export(),
          tempName: name,
        })
      } else {
        tempAniamtion = this.animation.left('-160rpx').step();
        this.setData({
          AnimatingName: name,
          deleteAnimation: tempAniamtion.export(),
          tempName: name,
        })
      }
    } else if (this.data.touchX - X < -3 && Math.abs(this.data.touchY - Y) < 20) {
      tempAniamtion = this.animation.left('0rpx').step();
      this.setData({
        deleteAnimation: tempAniamtion.export(),
        AnimatingName: ''
      });
    }
  },
  // 触摸开始事件
  moveStart: function (e) {
    this.data.touchX = e.changedTouches[0].clientX;
    this.data.touchY = e.changedTouches[0].clientY;
    this.setData({
      initPage: false,
    });
  },
  removeItem: function (e) {
    var idx = e.currentTarget.dataset.idx;
    // 如果没有这之间的代码，会有bug
    var tempAniamtion = this.animation.left('0rpx').step({ duration: 1 });
    this.data.AnimatingName = '';
    this.setData({
      AnimatingName: '',
      deleteAnimation: tempAniamtion.export()
    })
    // 如果没有这之间的代码，会有bug
    var studentList = this.data.studentList;
    studentList.splice(idx, 1);
    // arrList = initData.dealFriends(datas);
    this.setData({
      studentList: studentList,
    })
  },
  saveInput: function (e) {
    var content = e.detail.value;
    var index = e.currentTarget.dataset.idx;
    var studentList = this.data.studentList;
    studentList[index] = content;
    this.setData({
      studentList: studentList
    });
  },
  commitStudent: function(){
    var studentList = this.data.studentList;
    var studentMapList = [];
    for (var i = 0; i < studentList.length; i++){
      studentMapList.push({
        name: studentList[i],
      });
    }
    var inputParams = {
      studentList: studentMapList,
      classUuid: this.data.classUuid,
      successFunc: commitSuccess,
      failedFunc: commitFailed,
    };
    SchoolAdminApi.addStudents(inputParams); 
  }
})

function commitSuccess(){
  wx.showToast({
    title: "成功",
    icon: 'success',
    duration: 2000,
    mask: true,
    success: function () {
      setTimeout(function () {
        wx.reLaunch({
          url: '/pages/mine/mine',
        });
      }, 2000);
    }
  });
}
function commitFailed(){
  wx.showToast({
    title: "网络繁忙，请稍后再试",
    icon: 'none',
    duration: 2000,
    mask: true,
  });
}